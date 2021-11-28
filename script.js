let nome = prompt("Qual seu nome?");
let model, neck, material, image, owner, author, IndiceEncomendaRecente, ObjetoEncomendaRecente;
let NumerodeSeleções = 0;

function ChamarServidor() {
let Promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
Promessa.then(ColocarUltimosPedidos);
}
ChamarServidor();

function ColocarUltimosPedidos(resposta) {
    let UltimosPedidos = resposta.data;
    const ConteinerdeUltimosPedidos = document.querySelector(".conteiner-de-pedidos");

    for(let i=0; i<UltimosPedidos.length; i++){
        ConteinerdeUltimosPedidos.innerHTML += `
        <div class="bloco-pedido" onclick="RequerirConfirmação(${i})">
        <img class="img-pedido" src=${UltimosPedidos[i].image}><h4>
        <span>Criador: </span>${UltimosPedidos[i].owner}</h4><div>
        `;
    }
}

function RequerirConfirmação(numerorecebido) {
    let ConfirmacaoEncomenda = window.confirm("Confirma o pedido de uma encomenda via Últimos Pedidos?");
    IndiceEncomendaRecente = numerorecebido;

    if (ConfirmacaoEncomenda){        
        let PromessaEncomendaRecente = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
        PromessaEncomendaRecente.then(EncomendarPedidoRecentes);
    }
}
function EncomendarPedidoRecentes(Resposta){
    const itens = Resposta.data;
    ObjetoEncomendaRecente = {
        model: itens[IndiceEncomendaRecente].model,
        neck: itens[IndiceEncomendaRecente].neck,
        material: itens[IndiceEncomendaRecente].material,
        image: itens[IndiceEncomendaRecente].image,
        owner: itens[IndiceEncomendaRecente].owner,
        author: itens[IndiceEncomendaRecente].owner
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
    ObjetoEncomendaRecente = undefined;

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
    ObjetoEncomendaRecente = undefined;

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
    ObjetoEncomendaRecente = undefined;

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

    if((NumerodeSeleções===3 && ChecaImagem(InputUrlImagem)) || ObjetoEncomendaRecente !== undefined){
        botao.classList.add('clicavel');
        botao.addEventListener('click', ProcessarEncomenda);
        Imagem = InputUrlImagem;
    } else {
        botao.classList.remove('clicavel');
        botao.removeEventListener('click', ProcessarEncomenda);
    }
}

function ProcessarEncomenda() {
    alert("Sua encomenda está sendo Processada.");
    
    if(ObjetoEncomendaRecente !== undefined){
        let PromessaEnvio = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', ObjetoEncomendaRecente);
        PromessaEnvio.then(ConfirmarEncomenda);
        PromessaEnvio.catch(TratarErro);
    } else {
        Objeto = {
            model: modelo,
            neck: pescoço,
            material: tipoMaterial,
            image: Imagem,
            owner: nome,
            author: nome
        }
        let PromessaEnvio = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', Objeto);
        PromessaEnvio.then(ConfirmarEncomenda);
        PromessaEnvio.catch(TratarErro);
    }
    
    function TratarErro(Erro){
        alert("Ops, não conseguimos processar sua encomenda");
    }
    function ConfirmarEncomenda(resposta) {
        alert("Obrigado! Sua encomenda foi Confirmada!!!");
        const ConteinerdeUltimosPedidos = document.querySelector(".conteiner-de-pedidos");
        ConteinerdeUltimosPedidos.innerHTML = "";
        ChamarServidor();
    }
}

function ChecaImagem(testarurlink) {
    return (testarurlink.match(/\.(jpeg|jpg|gif|tiff|png)$/) !== null);
}