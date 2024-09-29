from django.urls import path, include

from cancer.views import router, ChatAPIView

urlpatterns = [
    path("", include(router.urls)),
    path("chat/", ChatAPIView.as_view()),
]
