const palabras = [
  "cigarrillos" /* 0 - 1 */,
  "gato" /* 1 - 2 */,
  "internet" /* 2 - 3 */,
  "tablet" /* 3 - 4 */,
  "perro" /* 4 - 5 */,
  "estrella" /* 5 - 6*/,
  "pou" /* 6 - 7*/,
];

let palabraOculta = "";
let cantErrores = 0;
let cantAciertos = 0;
let ahorcado = obtenerClass(".container-img img");
const btnJugar = obtenerId("jugar-btn");
const btnLetras = document.querySelectorAll(".container-letras button");
let colorValid = (t) => {
  t.style.borderColor = "rgb(115, 255, 0)";
  t.style.color = "rgb(115, 255, 0)";
};
let colorInvalid = (t) => {
  t.style.borderColor = "rgb(255, 0, 43)";
  t.style.color = "rgb(255, 0, 43)";
};

let resetColor = (t) => {
  if (t.disabled === true) {
    t.style.borderColor = "cornflowerblue";
    t.style.color = "cornflowerblue";
  }
  if (t.disabled === false) {
    t.style.borderColor = "white";
    t.style.color = "#ffd";
  }
};

// console.log(btnJugar);
// reiniciar();
disabled();
function obtenerId(id) {
  return document.getElementById(id);
}
function obtenerClass(clas) {
  return document.querySelector(clas);
}

// Aqui se esta añadiendo el evento del click en jugar
btnJugar.addEventListener("click", jugar);

// Aqui generamos la funcionalidad  y dinamismo del evento
function jugar(event) {
  active();
  btnJugar.classList.remove("button-start-active");
  btnJugar.disabled = true;
  let palabraAdivinar = obtenerClass(".palabra_adivinar");
  palabraAdivinar.innerHTML = "";
  let palabraAzar = Math.floor(Math.random() * palabras.length);
  palabraOculta = palabras[palabraAzar];
  console.log(palabraOculta);
  for (recorrer of palabraOculta) {
    let span = document.createElement("span");
    palabraAdivinar.appendChild(span);
  }
}

// Recorremos nuestros botones de letras y ejecutamos la funcion " clickLetras"
for (let i = 0; i < btnLetras.length; i++) {
  btnLetras[i].addEventListener("click", clickLetras);
}

// Función  ha ejecutar en nuestros botones
function clickLetras(e) {
  // Nos permite ver donde se esta ejecutando la tecla
  let tecla = e.target;
  // console.log(e.target);
  tecla.disabled = true;
  tecla.classList.remove("letra-hover");
  // Asumimos que empieza perdiendo
  let resultado = false;

  // Seleccionamos los spans generados por jugar
  const spans = document.querySelectorAll(".palabra_adivinar span");

  // Creamos 2 variables y las pasamos a minusculas para comparar el contenido
  let contenido = tecla.innerHTML.toLowerCase();
  let letraComparar = palabraOculta.toLowerCase();
  // Empieza el recorrido de comparación
  for (let i = 0; i < letraComparar.length; i++) {
    if (contenido === letraComparar[i]) {
      resultado = true;
      spans[i].innerHTML = contenido;
      cantAciertos++;
      colorValid(tecla);
    }
  }

  if (resultado === false) {
    colorInvalid(tecla);
    cantErrores++;
    let source = `./assets/img/ahorcado${cantErrores}.svg`;
    ahorcado.src = source;
    if (cantErrores === 4) {
      perdiste();
    }
  }
  if (cantAciertos === palabraOculta.length) {
    ganaste();
  }
}

function perdiste() {
  let modal = obtenerClass(".modal");
  modal.classList.toggle("modal-screen", false);

  let imgCambio = `./assets/img/perdiste.gif`;
  let img = obtenerClass(".modal-img img");
  img.src = ` ${imgCambio}`;
  const text = obtenerClass(".text span");
  // console.log(palabraOculta.toLowerCase());
  text.innerHTML = `Perdiste :( La palabra era ${palabraOculta.toLowerCase()}`;
  reiniciar();
}
function ganaste() {
  let modal = obtenerClass(".modal");
  modal.classList.toggle("modal-screen", false);

  let imgCambio = `./assets/img/AmanecerAgradecido.jpg`;
  let img = obtenerClass(".modal-img img");
  img.src = ` ${imgCambio}`;
  const text = obtenerClass(".text span");
  text.innerHTML = `Ganaste!!! eres todo un crack :)`;
  reiniciar();
}
function disabled() {
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = true;
    btnLetras[i].classList.remove("letra-hover");
    resetColor(btnLetras[i]);
  }
  btnJugar.disabled = false;
}

function active() {
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = false;
    btnLetras[i].classList.add("letra-hover");
    resetColor(btnLetras[i]);
  }
}

function reiniciar() {
  let reinicio = obtenerId("re-start");
  let modal = obtenerClass(".modal");
  // modal.classList.toggle("modal-screen");
  reinicio.addEventListener("click", () => {
    modal.classList.toggle("modal-screen", true);
    // console.log(modal.classList.toggle("modal-screen", true));
    cantAciertos = 0;
    cantErrores = 0;
    disabled();
    ahorcado.src = "./assets/img/ahorcado0.svg";
    btnJugar.classList.add("button-start-active");
  });
}
