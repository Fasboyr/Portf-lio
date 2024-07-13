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
    document.getElementById('hora-atual').textContent = `Hora atual (${fusoSelecionado}): ${horaAtual}`;
}

// Adicionar um listener de evento para capturar mudanças na seleção
document.getElementById('select-fusos').addEventListener('change', atualizarHora);

// Chamar a função inicialmente para exibir a mensagem de seleção
atualizarHora();



