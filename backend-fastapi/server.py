# server.py
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from prediction import predict_image
from PIL import Image
import io
import base64

# Optional RAG imports (can be commented out if not using RAGs)
try:
    from langchain.embeddings import OpenAIEmbeddings
    from langchain.vectorstores import FAISS
    from langchain.chat_models import ChatOpenAI
    from langchain.chains import ConversationalRetrievalChain
    RAG_ENABLED = True
except ImportError:
    RAG_ENABLED = False

app = FastAPI()

# Mount static directory if needed for additional assets like CSS, JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

# Route for the upload form
# Initialize RAG components (if enabled)
if RAG_ENABLED:
    try:
        # Initialize your RAG components here
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.load_local("path_to_your_faiss_index", embeddings)
        llm = ChatOpenAI(temperature=0)
        qa_chain = ConversationalRetrievalChain.from_llm(
            llm,
            vector_store.as_retriever(),
            return_source_documents=True
        )
    except Exception as e:
        print(f"Error initializing RAG components: {e}")
        RAG_ENABLED = False

class ChatMessage(BaseModel):
    message: str

# Route for the upload form
@app.get("/", response_class=HTMLResponse)
async def upload_form(request: Request):
    return templates.TemplateResponse("upload.html", {"request": request})

# Route for the chatbot interface
@app.get("/chatbot", response_class=HTMLResponse)
async def chatbot_interface(request: Request):
    return templates.TemplateResponse("chatbot.html", {"request": request})

# Route to handle chat messages
@app.post("/chat")
async def chat(message: ChatMessage):
    if RAG_ENABLED:
        try:
            # Use RAG to generate response
            result = qa_chain({
                "question": message.message,
                "chat_history": []  # You might want to implement chat history
            })
            response = result["answer"]
        except Exception as e:
            print(f"Error in RAG processing: {e}")
            response = get_fallback_response(message.message)
    else:
        response = get_fallback_response(message.message)
    
    return JSONResponse(content={"response": response})

def get_fallback_response(message: str):
    # Basic response logic without RAG
    message = message.lower()
    if "what is" in message or "tell me about" in message:
        return "I can provide information about different types of skin cancers and their characteristics. However, for specific medical advice, please consult a healthcare professional."
    elif "symptoms" in message:
        return "Common symptoms of skin cancer may include changes in skin appearance, new growths, or changes in existing moles. However, please consult a healthcare professional for proper diagnosis."
    elif "prevention" in message:
        return "Some key prevention methods include using sunscreen, avoiding excessive sun exposure, and regular skin checks. Consult your healthcare provider for personalized advice."
    else:
        return "I'm a skin cancer classification assistant. I can help you understand skin cancer types, prevention, and classification results. What would you like to know?"
