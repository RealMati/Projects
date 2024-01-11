function submitMusic() {
    const type = document.getElementById('type').value;
    const albumName = document.getElementById('albumName').value;
    const genre = document.getElementById('genre').value;
    const description = document.getElementById('description').value;

    const coverImage = document.getElementById('cover').files[0];

    const formData = new FormData();
    formData.append('type', type);
    formData.append('albumName', albumName);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('cover', coverImage);

    fetch('/auth/submit-music', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit music');
            }
            return response.json();
        })
        .then(data => {
            console.log('Music submitted successfully', data);
            // Optionally, you can handle success, like showing a success message
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error, e.g., display an error message to the user
        });
}
