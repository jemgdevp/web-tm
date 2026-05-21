<script setup lang="ts">
import { User, Truck, Map, ShieldCheck, type LucideIcon } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MockupFrame from '@/components/mockups/MockupFrame.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useSectionAnimation } from '@/composables/useSectionAnimation'

import ClienteCrearPedido from '@/components/mockups/cliente/ClienteCrearPedido.vue'
import ClienteRastrearPedido from '@/components/mockups/cliente/ClienteRastrearPedido.vue'
import RepartidorRutaDelDia from '@/components/mockups/repartidor/RepartidorRutaDelDia.vue'
import RepartidorConfirmarEntrega from '@/components/mockups/repartidor/RepartidorConfirmarEntrega.vue'
import SupervisorAsignarRutas from '@/components/mockups/supervisor/SupervisorAsignarRutas.vue'
import SupervisorMonitoreo from '@/components/mockups/supervisor/SupervisorMonitoreo.vue'
import AdministradorReportes from '@/components/mockups/administrador/AdministradorReportes.vue'
import AdministradorUsuarios from '@/components/mockups/administrador/AdministradorUsuarios.vue'

useSectionAnimation()

interface MockupItem {
  id: string
  titulo: string
  caption: string
  url: string
  device: string
  component: ReturnType<typeof Object>
}

interface Grupo {
  id: 'cliente' | 'repartidor' | 'supervisor' | 'administrador'
  nombre: string
  icon: LucideIcon
  descripcion: string
  frame: 'desktop' | 'mobile'
  cu: string
  mockups: MockupItem[]
}

const grupos: Grupo[] = [
  {
    id: 'cliente',
    nombre: 'Cliente',
    icon: User,
    frame: 'mobile',
    cu: 'CU-01',
    descripcion:
      'Aplicación móvil para que el cliente registre nuevos envíos y consulte en tiempo real el estado de su paquete.',
    mockups: [
      {
        id: 'crear',
        titulo: 'Crear pedido',
        caption: 'CU-01 Registrar pedido · «include» Calcular tarifa',
        url: 'app.logistica.app/nuevo',
        device: 'iPhone 14',
        component: ClienteCrearPedido,
      },
      {
        id: 'rastrear',
        titulo: 'Rastrear pedido',
        caption: 'RF-04 Rastrear paquete en tiempo real',
        url: 'app.logistica.app/seguimiento',
        device: 'iPhone 14',
        component: ClienteRastrearPedido,
      },
    ],
  },
  {
    id: 'repartidor',
    nombre: 'Repartidor',
    icon: Truck,
    frame: 'mobile',
    cu: 'CU-02',
    descripcion:
      'Aplicación móvil del repartidor para gestionar la ruta del día y confirmar entregas con captura de evidencia.',
    mockups: [
      {
        id: 'ruta',
        titulo: 'Ruta del día',
        caption: 'CU-02 Realizar entrega — visión general',
        url: 'app.logistica.app/ruta',
        device: 'Pixel 8',
        component: RepartidorRutaDelDia,
      },
      {
        id: 'confirmar',
        titulo: 'Confirmar entrega',
        caption: 'CU-02 · «include» Registrar evidencia',
        url: 'app.logistica.app/entregar',
        device: 'Pixel 8',
        component: RepartidorConfirmarEntrega,
      },
    ],
  },
  {
    id: 'supervisor',
    nombre: 'Supervisor',
    icon: Map,
    frame: 'desktop',
    cu: 'CU-03',
    descripcion:
      'Consola web del supervisor logístico para asignar rutas y monitorear el operativo en tiempo real.',
    mockups: [
      {
        id: 'asignar',
        titulo: 'Asignar rutas',
        caption: 'CU-03 Asignar ruta automáticamente · «include» Optimizar ruta',
        url: 'logistica.app/asignacion',
        device: 'Desktop · 1440 px',
        component: SupervisorAsignarRutas,
      },
      {
        id: 'monitoreo',
        titulo: 'Monitoreo operativo',
        caption: 'RF-04 + RU-05 Vista en tiempo real',
        url: 'logistica.app/monitoreo',
        device: 'Desktop · 1440 px',
        component: SupervisorMonitoreo,
      },
    ],
  },
  {
    id: 'administrador',
    nombre: 'Administrador',
    icon: ShieldCheck,
    frame: 'desktop',
    cu: 'CU-04',
    descripcion:
      'Panel administrativo para reportes ejecutivos y gestión integral de usuarios y roles.',
    mockups: [
      {
        id: 'reportes',
        titulo: 'Reportes',
        caption: 'CU-04 Generar reporte de desempeño',
        url: 'logistica.app/reportes',
        device: 'Desktop · 1440 px',
        component: AdministradorReportes,
      },
      {
        id: 'usuarios',
        titulo: 'Usuarios y roles',
        caption: 'RF-08 Gestionar usuarios y roles',
        url: 'logistica.app/usuarios',
        device: 'Desktop · 1440 px',
        component: AdministradorUsuarios,
      },
    ],
  },
]
</script>

<template>
  <section>
    <PageHeader
      :numero="7"
      titulo="Mockups"
      subtitulo="Vista previa interactiva de las interfaces principales por actor. Cliente y Repartidor operan desde móvil; Supervisor y Administrador desde dashboard web. Cada mockup se alinea con uno de los casos de uso identificados."
    />

    <Tabs default-value="cliente" data-anim class="w-full">
      <TabsList
        class="grid h-auto w-full grid-cols-2 gap-1 bg-muted/50 p-1 sm:grid-cols-4"
      >
        <TabsTrigger
          v-for="g in grupos"
          :key="g.id"
          :value="g.id"
          class="flex h-auto flex-col items-center gap-1 py-2.5"
        >
          <component :is="g.icon" class="size-4 text-brand" />
          <span class="text-xs font-semibold">{{ g.nombre }}</span>
          <span class="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {{ g.cu }}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        v-for="g in grupos"
        :key="g.id"
        :value="g.id"
        class="mt-6 focus-visible:ring-0"
      >
        <!-- Descripción del grupo -->
        <div class="mb-6 flex items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <component :is="g.icon" class="size-5" />
          </span>
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-heading text-lg font-bold">{{ g.nombre }}</h3>
              <Badge class="bg-brand text-brand-foreground hover:bg-brand/90 font-mono text-[10px]">
                {{ g.cu }}
              </Badge>
              <Badge variant="outline" class="font-mono text-[10px] capitalize">
                {{ g.frame === 'mobile' ? 'aplicación móvil' : 'panel web' }}
              </Badge>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ g.descripcion }}
            </p>
          </div>
        </div>

        <!-- Mockups -->
        <div
          :class="[
            'gap-6 sm:gap-8',
            g.frame === 'mobile' ? 'grid sm:grid-cols-2' : 'flex flex-col',
          ]"
        >
          <MockupFrame
            v-for="m in g.mockups"
            :key="m.id"
            :frame="g.frame"
            :url="m.url"
            :device="m.device"
            :title="m.titulo"
            :caption="m.caption"
          >
            <component :is="m.component" />
          </MockupFrame>
        </div>
      </TabsContent>
    </Tabs>
  </section>
</template>
