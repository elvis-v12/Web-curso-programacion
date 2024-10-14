// seleccionando todos los elementos requeridos
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // mostrar caja de información
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // esconder caja de información
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // esconder caja de información
  quiz_box.classList.add("activeQuiz"); // mostrar caja del quiz
  showQuestions(0); // mostrar primera pregunta
  queCounter(1); // iniciar contador de preguntas
  startTimer(20); // iniciar temporizador
  startTimerLine(0); // iniciar línea de temporizador
};

let timeValue = 20; // Tiempo para cada pregunta
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // mostrar caja del quiz
  result_box.classList.remove("activeResult"); // esconder caja de resultados
  resetQuiz(); // reiniciar quiz
};

quit_quiz.onclick = () => {
  window.location.reload(); // recargar ventana
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    // si hay más preguntas
    que_count++; // siguiente pregunta
    que_numb++; // incrementar número de pregunta
    showQuestions(que_count); // mostrar siguiente pregunta
    queCounter(que_numb); // actualizar contador de preguntas
    next_btn.classList.remove("show"); // ocultar botón de siguiente
  } else {
    clearInterval(counter); // detener contador
    clearInterval(counterLine); // detener línea de contador
    showResult(); // mostrar resultados
  }
};

function resetQuiz() {
  timeValue = 20;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(que_count); // mostrar primera pregunta
  queCounter(que_numb); // iniciar contador de preguntas
  clearInterval(counter); // limpiar contador
  clearInterval(counterLine); // limpiar línea de contador
  startTimer(timeValue); // reiniciar temporizador
  startTimerLine(widthValue); // reiniciar línea de temporizador
  timeText.textContent = "Tiempo Faltante"; // cambiar texto a Tiempo Faltante
  next_btn.classList.remove("show"); // ocultar botón de siguiente
}

// Función para mostrar preguntas y opciones
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let option_tag = questions[index].options
    .map((option) => `<div class="option"><span>${option}</span></div>`)
    .join("");
  que_text.innerHTML = que_tag; // agregar pregunta
  option_list.innerHTML = option_tag; // agregar opciones

  const option = option_list.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.setAttribute("onclick", "optionSelected(this)"); // agregar evento a opciones
  });
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  let userAns = answer.textContent; // opción seleccionada
  let correcAns = questions[que_count].answer; // respuesta correcta
  const allOptions = option_list.children.length; // total de opciones

  if (userAns == correcAns) {
    userScore += 1; // aumentar puntuación
    answer.classList.add("correct"); // marcar respuesta correcta
    answer.insertAdjacentHTML("beforeend", tickIconTag); // agregar icono de check
  } else {
    answer.classList.add("incorrect"); // marcar respuesta incorrecta
    answer.insertAdjacentHTML("beforeend", crossIconTag); // agregar icono de cruz
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct"); // marcar opción correcta
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // agregar icono de check
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); // deshabilitar opciones
  }
  next_btn.classList.add("show"); // mostrar botón de siguiente
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; // actualizar tiempo
    time--; // decrementar tiempo
    if (time < 0) {
      // si se agota el tiempo
      clearInterval(counter); // detener contador
      clearInterval(counterLine); // detener línea de contador
      timeText.textContent = "Finalizó Tiempo"; // mostrar mensaje de tiempo agotado
      quiz_box.classList.remove("activeQuiz"); // ocultar quiz
      result_box.classList.add("activeResult"); // mostrar resultados
      showResult(); // llamar función para mostrar resultados
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; // aumentar el tiempo
    time_line.style.width = time + "px"; // aumentar el ancho de la línea
    if (time > 549) {
      // si la línea supera el límite
      clearInterval(counterLine); // detener línea de contador
    }
  }
}

function showResult() {
  info_box.classList.remove("activeInfo"); // ocultar información
  quiz_box.classList.remove("activeQuiz"); // ocultar quiz
  result_box.classList.add("activeResult"); // mostrar resultados
  const scoreText = result_box.querySelector(".score_text");
  let scoreTag;

  if (userScore > 3) {
    scoreTag = `<span>Felicitaciones! 🎉, Conseguiste <p>${userScore}</p> de <p>${questions.length}</p></span>`;
  } else if (userScore > 1) {
    scoreTag = `<span>Que bien 😎, Conseguiste <p>${userScore}</p> de <p>${questions.length}</p></span>`;
  } else {
    scoreTag = `<span>Lo siento 😐, Solo conseguiste <p>${userScore}</p> de <p>${questions.length}</p></span>`;
  }
  scoreText.innerHTML = scoreTag; // mostrar puntuación
}

function queCounter(index) {
  let totalQueCountTag = `<span><p>${index}</p> de <p>${questions.length}</p> Preguntas</span>`;
  bottom_ques_counter.innerHTML = totalQueCountTag; // mostrar contador de preguntas
}
