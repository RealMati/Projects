document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modalContainer') as HTMLDivElement
    const modalBackground = document.getElementById('modalBackground') as HTMLDivElement
    const addIcons = document.querySelectorAll('.addIcon');

    modalContainer.style.display = 'none'

    addIcons.forEach(addIcon => {
        addIcon.addEventListener('click', function () {
            modalContainer.style.display = 'block'
        });
    });

    modalBackground.addEventListener('click', function (event) {
        if (event.target === modalBackground) {
            modalContainer.style.display = 'none'
        }
    });


    const modalContainer2 = document.getElementById('modalContainer2') as HTMLDivElement
    const modalBackground2 = document.getElementById('modalBackground2') as HTMLDivElement
    const editIcon = document.getElementById('editIcon') as HTMLElement
    modalContainer2.style.display = 'none'


    editIcon.addEventListener('click', function () {
        modalContainer2.style.display = 'block';
    });

    modalBackground2.addEventListener('click', function (event) {
        if (event.target === modalBackground2) {
            modalContainer2.style.display = 'none';
        }
    });
})