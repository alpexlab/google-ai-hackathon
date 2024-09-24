from django.urls import path, include

from cancer.views import router

urlpatterns = [
    path("", include(router.urls)),
]
