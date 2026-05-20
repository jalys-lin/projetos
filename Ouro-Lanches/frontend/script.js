// Configuração da API
const API_URL = 'http://localhost:5000/api';

// Dados simulados (será substituído por chamadas da API)
let lanches = [];
let lanchonetes = [];
let usuarioLogado = null;

// Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const perfilLink = document.getElementById('perfil');
const closeButtons = document.querySelectorAll('.close');
const toggleRegister = document.getElementById('toggleRegister');
const toggleLogin = document.getElementById('toggleLogin');
const lanchesContainer = document.getElementById('lanchesContainer');
const lanchonetesList = document.getElementById('lanchonetesList');
const searchLanches = document.getElementById('searchLanches');
const filterLanchonete = document.getElementById('filterLanchonete');
const explorarBtn = document.getElementById('explorarBtn');

// Event Listeners
loginBtn.addEventListener('click', () => {
    if (usuarioLogado) {
        logout();
    } else {
        loginModal.classList.remove('hidden');
    }
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

toggleRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
});

toggleLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
    if (e.target === registerModal) {
        registerModal.classList.add('hidden');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Simulação de login
    usuarioLogado = {
        email: email,
        role: 'user'
    };
    
    loginModal.classList.add('hidden');
    loginForm.reset();
    updateLoginButton();
    alert('Login realizado com sucesso!');
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeEmpresa').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const phone = registerForm.querySelector('input[type="tel"]').value;
    const endereco = registerForm.querySelectorAll('input[type="text"]')[0].value;
    const cidade = registerForm.querySelectorAll('input[type="text"]')[1].value;
    
    // Simulação de cadastro
    usuarioLogado = {
        nome: nome,
        email: email,
        phone: phone,
        endereco: endereco,
        cidade: cidade,
        role: 'lanchonete'
    };
    
    registerModal.classList.add('hidden');
    registerForm.reset();
    updateLoginButton();
    alert('Cadastro realizado com sucesso!');
});

searchLanches.addEventListener('input', () => {
    filtrarLanches();
});

filterLanchonete.addEventListener('change', () => {
    filtrarLanches();
});


// Funções
function updateLoginButton() {
    if (usuarioLogado) {
        loginBtn.style.display = "none";
        perfilLink.style.display = "block";
        perfilLink.addEventListener('click', () =>{
            alert(`Perfil:\nNome: ${usuarioLogado.nome || 'Usuário'}\nEmail: ${usuarioLogado.email}\nTelefone: ${usuarioLogado.phone || 'N/A'}\nEndereço: ${usuarioLogado.endereco || 'N/A'}\nCidade: ${usuarioLogado.cidade || 'N/A'}`);
        });
    } else {
        loginBtn.style.display = "block";
        perfilLink.style.display = "none";
    }
}

function logout() {
    usuarioLogado = null;
    updateLoginButton();
    alert('Você saiu da sua conta');
}

function filtrarLanches() {
    const termo = searchLanches.value.toLowerCase();
    const lanchoneteFilter = filterLanchonete.value;
    
    let lanchesAtivos = lanches;
    
    if (lanchoneteFilter) {
        lanchesAtivos = lanchesAtivos.filter(l => l.lanchoneteId === parseInt(lanchoneteFilter));
    }
    
    if (termo) {
        lanchesAtivos = lanchesAtivos.filter(l => 
            l.nome.toLowerCase().includes(termo) || 
            l.descricao.toLowerCase().includes(termo)
        );
    }
    
    exibirLanches(lanchesAtivos);
}

function exibirLanches(items) {
    lanchesContainer.innerHTML = '';
    
    if (items.length === 0) {
        lanchesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum lanche encontrado</p>';
        return;
    }
    
    items.forEach(lanche => {
        const card = criarCardLanche(lanche);
        lanchesContainer.appendChild(card);
    });
}

function criarCardLanche(lanche) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-image">
            <img src="${lanche.imagem || '🍔'}" alt="${lanche.nome}" onerror="this.style.display='none'">
            <span style="display: ${lanche.imagem ? 'none' : 'block'}">${lanche.emoji || '🍔'}</span>
        </div>
        <div class="card-content">
            <h3>${lanche.nome}</h3>
            <div class='descricao-content'>
                <p class="descricao-lanche">${lanche.descricao}</p>
                <p class="preco">R$ ${lanche.preco.toFixed(2)}</p>
                <p><strong>${lanche.lanchonete}</strong></p>
                <div class="rating">⭐ ${lanche.avaliacao || 0}/5</div>
                <button class="btn-primary" onclick="adicionarAoCarrinho(${lanche.id})">Pedir Agora</button>
            </div>
        </div>
    `;
    return card;
}

function criarCardLanchonete(lanchonete) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-image">
            <span style="font-size: 3.5rem;">🏪</span>
        </div>
        <div class="card-content">
            <h3>${lanchonete.nome}</h3>
            <div class='descricao-content'>
                <p>${lanchonete.endereco}</p>
                <p><strong>📍 ${lanchonete.cidade}</strong></p>
                <p>📞 ${lanchonete.telefone}</p>
            </div>
                <div class="rating">⭐ ${lanchonete.avaliacao || 0}/5</div>
                <button class="btn-primary" onclick="verLanchesLanchonete(${lanchonete.id})">Ver Lanches</button>
                ${usuarioLogado && usuarioLogado.role === 'lanchonete' && usuarioLogado.email === lanchonete.email ? 
                    `<button class="btn-primary" style="background-color: #007bff;" onclick="adicionarLanche(${lanchonete.id})">+ Adicionar Lanche</button>` : ''}
        </div>
    `;
    return card;
}

function exibirLanchonetes(items) {
    lanchonetesList.innerHTML = '';
    
    if (items.length === 0) {
        lanchonetesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhuma lanchonete encontrada</p>';
        return;
    }
    
    items.forEach(lanchonete => {
        const card = criarCardLanchonete(lanchonete);
        lanchonetesList.appendChild(card);
    });
    
    // Atualizar filtro de lanchonetes
    filterLanchonete.innerHTML = '<option value="">Todas as Lanchonetes</option>';
    items.forEach(l => {
        const option = document.createElement('option');
        option.value = l.id;
        option.textContent = l.nome;
        filterLanchonete.appendChild(option);
    });
}

function verLanchesLanchonete(id) {
    filterLanchonete.value = id;
    filtrarLanches();
    document.getElementById('lanches').scrollIntoView({ behavior: 'smooth' });
}

function adicionarAoCarrinho(id) {
    alert('Lanche adicionado ao carrinho! (Funcionalidade em desenvolvimento)');
}

function adicionarLanche(id) {
    if (!usuarioLogado) {
        alert('Você precisa fazer login para adicionar lanches');
        return;
    }
    document.getElementById('adicionarLancheModal').classList.remove('hidden');
}

// Carregar dados simulados
function carregarDados() {
    lanchonetes = [
        {
            id: 1,
            nome: 'Ouro Burguer',
            endereco: 'Rua Principal, 123',
            cidade: 'São Paulo',
            telefone: '(11) 99999-0001',
            avaliacao: 4.8,
            email: 'ouroburger@test.com'
        },
        {
            id: 2,
            nome: 'Pastelaria Premium',
            endereco: 'Av. Central, 456',
            cidade: 'São Paulo',
            telefone: '(11) 99999-0002',
            avaliacao: 4.5,
            email: 'pastelpremium@test.com'
        },
        {
            id: 3,
            nome: 'X-Tudo Delicia',
            endereco: 'Rua Lateral, 789',
            cidade: 'São Paulo',
            telefone: '(11) 99999-0003',
            avaliacao: 4.6,
            email: 'xtudodelicia@test.com'
        }
    ];
    
    lanches = [
        { id: 1, nome: 'X-Burguer', descricao: 'Lanche com queijo e presunto', preco: 12.50, lanchoneteId: 1, lanchonete: 'Ouro Burguer', avaliacao: 4.8, emoji: '🍔' },
        { id: 2, nome: 'X-Bacon', descricao: 'Lanche com queijo e bacon crocante', preco: 15.00, lanchoneteId: 1, lanchonete: 'Ouro Burguer', avaliacao: 4.9, emoji: '🍔' },
        { id: 3, nome: 'Pastel de Queijo', descricao: 'Pastel caseiro com queijo derretido', preco: 8.50, lanchoneteId: 2, lanchonete: 'Pastelaria Premium', avaliacao: 4.7, emoji: '🥟' },
        { id: 4, nome: 'Pastel de Carne', descricao: 'Pastel com recheio de carne moída', preco: 9.50, lanchoneteId: 2, lanchonete: 'Pastelaria Premium', avaliacao: 4.6, emoji: '🥟' },
        { id: 5, nome: 'X-Tudo', descricao: 'O clássico lanche com tudo', preco: 18.00, lanchoneteId: 3, lanchonete: 'X-Tudo Delicia', avaliacao: 5.0, emoji: '🍔' },
        { id: 6, nome: 'Coxinha de Frango', descricao: 'Coxinha crocante de frango', preco: 7.50, lanchoneteId: 3, lanchonete: 'X-Tudo Delicia', emoji: '🍗' }
    ];
    
    exibirLanchonetes(lanchonetes);
    exibirLanches(lanches);
}

// Scroll suave para navegação
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.textContent.trim() === 'Logado') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});
