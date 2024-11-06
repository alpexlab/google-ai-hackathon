from django.core.files.storage import Storage
import os
from supabase import create_client, Client
import mimetypes


class SupabaseStaticStorage(Storage):
    """
    Custom storage class for handling static files in Supabase.

    This class provides functionality for saving, retrieving URLs, 
    checking existence, and deleting static files in a specified Supabase bucket.
    """

    def __init__(self, *args, **kwargs):
        """
        Initialize the Supabase client and set the target bucket name for static files.
        
        The SUPABASE_URL and SUPABASE_KEY environment variables are required to
        authenticate with the Supabase client.
        """
        self.supabase: Client = create_client(
            os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"]
        )
        self.bucket_name = "google-ai-hackathon"  # Target bucket name for static files

    def _save(self, name, content):
        """
        Save a file to the Supabase storage under the "static" directory.

        Args:
            name (str): The name/path of the file to be saved.
            content (File): The file content to upload.
        
        Returns:
            str: The name of the saved file.

        Raises:
            Exception: If an error occurs during the upload process.
        """
        content_type, encoding = mimetypes.guess_type(name)
        content_type = content_type or "application/octet-stream"
        encoding = encoding or "utf-8"

        try:
            # Upload the file to the Supabase bucket
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
        """
        Retrieve the public URL of a static file in Supabase.

        Args:
            name (str): The name/path of the file.

        Returns:
            str: The public URL of the file.

        Raises:
            Exception: If an error occurs while retrieving the URL.
        """
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(
                f"static/{name}"
            )
        except Exception as e:
            raise Exception(f"Error getting public URL from Supabase: {str(e)}")

    def exists(self, name):
        """
        Check if a static file exists in the Supabase bucket.

        Args:
            name (str): The name/path of the file.

        Returns:
            bool: True if the file exists, False otherwise.

        Raises:
            Exception: If an error occurs during the existence check.
        """
        try:
            dirs = ""
            if "/" in name:
                temp = name.strip("/").split("/")
                name = temp[-1]
                dirs = "/".join(temp[:-1])

            # List files in the directory and check for the specified file
            res = self.supabase.storage.from_(self.bucket_name).list(f"static/{dirs}")
            return any(item["name"] == name for item in res)
        except Exception as e:
            raise Exception(f"Error checking if file exists in Supabase: {str(e)}")

    def delete(self, name):
        """
        Delete a static file from the Supabase bucket.

        Args:
            name (str): The name/path of the file to be deleted.

        Raises:
            Exception: If an error occurs during the deletion process.
        """
        try:
            self.supabase.storage.from_(self.bucket_name).remove(f"static/{name}")
        except Exception as e:
            raise Exception(f"Error deleting file from Supabase: {str(e)}")


class SupabaseMediaStorage(Storage):
    """
    Custom storage class for handling media files in Supabase.

    This class provides functionality for saving, retrieving URLs,
    checking existence, and deleting media files in a specified Supabase bucket.
    """

    def __init__(self, *args, **kwargs):
        """
        Initialize the Supabase client and set the target bucket name for media files.

        The SUPABASE_URL and SUPABASE_KEY environment variables are required to
        authenticate with the Supabase client.
        """
        self.supabase: Client = create_client(
            os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"]
        )
        self.bucket_name = "google-ai-hackathon"  # Target bucket name for media files

    def _save(self, name, content):
        """
        Save a file to the Supabase storage under the "media" directory.

        Args:
            name (str): The name/path of the file to be saved.
            content (File): The file content to upload.
        
        Returns:
            str: The name of the saved file.

        Raises:
            Exception: If an error occurs during the upload process.
        """
        content_type, encoding = mimetypes.guess_type(name)
        content_type = content_type or "application/octet-stream"
        encoding = encoding or "utf-8"

        try:
            # Upload the file to the Supabase bucket
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
        """
        Retrieve the public URL of a media file in Supabase.

        Args:
            name (str): The name/path of the file.

        Returns:
            str: The public URL of the file.

        Raises:
            Exception: If an error occurs while retrieving the URL.
        """
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(
                f"media/{name}"
            )
        except Exception as e:
            raise Exception(f"Error getting public URL from Supabase: {str(e)}")

    def exists(self, name):
        """
        Check if a media file exists in the Supabase bucket.

        Args:
            name (str): The name/path of the file.

        Returns:
            bool: True if the file exists, False otherwise.

        Raises:
            Exception: If an error occurs during the existence check.
        """
        try:
            dirs = ""
            if "/" in name:
                temp = name.strip("/").split("/")
                name = temp[-1]
                dirs = "/".join(temp[:-1])

            # List files in the directory and check for the specified file
            res = self.supabase.storage.from_(self.bucket_name).list(f"media/{dirs}")
            return any(item["name"] == name for item in res)
        except Exception as e:
            raise Exception(f"Error checking if file exists in Supabase: {str(e)}")

    def delete(self, name):
        """
        Delete a media file from the Supabase bucket.

        Args:
            name (str): The name/path of the file to be deleted.

        Raises:
            FileNotFoundError: If the file does not exist in the Supabase bucket.
            ConnectionError: If there is an issue connecting to Supabase.
            PermissionError: If there is an authorization error.
            Exception: For any other error that occurs during the deletion process.
        """
        try:
            # Attempt to delete the file from the Supabase bucket
            response = self.supabase.storage.from_(self.bucket_name).remove(f"media/{name}")
            
            # Check if the response indicates that the file was not found
            if response.get('error') and 'not found' in response['error'].lower():
                raise FileNotFoundError(f"File '{name}' not found in Supabase bucket.")
            
            # Additional response checks if necessary
            if not response.get('status') or response['status'] != 'success':
                raise Exception(f"Unexpected response: {response}")
        
        except FileNotFoundError as fnf_error:
            # Specific handling for file not found
            print(f"File not found: {fnf_error}")
            raise fnf_error
        
        except ConnectionError as conn_error:
            # Specific handling for connection issues
            raise ConnectionError("Failed to connect to Supabase. Please check your network and Supabase URL.")
        
        except PermissionError as auth_error:
            # Specific handling for permission issues
            raise PermissionError("Authorization failed. Please check your Supabase API key and permissions.")
        
        except Exception as e:
            # General exception catch for any other issues
            raise Exception(f"Error deleting file from Supabase: {str(e)}")

