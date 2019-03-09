# p4-t2-networking-alu0101043838

## Integración continua con Travis

BADGE: [![Build Status](https://travis-ci.com/ULL-ESIT-DSI-1819/p4-t2-networking-alu0101043838.svg?token=Sx6sZ2qtpxBy4Pycr9Pq&branch=master)](https://travis-ci.com/ULL-ESIT-DSI-1819/p4-t2-networking-alu0101043838)

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

Este fichero lo ejecutaremos en la terminal junto con target.txt, mientras que en otra terminal hacemos nc localhost 60300, y funcionará de forma parecida al fichero anterior, pero esta vez aparece el tipo o la forma y el archivo que estamos pasando como argumento junto al comando:

![captura de pantalla de 2019-03-04 11-40-28](https://user-images.githubusercontent.com/38528985/53740465-29414e00-3e8c-11e9-8800-b26eb23f39a1.png)

## Creando conexiones de cliente con Sockets

En este apartado, creamos un programa de cliente en Node.js para recibir mensajes JSON de nuestro programa servidor. Aquí vemos el programa que lo llamamos net-watcher-json-client.js:

![captura de pantalla de 2019-03-04 11-55-20](https://user-images.githubusercontent.com/38528985/53740692-aff62b00-3e8c-11e9-84d5-399e9b015292.png)

Este programa usa net.connect para crear un conexión de cliente al puerto 60300, y entonces espera por datos. Ejecutamos node net-watching-json-client.js, vemos como espera por el archivo target.txt. Si hacemos un touch de target.txt, aparecerá los datos del archivo. Hay que tener en cuenta que para que esto funcione, el programa del servidor debe estar ejecutándose:

![captura de pantalla de 2019-03-04 11-56-35](https://user-images.githubusercontent.com/38528985/53740817-f186d600-3e8c-11e9-8868-dd7ab2e40b44.png)

## Probando la funcionalidad de la aplicación de red

## Implementando un servidor de prueba

Aquí implementaremos un servicio de prueba que divide a propósito un mensaje en múltiples partes:

![captura de pantalla de 2019-03-04 12-09-35](https://user-images.githubusercontent.com/38528985/53741400-32cbb580-3e8e-11e9-9fdf-9a38ea385d7f.png)

Lo ejecutamos en la terminal: node test-json-service.js. Este servicio de prueba difiere de nuestro programa de servicio anterior en algunos aspectos. En lugar de configurar un observador del sistema de archivos, como hicimos para el servicio real, aquí solo enviamos el primer fragmento predeterminado de inmediato. Mientras ejecutamos y vemos como está esperando, ejecutamos en otra terminal el programa del cliente. Esto nos da un error porque el mensaje no está completo:

![captura de pantalla de 2019-03-04 12-09-04](https://user-images.githubusercontent.com/38528985/53746074-5562cc00-3e98-11e9-81fd-18111b800a32.png)

## Extendiendo las clases básicas en módulos personalizados

El programa que hicimos en la sección anterior tenía una debilidad en el código del cliente, no sacaba las entradas. Cualquier mensaje que llega como eventos de datos múltiples da error. El programa cliente tiene dos trabajos que hacer, uno es sacar datos entrantes en mensajes, y el otro es manejar cada mensaje cuando llegue.

Para no tener que meter ambos trabajos en un mismo programa, la solución correcta es transformar al menos uno de ellos en un módulo Node.js. Crearemos un módulo que maneje la pieza de entrada para que el programa principal pueda obtener mensajes completos.

## Funcionalidad de exportación en un módulo

En este apartado, vamos a exponer a LDJClient como un módulo. Empezamos por crear dentro del directorio de trabajo networking, otro directorio llamado lib. Dentro de este directorio creamos el fichero ldj-client.js:

![captura de pantalla de 2019-03-04 12-25-10](https://user-images.githubusercontent.com/38528985/53746359-ed60b580-3e98-11e9-9b77-5cae4fcf47b0.png)

El objeto module.exports es el puente entre el código del módulo y el mundo exterior.

## Importando un módulo Node.js personalizado

En este apartado, modificamos el cliente para usarlo en lugar de leer directamente desde el flujo TCP, llamando a este fichero net-watcher-ldj-client.js:

![captura de pantalla de 2019-03-04 12-25-34](https://user-images.githubusercontent.com/38528985/53746809-e2f2eb80-3e99-11e9-958e-9de4740107f8.png)

Es similar al programa net-watcher-json-client. La principal diferencia es que en lugar de enviar buffers de datos directamente a JSON.parse, este programa se basa en el módulo LDJClient para producir eventos de mensaje. 

Ejecutamos en una terminal el servicio de prueba (node test-json-service.js) y en otra terminal el nuevo cliente para conectarse:

![captura de pantalla de 2019-03-04 12-27-37](https://user-images.githubusercontent.com/38528985/53747181-9c51c100-3e9a-11e9-8c62-7ae9dbac028b.png)

Ahora tendremos un servidor y un cliente que utilizan un formato de mensaje personalizado para comunicarse de manera fiable.

## Desarrollo de pruebas unitarias con Mocha

Mocha es un popular marco de pruebas para Node.js. Cuenta con varios estilos diferentes para describir nuestras pruebas. Debemos instalar instalado npm y después de esto, debemos desarrollar una prueba unitaria para la clase LDJClient.

## Instalando Mocha con npm

Hemos ejecutado el comando npm init -y en nuestro directorio networking, y directamente se nos ha creado por defecto un archivo package.json. Seguidamente hemos introducido el comando: npm install --save-dev --save-exact mocha@3.4.2. Después de instalar esto, haciendo un cat package.json, podemos comprobar que se ha descargado correctamente:

![captura de pantalla de 2019-03-04 16-41-54](https://user-images.githubusercontent.com/38528985/53748046-74635d00-3e9c-11e9-9669-5db18bf8d86f.png)

## Versionamiento semántico de paquetes

La etiqueta --save-exact le dice a npm que versión específica queremos instalar. Por defecto, npm usa el versionamiento semántico para encontrar la mejor versión disponible de un paquete.

El número de la versión consta de tres partes unidas por puntos, la versión principal, la versión menor y el parche.

 - Si la modificación del código no introduce o elimina ninguna funcionalidad, se incrementa la versión del parche.
 - Si la modificación introduce funcionalidad pero no elimina o altera la funcionalidad ya existente, se incrementa la versión menor y se resetea el parche.
 - Si la modificación altera o rompe la funcionalidad existente, se incrementa la versión principal y se resetea la versión menor y el parche.
 
## Escribiendo pruebas unitarias con Mocha

Hemos creado un directorio /networking/test para mantener el código relacionado con la prueba. Hemos llamado al archivo ldj-client-test.js:

![captura de pantalla de 2019-03-04 12-37-51](https://user-images.githubusercontent.com/38528985/53748336-11be9100-3e9d-11e9-8229-cfed50477bec.png)

## Ejecutando pruebas con npm

Para ejecutar las pruebas usando npm, debemos añadir una entrada al fichero package.json:

![captura de pantalla de 2019-03-04 16-50-02](https://user-images.githubusercontent.com/38528985/53748631-a1fcd600-3e9d-11e9-85e8-91e2ec9df1e8.png)

Visualizando el contenido del fichero package.json, quedaría así:

![captura de pantalla de 2019-03-04 16-50-43](https://user-images.githubusercontent.com/38528985/53748664-b17c1f00-3e9d-11e9-9470-f724075990e0.png)

Luego, ejecutando npm test, se realiza la ejecución de prueba:

![captura de pantalla de 2019-03-04 12-48-32](https://user-images.githubusercontent.com/38528985/53748548-71b53780-3e9d-11e9-86af-7eb507ddb108.png)

## Ejercicios

## Testability

Este ejercicio lo que nos pide es añadir dos pruebas unitarias:
   - La primera, para para un solo mensaje que se divide en dos o más eventos de datos desde el stream.
   - La segunda, que pase un null al constructor LDJClient, y lance un error.
   
Lo que hacemos es editar el fichero 'ldj-client-test.js', añadiendo las pruebas:

![Captura de pantalla de 2019-03-09 13-35-39](https://user-images.githubusercontent.com/38528985/54072265-5b79f380-4270-11e9-88c2-2c3402256033.png)

Es importante, añadir en el constructor, la opcion para comprobar si el stream es null, y en caso de que sea así, aparezca el error por pantalla:

![Captura de pantalla de 2019-03-09 13-37-55](https://user-images.githubusercontent.com/38528985/54072285-ad227e00-4270-11e9-9882-ed19ada2fa57.png)

Vemos, al ejecutar las pruebas, que funcionan correctamente:

![Captura de pantalla de 2019-03-09 13-35-23](https://user-images.githubusercontent.com/38528985/54072266-63d22e80-4270-11e9-8e1b-9c1a1fd12f0d.png)
