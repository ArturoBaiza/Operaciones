let n1, n2;
let operacion_actual = "";
let contadorSuma = 0;
let contadorResta = 0;
let contadorProducto = 0;
let contadorDivision = 0;
const limiteOperaciones = 5;
let correctasSuma = 0;
let incorrectasSuma = 0;
let correctasResta = 0;
let incorrectasResta = 0;
let correctasProducto = 0;
let incorrectasProducto = 0;
let correctasDivision = 0;
let incorrectasDivision = 0;

function btnSumar() {
  if (contadorSuma >= limiteOperaciones) {
    alert("Has completado todas las operaciones de suma.");
    return;
  }
  mjs_correccion.innerHTML = "";
  activarBoton("suma");
  operacion_actual = "+";
  operacion.innerHTML = " + ";
  nuevaSuma();
  contadorSuma++;
}

function nuevoProducto() {
  if (contadorProducto >= limiteOperaciones) {
    alert("Has completado todas las operaciones de multiplicación.");
    return;
  }
  mjs_correccion.innerHTML = "";
  activarBoton("producto");
  operacion_actual = "*";
  operacion.innerHTML = " x ";
  nuevaProducto();
  contadorProducto++;
}

function nuevaResta() {
  if (contadorResta >= limiteOperaciones) {
    alert("Has completado todas las operaciones de resta.");
    return;
  }
  mjs_correccion.innerHTML = "";
  activarBoton("resta");
  operacion_actual = "-";
  operacion.innerHTML = " - ";
  nuevaResta();
  contadorResta++;
}

function nuevaDivision() {
  if (contadorDivision >= limiteOperaciones) {
    alert("Has completado todas las operaciones de división.");
    return;
  }
  mjs_correccion.innerHTML = "";
  activarBoton("division");
  operacion_actual = "/";
  operacion.innerHTML = " / ";
  nuevaDivision();
  contadorDivision++;
}

function cambiarProblema() {
  respuesta_usuario.value = "";
  if (operacion_actual == "+") {
    nuevaSuma();
  } else if (operacion_actual == "-") {
    nuevaResta();
  } else if (operacion_actual == "*") {
    nuevoProducto();
  } else if (operacion_actual == "/") {
    nuevaDivision();
  }

  // Mostrar resultados parciales
  if (contadorSuma === limiteOperaciones) {
    mostrarResultados("Suma", correctasSuma, incorrectasSuma);
  }
  if (contadorResta === limiteOperaciones) {
    mostrarResultados("Resta", correctasResta, incorrectasResta);
  }
  if (contadorProducto === limiteOperaciones) {
    mostrarResultados("Multiplicación", correctasProducto, incorrectasProducto);
  }
  if (contadorDivision === limiteOperaciones) {
    mostrarResultados("División", correctasDivision, incorrectasDivision);
  }

  // Mostrar resumen final si todas las operaciones han sido completadas
  if (
    contadorSuma === limiteOperaciones &&
    contadorResta === limiteOperaciones &&
    contadorProducto === limiteOperaciones &&
    contadorDivision === limiteOperaciones
  ) {
    mostrarPantallaFinal();
  }
}

function mostrarResultados(operacion, correctas, incorrectas) {
  let mensaje = `Resultados de ${operacion}:<br>`;
  mensaje += `Correctas: ${correctas}<br>`;
  mensaje += `Incorrectas: ${incorrectas}<br><br>`;
  mjs_correccion.innerHTML += mensaje;
}

function mostrarPantallaFinal() {
  // Ocultar calculadora
  document.querySelector(".container-operacion").style.display = "none";
  document.querySelector("#teclado").style.display = "none";
  document.querySelector("#corregir").style.display = "none";
  document.querySelector("#cambiar").style.display = "none";

  // Mostrar pantalla final con resultados
  let pantallaFinal = "<h2>Resultados Finales</h2>";
  pantallaFinal += `<h3>Suma: Correctas ${correctasSuma}, Incorrectas ${incorrectasSuma}</h3>`;
  pantallaFinal += `<h3>Resta: Correctas ${correctasResta}, Incorrectas ${incorrectasResta}</h3>`;
  pantallaFinal += `<h3>Multiplicación: Correctas ${correctasProducto}, Incorrectas ${incorrectasProducto}</h3>`;
  pantallaFinal += `<h3>División: Correctas ${correctasDivision}, Incorrectas ${incorrectasDivision}</h3>`;
  mjs_correccion.innerHTML = pantallaFinal;
}

function enviar() {
  if (respuesta_usuario.value == "") {
    return;
  }

  let solucion;
  let operacionStr = n1 + operacion_actual + n2;
  solucion = eval(operacionStr);

  let i = document.createElement("i");

  // Revisar si la respuesta es numérica o contiene el signo negativo o punto
  let respuestaUsuario = respuesta_usuario.value.trim();
  if (!isNaN(respuestaUsuario) || respuestaUsuario === "-" || respuestaUsuario === ".") {
    if (parseFloat(respuestaUsuario) === solucion) {
      i.className = "fa-regular fa-face-grin";
      mjs_correccion.appendChild(i);
      // Contabilizar respuesta correcta
      if (operacion_actual === "+") {
        correctasSuma++;
      } else if (operacion_actual === "-") {
        correctasResta++;
      } else if (operacion_actual === "*") {
        correctasProducto++;
      } else if (operacion_actual === "/") {
        correctasDivision++;
      }
    } else {
      i.className = "fa-regular fa-face-frown";
      mjs_correccion.appendChild(i);
      // Contabilizar respuesta incorrecta
      if (operacion_actual === "+") {
        incorrectasSuma++;
      } else if (operacion_actual === "-") {
        incorrectasResta++;
      } else if (operacion_actual === "*") {
        incorrectasProducto++;
      } else if (operacion_actual === "/") {
        incorrectasDivision++;
      }
    }
  } else {
    // Respuesta no válida
    i.className = "fa-regular fa-face-frown";
    mjs_correccion.appendChild(i);
  }

  // Cambiar automáticamente el problema
  cambiarProblema();
  respuesta_usuario.value = "";
}

function addNumToInput(num) {
  respuesta_usuario.value += num;
}

function clearInput() {
  respuesta_usuario.value = "";
}

function backspaceInput() {
  respuesta_usuario.value = respuesta_usuario.value.slice(0, -1);
}

respuesta_usuario.onkeydown = function (e) {
  var ev = document.all ? window.event : e;
  if (ev.keyCode == 13) {
    enviar();
  }
}

function activarBoton(idBoton) {
  document.getElementById("suma").className = "";
  document.getElementById("resta").className = "";
  document.getElementById("producto").className = "";
  document.getElementById("division").className = "";
  document.getElementById(idBoton).className = "activado";
}
