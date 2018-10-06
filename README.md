Frosch
======

Frosch, software para juego de rana electrónica o rana digital.

**Versión 1.3.1**

----------

**Instalación**

**Configuración**

Para configurar edite el archivo `config/config.json`

**Combinaciones de Teclas Fijas:**

 - `s s s` termina el programa y sale al sistema operativo
 - `arriba abajo arriba abajo arriba abajo enter` vuelve al menú inicial
 - `c` inserta crédito

**Cómo jugar**

**Personalizar la configuración**

El archivo config.json contiene las variables a personalizar.

**Personalizar los sonidos**

Para usar sus propios sonidos reemplace los archivos de la carpeta assets/sounds según el idioma que desee personalizar.

Los archivos deben venir en formato ogg.

**Personalizar los videos**

Instrucciones para los videos aleatorios antes de iniciar el juego:

Los videos deben estar nombrados en orden desde el 1 hasta el final, con el nombre video1, video2, video3 video4, etc.

El formato de los videos es WebM y la extensión debe ser .webm

Ejemplo de como deben ir los videos en la carpeta:

    video1.webm
    video2.webm
    video3.webm
    video4.webm

No se puede saltar ningún número, deben ser consecutivos. El formato WebM puede se convertido con programas de internet.

Los videos utilizarán el ancho completo de la pantalla. Se recomienda tener videos del mismo ancho de la pantalla.

La cantidad de videos es ilimitada.

Los videos se lanzan de forma aleatoria cada cierta cantidad de minutos que se configura en la variable "minutosEntreVideos" del archivo
config.json

Un programa para convertir los videos de otros formatos a webm puede descargarse en http://easyhtml5video.com/

**Personalizar el Idioma**

La carepta assets/lang contiene el archivo de idioma. El archivo está en formato JSON. Las llaves deben permanecer iguales se debe cambiar el valor únicamente. En el config.json se escoge el archivo de idioma que el sistema usará.

Los sonidos utilizados son los que corresponden al código del idioma en la carpeta assets/sounds.

**Personalizar la apariencia**

**Extender el sistema**

**Idiomas**

Actualmente tiene versión en español colombiano (por defecto), versión en inglés y en francés.



Próximamente más instrucciones.

CRÉDITOS
========

Diseño e imaginación: [Joaquín Díaz](http://construyasuvideorockola.com) e Iván Rey [Iván Rey](https://github.com/ivanrey)
Programación: Iván Rey
Sonidos y Música: Joaquín Díaz

OTROS NOMBRES
=============

Este juego también es conocido con estos otros nombres, aunque es posible que tenga otro esquema de juego.
Este software está basado en la versión colombiana (Rana), aunque debería poderse migrar a otras versiones en otros países.

También es conocido como:

 - Juego de Sapo (Perú, Argentina)
 - Juego de la rana (España, Chile)
 - Igel jokoa (País Vasco)
 - Jew de la grenouille, Le Tonneau, (Francia)
 - Tiro al Sapo (Bolivia, Perú)
 - Rana (Colombia)
 - Toad in the hole (UK - Reino Unido)


ROADMAP BOLIRANA
================

- [ ] 1 crédito por juego no por jugador
- [ ] Ruleta para blanqueada
- [ ] Ruleta para Rana y Ranita
- [ ] Opción con 3 botones
- [ ] Opción Botellita
- [ ] Distribución Bolirana con más hoyos
- [ ] Opción de intercambio rápido entre rana y bolirana

