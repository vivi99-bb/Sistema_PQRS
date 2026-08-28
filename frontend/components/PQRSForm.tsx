"use client";

import { FormEvent, useState } from "react";
import { createPQRS } from "@/lib/api";

const categories = [
  { value: "PETICION", label: "Petición" },
  { value: "QUEJA", label: "Queja" },
  { value: "RECLAMO", label: "Reclamo" },
  { value: "SUGERENCIA", label: "Sugerencia" },
];

export default function PQRSForm() {
  const [formData, setFormData] = useState({
    applicant_name: "",
    applicant_email: "",
    category: "",
    subject: "",
    description: "",
  });

  const [attachment, setAttachment] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [ticketCode, setTicketCode] = useState("");

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await createPQRS({
        ...formData,
        attachment,
      });

      if (response.success) {
        setSuccess(true);
        setTicketCode(response.ticket_code || "");

        setFormData({
          applicant_name: "",
          applicant_email: "",
          category: "",
          subject: "",
          description: "",
        });

        setAttachment(null);
      } else {
        setError(response.message);
      }
    } catch {
      setError(
        "No fue posible conectar con el servidor. Verifica tu conexión e inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-green-700">
          ¡Solicitud registrada!
        </h2>

        <p className="mt-3 text-gray-700">
          Tu solicitud fue registrada correctamente.
        </p>

        <div className="mt-5 rounded-md bg-white p-4">
          <p className="text-sm text-gray-500">
            Número de radicado
          </p>

          <p className="mt-1 text-2xl font-bold">
            {ticketCode}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-5 rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Registrar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg bg-white p-6 shadow"
    >
      <div>
        <h2 className="text-2xl font-bold">
          Registrar PQRS
        </h2>

        <p className="mt-1 text-gray-600">
          Completa la información de tu solicitud.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="applicant_name"
          className="mb-1 block font-medium"
        >
          Nombre completo
        </label>

        <input
          id="applicant_name"
          name="applicant_name"
          type="text"
          value={formData.applicant_name}
          onChange={handleChange}
          required
          className="w-full rounded-md border p-2"
          placeholder="Ingresa tu nombre completo"
        />
      </div>

      <div>
        <label
          htmlFor="applicant_email"
          className="mb-1 block font-medium"
        >
          Correo electrónico
        </label>

        <input
          id="applicant_email"
          name="applicant_email"
          type="email"
          value={formData.applicant_email}
          onChange={handleChange}
          required
          className="w-full rounded-md border p-2"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-1 block font-medium"
        >
          Tipo de solicitud
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-md border p-2"
        >
          <option value="">
            Selecciona una opción
          </option>

          {categories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block font-medium"
        >
          Asunto
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-md border p-2"
          placeholder="Indica el asunto de tu solicitud"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block font-medium"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-md border p-2"
          placeholder="Describe detalladamente tu solicitud"
        />
      </div>

      <div>
        <label
          htmlFor="attachment"
          className="mb-1 block font-medium"
        >
          Anexo
        </label>

        <input
          id="attachment"
          type="file"
          onChange={(e) =>
            setAttachment(e.target.files?.[0] || null)
          }
          className="w-full rounded-md border p-2"
        />

        <p className="mt-1 text-sm text-gray-500">
          Puedes adjuntar un documento como soporte.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Enviando solicitud..." : "Enviar solicitud"}
      </button>
    </form>
  );
}