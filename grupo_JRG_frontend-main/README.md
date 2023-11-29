# Setup inicial

1. Crear **.env** en la raíz para URL del backend y poner:
    ```env
    VITE_BACKEND_URL="http://localhost:3000"
    ```
2. cd JRG-project
3. Correr `yarn install`
4. Correr `yarn run dev`
5. Ingresar a http://localhost:5173/

# Observación sobre conexión con backend

Se implementa el uso de los endpoints menos los de Match y Chat.

# Recomendaciones para seguir el uso de la página

## Existencia de usuarios mediante seeds.
Para facilitar la recorrección creamos 5 usuarios para poder navegar y ver las funcionalidades disponibles.
| Nombre | Email | Contraseña |
|----------|----------|----------|
| Juan    | juan@example.com   | Juan1234   |
| Pedro    | pedro@example.com   | Pedro1234   |
| Diego    | diego@example.com   | Diego1234   |
| Pablo    | pablo@example.com   | Pablo1234   |
| David    | david@example.com   | David1234   |

Crear equipo Fútbol o Padel y realizar solicitudes para entrar a un equipo. El capitán (la persona que creo el equipo) puede ver en la pestaña Mi Perfil si aceptar o no la solicitud.

# Sport Teamer
Una red social innovadora diseñada específicamente para conectar a equipos de diversos deportes, permitiéndoles hacer “match” y enfrentarse en tiempo real.

## Features E3
- **Navbar** 🔍: desde cualquier página del sitio, el usuario podrá acceder a la barra de navegación, que incluye un logo dinámico, un botón para ver las instrucciones de uso de la página y lo que se puede hacer en esta y un botón para logearse o registrarse.

- **Landing page** 🛬: al llegar a nuestra app web, hecha con React, el usuario podrá ver una landing page con una breve descripción de la app, un chat próximo a ser funcional y botones para comenzar a buscar equipo o ver las instrucciones de uso. Además, incluye un componente dinámico, tipo "carrusel", que muestra los distintos deportes disponibles e invita a practicarlos.

- **Log in/Sign up** 👤: En la vista de log in, el usuario podrá alternar entre dos forms, uno de inicio de sesión y otro para registrarse, en caso de no tener cuenta. Se puede apreciar un cambio dinámico entre estos al oprimir el botón inferior o switch. Además, al completar uno de los campos, se podrá ver un movimiento en el placeholder de dicho campo.

- **Página principal** 🏠: En la página principal, el usuario podrá buscar equipos o crear un equipo.

- **Página de instrucciones** 📖: En la página de instrucciones, el usuario podrá ver una breve y amigable descripción y de la app y lo que se puede hacer en esta.

- **Crear Equipo**: En esta página un usuario puede crear un equipo donde queda como capitán. Por ahora solo tenemos dos opciones, fútbol o padel.

- **Ver mi equipo**: En esta página podemos ver información sobre nuestro equipo, tanto nuestra calificación, como los miembros que lo conforman. Está en desarrollo dar disponibilidad de Editar o Eliminar equipo para el capitán. Como así también la posibilidad de Buscar partidos o Ver partidos pendientes/jugados.

- **Ver mi perfil**: Aqui podemos ver todos nuestros equipos, todas nuestras solicitudes pendientes y todas las solicitudes a los equipos donde soy capitán.