document.addEventListener('DOMContentLoaded', () => {
    const musicForm = document.getElementById('musicForm') as HTMLFormElement;

    musicForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const type = document.getElementById('type') as HTMLSelectElement;
        const albumName = document.getElementById('albumName') as HTMLInputElement;
        const genre = document.getElementById('genre') as HTMLInputElement;
        const description = document.getElementById('description') as HTMLTextAreaElement;
        const cover = document.getElementById('cover') as HTMLInputElement;

        const formData = new FormData();
        formData.append('type', type.value);
        formData.append('albumName', albumName.value);
        formData.append('genre', genre.value);
        formData.append('description', description.value);
        if (cover && cover.files && cover.files.length > 0) {
            formData.append('cover', cover.files[0]);
        } else {
            console.error("Either 'cover' is null or undefined, or it doesn't have files.");
        }


        try {
            const response = await fetch('/auth/add-music', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit music');
            }

            const data = await response.json();
            console.log('Music submitted successfully', data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

function validateForm(): boolean {
    const typeInput = document.getElementById('type') as HTMLSelectElement;
    const albumNameInput = document.getElementById('albumName') as HTMLInputElement;
    const genreInput = document.getElementById('genre') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const coverInput = document.getElementById('cover') as HTMLInputElement;

    const typeMessage = document.getElementById('typeMessage') as HTMLDivElement;
    const albumNameMessage = document.getElementById('albumNameMessage') as HTMLDivElement;
    const genreMessage = document.getElementById('genreMessage') as HTMLDivElement;
    const descriptionMessage = document.getElementById('descriptionMessage') as HTMLDivElement;
    const coverMessage = document.getElementById('coverMessage') as HTMLDivElement;

    let isValid = true;

    if (typeInput.value === '') {
        typeMessage.innerText = 'Type is required.';
        isValid = false;
    } else {
        typeMessage.innerText = '';
    }

    if (albumNameInput.value === '') {
        albumNameMessage.innerText = 'Name is required.';
        isValid = false;
    } else {
        albumNameMessage.innerText = '';
    }

    if (genreInput.value === '') {
        genreMessage.innerText = 'Genre is required.';
        isValid = false;
    } else {
        genreMessage.innerText = '';
    }

    if (descriptionInput.value === '') {
        descriptionMessage.innerText = 'Description is required.';
        isValid = false;
    } else {
        descriptionMessage.innerText = '';
    }

    if (coverInput.files && coverInput.files.length === 0) {
        coverMessage.innerText = 'Cover image is required.';
        isValid = false;
    } else {
        coverMessage.innerText = '';
    }

    return isValid;
}
