let nome = prompt("Qual seu nome?");
let model, neck, material, image, owner, author;
let NumerodeSeleções =0;


Promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
Promessa.then(ColocarUltimosPedidos);


function ColocarUltimosPedidos(resposta) {
    let UltimosPedidos = resposta.data;
    console.log(UltimosPedidos);
    const ConteinerdeUltimosPedidos = document.querySelector(".conteiner-de-pedidos");

    for(let i=0; i<UltimosPedidos.length; i++){
        ConteinerdeUltimosPedidos.innerHTML += `
        <div class="bloco-pedido"><img class="img-pedido" src=${UltimosPedidos[i].image}><h4><span>Criador: </span>${UltimosPedidos[i].owner}</h4><div>
        `;
    }
}

function EscolherModelo(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem1.escolhido');
    
    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;

    if(blococlicadoagora.classList.contains("t-shirt")){
        modelo = "t-shirt";
    } else if(blococlicadoagora.classList.contains("top-tank")){
        modelo = "top-tank";
    } else if(blococlicadoagora.classList.contains("long")){
        modelo = "long";
    }
}

function EscolherGola(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem2.escolhido');

    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;

    if(blococlicadoagora.classList.contains("v-neck")){
        pescoço = "v-neck";
    } else if(blococlicadoagora.classList.contains("round")){
        pescoço = "round";
    } else if(blococlicadoagora.classList.contains("polo")){
        pescoço = "polo";
    }
}

function EscolherTecido(blococlicadoagora) {
    const BlocoJaSelecionado = document.querySelector('.bloco-imagem3.escolhido');
    
    if (BlocoJaSelecionado !== null){
        BlocoJaSelecionado.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;

    if(blococlicadoagora.classList.contains("silk")){
        tipoMaterial = "silk";
    } else if(blococlicadoagora.classList.contains("cotton")){
        tipoMaterial = "cotton";
    } else if(blococlicadoagora.classList.contains("polyester")){
        tipoMaterial = "polyester";
    }
}

setInterval(ValidarEncomenda, 2000);

function ValidarEncomenda() {
    const botao = document.querySelector('.botao');
    let input = document.querySelector("input");
    let InputUrlImagem = input.value;

    if(NumerodeSeleções===3 && ChecaImagem(InputUrlImagem)){
        botao.classList.add('clicavel');
        botao.addEventListener('click', ProcessarEncomenda);
        Imagem = InputUrlImagem;
    } else {
        botao.classList.remove('clicavel');
        botao.removeEventListener('click', ProcessarEncomenda);
    }
}

function ChecaImagem(testarurlink) {
    return (testarurlink.match(/\.(jpeg|jpg|gif|tiff|png)$/) !== null);
}

function ProcessarEncomenda() {
    alert("Sua encomenda está sendo Processada.");

    Objeto = {
        model: modelo,
        neck: pescoço,
        material: tipoMaterial,
        image: Imagem,
        owner: nome,
        author: nome
    }
    console.log(Objeto);

    const PromessaEnvio = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', Objeto);
    PromessaEnvio.then(ConfirmarEncomenda);
    PromessaEnvio.catch(TratarErro);

    function TratarErro(Erro){
        console.log(Erro.data);
        alert("Ops, não conseguimos processar sua encomenda");
    }
    function ConfirmarEncomenda(resposta) {
        console.log(resposta.data);
        alert("Obrigado! Sua encomenda foi Confirmada!!!")
    }
}