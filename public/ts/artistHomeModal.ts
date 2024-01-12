document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modalContainer') as HTMLDivElement;
    const modalBackground = document.getElementById('modalBackground') as HTMLDivElement;
    const addIcon = document.getElementById('addIcon') as HTMLElement;

    modalContainer.style.display = 'none';

    addIcon.addEventListener('click', () => {
        modalContainer.style.display = 'block';
    });

    modalBackground.addEventListener('click', (event) => {
        if (event.target === modalBackground) {
            modalContainer.style.display = 'none';
        }
    });
});
