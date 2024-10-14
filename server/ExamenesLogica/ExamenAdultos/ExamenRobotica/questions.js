let questions = [
  {
    numb: 1,
    question:
      "¿Qué función se usa en Arduino para configurar la velocidad de comunicación con el puerto serial?",
    answer: "Serial.begin()",
    options: [
      "Serial.print()",
      "Serial.begin()",
      "Serial.start()",
      "Serial.connect()",
    ],
  },
  {
    numb: 2,
    question:
      "¿Qué función en Arduino se ejecuta continuamente después de 'setup()'?",
    answer: "loop()",
    options: ["setup()", "loop()", "run()", "start()"],
  },
  {
    numb: 3,
    question: "¿Qué tipo de señal es enviada por un pin analógico en Arduino?",
    answer: "Una señal analógica simulada con PWM",
    options: [
      "Una señal digital",
      "Una señal analógica pura",
      "Una señal analógica simulada con PWM",
      "Una señal de frecuencia variable",
    ],
  },
  {
    numb: 4,
    question: "¿Qué función se usa para leer el estado de un pin digital?",
    answer: "digitalRead()",
    options: ["digitalRead()", "analogRead()", "digitalWrite()", "pinMode()"],
  },
  {
    numb: 5,
    question: "¿Cómo configuras un pin en Arduino como salida?",
    answer: "Usando pinMode()",
    options: [
      "Usando pinMode()",
      "Usando setPin()",
      "Usando outputPin()",
      "Usando setMode()",
    ],
  },
  {
    numb: 6,
    question:
      "¿Qué función en Arduino devuelve el tiempo transcurrido desde que se inició el programa?",
    answer: "millis()",
    options: ["time()", "millis()", "delay()", "microtime()"],
  },
  {
    numb: 7,
    question:
      "¿Qué valor debes escribir en un pin de salida para apagar un LED?",
    answer: "LOW",
    options: ["HIGH", "LOW", "OFF", "0"],
  },
  {
    numb: 8,
    question:
      "¿Cómo se puede controlar la velocidad de un motor usando Arduino?",
    answer: "Usando una señal PWM",
    options: [
      "Usando una señal analógica",
      "Usando una señal digital",
      "Usando una señal PWM",
      "Usando un potenciómetro",
    ],
  },
  {
    numb: 9,
    question: "¿Qué es un sensor ultrasónico en Arduino?",
    answer: "Un sensor que mide distancias usando ondas de sonido",
    options: [
      "Un sensor que mide distancias usando ondas de sonido",
      "Un sensor que detecta luz",
      "Un sensor que mide temperatura",
      "Un sensor que detecta color",
    ],
  },
  {
    numb: 10,
    question: "¿Qué significa el comando 'delay(1000)' en Arduino?",
    answer: "Pausa el programa durante 1 segundo",
    options: [
      "Detiene el programa durante 1000 milisegundos",
      "Detiene el programa durante 1 segundo",
      "Espera hasta que el pin digital cambie de estado",
      "Espera hasta que el valor analógico cambie",
    ],
  },
];
