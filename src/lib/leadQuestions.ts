// Textos y orden del formulario de Meta proporcionado como referencia.
export const PATIENT_VOLUME_QUESTION =
  "¿Cuántos pacientes atienden aproximadamente por semana?";
export const PATIENT_VOLUME_OPTIONS = [
  { value: "LESS_THAN_30", label: "Menos de 30" },
  { value: "BETWEEN_30_AND_80", label: "Entre 30 y 80" },
  { value: "BETWEEN_80_AND_150", label: "Entre 80 y 150" },
  { value: "MORE_THAN_150", label: "Más de 150" },
] as const;

export const PATIENT_CHALLENGES_QUESTION =
  "¿Cuál es tu mayor reto hoy con la atención de pacientes?";
export const PATIENT_CHALLENGE_OPTIONS = [
  {
    value: "NO_SHOWS",
    label: "Pacientes que no llegan a su cita (inasistencias)",
  },
  {
    value: "SLOW_REPLIES",
    label: "Nos demoramos en responder mensajes de WhatsApp/Instagram",
  },
  {
    value: "LOST_PATIENTS",
    label: "Perdemos pacientes por no responder a tiempo",
  },
  {
    value: "SCHEDULING_WORKLOAD",
    label: "Mucho tiempo administrativo agendando y reagendando",
  },
] as const;

export const BUDGET_QUESTION =
  "La DEMO es gratuita pero si se anima por el Sistema tiene un costo de 250USD la instalación, podría hacer la inversión?";
export const BUDGET_OPTIONS = [
  { value: "READY", label: "Si, cuento con el presupuesto" },
  { value: "CAN_GET_FUNDS", label: "Si, puedo conseguir el dinero" },
  {
    value: "TRY_FIRST",
    label: "Primero veo si funciona y luego lo podré comprar",
  },
  { value: "NOT_INTERESTED", label: "No me interesa" },
] as const;

export const CLINIC_NAME_QUESTION =
  "Nombre de tu Clínica o Consultorio Odontológico";

export type PatientVolume = (typeof PATIENT_VOLUME_OPTIONS)[number]["value"];
export type PatientChallenge =
  (typeof PATIENT_CHALLENGE_OPTIONS)[number]["value"];
export type Budget = (typeof BUDGET_OPTIONS)[number]["value"];
