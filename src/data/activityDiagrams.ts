import type { ActivityDiagram } from '@/types/domain'

export const activityDiagrams: ActivityDiagram[] = [
  {
    codigoCU: 'CU-01',
    titulo: 'Diagrama de actividad — Registrar pedido',
    descripcion:
      'Representa el flujo que sigue un cliente para registrar un nuevo pedido en el sistema, incluyendo la validación de cobertura, el cálculo de tarifa, la posibilidad de cotizar sin confirmar y la notificación final al supervisor logístico.',
    mermaid: `flowchart TD
  classDef inicio fill:#0f172a,stroke:#0f172a,color:#fff,stroke-width:2px
  classDef fin fill:#3b58c4,stroke:#0f172a,color:#fff,stroke-width:2px
  classDef act fill:#eef2ff,stroke:#3b58c4,stroke-width:1.5px,color:#0f172a
  classDef dec fill:#fef3c7,stroke:#b45309,stroke-width:1.5px,color:#7c2d12
  classDef err fill:#fee2e2,stroke:#b91c1c,stroke-width:1.5px,color:#7f1d1d

  Inicio(( )):::inicio
  Login[Cliente inicia sesión]:::act
  NuevoPedido[Selecciona &quot;Nuevo pedido&quot;]:::act
  Form[Sistema muestra formulario]:::act
  Captura[Cliente ingresa datos<br/>del pedido]:::act
  Validar{¿Datos válidos?}:::dec
  Corrige[Sistema solicita corrección]:::err
  Cobertura{¿En zona<br/>de cobertura?}:::dec
  FueraCob[Sistema informa<br/>sin cobertura]:::err
  CalcTarifa[Sistema calcula tarifa]:::act
  Resumen[Sistema muestra resumen<br/>con tarifa]:::act
  Decisión{¿Cliente confirma<br/>o solo cotiza?}:::dec
  GuardaCot[Sistema guarda cotización<br/>por 24h]:::act
  GenNum[Sistema genera<br/>número de seguimiento]:::act
  Notifica[Sistema notifica<br/>al supervisor]:::act
  Conf[Sistema muestra confirmación<br/>al cliente]:::act
  Fin((( ))):::fin
  FinErr((( ))):::fin

  Inicio --> Login --> NuevoPedido --> Form --> Captura --> Validar
  Validar -- No --> Corrige --> Captura
  Validar -- Sí --> Cobertura
  Cobertura -- No --> FueraCob --> FinErr
  Cobertura -- Sí --> CalcTarifa --> Resumen --> Decisión
  Decisión -- Solo cotizar --> GuardaCot --> Fin
  Decisión -- Confirma --> GenNum --> Notifica --> Conf --> Fin
`,
  },
  {
    codigoCU: 'CU-02',
    titulo: 'Diagrama de actividad — Realizar entrega',
    descripcion:
      'Representa el flujo del repartidor desde que abre su ruta del día hasta que confirma la entrega de un paquete, incluyendo el manejo de receptor distinto al destinatario y el caso de receptor ausente.',
    mermaid: `flowchart TD
  classDef inicio fill:#0f172a,stroke:#0f172a,color:#fff,stroke-width:2px
  classDef fin fill:#3b58c4,stroke:#0f172a,color:#fff,stroke-width:2px
  classDef act fill:#eef2ff,stroke:#3b58c4,stroke-width:1.5px,color:#0f172a
  classDef dec fill:#fef3c7,stroke:#b45309,stroke-width:1.5px,color:#7c2d12
  classDef err fill:#fee2e2,stroke:#b91c1c,stroke-width:1.5px,color:#7f1d1d

  Inicio(( )):::inicio
  AbreRuta[Repartidor abre su<br/>ruta del día]:::act
  Lista[Sistema muestra<br/>paquetes asignados]:::act
  Selecciona[Selecciona paquete<br/>a entregar]:::act
  Detalles[Sistema muestra detalles<br/>del paquete]:::act
  Llega[Repartidor confirma<br/>llegada al destino]:::act
  Presente{¿Receptor<br/>presente?}:::dec
  Ausente[Marca &quot;Entrega fallida<br/>— ausente&quot;]:::err
  Reprog[Sistema reprograma<br/>para siguiente turno]:::act
  ReceptorOk{¿Es el destinatario?}:::dec
  DatosOtro[Repartidor captura datos<br/>del receptor alterno]:::act
  Evidencia[Captura foto y firma<br/>&#40;CU-Registrar evidencia&#41;]:::act
  Obs[Repartidor ingresa<br/>observaciones &#40;opcional&#41;]:::act
  Marca[Marca paquete<br/>como entregado]:::act
  Actualiza[Sistema actualiza<br/>estado a &quot;Entregado&quot;]:::act
  NotificaCli[Sistema notifica<br/>al cliente]:::act
  Avance[Sistema actualiza<br/>avance de la ruta]:::act
  Fin((( ))):::fin
  FinFallido((( ))):::fin

  Inicio --> AbreRuta --> Lista --> Selecciona --> Detalles --> Llega --> Presente
  Presente -- No --> Ausente --> Reprog --> FinFallido
  Presente -- Sí --> ReceptorOk
  ReceptorOk -- No --> DatosOtro --> Evidencia
  ReceptorOk -- Sí --> Evidencia
  Evidencia --> Obs --> Marca --> Actualiza --> NotificaCli --> Avance --> Fin
`,
  },
]
