from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PQRSSerializer


class PQRSCreateView(APIView):

    def post(self, request):
        serializer = PQRSSerializer(data=request.data)

        if serializer.is_valid():
            pqrs = serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "Solicitud registrada correctamente",
                    "ticket_code": pqrs.ticket_code,
                    "status": pqrs.status,
                    "created_at": pqrs.created_at,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                "success": False,
                "message": "Los datos enviados no son válidos",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )