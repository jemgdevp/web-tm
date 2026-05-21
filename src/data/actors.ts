import type { Actor } from '@/types/domain'

export const actors: Actor[] = [
  {
    id: 'invitado',
    nombre: 'Invitado',
    descripcion:
      'Usuario sin sesión activa que entra a la SPA por la ruta pública guest.home. Puede consultar la documentación OpenAPI, registrarse o iniciar sesión para obtener un token Sanctum.',
    responsabilidades: [
      'Acceder al landing público en /.',
      'Registrarse o iniciar sesión vía POST /api/register o POST /api/login.',
      'Consultar la documentación de la API en VITE_API_URL/docs (Scramble).',
    ],
    icon: 'UserPlus',
  },
  {
    id: 'usuario',
    nombre: 'Usuario autenticado',
    descripcion:
      'Usuario con token Sanctum válido. Opera las rutas protegidas (meta.requiresAuth) gestionando sus propias tareas y suscribiéndose a canales realtime para ver los cambios en vivo.',
    responsabilidades: [
      'Gestionar sus tareas (listar paginado, crear, editar y eliminar).',
      'Verificar su correo electrónico cuando el sistema lo solicite.',
      'Suscribirse a canales Echo (tasks y user.{id}.tasks) para recibir eventos.',
      'Cerrar sesión limpiando el token local y desconectando Echo.',
    ],
    icon: 'UserCheck',
  },
  {
    id: 'broadcasting',
    nombre: 'Sistema de broadcasting',
    descripcion:
      'Actor secundario tipo «sistema»: Reverb (servidor WebSocket) más Laravel Echo en el cliente. Emite y propaga los eventos TaskCreated, TaskUpdated y TaskDeleted hacia los clientes suscritos.',
    responsabilidades: [
      'Autorizar canales privados vía POST /api/broadcasting/auth.',
      'Publicar eventos del dominio al canal tasks y a canales privados user.{id}.tasks.',
      'Mantener la coherencia entre la respuesta REST y el payload del evento.',
    ],
    icon: 'Radio',
  },
]

export const actorById = (id: string): Actor | undefined =>
  actors.find((a) => a.id === id)
