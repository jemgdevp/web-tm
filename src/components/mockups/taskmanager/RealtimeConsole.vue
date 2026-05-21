<script setup lang="ts">
import { Wifi, Radio } from 'lucide-vue-next'

interface LogLine {
  tone: 'info' | 'in' | 'out'
  text: string
}

const lines: LogLine[] = [
  { tone: 'info', text: '[Echo] channel: tasks' },
  { tone: 'info', text: '[Echo] private user.42.tasks' },
  { tone: 'in', text: '< TaskCreated { id: 108, title: "Demo" }' },
  { tone: 'in', text: '< TaskUpdated { id: 101, status: "done" }' },
  { tone: 'out', text: '> ack #108 → state.update' },
]

const toneStyles: Record<LogLine['tone'], string> = {
  info: 'text-muted-foreground',
  in: 'text-emerald-600 dark:text-emerald-400',
  out: 'text-brand',
}
</script>

<template>
  <div class="p-5 sm:p-6">
    <header class="mb-4 flex items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-2">
        <span class="flex size-7 items-center justify-center rounded-md bg-brand/15 text-brand">
          <Radio class="size-3.5" />
        </span>
        <div class="leading-tight">
          <p class="font-semibold text-foreground">DevTools · Echo</p>
          <p class="text-[11px] text-muted-foreground">user.42 conectado</p>
        </div>
      </div>
      <span
        class="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-700 dark:text-emerald-300"
      >
        <Wifi class="size-3" />
        online
      </span>
    </header>

    <div
      class="rounded-lg border border-border bg-background/80 p-3 font-mono text-[11px] leading-relaxed"
    >
      <p
        v-for="(l, i) in lines"
        :key="i"
        :class="['whitespace-pre-wrap', toneStyles[l.tone]]"
      >
        {{ l.text }}
      </p>
    </div>

    <p class="mt-4 text-[11px] leading-relaxed text-muted-foreground">
      <strong class="text-foreground">Canal público:</strong>
      <code class="font-mono">tasks</code>
      ·
      <strong class="text-foreground">privado:</strong>
      <code class="font-mono">user.&#123;id&#125;.tasks</code>
      — autorizado con
      <code class="font-mono">POST /api/broadcasting/auth</code>.
    </p>
  </div>
</template>
