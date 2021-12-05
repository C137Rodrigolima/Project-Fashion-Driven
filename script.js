let nome = prompt("Qual seu nome?");
let model, neck, material, image, owner, author, IndiceEncomendaRecente, ObjetoEncomendaRecente;
let NumerodeSeleções = 0;

function chamarServidor() {
let Promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
Promessa.then(colocarUltimosPedidos);
}
chamarServidor();

function colocarUltimosPedidos(resposta) {
    let UltimosPedidos = resposta.data;
    const ConteinerdeUltimosPedidos = document.querySelector(".conteiner-de-pedidos");

    for(let i=0; i<UltimosPedidos.length; i++){
        ConteinerdeUltimosPedidos.innerHTML += `
        <div class="bloco-pedido" onclick="requerirConfirmação(${i})">
        <img class="img-pedido" src=${UltimosPedidos[i].image}><h4>
        <span>Criador: </span>${UltimosPedidos[i].owner}</h4><div>
        `;
    }
}

function requerirConfirmação(numerorecebido) {
    let ConfirmacaoEncomenda = window.confirm("Confirma o pedido de uma encomenda via Últimos Pedidos?");
    IndiceEncomendaRecente = numerorecebido;

    if (ConfirmacaoEncomenda){        
        let PromessaEncomendaRecente = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
        PromessaEncomendaRecente.then(encomendarPedidoRecentes);
    }
}
function encomendarPedidoRecentes(Resposta){
    const itens = Resposta.data;
    ObjetoEncomendaRecente = {
        model: itens[IndiceEncomendaRecente].model,
        neck: itens[IndiceEncomendaRecente].neck,
        material: itens[IndiceEncomendaRecente].material,
        image: itens[IndiceEncomendaRecente].image,
        owner: nome,
        author: nome
    }
}

function escolherOpcaoBlusa(blococlicadoagora) {
    let pai = blococlicadoagora.parentNode.parentNode;
    let Filhos = pai.querySelector(".bloco-imagem.escolhido");

    if (Filhos !== null){
        Filhos.classList.remove('escolhido');
        NumerodeSeleções--;
    }
    blococlicadoagora.classList.add('escolhido');
    NumerodeSeleções++;
    ObjetoEncomendaRecente = undefined;

    selecionarNome(blococlicadoagora);
}

function selecionarNome(blococlicadoagora){
    if(blococlicadoagora.classList.contains("t-shirt")){
        modelo = "t-shirt";
    } else if(blococlicadoagora.classList.contains("top-tank")){
        modelo = "top-tank";
    } else if(blococlicadoagora.classList.contains("long")){
        modelo = "long";
    }
    if(blococlicadoagora.classList.contains("v-neck")){
        pescoço = "v-neck";
    } else if(blococlicadoagora.classList.contains("round")){
        pescoço = "round";
    } else if(blococlicadoagora.classList.contains("polo")){
        pescoço = "polo";
    }
    if(blococlicadoagora.classList.contains("silk")){
        tipoMaterial = "silk";
    } else if(blococlicadoagora.classList.contains("cotton")){
        tipoMaterial = "cotton";
    } else if(blococlicadoagora.classList.contains("polyester")){
        tipoMaterial = "polyester";
    }
}

setInterval(validarEncomenda, 2000);

function validarEncomenda() {
    const botao = document.querySelector('.botao');
    let input = document.querySelector("input");
    let InputUrlImagem = input.value;

    if((NumerodeSeleções===3 && checaImagem(InputUrlImagem)) || ObjetoEncomendaRecente !== undefined){
        botao.classList.add('clicavel');
        botao.addEventListener('click', processarEncomenda);
        Imagem = InputUrlImagem;
    } else {
        botao.classList.remove('clicavel');
        botao.removeEventListener('click', processarEncomenda);
    }
}

function processarEncomenda() {
    alert("Sua encomenda está sendo Processada.");
    
    if(ObjetoEncomendaRecente !== undefined){
        let PromessaEnvio = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', ObjetoEncomendaRecente);
        PromessaEnvio.then(confirmarEncomenda);
        PromessaEnvio.catch(tratarErro);
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
        PromessaEnvio.then(confirmarEncomenda);
        PromessaEnvio.catch(tratarErro);
    }
    
    function tratarErro(Erro){
        alert("Ops, não conseguimos processar sua encomenda");
    }
    function confirmarEncomenda(resposta) {
        alert("Obrigado! Sua encomenda foi Confirmada!!!");
        const ConteinerdeUltimosPedidos = document.querySelector(".conteiner-de-pedidos");
        ConteinerdeUltimosPedidos.innerHTML = "";
        chamarServidor();
    }
}

function checaImagem(testarurlink) {
    return (testarurlink.match(/\.(jpeg|jpg|gif|tiff|png)$/) !== null);
}