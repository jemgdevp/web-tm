<script setup lang="ts">
import {
  Activity,
  CircleCheckBig,
  Truck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCcw,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface Pin {
  x: number
  y: number
  estado: 'entregado' | 'en-ruta' | 'pausa' | 'incidencia'
  label?: string
}

const pins: Pin[] = [
  { x: 12, y: 70, estado: 'entregado', label: 'CM-01' },
  { x: 18, y: 50, estado: 'entregado', label: 'CM-02' },
  { x: 24, y: 60, estado: 'entregado' },
  { x: 35, y: 35, estado: 'en-ruta', label: 'AS' },
  { x: 45, y: 55, estado: 'en-ruta', label: 'CM' },
  { x: 50, y: 30, estado: 'pausa' },
  { x: 58, y: 70, estado: 'incidencia', label: '!' },
  { x: 65, y: 45, estado: 'entregado' },
  { x: 72, y: 60, estado: 'en-ruta', label: 'LQ' },
  { x: 80, y: 40, estado: 'en-ruta' },
  { x: 88, y: 55, estado: 'entregado' },
  { x: 90, y: 25, estado: 'entregado' },
]

const pinColor: Record<Pin['estado'], string> = {
  entregado: 'oklch(0.65 0.18 145)',
  'en-ruta': 'oklch(0.55 0.20 264)',
  pausa: 'oklch(0.75 0.18 80)',
  incidencia: 'oklch(0.6 0.24 25)',
}

interface ActividadFila {
  hora: string
  evento: string
  detalle: string
  tipo: 'entrega' | 'inicio' | 'incidencia' | 'pausa'
}

const actividad: ActividadFila[] = [
  { hora: '10:42', evento: 'Entrega completada', detalle: 'CM · MSJ-04127', tipo: 'entrega' },
  { hora: '10:38', evento: 'Incidencia reportada', detalle: 'LQ · dirección incorrecta', tipo: 'incidencia' },
  { hora: '10:30', evento: 'Entrega completada', detalle: 'AS · MSJ-04120', tipo: 'entrega' },
  { hora: '10:25', evento: 'Repartidor en pausa', detalle: 'DR · 15 min programados', tipo: 'pausa' },
  { hora: '10:18', evento: 'Inicio de ruta', detalle: 'LQ · 8 paquetes', tipo: 'inicio' },
  { hora: '10:08', evento: 'Entrega completada', detalle: 'CM · MSJ-04115', tipo: 'entrega' },
]

const tipoMeta: Record<ActividadFila['tipo'], { cls: string; dot: string }> = {
  entrega: { cls: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  inicio: { cls: 'text-brand', dot: 'bg-brand' },
  incidencia: { cls: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' },
  pausa: { cls: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
}

const { enterUp } = useMockupMotion()
</script>

<template>
  <div class="p-5">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="font-heading text-lg font-bold">Monitoreo en tiempo real</h2>
        <p class="text-xs text-muted-foreground">
          <Activity class="-mt-0.5 inline size-3 animate-pulse text-emerald-500" />
          Conectado · actualización cada 30 s
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative">
          <Search class="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input class="h-8 w-48 pl-8 text-xs" placeholder="Buscar repartidor o guía…" />
        </div>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent"
          aria-label="Refrescar"
        >
          <RefreshCcw class="size-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div
      v-motion="enterUp(0)"
      class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div class="rounded-xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <span class="flex size-8 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-600">
            <CircleCheckBig class="size-4" />
          </span>
          <span class="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
            <TrendingUp class="size-3" /> +12%
          </span>
        </div>
        <p class="mt-2 font-mono text-2xl font-bold tabular-nums">142</p>
        <p class="text-[11px] text-muted-foreground">Entregas hoy</p>
      </div>

      <div class="rounded-xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <span class="flex size-8 items-center justify-center rounded-md bg-brand/15 text-brand">
            <Activity class="size-4" />
          </span>
          <span class="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
            <TrendingUp class="size-3" /> +3.4%
          </span>
        </div>
        <p class="mt-2 font-mono text-2xl font-bold tabular-nums">94.8<span class="text-base text-muted-foreground">%</span></p>
        <p class="text-[11px] text-muted-foreground">A tiempo</p>
      </div>

      <div class="rounded-xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <span class="flex size-8 items-center justify-center rounded-md bg-brand/15 text-brand">
            <Truck class="size-4" />
          </span>
          <span class="text-[10px] text-muted-foreground">en vivo</span>
        </div>
        <p class="mt-2 font-mono text-2xl font-bold tabular-nums">28</p>
        <p class="text-[11px] text-muted-foreground">En ruta ahora</p>
      </div>

      <div class="rounded-xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <span class="flex size-8 items-center justify-center rounded-md bg-rose-500/15 text-rose-600">
            <AlertTriangle class="size-4" />
          </span>
          <span class="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
            <TrendingDown class="size-3" /> −2
          </span>
        </div>
        <p class="mt-2 font-mono text-2xl font-bold tabular-nums">3</p>
        <p class="text-[11px] text-muted-foreground">Incidencias</p>
      </div>
    </div>

    <!-- Map + activity -->
    <div class="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <!-- Mapa simulado -->
      <section
        v-motion="enterUp(0.06)"
        class="overflow-hidden rounded-xl border border-border bg-card"
      >
        <header class="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 class="font-heading text-sm font-bold">Mapa operativo</h3>
          <div class="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span class="inline-flex items-center gap-1">
              <span class="block size-2 rounded-full" :style="{ background: pinColor.entregado }" /> Entregado
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="block size-2 rounded-full" :style="{ background: pinColor['en-ruta'] }" /> En ruta
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="block size-2 rounded-full" :style="{ background: pinColor.pausa }" /> Pausa
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="block size-2 rounded-full" :style="{ background: pinColor.incidencia }" /> Incidencia
            </span>
          </div>
        </header>

        <div class="bg-muted/30 p-2">
          <svg
            viewBox="0 0 100 80"
            preserveAspectRatio="none"
            class="block h-72 w-full"
            aria-label="Mapa simulado del operativo"
          >
            <defs>
              <pattern id="mon-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M5 0H0V5" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#mon-grid)" class="text-muted-foreground" />

            <!-- Trayectorias -->
            <path d="M 12 70 Q 28 55, 45 55 T 80 40" fill="none" stroke="oklch(0.488 0.217 264)" stroke-width="0.4" stroke-dasharray="1 1" opacity="0.6" />
            <path d="M 35 35 Q 50 30, 65 45 T 88 55" fill="none" stroke="oklch(0.488 0.217 264)" stroke-width="0.4" stroke-dasharray="1 1" opacity="0.4" />

            <!-- Pins -->
            <g v-for="(pin, i) in pins" :key="i">
              <circle
                :cx="pin.x"
                :cy="pin.y"
                r="2.5"
                :fill="pinColor[pin.estado]"
                opacity="0.25"
              >
                <animate
                  v-if="pin.estado === 'en-ruta' || pin.estado === 'incidencia'"
                  attributeName="r"
                  values="1.5;3.5;1.5"
                  :dur="`${1.8 + (i % 3) * 0.4}s`"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                :cx="pin.x"
                :cy="pin.y"
                r="1.3"
                :fill="pinColor[pin.estado]"
                stroke="oklch(1 0 0)"
                stroke-width="0.35"
              />
              <text
                v-if="pin.label"
                :x="pin.x"
                :y="pin.y - 2"
                text-anchor="middle"
                font-size="2"
                font-weight="bold"
                :fill="pinColor[pin.estado]"
              >
                {{ pin.label }}
              </text>
            </g>
          </svg>
        </div>
      </section>

      <!-- Actividad reciente -->
      <section
        v-motion="enterUp(0.12)"
        class="rounded-xl border border-border bg-card"
      >
        <header class="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 class="font-heading text-sm font-bold">Actividad reciente</h3>
          <Badge variant="secondary" class="text-[10px]">
            <span class="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
            En vivo
          </Badge>
        </header>

        <ul class="divide-y divide-border">
          <li
            v-for="(a, i) in actividad"
            :key="i"
            class="flex items-start gap-3 px-4 py-3"
          >
            <span
              :class="`mt-1.5 block size-2 shrink-0 rounded-full ${tipoMeta[a.tipo].dot}`"
              aria-hidden="true"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-baseline justify-between gap-2">
                <p :class="`truncate text-xs font-medium ${tipoMeta[a.tipo].cls}`">
                  {{ a.evento }}
                </p>
                <span class="shrink-0 font-mono text-[10px] text-muted-foreground">
                  {{ a.hora }}
                </span>
              </div>
              <p class="mt-0.5 truncate text-[11px] text-muted-foreground">
                {{ a.detalle }}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
