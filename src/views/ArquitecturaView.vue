<script setup lang="ts">
import { Server, Monitor, ArrowRightLeft, FileJson, Route as RouteIcon, Plug, Workflow } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MermaidDiagram from '@/components/content/MermaidDiagram.vue'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import {
  archPillars,
  rfRnfMapping,
  archFlowMermaid,
  archSequenceMermaid,
  scrambleDocs,
  vueRoutes,
  apiEndpoints,
} from '@/data/architecture'

useSectionAnimation()
</script>

<template>
  <section>
    <PageHeader
      :numero="4"
      titulo="Arquitectura del sistema"
      subtitulo="Patrón cliente-servidor con API REST JSON. El frontend Vue consume la API Laravel; la capa de broadcasting notifica cambios por WebSockets (Reverb) a clientes suscritos vía Echo."
    />

    <!-- Pilares Backend / Frontend -->
    <div data-anim class="mb-10 grid gap-4 md:grid-cols-2 sm:gap-5">
      <Card v-for="(p, i) in archPillars" :key="p.titulo" class="border-border">
        <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
          <span
            class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand"
          >
            <component :is="i === 0 ? Server : Monitor" class="size-4" />
          </span>
          <CardTitle class="text-base">{{ p.titulo }}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2.5">
            <li
              v-for="(b, j) in p.bullets"
              :key="j"
              class="flex gap-2.5 text-sm leading-relaxed text-foreground"
            >
              <span
                aria-hidden="true"
                class="mt-2 inline-block size-1 shrink-0 rounded-full bg-brand"
              />
              <span>{{ b }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- Mapeo RF / RNF -->
    <Card data-anim class="mb-10 border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <ArrowRightLeft class="size-4" />
        </span>
        <CardTitle class="text-base">De requerimientos a software</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4 text-sm text-muted-foreground">
          Los RF se modelan con casos de uso; los RNF restringen calidad, seguridad y operación. Aquí
          se relacionan con piezas concretas del repositorio TaskManager.
        </p>
        <div class="-mx-4 overflow-x-auto sm:mx-0">
          <div class="overflow-hidden rounded-lg border border-border">
            <Table class="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead class="w-16">Tipo</TableHead>
                  <TableHead>Requerimiento</TableHead>
                  <TableHead>Dónde se materializa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(row, i) in rfRnfMapping" :key="i">
                  <TableCell>
                    <Badge
                      :variant="row.tipo === 'RF' ? 'default' : 'secondary'"
                      class="font-mono text-[11px]"
                      :class="row.tipo === 'RF' ? 'bg-brand text-brand-foreground hover:bg-brand/90' : ''"
                    >
                      {{ row.tipo }}
                    </Badge>
                  </TableCell>
                  <TableCell class="font-medium">{{ row.requerimiento }}</TableCell>
                  <TableCell class="font-mono text-xs text-muted-foreground">
                    {{ row.ubicacion }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Flujo general (flowchart) -->
    <Card data-anim class="mb-10 border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <Workflow class="size-4" />
        </span>
        <CardTitle class="text-base">Flujo general</CardTitle>
      </CardHeader>
      <CardContent>
        <MermaidDiagram
          :source="archFlowMermaid"
          id="arch-flow"
          aria-label="Diagrama de arquitectura cliente-servidor de TaskManager"
        />
      </CardContent>
    </Card>

    <!-- Documentación Scramble -->
    <Card data-anim class="mb-10 border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <FileJson class="size-4" />
        </span>
        <CardTitle class="text-base">Documentación OpenAPI (Scramble)</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4 text-sm text-muted-foreground">
          Scramble analiza rutas y controladores y expone una UI interactiva más el JSON OpenAPI 3.
        </p>
        <ul class="space-y-2.5">
          <li
            v-for="d in scrambleDocs"
            :key="d.ruta"
            class="grid gap-1 rounded-md border border-border bg-card/60 p-3 sm:grid-cols-[minmax(0,auto)_1fr] sm:items-baseline sm:gap-4"
          >
            <code class="break-all font-mono text-xs text-brand">{{ d.ruta }}</code>
            <span class="text-sm text-foreground">{{ d.descripcion }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Rutas Vue Router -->
    <Card data-anim class="mb-10 border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <RouteIcon class="size-4" />
        </span>
        <CardTitle class="text-base">Rutas Vue (Vue Router)</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4 text-sm text-muted-foreground">
          Fuente: <code class="font-mono text-xs">task-manager-web/src/router/index.js</code>. Base:
          <code class="font-mono text-xs">createWebHistory(import.meta.env.BASE_URL)</code>.
        </p>
        <div class="-mx-4 overflow-x-auto sm:mx-0">
          <div class="overflow-hidden rounded-lg border border-border">
            <Table class="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Ruta</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Meta / notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="r in vueRoutes" :key="r.nombre">
                  <TableCell class="font-mono text-xs">{{ r.ruta }}</TableCell>
                  <TableCell class="font-mono text-xs">{{ r.nombre }}</TableCell>
                  <TableCell class="text-sm text-muted-foreground">{{ r.meta }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <p class="mt-4 text-xs text-muted-foreground">
          <strong>beforeEach:</strong> si la ruta tiene <code class="font-mono">requiresAuth</code> y no hay
          token en <code class="font-mono">localStorage</code>, navega a <code class="font-mono">guest.home</code>.
          Si <code class="font-mono">guestOnly</code> y hay sesión: si el email no está verificado →
          <code class="font-mono">auth.verify-email</code>; si está verificado →
          <code class="font-mono">tasks.index</code>.
        </p>
      </CardContent>
    </Card>

    <!-- Endpoints API -->
    <Card data-anim class="mb-10 border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <Plug class="size-4" />
        </span>
        <CardTitle class="text-base">Endpoints API relevantes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2.5">
          <li
            v-for="(e, i) in apiEndpoints"
            :key="i"
            class="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border border-border bg-card/60 p-3"
          >
            <Badge
              variant="outline"
              class="shrink-0 font-mono text-[10px]"
            >
              {{ e.metodo }}
            </Badge>
            <code class="break-all font-mono text-xs text-brand">{{ e.ruta }}</code>
            <span class="basis-full text-sm text-muted-foreground sm:basis-auto">
              — {{ e.descripcion }}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Secuencia: login + tarea realtime -->
    <Card data-anim class="border-border">
      <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
        <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
          <Workflow class="size-4" />
        </span>
        <CardTitle class="text-base">Secuencia: login y tarea con realtime</CardTitle>
      </CardHeader>
      <CardContent>
        <MermaidDiagram
          :source="archSequenceMermaid"
          id="arch-sequence"
          aria-label="Diagrama de secuencia del login y creación de tarea con broadcasting"
        />
      </CardContent>
    </Card>
  </section>
</template>
