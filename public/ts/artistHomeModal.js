document.addEventListener('DOMContentLoaded', function () {
    var modalContainer = document.getElementById('modalContainer');
    var modalBackground = document.getElementById('modalBackground');
    var addIcon = document.getElementById('addIcon');
    modalContainer.style.display = 'none';
    addIcon.addEventListener('click', function () {
        modalContainer.style.display = 'block';
    });
    modalBackground.addEventListener('click', function (event) {
        if (event.target === modalBackground) {
            modalContainer.style.display = 'none';
        }
    });
});
