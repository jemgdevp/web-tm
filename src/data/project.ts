import type { ProjectInfo } from '@/types/domain'

export const projectInfo: ProjectInfo = {
  titulo: 'Sistema de Gestión Logística',
  subtitulo: 'Análisis y diseño de un sistema de información para empresa de mensajería',
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
    'Una empresa de mensajería presenta retrasos frecuentes en la entrega de paquetes y pérdidas durante el proceso logístico. La operación actual es predominantemente manual: las rutas se asignan a criterio del supervisor, el seguimiento se hace por teléfono y los registros de entrega quedan en formularios físicos, lo que dificulta la trazabilidad y la generación oportuna de facturas.',
  contexto:
    'El sistema propuesto pretende digitalizar la operación de extremo a extremo: desde el registro del pedido por parte del cliente, pasando por la asignación automatizada de rutas y el seguimiento en tiempo real de la entrega, hasta la generación de reportes de desempeño para la gerencia. El alcance es el análisis de requerimientos y el modelado UML del sistema; la implementación funcional queda fuera del alcance.',
  actualmente: [
    'Las rutas se asignan manualmente por el supervisor logístico.',
    'El seguimiento de pedidos se realiza vía telefónica.',
    'Las entregas se registran en formularios físicos.',
    'La facturación se genera de forma manual.',
  ],
  problemas: [
    'Paquetes extraviados por falta de trazabilidad.',
    'Retrasos frecuentes en las entregas.',
    'Falta de trazabilidad operativa.',
    'Generación de facturas manual y propensa a errores.',
  ],
  seRequiere: [
    'Registrar los pedidos de manera digital.',
    'Asignar rutas automáticamente al repartidor disponible.',
    'Realizar seguimiento de las entregas en tiempo real.',
    'Generar reportes de desempeño y entregas.',
  ],
}
