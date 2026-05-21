<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const titulo = ref('Demo')
const descripcion = ref('Preparar la demo del CRUD con eventos broadcast.')
</script>

<template>
  <div class="relative flex min-h-[320px] items-center justify-center bg-muted/40 p-6">
    <!-- Backdrop suggestion -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-foreground/[0.04] backdrop-blur-[2px]"
    />

    <div
      class="relative w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-2xl sm:p-6"
    >
      <header class="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-heading text-lg font-bold tracking-tight">Crear tarea</h3>
          <p class="mt-0.5 text-[11px] text-muted-foreground">POST /api/tasks</p>
        </div>
        <button
          type="button"
          aria-label="Cerrar modal"
          class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent"
        >
          <X class="size-4" />
        </button>
      </header>

      <form class="space-y-4" @submit.prevent>
        <div class="space-y-1.5">
          <Label for="mockup-titulo" class="text-xs">Título</Label>
          <Input id="mockup-titulo" v-model="titulo" placeholder="Ej. Revisar informe" />
        </div>
        <div class="space-y-1.5">
          <Label for="mockup-desc" class="text-xs">Descripción</Label>
          <Textarea
            id="mockup-desc"
            v-model="descripcion"
            placeholder="Opcional"
            class="min-h-20"
          />
        </div>
        <div class="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost">Cancelar</Button>
          <Button type="submit" class="bg-brand text-brand-foreground hover:bg-brand/90">
            Guardar
          </Button>
        </div>
      </form>

      <p class="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Editar reusa el formulario contra
        <code class="font-mono">PUT/PATCH /api/tasks/&#123;id&#125;</code>; eliminar dispara
        <code class="font-mono">DELETE /api/tasks/&#123;id&#125;</code>. Los eventos
        broadcast confirman a los demás clientes.
      </p>
    </div>
  </div>
</template>
