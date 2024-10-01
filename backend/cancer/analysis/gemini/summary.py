from cancer.analysis.gemini.llm import Gemini


def analyze_mri_results(mri_results: list, medical_history: str) -> str:
    gemini = Gemini()
    context = "\n".join(
        [
            f"Predicted Label: {result['predicted_label']}, "
            f"Max Probability: {result['max_prob']}, "
            f"Type: {result['type']}, "
            f"Cancer Class Probabilities: {', '.join([f'{key}: {value}' for key, value in result['classes'].items()])}"
            for result in mri_results
        ]
    )

    prompt_template = (
        "You are a cancer care specialist tasked with analyzing multiple MRI results. "
        "Here is a summary of the patient's medical history: {medical_history}\n\n"
        "MRI Results:\n{context}\n\n"
        "Please analyze the MRI results and provide a concise summary highlighting "
        "any significant abnormalities or trends across the results. Also, suggest "
        "evidence-based lifestyle practices that the patient can adopt to enhance their well-being, "
        "including recommendations for nutrition, physical activity, mental health support, "
        "and complementary therapies."
    )

    formatted_prompt = prompt_template.format(
        medical_history=medical_history, context=context
    )
    return gemini.generate_answer(formatted_prompt)
