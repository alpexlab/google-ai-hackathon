class RagManager:
    def train_model(self):
        from rag import RAG

        rag = RAG()

        pages = rag.load_pdfs()
        texts = rag.split_text(pages)

        rag.create_embeddings(texts)

    def get_answer(self, question: str) -> str:
        from cancer.analysis.gemini.rag import RAG

        rag = RAG()
        rag.load_embeddings()
        qa_chain = rag.build_qa_chain()

        answer = rag.answer_question(question, qa_chain)
        return answer
