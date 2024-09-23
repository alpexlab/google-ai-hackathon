import os
from supabase import create_client, Client
import requests


def get_user_from_token(token: str) -> dict | None:
    SUPABASE_URL = os.environ["SUPABASE_URL"]
    user = requests.get(
        f"{SUPABASE_URL}/auth/v1/user/",
        headers={
            "apikey": os.environ["SUPABASE_KEY"],
            "Authorization": f"Bearer {token}",
        },
    )
    if user.status_code != 200:
        return None
    return user.json()


def upload_to_storage(file_path: str, file_name: str, content_type: str):
    url: str = os.environ["SUPABASE_URL"]
    key: str = os.environ["SUPABASE_KEY"]
    supabase: Client = create_client(url, key)

    try:
        with open(file_path, "rb") as f:
            supabase.storage.from_("google-ai-hackathon").upload(
                file=f,
                path=f"google-ai-hackathon/{file_name}",
                file_options={"content-type": content_type},
            )
        public_url = supabase.storage.from_("google-ai-hackathon").get_public_url(
            f"google-ai-hackathon/{file_name}"
        )
        return public_url
    except Exception as e:
        print("Error in uploading : ", e, flush=True)
