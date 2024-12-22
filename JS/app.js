const tituloCancion = document.querySelector('.reproductor-musica h1');



 const nombreArtista = document.querySelector('.reproductor-musica p');

 const progreso = document.getElementById('progreso');


 const cancion = document.getElementById('cancion');

 const iconoControl = document.getElementById('iconoControl');
 const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar ');




 const botonAtras = document.querySelector('.controles button.atras');


 const botonAdelante = document.querySelector('.controles button.adelante');
 

 /* Creando Array de objectos para la música*/ 

 const canciones = [
    {
        titulo:'Back One Day',
        nombre:'NEFFEX',
        fuente:'../music/Back One Day (Final Master).mp3'
    },
    {
        titulo:'Anxiety (Final Master)',
        nombre:'NEFFEX',
        fuente:'../music/NEFFEX - Anxiety (Final Master 1).wav'
    },
    {
        titulo:'Best of me',
        nombre:'NEFFEX',
        fuente:'../music/NEFFEX - Best of Me.mp3'
    },
    {
        titulo:'Grateful',
        nombre:'NEFFEX',
        fuente:'../music/NEFFEX - Grateful.mp3'
    },
    {
        titulo:'Better Days',
        nombre:'NEFFEX',
        fuente:'../music/NEFFEX - Better Days (the FINAL MASTER).wav'
    }
    
 ]

 let indiceCancionActual = 0;

 function actualizarInfoCancion() {
    tituloCancion.textContent =canciones[indiceCancionActual].titulo;
    nombreArtista.textContent =canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata',function(){});
    
 }

cancion.addEventListener('loadedmetadata', function() {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
    
})

cancion.addEventListener('ended', function() {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
  });

 botonReproducirPausar.addEventListener('click', reproducirPausar);

    function reproducirPausar(){
        if(cancion.paused){
            reproducirCancion();
            
        } else {
            pausarCancion();
           
        }


        
    };
    function reproducirCancion() {
        cancion.play();
        iconoControl.classList.replace('bi-play-fill','bi-pause-fill');
    }

    function pausarCancion() {
        cancion.pause();
        iconoControl.classList.replace('bi-pause-fill','bi-play-fill');
    }

        /* Temporizador de las canciones*/
    function formatTime(tiempo) {
        const minutos = Math.floor(tiempo / 60);
        const segundos = Math.floor(tiempo % 60).toString().padStart(2, '0');
        return `${minutos}:${segundos}`;
      }


    function actualizarTiempo() {
        const intervalo = setInterval(() => {
          if (!cancion.paused) {
            progreso.value = cancion.currentTime;
            const tiempoActualValor = formatTime(cancion.currentTime);
            tiempoActual.textContent = tiempoActualValor; // Asegúrate que tiempoActual exista y sea visible
            console.log('Tiempo actual:', tiempoActualValor); // Para depuración
          } else {
            clearInterval(intervalo);
          }
        }, 500); // Ajusta el intervalo si es necesario
      }
      
      cancion.addEventListener('timeupdate', actualizarTiempo); // Iniciar la actualización del temporizador al reproducir
  
    cancion.addEventListener('timeupdate', function(){
        if (!cancion.paused) {
            progreso.value = cancion.currentTime;
        }
    });

    progreso.addEventListener('input', function(){
        cancion.currentTime = progreso.value;
    });

   /* progreso.addEventListener('change',  function () {
        reproducirCancion();
    });*/ 

    botonAdelante.addEventListener('click', function() {
        indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
        actualizarInfoCancion();
        reproducirCancion();
        
    });

    botonAtras.addEventListener('click', function() {
        indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
        actualizarInfoCancion();
        reproducirCancion();

        console.log(canciones.length);
        
    });

    let contadorAtras = 0; 

    
    botonAtras.addEventListener('click', function() {
    contadorAtras++;
  
    if (contadorAtras === 2) {
      // Cambiar a la canción anterior
      indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
      actualizarInfoCancion();
      reproducirCancion();
      contadorAtras = 0; 
    } else if (contadorAtras === 1) {
      // Reiniciar la canción
      cancion.currentTime = 0;
      cancion.play();
    }
  });

  


 actualizarInfoCancion();


