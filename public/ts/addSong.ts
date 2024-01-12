document.getElementById('add').addEventListener('click', async (event) => {
    try {
        event.preventDefault();

        // Extract album ID from the URL
        const urlParts: string[] = window.location.pathname.split('/');
        const albumId: string = urlParts[urlParts.length - 1];

        const formData = new FormData(document.querySelector('form') as HTMLFormElement);

        const response = await fetch(`http://localhost:3000/albums/songs/${albumId}`, {
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

            throw new Error(`Failed to add song. Status: ${response.status}, Message: ${errorMessage}`);
        }

        const result = await response.json();
        console.log('Song added successfully:', result);
        alert('Song Added Successfully');

    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors or display an error message to the user
    }
});
