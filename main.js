// Define una estructura para los problemas de suma con sus respuestas
let problemasSumaPersonalizados = [
  { num1: 234, num2: 567, respuesta: 801 },
  { num1: 789, num2: 123, respuesta: 912 },
  { num1: 456, num2: 789, respuesta: 1245 },
  { num1: 321, num2: 654, respuesta: 975 },
  { num1: 987, num2: 543, respuesta: 1530 }
];

let indiceProblemaActual = -1; // Índice del problema actual

function btnSumar() {
  if (problemasSuma < 5) {
    mjs_correccion.innerHTML = "";
    activarBoton("suma");
    operacion_actual = "+";

    operacion.innerHTML = " + ";

    mostrarNuevoProblemaSuma();
    problemasSuma++;

    if (problemasSuma === 5) {
      completarSeccion("suma");
    }
  }
}

function mostrarNuevoProblemaSuma() {
  // Seleccionar aleatoriamente un problema de la lista personalizada
  indiceProblemaActual = Math.floor(Math.random() * problemasSumaPersonalizados.length);

  let problemaActual = problemasSumaPersonalizados[indiceProblemaActual];
  n1 = problemaActual.num1;
  n2 = problemaActual.num2;

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function enviar() {
  if (respuesta_usuario.value == "") {
    return;
  }

  let solucion = parseInt(respuesta_usuario.value.trim());
  let problemaActual = problemasSumaPersonalizados[indiceProblemaActual];
  let respuestaCorrecta = problemaActual.respuesta;

  let i = document.createElement("i");

  if (solucion === respuestaCorrecta) {
    i.className = "fa-regular fa-face-grin";
    mjs_correccion.appendChild(i);
    correctasSuma++;
  } else {
    i.className = "fa-regular fa-face-frown";
    mjs_correccion.appendChild(i);
  }

  if (problemasSuma === 5) {
    mostrarResultadosFinales();
  } else {
    cambiarProblema();
    respuesta_usuario.value = "";
  }
}

function cambiarProblema() {
  respuesta_usuario.value = "";
  mostrarNuevoProblemaSuma();
}

function completarSeccion(tipo) {
  let mensaje = document.createElement("p");
  mensaje.textContent = `Completaste la sección de ${tipo}.`;
  mjs_correccion.appendChild(mensaje);
}
