let n1, n2;
let operacion_actual = "";
let correctas = 0;
let incorrectas = 0;

function btnSumar() {
  mjs_correccion.innerHTML = "";
  activarBoton("suma");
  operacion_actual = "+";

  operacion.innerHTML = " + ";

  nuevaSuma();
}

function nuevaSuma() {
  n1 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000
  n2 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnProducto() {
  mjs_correccion.innerHTML = "";
  activarBoton("producto");
  operacion_actual = "*";

  operacion.innerHTML = " x ";

  nuevoProducto();
}

function nuevoProducto() {
  n1 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000
  n2 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnResta() {
  mjs_correccion.innerHTML = "";
  activarBoton("resta");
  operacion_actual = "-";

  operacion.innerHTML = " - ";

  nuevaResta();
}

function nuevaResta() {
  n1 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000
  n2 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnDivision() {
  mjs_correccion.innerHTML = "";
  activarBoton("division");
  operacion_actual = "/";

  operacion.innerHTML = " / ";

  nuevaDivision();
}

function nuevaDivision() {
  let divisores = [];

  n1 = parseInt(Math.random() * 1000) + 1;  // Números entre 1 y 1000

  for (let i = 1; i <= n1; i++) {
    if (n1 % i === 0) {
      divisores.push(i);
    }
  }

  let pos = parseInt(Math.random() * divisores.length);
  n2 = divisores[pos];

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function enviar() {
  if (respuesta_usuario.value == "") {
    return;
  }

  let solucion;
  let operacionStr = n1 + operacion_actual + n2;
  solucion = eval(operacionStr);

  let i = document.createElement("i");

  if (parseFloat(respuesta_usuario.value) === solucion) {
    i.className = "fa-regular fa-face-grin";
    mjs_correccion.appendChild(i);

    correctas++;
    document.getElementById("caritas_correctas").textContent = "Correctas: " + correctas;
    // Cambiar automáticamente el problema
    cambiarProblema();
  } else {
    i.className = "fa-regular fa-face-frown";
    mjs_correccion.appendChild(i);

    incorrectas++;
    document.getElementById("caritas_incorrectas").textContent = "Incorrectas: " + incorrectas;
  }

  respuesta_usuario.value = "";
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
