from pathlib import Path
import os

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate


class RAG:
    def __init__(
        self,
        chunk_size: int = 10000,
        chunk_overlap: int = 1000,
    ):
        BASE_DIR = Path(__file__).resolve().parents[3]
        self.google_api_key = os.environ["GEMINI_API_KEY"]
        self.persist_directory = str(BASE_DIR / "models" / "embeddings")

        if not os.path.exists(self.persist_directory):
            os.makedirs(self.persist_directory)

        self.pdf_directory = str(BASE_DIR / "documents")
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.vectorstore = None

        self.prompt_template = """
        Use the following pieces of context to answer the question at the end.
        {context}
        Question: {question}
        Helpful Answer:
        """

    def load_pdfs(self) -> list:
        loader = PyPDFDirectoryLoader(self.pdf_directory)
        return loader.load()

    def split_text(self, pages: list) -> list:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size, chunk_overlap=self.chunk_overlap
        )
        context = "\n\n".join(str(p.page_content) for p in pages)
        return text_splitter.split_text(context)

    def create_embeddings(self, texts: list):
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", google_api_key=self.google_api_key
        )
        self.vectorstore = Chroma.from_texts(
            texts, embeddings, persist_directory=self.persist_directory
        )

    def load_embeddings(self):
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", google_api_key=self.google_api_key
        )
        self.vectorstore = Chroma(
            persist_directory=self.persist_directory, embedding_function=embeddings
        )

    def build_qa_chain(self):
        from cancer.analysis.gemini.llm import Gemini

        self.gemini_model = Gemini().model

        template = PromptTemplate.from_template(self.prompt_template)
        return RetrievalQA.from_chain_type(
            llm=self.gemini_model,
            retriever=self.vectorstore.as_retriever(search_kwargs={"k": 5}),
            return_source_documents=True,
            chain_type_kwargs={"prompt": template},
        )

    def answer_question(self, question: str, qa_chain: RetrievalQA) -> str:
        result = qa_chain.invoke({"query": question})
        return result["result"]
