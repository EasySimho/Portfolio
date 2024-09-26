document.addEventListener('DOMContentLoaded', () => {
    const windowElement = document.querySelector('.window');
    const windowTop = document.querySelector('.windowTop');
    const windowContent = document.querySelector('.windowContent');
    const apps = document.querySelectorAll('.app');
    const closeButton = windowTop.querySelector('img[alt="X"]');
    const minimizeButton = windowTop.querySelector('img[alt="Minimize"]');
    const maximizeButton = windowTop.querySelector('img[alt="Maximize"]');

    let isDragging = false;
    let offsetX, offsetY;

    // Funzione di trascinamento
    

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Gestione del click sulle app
    apps.forEach(app => {
        app.addEventListener('click', () => {
            const contentId = app.getAttribute('data-content-id');
            let contentElement = document.getElementById(`${contentId}-content`);

            console.log(`Looking for: ${contentId}-content`);
            console.log('Found contentElement:', contentElement);

            if (contentElement) {
                contentElement.style.display = 'block'; // Lo rendo visibile
                windowElement.style.display = 'flex'; // Mostro la finestra
            } else {
                console.error(`Content element with id ${contentId}-content not found`);
            }
        });
    });

    function resetWindow() {
            windowElement.style.height = ''; // Torna alla dimensione normale
            windowElement.style.width = ''; // Torna alla dimensione normale
            windowElement.style.left = ''; // Torna alla posizione normale
            windowElement.style.top = ''; // Torna alla posizione normale
    }

    // Chiusura finestra
    closeButton.addEventListener('click', () => {
        // Nascondi la finestra senza svuotare il contenuto
        windowElement.style.display = 'none';
        windowContent.classList.remove('maximized');
        windowTop.addEventListener('mousedown', dragStart);
        resetWindow();
        for (let content of windowContent.children) {
            content.style.display = 'none';
        }
    });

    // Minimizzazione finestra
    minimizeButton.addEventListener('click', () => {
        // Nascondi la finestra senza svuotare il contenuto
        windowElement.style.display = 'none';
        windowContent.classList.remove('maximized');
        windowTop.addEventListener('mousedown', dragStart);
        resetWindow();
        for (let content of windowContent.children) {
            content.style.display = 'none';
        }
    });

    maximizeButton.addEventListener('click', () => {
        if (windowElement.style.height === '95vh') {
            resetWindow();
            windowTop.style.cursor = 'grab'; // Rendi nuovamente draggable
            windowTop.addEventListener('mousedown', dragStart);
            windowContent.classList.remove('maximized');
        } else {
            windowElement.style.height = '95vh'; // Massimizza la finestra
            windowElement.style.width = '100%'; // Massimizza la finestra
            windowElement.style.left = '0'; // Allinea a sinistra
            windowElement.style.top = '3vh'; // Allinea in alto
            windowTop.style.cursor = 'default'; // Disabilita il trascinamento
            windowTop.removeEventListener('mousedown', dragStart);
            windowContent.classList.add('maximized');
        }
    });

    function dragStart(e) {
        isDragging = true;
        const rect = windowElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        windowElement.style.position = 'absolute';
        windowElement.style.zIndex = 1000;
    }

    windowTop.addEventListener('mousedown', dragStart);
});
