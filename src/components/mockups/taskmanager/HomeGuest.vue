<script setup lang="ts">
import { LogIn, BookOpen } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="bg-gradient-to-br from-brand/10 via-background to-background p-8 sm:p-12">
    <div class="mx-auto flex max-w-xl flex-col items-center text-center">
      <span
        class="font-mono text-[10px] uppercase tracking-[0.22em] text-brand"
      >
        Sistema · API-first
      </span>
      <h1 class="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Task Manager
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        Organiza tu trabajo, sincroniza en tiempo real con
        <span class="font-semibold text-foreground">Reverb</span>.
      </p>

      <div class="mt-7 flex flex-col items-center gap-3 sm:flex-row">
        <Button class="bg-brand text-brand-foreground hover:bg-brand/90">
          <LogIn class="mr-2 size-4" />
          Login / Register
        </Button>
        <Button variant="ghost">
          <BookOpen class="mr-2 size-4" />
          See API documentation
        </Button>
      </div>

      <p class="mt-6 max-w-md text-[11px] leading-relaxed text-muted-foreground">
        <strong>Pantalla:</strong> ruta <code class="font-mono">guest.home</code> ·
        <code class="font-mono">/</code> · al autenticar se guarda el token en
        <code class="font-mono">localStorage</code> y se redirige a
        <code class="font-mono">tasks.index</code> o
        <code class="font-mono">auth.verify-email</code>.
      </p>
    </div>
  </div>
</template>
