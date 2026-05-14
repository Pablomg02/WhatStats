# WhatStats

WhatStats es una aplicación web para analizar y visualizar estadísticas detalladas de tus chats de WhatsApp, tanto privados como de grupo.

🌐 **Demo en vivo:** [pablomg02.github.io/WhatStats](https://pablomg02.github.io/WhatStats/)

---

## 🛡️ Privacidad primero

**Todo el procesamiento ocurre en tu navegador.** Tus mensajes nunca salen de tu dispositivo: no hay servidor, no hay base de datos, no hay telemetría. Exportas el chat desde WhatsApp, lo arrastras a la web y obtienes los resultados al instante.

---

## 📊 Estadísticas disponibles

| Estadística | Descripción |
|---|---|
| Volumen agregado | Total de mensajes, palabras y multimedia por participante |
| Ranking por participante | Quién manda más mensajes |
| Actividad mensual | Evolución del chat mes a mes |
| Actividad por día | Qué días de la semana hay más movimiento |
| Actividad por hora | A qué horas del día se habla más |
| Mapa día × hora | Heatmap cruzando día de la semana y hora |
| Top días | Los días con más mensajes de toda la historia |
| Top semanas | Las semanas con más actividad |
| Racha más larga | La racha de días consecutivos con mensajes |
| Mayor tiempo sin hablar | Los silencios más largos del chat |
| Quién rompe el silencio | Quién retoma la conversación tras largos silencios |
| Double texting | Quién manda mensajes seguidos sin respuesta |
| Perfil abridor/cerrador | Quién suele empezar y terminar las conversaciones |
| Nube de palabras | Las palabras más frecuentes del chat |
| Búsqueda de palabra | Cuántas veces aparece una palabra y quién la usa más |

---

## 🛠️ Stack técnico

- **React 18** + **TypeScript** — interfaz y lógica de UI
- **Vite** — bundler y dev server
- **Tailwind CSS** — estilos
- **ECharts** — gráficas interactivas
- **Zustand** — estado global
- **Comlink** + **Web Workers** — parseo y cómputo sin bloquear el hilo principal
- **JSZip** — soporte para archivos `.zip` exportados por WhatsApp

---

## 🚀 Ejecutar en local

```bash
git clone https://github.com/Pablomg02/WhatStats.git
cd WhatStats
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173/WhatStats/`.

Para ejecutar los tests:

```bash
npm test
```

---

## 🗺️ Hoja de ruta

### Próximas funcionalidades
- Tiempos de respuesta entre participantes
- Análisis de emojis más usados
- Exportar estadísticas como imagen o PDF

### Fase 2: Aplicación móvil (futuro)
Una vez consolidada la versión web, se desarrollará una app nativa para iOS y Android.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Consulta [`src/stats/modules/README.md`](src/stats/modules/README.md) para entender cómo añadir nuevas estadísticas — es un proceso de 4 pasos muy sencillo.

---

## 📄 Licencia

[MIT](LICENSE)
