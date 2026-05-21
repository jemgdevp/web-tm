<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  UserPlus,
  Search,
  Pencil,
  Trash2,
  MoreVertical,
  ShieldCheck,
  Users,
  Truck,
  Map,
  User as UserIcon,
  type LucideIcon,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Rol = 'cliente' | 'repartidor' | 'supervisor' | 'admin'

interface Usuario {
  id: string
  iniciales: string
  nombre: string
  email: string
  rol: Rol
  activo: boolean
  ultimo: string
}

const usuarios: Usuario[] = [
  { id: 'u1', iniciales: 'CM', nombre: 'Carlos Méndez', email: 'carlos.m@logistica.app', rol: 'repartidor', activo: true, ultimo: 'hace 4 min' },
  { id: 'u2', iniciales: 'LQ', nombre: 'Laura Quintero', email: 'laura.q@logistica.app', rol: 'repartidor', activo: true, ultimo: 'hace 12 min' },
  { id: 'u3', iniciales: 'AS', nombre: 'Andrea Soto', email: 'andrea.soto@logistica.app', rol: 'supervisor', activo: true, ultimo: 'hace 2 h' },
  { id: 'u4', iniciales: 'JT', nombre: 'Juliana Trujillo', email: 'juliana.t@logistica.app', rol: 'admin', activo: true, ultimo: 'hace 18 min' },
  { id: 'u5', iniciales: 'MO', nombre: 'María Fernanda Ortiz', email: 'mfortiz@correo.com', rol: 'cliente', activo: true, ultimo: 'hace 3 d' },
  { id: 'u6', iniciales: 'DR', nombre: 'David Romero', email: 'david.r@logistica.app', rol: 'repartidor', activo: false, ultimo: 'hace 12 d' },
  { id: 'u7', iniciales: 'JV', nombre: 'Javier Velasco', email: 'javier.v@correo.com', rol: 'cliente', activo: true, ultimo: 'hace 1 h' },
]

const rolMeta: Record<Rol, { label: string; icon: LucideIcon; cls: string }> = {
  cliente: { label: 'Cliente', icon: UserIcon, cls: 'bg-sky-500/15 text-sky-700 dark:text-sky-300' },
  repartidor: { label: 'Repartidor', icon: Truck, cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  supervisor: { label: 'Supervisor', icon: Map, cls: 'bg-violet-500/15 text-violet-700 dark:text-violet-300' },
  admin: { label: 'Admin', icon: ShieldCheck, cls: 'bg-rose-500/15 text-rose-700 dark:text-rose-300' },
}

const { enterUp } = useMockupMotion()

const filtroRol = ref<'todos' | Rol>('todos')
const busqueda = ref('')

const visibles = computed(() =>
  usuarios.filter((u) => {
    if (filtroRol.value !== 'todos' && u.rol !== filtroRol.value) return false
    if (
      busqueda.value &&
      !`${u.nombre} ${u.email}`.toLowerCase().includes(busqueda.value.toLowerCase())
    ) {
      return false
    }
    return true
  }),
)

const totalPorRol = computed(() => ({
  todos: usuarios.length,
  cliente: usuarios.filter((u) => u.rol === 'cliente').length,
  repartidor: usuarios.filter((u) => u.rol === 'repartidor').length,
  supervisor: usuarios.filter((u) => u.rol === 'supervisor').length,
  admin: usuarios.filter((u) => u.rol === 'admin').length,
}))

const filtros: { id: 'todos' | Rol; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'cliente', label: 'Clientes' },
  { id: 'repartidor', label: 'Repartidores' },
  { id: 'supervisor', label: 'Supervisores' },
  { id: 'admin', label: 'Admins' },
]
</script>

<template>
  <div class="p-5">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="font-heading text-lg font-bold">Gestión de usuarios</h2>
        <p class="text-xs text-muted-foreground">
          <Users class="-mt-0.5 inline size-3" />
          {{ usuarios.length }} cuentas · {{ usuarios.filter(u => u.activo).length }} activas
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative">
          <Search class="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            v-model="busqueda"
            class="h-8 w-56 pl-8 text-xs"
            placeholder="Buscar por nombre o correo…"
          />
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90"
        >
          <UserPlus class="size-3.5" />
          Nuevo usuario
        </button>
      </div>
    </div>

    <!-- Tabs de rol -->
    <div
      v-motion="enterUp(0)"
      class="mt-4 flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted/40 p-1"
    >
      <button
        v-for="f in filtros"
        :key="f.id"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
        :class="
          filtroRol === f.id
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        "
        @click="filtroRol = f.id"
      >
        {{ f.label }}
        <span class="rounded bg-muted px-1.5 font-mono text-[10px] tabular-nums text-muted-foreground">
          {{ totalPorRol[f.id] }}
        </span>
      </button>
    </div>

    <!-- Tabla -->
    <section
      v-motion="enterUp(0.05)"
      class="mt-4 overflow-hidden rounded-xl border border-border bg-card"
    >
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último acceso</TableHead>
              <TableHead class="w-24 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="u in visibles"
              :key="u.id"
              :class="!u.activo ? 'opacity-60' : ''"
            >
              <TableCell>
                <div class="flex items-center gap-3">
                  <span class="flex size-9 items-center justify-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
                    {{ u.iniciales }}
                  </span>
                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium">{{ u.nombre }}</p>
                    <p class="truncate text-[11px] text-muted-foreground">{{ u.email }}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" :class="rolMeta[u.rol].cls + ' inline-flex items-center gap-1 text-[10px]'">
                  <component :is="rolMeta[u.rol].icon" class="size-3" />
                  {{ rolMeta[u.rol].label }}
                </Badge>
              </TableCell>

              <TableCell>
                <div class="flex items-center gap-2">
                  <Switch :default-checked="u.activo" />
                  <span
                    class="text-[11px]"
                    :class="u.activo ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'"
                  >
                    {{ u.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
              </TableCell>

              <TableCell class="font-mono text-xs text-muted-foreground">
                {{ u.ultimo }}
              </TableCell>

              <TableCell class="text-right">
                <div class="inline-flex items-center gap-0.5">
                  <button
                    class="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="Editar"
                  >
                    <Pencil class="size-3.5" />
                  </button>
                  <button
                    class="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-rose-500/10 hover:text-rose-600"
                    aria-label="Eliminar"
                  >
                    <Trash2 class="size-3.5" />
                  </button>
                  <button
                    class="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="Más opciones"
                  >
                    <MoreVertical class="size-3.5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="!visibles.length">
              <TableCell colspan="5" class="py-10 text-center text-sm text-muted-foreground">
                Sin resultados para "{{ busqueda }}"
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <footer class="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
        <span>{{ visibles.length }} de {{ usuarios.length }} usuarios</span>
        <div class="inline-flex items-center gap-1">
          <button class="rounded border border-border px-2 py-0.5 hover:bg-accent">‹</button>
          <span class="font-mono">1 / 1</span>
          <button class="rounded border border-border px-2 py-0.5 hover:bg-accent">›</button>
        </div>
      </footer>
    </section>
  </div>
</template>
