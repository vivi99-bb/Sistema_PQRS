const API_URL = "http://127.0.0.1:8000";

export interface PQRSData {
  applicant_name: string;
  applicant_email: string;
  category: string;
  subject: string;
  description: string;
  attachment?: File | null;
}

export interface PQRSResponse {
  success: boolean;
  message: string;
  ticket_code?: string;
  status?: string;
  created_at?: string;
  errors?: Record<string, string[]>;
}

export async function createPQRS(
  data: PQRSData
): Promise<PQRSResponse> {
  const formData = new FormData();

  formData.append("applicant_name", data.applicant_name);
  formData.append("applicant_email", data.applicant_email);
  formData.append("category", data.category);
  formData.append("subject", data.subject);
  formData.append("description", data.description);

  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  console.log("Enviando solicitud a Django...");

  const response = await fetch(`${API_URL}/api/pqrs/`, {
    method: "POST",
    body: formData,
  });

  console.log("Respuesta HTTP:", response.status);

  const responseData = await response.json();

  console.log("Respuesta Django:", responseData);

  if (!response.ok) {
    return {
      success: false,
      message:
        responseData.message ||
        "No fue posible registrar la solicitud.",
      errors: responseData.errors,
    };
  }

  return responseData;
}