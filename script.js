document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos HTML
    const rouletteWheel = document.getElementById('roulette-wheel');
    const questionDisplay = document.getElementById('question-display');
    const passButton = document.getElementById('pass-button');
    const matchButton = document.getElementById('match-button');
    const answeredCountSpan = document.getElementById('answered-count');
    const endGameButton = document.getElementById('end-game-button');
    const resultMessage = document.getElementById('result-message');

    // Array de perguntas para o jogo. AGORA COM SUAS PERGUNTAS!
    const questions = [
        "1. Quem notou o outro primeiro?",
        "2. Quem tomou a iniciativa de conversar?",
        "3. Quem tomou a iniciativa do primeiro beijo?",
        "4. Quem se apaixonou primeiro?",
        "5. Quem pediu em namoro?",
        "6. Quem disse “eu te amo” primeiro?",
        "7. Quem começa as discussões?",
        "8. Quem pede desculpas primeiro?",
        "9. Quem sempre pede conselhos?",
        "10. Quem é mais carinhoso?",
        "11. Quem é mais grudento na relação?",
        "12. Quem faz mais as melhores surpresas?",
        "13. E... Quem faz mais surpresas?",
        "14. Quem é mais romântico?",
        "15. Quem dá os melhores presentes?",
        "16. Quem é mais teimoso?",
        "17. Quem é mais dorminhoco?",
        "18. Quem ronca?",
        "19. Que fala dormindo?",
        "20. Quem demora mais para se arrumar?",
        "21. Quem é mais mal-humorado pelas manhãs?",
        "22. Quem é mais “mão de vaca”?",
        "23. Quem é mais ciumento?",
        "24. Quem é mais bagunceiro?",
        "25. Quem é melhor dançarino?",
        "26. Quem é mais preguiçoso?",
        "27. Quem é mais comilão?",
        "28. Quem é mais brincalhão?",
        "29. Quem mais ri de bobeiras?",
        "30. Quem é mais barraqueiro?",
        "31. Quem é 'bom de copo'?",
        "32. Quem conta as melhores piadas?",
        "33. Quem não dispensa uma boa fofoca?",
        "34. Quem tem mais manias esquisitas?",
        "35. Quem gosta mais de bichinhos de estimação?",
        "36. Quem faz mais dramas?",
        "37. Quem era mais protegido pelos pais?",
        "38. Quem brincava mais na rua?",
        "39. Quem era mais bagunceiro na escola?",
        "40. Quem era o preferido dos professores?",
        "41. Quem era bom aluno, o 'nerd'?",
        "42. Quem se machucou mais quando criança?",
        "43. Quem teve catapora quando criança?",
        "44. Quem ficou mais vezes de castigo?",
        "45. Quem teve coleção de coisas esquisitas?",
        "46. Quem gostava mais de desenho animado?",
        "47. Quem deu o primeiro beijo?",
        "48. Quem gosta de filmes de terror?",
        "49. Quem gosta de filmes de comédia romântica?",
        "50. Quem adora fazer maratona de séries?",
        "51. Quem sabe mais sobre decoração de casa?",
        "52. Quem cozinha melhor?",
        "53. Quem gosta mais de ler?",
        "54. Quem entende mais de música?",
        "55. Quem sabe se vestir melhor?",
        "56. Quem sabe dirigir melhor?",
        "57. Quem se esquece de tudo?",
        "58. Quem adora se perfumar?",
        "59. Quem mais propõe fazer exercícios físicos?",
        "60. Quem demora mais para responder mensagens?",
        "61. Quem tem mais mania de limpeza?",
        "62. Quem prefere ficar em casa que sair?",
        "63. Quem gosta mais de pedir fast food?",
        "64. Quem sonhava em se casar?",
        "65. Quem fez o pedido?",
        "66. Quem se estressou mais com a organização?",
        "67. Quem não parava de falar sobre o casamento?",
        "68. Quem está se divertindo mais com o casamento?",
        "69. Quem toma mais a iniciativa na hora do sexo?",
        // Perguntas Picantes
        "70. Quem é mais criativo na cama?",
        "71. Quem é mais barulhento?",
        "72. Quem manda mensagens ousadas?",
        "73. Quem curte lugares diferentes?",
        "74. Quem pode sugerir um vídeo a dois?"
    ];

    let availableQuestions = [...questions]; // Copia todas as perguntas para o pool disponível
    let answeredQuestionsCount = 0; // Contador de perguntas respondidas
    let matchCount = 0; // Contador de "Deu Match"
    let isSpinning = false; // Flag para controlar se a roleta está girando

    // Esconde os botões de opção e o contador no início do jogo
    passButton.style.display = 'none';
    matchButton.style.display = 'none';
    answeredCountSpan.parentElement.style.display = 'none';

    /**
     * Seleciona uma pergunta aleatória do pool de perguntas disponíveis
     * e a remove para evitar repetição na mesma rodada.
     * Se todas as perguntas forem usadas, o pool é reiniciado.
     * @returns {string} A pergunta selecionada.
     */
    function getRandomQuestion() {
        // Se não houver mais perguntas disponíveis, reinicia o pool
        if (availableQuestions.length === 0) {
            availableQuestions = [...questions];
            console.log("Todas as perguntas foram usadas, reiniciando o pool de perguntas.");
        }
        // Seleciona um índice aleatório
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        // Pega a pergunta
        const question = availableQuestions[randomIndex];
        // Remove a pergunta do pool para que não seja repetida
        availableQuestions.splice(randomIndex, 1);
        return question;
    }

    /**
     * Inicia o giro da roleta, exibe a pergunta e mostra os botões de opção.
     * Impede giros múltiplos enquanto a roleta já está girando.
     */
    function spinRoulette() {
        // Não permite girar se já estiver girando ou se não houver mais perguntas
        if (isSpinning || availableQuestions.length === 0) {
            if (availableQuestions.length === 0) {
                displayFinalResult(); // Se não há perguntas, mostra o resultado final
            }
            return;
        }

        isSpinning = true; // Define a flag de giro como true
        resultMessage.style.display = 'none'; // Esconde a mensagem final se estiver visível
        questionDisplay.textContent = "Girando..."; // Mensagem durante o giro
        passButton.style.display = 'none'; // Esconde os botões de opção
        matchButton.style.display = 'none';
        rouletteWheel.classList.add('spinning'); // Adiciona a classe para iniciar a animação

        // Simula o tempo de giro da roleta
        setTimeout(() => {
            rouletteWheel.classList.remove('spinning'); // Remove a classe para parar a animação
            const currentQuestion = getRandomQuestion(); // Pega uma nova pergunta
            questionDisplay.textContent = currentQuestion; // Exibe a pergunta
            passButton.style.display = 'inline-block'; // Mostra os botões de opção
            matchButton.style.display = 'inline-block';
            answeredCountSpan.parentElement.style.display = 'block'; // Mostra o contador de perguntas
            isSpinning = false; // Permite um novo giro
        }, 3000); // A roleta gira por 3 segundos
    }

    /**
     * Lida com a resposta do jogador ("Passa" ou "Deu Match").
     * @param {boolean} isMatch - True se "Deu Match", false se "Passa".
     */
    function handleAnswer(isMatch) {
        if (isSpinning) return; // Não permite responder enquanto a roleta está girando

        answeredQuestionsCount++; // Incrementa o contador de perguntas respondidas
        answeredCountSpan.textContent = answeredQuestionsCount; // Atualiza o display

        if (isMatch) {
            matchCount++; // Incrementa o contador de "Deu Match"
        }

        // Verifica se ainda há perguntas a serem respondidas
        if (answeredQuestionsCount < questions.length) {
            spinRoulette(); // Gira para a próxima pergunta
        } else {
            displayFinalResult(); // Se todas as perguntas foram respondidas, exibe o resultado final
        }
    }

    /**
     * Exibe a mensagem de resultado final do jogo.
     */
    function displayFinalResult() {
        // Esconde os elementos do jogo
        passButton.style.display = 'none';
        matchButton.style.display = 'none';
        rouletteWheel.style.display = 'none';
        endGameButton.style.display = 'none';
        questionDisplay.style.display = 'none';
        answeredCountSpan.parentElement.style.display = 'none';

        const percentageMatch = (matchCount / (answeredQuestionsCount || 1)) * 100; // Calcula a porcentagem de match
        let message = "";

        // Define a mensagem final com base na porcentagem de "Deu Match"
        if (percentageMatch > 50) {
            message = "Parabéns casal, vocês estão em sintonia!";
        } else {
            message = "Que divertido! Continuem se conhecendo! 😉";
        }
        
        resultMessage.textContent = message; // Define o texto da mensagem
        resultMessage.style.display = 'block'; // Mostra a mensagem final
    }

    // --- Listeners de Eventos ---
    // Inicia o giro da roleta ao clicar no container da roleta
    rouletteWheel.addEventListener('click', spinRoulette);
    // Lida com a resposta "Passa"
    passButton.addEventListener('click', () => handleAnswer(false));
    // Lida com a resposta "Deu Match"
    matchButton.addEventListener('click', () => handleAnswer(true));
    // Encerra o jogo ao clicar no botão "Encerrar Jogo"
    endGameButton.addEventListener('click', displayFinalResult);
});
