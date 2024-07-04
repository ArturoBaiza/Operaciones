let n1, n2;
let operacion_actual = "";
let tiempoMaximo = 120; // 2 minutos en segundos
let tiempoRestanteSuma = tiempoMaximo;
let tiempoRestanteResta = tiempoMaximo;
let tiempoRestanteProducto = tiempoMaximo;
let tiempoRestanteDivision = tiempoMaximo;
let contadorSuma, contadorResta, contadorProducto, contadorDivision;

function iniciarContadores() {
  contadorSuma = setInterval(function() {
    tiempoRestanteSuma--;
    actualizarTiempoRestante("suma", tiempoRestanteSuma);
    if (tiempoRestanteSuma <= 0) {
      clearInterval(contadorSuma);
    }
  }, 1000);

  contadorResta = setInterval(function() {
    tiempoRestanteResta--;
    actualizarTiempoRestante("resta", tiempoRestanteResta);
    if (tiempoRestanteResta <= 0) {
      clearInterval(contadorResta);
    }
  }, 1000);

  contadorProducto = setInterval(function() {
    tiempoRestanteProducto--;
    actualizarTiempoRestante("producto", tiempoRestanteProducto);
    if (tiempoRestanteProducto <= 0) {
      clearInterval(contadorProducto);
    }
  }, 1000);

  contadorDivision = setInterval(function() {
    tiempoRestanteDivision--;
    actualizarTiempoRestante("division", tiempoRestanteDivision);
    if (tiempoRestanteDivision <= 0) {
      clearInterval(contadorDivision);
    }
  }, 1000);
}

function actualizarTiempoRestante(tipoOperacion, tiempoRestante) {
  // Actualizar el elemento HTML correspondiente
  document.getElementById(`t.restante-${tipoOperacion}`).innerHTML = `Tiempo: ${tiempoRestante} segundos`;
}

function btnSumar() {
  mjs_correccion.innerHTML = "";
  activarBoton("suma");
  operacion_actual = "+";
  operacion.innerHTML = " + ";
  
  if (tiempoRestanteSuma === tiempoMaximo) {
    iniciarContadores();
  }

  nuevaSuma();
}

function nuevaSuma() {
  tiempoRestanteSuma = tiempoMaximo;

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
  
  if (tiempoRestanteProducto === tiempoMaximo) {
    iniciarContadores();
  }

  nuevoProducto();
}

function nuevoProducto() {
  tiempoRestanteProducto = tiempoMaximo;

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
  
  if (tiempoRestanteResta === tiempoMaximo) {
    iniciarContadores();
  }

  nuevaResta();
}

function nuevaResta() {
  tiempoRestanteResta = tiempoMaximo;

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
  
  if (tiempoRestanteDivision === tiempoMaximo) {
    iniciarContadores();
  }

  nuevaDivision();
}

function nuevaDivision() {
  tiempoRestanteDivision = tiempoMaximo;
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

  // Revisar si la respuesta es numérica o contiene el signo negativo o punto
  let respuestaUsuario = respuesta_usuario.value.trim();
  if (!isNaN(respuestaUsuario) || respuestaUsuario === '-' || respuestaUsuario === '.') {
    if (parseFloat(respuestaUsuario) === solucion) {
      i.className = "fa-regular fa-face-grin";
      mjs_correccion.appendChild(i);
    } else {
      i.className = "fa-regular fa-face-frown";
      mjs_correccion.appendChild(i);
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

// Llamar a la función para iniciar los contadores al cargar la página
window.onload = function() {
  iniciarContadores();
}
