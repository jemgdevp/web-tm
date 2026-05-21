import type { RequirementGroup } from '@/types/domain'

export const requirementGroups: RequirementGroup[] = [
  {
    categoria: 'negocio',
    titulo: 'Requerimientos de negocio',
    subtitulo: 'Objetivos estratégicos que el sistema debe apoyar',
    items: [
      {
        codigo: 'RN-01',
        nombre: 'Reducir paquetes extraviados',
        descripcion:
          'El sistema debe permitir disminuir en al menos un 80% los paquetes extraviados, mediante trazabilidad punto a punto.',
      },
      {
        codigo: 'RN-02',
        nombre: 'Reducir retrasos en entregas',
        descripcion:
          'El sistema debe contribuir a disminuir el tiempo promedio de entrega, mediante asignación automática y monitoreo en tiempo real.',
      },
      {
        codigo: 'RN-03',
        nombre: 'Aumentar trazabilidad operativa',
        descripcion:
          'La empresa debe contar con visibilidad completa del ciclo del paquete: desde el registro hasta la entrega final.',
      },
      {
        codigo: 'RN-04',
        nombre: 'Automatizar la facturación',
        descripcion:
          'El sistema debe generar facturas automáticamente a partir de los pedidos completados, eliminando la facturación manual.',
      },
      {
        codigo: 'RN-05',
        nombre: 'Mejorar la satisfacción del cliente',
        descripcion:
          'Ofrecer al cliente información actualizada del estado de su paquete sin necesidad de contactar al call center.',
      },
    ],
  },
  {
    categoria: 'usuario',
    titulo: 'Requerimientos del usuario',
    subtitulo: 'Necesidades expresadas por cada actor del sistema',
    items: [
      {
        codigo: 'RU-01',
        nombre: 'Cliente — rastreo del paquete',
        descripcion:
          'El cliente quiere rastrear su paquete en tiempo real desde cualquier dispositivo, sin tener que llamar a la empresa.',
      },
      {
        codigo: 'RU-02',
        nombre: 'Cliente — registro rápido',
        descripcion:
          'El cliente quiere registrar un nuevo pedido en menos de dos minutos, indicando origen, destino y características del paquete.',
      },
      {
        codigo: 'RU-03',
        nombre: 'Repartidor — ruta digital',
        descripcion:
          'El repartidor quiere ver su ruta del día desde el móvil, sin depender de papeles, con la dirección y los datos del destinatario.',
      },
      {
        codigo: 'RU-04',
        nombre: 'Repartidor — confirmación de entrega',
        descripcion:
          'El repartidor quiere registrar la entrega con evidencia (foto y firma) y que el cambio se refleje inmediatamente para el cliente y el supervisor.',
      },
      {
        codigo: 'RU-05',
        nombre: 'Supervisor — asignación eficiente',
        descripcion:
          'El supervisor quiere asignar rutas en pocos clics y que el sistema sugiera la asignación óptima según ubicación y carga de cada repartidor.',
      },
      {
        codigo: 'RU-06',
        nombre: 'Administrador — reportes',
        descripcion:
          'El administrador quiere obtener reportes de desempeño, entregas y facturación con datos confiables y filtros por fecha y zona.',
      },
    ],
  },
  {
    categoria: 'sistema',
    titulo: 'Requerimientos del sistema',
    subtitulo: 'Capacidades técnicas que la plataforma debe ofrecer',
    items: [
      {
        codigo: 'RS-01',
        nombre: 'Arquitectura multi-rol',
        descripcion:
          'El sistema debe soportar 4 roles diferenciados: cliente, repartidor, supervisor logístico y administrador, con permisos específicos por rol.',
      },
      {
        codigo: 'RS-02',
        nombre: 'Persistencia de datos',
        descripcion:
          'Toda la información de pedidos, rutas, entregas, usuarios y facturación debe persistir en una base de datos.',
      },
      {
        codigo: 'RS-03',
        nombre: 'Integración cartográfica',
        descripcion:
          'El sistema debe integrarse con un servicio de mapas para la asignación de rutas y la geolocalización de paquetes.',
      },
      {
        codigo: 'RS-04',
        nombre: 'Notificaciones',
        descripcion:
          'El sistema debe enviar notificaciones (in-app, email o SMS) cuando el estado de un pedido cambie.',
      },
      {
        codigo: 'RS-05',
        nombre: 'Cliente móvil y web',
        descripcion:
          'El sistema debe ofrecer una interfaz web responsiva y una aplicación móvil para los repartidores.',
      },
    ],
  },
  {
    categoria: 'funcional',
    titulo: 'Requerimientos funcionales',
    subtitulo: 'Funciones concretas que el sistema debe ejecutar',
    items: [
      {
        codigo: 'RF-01',
        nombre: 'Registrar pedido',
        descripcion:
          'Permitir al cliente registrar un nuevo pedido indicando origen, destino, peso, dimensiones y descripción del paquete.',
      },
      {
        codigo: 'RF-02',
        nombre: 'Calcular tarifa',
        descripcion:
          'Calcular automáticamente la tarifa de envío con base en distancia, peso y dimensiones.',
      },
      {
        codigo: 'RF-03',
        nombre: 'Asignar ruta automáticamente',
        descripcion:
          'Asignar el pedido al repartidor más adecuado en función de su ubicación, carga actual y zona de cobertura.',
      },
      {
        codigo: 'RF-04',
        nombre: 'Rastrear paquete en tiempo real',
        descripcion:
          'Mostrar al cliente y al supervisor la ubicación y el estado actual del paquete a lo largo de toda la operación.',
      },
      {
        codigo: 'RF-05',
        nombre: 'Registrar entrega con evidencia',
        descripcion:
          'Permitir al repartidor marcar el paquete como entregado y adjuntar evidencia (foto, firma, observación).',
      },
      {
        codigo: 'RF-06',
        nombre: 'Generar factura',
        descripcion:
          'Generar automáticamente la factura del envío una vez completada la entrega.',
      },
      {
        codigo: 'RF-07',
        nombre: 'Generar reportes',
        descripcion:
          'Producir reportes de desempeño, entregas, retrasos y facturación con filtros por fecha, zona y repartidor.',
      },
      {
        codigo: 'RF-08',
        nombre: 'Gestionar usuarios y roles',
        descripcion:
          'Permitir al administrador crear, modificar y desactivar cuentas de usuario, asignando roles y permisos.',
      },
    ],
  },
  {
    categoria: 'no-funcional',
    titulo: 'Requerimientos no funcionales',
    subtitulo: 'Atributos de calidad transversales al sistema',
    items: [
      {
        codigo: 'RNF-01',
        nombre: 'Rendimiento',
        descripcion:
          'El tiempo de respuesta del sistema en operaciones críticas debe ser inferior a 2 segundos bajo carga normal.',
      },
      {
        codigo: 'RNF-02',
        nombre: 'Disponibilidad',
        descripcion:
          'El sistema debe ofrecer una disponibilidad mensual igual o superior al 99,5%.',
      },
      {
        codigo: 'RNF-03',
        nombre: 'Escalabilidad',
        descripcion:
          'La plataforma debe soportar al menos 1.000 usuarios concurrentes sin degradación significativa.',
      },
      {
        codigo: 'RNF-04',
        nombre: 'Usabilidad',
        descripcion:
          'Las interfaces deben ser responsivas y seguir buenas prácticas de UX, accesibles para usuarios sin conocimiento técnico.',
      },
      {
        codigo: 'RNF-05',
        nombre: 'Seguridad',
        descripcion:
          'Las contraseñas se almacenan cifradas, las comunicaciones se realizan sobre HTTPS y los accesos quedan auditados.',
      },
      {
        codigo: 'RNF-06',
        nombre: 'Respaldo',
        descripcion:
          'Debe existir un respaldo diario automatizado de la base de datos con retención mínima de 30 días.',
      },
      {
        codigo: 'RNF-07',
        nombre: 'Idioma',
        descripcion:
          'La interfaz del sistema debe estar disponible en español.',
      },
    ],
  },
]
