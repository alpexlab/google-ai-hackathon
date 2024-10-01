if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()

    from chat import RagManager

    RagManager().train_model()
