<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Briefcase, User, Cog, ListChecks, Shield, type LucideIcon } from 'lucide-vue-next'
import { gsap } from '@/lib/gsap'
import PageHeader from '@/components/layout/PageHeader.vue'
import RequirementCategory from '@/components/content/RequirementCategory.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'
import { requirementGroups } from '@/data/requirements'

useSectionAnimation()
useScrollReveal('[data-reveal]')

const prefersReducedMotion = usePrefersReducedMotion()

const totalRequerimientos = computed(() =>
  requirementGroups.reduce((acc, g) => acc + g.items.length, 0),
)

const counter = ref(0)

const iconMap: Record<string, LucideIcon> = {
  negocio: Briefcase,
  usuario: User,
  sistema: Cog,
  funcional: ListChecks,
  'no-funcional': Shield,
}

const categoriaCortaMap: Record<string, string> = {
  negocio: 'Negocio',
  usuario: 'Usuario',
  sistema: 'Sistema',
  funcional: 'Funcional',
  'no-funcional': 'No funcional',
}

onMounted(() => {
  if (prefersReducedMotion.value) {
    counter.value = totalRequerimientos.value
    return
  }
  gsap.to(counter, {
    value: totalRequerimientos.value,
    duration: 1.2,
    ease: 'power2.out',
    snap: { value: 1 },
  })
})
</script>

<template>
  <section>
    <PageHeader
      :numero="3"
      titulo="Requerimientos"
      subtitulo="Negocio, usuario, sistema y F/NF — 31 requerimientos en 5 categorías."
    />

    <!-- Counter resumen -->
    <div
      data-anim
      class="mb-8 flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
    >
      <div class="flex items-baseline gap-2">
        <span class="font-mono text-4xl font-bold tabular-nums text-brand sm:text-5xl">
          {{ counter }}
        </span>
        <span class="text-sm text-muted-foreground">requerimientos totales</span>
      </div>
      <span class="hidden h-10 w-px bg-border sm:block" aria-hidden="true" />
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <span
          v-for="g in requirementGroups"
          :key="g.categoria"
          class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1"
        >
          <component :is="iconMap[g.categoria] ?? ListChecks" class="size-3.5 text-brand" />
          <span class="font-medium text-foreground">{{ g.items.length }}</span>
          <span class="text-muted-foreground">{{ categoriaCortaMap[g.categoria] ?? g.categoria }}</span>
        </span>
      </div>
    </div>

    <!-- Tabs por categoría -->
    <Tabs data-anim default-value="negocio" class="w-full print:hidden">
      <TabsList class="grid h-auto w-full grid-cols-2 gap-1 bg-muted/50 p-1 sm:grid-cols-5">
        <TabsTrigger
          v-for="g in requirementGroups"
          :key="g.categoria"
          :value="g.categoria"
          class="flex h-auto flex-col items-center gap-1 py-2.5"
        >
          <component :is="iconMap[g.categoria] ?? ListChecks" class="size-4 text-brand" />
          <span class="text-xs font-semibold">{{ categoriaCortaMap[g.categoria] ?? g.titulo }}</span>
          <span class="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {{ g.items.length }} ítems
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        v-for="g in requirementGroups"
        :key="g.categoria"
        :value="g.categoria"
        class="mt-6 focus-visible:ring-0"
      >
        <div data-reveal>
          <RequirementCategory :group="g" />
        </div>
      </TabsContent>
    </Tabs>

    <!-- Vista print: expandir todas las categorías -->
    <div class="hidden space-y-7 print:block">
      <RequirementCategory
        v-for="g in requirementGroups"
        :key="g.categoria"
        :group="g"
      />
    </div>
  </section>
</template>
