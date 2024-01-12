(document.getElementById('addSongForm') as HTMLFormElement).addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        // Extract album ID from the URL
        const urlParts: string[] = window.location.pathname.split('/');
        const albumId: string = urlParts[urlParts.length - 1];
        const nameField = document.getElementById('songNameEl') as HTMLInputElement

        const formData = new FormData(document.querySelector('form') as HTMLFormElement);
        if (!nameField.value) {
            alert('Name can not be empty')
            return
        }
        const fileName = (formData.get('song') as any).name
        if (!fileName) {
            alert('Please enter a file')
            return
        }
        const arr = fileName.split('.')
        if (arr[arr.length - 1] !== 'mp3' && arr[arr.length - 1] !== 'wav') {
            alert('Only .mp3 and .wav files are acceptable')
            return
        }
        const response = await fetch(`http://localhost:3000/albums/songs/${albumId}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            let errorMessage = 'Unknown error occurred';
            try {
                errorMessage = await response.text();
            } catch (error) {
                console.error('Error parsing error response:', error);
            }

            throw new Error(`Failed to add song. Status: ${response.status}, Message: ${errorMessage}`);
        }

        const result = await response.json();
        console.log('Song added successfully:', result);
        alert('Song Added Successfully');
        location.reload()

    } catch (error) {
        console.error('Error:', error.message);
    }
});
