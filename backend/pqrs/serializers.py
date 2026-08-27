from rest_framework import serializers

from .models import PQRS

#con esta clase se consigué que los datos de la base
#  de datos se puedan convertir a JSON y viceversa, 
# para que el front-end pueda consumirlos y enviarlos
#  al back-end.

class PQRSSerializer(serializers.ModelSerializer):
    class Meta:
        model = PQRS
        fields = [
            "ticket_code",
            "applicant_name",
            "applicant_email",
            "category",
            "subject",
            "description",
            "attachment",
            "status",
            "created_at",
        ]

        # Esto permite restringir que el usuario no pueda
        # decidir estos valores.
        read_only_fields = [
            "ticket_code",
            "status",
            "created_at",
        ]