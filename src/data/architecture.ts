export interface ArchPillar {
  titulo: string
  bullets: string[]
}

export interface RfRnfRow {
  tipo: 'RF' | 'RNF'
  requerimiento: string
  ubicacion: string
}

export interface DocLink {
  ruta: string
  descripcion: string
}

export interface VueRoute {
  ruta: string
  nombre: string
  meta: string
}

export interface ApiEndpoint {
  metodo: string
  ruta: string
  descripcion: string
}

export const archPillars: ArchPillar[] = [
  {
    titulo: 'Backend (Laravel 12)',
    bullets: [
      'Rutas /api/* protegidas por middleware auth:sanctum en recursos sensibles.',
      'Autenticación por token Sanctum y verificación firmada de correo.',
      'Scramble (dedoc/scramble): UI en /docs/api y JSON en /docs/api.json; control por SCRAMBLE_PUBLIC_DOCS y SCRAMBLE_ALLOWED_EMAILS.',
      'Eventos de dominio publicados al canal público tasks y a canales privados user.{id}.tasks.',
    ],
  },
  {
    titulo: 'Frontend (Vue 3 SPA)',
    bullets: [
      'Pinia para estado (auth, tasks) y Axios con Authorization Bearer.',
      'Vue Router con createWebHistory; rutas con meta.requiresAuth / meta.guestOnly y guarda beforeEach.',
      'Laravel Echo escucha TaskCreated, TaskUpdated y TaskDeleted en los canales suscritos.',
      'UI alineada a la identidad del producto (cards, hero, modal de auth).',
    ],
  },
]

export const rfRnfMapping: RfRnfRow[] = [
  {
    tipo: 'RF',
    requerimiento: 'Registrar e iniciar sesión; emitir token',
    ubicacion: 'routes/api.php, controladores Auth, stores/auth.js',
  },
  {
    tipo: 'RF',
    requerimiento: 'CRUD de tareas con validación',
    ubicacion: 'TaskController, stores/task.js, vistas /tasks',
  },
  {
    tipo: 'RF',
    requerimiento: 'Publicar y consultar contrato HTTP (OpenAPI)',
    ubicacion: 'Scramble /docs/api, atributos en controladores, export JSON',
  },
  {
    tipo: 'RF',
    requerimiento: 'Autorizar canales de broadcasting',
    ubicacion: 'POST /api/broadcasting/auth, Echo en plugins/echo.js',
  },
  {
    tipo: 'RNF',
    requerimiento: 'Seguridad de acceso y transporte',
    ubicacion: 'HTTPS en prod, Bearer Sanctum, restricción de docs por env',
  },
  {
    tipo: 'RNF',
    requerimiento: 'Rendimiento en listados',
    ubicacion: 'Paginación GET /api/tasks?page=',
  },
  {
    tipo: 'RNF',
    requerimiento: 'Usabilidad básica',
    ubicacion: 'UI responsive Vue + feedback de errores Axios',
  },
]

export const archFlowMermaid = `flowchart LR
  subgraph client [Cliente]
    U[Usuario]
    V[Vue 3 SPA]
    E[Echo]
  end
  subgraph server [Servidor]
    A[Laravel API]
    S[Sanctum]
    R[Reverb]
    D[(Base de datos)]
  end
  U --> V
  V -->|HTTP JSON| A
  A --> S
  A --> D
  A -->|broadcast| R
  E -->|WebSocket| R
  R --> E
  E --> V
`

export const archSequenceMermaid = `sequenceDiagram
  participant U as Usuario
  participant V as Vue SPA
  participant A as Laravel API
  participant R as Reverb
  U->>V: Credenciales
  V->>A: POST /api/login
  A-->>V: token + usuario
  V->>A: GET /api/tasks (Bearer)
  A-->>V: lista paginada
  V->>R: suscripcion Echo (auth broadcasting)
  U->>V: crear tarea
  V->>A: POST /api/tasks
  A->>R: evento TaskCreated
  R-->>V: payload
  V-->>U: lista actualizada
`

export const scrambleDocs: DocLink[] = [
  { ruta: 'GET /docs/api', descripcion: 'Interfaz interactiva de documentación (Scramble UI).' },
  { ruta: 'GET /docs/api.json', descripcion: 'Especificación OpenAPI 3 generada.' },
  { ruta: 'GET /docs → /docs/api', descripcion: 'Redirección configurada en routes/web.php.' },
  {
    ruta: '/api/documentation → /docs/api',
    descripcion: 'Alias bajo el prefijo /api; también /api/documentation.json apunta al JSON.',
  },
  {
    ruta: 'php artisan scramble:export --path=storage/api-docs/api-docs.json',
    descripcion: 'Export estático del contrato para CI o publicación.',
  },
  { ruta: 'php artisan scramble:analyze', descripcion: 'Análisis estático del contrato en CI.' },
]

export const vueRoutes: VueRoute[] = [
  {
    ruta: '/',
    nombre: 'guest.home',
    meta: 'Landing público; abre VITE_API_URL + "/docs" para Scramble.',
  },
  {
    ruta: '/tasks',
    nombre: 'tasks.index',
    meta: 'requiresAuth: true — sin token redirige a guest.home.',
  },
  {
    ruta: '/verify-email',
    nombre: 'auth.verify-email',
    meta: 'Flujo de verificación de correo (query status).',
  },
]

export const apiEndpoints: ApiEndpoint[] = [
  { metodo: 'GET', ruta: '/api/status', descripcion: 'Estado del servicio.' },
  {
    metodo: 'POST',
    ruta: '/api/register · /api/login · /api/logout',
    descripcion: 'Ciclo de auth Sanctum.',
  },
  {
    metodo: 'GET|POST',
    ruta: '/api/tasks',
    descripcion: 'Listado paginado y creación de tareas.',
  },
  {
    metodo: 'GET|PUT|PATCH|DELETE',
    ruta: '/api/tasks/{id}',
    descripcion: 'Detalle, edición parcial/completa y eliminación.',
  },
  {
    metodo: 'POST',
    ruta: '/api/broadcasting/auth',
    descripcion: 'Autorización de canales privados (Sanctum).',
  },
  {
    metodo: 'GET',
    ruta: '/api/email/verify/{id}/{hash}',
    descripcion: 'Verificación firmada del correo.',
  },
]
