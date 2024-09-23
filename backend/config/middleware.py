from django.utils.deprecation import MiddlewareMixin
from config.supabase import get_user_from_token


class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.headers.get("Authorization")

        if not token or "Bearer " not in token:
            return

        access_token = token.split("Bearer ")[1]
        user = get_user_from_token(access_token)

        if user is None:
            return

        request.doctor = user
