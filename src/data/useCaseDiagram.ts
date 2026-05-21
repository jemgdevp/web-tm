export const useCaseDiagramMermaid = `flowchart LR
  classDef actor fill:#fff,stroke:#3b58c4,stroke-width:2px,color:#0f172a,font-weight:bold
  classDef caso fill:#eef2ff,stroke:#3b58c4,stroke-width:1.5px,color:#0f172a
  classDef sub fill:#f8fafc,stroke:#94a3b8,stroke-width:1px,stroke-dasharray:3 3,color:#334155

  Cliente(["👤 Cliente"]):::actor
  Repartidor(["🚚 Repartidor"]):::actor
  Supervisor(["🗺️ Supervisor<br/>logístico"]):::actor
  Administrador(["🛡️ Administrador"]):::actor

  subgraph SISTEMA["🏢 Sistema de Gestión Logística"]
    direction TB
    CU01(("CU-01<br/>Registrar pedido")):::caso
    CU02(("CU-02<br/>Realizar entrega")):::caso
    CU03(("CU-03<br/>Asignar ruta<br/>automáticamente")):::caso
    CU04(("CU-04<br/>Generar reporte<br/>de desempeño")):::caso
    CALC(("Calcular<br/>tarifa")):::sub
    COT(("Cotizar")):::sub
    EVID(("Registrar<br/>evidencia")):::sub
    OPT(("Optimizar<br/>ruta")):::sub
  end

  Cliente --- CU01
  Repartidor --- CU02
  Supervisor --- CU03
  Administrador --- CU04

  CU01 -. "«include»" .-> CALC
  CU01 -. "«extend»" .-> COT
  CU02 -. "«include»" .-> EVID
  CU03 -. "«include»" .-> OPT

  linkStyle 0,1,2,3 stroke:#3b58c4,stroke-width:1.5px
  linkStyle 4,5,6,7 stroke:#64748b,stroke-width:1px
`

export const useCaseDiagramResumen = {
  actores: [
    { actor: 'Cliente', casos: ['CU-01 Registrar pedido'] },
    { actor: 'Repartidor', casos: ['CU-02 Realizar entrega'] },
    { actor: 'Supervisor logístico', casos: ['CU-03 Asignar ruta automáticamente'] },
    { actor: 'Administrador', casos: ['CU-04 Generar reporte de desempeño'] },
  ],
  relaciones: [
    {
      tipo: '«include»',
      desde: 'CU-01 Registrar pedido',
      hacia: 'Calcular tarifa',
      descripcion: 'El registro de un pedido siempre invoca el cálculo de tarifa.',
    },
    {
      tipo: '«extend»',
      desde: 'CU-01 Registrar pedido',
      hacia: 'Cotizar',
      descripcion: 'El cliente puede extender el flujo para solo cotizar sin confirmar.',
    },
    {
      tipo: '«include»',
      desde: 'CU-02 Realizar entrega',
      hacia: 'Registrar evidencia',
      descripcion: 'La entrega incluye la captura de evidencia (foto/firma).',
    },
    {
      tipo: '«include»',
      desde: 'CU-03 Asignar ruta automáticamente',
      hacia: 'Optimizar ruta',
      descripcion: 'La asignación invoca el algoritmo de optimización.',
    },
  ],
}
