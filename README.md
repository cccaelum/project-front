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

.
├── public
│   ├── db.js                      # 
│   └──                                 # Estilos CSS
├── src
│   ├── components
│   └──   
├── 
│   └──           
├── 
│   └──                  
├──                          
│   ├── css                        
│   ├── images                     
│   ├──                       # Archivo para inicializar Firebase y la función de login
│   └──                       
├──                          
│   ├──                # Define las rutas relacionadas con la API
│   ├──               # Define las rutas que requieren autenticación
│   └──            # Define las rutas relacionadas con los productos
├──                            # Variables de entorno
├── 
└── package.json                   # Archivo con las dependencias del proyecto


## DESPLIEGUE

Para el despliegue de la web se ha usado Netlify. Es importante añadir las variables de entorno necesarias en la configuración de Netlify antes del despliegue. 