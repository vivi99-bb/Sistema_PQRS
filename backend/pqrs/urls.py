from django.urls import path

from .views import PQRSCreateView


urlpatterns = [
    path("", PQRSCreateView.as_view(), name="pqrs-create"),
]