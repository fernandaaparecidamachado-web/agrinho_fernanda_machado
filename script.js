document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO GLOBAL DA ACESSIBILIDADE ---
    let currentFontSize = 16;
    const bodyEl = document.body;

    // Controle de Fonte
    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    // Controle de Contraste
    document.getElementById('btn-contrast').addEventListener('click', () => {
        bodyEl.classList.toggle('high-contrast');
    });

    // --- COMPONENTE CARROSSEL (Array de Objetos) ---
    const carouselData = [
        {
            title: "Drones de Monitoramento de Precisão",
            description: "Mapeamento aéreo completo da saúde da lavoura, otimizando o uso de insumos e diminuindo o impacto ambiental drasticamente."
        },
        {
            title: "Sistemas de Inteligência Agroecológica",
            description: "Plataforma de gestão integrada que prevê anomalias no solo e gerencia a rotação de culturas de forma totalmente automatizada."
        },
        {
            title: "Sensores IOT de Umidade de Solo",
            description: "Irrigação inteligente acionada apenas quando necessário, economizando até 40% de água e preservando os lençóis freáticos."
        }
    ];

    const track = document.getElementById('carousel-track');
    let currentIndex = 0;

    // Renderizar Itens do Carrossel
    carouselData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        track.appendChild(slide);
    });

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    });

    // --- COMPONENTE ACORDEÃO (Array de Objetos) ---
    const faqData = [
        {
            question: "Como a tecnologia ajuda a trazer o jovem de volta?",
            answer: "O jovem busca propósito, inovação e modernidade. Quando a propriedade adota ferramentas digitais, automação e inteligência de dados, o trabalho deixa de ser puramente braçal e exaustivo e passa a ser uma cadeira de gestão estratégica, conectada com o futuro."
        },
        {
            question: "A transição tecnológica custa muito caro?",
            answer: "Nosso método foca em sustentabilidade incremental. Começamos com otimizações de baixo custo e alto retorno baseado nos dados atuais da sua fazenda. O próprio ganho de produtividade financia os próximos passos da digitalização."
        },
        {
            question: "O processo de sucessão interfere na rotina atual da fazenda?",
            answer: "Não. A metodologia é desenhada para criar uma transição suave. O fundador continua sendo o pilar de sabedoria e governança, enquanto o sucessor assume as frentes de inovação tecnológica e novos canais de rentabilidade."
        }
    ];

    const accordionContainer = document.getElementById('faq-accordion');

    // Renderizar Acordeão
    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.classList.add('accordion-item');

        accItem.innerHTML = `
            <button class="accordion-header" data-index="${index}">
                <span>${item.question}</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" id="faq-content-${index}">
                <p>${item.answer}</p>
            </div>
        `;
        accordionContainer.appendChild(accItem);
    });

    // Lógica do Acordeão
    accordionContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');

        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            icon.textContent = '+';
        } else {
            // Fecha todos os outros abertos
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.accordion-icon').forEach(i => i.textContent = '+');
            
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '−';
        }
    });
});
