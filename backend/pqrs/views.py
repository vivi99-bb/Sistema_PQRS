from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import PQRS
from .serializers import PQRSSerializer


class PQRSCreateView(generics.CreateAPIView):
    queryset = PQRS.objects.all()
    serializer_class = PQRSSerializer