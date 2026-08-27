from rest_framework import serializers

from .models import PQRS

#con esta clase se consigué que los datos de la base
#  de datos se puedan convertir a JSON y viceversa, 
# para que el front-end pueda consumirlos y enviarlos
#  al back-end.

class PQRSSerializer(serializers.ModelSerializer):
    def validate_applicant_name(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "El nombre debe tener al menos 3 caracteres."
            )

        return value

    def validate_subject(self, value):
        value = value.strip()

        if len(value) < 5:
            raise serializers.ValidationError(
                "El asunto debe tener al menos 5 caracteres."
            )

        return value

    def validate_description(self, value):
        value = value.strip()

        if len(value) < 10:
            raise serializers.ValidationError(
                "La descripción debe tener al menos 10 caracteres."
            )

        return value

    
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