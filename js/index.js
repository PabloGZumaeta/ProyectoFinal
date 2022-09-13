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

console.log(btnJugar);
// reiniciar();
disabled();
function obtenerId(id) {
  return document.getElementById(id);
}
function obtenerClass(clas) {
  return document.querySelector(clas);
}

btnJugar.addEventListener("click", jugar);

function jugar(event) {
  // ahorcado.src = "./assets/img/ahorcado0.svg";
  // reiniciar();
  active();
  btnJugar.classList.remove("button-start-active");
  btnJugar.disabled = true;
  let palabraAdivinar = obtenerClass(".palabra_adivinar");
  palabraAdivinar.innerHTML = "";
  let palabraAzar = Math.floor(Math.random() * palabras.length);
  palabraOculta = palabras[palabraAzar];
  // console.log(palabraOculta);
  for (recorrer of palabraOculta) {
    let span = document.createElement("span");
    palabraAdivinar.appendChild(span);
    console.log(palabraOculta);
  }
}

for (let i = 0; i < btnLetras.length; i++) {
  btnLetras[i].addEventListener("click", clickLetras);
}

function clickLetras(e) {
  let tecla = e.target;
  console.log(tecla);
  tecla.disabled = true;
  tecla.classList.remove("letra-hover");
  let resultado = false;

  const spans = document.querySelectorAll(".palabra_adivinar span");

  let contenido = tecla.innerHTML.toLowerCase();
  let letraComparar = palabraOculta.toLowerCase();
  for (let i = 0; i < letraComparar.length; i++) {
    if (contenido === letraComparar[i]) {
      resultado = true;
      console.log(
        `La letra "${contenido}" se encuentra en ${letraComparar} eso la hace ${resultado}`
      );
      spans[i].innerHTML = contenido;
      cantAciertos++;
    }
  }

  if (resultado === false) {
    cantErrores++;
    let source = `./assets/img/ahorcado${cantErrores}.svg`;
    ahorcado.src = source;
    if (cantErrores === 4) {
      perdiste();
      console.log(cantErrores);
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
  const btnLetras = document.querySelectorAll(".container-letras button");
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = true;
    btnLetras[i].classList.remove("letra-hover");
  }
  btnJugar.disabled = false;
}

function active() {
  const btnLetras = document.querySelectorAll(".container-letras button");
  for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = false;
    btnLetras[i].classList.add("letra-hover");
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
  });
}
