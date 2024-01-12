document.getElementById('add').addEventListener('click', async (event: Event) => {
    try {
        event.preventDefault();

        const formData = new FormData(document.querySelector('form') as HTMLFormElement);

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

    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
});
