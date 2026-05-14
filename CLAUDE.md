# Guía de WhatStats para CLAUDE

Este archivo sirve como referencia rápida para entender la estructura, objetivos y reglas del proyecto WhatStats.

## Resumen de Documentación

- **[README.md](./README.md)**: Visión general del proyecto. Aplicación web (y futura móvil) para analizar chats de WhatsApp con enfoque **Privacy First** (procesamiento 100% local).
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Estructura técnica en 3 capas (Parser, Stats, Renderer). Uso de **Web Workers** para no bloquear el hilo principal y ejecución **lazy** de estadísticas con cacheo en memoria.
- **[UI.md](./UI.md)**: Flujo de la interfaz de usuario, desde la landing page y zona de carga hasta el dashboard dinámico de estadísticas.
- **[src/stats/modules/README.md](./src/stats/modules/README.md)**: Guía para añadir nuevas estadísticas al sistema.

## Principios de Desarrollo

- **Modularidad y Escalabilidad**: El código debe diseñarse de forma que añadir nuevas estadísticas o modificar el parser sea sencillo y no rompa otras partes del sistema. Las capas deben estar claramente desacopladas.
- **Privacidad Local**: No se debe implementar ninguna lógica que envíe datos del usuario a servidores externos. Todo el procesamiento ocurre en el cliente.
- **Rendimiento**: Utilizar Web Workers para tareas pesadas y asegurar que la interfaz responda fluidamente.

## Protocolo de Actuación

Antes de proceder con cualquier cambio arquitectónico, implementación de nueva funcionalidad o propuesta técnica significativa, **debes preguntar al usuario si la arquitectura o propuesta le gusta y la ve correcta**. No ejecutes cambios estructurales sin aprobación previa.
