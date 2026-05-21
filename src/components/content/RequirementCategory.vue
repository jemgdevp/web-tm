<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from '@/lib/gsap'
import { Briefcase, User, Cog, ListChecks, Shield, type LucideIcon } from 'lucide-vue-next'
import type { RequirementGroup } from '@/types/domain'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

interface Props {
  group: RequirementGroup
}

defineProps<Props>()

const root = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

const iconMap: Record<string, LucideIcon> = {
  negocio: Briefcase,
  usuario: User,
  sistema: Cog,
  funcional: ListChecks,
  'no-funcional': Shield,
}

onMounted(() => {
  const items = root.value?.querySelectorAll('[data-req-item]') ?? []
  if (!items.length) return
  if (prefersReducedMotion.value) {
    gsap.set(items, { opacity: 1, y: 0, clearProps: 'all' })
    return
  }
  gsap.from(items, {
    opacity: 0,
    y: 16,
    duration: 0.45,
    stagger: 0.05,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<template>
  <article ref="root" class="rounded-xl border border-border bg-card">
    <header class="flex items-start gap-3 border-b border-border p-4 sm:gap-4 sm:p-6">
      <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-brand">
        <component :is="iconMap[group.categoria] ?? ListChecks" class="size-5" />
      </span>
      <div>
        <h2 class="font-heading text-xl font-bold tracking-tight">{{ group.titulo }}</h2>
        <p class="mt-1 text-sm text-muted-foreground">{{ group.subtitulo }}</p>
      </div>
      <span class="ml-auto font-mono text-xs text-muted-foreground">
        {{ group.items.length }} ítems
      </span>
    </header>

    <ul class="divide-y divide-border">
      <li
        v-for="req in group.items"
        :key="req.codigo"
        data-req-item
        class="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-accent/40 sm:flex-row sm:items-start sm:gap-5 sm:px-6 sm:py-4"
      >
        <span
          class="inline-flex w-fit shrink-0 items-center rounded-md bg-brand px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-foreground sm:mt-0.5"
        >
          {{ req.codigo }}
        </span>
        <div class="flex-1">
          <p class="font-medium text-foreground">{{ req.nombre }}</p>
          <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
            {{ req.descripcion }}
          </p>
        </div>
      </li>
    </ul>
  </article>
</template>
