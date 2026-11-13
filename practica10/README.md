Parte 1

1. ¿Por qué el filtro atrapa la clase base y no cada error por separado?
Porque @Catch(ErrorDeDominio) captura esa clase y sus errores hijos, evitando repetir código.

2. ¿Por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?
Porque se ejecuta antes de conocer el controlador y sus permisos. Para eso se usan los guards.

3. ¿Por qué la petición que responde 409 no aparece en el registro de tiempos?
Porque el interceptor registra las respuestas exitosas y los errores se manejan en el filtro de excepciones.

4. ¿Por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
Porque cambia la estructura de la respuesta de res[0] a res.data[0], por lo que el cliente anterior falla.

5. Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?
El navegador bloquea el acceso a la respuesta y CORS protege al usuario de que otras páginas lean sus datos.

Parte 2

1. ¿Por qué el campo se llama passwordHash y no password?
Para indicar que almacena una contraseña cifrada mediante un hash, no la contraseña original.

2. ¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
Para evitar revelar qué correos están registrados y proteger las cuentas.

3. Si el contenido del token se puede leer, ¿qué es lo que protege la firma?
Protege la integridad del token y evita que alguien modifique sus datos sin invalidar la firma.

4. ¿Por qué es más seguro proteger todo y abrir a mano, que al revés?
Porque las rutas quedan protegidas por defecto y se evita dejar accesos abiertos por descuido.

5. ¿Cuál es la diferencia entre un 401 y un 403?

401: No estás autenticado o tu token es inválido.

403: Estás autenticado, pero no tienes permiso.

6. ¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
Cero. Solo cambió la configuración del módulo porque el servicio usa una interfaz independiente de la base de datos.

7. ¿Por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo?
Porque el cliente puede modificar la URL o el cuerpo, pero no los claims sin invalidar la firma. Así se evita que acceda a datos de otros usuarios (IDOR).
