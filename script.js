//const nome = prompt("Qual seu nome?");
let NumerodeSeleções =0;

function EscolherModelo(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem1.escolhido');

    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;
}

function EscolherGola(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem2.escolhido');

    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;
}

function EscolherTecido(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem3.escolhido');

    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;
}

setInterval(ValidarEncomenda, 2000);

function ValidarEncomenda() {
    const botao = document.querySelector('.botao');
    let input = document.querySelector("input");
    let InputUrlImagem = input.value;

    if(NumerodeSeleções===3 && ChecaImagem(InputUrlImagem)){
        botao.classList.add('clicavel');
        botao.addEventListener('click', ConfirmarEncomenda);
    } else {
        botao.classList.remove('clicavel');
        botao.removeEventListener('click', ConfirmarEncomenda);
    }
}

function ChecaImagem(testarurlink) {
    return (testarurlink.match(/\.(jpeg|jpg|gif|tiff|png)$/) !== null);
}

function ConfirmarEncomenda() {
    alert("Obrigado! Sua encomenda foi confirmada.");
}