# WhatStats

WhatStats es una aplicación web enfocada en la privacidad para analizar y visualizar estadísticas detalladas de tus chats de WhatsApp (tanto privados como de grupo). 

## 🛡️ Privacidad Primero
El pilar fundamental de WhatStats es la privacidad. **Todo el análisis y procesamiento se ejecuta de manera local en el dispositivo del usuario.** Los datos de tus conversaciones nunca se envían a ningún servidor. Simplemente exportas tu chat desde la app de WhatsApp, lo subes a nuestra aplicación web, y obtienes resultados instantáneos de forma 100% segura.

## 🛠️ Enfoque Técnico
El funcionamiento interno de la aplicación seguirá este flujo:
1. **Lectura y Parseo:** La web leerá el archivo `.txt` exportado por WhatsApp directamente en el navegador (usando JavaScript/TypeScript).
2. **Estructuración de Datos:** El contenido se convertirá a un formato tabular estructurado (similar a los DataFrames de Pandas en Python), lo que permitirá realizar consultas y filtrados eficientes.
3. **Cálculo Bajo Demanda:** Las estadísticas no se calcularán todas de golpe al principio. Se calcularán dinámicamente a medida que el usuario interactúe con la interfaz y solicite visualizarlas, optimizando así el rendimiento.

## 🚀 Hoja de Ruta del Proyecto
El proyecto se desarrollará en dos fases principales:
1. **Fase 1: Aplicación Web (Enfoque actual)** - Creación de una plataforma web accesible y responsiva, diseñada para utilizarse tanto desde el ordenador como desde el móvil. Los usuarios tendrán a su disposición botones y paneles interactivos para generar las estadísticas.
2. **Fase 2: Aplicación Móvil (Futuro)** - Tras validar la idea y perfeccionar el análisis en la web, se desarrollará una aplicación instalable (iOS/Android) para ofrecer una experiencia aún más sencilla y nativa.

## 📊 Funcionalidades

### Funcionalidades Gratuitas (Prioridad Actual)
- **Recuento de mensajes:** Número total de mensajes enviados, recibidos y desglosados por usuario.
- **Uso de palabras:** Nubes de palabras y listados con los términos más frecuentes.
- **Horas pico de conversación:** Gráficos que muestran las horas del día y días de la semana con mayor actividad.
- **Participación general:** Resumen básico de la interacción en los grupos.

### Funcionalidades Premium (Desarrollo Futuro)
- **Patrones de conversación elevados:** Análisis profundo sobre quién inicia las conversaciones, tiempos de respuesta, etc.
- **Salud de WhatsApp y Análisis de Adicción:** Feedback personalizado sobre el uso abusivo de la aplicación, métricas de "salud digital" para ayudar al usuario a entender su relación con la plataforma.
- **Estadísticas avanzadas:** Gráficos y cruces de datos complejos.

## 💰 Estrategia de Monetización
El modelo de negocio de WhatStats está diseñado para ser escalable y respetuoso con el usuario:
- **Fase Inicial:** La plataforma será completamente gratuita. Se integrarán **anuncios** no intrusivos en la página y se añadirá un **botón de donaciones** para aquellos usuarios que quieran apoyar el proyecto.
- **Fase Futura:** Una vez consolidadas las funcionalidades básicas, se introducirá un modelo de pago para desbloquear las **Funcionalidades Premium** (como los informes detallados de Salud Digital y estadísticas avanzadas).