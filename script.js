// 1. CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBw-0k1-Z2-B9j-D2-H7j-J0-K2-L0-M0-N0",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "SEU_ID_AQUI",
    appId: "SEU_APP_ID_AQUI"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoID = urlParams.get('id') || 'default';

    // BUSCA OS DADOS NA NUVEM
    database.ref('produtos/' + produtoID).on('value', (snapshot) => {
        const dados = snapshot.val();
        
        if (dados) {
            if(document.getElementById('titulo-produto')) document.getElementById('titulo-produto').innerText = dados.titulo;
            if(document.querySelector('.description')) document.querySelector('.description').innerText = dados.descricao;
            if(document.getElementById('foto-produto')) document.getElementById('foto-produto').src = dados.foto;
            if(document.getElementById('preco-exibicao')) document.getElementById('preco-exibicao').innerText = "R$ " + dados.preco;
            
            const botao = document.getElementById('btn-vendas');
            if (botao) {
                botao.onclick = () => {
                    if (dados.link) window.location.href = dados.link;
                };
            }
        }
    });

    // Abrir painel se for admin
    if (urlParams.get('admin') === 'true') {
        const painel = document.getElementById('painel-admin');
        if(painel) painel.style.display = 'block';
    }
};

// FUNÇÃO PARA SALVAR
function salvarConfiguracoes() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoID = urlParams.get('id') || 'default';

    const dadosParaSalvar = {
        titulo: document.getElementById('input-titulo').value.trim(),
        descricao: document.getElementById('input-descricao').value.trim(),
        link: document.getElementById('input-link').value.trim(),
        foto: document.getElementById('input-foto').value.trim(),
        preco: document.getElementById('input-preco').value.trim()
    };

    database.ref('produtos/' + produtoID).set(dadosParaSalvar)
        .then(() => {
            alert("Configurações salvas com sucesso!");
            location.reload();
        })
        .catch((error) => {
            alert("Erro ao salvar: " + error.message);
        });
}