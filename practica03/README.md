# Práctica 03 — Capa de dominio: DTO, Repository y Service

Sistema de préstamos de biblioteca. Se implementó la interfaz genérica
`Repository<T, ID>`, su especialización `PrestamoRepository`, la
implementación en memoria `InMemoryPrestamoRepository`, los DTO de
entrada/salida y el `PrestamoService` con la regla de negocio: **no se
puede prestar un ejemplar que ya está prestado**.

## Cómo correrlo

```bash
npm install
npm run typecheck   # sin errores
npm run dev          # corre los 4 escenarios de main.ts
npm test             # corre las pruebas del service
```

## Preguntas de reflexión

**1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?**

No, para nada. Las pruebas usan `InMemoryPrestamoRepository`, que
guarda todo en un `Map` en memoria, y aun así se pudo probar la regla
completa (que no se preste un ejemplar ocupado) sin levantar ninguna
base de datos. Eso es justo lo que resuelve el patrón Repository: el
`Service` no habla con Postgres, ni con Mongo, ni con nada concreto,
habla con una interfaz (`PrestamoRepository`). Mientras algo cumpla
esa interfaz, al Service le da igual si por debajo hay un `Map`, un
archivo o una base de datos real. Eso hace que las pruebas de la
lógica de negocio sean rápidas, no dependan de infraestructura externa
y no se rompan por cosas ajenas a la regla que se está probando (una
conexión caída, datos sucios en una tabla, etc.).

**2. El Service recibe el repositorio como `Repository<Prestamo>`, no `InMemoryPrestamoRepository`. ¿Qué se rompía si usaban la clase concreta?**

Si el constructor pidiera `InMemoryPrestamoRepository` directamente, el
`Service` quedaría **acoplado** a esa implementación específica. Eso
rompe varias cosas:

- Ya no se podría cambiar la forma de guardar los datos (por ejemplo,
  pasar a una base de datos real) sin tocar el `Service`, aunque la
  regla de negocio no haya cambiado en nada.
- Para probar el `Service` en pruebas unitarias, siempre se arrastraría
  la implementación en memoria (o la real), en vez de poder inyectar
  cualquier cosa que cumpla el contrato.
- Se perdería el sentido de tener la interfaz: si igual se importa la
  clase concreta, el `Service` termina "sabiendo" de infraestructura,
  que es justo lo que se quería evitar al separarlo en capas.

En resumen: se rompería la inversión de dependencias. El dominio
debe depender de una abstracción, no de un detalle de implementación.

**3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?**

Prácticamente solo dos:

- Un archivo nuevo en `infra/`, por ejemplo
  `postgres-prestamo.repository.ts`, que implemente
  `PrestamoRepository` pero usando la base de datos real en vez del
  `Map`.
- `main.ts`, que es el único lugar que instancia la implementación
  concreta del repositorio (`new InMemoryPrestamoRepository()` cambia
  por `new PostgresPrestamoRepository()`).

No habría que tocar `PrestamoService`, ni los DTO, ni la entidad
`Prestamo`, ni la interfaz `PrestamoRepository`. Es tan poco porque
todo el dominio (reglas de negocio, DTO, contratos) está escrito
contra la interfaz genérica, no contra el `Map`. El `Map` es un
detalle de infraestructura, y los detalles de infraestructura se
pueden cambiar sin que el resto de la aplicación se entere, siempre y
cuando la nueva implementación cumpla el mismo contrato.
