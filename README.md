# Comp-geo paper figures


# Running

El `docker-compose.yml` configura un ambiente local de desarrollo, para que en `localhost:3000` se puedan servir los archivos de Nami de cada caso, y en `localhost:8000` una instancia de `jupyterlab` para abrir los notebooks. Además los archivos de la librería Nami se cargan desde un repo cuya dirección está en el `.env` para compilar y reiniciar los servicios manualmente usando el script `restart.sh`.

EasyWave y Nami están en la imagen del servicio `local`, pero geoclaw corre en un servicio aparte `geoclaw` a partir de su propia imagen, debido a la complejidad de la instalación. GeoClaw también habilita el puerto `4000` para abrir jupyterlab y correr cosas de visclaw que son importantes. Para hacer esto bien es que hay otro volumen que comparte la batimetría descargada, entre los servicios `local` y `geoclaw`. 
