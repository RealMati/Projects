(document.getElementById('saveButton') as HTMLButtonElement).addEventListener('click', async () => {
    try {
        // Extract album ID from the URL
        const urlParts = window.location.pathname.split('/');
        const albumId = urlParts[urlParts.length - 1];

        const formData = new FormData(document.getElementById('editAlbumForm') as HTMLFormElement);

        let obj: any = {}

        if (formData.get('title')) {
            obj["title"] = formData.get('title')
        }
        if (formData.get('genre')) {
            obj["genre"] = formData.get('genre')
        }
        if (formData.get('description')) {
            obj["description"] = formData.get('description')
        }

        console.log(`/albums/${albumId}`)
        console.log(obj)

        const response = await fetch(`/albums/${albumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error(`Failed to update album. Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Album updated successfully:', result);
        alert('Album saved successfully')
        location.reload()
    } catch (error) {
        console.error('Error updating album:', error.message);
    }
});