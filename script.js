document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const nameInput = document.getElementById('nameInput');
    const addBtn = document.getElementById('addBtn');
    const drawBtn = document.getElementById('drawBtn');
    const countdownEl = document.getElementById('countdown');
    const winnerEl = document.getElementById('winner');
    const orderBtn = document.getElementById('orderBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const restartBtn = document.getElementById('restartBtn');
    const rankingList = document.getElementById('ranking');
    const container = document.querySelector('.container');
    const participantsListEl = document.getElementById('participants-list');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Estado da Aplicação ---
    let participants = [];
    let sortedParticipants = [];

    // --- Funções Principais ---

    // Carrega dados salvos e aplica o tema ao iniciar
    function initializeApp() {
        // Carrega tema
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');

        // Carrega participantes
        const savedParticipants = JSON.parse(localStorage.getItem('participants'));
        if (savedParticipants && savedParticipants.length > 0) {
            participants = savedParticipants;
            renderParticipants();
        }
    }

    // Renderiza as tags dos participantes na tela
    function renderParticipants() {
        participantsListEl.innerHTML = '';
        participants.forEach((participant, index) => {
            const tag = document.createElement('div');
            tag.className = 'participant-tag';
            tag.innerHTML = `
                <span>${participant}</span>
                <button data-index="${index}"><i class="fas fa-times"></i></button>
            `;
            participantsListEl.appendChild(tag);
        });
        localStorage.setItem('participants', JSON.stringify(participants));
    }

    // Adiciona novos participantes da textarea
    function addParticipants() {
        const input = nameInput.value.trim();
        if (input) {
            const newNames = input.split(/[,\n]+/)
                .map(name => name.trim())
                .filter(name => name && !participants.includes(name));
            
            participants.push(...newNames);
            nameInput.value = '';
            renderParticipants();
        }
    }

    // Remove um participante pelo índice (clicando no 'x')
    function removeParticipant(index) {
        participants.splice(index, 1);
        renderParticipants();
    }

    // Algoritmo Fisher-Yates para embaralhamento justo
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Inicia a contagem regressiva para o sorteio
    function startCountdown() {
        if (participants.length < 2) {
            alert('Adicione pelo menos dois participantes!');
            return;
        }
        container.classList.add('results-view');
        
        let count = 3;
        countdownEl.innerHTML = `Sorteando em... ${count}`;
        
        const interval = setInterval(() => {
            count--;
            countdownEl.innerHTML = `Sorteando em... ${count}`;
            if (count === 0) {
                clearInterval(interval);
                countdownEl.innerHTML = '';
                drawWinnerWithRoulette();
            }
        }, 1000);
    }

    // Sorteia o vencedor com efeito roleta e confetes
    function drawWinnerWithRoulette() {
        const animationDuration = 3000;
        const spinInterval = 75;
        let rouletteInterval;
        const shuffledForRoulette = shuffleArray([...participants]);
        let currentIndex = 0;

        rouletteInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % shuffledForRoulette.length;
            winnerEl.innerHTML = `<strong>${shuffledForRoulette[currentIndex]}</strong>`;
        }, spinInterval);

        setTimeout(() => {
            clearInterval(rouletteInterval);
            sortedParticipants = shuffleArray([...participants]);
            const finalWinner = sortedParticipants[0];
            winnerEl.innerHTML = `🏆 Vencedor(a): <strong>${finalWinner}</strong>`;
            
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            
            orderBtn.style.display = sortedParticipants.length > 1 ? 'flex' : 'none';
        }, animationDuration);
    }

    function showRanking() {
        rankingList.innerHTML = '';
        for (let i = 1; i < sortedParticipants.length; i++) {
            const li = document.createElement('li');
            li.textContent = `${i + 1}º lugar: ${sortedParticipants[i]}`;
            rankingList.appendChild(li);
        }
        rankingList.style.display = 'block';
        orderBtn.style.display = 'none';
    }

    function downloadResults() {
        let text = `🏆 Vencedor(a): ${sortedParticipants[0]}\n\n--- Ranking Completo ---\n`;
        sortedParticipants.forEach((participant, index) => {
            text += `${index + 1}º lugar: ${participant}\n`;
        });
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resultado_sorteio_aiqon.txt';
        link.click();
    }

    function restart() {
        // Não apaga a lista de participantes, apenas a tela de resultados
        sortedParticipants = [];
        rankingList.innerHTML = '';
        rankingList.style.display = 'none';
        orderBtn.style.display = 'flex';
        container.classList.remove('results-view');
        // Para um novo sorteio completo, limpando a lista:
        // participants = [];
        // localStorage.removeItem('participants');
        // renderParticipants();
    }

    // --- Event Listeners ---
    addBtn.addEventListener('click', addParticipants);
    drawBtn.addEventListener('click', startCountdown);
    orderBtn.addEventListener('click', showRanking);
    downloadBtn.addEventListener('click', downloadResults);
    restartBtn.addEventListener('click', restart);

    participantsListEl.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
            const index = e.target.closest('button').dataset.index;
            removeParticipant(parseInt(index, 10));
        }
    });

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Inicialização ---
    initializeApp();
});