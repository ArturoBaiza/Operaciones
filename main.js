// Mostrar resultados finales y ocultar el contenido relacionado con los problemas
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

// Función para agregar números y operadores al input de respuesta
function addNumToInput(num) {
  document.getElementById("respuesta_usuario").value += num;
}

// Función para limpiar el input de respuesta
function clearInput() {
  document.getElementById("respuesta_usuario").value = "";
}

// Función para eliminar el último carácter del input de respuesta
function backspaceInput() {
  let input = document.getElementById("respuesta_usuario");
  input.value = input.value.slice(0, -1);
}

// Escuchar el evento de teclado para enviar la respuesta al presionar Enter
document.getElementById("respuesta_usuario").onkeydown = function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Evitar el comportamiento por defecto del Enter (submit)
    enviar(); // Llamar a la función enviar() cuando se presione Enter
  }
};
