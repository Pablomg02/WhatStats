# Añadir una nueva estadística

Cada stat es un módulo independiente. Para añadir una:

1. Crea una carpeta nueva en `src/stats/modules/<id-de-tu-stat>/`.
2. Implementa la función pura en `compute.ts`. Recibe `ParsedDataset` (+ params si aplica) y devuelve la `data` del `kind` que quieras pintar.
3. Crea `index.ts` que exporta el `StatModule` por defecto.
4. Regístralo en `src/stats/registry.ts` añadiéndolo al array `statRegistry`.

Eso es todo: el selector de botones, el panel y el renderer ya saben qué hacer.

## Tipos de resultado disponibles (`StatResult['kind']`)

| kind | data | uso |
|---|---|---|
| `kpi-grid` | `{ items: { label, value, hint? }[] }` | KPIs en grid (volumen agregado, etc.) |
| `bar-chart` | `{ labels, values, horizontal? }` | Barras verticales u horizontales |
| `line-chart` | `{ points: { x, y }[], smooth?, area? }` | Series temporales |
| `ranking` | `{ rows: { label, value }[] }` | Listado tipo barras horizontales con barra de progreso |
| `heatmap` | `{ cells, xLabels, yLabels }` | Mapas de calor (p.ej. día×hora) |
| `text-samples` | `{ samples: { label, text }[] }` | Extractos de texto (p.ej. mensajes representativos) |

Si necesitas un tipo nuevo, añádelo a `core/types/stat-result.ts` y crea un componente en `renderer/renderers/` registrándolo en `renderer/renderers/index.ts`.

## Stats con parámetros

Pon `needsParams: true` y declara `paramsSchema.fields`. La UI generará automáticamente los inputs y enviará el objeto `params` a tu `compute`.
