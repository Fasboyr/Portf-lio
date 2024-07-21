function alterarTema() {
    const tema = document.body.getAttribute("data-theme");
    const temaNovo = tema == 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', temaNovo);
}


function copiarConteudo(input) {
    const conteudo = document.getElementById(input).value;
    navigator.clipboard.writeText(conteudo).then(() => {
        alert("Conteúdo Copiado");
    }).catch(err => {
        alert("Erro ao copiar conteúdo!");
    });
}

//--------------------------------------------------------------------

document.getElementById('translation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const text = document.getElementById('text').value;
    const translationType = document.getElementById('translation-type').value;
    const resultDiv = document.getElementById('result');

    // Fun Translations API endpoint
    const apiUrl = `https://api.funtranslations.com/translate/${translationType}.json?text=${encodeURIComponent(text)}`;

    // Fetch API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.contents && data.contents.translated) {
                resultDiv.textContent = `Texto Estilizado: ${data.contents.translated}`;
            } else {
                resultDiv.textContent = 'Erro: Não foi possível traduzir o texto.';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            resultDiv.textContent = 'Erro: Não foi possível traduzir o texto.';
        });
});

//---------------------------------------------------------------------

function atualizarHora() {
    // Obter o elemento select e o valor selecionado
    let selectFusos = document.getElementById('select-fusos');
    let fusoSelecionado = selectFusos.value;

    // Se nenhum fuso horário foi selecionado (opção em branco)
    if (!fusoSelecionado) {
        document.getElementById('hora-atual').textContent = 'Selecione um fuso horário acima.';
        return;
    }

    // Definir opções para formatação da hora
    let options = {
        timeZone: fusoSelecionado,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    // Obter a hora atual no fuso horário selecionado
    let horaAtual = new Date().toLocaleTimeString('pt-BR', options);

    // Exibir a hora na página HTML
    document.getElementById('hora-atual').textContent = `Horario atual no fuso selecionado: ${horaAtual}`;
}

// Adicionar um listener de evento para capturar mudanças na seleção
document.getElementById('select-fusos').addEventListener('change', atualizarHora);

// Chamar a função inicialmente para exibir a mensagem de seleção
atualizarHora();

//-----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    // Função para obter uma pergunta da API
    function getQuestion() {
        fetch('https://opentdb.com/api.php?amount=1&type=multiple&language=pt')
            .then(response => response.json())
            .then(data => {
                displayQuestion(data.results[0]);
            })
            .catch(error => console.error('Erro:', error));
    }

    // Função para exibir a pergunta e as opções
    function displayQuestion(data) {
        questionElement.innerHTML = decodeHtml(data.question); // Decodifica o HTML da pergunta
        optionsElement.innerHTML = '';

        // Mistura e exibe as opções
        const options = [...data.incorrect_answers, data.correct_answer];
        shuffle(options).forEach(option => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = decodeHtml(option); // Decodifica o HTML das opções
            button.onclick = () => handleAnswer(option, data.correct_answer);
            optionsElement.appendChild(button);
        });
    }

    // Função para lidar com a resposta do usuário
    function handleAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            alert('Correto!');
            getQuestion(); // Carrega uma nova pergunta
        } else {
            alert('Incorreto! Tente novamente.');
        }
    }

    // Função para embaralhar um array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Função para decodificar HTML
    function decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    // Inicializa o quiz
    getQuestion();
});


//------------------------------------------------------------

function fetchJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any')
        .then(response => response.json())
        .then(data => {
            let jokeText = '';

            // Verifica o tipo da piada e a formata corretamente
            if (data.type === 'single') {
                // Piada de uma linha
                jokeText = data.joke;
            } else if (data.type === 'twopart') {
                // Piada com pergunta e resposta
                jokeText = `${data.setup} <br><strong>${data.delivery}</strong>`;
            } else {
                jokeText = 'Desculpe, não consegui obter uma piada no momento.';
            }

            // Atualiza o conteúdo da div com a piada
            document.getElementById('joke').innerHTML = jokeText;
        })
        .catch(error => {
            console.error('Erro ao obter piada:', error);
            document.getElementById('joke').innerHTML = 'Desculpe, houve um erro ao obter a piada.';
        });
}


