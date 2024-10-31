let sqlQuestions = [
  {
    numb: 1,
    question: "¿Cómo seleccionas todos los campos de una tabla en SQL?",
    answer: "SELECT * FROM table_name",
    options: [
      "SELECT * FROM table_name",
      "GET * FROM table_name",
      "CHOOSE * FROM table_name",
      "PICK * FROM table_name",
    ],
  },
  {
    numb: 2,
    question: "¿Cómo filtras los resultados en SQL?",
    answer: "Usando WHERE",
    options: ["Usando LIMIT", "Usando WHERE", "Usando FILTER", "Usando SELECT"],
  },
  {
    numb: 3,
    question: "¿Cómo actualizas datos en una tabla SQL?",
    answer: "UPDATE table_name SET column=value WHERE condition",
    options: [
      "MODIFY table_name SET column=value WHERE condition",
      "UPDATE table_name SET column=value WHERE condition",
      "CHANGE table_name SET column=value WHERE condition",
      "SET table_name column=value WHERE condition",
    ],
  },
  {
    numb: 4,
    question: "¿Cómo eliminas una tabla completa en SQL?",
    answer: "DROP TABLE table_name",
    options: [
      "DELETE TABLE table_name",
      "REMOVE TABLE table_name",
      "DROP TABLE table_name",
      "CLEAR TABLE table_name",
    ],
  },
  {
    numb: 5,
    question: "¿Qué significa 'JOIN' en SQL?",
    answer:
      "Combinar filas de dos o más tablas basadas en una relación entre las columnas",
    options: [
      "Seleccionar datos de múltiples tablas",
      "Crear una tabla nueva",
      "Eliminar tablas relacionadas",
      "Combinar filas de dos o más tablas basadas en una relación entre las columnas",
    ],
  },
  {
    numb: 6,
    question: "¿Cómo insertas un nuevo registro en una tabla?",
    answer: "INSERT INTO table_name (column1, column2) VALUES (value1, value2)",
    options: [
      "INSERT INTO table_name VALUES ()",
      "ADD TO table_name VALUES ()",
      "INSERT INTO table_name (column1, column2) VALUES (value1, value2)",
      "NEW RECORD INTO table_name VALUES ()",
    ],
  },
  {
    numb: 7,
    question: "¿Cómo se elimina un registro específico en una tabla?",
    answer: "DELETE FROM table_name WHERE condition",
    options: [
      "REMOVE FROM table_name WHERE condition",
      "DELETE FROM table_name WHERE condition",
      "DELETE * FROM table_name",
      "ERASE FROM table_name WHERE condition",
    ],
  },
  {
    numb: 8,
    question: "¿Cómo limitas el número de filas devueltas por una consulta?",
    answer: "Usando LIMIT",
    options: ["Usando WHERE", "Usando LIMIT", "Usando TOP", "Usando OFFSET"],
  },
  {
    numb: 9,
    question: "¿Qué comando se utiliza para crear una nueva tabla en SQL?",
    answer: "CREATE TABLE",
    options: ["CREATE TABLE", "ADD TABLE", "NEW TABLE", "MAKE TABLE"],
  },
  {
    numb: 10,
    question:
      "¿Qué tipo de 'JOIN' devuelve todas las filas cuando hay una coincidencia en una de las tablas?",
    answer: "INNER JOIN",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
  },
];
