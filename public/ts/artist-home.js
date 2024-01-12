const modalContainer = document.getElementById('modalContainer');
const modalBackground = document.getElementById('modalBackground');
const addIcon = document.getElementById('addIcon');

addIcon.addEventListener('click', function () {
    modalContainer.style.display = 'block';
});

modalBackground.addEventListener('click', function (event) {
    if (event.target === modalBackground) {
        modalContainer.style.display = 'none';
    }
});