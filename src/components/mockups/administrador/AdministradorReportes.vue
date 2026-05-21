<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
  Calendar,
  FileDown,
  FileSpreadsheet,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  TrendingUp,
} from 'lucide-vue-next'
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type SortingState,
} from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ReporteRow {
  repartidor: string
  iniciales: string
  zona: string
  entregas: number
  retrasos: number
  cumplimiento: number
  ingreso: number
}

const rows: ReporteRow[] = [
  { repartidor: 'Carlos Méndez', iniciales: 'CM', zona: 'Centro', entregas: 142, retrasos: 4, cumplimiento: 97.2, ingreso: 3_482_500 },
  { repartidor: 'Laura Quintero', iniciales: 'LQ', zona: 'Norte', entregas: 128, retrasos: 9, cumplimiento: 92.9, ingreso: 3_104_000 },
  { repartidor: 'David Romero', iniciales: 'DR', zona: 'Sur', entregas: 115, retrasos: 3, cumplimiento: 97.4, ingreso: 2_807_500 },
  { repartidor: 'Andrea Soto', iniciales: 'AS', zona: 'Norte', entregas: 134, retrasos: 6, cumplimiento: 95.5, ingreso: 3_273_000 },
  { repartidor: 'Felipe Acosta', iniciales: 'FA', zona: 'Centro', entregas: 98, retrasos: 7, cumplimiento: 92.8, ingreso: 2_402_000 },
  { repartidor: 'Mónica León', iniciales: 'ML', zona: 'Sur', entregas: 121, retrasos: 5, cumplimiento: 95.9, ingreso: 2_953_500 },
]

const ch = createColumnHelper<ReporteRow>()

const formatCOP = (n: number) =>
  n.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })

const columns = [
  ch.accessor('repartidor', {
    header: () => 'Repartidor',
    cell: (info) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(
          'span',
          {
            class:
              'flex size-7 items-center justify-center rounded-full bg-brand/15 text-[10px] font-semibold text-brand',
          },
          info.row.original.iniciales,
        ),
        h('div', { class: 'min-w-0' }, [
          h('p', { class: 'truncate text-sm font-medium' }, info.getValue() as string),
          h('p', { class: 'text-[10px] text-muted-foreground' }, info.row.original.zona),
        ]),
      ]),
  }),
  ch.accessor('entregas', {
    header: () => 'Entregas',
    cell: (info) => h('span', { class: 'font-mono text-sm tabular-nums' }, String(info.getValue())),
  }),
  ch.accessor('retrasos', {
    header: () => 'Retrasos',
    cell: (info) =>
      h(
        'span',
        {
          class: `font-mono text-sm tabular-nums ${(info.getValue() as number) > 6 ? 'text-rose-600 dark:text-rose-300' : 'text-foreground'}`,
        },
        String(info.getValue()),
      ),
  }),
  ch.accessor('cumplimiento', {
    header: () => '% cumplimiento',
    cell: (info) => {
      const v = info.getValue() as number
      const color = v >= 95 ? 'bg-emerald-500' : v >= 90 ? 'bg-amber-500' : 'bg-rose-500'
      return h('div', { class: 'flex items-center gap-2' }, [
        h('div', { class: 'h-1.5 w-20 overflow-hidden rounded-full bg-muted' }, [
          h('div', { class: `h-full rounded-full ${color}`, style: `width: ${v}%` }),
        ]),
        h('span', { class: 'font-mono text-xs tabular-nums' }, `${v.toFixed(1)}%`),
      ])
    },
  }),
  ch.accessor('ingreso', {
    header: () => 'Ingreso generado',
    cell: (info) =>
      h(
        'span',
        { class: 'font-mono text-sm font-semibold tabular-nums text-foreground' },
        formatCOP(info.getValue() as number),
      ),
  }),
]

const sorting = ref<SortingState>([{ id: 'entregas', desc: true }])

const table = useVueTable({
  get data() {
    return rows
  },
  columns,
  state: { get sorting() { return sorting.value } },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

// Mini charts data
const entregasDia = [82, 95, 108, 91, 134, 142, 138]
const dias = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const maxEntregas = Math.max(...entregasDia)
const linePoints = computed(() =>
  entregasDia
    .map((v, i) => {
      const x = (i / (entregasDia.length - 1)) * 280 + 10
      const y = 90 - (v / maxEntregas) * 70
      return `${x},${y}`
    })
    .join(' '),
)

const totalIngresos = rows.reduce((acc, r) => acc + r.ingreso, 0)

const { enterUp } = useMockupMotion()

const facturacion = [38, 52, 64, 49, 78, 95, 88]
const maxFact = Math.max(...facturacion)

// Donut: 94.8% on time
const donutPct = 94.8
const donutCirc = 2 * Math.PI * 28 // r=28
const donutDash = (donutPct / 100) * donutCirc
</script>

<template>
  <div class="p-5">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="font-heading text-lg font-bold">Reportes de desempeño</h2>
        <p class="text-xs text-muted-foreground">Mayo 2026 · 4 zonas · 6 repartidores</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs">
          <Calendar class="size-3.5 text-muted-foreground" />
          <span class="font-medium">01 may — 19 may</span>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          <FileDown class="size-3.5" />
          PDF
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90"
        >
          <FileSpreadsheet class="size-3.5" />
          Excel
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div
      v-motion="enterUp(0)"
      class="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2"
    >
      <Filter class="size-3.5 text-muted-foreground" />
      <span class="text-[11px] uppercase tracking-wider text-muted-foreground">Zona:</span>
      <Badge variant="default" class="bg-brand text-brand-foreground hover:bg-brand/90 text-[10px]">
        Todas
      </Badge>
      <Badge variant="secondary" class="text-[10px]">Centro</Badge>
      <Badge variant="secondary" class="text-[10px]">Norte</Badge>
      <Badge variant="secondary" class="text-[10px]">Sur</Badge>
      <div class="ml-auto">
        <Input class="h-8 w-44 text-xs" placeholder="Filtrar repartidor…" />
      </div>
    </div>

    <!-- 3 mini-charts -->
    <div class="mt-4 grid gap-4 md:grid-cols-3">
      <!-- Line chart: entregas por día -->
      <article
        v-motion="enterUp(0.05)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <div class="flex items-baseline justify-between">
          <h3 class="text-sm font-semibold">Entregas por día</h3>
          <span class="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
            <TrendingUp class="size-3" /> +18%
          </span>
        </div>
        <p class="mt-1 font-mono text-2xl font-bold tabular-nums">{{ entregasDia.reduce((a, b) => a + b, 0) }}</p>
        <p class="text-[10px] text-muted-foreground">últimos 7 días</p>

        <svg viewBox="0 0 300 100" class="mt-3 block w-full" aria-label="Gráfico de entregas por día">
          <defs>
            <linearGradient id="rep-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="oklch(0.488 0.217 264)" stop-opacity="0.35" />
              <stop offset="100%" stop-color="oklch(0.488 0.217 264)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <polygon
            :points="`10,90 ${linePoints} 290,90`"
            fill="url(#rep-area)"
          />
          <polyline
            :points="linePoints"
            fill="none"
            stroke="oklch(0.488 0.217 264)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <g v-for="(v, i) in entregasDia" :key="i">
            <circle
              :cx="(i / (entregasDia.length - 1)) * 280 + 10"
              :cy="90 - (v / maxEntregas) * 70"
              r="3"
              fill="oklch(1 0 0)"
              stroke="oklch(0.488 0.217 264)"
              stroke-width="2"
            />
          </g>
          <g v-for="(d, i) in dias" :key="d">
            <text
              :x="(i / (dias.length - 1)) * 280 + 10"
              y="99"
              font-size="8"
              text-anchor="middle"
              fill="currentColor"
              class="text-muted-foreground"
            >
              {{ d }}
            </text>
          </g>
        </svg>
      </article>

      <!-- Donut chart: % a tiempo -->
      <article
        v-motion="enterUp(0.1)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <h3 class="text-sm font-semibold">Cumplimiento a tiempo</h3>
        <p class="text-[10px] text-muted-foreground">objetivo ≥ 90%</p>

        <div class="mt-2 flex items-center gap-4">
          <svg viewBox="0 0 80 80" class="block size-24 -rotate-90" aria-label="Donut chart cumplimiento a tiempo">
            <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="10" class="text-muted/60" opacity="0.4" />
            <circle
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke="oklch(0.488 0.217 264)"
              stroke-width="10"
              stroke-linecap="round"
              :stroke-dasharray="`${donutDash} ${donutCirc}`"
            />
          </svg>
          <div>
            <p class="font-mono text-3xl font-bold text-brand">{{ donutPct }}<span class="text-base text-muted-foreground">%</span></p>
            <p class="text-[10px] text-muted-foreground">+3.4 pp vs abril</p>
            <p class="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-600">
              <TrendingUp class="size-3" />
              meta superada
            </p>
          </div>
        </div>
      </article>

      <!-- Bar chart: facturación -->
      <article
        v-motion="enterUp(0.15)"
        class="rounded-xl border border-border bg-card p-4"
      >
        <div class="flex items-baseline justify-between">
          <h3 class="text-sm font-semibold">Facturación semanal</h3>
          <span class="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
            <TrendingUp class="size-3" /> +24%
          </span>
        </div>
        <p class="mt-1 font-mono text-2xl font-bold tabular-nums">
          {{ formatCOP(totalIngresos) }}
        </p>
        <p class="text-[10px] text-muted-foreground">mes en curso</p>

        <svg viewBox="0 0 300 100" class="mt-3 block w-full" aria-label="Gráfico de facturación semanal">
          <g v-for="(v, i) in facturacion" :key="i">
            <rect
              :x="i * 42 + 14"
              :y="90 - (v / maxFact) * 70"
              :height="(v / maxFact) * 70"
              width="24"
              rx="3"
              fill="oklch(0.488 0.217 264)"
              opacity="0.85"
            />
          </g>
          <g v-for="(d, i) in dias.slice(0, facturacion.length)" :key="d">
            <text
              :x="i * 42 + 26"
              y="99"
              font-size="8"
              text-anchor="middle"
              fill="currentColor"
              class="text-muted-foreground"
            >
              {{ d }}
            </text>
          </g>
        </svg>
      </article>
    </div>

    <!-- DataTable -->
    <section
      v-motion="enterUp(0.2)"
      class="mt-4 overflow-hidden rounded-xl border border-border bg-card"
    >
      <header class="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 class="font-heading text-sm font-bold">Detalle por repartidor</h3>
        <span class="font-mono text-[10px] text-muted-foreground">
          Clic en cabeceras para ordenar
        </span>
      </header>

      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow v-for="hg in table.getHeaderGroups()" :key="hg.id">
              <TableHead
                v-for="header in hg.headers"
                :key="header.id"
                class="cursor-pointer select-none whitespace-nowrap"
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <span class="inline-flex items-center gap-1.5">
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  <ArrowUp
                    v-if="header.column.getIsSorted() === 'asc'"
                    class="size-3 text-brand"
                  />
                  <ArrowDown
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    class="size-3 text-brand"
                  />
                  <ChevronsUpDown v-else class="size-3 text-muted-foreground/50" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  </div>
</template>
