<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import MermaidDiagram from '@/components/content/MermaidDiagram.vue'
import { Badge } from '@/components/ui/badge'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { activityDiagrams } from '@/data/activityDiagrams'
import { useCaseByCodigo } from '@/data/useCases'

useSectionAnimation()
useScrollReveal('[data-reveal]')
</script>

<template>
  <section>
    <PageHeader
      :numero="6"
      titulo="Diagramas de actividad"
      subtitulo="Representación del flujo de los dos casos de uso principales con nodo inicial, actividades, decisiones, flujos alternativos y nodo final."
    />

    <!-- Leyenda compacta -->
    <div data-anim class="mb-10 flex flex-wrap items-center gap-3 text-xs">
      <span class="font-mono uppercase tracking-[0.18em] text-muted-foreground">Leyenda:</span>
      <span class="inline-flex items-center gap-2">
        <span class="inline-block size-3 rounded-full border-2 border-foreground bg-foreground" />
        <span class="text-muted-foreground">Nodo inicial / final</span>
      </span>
      <span class="inline-flex items-center gap-2">
        <span class="inline-block size-3 rounded-sm bg-brand/15 border border-brand" />
        <span class="text-muted-foreground">Actividad</span>
      </span>
      <span class="inline-flex items-center gap-2">
        <span class="inline-block size-3 rotate-45 bg-amber-200 border border-amber-700" />
        <span class="text-muted-foreground">Decisión</span>
      </span>
      <span class="inline-flex items-center gap-2">
        <span class="inline-block size-3 rounded-sm bg-red-100 border border-red-700" />
        <span class="text-muted-foreground">Flujo de error</span>
      </span>
    </div>

    <!-- Diagramas -->
    <div class="space-y-14">
      <article
        v-for="(diagrama, i) in activityDiagrams"
        :key="diagrama.codigoCU"
        data-reveal
      >
        <header class="mb-4 flex items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <Badge class="bg-brand text-brand-foreground hover:bg-brand/90 font-mono text-[11px]">
                {{ diagrama.codigoCU }}
              </Badge>
              <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Diagrama {{ i + 1 }} de {{ activityDiagrams.length }}
              </span>
            </div>
            <h2 class="mt-3 font-heading text-2xl font-bold tracking-tight">
              {{ diagrama.titulo }}
            </h2>
            <p class="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {{ diagrama.descripcion }}
            </p>
            <p
              v-if="useCaseByCodigo(diagrama.codigoCU)"
              class="mt-2 text-xs text-muted-foreground"
            >
              Caso de uso asociado:
              <span class="font-medium text-foreground">
                {{ useCaseByCodigo(diagrama.codigoCU)?.nombre }}
              </span>
            </p>
          </div>
        </header>

        <div class="relative -mx-4 sm:mx-0">
          <div
            class="pointer-events-none absolute inset-x-0 -top-px h-px animate-shimmer-brand"
            aria-hidden="true"
          />
          <MermaidDiagram
            :source="diagrama.mermaid"
            :id="`act-${diagrama.codigoCU}`"
            :aria-label="`Diagrama de actividad de ${diagrama.codigoCU}`"
          />
        </div>
      </article>
    </div>
  </section>
</template>
