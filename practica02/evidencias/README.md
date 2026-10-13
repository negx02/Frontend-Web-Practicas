# Práctica 02 - Biblioteca

Programa de consola para administrar préstamos de libros, consultar el catálogo y calcular multas por préstamos vencidos.

## Instalación

Instalar las dependencias con:

```bash
npm install
```

## Comandos

Para ejecutar el programa:

```bash
npm run iniciar
```

Para revisar los tipos:

```bash
npm run revisar
```

Para construir el proyecto:

```bash
npm run construir
```

Para ejecutar el proyecto en desarrollo:

```bash
npm run correr
```

## Preguntas

### 1. ¿Por qué una unión de valores y no una enumeración?

Porque la unión permite indicar directamente cuáles son los estados permitidos para un préstamo, como `activo`, `devuelto` y `vencido`. Además, TypeScript puede detectar cuando se utiliza un estado que no existe.

### 2. ¿Qué se gana con el tipo `unknown` en lugar de `any`?

`unknown` obliga a comprobar el tipo de los datos antes de utilizarlos. Esto ayuda a detectar errores en los datos del catálogo. En cambio, `any` permite utilizar los datos sin hacer comprobaciones y puede ocultar errores.

### 3. ¿Por qué la fecha entra como parámetro?

Porque así podemos probar el programa utilizando diferentes fechas. Si se utilizara directamente la fecha actual, las pruebas dependerían del día en que se ejecute el programa.

## Catálogo

El catálogo contiene dos registros incorrectos que son descartados por el programa:

* `L-010`
* `L-011`

El programa muestra la cantidad de registros descartados.

## Conclusión

La práctica muestra cómo TypeScript ayuda a detectar errores antes de ejecutar el programa mediante la revisión de tipos y el uso de tipos como `unknown`, uniones y `never`.
