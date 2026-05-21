export const useCaseDiagramMermaid = `flowchart TB
  classDef actor fill:#fff,stroke:#3b58c4,stroke-width:2px,color:#0f172a,font-weight:bold
  classDef caso fill:#eef2ff,stroke:#3b58c4,stroke-width:1.5px,color:#0f172a
  classDef sec fill:#f8fafc,stroke:#94a3b8,stroke-width:1.5px,color:#334155
  classDef inc fill:#fff7ed,stroke:#c2410c,stroke-width:1.5px,stroke-dasharray:4 3,color:#7c2d12

  G(["👤 Invitado"]):::actor
  U(["🔐 Usuario autenticado"]):::actor

  subgraph SYS["🗂️ Sistema TaskManager"]
    direction TB
    UC0(("CU-DOC-00<br/>Consultar doc API<br/>(S)")):::sec
    UC1(("CU-REG-01<br/>Registrarse<br/>(P)")):::caso
    UC2(("CU-AUTH-02<br/>Iniciar sesión<br/>(P)")):::caso
    UC3(("CU-VER-03<br/>Verificar email<br/>(S)")):::sec
    UC4(("CU-TASK-04<br/>Listar tareas<br/>(P)")):::caso
    UC5(("CU-TASK-05<br/>Crear / editar /<br/>eliminar tarea<br/>(P)")):::caso
    UC6(("CU-RT-06<br/>Sincronizar realtime<br/>(S)")):::sec
    UC7(("CU-AUTH-07<br/>Cerrar sesión<br/>(S)")):::sec
    UCv(("Validar<br/>token")):::inc
  end

  G --- UC0
  G --- UC1
  G --- UC2
  U --- UC3
  U --- UC4
  U --- UC5
  U --- UC6
  U --- UC7

  UC4 -. "«include»" .-> UCv
  UC5 -. "«include»" .-> UCv
  UC6 -. "«include»" .-> UCv
  UC7 -. "«include»" .-> UCv

  UC6 -. "eventos" .-> UC4
  UC6 -. "eventos" .-> UC5

  linkStyle 0,1,2,3,4,5,6,7 stroke:#3b58c4,stroke-width:1.5px
  linkStyle 8,9,10,11 stroke:#c2410c,stroke-width:1.2px
  linkStyle 12,13 stroke:#64748b,stroke-width:1px
`

export const useCaseDiagramResumen = {
  actores: [
    {
      actor: 'Invitado',
      casos: [
        'CU-DOC-00 Consultar doc API',
        'CU-REG-01 Registrarse',
        'CU-AUTH-02 Iniciar sesión',
      ],
    },
    {
      actor: 'Usuario autenticado',
      casos: [
        'CU-VER-03 Verificar email',
        'CU-TASK-04 Listar tareas',
        'CU-TASK-05 Crear / editar / eliminar tarea',
        'CU-RT-06 Sincronizar realtime',
        'CU-AUTH-07 Cerrar sesión',
      ],
    },
  ],
  relaciones: [
    {
      tipo: '«include»',
      desde: 'CU-TASK-04 Listar tareas',
      hacia: 'Validar token',
      descripcion:
        'Toda operación protegida sobre tareas exige antes validar el token Sanctum (router.beforeEach y middleware auth:sanctum).',
    },
    {
      tipo: '«include»',
      desde: 'CU-TASK-05 Crear / editar / eliminar tarea',
      hacia: 'Validar token',
      descripcion:
        'El CRUD de tareas siempre verifica el token antes de mutar el recurso.',
    },
    {
      tipo: '«include»',
      desde: 'CU-RT-06 Sincronizar realtime',
      hacia: 'Validar token',
      descripcion:
        'POST /api/broadcasting/auth reutiliza el token Sanctum para autorizar canales privados.',
    },
    {
      tipo: '«include»',
      desde: 'CU-AUTH-07 Cerrar sesión',
      hacia: 'Validar token',
      descripcion:
        'El logout best-effort envía el Bearer actual para que el servidor revoque el token.',
    },
    {
      tipo: 'eventos',
      desde: 'CU-RT-06 Sincronizar realtime',
      hacia: 'CU-TASK-04 Listar tareas',
      descripcion:
        'Los eventos broadcast TaskCreated/Updated/Deleted refrescan la lista sin recargar.',
    },
    {
      tipo: 'eventos',
      desde: 'CU-RT-06 Sincronizar realtime',
      hacia: 'CU-TASK-05 Crear / editar / eliminar tarea',
      descripcion:
        'El payload de los eventos complementa la confirmación HTTP del CRUD.',
    },
  ],
}
