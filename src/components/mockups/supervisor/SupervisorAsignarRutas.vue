<script setup lang="ts">
import {
  Sparkles,
  Hand,
  Package,
  MapPin,
  Clock,
  Truck,
  Filter,
  Search,
  CircleCheckBig,
  ArrowRight,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface Pedido {
  id: string
  origen: string
  destino: string
  zona: string
  prioridad: 'alta' | 'media' | 'baja'
  hora: string
  seleccionado?: boolean
}

interface Repartidor {
  id: string
  nombre: string
  iniciales: string
  zona: string
  carga: number
  capacidad: number
  estado: 'disponible' | 'cerca-limite'
}

const pedidos: Pedido[] = [
  { id: 'MSJ-2026-04156', origen: 'Bodega Norte', destino: 'Cra 7 #45-09', zona: 'Centro', prioridad: 'alta', hora: '10:30', seleccionado: true },
  { id: 'MSJ-2026-04157', origen: 'Bodega Sur', destino: 'Cl 53 #10-44', zona: 'Norte', prioridad: 'media', hora: '11:00', seleccionado: true },
  { id: 'MSJ-2026-04158', origen: 'Bodega Norte', destino: 'Cra 43 #5-128', zona: 'Norte', prioridad: 'alta', hora: '11:15' },
  { id: 'MSJ-2026-04159', origen: 'Bodega Sur', destino: 'Cl 26 #14-22', zona: 'Sur', prioridad: 'media', hora: '11:45' },
  { id: 'MSJ-2026-04160', origen: 'Bodega Norte', destino: 'Av 19 #100-08', zona: 'Norte', prioridad: 'baja', hora: '12:00' },
  { id: 'MSJ-2026-04161', origen: 'Bodega Centro', destino: 'Cl 72 #5-12', zona: 'Centro', prioridad: 'alta', hora: '12:15' },
]

const repartidores: Repartidor[] = [
  { id: 'r1', nombre: 'Carlos Méndez', iniciales: 'CM', zona: 'Centro', carga: 5, capacidad: 12, estado: 'disponible' },
  { id: 'r2', nombre: 'Laura Quintero', iniciales: 'LQ', zona: 'Norte', carga: 8, capacidad: 10, estado: 'cerca-limite' },
  { id: 'r3', nombre: 'David Romero', iniciales: 'DR', zona: 'Sur', carga: 3, capacidad: 12, estado: 'disponible' },
  { id: 'r4', nombre: 'Andrea Soto', iniciales: 'AS', zona: 'Norte', carga: 4, capacidad: 10, estado: 'disponible' },
]

const { enterUp } = useMockupMotion()

const prioColor: Record<Pedido['prioridad'], string> = {
  alta: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  media: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  baja: 'bg-muted text-muted-foreground',
}
</script>

<template>
  <div class="p-5">
    <!-- Toolbar -->
    <div
      v-motion="enterUp(0)"
      class="flex flex-wrap items-center justify-between gap-3"
    >
      <div>
        <h2 class="font-heading text-lg font-bold">Asignación de rutas</h2>
        <p class="text-xs text-muted-foreground">
          {{ pedidos.length }} pedidos pendientes · {{ repartidores.length }} repartidores disponibles
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
        >
          <Hand class="size-3.5" />
          Manual
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Sparkles class="size-3.5" />
          Generar asignación automática
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div
      v-motion="enterUp(0.05)"
      class="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2"
    >
      <Filter class="size-3.5 text-muted-foreground" />
      <span class="text-[11px] uppercase tracking-wider text-muted-foreground">Zona:</span>
      <Badge variant="default" class="bg-brand text-brand-foreground hover:bg-brand/90 text-[10px]">Todas</Badge>
      <Badge variant="secondary" class="text-[10px]">Centro</Badge>
      <Badge variant="secondary" class="text-[10px]">Norte</Badge>
      <Badge variant="secondary" class="text-[10px]">Sur</Badge>

      <div class="ml-auto relative">
        <Search class="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input class="h-8 w-44 pl-8 text-xs" placeholder="Buscar pedido…" />
      </div>
    </div>

    <!-- Dos columnas: pedidos / repartidores -->
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <!-- Pedidos pendientes -->
      <section
        v-motion="enterUp(0.1)"
        class="rounded-xl border border-border bg-card"
      >
        <header class="flex items-center justify-between border-b border-border px-4 py-3">
          <div class="flex items-center gap-2">
            <Package class="size-4 text-brand" />
            <h3 class="font-heading text-sm font-bold">Pedidos pendientes</h3>
          </div>
          <span class="font-mono text-[10px] text-muted-foreground">
            2 / {{ pedidos.length }} seleccionados
          </span>
        </header>

        <ul class="divide-y divide-border">
          <li
            v-for="p in pedidos"
            :key="p.id"
            class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40"
            :class="p.seleccionado ? 'bg-brand/[0.04]' : ''"
          >
            <span
              class="flex size-5 shrink-0 items-center justify-center rounded border"
              :class="
                p.seleccionado
                  ? 'border-brand bg-brand text-brand-foreground'
                  : 'border-border bg-background'
              "
            >
              <CircleCheckBig v-if="p.seleccionado" class="size-3" stroke-width="3" />
            </span>

            <div class="min-w-0 flex-1">
              <div class="flex items-baseline justify-between">
                <p class="font-mono text-[10px] text-muted-foreground">
                  {{ p.id.split('-').pop() }}
                </p>
                <span class="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock class="size-3" /> {{ p.hora }}
                </span>
              </div>
              <p class="mt-0.5 truncate text-sm font-medium">{{ p.destino }}</p>
              <p class="truncate text-[11px] text-muted-foreground">
                <MapPin class="-mt-0.5 inline size-3" />
                {{ p.origen }} → {{ p.destino }}
              </p>
            </div>

            <Badge variant="secondary" :class="prioColor[p.prioridad] + ' text-[10px] capitalize'">
              {{ p.prioridad }}
            </Badge>
          </li>
        </ul>
      </section>

      <!-- Repartidores -->
      <section
        v-motion="enterUp(0.15)"
        class="rounded-xl border border-border bg-card"
      >
        <header class="flex items-center justify-between border-b border-border px-4 py-3">
          <div class="flex items-center gap-2">
            <Truck class="size-4 text-brand" />
            <h3 class="font-heading text-sm font-bold">Repartidores disponibles</h3>
          </div>
          <span class="font-mono text-[10px] text-muted-foreground">{{ repartidores.length }}</span>
        </header>

        <ul class="divide-y divide-border">
          <li
            v-for="r in repartidores"
            :key="r.id"
            class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40"
          >
            <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
              {{ r.iniciales }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex items-baseline justify-between gap-2">
                <p class="truncate text-sm font-semibold">{{ r.nombre }}</p>
                <span
                  class="font-mono text-[10px]"
                  :class="
                    r.estado === 'cerca-limite' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                  "
                >
                  {{ r.estado === 'cerca-limite' ? 'cerca del límite' : 'disponible' }}
                </span>
              </div>
              <p class="text-[11px] text-muted-foreground">Zona {{ r.zona }}</p>

              <div class="mt-1.5 flex items-center gap-2">
                <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full"
                    :class="r.estado === 'cerca-limite' ? 'bg-amber-500' : 'bg-brand'"
                    :style="{ width: `${(r.carga / r.capacidad) * 100}%` }"
                  />
                </div>
                <span class="font-mono text-[10px] tabular-nums text-muted-foreground">
                  {{ r.carga }}/{{ r.capacidad }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- Propuesta de asignación -->
    <section
      v-motion="enterUp(0.2)"
      class="mt-4 rounded-xl border border-brand/30 bg-brand/[0.04] p-4"
    >
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Sparkles class="size-4 text-brand" />
          <h3 class="font-heading text-sm font-bold">Propuesta automática</h3>
          <Badge variant="secondary" class="bg-brand/15 text-brand text-[10px]">
            optimización de ruta
          </Badge>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90"
        >
          Confirmar
          <ArrowRight class="size-3.5" />
        </button>
      </header>

      <div class="mt-3 grid gap-2 sm:grid-cols-2">
        <div class="rounded-lg border border-border bg-background px-3 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex size-7 items-center justify-center rounded-full bg-brand/15 text-[10px] font-semibold text-brand">
              CM
            </span>
            <p class="text-xs font-semibold">Carlos Méndez</p>
            <span class="ml-auto font-mono text-[10px] text-muted-foreground">+1 pedido</span>
          </div>
          <p class="mt-1.5 text-[11px] text-muted-foreground">
            Centro · ruta optimizada 12.4 km
          </p>
        </div>
        <div class="rounded-lg border border-border bg-background px-3 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex size-7 items-center justify-center rounded-full bg-brand/15 text-[10px] font-semibold text-brand">
              AS
            </span>
            <p class="text-xs font-semibold">Andrea Soto</p>
            <span class="ml-auto font-mono text-[10px] text-muted-foreground">+1 pedido</span>
          </div>
          <p class="mt-1.5 text-[11px] text-muted-foreground">
            Norte · ruta optimizada 8.9 km
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
