# Interfaz de usuario

## Página principal (landing)

La primera pantalla que ve el usuario tiene tres bloques:

### Cabecera

Nombre **WhatStats** y una descripción breve de qué es la herramienta. Se enfatiza que el análisis es **completamente local**: ningún dato sale del navegador del usuario.

### Zona de carga

En el centro de la pantalla hay un área de **drag & drop** donde el usuario arrastra su archivo `.zip` o `.txt` exportado de WhatsApp. También permite seleccionar el archivo mediante click.

Debajo del área de carga hay dos enlaces secundarios:

- **¿Cómo exporto mi chat?** — lleva a una subpágina de la web con instrucciones paso a paso para exportar un chat desde WhatsApp (Android e iOS).
- **Privacidad y seguridad** — lleva al apartado de privacidad (ver más abajo).

### Apartado de privacidad

Sección dedicada que explica en detalle por qué la herramienta es segura:

- El archivo nunca abandona el dispositivo del usuario: todo el procesamiento ocurre en el navegador.
- No hay servidor que reciba, almacene ni procese los mensajes.
- El código es auditable.

Al final de esta sección se incluye un **aviso de buenas prácticas**: se recomienda borrar el archivo exportado del dispositivo una vez terminado el análisis si el usuario no quiere dejar rastro local del chat. Hay un enlace a una guía breve sobre cómo borrar archivos de forma segura en los sistemas más comunes.

---

## Estado de carga (parsing)

Tras soltar o seleccionar el archivo, la interfaz muestra una pantalla de carga mientras el parser procesa el archivo en segundo plano (Web Worker). No hay interacción posible en este estado. Cuando el parsing termina, se navega automáticamente a la página de stats.

---

## Página de stats

### Cabecera del chat

En la parte superior aparece:

- **Nombre del chat** (nombre del grupo o nombre del contacto).
- **Tipo**: grupo o conversación individual.
- **Estadísticas básicas** en formato compacto: número total de mensajes, fecha del primer mensaje, fecha del último mensaje, y número de mensajes por participante.

### Selector de stats

Debajo de la cabecera hay una fila de **botones**, uno por cada stat disponible. Ejemplos:

- Palabras más usadas
- Búsqueda de palabra
- Emojis más usados
- Mayor tiempo sin hablar
- (y otras)

Solo puede haber un botón activo a la vez. Al hacer click en un botón:

1. Se cierra el panel de la stat anterior (si había alguna abierta).
2. Se abre un **panel de stat** debajo del selector.

### Panel de stat

El comportamiento del panel depende del estado de la stat seleccionada:

**Primera vez que se abre (sin caché):**

- Si la stat no requiere parámetros: aparece un botón **Ejecutar**.
- Si la stat requiere entrada del usuario (por ejemplo, una palabra clave para buscar): aparece un **campo de texto** junto al botón Ejecutar.

**Durante la ejecución:**

El panel muestra un estado de **carga** mientras el Web Worker computa el resultado.

**Con resultado disponible (cacheado o recién computado):**

El panel renderiza el resultado: gráfica, tabla, u otra visualización según el tipo de stat. Una vez cacheado, abrir de nuevo esa stat muestra el resultado directamente sin pasar por el estado de carga ni necesitar ejecutar de nuevo.

**Si la stat falla:**

El panel muestra un **estado de error** localizado en esa unidad. El resto del dashboard no se ve afectado.

---

## Navegación y reset

Para analizar otro chat el usuario recarga la página, lo que limpia toda la sesión y vuelve a la pantalla de carga inicial.
