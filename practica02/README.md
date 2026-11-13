# Práctica 02 — Mostrador de biblioteca

Programa de consola en TypeScript que atiende el mostrador de una
biblioteca: presta libros, muestra el catálogo con los ejemplares
disponibles y calcula la multa de un préstamo vencido. El criterio de
"terminado" no es que el programa corra, sino que `npm run revisar`
(la revisión de tipos) quede en silencio.

## Estructura del proyecto

```
practica02/
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── datos/
│   └── catalogo.json        # catálogo con 2 registros mal formados a propósito
├── src/
│   ├── main.ts               # menú, entrada/salida y manejo de errores del dominio
│   ├── catalogo.ts           # "aduana": carga y valida el catálogo (unknown + type guard)
│   ├── entrada.ts            # envoltorio tipado sobre la librería "prompts"
│   └── dominio/
│       ├── tipos.ts          # Libro, EstadoPrestamo, Prestamo, errores propios
│       └── prestamos.ts      # reglas del mostrador: disponibilidad, préstamo, estado, multa
└── evidencias/
    ├── 01-prestamo.txt
    ├── 02-sin-ejemplares.txt
    ├── 03-registro-descartado.txt
    ├── 04-error-estado-nuevo.txt
    └── 05-transpilar-no-es-verificar.txt
```

## Instalación y uso

```bash
npm install       # instala prompts + typescript, tsx y los dos paquetes de tipos
npm run revisar   # tsc --noEmit -> debe quedar en silencio
npm run dev       # corre el programa directo con tsx, sin compilar a dist/
npm run construir # tsc -> genera dist/
npm run iniciar   # node dist/main.js -> corre lo ya compilado
```

> Los scripts se llaman `dev`, `typecheck`, `build` y `start` en
> `package.json` (correr, revisar, construir e iniciar).

## El catálogo y los dos registros mal formados

`datos/catalogo.json` trae 11 registros; 9 son válidos y 2 se descartan
al cargar:

- **`L-010`**: `"ejemplares": "dos"` — llega como texto en vez de `number`.
- **`L-011`**: `"autor": 42` — llega como número en vez de `string`.

`cargarCatalogo()` en `src/catalogo.ts` los detecta con la función
`esLibro()` (un *type guard*) y reporta cuántos se descartaron sin
detener el programa (ver `evidencias/03-registro-descartado.txt`).

## Respuestas

### ¿Por qué una unión de valores y no una enumeración?

`EstadoPrestamo` se declaró como `'activo' | 'devuelto' | 'vencido'`
en vez de un `enum` por varias razones:

- **No genera código en tiempo de ejecución.** Una unión de literales
  es pura información de tipos: desaparece al compilar. Un `enum`
  (sobre todo uno numérico) sí genera un objeto real en el `.js`
  final, con su propio *reverse mapping*, aunque nunca se use.
- **Encaja de forma natural con datos que ya son texto.** El estado
  de un préstamo se imprime en consola y se compara contra estos
  mismos literales; con una unión no hace falta convertir entre el
  valor del `enum` y el string que se muestra o se guarda, porque el
  valor *ya es* el string.
- **Es más estricta, no más floja.** Un `enum` numérico admite que se
  le asigne cualquier número aunque no pertenezca al enum (una unión
  de literales no permite eso: solo acepta exactamente `'activo'`,
  `'devuelto'` o `'vencido'`, y marca error en cuanto alguien escribe
  `'ACTIVO'` o `'activi'`).
- **Combina perfecto con la verificación exhaustiva.** Un `switch`
  sobre una unión de literales permite usar el tipo `never` en el
  `default` para probar, en tiempo de compilación, que no falta
  ningún caso (esto es justo lo que se ve en `evidencias/04-error-estado-nuevo.txt`
  cuando se agrega `'extraviado'` sin tocar `prestamos.ts`).

### ¿Qué se gana con el tipo desconocido en lugar del que acepta todo?

Anotar el resultado de `JSON.parse()` como `unknown` en vez de `any`
obliga a *comprobar* la forma del dato antes de usarlo, en vez de
confiar ciegamente en ella.

Con `any`, el compilador deja pasar cualquier acceso: leer una
propiedad que no existe (`crudo.libro` en vez de `crudo.libros`, por
ejemplo) compila sin quejarse y solo explota en tiempo de ejecución,
generalmente como `undefined` propagándose silenciosamente hasta un
error lejos del origen real del problema. Con `unknown`, TypeScript no
deja leer ninguna propiedad ni llamar ningún método hasta que el
código *demuestre* qué forma tiene el valor — en este proyecto, esa
demostración es la función `esLibro()`, que estrecha el tipo por
primitivo (`typeof o.id !== 'string'`), por propiedad (`'anio' in o`)
y descartando el nulo (`typeof valor !== 'object' || valor === null`).

En otras palabras: `any` apaga la revisión de tipos para ese valor;
`unknown` la deja encendida pero obliga a ganarse el acceso al dato
narrowing de por medio. Es la diferencia entre "confío en que el JSON
viene bien" y "compruebo que el JSON viene bien antes de tocarlo".

### ¿Por qué la fecha entra como parámetro?

Porque las funciones del dominio (`prestar`, `estadoDe`,
`diasDeRetrasoDe`, `multaDe`) necesitan ser deterministas y fáciles de
probar. Si esas funciones llamaran a `new Date()` por su cuenta,
dependerían del reloj real de la máquina: el resultado cambiaría según
el momento exacto en que se ejecuten, sería imposible reproducir un
caso puntual (por ejemplo, "un préstamo vencido hace exactamente 24
días") sin esperar a que pase el tiempo de verdad o sin manipular el
reloj del sistema, y cualquier prueba automatizada sería no
determinista.

Al recibir `hoy: Date` como parámetro, la responsabilidad de decidir
"qué día es hoy" se mueve fuera del dominio y hacia quien lo llama
(`main.ts`, que sí usa `new Date()` una sola vez). Esto permite probar
el dominio con cualquier fecha fija — pasada, futura, exactamente en
el límite del vencimiento — y obtener siempre el mismo resultado; es
el mismo principio que separar una función pura de sus efectos
colaterales (leer el reloj es, en el fondo, una entrada más, no un
detalle interno).

## Notas sobre las evidencias

`evidencias/` debe llevar capturas de pantalla reales (no texto): un
préstamo exitoso, el aviso de sin ejemplares, el registro descartado,
el error de agregar un estado nuevo a la unión y las dos salidas del
paso "Transpilar no es verificar". Ver `evidencias/README.md` para los
nombres de archivo esperados, y el manual paso a paso entregado aparte
para el punto exacto donde tomar cada una.
