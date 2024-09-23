from django.core.files.storage import Storage
import os
from supabase import create_client, Client

import mimetypes


class SupabaseStaticStorage(Storage):
    def __init__(self, *args, **kwargs):
        self.supabase: Client = create_client(
            os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"]
        )
        self.bucket_name = "google-ai-hackathon"

    def _save(self, name, content):
        content_type, encoding = mimetypes.guess_type(name)

        if content_type is None:
            content_type = "application/octet-stream"
            encoding = "utf-8"

        try:
            self.supabase.storage.from_(self.bucket_name).upload(
                file=content.file,
                path=f"static/{name}",
                file_options={
                    "content-type": content_type,
                    "Content-Type": content_type,
                    "Content-Encoding": encoding,
                },
            )
            return name
        except Exception as e:
            raise Exception(f"Error uploading to Supabase: {str(e)}")

    def url(self, name):
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(
                f"static/{name}"
            )
        except Exception as e:
            raise Exception(f"Error getting public URL from Supabase: {str(e)}")

    def exists(self, name):
        try:
            dirs = ""
            if "/" in name:
                temp = name.strip("/").split("/")
                name = temp[-1]
                dirs = "/".join(temp[:-1])

            res = self.supabase.storage.from_(self.bucket_name).list(f"static/{dirs}")

            for item in res:
                if item["name"] == name:
                    return True

            return False
        except Exception as e:
            raise Exception(f"Error checking if file exists in Supabase: {str(e)}")

    def delete(self, name):
        try:
            self.supabase.storage.from_(self.bucket_name).remove(f"static/{name}")
        except Exception as e:
            raise Exception(f"Error deleting file from Supabase: {str(e)}")


class SupabaseMediaStorage(Storage):
    def __init__(self, *args, **kwargs):
        self.supabase: Client = create_client(
            os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"]
        )
        self.bucket_name = "google-ai-hackathon"

    def _save(self, name, content):
        content_type, encoding = mimetypes.guess_type(name)

        if content_type is None:
            content_type = "application/octet-stream"
            encoding = "utf-8"

        try:
            self.supabase.storage.from_(self.bucket_name).upload(
                file=content.file,
                path=f"media/{name}",
                file_options={
                    "content-type": content_type,
                    "Content-Type": content_type,
                    "Content-Encoding": encoding,
                },
            )
            return name
        except Exception as e:
            raise Exception(f"Error uploading to Supabase: {str(e)}")

    def url(self, name):
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(
                f"media/{name}"
            )
        except Exception as e:
            raise Exception(f"Error getting public URL from Supabase: {str(e)}")

    def exists(self, name):
        try:
            dirs = ""
            if "/" in name:
                temp = name.strip("/").split("/")
                name = temp[-1]
                dirs = "/".join(temp[:-1])

            res = self.supabase.storage.from_(self.bucket_name).list(f"media/{dirs}")

            for item in res:
                if item["name"] == name:
                    return True

            return False
        except Exception as e:
            raise Exception(f"Error checking if file exists in Supabase: {str(e)}")

    def delete(self, name):
        try:
            self.supabase.storage.from_(self.bucket_name).remove(f"media/{name}")
        except Exception as e:
            raise Exception(f"Error deleting file from Supabase: {str(e)}")
