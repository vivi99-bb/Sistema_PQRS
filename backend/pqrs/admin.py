from django.contrib import admin

from .models import PQRS


@admin.register(PQRS)
class PQRSAdmin(admin.ModelAdmin):
    list_display = (
        "ticket_code",
        "applicant_name",
        "applicant_email",
        "category",
        "status",
        "created_at",
    )

    list_editable = (
        "status",
    )

    list_filter = (
        "status",
        "category",
    )

    search_fields = (
        "ticket_code",
        "applicant_name",
        "applicant_email",
        "subject",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "ticket_code",
        "created_at",
    )

    fieldsets = (
        (
            "Información del radicado",
            {
                "fields": (
                    "ticket_code",
                    "status",
                    "created_at",
                )
            },
        ),
        (
            "Información del solicitante",
            {
                "fields": (
                    "applicant_name",
                    "applicant_email",
                )
            },
        ),
        (
            "Detalle de la solicitud",
            {
                "fields": (
                    "category",
                    "subject",
                    "description",
                    "attachment",
                )
            },
        ),
    )