# REMIND ME (front-end)

[Remind Me](https://remindmereminders.netlify.app/) se trata de una web app con diseño minimalista que cuenta con las siguientes funcionalidades:
- Login y registro de usuarios
- Dark mode
- Lista de recordatorios o tareas (con fecha, prioridad, etiquetas…)
- Widget de calendario
- Widget del tiempo
- Reloj con temporizador (Pomodoro)

Se pueden crear recordatorios tanto desde un usuario logado como en modo anónimo. Mientras que los recordatorios creados en modo anónimo no permanecen en la app tras acabar la sesión (Session storage), los creados por un usuario logado sí. Además, tiene una función que envía una alerta cuando queda 1 día para la fecha en la que se haya establecido el recordatorio.

Tanto los usuarios registrados como los recordatorios se almacenan en una API, asociada a este [back-end](https://github.com/cccaelum/project-back)

Para inicializar el proyecto tenemos que instalar todas las dependencias con `npm i` y después inicializaremos el servidor con `npm run dev`

Para hacer que el proyecto completo funcione necesitaremos guardar lo siguiente en un archivo .env:

- Claves privada de Firebase
- URL de la API
- API key del tiempo, en mi caso he usado https://www.weatherapi.com/

## ESTRUCTURA DE ARCHIVOS

Esta es la estructura de archivos del proyecto con una breve descripción de cada carpeta/archivo:
```
.
├── public
│   ├── img/                          # Favicon e imagen 
│   ├── sounds/                       # Archivo de sonido para el temporizador
│   └── styles.css                    # Estilos CSS globales
├── src
│   ├── components/                   # Componentes reutilizables de la aplicación:
│   │   ├── AddReminder.jsx           # para agregar recordatorios
│   │   ├── Calendar.jsx              # para mostrar el calendario
│   │   ├── Clock.jsx                 # del reloj y temporizador
│   │   ├── DarkModeToggle.jsx        # para alternar entre tema oscuro y claro
│   │   ├── LearnMore.jsx             # con breve descripcion de la app
│   │   ├── Login.jsx                 # para el inicio de sesión de usuarios
│   │   ├── ProtectedRoute.jsx        # ruta protegida para usuarios autenticados (para Profile)
│   │   ├── Register.jsx              # para el registro de usuarios
│   │   └── Weather.jsx               # para mostrar información del clima
│   ├── config/                      
│   │   ├── axiosConfig.js            # Configuración de Axios para las solicitudes
│   │   └── firebase.js               # Configuración de Firebase para la autenticación 
│   ├── contexts/                     # Archivos de contexto para gestionar el estado global:
│   │   ├── RemindersContext.js       # Contexto para los recordatorios
│   │   └── UserContext.js            # Contexto para la gestión de usuarios
│   └── pages/                        # Vistas principales de la aplicación
│       ├── Dashboard.jsx             # Panel principal
│       ├── Home.jsx                  # Página de inicio
│       ├── Profile.jsx               # Página de perfil del usuario
│       ├── ReminderDetail.jsx        # Detalle de un recordatorio específico
│       ├── Reminders.jsx             # Lista de recordatorios activos
│       └── RemindersCompleted.jsx    # Lista de recordatorios completados
├── App.jsx                           # Componente raíz de la aplicación
├── main.jsx                          # Punto de entrada principal que renderiza la aplicación
├── index.html                        # Archivo HTML base
└── package.json                      # Dependencias del proyecto

```

## DESPLIEGUE

Para el despliegue de la web se ha usado Netlify. Es importante añadir las variables de entorno necesarias en la configuración de Netlify antes del despliegue. 