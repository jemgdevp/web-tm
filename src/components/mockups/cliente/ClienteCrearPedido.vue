<script setup lang="ts">
import { ChevronLeft, MapPin, Box, FileText, Sparkles } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const { enterFromRight } = useMockupMotion()
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- App header -->
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
        <p class="font-heading text-sm font-semibold">Nuevo envío</p>
        <p class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Paso 2 de 3
        </p>
      </div>
      <span class="font-mono text-[10px] text-brand">66%</span>
    </header>

    <!-- Progress bar -->
    <div class="h-1 bg-muted">
      <div class="h-full w-2/3 rounded-r-full bg-brand transition-all" />
    </div>

    <div class="flex-1 space-y-5 overflow-y-auto px-4 py-5">
      <!-- Direcciones -->
      <div
        v-motion="enterFromRight(0)"
        class="space-y-3 rounded-xl border border-border bg-card p-4"
      >
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Direcciones
        </p>

        <div>
          <Label for="origen" class="mb-1 inline-flex items-center gap-1.5 text-xs">
            <MapPin class="size-3 text-brand" />
            Origen
          </Label>
          <Input id="origen" model-value="Calle 72 #10-23, Bogotá" class="h-9 text-sm" readonly />
        </div>

        <div>
          <Label for="destino" class="mb-1 inline-flex items-center gap-1.5 text-xs">
            <MapPin class="size-3 text-emerald-500" />
            Destino
          </Label>
          <Input id="destino" model-value="Cra 43 #5-128, Medellín" class="h-9 text-sm" readonly />
        </div>

        <div class="flex items-center gap-2 rounded-md bg-muted/70 px-3 py-2 text-[11px] text-muted-foreground">
          <Sparkles class="size-3 text-brand" />
          Distancia estimada: <span class="font-mono font-medium text-foreground">421 km</span>
        </div>
      </div>

      <!-- Paquete -->
      <div
        v-motion="enterFromRight(0.06)"
        class="space-y-3 rounded-xl border border-border bg-card p-4"
      >
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Paquete
        </p>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <Label for="peso" class="mb-1 inline-flex items-center gap-1.5 text-xs">
              <Box class="size-3 text-brand" />
              Peso
            </Label>
            <Input id="peso" model-value="2.5 kg" class="h-9 text-sm" readonly />
          </div>
          <div>
            <Label for="dim" class="mb-1 text-xs">Dimensiones</Label>
            <Input id="dim" model-value="30×20×15 cm" class="h-9 text-sm" readonly />
          </div>
        </div>

        <div>
          <Label for="desc" class="mb-1 inline-flex items-center gap-1.5 text-xs">
            <FileText class="size-3 text-brand" />
            Descripción
          </Label>
          <textarea
            id="desc"
            rows="2"
            class="flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            readonly
            >Documentos legales — manipular con cuidado.</textarea
          >
        </div>

        <div class="flex flex-wrap gap-1.5 text-[10px]">
          <Badge variant="secondary" class="text-[10px]">Frágil</Badge>
          <Badge variant="secondary" class="text-[10px]">Asegurado</Badge>
        </div>
      </div>

      <!-- Tarifa -->
      <div
        v-motion="enterFromRight(0.12)"
        class="rounded-xl border border-brand/40 bg-brand/[0.06] p-4 ring-1 ring-brand/10"
      >
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          Tarifa calculada
        </p>

        <dl class="mt-3 space-y-1.5 text-sm">
          <div class="flex items-baseline justify-between text-muted-foreground">
            <dt>Subtotal</dt>
            <dd class="font-mono tabular-nums">$ 22.000</dd>
          </div>
          <div class="flex items-baseline justify-between text-muted-foreground">
            <dt>Seguro</dt>
            <dd class="font-mono tabular-nums">$ 2.500</dd>
          </div>
          <div class="flex items-baseline justify-between text-muted-foreground">
            <dt>Recargo zona</dt>
            <dd class="font-mono tabular-nums text-emerald-600">— $ 0</dd>
          </div>
          <div class="mt-2 flex items-baseline justify-between border-t border-brand/20 pt-2.5">
            <dt class="font-semibold text-foreground">Total</dt>
            <dd class="font-mono text-lg font-bold tabular-nums text-brand">
              $ 24.500
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- CTA -->
    <footer
      class="border-t border-border bg-card px-4 py-3 pb-4"
    >
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="rounded-md border border-border bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Solo cotizar
        </button>
        <button
          type="button"
          class="rounded-md bg-brand py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Confirmar pedido
        </button>
      </div>
    </footer>
  </div>
</template>
