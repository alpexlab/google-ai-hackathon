import os

from langchain_google_genai import ChatGoogleGenerativeAI


class Gemini:
    def __init__(
        self,
        model_name: str = "gemini-pro",
        temperature: float = 0.2,
    ):
        self.model = ChatGoogleGenerativeAI(
            model=model_name,
            google_api_key=os.environ["GEMINI_API_KEY"],
            temperature=temperature,
        )

    def generate_answer(self, question: str, context: str, prompt_template: str) -> str:
        formatted_prompt = prompt_template.format(context=context, question=question)
        return self.model({"prompt": formatted_prompt})["output"]
