# Arquitectura

## Capas del sistema

El sistema tiene tres capas separadas:

1. **Parser** — convierte el texto exportado de WhatsApp a una estructura tabular uniforme con `timestamp`, `autor` y `mensaje`.
2. **Stats** — conjunto de funciones puras e independientes que reciben esa estructura y devuelven un objeto tipado con dos campos: el tipo de resultado y los datos.
3. **Renderer** — hace dispatch en función del tipo y sabe cómo pintar cada estructura.

## Contrato de tipos

El schema de cada tipo de resultado es un contrato. Cuantos más tipos genéricos y composables se definan al principio, menos fricción habrá al añadir stats nuevas.

## Ejecución y caché

Los cálculos se ejecutan en un **Web Worker** para no bloquear el hilo principal. Las stats se computan de forma **lazy**: cada una se ejecuta la primera vez que el usuario abre su pestaña correspondiente, mostrando un estado de carga mientras tanto. Una vez computada, el resultado queda cacheado en memoria.

El dataset parseado también queda cacheado en memoria desde el principio. Ninguno de los dos necesita invalidación porque el dataset es **inmutable durante la sesión**.

## Aislamiento de errores

Cada stat se ejecuta en un contexto aislado. Si una falla, el renderer muestra un estado de error en esa unidad sin afectar al resto del dashboard.

## Reset de sesión

Si el usuario quiere analizar otro chat, recarga la página y empieza de cero.
