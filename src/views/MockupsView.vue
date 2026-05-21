<script setup lang="ts">
import {
  LogIn,
  ListTodo,
  FileEdit,
  Radio,
  type LucideIcon,
} from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MockupFrame from '@/components/mockups/MockupFrame.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useSectionAnimation } from '@/composables/useSectionAnimation'

import HomeGuest from '@/components/mockups/taskmanager/HomeGuest.vue'
import TasksList from '@/components/mockups/taskmanager/TasksList.vue'
import TaskModal from '@/components/mockups/taskmanager/TaskModal.vue'
import RealtimeConsole from '@/components/mockups/taskmanager/RealtimeConsole.vue'

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
  id: 'cu-01' | 'cu-02' | 'cu-03' | 'cu-04'
  nombre: string
  icon: LucideIcon
  descripcion: string
  frame: 'desktop' | 'mobile'
  cu: string
  tipo: 'Primario' | 'Secundario'
  mockups: MockupItem[]
}

const grupos: Grupo[] = [
  {
    id: 'cu-01',
    nombre: 'Registrarse / Iniciar sesión',
    icon: LogIn,
    frame: 'desktop',
    cu: 'CU-01',
    tipo: 'Primario',
    descripcion:
      'Landing público (guest.home) con el hero del producto y los dos accesos: modal de Login/Register y enlace a la documentación OpenAPI generada por Scramble.',
    mockups: [
      {
        id: 'home',
        titulo: 'Home pública',
        caption: 'CU-01 · ruta guest.home · path /',
        url: 'task-manager.app',
        device: 'Desktop · 1440 px',
        component: HomeGuest,
      },
    ],
  },
  {
    id: 'cu-02',
    nombre: 'Listar y paginar tareas',
    icon: ListTodo,
    frame: 'desktop',
    cu: 'CU-02',
    tipo: 'Primario',
    descripcion:
      'Vista tasks.index protegida por meta.requiresAuth. Carga GET /api/tasks?page=1 con Bearer y muestra la colección paginada con estados pending / in_progress / done.',
    mockups: [
      {
        id: 'list',
        titulo: 'Mis tareas',
        caption: 'CU-TASK-04 · «include» Validar token',
        url: 'task-manager.app/tasks',
        device: 'Desktop · 1440 px',
        component: TasksList,
      },
    ],
  },
  {
    id: 'cu-03',
    nombre: 'Crear / editar / eliminar tarea',
    icon: FileEdit,
    frame: 'desktop',
    cu: 'CU-03',
    tipo: 'Primario',
    descripcion:
      'Modal del CRUD: POST /api/tasks para crear, PUT/PATCH /api/tasks/{id} para editar y DELETE /api/tasks/{id} para eliminar. Tras la respuesta OK la SPA actualiza la lista y queda a la escucha de eventos broadcast.',
    mockups: [
      {
        id: 'modal',
        titulo: 'Nueva tarea',
        caption: 'CU-TASK-05 · POST /api/tasks',
        url: 'task-manager.app/tasks (modal)',
        device: 'Desktop · 1440 px',
        component: TaskModal,
      },
    ],
  },
  {
    id: 'cu-04',
    nombre: 'Sincronización en tiempo real',
    icon: Radio,
    frame: 'desktop',
    cu: 'CU-04',
    tipo: 'Secundario',
    descripcion:
      'Suscripción Echo a los canales tasks y user.{id}.tasks. Los eventos TaskCreated, TaskUpdated y TaskDeleted refrescan la lista local sin recargar la página.',
    mockups: [
      {
        id: 'console',
        titulo: 'DevTools — Echo',
        caption: 'CU-RT-06 · canales tasks + user.{id}.tasks',
        url: 'task-manager.app/tasks (devtools)',
        device: 'Desktop · 1440 px',
        component: RealtimeConsole,
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
      subtitulo="Cada mockup enlaza un caso de uso del diagrama con pantallas concretas de la SPA Vue Router. Los CU primarios cubren el objetivo del sistema; los secundarios complementan (docs, tiempo real)."
    />

    <Tabs default-value="cu-01" data-anim class="w-full">
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
              <Badge variant="outline" class="font-mono text-[10px]">
                {{ g.tipo }}
              </Badge>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ g.descripcion }}
            </p>
          </div>
        </div>

        <!-- Mockups -->
        <div class="flex flex-col gap-6 sm:gap-8">
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
