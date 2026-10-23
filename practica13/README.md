Práctica 13 — Tienda en línea con React

Nombre: Nicolas Becerra Muro
ID: 252101

Respuestas
Ejercicio 1 — ¿Por qué el Layout no necesita saber que es una tienda?

Porque el Layout solo recibe tres «huecos» (encabezado, pie y children) y los coloca en orden. No importa productos, ni carrito, ni precios; no sabe qué hay dentro de cada hueco. Quien decide el contenido es App, que le pasa los componentes ya armados. Por eso el mismo Layout serviría para un blog o un panel de administración sin cambiarle nada.

Ejercicio 2 — ¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?

Sin la flecha, onAgregar(producto) se ejecuta al pintar la tarjeta, no al hacer clic, y onClick recibe undefined en lugar de una función. Como onAgregar llama a setCarrito, se actualiza el estado del padre en pleno render, eso provoca otro render que vuelve a llamarla, y se forma un bucle. React marca errores como «Too many re-renders» o «Cannot update a component while rendering a different component». Además, TypeScript marca error porque void no es asignable a MouseEventHandler. Lo correcto es onClick={() => onAgregar(producto)}.

Ejercicio 3 — ¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?

Porque push muta el mismo arreglo y no llama a setCarrito. React compara por referencia el estado anterior con el nuevo; al ser el mismo arreglo, no ve cambio y no vuelve a pintar. No sale error porque push es JavaScript válido y TypeScript tampoco se queja: el arreglo cambia por dentro, pero React nunca se entera. La solución es crear siempre un arreglo nuevo: setCarrito(anterior => [...anterior, producto]).

Capturas

Las capturas están en la carpeta evidencias
