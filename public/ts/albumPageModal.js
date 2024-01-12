document.addEventListener('DOMContentLoaded', function () {
    var modalContainer = document.getElementById('modalContainer');
    var modalBackground = document.getElementById('modalBackground');
    var addIcons = document.querySelectorAll('.addIcon');
    modalContainer.style.display = 'none';
    addIcons.forEach(function (addIcon) {
        addIcon.addEventListener('click', function () {
            modalContainer.style.display = 'block';
        });
    });
    modalBackground.addEventListener('click', function (event) {
        if (event.target === modalBackground) {
            modalContainer.style.display = 'none';
        }
    });
    var modalContainer2 = document.getElementById('modalContainer2');
    var modalBackground2 = document.getElementById('modalBackground2');
    var editIcon = document.getElementById('editIcon');
    modalContainer2.style.display = 'none';
    editIcon.addEventListener('click', function () {
        modalContainer2.style.display = 'block';
    });
    modalBackground2.addEventListener('click', function (event) {
        if (event.target === modalBackground2) {
            modalContainer2.style.display = 'none';
        }
    });
});
