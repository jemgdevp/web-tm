import type { UseCase } from '@/types/domain'

export const useCases: UseCase[] = [
  {
    codigo: 'CU-01',
    nombre: 'Registrar pedido',
    actores: ['cliente'],
    tipo: 'principal',
    precondiciones: [
      'El cliente está autenticado en el sistema.',
      'El servicio de cálculo de tarifas se encuentra disponible.',
      'Existe al menos una zona de cobertura habilitada.',
    ],
    descripcion:
      'Permite al cliente registrar un nuevo pedido de envío indicando el origen, destino y características del paquete. El sistema calcula la tarifa, genera un número de seguimiento y notifica al supervisor logístico para su asignación.',
    flujoNormal: [
      'El cliente selecciona la opción "Nuevo pedido" en el menú principal.',
      'El sistema muestra el formulario de registro de pedido.',
      'El cliente ingresa los datos de origen, destino, peso, dimensiones y descripción del paquete.',
      'El sistema valida los datos ingresados.',
      'El sistema calcula automáticamente la tarifa (CU-Calcular tarifa).',
      'El sistema muestra el resumen del pedido con la tarifa calculada.',
      'El cliente confirma el pedido.',
      'El sistema genera un número de seguimiento único.',
      'El sistema notifica al supervisor logístico para asignación de ruta.',
      'El sistema muestra al cliente la confirmación con el número de seguimiento.',
    ],
    flujosAlternos: [
      {
        titulo: 'A1. Cotización previa sin registrar',
        pasos: [
          'En el paso 6, el cliente selecciona "Solo cotizar" en lugar de confirmar.',
          'El sistema guarda la cotización por 24 horas con un identificador temporal.',
          'El sistema muestra al cliente el detalle de la cotización y vuelve al menú principal.',
        ],
      },
      {
        titulo: 'A2. Cliente registrado por primera vez',
        pasos: [
          'En el paso 3, si el cliente no tiene dirección frecuente registrada, el sistema le ofrece guardarla.',
          'El cliente acepta o rechaza guardar la dirección.',
          'El flujo continúa en el paso 4.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'E1. Dirección fuera de cobertura',
        descripcion:
          'Si el origen o destino no está dentro de las zonas de cobertura, el sistema informa al cliente y le sugiere las zonas disponibles. El pedido no se registra.',
      },
      {
        titulo: 'E2. Servicio de tarifas no disponible',
        descripcion:
          'Si el servicio de cálculo de tarifas no responde, el sistema muestra un mensaje de error y permite reintentar. El pedido no se registra.',
      },
      {
        titulo: 'E3. Datos inválidos',
        descripcion:
          'Si alguno de los campos obligatorios no cumple con el formato esperado, el sistema marca el error y solicita corrección.',
      },
    ],
    postcondiciones: [
      'El pedido queda registrado en el sistema con estado "Pendiente de asignación".',
      'El cliente recibe un número de seguimiento por correo electrónico.',
      'El supervisor logístico recibe una notificación.',
    ],
  },
  {
    codigo: 'CU-02',
    nombre: 'Realizar entrega',
    actores: ['repartidor'],
    tipo: 'principal',
    precondiciones: [
      'El repartidor está autenticado en su aplicación móvil.',
      'El repartidor tiene al menos un paquete asignado en su ruta del día.',
      'El paquete a entregar está en estado "En ruta".',
    ],
    descripcion:
      'Permite al repartidor registrar la entrega de un paquete en el destino acordado. Incluye la captura de evidencia (firma y/o foto), la confirmación de la recepción y la actualización inmediata del estado del paquete en el sistema.',
    flujoNormal: [
      'El repartidor abre su ruta del día en la aplicación móvil.',
      'El sistema muestra la lista de paquetes asignados ordenada por proximidad.',
      'El repartidor selecciona el paquete que va a entregar.',
      'El sistema muestra los detalles del paquete y los datos del destinatario.',
      'El repartidor confirma la llegada al destino.',
      'El repartidor captura la evidencia de entrega: foto del paquete y firma del receptor (CU-Registrar evidencia).',
      'El repartidor ingresa observaciones (opcional).',
      'El repartidor marca el paquete como entregado.',
      'El sistema actualiza el estado del paquete a "Entregado".',
      'El sistema notifica al cliente sobre la entrega.',
      'El sistema actualiza el avance de la ruta del día.',
    ],
    flujosAlternos: [
      {
        titulo: 'A1. Receptor distinto al destinatario',
        pasos: [
          'En el paso 6, si quien recibe no es el destinatario, el repartidor selecciona "Otro receptor".',
          'El sistema solicita nombre y documento del receptor.',
          'El repartidor ingresa los datos y continúa en el paso 7.',
        ],
      },
      {
        titulo: 'A2. Entrega sin firma',
        pasos: [
          'En el paso 6, si el cliente eligió la modalidad "Contactless", el repartidor solo captura foto del paquete en el lugar de entrega.',
          'El flujo continúa en el paso 7.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'E1. Receptor ausente',
        descripcion:
          'Si no hay nadie en el destino, el repartidor selecciona "Entrega fallida — ausente", indica la causa y el sistema reprograma el paquete para el siguiente turno.',
      },
      {
        titulo: 'E2. Sin conexión a Internet',
        descripcion:
          'Si el dispositivo está sin conexión, la entrega queda registrada localmente y se sincroniza automáticamente al recuperar la conexión.',
      },
      {
        titulo: 'E3. Dirección incorrecta',
        descripcion:
          'Si la dirección no existe o es errónea, el repartidor reporta la incidencia y el supervisor procede a contactar al cliente.',
      },
    ],
    postcondiciones: [
      'El paquete queda en estado "Entregado" con su evidencia almacenada.',
      'El cliente recibe una notificación con la confirmación de entrega.',
      'La ruta del día del repartidor refleja el avance actualizado.',
    ],
  },
  {
    codigo: 'CU-03',
    nombre: 'Asignar ruta automáticamente',
    actores: ['supervisor'],
    tipo: 'secundario',
    precondiciones: [
      'El supervisor está autenticado.',
      'Existen pedidos en estado "Pendiente de asignación".',
      'Existen repartidores disponibles para la jornada.',
    ],
    descripcion:
      'Permite al supervisor logístico generar y validar la asignación automática de rutas, distribuyendo los pedidos pendientes entre los repartidores disponibles según ubicación, carga actual y zona de cobertura.',
    flujoNormal: [
      'El supervisor accede al módulo "Asignación de rutas".',
      'El sistema muestra los pedidos pendientes y los repartidores disponibles.',
      'El supervisor selecciona la opción "Generar asignación automática".',
      'El sistema ejecuta el algoritmo de optimización de rutas (CU-Optimizar ruta).',
      'El sistema muestra la propuesta de asignación: pedidos por repartidor con la ruta sugerida.',
      'El supervisor revisa la propuesta.',
      'El supervisor confirma la asignación.',
      'El sistema actualiza el estado de los pedidos a "En ruta".',
      'El sistema notifica a cada repartidor de su ruta del día.',
    ],
    flujosAlternos: [
      {
        titulo: 'A1. Ajuste manual antes de confirmar',
        pasos: [
          'En el paso 6, el supervisor reasigna manualmente uno o varios pedidos a otros repartidores.',
          'El sistema valida que la nueva asignación sea factible (capacidad, zona).',
          'El flujo continúa en el paso 7.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'E1. Sin repartidores disponibles',
        descripcion:
          'Si no hay repartidores disponibles, el sistema informa al supervisor y permite priorizar pedidos para la próxima jornada.',
      },
      {
        titulo: 'E2. Pedidos sin cobertura',
        descripcion:
          'Si existen pedidos cuya zona no está cubierta por ningún repartidor, el sistema los marca y los excluye de la asignación.',
      },
    ],
    postcondiciones: [
      'Los pedidos quedan asignados a un repartidor con una ruta optimizada.',
      'Cada repartidor recibe su ruta del día en su aplicación.',
      'Queda un registro de la asignación con timestamp y supervisor responsable.',
    ],
  },
  {
    codigo: 'CU-04',
    nombre: 'Generar reporte de desempeño',
    actores: ['administrador'],
    tipo: 'secundario',
    precondiciones: [
      'El administrador está autenticado.',
      'Existen datos operativos registrados en el período consultado.',
    ],
    descripcion:
      'Permite al administrador generar reportes consolidados de desempeño operativo: entregas realizadas, retrasos, paquetes por repartidor, facturación y otros indicadores clave para la toma de decisiones.',
    flujoNormal: [
      'El administrador accede al módulo "Reportes".',
      'El sistema muestra el catálogo de reportes disponibles.',
      'El administrador selecciona el tipo de reporte deseado.',
      'El sistema solicita los filtros (rango de fechas, zona, repartidor).',
      'El administrador define los filtros.',
      'El sistema procesa la consulta y muestra el reporte en pantalla.',
      'El administrador puede exportar el reporte a PDF o Excel.',
    ],
    flujosAlternos: [
      {
        titulo: 'A1. Reporte programado',
        pasos: [
          'En el paso 6, el administrador elige programar el reporte para envío periódico por correo.',
          'El sistema solicita la periodicidad y los destinatarios.',
          'El sistema guarda la programación y la confirma.',
        ],
      },
    ],
    excepciones: [
      {
        titulo: 'E1. Sin datos en el período',
        descripcion:
          'Si los filtros no producen resultados, el sistema lo informa y sugiere ampliar el rango.',
      },
      {
        titulo: 'E2. Reporte demasiado extenso',
        descripcion:
          'Si el reporte excede los límites de procesamiento, el sistema lo encola y notifica al administrador cuando esté listo.',
      },
    ],
    postcondiciones: [
      'El administrador obtiene un reporte consolidado consultable en pantalla.',
      'Si lo solicita, el reporte queda disponible en formato PDF o Excel para descarga.',
      'Si programó envío periódico, queda registrado en el sistema.',
    ],
  },
]

export const useCaseByCodigo = (codigo: string): UseCase | undefined =>
  useCases.find((uc) => uc.codigo === codigo)
