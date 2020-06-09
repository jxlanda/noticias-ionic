### Aplicación de noticias con Ionic
- Uso de componentes reutilizables
- Búsqueda de noticias
- Categorías de noticias
- Despliegue como PWA con Firebase Hosting
- Compartir noticia (solo en móvil)
- Almacenamiento de favoritos por medio del IonicStorageModule y NativeStorage
- Uso del dark theme (web y móvil)
- Manejo de News API

### Uso
Para hacerlo funcionar hay que ir a la carpeta src/app/environments/ y renombrar el archivo **environment.dist.ts** por **environment.ts** y crear una copia del mismo llamado **environment.prod.ts**.
Dentro de los dos archivos hay que colocar tu API KEY de News API en la línea:  `apiKeyNews: 'YOUR_API_KEY',`. 
Debido a un problema con el CORS ahora es necesario agregar un proxy, solo hay que colocar la URL en la linea `proxyUrl: 'YOUR_PROXY_URL'`, puede ser la API de Heroku (https://cors-anywhere.herokuapp.com/).

### News API
- Documentación: https://newsapi.org/

### Imágenes
| <img src="https://github.com/jxlanda/noticias-ionic/blob/master/GitHub/Share.png?raw=true" alt="drawing" width="200"/> | <img src="https://github.com/jxlanda/noticias-ionic/blob/master/GitHub/Tabs.png?raw=true" alt="drawing" width="200"/> | <img src="https://github.com/jxlanda/noticias-ionic/blob/master/GitHub/Search.png?raw=true" alt="drawing" width="200"/> | <img src="https://github.com/jxlanda/noticias-ionic/blob/master/GitHub/Favorites.png?raw=true" alt="drawing" width="200"/> |
|-----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|

| <img src="https://github.com/jxlanda/noticias-ionic/blob/master/GitHub/dark_theme.png?raw=true" alt="drawing" width="200"/> |
|----------------------------------------------------------------------------------------------------------------------------------------|
