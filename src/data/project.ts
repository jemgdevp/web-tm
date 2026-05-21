import type { ProjectInfo } from '@/types/domain'

export const projectInfo: ProjectInfo = {
  titulo: 'TaskManager',
  subtitulo:
    'Sistema API-first de gestión de tareas con sincronización en tiempo real (Vue 3 + Laravel 12 + Sanctum + Reverb).',
  asignatura: 'Teoría de Sistemas',
  carrera: 'Ingeniería de Sistemas',
  universidad: 'Universidad Autónoma de Manizales',
  ciudad: 'Manizales',
  ano: 2026,
  estudiante: {
    nombre: 'Juan Esteban Manrique Giraldo',
    identificacion: '1054865411',
  },
  docente: 'Alejandra Duque Ceballos',
}

export const problemaContexto = {
  resumen:
    'En entornos académicos y profesionales se pierde visibilidad sobre prioridades, fechas límite y cambios hechos por otros. TaskManager centraliza tareas con estados, vencimientos y actualizaciones en vivo para reducir el retrabajo y mantener al equipo alineado sin recurrir a hilos de mensajería o documentos paralelos.',
  contexto:
    'Se necesita un sistema coherente que separe claramente presentación, lógica de negocio y datos, permitiendo evolucionar el frontend sin acoplarlo al detalle del servidor. El alcance abarca autenticación con token (Sanctum), CRUD de tareas y canales realtime (Reverb + Echo). El backend se documenta automáticamente con OpenAPI vía Scramble; el frontend es una SPA Vue 3 con Pinia y Vue Router.',
  actualmente: [
    'Las tareas se reparten por chats y documentos sueltos sin un estado canónico.',
    'No hay forma de saber en vivo qué cambió ni quién lo cambió.',
    'El frontend y el backend se acoplan a la implementación, no a un contrato.',
    'La documentación de la API se escribe a mano y queda desactualizada.',
  ],
  problemas: [
    'Retrabajo por tareas desactualizadas o duplicadas.',
    'Pérdida de visibilidad sobre vencimientos y estados.',
    'Acoplamiento fuerte entre presentación, lógica y datos.',
    'Ausencia de un contrato HTTP confiable entre cliente y servidor.',
  ],
  seRequiere: [
    'Autenticar usuarios mediante token Sanctum y verificar correo.',
    'CRUD completo de tareas con paginación y validación servidor.',
    'Canales realtime autenticados (Echo + Reverb) para reflejar cambios sin recargar.',
    'Documentación OpenAPI generada y publicada con Scramble (UI + JSON).',
  ],
}
