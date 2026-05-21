import type { RequirementGroup } from '@/types/domain'

export const requirementGroups: RequirementGroup[] = [
  {
    categoria: 'negocio',
    titulo: 'Requerimientos de negocio',
    subtitulo: '¿Por qué existe TaskManager?',
    items: [
      {
        codigo: 'RN-01',
        nombre: 'Centralizar tareas',
        descripcion:
          'Reducir el retrabajo y la pérdida de visibilidad consolidando tareas, estados y vencimientos en un único sistema operado por la SPA.',
      },
      {
        codigo: 'RN-02',
        nombre: 'Reducir tiempo de coordinación',
        descripcion:
          'Disminuir el ciclo de coordinación entre miembros del equipo mostrando cambios en vivo (broadcasting) en vez de notificaciones manuales.',
      },
      {
        codigo: 'RN-03',
        nombre: 'Arquitectura desacoplada',
        descripcion:
          'Separar presentación (Vue 3), lógica de negocio (Laravel) y datos (BD) para evolucionar el frontend sin acoplarlo a detalles del servidor.',
      },
      {
        codigo: 'RN-04',
        nombre: 'Contrato HTTP confiable',
        descripcion:
          'Publicar y mantener un contrato OpenAPI 3 generado automáticamente con Scramble para que cualquier cliente pueda integrarse sin adivinar formatos.',
      },
      {
        codigo: 'RN-05',
        nombre: 'Despliegue reproducible',
        descripcion:
          'Operar bajo un esquema de despliegue reproducible (Dokploy + Docker) con HTTPS y restricción de docs según entorno.',
      },
    ],
  },
  {
    categoria: 'usuario',
    titulo: 'Requerimientos del usuario',
    subtitulo: '¿Qué debe poder hacer el actor?',
    items: [
      {
        codigo: 'RU-01',
        nombre: 'Invitado — registrarse e iniciar sesión',
        descripcion:
          'El invitado quiere registrarse y/o iniciar sesión desde el landing público sin instalar nada, obteniendo un token que persista en su navegador.',
      },
      {
        codigo: 'RU-02',
        nombre: 'Invitado — explorar la API',
        descripcion:
          'El invitado técnico quiere abrir la documentación OpenAPI desde la SPA para entender los endpoints antes de integrarse.',
      },
      {
        codigo: 'RU-03',
        nombre: 'Usuario — listar tareas paginado',
        descripcion:
          'El usuario autenticado quiere listar sus tareas paginadas con estado y vencimiento, sin recargar la página para ver los últimos cambios.',
      },
      {
        codigo: 'RU-04',
        nombre: 'Usuario — CRUD de tareas',
        descripcion:
          'El usuario quiere crear, editar y eliminar tareas desde un modal con validación inmediata y feedback de errores.',
      },
      {
        codigo: 'RU-05',
        nombre: 'Usuario — verificar correo',
        descripcion:
          'El usuario quiere verificar su correo siguiendo un enlace firmado para acceder a las rutas protegidas que exigen verificación.',
      },
      {
        codigo: 'RU-06',
        nombre: 'Usuario — sincronización realtime',
        descripcion:
          'El usuario quiere que los cambios hechos por otros clientes (u otro equipo del mismo usuario) aparezcan automáticamente en su lista.',
      },
    ],
  },
  {
    categoria: 'sistema',
    titulo: 'Requerimientos del sistema',
    subtitulo: '¿Cómo lo cumple técnicamente?',
    items: [
      {
        codigo: 'RS-01',
        nombre: 'Patrón cliente-servidor',
        descripcion:
          'API REST JSON Laravel 12 consumida por una SPA Vue 3; la base de datos solo es accedida desde el backend.',
      },
      {
        codigo: 'RS-02',
        nombre: 'Auth con Sanctum',
        descripcion:
          'Autenticación por token Bearer; rutas protegidas con middleware auth:sanctum y guardas Vue Router con meta.requiresAuth.',
      },
      {
        codigo: 'RS-03',
        nombre: 'Estado y consumo Axios',
        descripcion:
          'Pinia para el estado (auth, tasks) y Axios con interceptor de Authorization para todas las llamadas autenticadas.',
      },
      {
        codigo: 'RS-04',
        nombre: 'Broadcasting con Reverb + Echo',
        descripcion:
          'Eventos del dominio publicados al canal tasks y a canales privados user.{id}.tasks; el cliente se suscribe vía Laravel Echo.',
      },
      {
        codigo: 'RS-05',
        nombre: 'Documentación con Scramble',
        descripcion:
          'UI Scramble en /docs/api, JSON OpenAPI en /docs/api.json, redirecciones y export artisan para CI.',
      },
    ],
  },
  {
    categoria: 'funcional',
    titulo: 'Requerimientos funcionales (RF)',
    subtitulo: 'Funciones del sistema modeladas por casos de uso',
    items: [
      {
        codigo: 'RF-01',
        nombre: 'Registrar e iniciar sesión',
        descripcion:
          'POST /api/register y POST /api/login en el backend; emisión de token Sanctum y persistencia en localStorage desde el store auth.',
      },
      {
        codigo: 'RF-02',
        nombre: 'CRUD de tareas con validación',
        descripcion:
          'TaskController con políticas; rutas GET|POST|PUT|PATCH|DELETE /api/tasks; vista tasks.index y store de tareas en la SPA.',
      },
      {
        codigo: 'RF-03',
        nombre: 'Publicar contrato OpenAPI',
        descripcion:
          'UI Scramble y endpoint JSON; atributos en controladores y export estático con artisan scramble:export.',
      },
      {
        codigo: 'RF-04',
        nombre: 'Autorizar canales de broadcasting',
        descripcion:
          'POST /api/broadcasting/auth con Sanctum; configuración Echo en plugins/echo.js (canales tasks y user.{id}.tasks).',
      },
      {
        codigo: 'RF-05',
        nombre: 'Verificación de correo',
        descripcion:
          'Endpoint firmado GET /api/email/verify/{id}/{hash} y POST /api/email/verification-notification; flujo cliente en auth.verify-email.',
      },
      {
        codigo: 'RF-06',
        nombre: 'Cerrar sesión',
        descripcion:
          'POST /api/logout best-effort y limpieza local de token y suscripciones Echo.',
      },
    ],
  },
  {
    categoria: 'no-funcional',
    titulo: 'Requerimientos no funcionales (RNF)',
    subtitulo: 'Restricciones de calidad, seguridad y operación',
    items: [
      {
        codigo: 'RNF-01',
        nombre: 'Seguridad de transporte',
        descripcion:
          'HTTPS en producción para todas las llamadas API y WebSocket; token Bearer obligatorio en rutas protegidas.',
      },
      {
        codigo: 'RNF-02',
        nombre: 'Control de acceso a docs',
        descripcion:
          'Acceso a la documentación restringido por entorno mediante SCRAMBLE_PUBLIC_DOCS y SCRAMBLE_ALLOWED_EMAILS.',
      },
      {
        codigo: 'RNF-03',
        nombre: 'Rendimiento en listados',
        descripcion:
          'Paginación obligatoria en GET /api/tasks?page=n; el cliente nunca solicita listados completos.',
      },
      {
        codigo: 'RNF-04',
        nombre: 'Usabilidad responsive',
        descripcion:
          'SPA Vue 3 responsive con feedback de errores Axios y atajos de teclado para la presentación.',
      },
      {
        codigo: 'RNF-05',
        nombre: 'Disponibilidad operativa',
        descripcion:
          'Despliegue gestionado por Dokploy con multi-stage Docker; el servicio Reverb es opcional y se degrada el realtime sin romper el CRUD.',
      },
      {
        codigo: 'RNF-06',
        nombre: 'Idioma',
        descripcion:
          'La SPA y los mensajes generados desde el servidor en flujos visibles al usuario se entregan en español.',
      },
    ],
  },
]
