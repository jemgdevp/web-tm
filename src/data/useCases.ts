import type { UseCase } from '@/types/domain'

export const useCases: UseCase[] = [
  {
    codigo: 'CU-DOC-00',
    nombre: 'Consultar documentación de la API (Scramble)',
    actores: ['invitado'],
    tipo: 'secundario',
    precondiciones: [
      'Se conoce la URL base de la API (APP_URL o VITE_API_URL).',
      'Acceso a Scramble sujeto a SCRAMBLE_PUBLIC_DOCS / SCRAMBLE_ALLOWED_EMAILS según config/scramble.php.',
    ],
    descripcion:
      'El desarrollador o usuario técnico abre la documentación OpenAPI generada por Scramble desde la SPA. Permite explorar endpoints, esquemas y descargar el contrato JSON para integraciones.',
    flujoNormal: [
      'En guest.home, el actor pulsa “See API documentation”.',
      'El navegador abre VITE_API_URL/docs.',
      'Laravel redirige /docs → /docs/api (Scramble UI).',
      'Opcional: descargar el contrato OpenAPI desde /docs/api.json.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Docs privadas',
        pasos: [
          'Si SCRAMBLE_PUBLIC_DOCS=false, Scramble exige autenticación.',
          'El usuario se autentica en la UI de Scramble según política del servidor.',
          'Tras autenticarse, se le muestran los endpoints permitidos.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Dominio API mal configurado',
        descripcion:
          'Si VITE_API_URL apunta a un dominio incorrecto, la página queda en blanco o se bloquea por CORS; corregir la variable en el .env del front.',
      },
    ],
    postcondiciones: [
      'El contrato OpenAPI 3 queda visible en la UI Scramble o disponible como JSON para integración.',
    ],
  },
  {
    codigo: 'CU-REG-01',
    nombre: 'Registrarse',
    actores: ['invitado'],
    tipo: 'principal',
    precondiciones: [
      'El actor no posee sesión válida.',
      'El correo no está registrado (o el backend devuelve error de validación).',
    ],
    descripcion:
      'El invitado crea una cuenta nueva enviando email, contraseña y confirmación. Si el backend emite token, el store Pinia lo persiste en localStorage y el router decide entre verify-email o tasks.index según email_verified.',
    flujoNormal: [
      'El actor solicita el registro desde guest.home.',
      'El cliente envía POST /api/register con los datos del formulario.',
      'El servidor responde con token y datos del usuario (Sanctum).',
      'El store de auth guarda token y usuario en localStorage.',
      'Vue Router navega a auth.verify-email o tasks.index según email_verified.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Usuario creado sin token',
        pasos: [
          'El servidor crea la cuenta pero no emite token.',
          'El cliente conserva los datos del formulario y ofrece reintentar login.',
        ],
      },
      {
        titulo: 'FA-2. Validación 422',
        pasos: [
          'El servidor responde HTTP 422 con detalle de errores.',
          'La SPA renderiza los mensajes de validación en el formulario.',
          'El actor corrige los campos y reintenta.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Error de red',
        descripcion:
          'Si Axios no logra contactar la API, se muestra un mensaje genérico y no se guarda token; la sesión queda vacía.',
      },
    ],
    postcondiciones: [
      'La cuenta queda creada en el backend.',
      'Si se emitió token, el usuario queda autenticado en el cliente.',
      'El estado Pinia y localStorage reflejan al usuario actual.',
    ],
  },
  {
    codigo: 'CU-AUTH-02',
    nombre: 'Iniciar sesión',
    actores: ['invitado'],
    tipo: 'principal',
    precondiciones: [
      'Existe una cuenta registrada con las credenciales suministradas.',
      'La SPA está cargada y el actor accede al modal de login (AuthModal.vue).',
    ],
    descripcion:
      'El invitado se autentica contra la API y obtiene un token Sanctum para activar los casos de uso que incluyen validación de sesión (gestión de tareas).',
    flujoNormal: [
      'Paso 1 — Actor: en guest.home, abre el modal de login y envía email y contraseña. Sistema: muestra el formulario y ejecuta POST /api/login con Axios.',
      'Paso 2 — Sistema: Laravel valida las credenciales y responde con token y usuario (Sanctum).',
      'Paso 3 — Sistema: el store Pinia guarda token y usuario, persistiéndolos en localStorage.',
      'Paso 4 — Sistema: Vue Router navega a tasks.index si el correo está verificado; si no, a auth.verify-email.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Credenciales incorrectas',
        pasos: [
          'En el paso 2 la API responde con error de autenticación.',
          'La UI muestra el mensaje y no guarda token.',
          'El actor permanece en el flujo de login.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Respuesta sin token',
        descripcion:
          'Si el paso 2 devuelve OK pero sin token, el store lanza un error controlado “Authentication token missing” y no asume sesión válida.',
      },
      {
        titulo: 'EX-02. Error de red',
        descripcion:
          'Si Axios falla en transporte, la UI muestra un mensaje y la sesión no se inicia.',
      },
    ],
    postcondiciones: [
      'Token Sanctum enviado en Authorization: Bearer en llamadas posteriores.',
      'Rutas con requiresAuth accesibles para el actor.',
    ],
  },
  {
    codigo: 'CU-VER-03',
    nombre: 'Verificar correo electrónico',
    actores: ['usuario'],
    tipo: 'secundario',
    precondiciones: [
      'El actor tiene sesión activa.',
      'El campo email_verified en el modelo de usuario es false.',
    ],
    descripcion:
      'El usuario completa el flujo de verificación de correo siguiendo el enlace firmado emitido por el backend. Tras éxito, el frontend refresca el usuario y desbloquea las rutas que requieren verificación.',
    flujoNormal: [
      'El usuario entra a la vista auth.verify-email en /verify-email.',
      'La SPA solicita POST /api/email/verification-notification para reenviar el correo.',
      'El usuario abre el enlace firmado GET /api/email/verify/{id}/{hash}.',
      'El store auth ejecuta refreshCurrentUser y actualiza email_verified.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Enlace expirado o inválido',
        pasos: [
          'El servidor rechaza el enlace por firma o expiración.',
          'La SPA muestra un mensaje de error y ofrece reenviar el correo.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Throttle de envíos',
        descripcion:
          'El endpoint de notificación aplica rate-limit; si se excede, la SPA muestra el tiempo restante antes de un nuevo intento.',
      },
    ],
    postcondiciones: [
      'El campo email_verified queda coherente entre cliente y servidor.',
      'Las rutas que exigen verificación quedan accesibles.',
    ],
  },
  {
    codigo: 'CU-TASK-04',
    nombre: 'Listar tareas (paginado)',
    actores: ['usuario'],
    tipo: 'principal',
    precondiciones: [
      'Token Sanctum válido en localStorage.',
      'El backend autoriza al usuario sobre su colección de tareas.',
    ],
    descripcion:
      'El usuario consulta sus tareas paginadas para revisar estado, vencimientos y prioridades. Este caso incluye «include» a la validación de token vía guardas del router.',
    flujoNormal: [
      'El usuario navega a tasks.index en /tasks.',
      'La SPA ejecuta GET /api/tasks?page=n con Bearer.',
      'Laravel responde con una colección paginada.',
      'El store Pinia actualiza tareas y página actual; la vista renderiza la lista.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Página vacía',
        pasos: [
          'La colección llega sin ítems.',
          'La UI muestra el estado “Sin tareas” sin tratarlo como error.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. HTTP 401',
        descripcion:
          'Sesión inválida: se limpia el token local y se redirige a guest.home.',
      },
      {
        titulo: 'EX-02. HTTP 5xx o red caída',
        descripcion:
          'Error transitorio del servidor o pérdida de conectividad: la lista puede quedar desactualizada hasta un nuevo intento.',
      },
    ],
    postcondiciones: [
      'El estado Pinia de tareas y página actual queda actualizado.',
      'La vista lista las tareas autorizadas por las políticas del backend.',
    ],
  },
  {
    codigo: 'CU-TASK-05',
    nombre: 'Crear / editar / eliminar tarea',
    actores: ['usuario'],
    tipo: 'principal',
    precondiciones: [
      'Sesión válida (token Sanctum vigente).',
      'El formulario satisface las reglas de validación (título, estado, fecha, etc.).',
    ],
    descripcion:
      'El usuario opera el CRUD de tareas desde la vista tasks.index. Cada operación HTTP confirma la mutación; los eventos broadcast (CU-RT-06) complementan la sincronización entre clientes.',
    flujoNormal: [
      'Crear: POST /api/tasks con el payload del formulario.',
      'Editar: PUT/PATCH /api/tasks/{id}.',
      'Eliminar: DELETE /api/tasks/{id}.',
      'Tras respuesta OK, la SPA actualiza la lista local y queda a la escucha de los eventos realtime.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Validación fallida',
        pasos: [
          'El servidor responde HTTP 422 con errores por campo.',
          'La UI marca los errores sin corromper la lista de tareas.',
        ],
      },
      {
        titulo: 'FA-2. Recurso inexistente',
        pasos: [
          'Editar o eliminar devuelve HTTP 404.',
          'La SPA muestra un aviso y refresca la lista desde el servidor.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Sesión expirada',
        descripcion:
          'Si la API devuelve 401, se limpia el token y se obliga a un nuevo login.',
      },
    ],
    postcondiciones: [
      'El recurso queda persistido o eliminado en el backend.',
      'La vista refleja un estado coherente con el servidor.',
    ],
  },
  {
    codigo: 'CU-RT-06',
    nombre: 'Sincronizar en tiempo real',
    actores: ['usuario', 'broadcasting'],
    tipo: 'secundario',
    precondiciones: [
      'Echo inicializado en el cliente.',
      'Para canales privados, POST /api/broadcasting/auth queda autorizado con Sanctum.',
    ],
    descripcion:
      'El usuario recibe eventos de TaskCreated, TaskUpdated y TaskDeleted vía Echo+Reverb, manteniendo la lista coherente sin recargar. Complementa el CRUD pero no lo sustituye.',
    flujoNormal: [
      'El cliente se suscribe al canal público tasks y al privado user.{id}.tasks.',
      'Laravel emite eventos de dominio tras cada mutación HTTP.',
      'Reverb propaga el evento; Echo lo recibe en la SPA.',
      'El store actualiza optimistamente la lista de tareas.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Reverb no disponible',
        pasos: [
          'El handshake de Echo falla por timeout o servicio caído.',
          'El CRUD sigue funcionando por HTTP.',
          'La UI muestra un estado “realtime degradado”.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'EX-01. Autorización rechazada',
        descripcion:
          'Si /api/broadcasting/auth devuelve 403 para un canal privado, el cliente no se suscribe a ese canal pero conserva el público.',
      },
    ],
    postcondiciones: [
      'La lista refleja los cambios externos sin recarga manual.',
      'Los IDs del payload broadcast coinciden con los recursos REST.',
    ],
  },
  {
    codigo: 'CU-AUTH-07',
    nombre: 'Cerrar sesión',
    actores: ['usuario'],
    tipo: 'secundario',
    precondiciones: [
      'Token Sanctum almacenado en localStorage.',
    ],
    descripcion:
      'El usuario cierra sesión limpiando el token local y notificando al backend cuando sea posible. La desconexión de Echo es parte del flujo para evitar estados inconsistentes.',
    flujoNormal: [
      'El usuario solicita logout desde la UI.',
      'La SPA ejecuta POST /api/logout (best-effort) con Bearer.',
      'El store limpia token y usuario en cliente.',
      'Echo se desconecta de los canales privados.',
    ],
    flujosAlternos: [
      {
        titulo: 'FA-1. Error de red',
        pasos: [
          'Si POST /api/logout falla en transporte, igualmente se limpia la sesión local.',
          'Esto evita un estado autenticado en cliente sin respaldo en servidor.',
        ],
      },
    ],
    excepciones: [],
    postcondiciones: [
      'No se envían peticiones autenticadas hasta un nuevo login.',
      'Las suscripciones Echo a canales privados quedan cerradas.',
    ],
  },
]

export const useCaseByCodigo = (codigo: string): UseCase | undefined =>
  useCases.find((uc) => uc.codigo === codigo)
