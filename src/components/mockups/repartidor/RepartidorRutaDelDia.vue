<script setup lang="ts">
import {
  Menu,
  Bell,
  Package,
  Navigation,
  Clock,
  CircleCheckBig,
  ArrowRight,
  TrendingUp,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

interface Stop {
  codigo: string
  direccion: string
  zona: string
  ventana: string
  distancia: string
  estado: 'entregado' | 'en-ruta' | 'pendiente'
}

const stops: Stop[] = [
  { codigo: 'MSJ-2026-04102', direccion: 'Cra 11 #82-30', zona: 'Chapinero', ventana: '08:00–09:00', distancia: '0.2 km', estado: 'entregado' },
  { codigo: 'MSJ-2026-04108', direccion: 'Cl 72 #5-12', zona: 'Quinta Camacho', ventana: '08:30–09:30', distancia: '0.8 km', estado: 'entregado' },
  { codigo: 'MSJ-2026-04115', direccion: 'Cra 7 #45-09', zona: 'La Merced', ventana: '09:00–10:00', distancia: '1.1 km', estado: 'entregado' },
  { codigo: 'MSJ-2026-04121', direccion: 'Cl 53 #10-44', zona: 'Galerías', ventana: '09:30–10:30', distancia: '1.6 km', estado: 'entregado' },
  { codigo: 'MSJ-2026-04127', direccion: 'Cra 43 #5-128', zona: 'El Poblado', ventana: '10:00–11:00', distancia: '2.4 km', estado: 'en-ruta' },
  { codigo: 'MSJ-2026-04134', direccion: 'Cl 26 #14-22', zona: 'Centro', ventana: '11:00–12:00', distancia: '3.8 km', estado: 'pendiente' },
  { codigo: 'MSJ-2026-04141', direccion: 'Av 19 #100-08', zona: 'Usaquén', ventana: '12:00–13:00', distancia: '6.4 km', estado: 'pendiente' },
]

const { enterUp } = useMockupMotion()

const total = stops.length
const completed = stops.filter((s) => s.estado === 'entregado').length
const progressPct = Math.round((completed / total) * 100)

const next = stops.find((s) => s.estado === 'en-ruta')

const stateMeta: Record<Stop['estado'], { label: string; cls: string }> = {
  entregado: {
    label: 'Entregado',
    cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  'en-ruta': {
    label: 'En ruta',
    cls: 'bg-brand/15 text-brand',
  },
  pendiente: {
    label: 'Pendiente',
    cls: 'bg-muted text-muted-foreground',
  },
}
</script>

<template>
  <div class="flex h-full flex-col bg-muted/30">
    <!-- Header -->
    <header
      class="flex items-center justify-between border-b border-border bg-card px-4 py-3"
    >
      <button
        type="button"
        class="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
        aria-label="Menú"
      >
        <Menu class="size-5" />
      </button>
      <div class="text-center">
        <p class="font-heading text-sm font-semibold">Ruta del día</p>
        <p class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Martes, 19 may
        </p>
      </div>
      <button
        type="button"
        class="relative flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
        aria-label="Notificaciones"
      >
        <Bell class="size-4" />
        <span class="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
      </button>
    </header>

    <div class="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      <!-- Saludo + progreso -->
      <div
        v-motion="enterUp(0)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <div class="flex items-center gap-3">
          <span class="flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground font-semibold">
            CM
          </span>
          <div class="flex-1">
            <p class="text-xs text-muted-foreground">¡Buenos días!</p>
            <p class="text-sm font-semibold">Carlos Méndez</p>
          </div>
          <div class="text-right">
            <p class="font-mono text-2xl font-bold text-brand">{{ completed }}/{{ total }}</p>
            <p class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              entregas
            </p>
          </div>
        </div>

        <div class="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full bg-brand transition-all"
            :style="{ width: `${progressPct}%` }"
          />
        </div>
        <p class="mt-1.5 text-[11px] text-muted-foreground">
          {{ progressPct }}% de la jornada completada
        </p>
      </div>

      <!-- KPI strip -->
      <div
        v-motion="enterUp(0.05)"
        class="grid grid-cols-3 gap-2"
      >
        <div class="rounded-lg border border-border bg-card px-3 py-2.5">
          <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Navigation class="size-3" /> Km hoy
          </div>
          <p class="mt-0.5 font-mono text-base font-bold">14.2</p>
        </div>
        <div class="rounded-lg border border-border bg-card px-3 py-2.5">
          <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock class="size-3" /> A tiempo
          </div>
          <p class="mt-0.5 font-mono text-base font-bold text-emerald-600">
            100%
          </p>
        </div>
        <div class="rounded-lg border border-border bg-card px-3 py-2.5">
          <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <TrendingUp class="size-3" /> Restantes
          </div>
          <p class="mt-0.5 font-mono text-base font-bold">{{ total - completed }}</p>
        </div>
      </div>

      <!-- Próxima entrega destacada -->
      <div
        v-if="next"
        v-motion="enterUp(0.1)"
        class="overflow-hidden rounded-xl border-2 border-brand bg-brand/[0.04] p-4 ring-2 ring-brand/10"
      >
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
            Próxima entrega
          </span>
          <Badge class="bg-brand text-brand-foreground hover:bg-brand/90">
            <span class="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-brand-foreground" />
            En ruta
          </Badge>
        </div>
        <p class="mt-2 text-base font-semibold">{{ next.direccion }}</p>
        <p class="text-xs text-muted-foreground">{{ next.zona }} · {{ next.codigo }}</p>

        <div class="mt-3 flex items-baseline justify-between text-xs">
          <span class="inline-flex items-center gap-1 text-muted-foreground">
            <Navigation class="size-3" /> {{ next.distancia }}
          </span>
          <span class="inline-flex items-center gap-1 text-muted-foreground">
            <Clock class="size-3" /> {{ next.ventana }}
          </span>
        </div>

        <button
          type="button"
          class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Iniciar entrega
          <ArrowRight class="size-4" />
        </button>
      </div>

      <!-- Lista compacta -->
      <div v-motion="enterUp(0.15)">
        <p class="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Todos los paquetes ({{ total }})
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="(s, i) in stops"
            :key="s.codigo"
            class="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
            :class="{ 'opacity-70': s.estado === 'pendiente' }"
          >
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-md"
              :class="
                s.estado === 'entregado'
                  ? 'bg-emerald-500/15 text-emerald-600'
                  : s.estado === 'en-ruta'
                  ? 'bg-brand/15 text-brand'
                  : 'bg-muted text-muted-foreground'
              "
            >
              <CircleCheckBig v-if="s.estado === 'entregado'" class="size-4" />
              <Package v-else class="size-4" />
            </span>

            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-medium">{{ s.direccion }}</p>
              <p class="truncate font-mono text-[10px] text-muted-foreground">
                #{{ i + 1 }} · {{ s.codigo.split('-').pop() }} · {{ s.zona }}
              </p>
            </div>

            <Badge
              variant="secondary"
              class="text-[10px]"
              :class="stateMeta[s.estado].cls"
            >
              {{ stateMeta[s.estado].label }}
            </Badge>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
