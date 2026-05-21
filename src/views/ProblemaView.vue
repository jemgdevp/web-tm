<script setup lang="ts">
import { AlertTriangle, ClipboardList, Target } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import ActorCard from '@/components/content/ActorCard.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { actors } from '@/data/actors'
import { problemaContexto } from '@/data/project'

useSectionAnimation()
</script>

<template>
  <section>
    <PageHeader
      :numero="2"
      titulo="Planteamiento del problema"
      subtitulo="Contexto operativo de una empresa de mensajería que afronta retrasos, pérdida de paquetes y falta de trazabilidad en su operación diaria."
    />

    <!-- Resumen narrativo -->
    <div data-anim class="prose-like space-y-5 text-base leading-relaxed text-foreground">
      <p>{{ problemaContexto.resumen }}</p>
      <p class="text-muted-foreground">{{ problemaContexto.contexto }}</p>
    </div>

    <!-- Actores -->
    <div class="mt-14">
      <h2 data-anim class="font-heading text-2xl font-bold tracking-tight">
        Actores del sistema
      </h2>
      <p data-anim class="mt-2 max-w-2xl text-sm text-muted-foreground">
        El sistema involucra cuatro roles bien diferenciados, cada uno con responsabilidades específicas en el flujo logístico.
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="actor in actors"
          :key="actor.id"
          data-anim
        >
          <ActorCard :actor="actor" class="h-full" />
        </div>
      </div>
    </div>

    <!-- 3 columnas: Actualmente / Problemas / Se requiere -->
    <div class="mt-16 grid gap-4 sm:gap-5 md:grid-cols-3">
      <Card data-anim class="border-border">
        <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
          <span class="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <ClipboardList class="size-4" />
          </span>
          <CardTitle class="text-base">Actualmente</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2.5">
            <li
              v-for="(item, i) in problemaContexto.actualmente"
              :key="i"
              class="flex gap-2.5 text-sm leading-relaxed"
            >
              <span aria-hidden="true" class="mt-2 inline-block size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-anim class="border-destructive/40 bg-destructive/[0.03]">
        <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
          <span class="flex size-9 items-center justify-center rounded-md bg-destructive/10 text-destructive">
            <AlertTriangle class="size-4" />
          </span>
          <CardTitle class="text-base">Problemas detectados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2.5">
            <li
              v-for="(item, i) in problemaContexto.problemas"
              :key="i"
              class="flex gap-2.5 text-sm leading-relaxed"
            >
              <span aria-hidden="true" class="mt-2 inline-block size-1 shrink-0 rounded-full bg-destructive" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-anim class="border-brand/40 bg-brand/[0.04]">
        <CardHeader class="flex flex-row items-center gap-3 space-y-0 pb-3">
          <span class="flex size-9 items-center justify-center rounded-md bg-brand/15 text-brand">
            <Target class="size-4" />
          </span>
          <CardTitle class="text-base">Se requiere</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2.5">
            <li
              v-for="(item, i) in problemaContexto.seRequiere"
              :key="i"
              class="flex gap-2.5 text-sm leading-relaxed"
            >
              <span aria-hidden="true" class="mt-2 inline-block size-1 shrink-0 rounded-full bg-brand" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
