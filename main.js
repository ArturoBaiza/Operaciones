let n1, n2;
let operacion_actual = "";
let problemasSuma = 0;
let problemasResta = 0;
let problemasProducto = 0;
let problemasDivision = 0;
let correctasSuma = 0;
let correctasResta = 0;
let correctasProducto = 0;
let correctasDivision = 0;

function btnSumar() {
  if (problemasSuma < 5) {
    mjs_correccion.innerHTML = "";
    activarBoton("suma");
    operacion_actual = "+";

    operacion.innerHTML = " + ";

    nuevaSuma();
    problemasSuma++;

    if (problemasSuma === 5) {
      completarSeccion("suma");
    }
  }
}

function nuevaSuma() {
  n1 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000
  n2 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnProducto() {
  if (problemasProducto < 5) {
    mjs_correccion.innerHTML = "";
    activarBoton("producto");
    operacion_actual = "*";

    operacion.innerHTML = " x ";

    nuevoProducto();
    problemasProducto++;

    if (problemasProducto === 5) {
      completarSeccion("producto");
    }
  }
}

function nuevoProducto() {
  n1 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000
  n2 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnResta() {
  if (problemasResta < 5) {
    mjs_correccion.innerHTML = "";
    activarBoton("resta");
    operacion_actual = "-";

    operacion.innerHTML = " - ";

    nuevaResta();
    problemasResta++;

    if (problemasResta === 5) {
      completarSeccion("resta");
    }
  }
}

function nuevaResta() {
  n1 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000
  n2 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000

  // Asegurarse de que n1 sea mayor o igual que n2 para evitar resultados negativos
  if (n1 < n2) {
    let temp = n1;
    n1 = n2;
    n2 = temp;
  }

  num1.innerHTML = n1;
  num2.innerHTML = n2;

  respuesta_usuario.focus();
}

function btnDivision() {
  if (problemasDivision < 5) {
    mjs_correccion.innerHTML = "";
    activarBoton("division");
    operacion_actual = "/";

    operacion.innerHTML = " / ";

    nuevaDivision();
    problemasDivision++;

    if (problemasDivision === 5) {
      completarSeccion("division");
    }
  }
}

function nuevaDivision() {
  let divisores = [];

  n1 = Math.floor(Math.random() * 1000) + 1;  // Número entre 1 y 1000

  for (let i = 1; i <= n1; i++) {
    if (n1 % i === 0) {
      divisores.push(i);
    }
  }

  let pos = Math.floor(Math.random() * divisores.length);
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
    }
  } else {
    // Respuesta no válida
    i.className = "fa-regular fa-face-frown";
    mjs_correccion.appendChild(i);
  }

  // Verificar si se han completado todas las operaciones
  if (problemasSuma === 5 && problemasResta === 5 && problemasProducto === 5 && problemasDivision === 5) {
    mostrarResultadosFinales();
  } else {
    // Cambiar automáticamente el problema
    cambiarProblema();
    respuesta_usuario.value = "";
  }
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

function activarBoton(idBoton) {
  // Eliminar la clase 'activado' de todos los botones
  document.getElementById("suma").classList.remove("activado");
  document.getElementById("resta").classList.remove("activado");
  document.getElementById("producto").classList.remove("activado");
  document.getElementById("division").classList.remove("activado");

  // Agregar la clase 'activado' solo al botón seleccionado
  document.getElementById(idBoton).classList.add("activado");
}

function completarSeccion(tipo) {
  let mensaje = document.createElement("p");
  mensaje.textContent = `Completaste la sección de ${tipo}.`;
  mjs_correccion.appendChild(mensaje);

  // Desactivar solo la generación de más problemas para este tipo de operación
  if (tipo === "suma") {
    problemasSuma = 5;
  } else if (tipo === "resta") {
    problemasResta = 5;
  } else if (tipo === "producto") {
    problemasProducto = 5;
  } else if (tipo === "division") {
    problemasDivision = 5;
  }
}

function mostrarResultadosFinales() {
  // Ocultar secciones de problemas y botones
  document.querySelector(".container-operadores").style.display = "none";
  document.querySelector(".container-operacion").style.display = "none";
  document.getElementById("corregir").style.display = "none";
  document.getElementById("cambiar").style.display = "none";

  // Mostrar resultados finales
  let resultados = document.createElement("div");
  resultados.classList.add("resultados-finales");

  let tituloResultados = document.createElement("h3");
  tituloResultados.textContent = "Resultados Finales";
  resultados.appendChild(tituloResultados);

  let resultadosSuma = document.createElement("p");
  resultadosSuma.textContent = `Suma: ${correctasSuma} correctas de 5`;
  resultados.appendChild(resultadosSuma);

  let resultadosResta = document.createElement("p");
  resultadosResta.textContent = `Resta: ${correctasResta} correctas de 5`;
  resultados.appendChild(resultadosResta);

  let resultadosProducto = document.createElement("p");
  resultadosProducto.textContent = `Multiplicación: ${correctasProducto} correctas de 5`;
  resultados.appendChild(resultadosProducto);

  let resultadosDivision = document.createElement("p");
  resultadosDivision.textContent = `División: ${correctasDivision} correctas de 5`;
  resultados.appendChild(resultadosDivision);

  document.body.appendChild(resultados);
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
