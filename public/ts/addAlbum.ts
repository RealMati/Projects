(document.getElementById('add') as HTMLButtonElement).addEventListener('click', async (event: Event) => {
    try {
        event.preventDefault();

        const formData = new FormData(document.querySelector('form') as HTMLFormElement);
        const albumNameField = document.getElementById('albumNameEl') as HTMLInputElement
        const albumGenreField = document.getElementById('albumGenreEl') as HTMLInputElement

        if (!albumNameField.value) {
            alert('Name can not be empty')
            return
        }
        if (!albumGenreField.value) {
            alert('Genre field can not be empty')
            return
        }

        const fileName = (formData.get('albumArt') as any).name
        if (!fileName) {
            alert('Please enter a file')
            return
        }
        const arr = fileName.split('.')
        if (arr[arr.length - 1] !== 'png' && arr[arr.length - 1] !== 'jpeg' && arr[arr.length - 1] !== 'jpg') {
            alert('Only .png, .jpeg and .jpg files are acceptable')
            return
        }

        const response = await fetch('http://localhost:3000/albums', {
            method: 'POST',
            body: formData,
            headers: {
                // Add any necessary headers here
            },
        });

        if (!response.ok) {
            let errorMessage = 'Unknown error occurred';
            try {
                errorMessage = await response.text();
            } catch (error) {
                console.error('Error parsing error response:', error);
            }

            throw new Error(`Failed to add album. Status: ${response.status}, Message: ${errorMessage}`);
        }

        const result = await response.json();
        console.log('Album added successfully:', result);
        alert('Album Added Successfully');
        location.reload()

    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
});
