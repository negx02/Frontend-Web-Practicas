# Práctica 17

**Nombre:** Nicolas Becerra Muro
**ID:** 252101

## Preguntas

### Ejercicio 1

**¿La ruta protegida hace segura la aplicación? ¿Qué es lo que de verdad protege los datos?**

No. La ruta protegida solo es comodidad de interfaz: evita mostrar una pantalla vacía o con errores a quien no ha entrado. Todo el código del frontend se descarga en el navegador de la persona, que puede modificarlo, quitar la protección o llamar a la API directamente con curl o Postman. Lo que de verdad protege los datos es el backend: valida el JWT en cada petición (firma y expiración), responde 401 si no hay token o es inválido y 403 si el usuario no tiene permiso, y decide qué datos devuelve según quién es.

**Comprobación con curl:** `curl -i http://localhost:3000/inscripciones/mias` responde `401 Unauthorized`.

### Ejercicio 2

**¿Por qué no se manda el miembroId al inscribirse?**

Porque el backend ya sabe quién es la persona por el token JWT. Si el cliente mandara el `miembroId`, cualquiera podría cambiarlo y inscribir a otra persona. Al obtenerlo del token firmado, que el cliente no puede alterar sin invalidar la firma, la API garantiza que la inscripción es de quien tiene la sesión. El frontend solo manda el `horarioId`.

**¿Qué diferencia hay entre un 401 y un 403?**

El 401 (Unauthorized) significa que no se sabe quién eres: no mandaste token, está vencido o es falso. La solución es autenticarse de nuevo, por eso el interceptor cierra la sesión. El 403 (Forbidden) significa que sí se sabe quién eres, pero tu cuenta no tiene permiso para esa acción (por ejemplo, una cuenta que no es de un miembro intentando inscribirse). Volver a iniciar sesión no lo arregla, así que solo se muestra el mensaje de la API.

## Evidencias

Carpeta `evidencias`

