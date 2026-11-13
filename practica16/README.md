# Práctica 16

**Nombre:** Nicolas Becerra Muro
**ID:** 252101


## Preguntas

### Ejercicio 1

**¿Por qué se usa un contexto y no props para la sesión?**

La sesión la necesitan componentes en lugares muy distintos del árbol (el encabezado, la página de entrar, el registro y, más adelante, las rutas protegidas y los botones de inscripción). Con props habría que pasarla por todos los componentes intermedios, aunque ellos no la usen (*prop drilling*), y cada cambio de estructura obligaría a reescribir esa cadena. El contexto la deja disponible para cualquier componente debajo del proveedor con una sola línea (`useSesion()`), y cuando cambia (entrar/salir) todos los que la leen se vuelven a renderizar.

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**

`useContext` devuelve el valor por defecto con el que se creó el contexto, que aquí es `null`. Mi hook `useSesion()` lo detecta y lanza un error claro (`useSesion() tiene que usarse dentro de <ProveedorSesion>`), así la app truena en el momento del desarrollo con un mensaje que dice qué falta, en lugar de fallar después con un confuso "cannot read properties of null".

### Ejercicio 2

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**

Se guarda en `localStorage` del navegador (junto con los datos del usuario), así sobrevive a recargar la página. El riesgo es que `localStorage` es legible por cualquier JavaScript que corra en la página: si hay una vulnerabilidad XSS (o una dependencia comprometida), el atacante puede leer el token y usarlo desde otro lado mientras no expire. Alternativas más seguras: una cookie `HttpOnly` + `Secure` + `SameSite` (JavaScript no puede leerla, aunque exige protección contra CSRF), tokens de vida corta y escapar/sanear siempre el contenido que se muestra.

## Evidencias

Carpeta `evidencias`:

