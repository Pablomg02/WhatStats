# GOALS.md

---

## 1. Métricas cuantitativas (KPIs base)

Dashboard de "radiografía volumétrica" mostrado tras el parsing.

### 1.1 Totales y desglose
- **Volumen agregado**: total de mensajes, total de palabras.
- **Contenido enriquecido**: contar imágenes, vídeos, documentos, notas de voz, enlaces, stickers. Devolver índice de "dependencia multimedia".
- **Ranking por participante**: mensajes por emisor en orden descendente (barras horizontales).

### 1.2 Cronología y estacionalidad
- **Actividad mensual**: serie temporal suavizada (spline + área sombreada) del histórico completo.
- **Top días**: ranking descendente de días-calendario con más mensajes. Sacar extractos de cada uno de esos días a las horas punta, para poder ver de qué se hablaba.
- **Top semanas**: equivalente agregando por semana ISO.

### 1.3 Ritmos circadianos
- **Por día de la semana**: agregación L–D (`getDay()` o equivalente). Barras.
- **Por hora del día**: agregación 00:00–23:59. Curva continua. Hace visible el ciclo de sueño y los picos de actividad.