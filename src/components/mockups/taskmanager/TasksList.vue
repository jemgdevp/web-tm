<script setup lang="ts">
import { ChevronLeft, ChevronRight, Plus, LogOut } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Task {
  id: number
  titulo: string
  estado: 'pending' | 'in_progress' | 'done'
  vence?: string
}

const tareas: Task[] = [
  { id: 101, titulo: 'Revisar informe', estado: 'pending', vence: '12/05' },
  { id: 102, titulo: 'API docs', estado: 'in_progress' },
  { id: 108, titulo: 'Deploy Dokploy', estado: 'done' },
]

const estadoStyles: Record<Task['estado'], string> = {
  pending: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  in_progress: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  done: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
}
</script>

<template>
  <div class="p-5 sm:p-7">
    <header class="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 class="font-heading text-lg font-bold tracking-tight">Mis tareas</h2>
        <p class="mt-0.5 text-[11px] text-muted-foreground">
          GET /api/tasks?page=1 · Bearer
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button size="sm" class="bg-brand text-brand-foreground hover:bg-brand/90">
          <Plus class="mr-1 size-3.5" />
          Nueva
        </Button>
        <Button size="sm" variant="ghost">
          <LogOut class="size-3.5" />
        </Button>
      </div>
    </header>

    <ul class="space-y-2">
      <li
        v-for="t in tareas"
        :key="t.id"
        class="flex items-center gap-3 rounded-md border border-border bg-card/60 p-3"
      >
        <span
          aria-hidden="true"
          class="flex size-5 shrink-0 items-center justify-center rounded border border-border bg-background text-[10px] text-muted-foreground"
        >
          {{ t.estado === 'done' ? '✓' : '' }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ t.titulo }}</p>
          <p v-if="t.vence" class="mt-0.5 text-[11px] text-muted-foreground">
            vence {{ t.vence }}
          </p>
        </div>
        <Badge
          variant="outline"
          class="font-mono text-[10px]"
          :class="estadoStyles[t.estado]"
        >
          {{ t.estado }}
        </Badge>
      </li>
    </ul>

    <footer
      class="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-[11px] text-muted-foreground"
    >
      <span class="font-mono">Página 1 de 3</span>
      <div class="flex items-center gap-1">
        <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs">
          <ChevronLeft class="size-3" />
          Anterior
        </Button>
        <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs">
          Siguiente
          <ChevronRight class="size-3" />
        </Button>
      </div>
    </footer>
  </div>
</template>
