// Seleccionando todos los elementos necesarios
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
  info_box.classList.add("activeInfo"); // Mostrar la caja con las instrucciones
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Esconder la caja con las instrucciones
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Esconder la caja con las instrucciones
  quiz_box.classList.add("activeQuiz"); // Mostrar la caja del quiz
  showQuestions(0); // Mostrar la primera pregunta
  queCounter(1); // Iniciar el contador de preguntas
  startTimer(20); // Iniciar el temporizador
  startTimerLine(0); // Iniciar la barra de tiempo
};

let timeValue = 20; // Tiempo por pregunta
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // Mostrar la caja del quiz
  result_box.classList.remove("activeResult"); // Esconder la caja de resultados
  resetQuiz(); // Reiniciar el quiz
};

quit_quiz.onclick = () => {
  window.location.reload(); // Recargar la página
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    // Si hay más preguntas
    que_count++; // Pasar a la siguiente pregunta
    que_numb++; // Incrementar el número de pregunta
    showQuestions(que_count); // Mostrar la siguiente pregunta
    queCounter(que_numb); // Actualizar el contador de preguntas
    next_btn.classList.remove("show"); // Esconder el botón de siguiente
  } else {
    clearInterval(counter); // Detener el temporizador
    clearInterval(counterLine); // Detener la barra de tiempo
    showResult(); // Mostrar los resultados
  }
};

function resetQuiz() {
  timeValue = 20;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(que_count); // Mostrar la primera pregunta
  queCounter(que_numb); // Reiniciar el contador de preguntas
  clearInterval(counter); // Limpiar el temporizador
  clearInterval(counterLine); // Limpiar la barra de tiempo
  startTimer(timeValue); // Reiniciar el temporizador
  startTimerLine(widthValue); // Reiniciar la barra de tiempo
  timeText.textContent = "Tiempo Restante"; // Actualizar el texto de tiempo
  next_btn.classList.remove("show"); // Esconder el botón de siguiente
}

// Función para mostrar preguntas y opciones
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let option_tag = questions[index].options
    .map((option) => `<div class="option"><span>${option}</span></div>`)
    .join("");
  que_text.innerHTML = que_tag; // Mostrar la pregunta
  option_list.innerHTML = option_tag; // Mostrar las opciones

  const option = option_list.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.setAttribute("onclick", "optionSelected(this)"); // Agregar evento a cada opción
  });
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  let userAns = answer.textContent; // Obtener la opción seleccionada
  let correcAns = questions[que_count].answer; // Obtener la respuesta correcta
  const allOptions = option_list.children.length; // Número total de opciones

  if (userAns == correcAns) {
    userScore += 1; // Aumentar la puntuación
    answer.classList.add("correct"); // Marcar la respuesta correcta
    answer.insertAdjacentHTML("beforeend", tickIconTag); // Añadir el icono de check
  } else {
    answer.classList.add("incorrect"); // Marcar la respuesta incorrecta
    answer.insertAdjacentHTML("beforeend", crossIconTag); // Añadir el icono de cruz
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct"); // Marcar la respuesta correcta
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Añadir el icono de check
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); // Desactivar todas las opciones
  }
  next_btn.classList.add("show"); // Mostrar el botón de siguiente
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; // Mostrar el tiempo restante
    time--; // Disminuir el tiempo
    if (time < 0) {
      // Si se acaba el tiempo
      clearInterval(counter); // Detener el temporizador
      clearInterval(counterLine); // Detener la barra de tiempo
      timeText.textContent = "Se acabó el tiempo"; // Mostrar mensaje de tiempo agotado
      quiz_box.classList.remove("activeQuiz"); // Esconder la caja del quiz
      result_box.classList.add("activeResult"); // Mostrar los resultados
      showResult(); // Llamar a la función para mostrar los resultados
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; // Aumentar el tiempo
    time_line.style.width = time + "px"; // Aumentar el ancho de la barra de tiempo
    if (time > 549) {
      // Si la barra de tiempo supera el límite
      clearInterval(counterLine); // Detener la barra de tiempo
    }
  }
}

function showResult() {
  info_box.classList.remove("activeInfo"); // Esconder la caja con las instrucciones
  quiz_box.classList.remove("activeQuiz"); // Esconder la caja del quiz
  result_box.classList.add("activeResult"); // Mostrar la caja de resultados
  const scoreText = result_box.querySelector(".score_text");
  let scoreTag;

  if (userScore > 3) {
    scoreTag = `<span>¡Felicitaciones! 🎉 Conseguíste <p>${userScore}</p> de <p>${questions.length}</p> preguntas.</span>`;
  } else if (userScore > 1) {
    scoreTag = `<span>¡Bien hecho! 😎 Conseguíste <p>${userScore}</p> de <p>${questions.length}</p> preguntas.</span>`;
  } else {
    scoreTag = `<span>Lo siento 😐. Solo conseguiste <p>${userScore}</p> de <p>${questions.length}</p> preguntas.</span>`;
  }
  scoreText.innerHTML = scoreTag; // Mostrar la puntuación final
}

function queCounter(index) {
  let totalQueCountTag = `<span><p>${index}</p> de <p>${questions.length}</p> preguntas</span>`;
  bottom_ques_counter.innerHTML = totalQueCountTag; // Mostrar el número de pregunta actual
}
