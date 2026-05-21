<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronLeft,
  Camera,
  PenLine,
  MapPin,
  User,
  AlertTriangle,
  CircleCheckBig,
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

const esDestinatario = ref(true)
const contactless = ref(false)

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
        <p class="font-heading text-sm font-semibold">Confirmar entrega</p>
        <p class="font-mono text-[10px] tracking-wider text-muted-foreground">
          MSJ-2026-04127
        </p>
      </div>
      <span class="text-[10px] font-mono text-brand">Paso 5/7</span>
    </header>

    <div class="flex-1 space-y-4 overflow-y-auto px-4 py-4">
      <!-- Datos del paquete -->
      <div
        v-motion="enterUp(0)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Destinatario
        </p>
        <p class="mt-2 text-base font-semibold">María Fernanda Ortiz</p>
        <p class="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin class="size-3 text-brand" />
          Cra 43 #5-128, El Poblado
        </p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary" class="text-[10px]">Frágil</Badge>
          <Badge variant="secondary" class="text-[10px]">Asegurado</Badge>
          <Badge variant="outline" class="text-[10px]">2.5 kg</Badge>
        </div>
      </div>

      <!-- Captura de foto -->
      <div
        v-motion="enterUp(0.05)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Evidencia · Foto del paquete
        </p>
        <button
          type="button"
          class="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-brand/40 bg-brand/[0.04] text-brand transition-colors hover:bg-brand/10"
        >
          <Camera class="size-9" />
          <span class="text-sm font-semibold">Tocar para capturar</span>
          <span class="text-[10px] text-muted-foreground">
            La foto se guarda localmente si no hay red
          </span>
        </button>
      </div>

      <!-- Firma -->
      <div
        v-motion="enterUp(0.1)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <div class="mb-2 flex items-center justify-between">
          <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Firma del receptor
          </p>
          <button class="text-[10px] text-muted-foreground hover:text-brand">
            Reintentar
          </button>
        </div>
        <div class="relative h-28 overflow-hidden rounded-lg border border-border bg-background">
          <!-- Firma simulada SVG -->
          <svg
            viewBox="0 0 320 100"
            class="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <path
              d="M 18 70 C 30 40, 50 35, 60 55 S 80 80, 95 60 S 130 30, 140 55 S 170 75, 180 50 C 195 25, 210 45, 220 55 S 250 80, 260 50 L 295 50"
              fill="none"
              stroke="oklch(0.21 0.006 285.885)"
              stroke-width="2"
              stroke-linecap="round"
              class="dark:stroke-white"
            />
          </svg>
          <span
            class="absolute bottom-1.5 right-2 inline-flex items-center gap-1 text-[10px] text-muted-foreground"
          >
            <PenLine class="size-3" /> Firmado
          </span>
        </div>
      </div>

      <!-- Opciones -->
      <div
        v-motion="enterUp(0.15)"
        class="space-y-1 rounded-xl border border-border bg-card p-4"
      >
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-3">
            <User class="size-4 text-brand" />
            <div>
              <p class="text-sm font-medium">El receptor es el destinatario</p>
              <p class="text-[11px] text-muted-foreground">Si no, solicita nombre y documento</p>
            </div>
          </div>
          <Switch v-model:checked="esDestinatario" />
        </div>
        <div class="flex items-center justify-between border-t border-border py-2">
          <div class="flex items-center gap-3">
            <CircleCheckBig class="size-4 text-brand" />
            <div>
              <p class="text-sm font-medium">Modalidad contactless</p>
              <p class="text-[11px] text-muted-foreground">Sólo foto, sin firma</p>
            </div>
          </div>
          <Switch v-model:checked="contactless" />
        </div>

        <!-- Receptor alterno -->
        <div
          v-if="!esDestinatario"
          class="mt-2 grid grid-cols-2 gap-2 rounded-md bg-muted/40 p-3"
        >
          <div class="col-span-2">
            <Label for="rec-nombre" class="text-[11px]">Nombre del receptor</Label>
            <Input id="rec-nombre" class="h-9 text-sm" model-value="" readonly />
          </div>
          <div class="col-span-2">
            <Label for="rec-doc" class="text-[11px]">Documento</Label>
            <Input id="rec-doc" class="h-9 text-sm" model-value="" readonly />
          </div>
        </div>
      </div>

      <!-- Observaciones -->
      <div
        v-motion="enterUp(0.2)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <Label for="obs" class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Observaciones (opcional)
        </Label>
        <textarea
          id="obs"
          rows="2"
          class="mt-2 flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          readonly
          >Entrega sin novedad. Recibe directamente.</textarea
        >
      </div>
    </div>

    <!-- CTA inferior -->
    <footer class="border-t border-border bg-card px-4 py-3 pb-4">
      <div class="grid grid-cols-[auto_1fr] gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md border border-rose-500/40 bg-rose-500/[0.05] px-3 py-2.5 text-xs font-medium text-rose-700 dark:text-rose-300"
        >
          <AlertTriangle class="size-4" />
          Reportar incidencia
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <CircleCheckBig class="size-4" />
          Marcar entregado
        </button>
      </div>
    </footer>
  </div>
</template>
