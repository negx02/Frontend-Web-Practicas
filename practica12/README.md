# Práctica 12 (parte 1): React, JSX y el primer proyecto con Vite

**Nombre:** Nicolas Becerra Muro
**ID:** 252101

## 1. Ver qué hace el compilador con el JSX

**Error al compilar sin configuración:**

```
  × Expression expected
   ╭─[Hola.jsx:3:1]
 3 │     <h1 className="titulo">
   ·     ─
   ╰────
  × Expected ',', got 'ident'

Caused by:
    Syntax Error
Error: Failed to compile 1 file with swc.
```

SWC, sin configuración, no activa el soporte de JSX, así que no entiende el `<h1>`.

**¿En qué se convirtió cada etiqueta del JSX?**

- **Modo clásico:** cada etiqueta se convirtió en una llamada a `React.createElement(tipo, props, ...hijos)`. Las etiquetas anidadas son llamadas anidadas.
- **Modo automático:** cada etiqueta se convirtió en una llamada a `_jsx(...)` o `_jsxs(...)` (esta última cuando hay varios hijos), importadas de `react/jsx-runtime`. Los hijos van dentro de `children` y ya no hace falta importar `React`.

**Si React es «sólo una biblioteca», ¿quién traduce el JSX?**
Un compilador (SWC, Babel u Oxc), no React. React sólo aporta las funciones (`createElement`, `jsx`) a las que apunta el código ya traducido. En Vite lo hace el plugin `@vitejs/plugin-react`.

## 2. Crear el proyecto con Vite

El contenedor vacío está en `index.html`: `<div id="root"></div>`. Lo llena `src/main.tsx`, donde `createRoot(...).render(...)` pinta la aplicación.

## 3. «Hola mundo» sin JSX

**¿Qué hace `createRoot` y qué hace `render`?**
`createRoot` crea la raíz de React sobre un elemento del DOM (el `#root`), que es el lugar que React va a controlar. `render` le dice a esa raíz qué elementos dibujar dentro.

Armar la tarjeta sin JSX funciona, pero cada elemento es una llamada anidada a `createElement` y el código se vuelve difícil de leer.

## 4. El primer componente

**Error al quitar la prop obligatoria** (`<Saludo />` sin `nombre`):

```
Property 'nombre' is missing in type '{}' but required in type 'SaludoProps'. ts(2741)
```

**¿Por qué el nombre de un componente empieza con mayúscula?**
Porque JSX usa la mayúscula para distinguir un componente de una etiqueta HTML. `<div>` se traduce a la cadena `'div'`, pero `<Saludo>` se traduce a la referencia a la función `Saludo`. Con minúscula (`<saludo>`), React lo trataría como una etiqueta HTML que no existe.

## Evidencias

Las capturas están en la carpeta `evidencias/`.