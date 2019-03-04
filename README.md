# p4-t2-networking-alu0101043838

## Estableciendo conexiones con socketis

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



