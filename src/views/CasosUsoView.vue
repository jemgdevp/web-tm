<script setup lang="ts">
import { ArrowRight, Link2, Maximize2 } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MermaidDiagram from '@/components/content/MermaidDiagram.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { useCaseDiagramMermaid, useCaseDiagramResumen } from '@/data/useCaseDiagram'
import { useCases } from '@/data/useCases'

useSectionAnimation()
</script>

<template>
  <section>
    <PageHeader
      :numero="5"
      titulo="Diagrama de casos de uso"
      subtitulo="Modelado UML de TaskManager: Invitado y Usuario autenticado frente al sistema, con relaciones «include» hacia Validar token y mensajes en tiempo real."
    />

    <!-- Diagrama -->
    <div data-anim class="mb-10">
      <div class="mb-3 flex items-center justify-between">
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Diagrama UML
        </p>
        <span class="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <Maximize2 class="size-3" />
          Desplazar para ver completo
        </span>
      </div>
      <div class="relative -mx-4 sm:mx-0">
        <div
          class="pointer-events-none absolute inset-x-0 -top-px h-px animate-shimmer-brand"
          aria-hidden="true"
        />
        <MermaidDiagram
          :source="useCaseDiagramMermaid"
          id="cu-diagram"
          aria-label="Diagrama de casos de uso del sistema TaskManager"
        />
      </div>
    </div>

    <!-- Resumen actores ↔ casos -->
    <div data-anim class="mb-10">
      <h2 class="font-heading text-xl font-bold tracking-tight">
        Actores y sus casos de uso
      </h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Distribución de los ocho casos de uso entre los actores del sistema.
      </p>

      <div class="-mx-4 mt-4 overflow-x-auto sm:mx-0">
        <div class="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-1/3">Actor</TableHead>
                <TableHead>Casos de uso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="r in useCaseDiagramResumen.actores" :key="r.actor">
                <TableCell class="font-medium">{{ r.actor }}</TableCell>
                <TableCell>
                  <div class="flex flex-wrap gap-1.5">
                    <Badge
                      v-for="c in r.casos"
                      :key="c"
                      variant="secondary"
                      class="font-mono text-[11px]"
                    >
                      {{ c }}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

    <!-- Casos de uso (cards) -->
    <div data-anim class="mb-10">
      <h2 class="font-heading text-xl font-bold tracking-tight">Casos de uso identificados</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Cuatro casos de uso principales (CRUD y autenticación) y cuatro secundarios (docs, verificación, realtime y logout).
      </p>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          v-for="uc in useCases"
          :key="uc.codigo"
          class="border-border"
        >
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between">
              <Badge
                :variant="uc.tipo === 'principal' ? 'default' : 'secondary'"
                class="font-mono text-[11px]"
                :class="uc.tipo === 'principal' ? 'bg-brand text-brand-foreground hover:bg-brand/90' : ''"
              >
                {{ uc.codigo }}
              </Badge>
              <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {{ uc.tipo }}
              </span>
            </div>
            <CardTitle class="mt-3 text-base">{{ uc.nombre }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm">
            <p class="text-muted-foreground">{{ uc.descripcion }}</p>
            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-muted-foreground">Actor:</span>
              <Badge
                v-for="actorId in uc.actores"
                :key="actorId"
                variant="outline"
                class="text-[11px] capitalize"
              >
                {{ actorId }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Relaciones include / eventos -->
    <div data-anim>
      <h2 class="font-heading text-xl font-bold tracking-tight">Relaciones del diagrama</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Relaciones «include» (siempre se ejecuta el caso reutilizado) y mensajes «eventos» (broadcast realtime que refresca la vista).
      </p>

      <div class="-mx-4 mt-4 overflow-x-auto sm:mx-0">
        <div class="overflow-hidden rounded-lg border border-border">
          <Table class="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Caso base</TableHead>
                <TableHead></TableHead>
                <TableHead>Caso relacionado</TableHead>
                <TableHead>Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(rel, i) in useCaseDiagramResumen.relaciones" :key="i">
                <TableCell>
                  <span class="inline-flex items-center gap-1 font-mono text-xs">
                    <Link2 class="size-3 text-brand" />
                    {{ rel.tipo }}
                  </span>
                </TableCell>
                <TableCell class="font-medium">{{ rel.desde }}</TableCell>
                <TableCell class="text-muted-foreground">
                  <ArrowRight class="size-3.5" />
                </TableCell>
                <TableCell class="font-medium">{{ rel.hacia }}</TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ rel.descripcion }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </section>
</template>
