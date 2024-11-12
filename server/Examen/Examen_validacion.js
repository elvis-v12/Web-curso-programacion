function submitQuiz() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    let score = 0;

    // Respuestas correctas
    const correctAnswers = {
        q1: 'b',
        q2: 'b',
        q3: 'b',
        q4: 'c',
        q5: 'b'
    };

    // Verificar respuestas
    formData.forEach((value, key) => {
        if (value === correctAnswers[key]) {
            score++;
        }
    });

    // Mostrar el resultado
    alert(`Tu puntuación es: ${score} de 5`);
}