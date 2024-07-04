let n1, n2;
let operacion_actual = "";
let problemasSuma = [
  { num1: 234, num2: 567, respuesta: 801 },
  { num1: 789, num2: 123, respuesta: 912 },
  { num1: 456, num2: 789, respuesta: 1245 },
  { num1: 321, num2: 654, respuesta: 975 },
  { num1: 987, num2: 543, respuesta: 1530 }
];
let problemasResta = [
  { num1: 800, num2: 567, respuesta: 233 },
  { num1: 900, num2: 123, respuesta: 777 },
  { num1: 600, num2: 300, respuesta: 300 },
  { num1: 800, num2: 654, respuesta: 146 },
  { num1: 1000, num2: 543, respuesta: 457 }
];
let problemasProducto = [
  { num1: 10, num2: 20, respuesta: 200 },
  { num1: 30, num2: 40, respuesta: 1200 },
  { num1: 5, num2: 5, respuesta: 25 },
  { num1: 8, num2: 9, respuesta: 72 },
  { num1: 7, num2: 6, respuesta: 42 }
];
let problemasDivision = [
  { num1: 100, num2: 10, respuesta: 10 },
  { num1: 200, num2: 5, respuesta: 40 },
  { num1: 81, num2: 9, respuesta: 9 },
  { num1: 36, num2: 6, respuesta: 6 },
  { num1: 63, num2: 7, respuesta: 9 }
];
let indiceProblemaActual = -1; // Índice del problema actual
let correctasSuma = 0;
let correctasResta = 0;
let correctasProducto = 0;
let correctasDivision = 0;

function btnSumar() {
  if (problemasSuma.length > 0) {
    mjs_correccion.innerHTML = "";
    activarBoton("suma");
    operacion_actual = "+";

    operacion.innerHTML = " + ";

    mostrarNuevoProblema(problemasSuma);
  }
}

function btnResta() {
  if (problemasResta.length > 0) {
    mjs_correccion.innerHTML = "";
    activarBoton("resta");
    operacion_actual = "-";

    operacion.innerHTML = " - ";

    mostrarNuevoProblema(problemasResta);
  }
}

function btnProducto() {
  if (problemasProducto.length > 0) {
    mjs_correccion.innerHTML = "";
    activarBoton("producto");
    operacion_actual = "*";

    operacion.innerHTML = " x ";

    mostrarNuevoProblema(problemasProducto);
  }
}

function btnDivision() {
  if (problemasDivision.length > 0) {
    mjs_correccion.innerHTML = "";
    activarBoton("division");
    operacion_actual = "/";

    operacion.innerHTML = " / ";

    mostrarNuevoProblema(problemasDivision);
  }
}

function mostrarNuevoProblema(arrayProblemas) {
  // Seleccionar aleatoriamente un problema del array
  indiceProblemaActual = Math.floor(Math.random() * arrayProblemas.length);

  let problemaActual = arrayProblemas[indiceProblemaActual];
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
  let problemaActual;

  switch (operacion_actual) {
    case "+":
      problemaActual = problemasSuma[indiceProblemaActual];
      if (solucion === problemaActual.respuesta) {
        correctasSuma++;
      }
      break;
    case "-":
      problemaActual = problemasResta[indiceProblemaActual];
      if (solucion === problemaActual.respuesta) {
        correctasResta++;
      }
      break;
    case "*":
      problemaActual = problemasProducto[indiceProblemaActual];
      if (solucion === problemaActual.respuesta) {
        correctasProducto++;
      }
      break;
    case "/":
      problemaActual = problemasDivision[indiceProblemaActual];
      if (solucion === problemaActual.respuesta) {
        correctasDivision++;
      }
      break;
    default:
      break;
  }

  // Eliminar el problema resuelto del array correspondiente
  switch (operacion_actual) {
    case "+":
      problemasSuma.splice(indiceProblemaActual, 1);
      break;
    case "-":
      problemasResta.splice(indiceProblemaActual, 1);
      break;
    case "*":
      problemasProducto.splice(indiceProblemaActual, 1);
      break;
    case "/":
      problemasDivision.splice(indiceProblemaActual, 1);
      break;
    default:
      break;
  }

  // Verificar si se han completado todas las operaciones
  if (problemasSuma.length === 0 && problemasResta.length === 0 && problemasProducto.length === 0 && problemasDivision.length === 0) {
    mostrarResultadosFinales();
  } else {
    cambiarProblema();
    respuesta_usuario.value = "";
  }
}

function cambiarProblema() {
  respuesta_usuario.value = "";

  switch (operacion_actual) {
    case "+":
      if (problemasSuma.length > 0) {
        mostrarNuevoProblema(problemasSuma);
      }
      break;
    case "-":
      if (problemasResta.length > 0) {
        mostrarNuevoProblema(problemasResta);
      }
      break;
    case "*":
      if (problemasProducto.length > 0) {
        mostrarNuevoProblema(problemasProducto);
      }
      break;
    case "/":
      if (problemasDivision.length > 0) {
        mostrarNuevoProblema(problemasDivision);
      }
      break;
    default:
      break;
  }
}

function mostrarResultadosFinales() {
  // Ocultar todo el contenido relacionado con los problemas
  document.getElementById("contenedor-problemas").style.display = "none";

  // Mostrar resultados finales
  let resultadosFinales = document.createElement("div");
  resultadosFinales.innerHTML = `
    <h2>Resultados Finales</h2>
    <p>Suma: ${correctasSuma}</p>
    <p>Resta: ${correctasResta}</p>
    <p>Multiplicación: ${correctasProducto}</p>
    <p>División: ${correctasDivision}</p>
  `;
  document.body.appendChild(resultadosFinales);
}

function activarBoton(idBoton) {
  // Eliminar la clase 'activado' de todos los botones
  document.getElementById("suma").classList.remove("activado");
  document.getElementById("resta").classList.remove("activado");
  document.getElementById("producto").classList.remove("activado");
  document.getElementById("division").classList.remove("activado");

  // Agregar la clase 'activado' al botón actual
  document.getElementById(idBoton).classList.add("activado");
}
