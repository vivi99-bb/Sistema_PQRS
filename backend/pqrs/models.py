from django.db import models

# Create your models here.

from django.db import models


class PQRS(models.Model):

    CATEGORY_CHOICES = [
        ("PETICION", "Petición"),
        ("QUEJA", "Queja"),
        ("RECLAMO", "Reclamo"),
        ("SUGERENCIA", "Sugerencia"),
    ]

    STATUS_CHOICES = [
        ("NUEVO", "Nuevo"),
        ("EN_REVISION", "En revisión"),
        ("RESUELTO", "Resuelto"),
        ("CERRADO", "Cerrado"),
    ]

    ticket_code = models.CharField(
        max_length=20,
        unique=True,
        blank=True
    )

    applicant_name = models.CharField(
        max_length=150
    )

    applicant_email = models.EmailField()

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    subject = models.CharField(
        max_length=255
    )

    description = models.TextField()

    attachment = models.FileField(
        upload_to="attachments/",
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="NUEVO"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        if not self.ticket_code:
            last_pqrs = PQRS.objects.order_by("-id").first()

            if last_pqrs:
                last_number = int(last_pqrs.ticket_code.split("-")[1])
                next_number = last_number + 1
            else:
                next_number = 1001

            self.ticket_code = f"PQRS-{next_number}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.ticket_code} - {self.applicant_name}"

attachment = models.FileField(
    upload_to="attachments/",
    null=True,
    blank=True
)
