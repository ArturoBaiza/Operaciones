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
let problemasMostrados = []; // Array para almacenar los problemas mostrados
let correctasSuma = 0;
let correctasResta = 0;
let correctasProducto = 0;
let correctasDivision = 0;

function btnSumar() {
  mostrarProblemaAleatorio(problemasSuma);
}

function btnResta() {
  mostrarProblemaAleatorio(problemasResta);
}

function btnProducto() {
  mostrarProblemaAleatorio(problemasProducto);
}

function btnDivision() {
  mostrarProblemaAleatorio(problemasDivision);
}

function mostrarProblemaAleatorio(arrayProblemas) {
  if (arrayProblemas.length > 0) {
    // Elegir un índice aleatorio dentro del rango de problemas disponibles
    let indice = Math.floor(Math.random() * arrayProblemas.length);

    // Obtener el problema aleatorio
    let problema = arrayProblemas[indice];
    n1 = problema.num1;
    n2 = problema.num2;

    // Mostrar el problema en la interfaz
    num1.innerHTML = n1;
    num2.innerHTML = n2;

    // Mostrar el signo de la operación actual
    switch (operacion_actual) {
      case "+":
        operacion.innerHTML = " + ";
        break;
      case "-":
        operacion.innerHTML = " - ";
        break;
      case "*":
        operacion.innerHTML = " x ";
        break;
      case "/":
        operacion.innerHTML = " / ";
        break;
      default:
        break;
    }

    // Guardar el problema mostrado en el array correspondiente
    problemasMostrados.push({ operacion: operacion_actual, problema: problema });

    // Eliminar el problema del array original para no repetirlo
    arrayProblemas.splice(indice, 1);

    // Enfocar el input de respuesta
    respuesta_usuario.focus();
  }
}

function enviar() {
  if (respuesta_usuario.value == "") {
    return;
  }

  let solucion = parseInt(respuesta_usuario.value.trim());
  let problemaActual;

  // Buscar el problema actual en el array de problemas mostrados
  for (let i = 0; i < problemasMostrados.length; i++) {
    if (problemasMostrados[i].operacion === operacion_actual) {
      problemaActual = problemasMostrados[i].problema;
      break;
    }
  }

  // Verificar si la respuesta es correcta y actualizar el contador correspondiente
  if (solucion === problemaActual.respuesta) {
    switch (operacion_actual) {
      case "+":
        correctasSuma++;
        break;
      case "-":
        correctasResta++;
        break;
      case "*":
        correctasProducto++;
        break;
      case "/":
        correctasDivision++;
        break;
      default:
        break;
    }
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

  // Mostrar un nuevo problema aleatorio del tipo de operación actual
  switch (operacion_actual) {
    case "+":
      mostrarProblemaAleatorio(problemasSuma);
      break;
    case "-":
      mostrarProblemaAleatorio(problemasResta);
      break;
    case "*":
      mostrarProblemaAleatorio(problemasProducto);
      break;
    case "/":
      mostrarProblemaAleatorio(problemasDivision);
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

  // Establecer la operación actual según el botón seleccionado
  switch (idBoton) {
    case "suma":
      operacion_actual = "+";
      break;
    case "resta":
      operacion_actual = "-";
      break;
    case "producto":
      operacion_actual = "*";
      break;
    case "division":
      operacion_actual = "/";
      break;
    default:
      break;
  }

  // Mostrar el signo de la operación actual
  switch (operacion_actual) {
    case "+":
      operacion.innerHTML = " + ";
      break;
    case "-":
      operacion.innerHTML = " - ";
      break;
    case "*":
      operacion.innerHTML = " x ";
      break;
    case "/":
      operacion.innerHTML = " / ";
      break;
    default:
      break;
  }
}
