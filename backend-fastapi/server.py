# server.py
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from prediction import predict_image
from PIL import Image
import io
import base64

app = FastAPI()

# Mount static directory if needed for additional assets like CSS, JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

# Route for the upload form
@app.get("/", response_class=HTMLResponse)
async def upload_form(request: Request):
    return templates.TemplateResponse("upload.html", {"request": request})

# Route to handle the prediction and display results
@app.post("/predict/", response_class=HTMLResponse)
async def predict(request: Request, file: UploadFile = File(...)):
    # Read the image file
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    # Save the image temporarily to pass it to predictions.py
    temp_image_path = "temp_image.jpg"
    image.save(temp_image_path)

    # Get predictions
    result = predict_image(temp_image_path)
    
    # Combine class names and probabilities
    class_probabilities = list(zip(result["class_names"], result["probabilities"]))

    # Pass results to the template
    return templates.TemplateResponse("result.html", {
        "request": request,
        "image_url": f"data:image/jpeg;base64,{base64.b64encode(image_data).decode()}",
        "predicted_class": result["predicted_class"],
        "class_probabilities": class_probabilities
    })
