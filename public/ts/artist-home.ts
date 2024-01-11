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
    const nameInput: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement;
    const emailInput: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
    const nameError: HTMLElement | null = document.getElementById('nameError');
    const emailError: HTMLElement | null = document.getElementById('emailError');

    if (!nameInput || !emailInput || !nameError || !emailError) {
        console.error('All elements are required!');
        return false;
    }

    const name: string = nameInput.value.trim();
    const email: string = emailInput.value.trim();

    nameError.style.display = 'none';
    emailError.style.display = 'none';

    if (name === '') {
        nameError.textContent = 'Please enter a name.';
        nameError.style.display = 'block';
        return false; 
    }

    if (email === '') {
        emailError.textContent = 'Please enter an email address.';
        emailError.style.display = 'block';
        return false; 
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        return false; 
    }


    return true; 
}

function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
