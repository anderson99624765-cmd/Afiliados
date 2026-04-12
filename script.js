window.onload = function() {
    // 1. Identifica o Produto pela URL
    const urlParams = new URLSearchParams(window.location.search);
    const produtoID = urlParams.get('id') || 'default'; 

    // 2. Puxa os dados específicos desse ID (ou usa valores padrão)
    const titulo = localStorage.getItem(`${produtoID}_titulo`) || "Special Product";
    const descricao = localStorage.getItem(`${produtoID}_desc`) || "Product description here.";
    const linkSalvo = localStorage.getItem(`${produtoID}_link`) || "";
    const foto = localStorage.getItem(`${produtoID}_foto`) || "https://via.placeholder.com/500x300";
    const preco = localStorage.getItem(`${produtoID}_preco`) || "0.00";

    // 3. Preenche os elementos na tela
    if(document.getElementById('titulo-produto')) document.getElementById('titulo-produto').innerText = titulo;
    if(document.querySelector('.description')) document.querySelector('.description').innerText = descricao;
    if(document.getElementById('foto-produto')) document.getElementById('foto-produto').src = foto;
    if(document.getElementById('preco-exibicao')) {
        document.getElementById('preco-exibicao').innerText = "Only $" + preco;
    }

    // 4. Configuração do Botão de Vendas
    const botao = document.getElementById('btn-vendas');
    if (botao) {
        botao.onclick = function() {
            if (linkSalvo && linkSalvo.startsWith("http")) {
                window.location.href = linkSalvo;
            } else {
                alert("Please configure the affiliate link for this product!");
            }
        };
    }

    // 5. Abre o Painel Admin se tiver ?admin=true na URL
    if (urlParams.get('admin') === 'true') {
        const painel = document.getElementById('painel-admin');
        if(painel) painel.style.display = 'block';
    }
};

function salvarConfiguracoes() {
    // Pega o ID atual da URL para saber qual produto estamos editando
    const urlParams = new URLSearchParams(window.location.search);
    const produtoID = urlParams.get('id') || 'default';

    // Captura os valores dos inputs
    const t = document.getElementById('input-titulo').value.trim();
    const d = document.getElementById('input-descricao').value.trim();
    const l = document.getElementById('input-link').value.trim();
    const f = document.getElementById('input-foto').value.trim();
    const p = document.getElementById('input-preco').value.trim();

    // Salva usando o ID como prefixo (Fundamental!)
    if(t) localStorage.setItem(`${produtoID}_titulo`, t);
    if(d) localStorage.setItem(`${produtoID}_desc`, d);
    if(l) localStorage.setItem(`${produtoID}_link`, l);
    if(f) localStorage.setItem(`${produtoID}_foto`, f);
    if(p) localStorage.setItem(`${produtoID}_preco`, p);

    alert(`Settings for "${produtoID}" updated successfully!`);
    location.reload();
}