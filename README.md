Frosch
======

Frosch, software para juego de rana electrónica o rana digital.

**Versión 1.4.4**

----------

Existe un canal en discrod por si tienen preguntas y para enviar anuncios relacionados con el proyecto
[Discord](https://discord.com/channels/734551945066446848/734551945066446851)

----------

**Instalación**

Descargue la versión acorde a su sistema operativo y arquitectura:

- Windows
  - [Instalador](https://github.com/ivanrey/Frosch/releases/latest/download/Frosch-win.exe)
- Linux
  - Arquitectura de 64 bits
    - [Extraíble](https://github.com/ivanrey/Frosch/releases/latest/download/Frosch-linux-x64.zip)
  - Arquitectura de 32 bits
    - [Extraíble](https://github.com/ivanrey/Frosch/releases/latest/download/Frosch-linux-ia32.zip)
- Mac
  - [Instalador](https://github.com/ivanrey/Frosch/releases/latest/download/Frosch-mac.dmg) (dmg)
- Código Fuente
  - [Código Fuente](https://github.com/ivanrey/Frosch/archive/v1.4.2.zip)
      
**Configuración**

Para configurar edite el archivo `app/config/config.json`

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

Para desarrollar nuevas funcionalidades siga las siguientes instrucciones:

- [Instalar NodeJS](https://nodejs.org/en/download/ "(target|_blank)")
- [Instalar Yarn](https://yarnpkg.com/getting-started/install "(target|_blank)")
- `git clone https://github.com/ivanrey/Frosch.git`
- `cd Frosch`
- Instalar dependencias de electron `yarn`
- Instalar dependencias del app 
    - `cd app`
    - `yarn` (estando en carpeta app)
- Lanzar la app `yarn start`

Todo el código está en la carpeta `app` y sigue las convenciones de una aplicación angularjs v1.5

Para distribuir la aplicación, es decir, crear los ejecutables
`yarn dist`

Para más instrucciones de como compilar lea las [Instrucciones de Electron-Builder](https://www.electron.build/ "(target|_blank)")

**Idiomas**

Actualmente tiene versión en español colombiano (por defecto), versión en inglés y en francés.


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

