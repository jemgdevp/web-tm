import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export interface SectionMeta {
  numero: number
  titulo: string
  subtitulo: string
  icon: string
}

declare module 'vue-router' {
  interface RouteMeta {
    seccion?: SectionMeta
  }
}

export const sectionRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'portada',
    component: () => import('@/views/PortadaView.vue'),
    meta: {
      seccion: {
        numero: 1,
        titulo: 'Portada',
        subtitulo: 'Información del proyecto',
        icon: 'BookOpenText',
      },
    },
  },
  {
    path: '/problema',
    name: 'problema',
    component: () => import('@/views/ProblemaView.vue'),
    meta: {
      seccion: {
        numero: 2,
        titulo: 'Planteamiento del problema',
        subtitulo: 'Contexto, actores y necesidades',
        icon: 'FileQuestion',
      },
    },
  },
  {
    path: '/requerimientos',
    name: 'requerimientos',
    component: () => import('@/views/RequerimientosView.vue'),
    meta: {
      seccion: {
        numero: 3,
        titulo: 'Requerimientos',
        subtitulo: 'Negocio, usuario, sistema y F/NF',
        icon: 'ListChecks',
      },
    },
  },
  {
    path: '/casos-de-uso',
    name: 'casos-de-uso',
    component: () => import('@/views/CasosUsoView.vue'),
    meta: {
      seccion: {
        numero: 4,
        titulo: 'Diagrama de casos de uso',
        subtitulo: 'Actores, casos y relaciones UML',
        icon: 'Workflow',
      },
    },
  },
  {
    path: '/descripciones',
    name: 'descripciones',
    component: () => import('@/views/DescripcionesView.vue'),
    meta: {
      seccion: {
        numero: 5,
        titulo: 'Descripciones de casos de uso',
        subtitulo: '2 principales y 2 secundarios',
        icon: 'NotebookText',
      },
    },
  },
  {
    path: '/actividad',
    name: 'actividad',
    component: () => import('@/views/ActividadView.vue'),
    meta: {
      seccion: {
        numero: 6,
        titulo: 'Diagramas de actividad',
        subtitulo: 'Flujo de los casos de uso principales',
        icon: 'GitBranch',
      },
    },
  },
  {
    path: '/mockups',
    name: 'mockups',
    component: () => import('@/views/MockupsView.vue'),
    meta: {
      seccion: {
        numero: 7,
        titulo: 'Mockups',
        subtitulo: 'Vista previa interactiva del sistema',
        icon: 'MonitorSmartphone',
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...sectionRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
