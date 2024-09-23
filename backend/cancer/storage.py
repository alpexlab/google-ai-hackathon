from django.core.files.storage import Storage
from django.conf import settings
import os
from supabase import create_client, Client

class SupabaseMediaStorage(Storage):
    def __init__(self, *args, **kwargs):
        self.supabase: Client = create_client(
            os.environ["SUPABASE_URL"], 
            os.environ["SUPABASE_KEY"]
        )
        self.bucket_name = 'google-ai-hackathon'

    def _save(self, name, content):
        try:
            self.supabase.storage.from_(self.bucket_name).upload(
                file=content.file,
                path=f"{self.bucket_name}/{name}",
            )
            return name
        except Exception as e:
            raise Exception(f"Error uploading to Supabase: {str(e)}")

    def url(self, name):
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(
                f"{self.bucket_name}/{name}"
            )
        except Exception as e:
            raise Exception(f"Error getting public URL from Supabase: {str(e)}")

    def exists(self, name):
        try:
            res = self.supabase.storage.from_(self.bucket_name).list(f"{self.bucket_name}", {
                "prefix": name,
            })
            return len(res) > 0
        except Exception as e:
            raise Exception(f"Error checking if file exists in Supabase: {str(e)}")

    def delete(self, name):
        try:
            self.supabase.storage.from_(self.bucket_name).remove(f"{self.bucket_name}/{name}")
        except Exception as e:
            raise Exception(f"Error deleting file from Supabase: {str(e)}")
