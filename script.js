const conteudos = {
    pilares: [
        {
            titulo: "Produtividade Inteligente",
            sub: "Tecnologia 4.0",
            txt: "Sistemas que predizem pragas e otimizam a colheita minuto a minuto.",
            img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800"
        },
        {
            titulo: "Reflorestamento Ativo",
            sub: "Carbono Negativo",
            txt: "Integramos corredores ecológicos dentro das áreas produtivas para fauna e flora.",
            img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800"
        },
        {
            titulo: "Gestão Hídrica",
            sub: "Economia de Recursos",
            txt: "Gotejamento inteligente que reduz em até 40% o uso de água potável.",
            img: "imagempnj.png"
        }
    ],
    faq: [
        { q: "O agro sustentável é lucrativo?", a: "Sim. A eficiência tecnológica reduz custos com químicos e água, gerando maior margem de lucro por hectare." },
        { q: "Como vocês combatem o desmatamento?", a: "Utilizamos imagens de satélite e inteligência geográfica para garantir que 100% da produção venha de áreas já consolidadas." }
    ],
    quiz: [
        { q: "Qual a economia média de água no gotejamento inteligente?", options: ["10%", "40%", "80%"], correct: 1, feedback: "Exato! O gotejamento reduz em até 40% o desperdício." },
        { q: "O que significa Agricultura 4.0?", options: ["Uso de tração animal", "Uso de dados e IA", "Apenas plantio manual"], correct: 1, feedback: "Correto! É a tecnologia de dados aplicada ao campo." },
        { q: "Qual o objetivo do reflorestamento ativo?", options: ["Apenas estética", "Isolamento da fazenda", "Corredores para biodiversidade"], correct: 2, feedback: "Isso! Ajuda a manter a fauna e flora integradas à produção." },
        { q: "Drones multiespectrais servem para quê?", options: ["Entregar comida", "Analisar a saúde das plantas", "Espantar pássaros"], correct: 1, feedback: "Boa! Eles identificam pragas e estresse hídrico lá do alto." },
        { q: "Agro regenerativo foca em quê?", options: ["Esgotar o solo", "Saúde do ecossistema", "Uso de mais agrotóxicos"], correct: 1, feedback: "Certo! O foco é produzir recuperando a vida do solo." }
    ]
};

// Variável para controlar a pergunta atual do Quiz
let currentQuestion = 0;

function init() {
    const cardsContainer = document.getElementById('cards-container');
    const faqContainer = document.getElementById('accordion-root');

    // Renderizar os cards de Pilares
    if (cardsContainer) {
        cardsContainer.innerHTML = conteudos.pilares.map(p => `
            <div class="card-premium reveal">
                <img src="${p.img}" alt="${p.titulo}">
                <div class="card-premium-body">
                    <small style="color:var(--emerald); font-weight:bold">${p.sub}</small>
                    <h3>${p.titulo}</h3>
                    <p>${p.txt}</p>
                </div>
            </div>
        `).join('');
    }

    // Renderizar o FAQ (Acordeão)
    if (faqContainer) {
        faqContainer.innerHTML = conteudos.faq.map(f => `
            <div class="acc-item reveal">
                <button class="acc-header" onclick="toggleAcc(this)">${f.q} <span>+</span></button>
                <div class="acc-content"><p>${f.a}</p></div>
            </div>
        `).join('');
    }

    // Inicializar Quiz e Efeito de Scroll
    initQuiz();
    handleScroll();
}

// Função do Acordeão
function toggleAcc(btn) {
    const content = btn.nextElementSibling;
    const isVisible = content.style.maxHeight !== "0px" && content.style.maxHeight !== "";
    content.style.maxHeight = isVisible ? "0px" : "150px";
    btn.querySelector('span').innerText = isVisible ? "+" : "-";
}

// Lógica de Animação de Scroll (Reveal)
function handleScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) el.classList.add('active');
    });
}

// Funções do Quiz
function initQuiz() {
    const q = conteudos.quiz[currentQuestion];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackBox = document.getElementById('feedback-box');
    const nextBtn = document.getElementById('next-btn');

    if (questionText && optionsContainer) {
        questionText.innerText = q.q;
        feedbackBox.style.display = 'none';
        nextBtn.style.display = 'none';
        
        // Renderiza opções com texto em preto
        optionsContainer.innerHTML = q.options.map((opt, i) => `
            <button class="btn-outline" onclick="checkAnswer(${i})" 
                style="width:100%; text-align:left; padding: 12px; color: #000000; font-weight: 500; cursor: pointer; margin-bottom: 5px;">
                ${opt}
            </button>
        `).join('');
    }
}

function checkAnswer(index) {
    const q = conteudos.quiz[currentQuestion];
    const feedback = document.getElementById('feedback-box');
    const nextBtn = document.getElementById('next-btn');
    
    feedback.style.display = 'block';
    feedback.style.color = "#000000"; // Resposta em preto
    
    if(index === q.correct) {
        feedback.innerText = "✅ " + q.feedback;
        feedback.style.background = "#d4edda";
    } else {
        feedback.innerText = "❌ Ops! A resposta correta era: " + q.options[q.correct];
        feedback.style.background = "#f8d7da";
    }
    nextBtn.style.display = 'block';
}

// Evento do botão Próxima Pergunta
document.getElementById('next-btn').onclick = () => {
    currentQuestion++;
    if(currentQuestion < conteudos.quiz.length) {
        initQuiz();
    } else {
        document.getElementById('quiz-container').innerHTML = "<h3 style='color: #000;'>Parabéns! Você concluiu o desafio AgroSintonia! 🌱</h3>";
    }
};

// Controles de Acessibilidade
document.getElementById('contrast-toggle').onclick = () => document.body.classList.toggle('high-contrast');

// Funções de Tamanho de Fonte
let fontSize = 100;
document.getElementById('font-increase').onclick = () => {
    fontSize += 10;
    document.body.style.fontSize = fontSize + '%';
};
document.getElementById('font-decrease').onclick = () => {
    fontSize -= 10;
    document.body.style.fontSize = fontSize + '%';
};

// Eventos Globais
window.addEventListener('scroll', handleScroll);
window.onload = init;// ... (seu código anterior de renderização e acessibilidade) ...

// --- LÓGICA DO JOGO ---
const gCanvas = document.getElementById('gameCanvas');
const gCtx = gCanvas.getContext('2d');
const gScoreEl = document.getElementById('score');
const gLivesEl = document.getElementById('lives');
const gMenu = document.getElementById('menu-game');
const gStartBtn = document.getElementById('start-btn');

let gameActive = false;
let gScore = 0;
let gLives = 3;
let enemies = [];
let hook = { x: 0, y: 0, targetX: 0, targetY: 0, active: false, speed: 15, returning: false };
let farmer = { x: 80, y: 0 };

function resizeGame() {
    const parent = gCanvas.parentElement;
    gCanvas.width = parent.clientWidth;
    gCanvas.height = parent.clientHeight;
    farmer.y = gCanvas.height - 100;
}

// Chame o resize quando a janela mudar ou o site carregar
window.addEventListener('resize', resizeGame);

function drawGame() {
    if (!gameActive) return;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    
    // Desenha Chão
    gCtx.fillStyle = "#4d3319";
    gCtx.fillRect(0, gCanvas.height - 40, gCanvas.width, 40);

    // Desenha Fazendeiro e Gancho
    gCtx.font = '50px Arial';
    gCtx.fillText('👨‍🌾', farmer.x, farmer.y + 40);
    
    if (hook.active) {
        gCtx.strokeStyle = '#666';
        gCtx.beginPath();
        gCtx.moveTo(farmer.x + 20, farmer.y);
        gCtx.lineTo(hook.x, hook.y);
        gCtx.stroke();
        gCtx.fillText('🪝', hook.x - 10, hook.y + 10);
        updateHook();
    }

    // Inimigos
    enemies.forEach((en, i) => {
        en.x -= en.speed;
        gCtx.fillText('🦇', en.x, en.y);
        
        // Colisão Gancho
        if(hook.active && Math.hypot(hook.x - en.x, hook.y - en.y) < 30) {
            enemies.splice(i, 1);
            gScore++;
            gScoreEl.innerText = gScore;
            hook.returning = true;
        }

        if(en.x < 0) {
            enemies.splice(i, 1);
            gLives--;
            gLivesEl.innerText = '❤️'.repeat(gLives);
            if(gLives <= 0) endGame();
        }
    });

    requestAnimationFrame(drawGame);
}

function updateHook() {
    let targetX = hook.returning ? farmer.x + 20 : hook.targetX;
    let targetY = hook.returning ? farmer.y : hook.targetY;
    
    let angle = Math.atan2(targetY - hook.y, targetX - hook.x);
    hook.x += Math.cos(angle) * hook.speed;
    hook.y += Math.sin(angle) * hook.speed;

    if(!hook.returning && Math.hypot(hook.x - hook.targetX, hook.y - hook.targetY) < 10) hook.returning = true;
    if(hook.returning && Math.hypot(hook.x - (farmer.x + 20), hook.y - farmer.y) < 10) hook.active = false;
}

function spawnEnemies() {
    if(!gameActive) return;
    enemies.push({ x: gCanvas.width, y: Math.random() * (gCanvas.height - 150) + 50, speed: 2 + (gScore/10) });
    setTimeout(spawnEnemies, 2000);
}

gStartBtn.onclick = () => {
    resizeGame();
    gameActive = true;
    gScore = 0;
    gLives = 3;
    enemies = [];
    gMenu.style.display = 'none';
    spawnEnemies();
    drawGame();
};

gCanvas.addEventListener('mousedown', (e) => {
    if(!gameActive || hook.active) return;
    const rect = gCanvas.getBoundingClientRect();
    hook = { x: farmer.x + 20, y: farmer.y, targetX: e.clientX - rect.left, targetY: e.clientY - rect.top, active: true, returning: false, speed: 15 };
});

function endGame() {
    gameActive = false;
    gMenu.style.display = 'block';
    gMenu.innerHTML = `<h3>Fim de Jogo!</h3><p>Pontos: ${gScore}</p><button onclick="location.reload()">Reiniciar</button>`;
}