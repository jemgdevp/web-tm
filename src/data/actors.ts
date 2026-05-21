import type { Actor } from '@/types/domain'

export const actors: Actor[] = [
  {
    id: 'cliente',
    nombre: 'Cliente',
    descripcion:
      'Persona o empresa que contrata el servicio de mensajería para enviar paquetes. Interactúa con el sistema desde una interfaz pública para registrar pedidos y consultar el estado de sus envíos.',
    responsabilidades: [
      'Registrar pedidos de envío.',
      'Consultar el estado de sus paquetes en tiempo real.',
      'Confirmar la recepción cuando aplique.',
    ],
    icon: 'User',
  },
  {
    id: 'repartidor',
    nombre: 'Repartidor',
    descripcion:
      'Empleado encargado de transportar y entregar los paquetes en la ruta asignada por el supervisor. Usa la aplicación móvil para consultar su ruta del día y registrar las entregas.',
    responsabilidades: [
      'Consultar la ruta del día.',
      'Marcar paquetes como entregados.',
      'Registrar evidencia (foto, firma, observación).',
      'Reportar incidencias.',
    ],
    icon: 'Truck',
  },
  {
    id: 'supervisor',
    nombre: 'Supervisor logístico',
    descripcion:
      'Responsable de coordinar la operación diaria. Asigna rutas, monitorea el avance de las entregas en tiempo real y gestiona incidencias.',
    responsabilidades: [
      'Asignar rutas a los repartidores.',
      'Monitorear el avance en tiempo real.',
      'Reasignar entregas ante incidencias.',
      'Validar la finalización de la jornada.',
    ],
    icon: 'Map',
  },
  {
    id: 'administrador',
    nombre: 'Administrador',
    descripcion:
      'Usuario con privilegios elevados sobre el sistema. Gestiona usuarios, parámetros operativos y obtiene reportes ejecutivos para la toma de decisiones.',
    responsabilidades: [
      'Gestionar cuentas de usuario y roles.',
      'Generar y consultar reportes operativos y financieros.',
      'Configurar parámetros del sistema.',
      'Aprobar facturación.',
    ],
    icon: 'ShieldCheck',
  },
]

export const actorById = (id: string): Actor | undefined =>
  actors.find((a) => a.id === id)
