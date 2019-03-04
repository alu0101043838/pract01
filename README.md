# p4-t2-networking-alu0101043838

## Estableciendo conexiones con sockets

En este capítulo, aprenderemos a crear Sockets utilizando node.js

## Escribiendo datos en un socket

Antes que nada, crearemos un directorio llamado networking, en el que iremos añadiendo los distintos archivos.js que aparecen en el capítulo. Empezamos con el primer archivo, 'net-watcher.js'. En ella llamamos a los módulos Nojde.js fs y net:

![captura de pantalla de 2019-03-04 11-33-39](https://user-images.githubusercontent.com/38528985/53738985-9bb02f00-3e88-11e9-89a8-a68bd10cdba4.png)

Nos fijamos en la función callback dada a createServer(), esta función hace principalmente tres cosas:
 - La primera, reportar que la conexión se ha establecido.
 - Empieza a escuchar por si se producen cambios en el documento establecido.
 - Escucha hasta que se haya realizado el cierre de la conexión.
 
Se pasa el puerto al que queremos conectarnos (60300). Para ejecutar abriremos tres terminales, en la primera ejecutaremos watch -n 1 touch target.txt, en la segunda node net-watcher.js target.txt y en la tercera nc localhost 60300. Aquí vemos el resultado de la conexión que se establece:

![captura de pantalla de 2019-03-04 11-33-12](https://user-images.githubusercontent.com/38528985/53738860-483de100-3e88-11e9-8004-23f452b1d5b5.png)

## Escuchando Sockets de Unix

Lo que haremos ahora es modificar el fichero net-watcher.js, cambiando la línea en la que se pasa el puerto, escribiendo '/tmp/watcher.sock':

![captura de pantalla de 2019-03-04 11-36-38](https://user-images.githubusercontent.com/38528985/53739560-f7c78300-3e89-11e9-9bdc-821ba0870f59.png)

En la consola ejecutamos node net-watcher-unix.js target.txt, lo que hace es esperar por 'suscribers'. En otra consola ejecutamos nc -U /tmp/watcher.sock y vemos como espera a que hayan cambios en target.txt, y vemos como en la otra consola, el 'suscriber' se conecta:

![captura de pantalla de 2019-03-04 11-36-11](https://user-images.githubusercontent.com/38528985/53739728-67d60900-3e8a-11e9-92a0-cd8375616003.png)

## Implementando un protocolo de mensajería

## Cambiando a mensajes JSON

En este apartado, lo que haremos es modificar net-watcher.js. Seguiremos los pasos de libro y guardaremos el fichero como net-watcher-json-service.js:

![captura de pantalla de 2019-03-04 11-40-50](https://user-images.githubusercontent.com/38528985/53740453-22b2d680-3e8c-11e9-828c-940904220e75.png)

Este fichero lo ejecutaremos en la terminal junto con target.txt, mientras que en otra terminal hacemos nc localhost 60300, y funcionará de forma parecida al fichero anterior, pero esta vez aparece el tipo y el archivo al que se está refiriendo el cliente:

![captura de pantalla de 2019-03-04 11-40-28](https://user-images.githubusercontent.com/38528985/53740465-29414e00-3e8c-11e9-8800-b26eb23f39a1.png)

## Creando conexiones de cliente con Sockets

En este apartado, creamos un programa de cliente en Node.js para recibir mensajes JSON de nuestro programa servidor. Aquí vemos el programa que lo llamamos net-watcher-json-client.js:

![captura de pantalla de 2019-03-04 11-55-20](https://user-images.githubusercontent.com/38528985/53740692-aff62b00-3e8c-11e9-84d5-399e9b015292.png)

Este programa usa net.connect para crear un conexión de cliente al puerto 60300, y entonces espera por datos. Ejecutamos node net-watching-json-client.js, vemos como espera por el archivo target.txt. Si hacemos un touch de target.txt, aparecerá los datos del archivo:

![captura de pantalla de 2019-03-04 11-56-35](https://user-images.githubusercontent.com/38528985/53740817-f186d600-3e8c-11e9-8868-dd7ab2e40b44.png)
