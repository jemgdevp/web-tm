<script setup lang="ts">
import {
  ChevronLeft,
  Truck,
  MapPin,
  CircleCheckBig,
  Clock,
  Phone,
  MessageCircle,
  Share2,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

interface TimelineStep {
  label: string
  time?: string
  state: 'done' | 'active' | 'pending'
  detail?: string
}

const steps: TimelineStep[] = [
  { label: 'Pedido registrado', time: '08:12', state: 'done' },
  { label: 'Asignado a repartidor', time: '08:34', state: 'done', detail: 'Carlos M.' },
  { label: 'En ruta', time: '10:05', state: 'active', detail: 'A 12 min del destino' },
  { label: 'En entrega', state: 'pending' },
  { label: 'Entregado', state: 'pending' },
]

const { enterUp } = useMockupMotion()
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
        aria-label="Volver"
      >
        <ChevronLeft class="size-5" />
      </button>
      <div class="text-center">
        <p class="font-heading text-sm font-semibold">Tu paquete</p>
        <p class="font-mono text-[10px] tracking-wider text-muted-foreground">
          MSJ-2026-04127
        </p>
      </div>
      <button
        type="button"
        class="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
        aria-label="Compartir"
      >
        <Share2 class="size-4" />
      </button>
    </header>

    <div class="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      <!-- Hero ETA card -->
      <div
        v-motion="enterUp(0)"
        class="overflow-hidden rounded-xl border border-brand/30 bg-gradient-to-br from-brand/10 via-card to-card p-4"
      >
        <div class="flex items-center justify-between">
          <Badge class="bg-brand text-brand-foreground hover:bg-brand/90">
            <span class="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-brand-foreground" />
            En ruta
          </Badge>
          <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            ETA
          </span>
        </div>

        <p class="mt-3 font-mono text-3xl font-bold tracking-tight text-brand">
          12 min
        </p>
        <p class="mt-1 text-xs text-muted-foreground">
          Llegada estimada · <span class="font-medium text-foreground">10:25 a.m.</span>
        </p>
      </div>

      <!-- Simulated map -->
      <div
        v-motion="enterUp(0.06)"
        class="relative overflow-hidden rounded-xl border border-border bg-card"
      >
        <svg
          viewBox="0 0 360 200"
          class="block w-full"
          aria-label="Mapa simulado de seguimiento"
        >
          <defs>
            <pattern id="rt-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.18" />
            </pattern>
          </defs>
          <rect width="360" height="200" fill="url(#rt-grid)" class="text-muted-foreground" />

          <!-- Route (dashed for done, solid for active) -->
          <path
            d="M 40 160 C 100 140, 140 110, 180 100 S 280 70, 320 50"
            fill="none"
            stroke="oklch(0.488 0.217 264)"
            stroke-width="2.5"
            stroke-dasharray="4 6"
            opacity="0.4"
          />
          <path
            d="M 40 160 C 100 140, 140 110, 180 100"
            fill="none"
            stroke="oklch(0.488 0.217 264)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <!-- Origin pin -->
          <g transform="translate(40 160)">
            <circle r="9" fill="oklch(0.488 0.217 264)" opacity="0.2" />
            <circle r="5" fill="oklch(0.488 0.217 264)" />
            <text y="-12" text-anchor="middle" font-size="9" fill="currentColor" class="text-foreground">Origen</text>
          </g>

          <!-- Current position pin (pulsing via CSS) -->
          <g transform="translate(180 100)">
            <circle r="14" fill="oklch(0.488 0.217 264)" opacity="0.12">
              <animate attributeName="r" values="10;18;10" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="oklch(1 0 0)" stroke="oklch(0.488 0.217 264)" stroke-width="3" />
            <text y="-14" text-anchor="middle" font-size="9" font-weight="600" fill="oklch(0.488 0.217 264)">Carlos</text>
          </g>

          <!-- Destination pin -->
          <g transform="translate(320 50)">
            <circle r="9" fill="oklch(0.6 0.18 145)" opacity="0.2" />
            <circle r="5" fill="oklch(0.6 0.18 145)" />
            <text y="-12" text-anchor="middle" font-size="9" fill="currentColor" class="text-foreground">Destino</text>
          </g>
        </svg>

        <!-- Map overlay actions -->
        <div class="absolute bottom-3 right-3 flex flex-col gap-1.5">
          <button
            class="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow ring-1 ring-border backdrop-blur"
            aria-label="Mi ubicación"
          >
            <MapPin class="size-4" />
          </button>
        </div>
      </div>

      <!-- Timeline -->
      <div
        v-motion="enterUp(0.12)"
        class="space-y-1 rounded-xl border border-border bg-card p-4"
      >
        <p class="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Estado del envío
        </p>

        <ol class="relative space-y-3 pl-7">
          <span
            aria-hidden="true"
            class="absolute left-[10px] top-1 bottom-1 w-px bg-border"
          />
          <li
            v-for="(s, i) in steps"
            :key="i"
            class="relative"
          >
            <span
              aria-hidden="true"
              class="absolute -left-7 top-0.5 flex size-5 items-center justify-center rounded-full border-2"
              :class="
                s.state === 'done'
                  ? 'border-brand bg-brand text-brand-foreground'
                  : s.state === 'active'
                  ? 'border-brand bg-card text-brand'
                  : 'border-border bg-card text-muted-foreground'
              "
            >
              <CircleCheckBig
                v-if="s.state === 'done'"
                class="size-3"
                stroke-width="2.5"
              />
              <span
                v-else-if="s.state === 'active'"
                class="block size-1.5 animate-pulse rounded-full bg-brand"
              />
              <span v-else class="block size-1.5 rounded-full bg-muted-foreground/40" />
            </span>

            <div class="flex items-baseline justify-between gap-3">
              <p
                class="text-sm leading-tight"
                :class="s.state === 'pending' ? 'text-muted-foreground' : 'font-medium text-foreground'"
              >
                {{ s.label }}
              </p>
              <span v-if="s.time" class="font-mono text-[10px] text-muted-foreground">
                {{ s.time }}
              </span>
            </div>
            <p v-if="s.detail" class="mt-0.5 text-[11px] text-muted-foreground">
              {{ s.detail }}
            </p>
          </li>
        </ol>
      </div>

      <!-- Repartidor -->
      <div
        v-motion="enterUp(0.18)"
        class="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
      >
        <span class="flex size-11 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Truck class="size-5" />
        </span>
        <div class="flex-1">
          <p class="text-sm font-semibold">Carlos Méndez</p>
          <p class="text-[11px] text-muted-foreground">
            <Clock class="-mt-0.5 inline size-3" /> A 12 min · placa BCD-43
          </p>
        </div>
        <div class="flex gap-1">
          <button
            class="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent"
            aria-label="Llamar"
          >
            <Phone class="size-4" />
          </button>
          <button
            class="flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground hover:opacity-90"
            aria-label="Chatear"
          >
            <MessageCircle class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
