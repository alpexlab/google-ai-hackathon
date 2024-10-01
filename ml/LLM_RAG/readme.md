# Gemini-Based RAG with PDF Parser and Chatbot

## Overview

This project leverages the power of the Gemini model to create a Retrieval-Augmented Generation (RAG) system. It allows users to interact with and extract information from PDF documents through a chatbot interface. By utilizing LangChain and various document processing tools, the system provides concise answers based on the content of the PDFs.

## Key Features

- **PDF Document Loading**: Efficiently loads multiple PDF files from a specified directory.
- **Contextual Question Answering**: Uses a sophisticated QA chain that combines context from documents with user queries.
- **Chatbot Interface**: Interacts with users to provide information extracted from PDFs, maintaining a conversational tone.
- **Concise Answers**: Ensures answers are straightforward, with a friendly closure.

## Architecture

The architecture consists of several components:

1. **PDF Loader**: Utilizes `PyPDFDirectoryLoader` to load multiple PDF documents.
2. **Text Splitting**: Splits the documents into manageable pieces for effective querying.
3. **Vector Store**: Uses Chroma for efficient document retrieval based on user queries.
4. **RetrievalQA Chain**: Combines the retrieved document context with the user's question to provide a helpful answer.

### Example Code

template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible. Always say "thanks for asking!" at the end of the answer.
{context}
Question: {question}
Helpful Answer:"""
QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

# Run chain
qa_chain = RetrievalQA.from_chain_type(
    model,
    retriever=vector_index,
    return_source_documents=True,
    chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
)
```

## Requirements

- Python 3.x
- LangChain
- Pandas
- Google API for ChatGPT (Gemini model)
- PyPDF2 or PyPDFLoader
- Chroma

To install the required packages, run:

```bash
pip install langchain pandas pypdf chromadb
```

## Usage

1. Clone this repository.
2. Set up your Google API key for accessing the Gemini model.
3. Place your PDF documents in the specified directory (e.g., `/content/`).
4. Run the main script to load PDFs and interact with the chatbot.

```bash
python chatbot.py
```

5. Ask questions related to the content of the loaded PDFs, and receive contextual answers.

## Results

- Provides accurate and concise answers based on the context of the documents.
- Engages users in a conversational format while ensuring clarity and brevity.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any suggestions or bug reports.

---

Feel free to reach out if you have any questions or suggestions!
