// Function to fetch albums from the backend
async function fetchAlbums() {
    try {
      const response = await fetch('http://localhost:3000/albums');
      console.log('Response:', response);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch albums. Status: ${response.status}`);
      }
  
      const albums = await response.json();
      return albums;
    } catch (error) {
      console.error('Error fetching albums:', error.message);
      return [];
    }
  }
  
  
  // Function to render albums in the UI
  function renderAlbums(albums) {
    const mainContainer = document.getElementById('albumContainer');
  
    // Clear existing content in the container
    mainContainer.innerHTML = '';
  
    // Iterate through each album and create a card for it
    albums.forEach((album) => {
      const albumCard = document.createElement('div');
      albumCard.classList.add('music-card');
  
      albumCard.innerHTML = `
        <div>
          <h2>${album.title}</h2>
          <p>Genre: ${album.genre}</p>
          <p>Description: ${album.description}</p>
          <p>Date: ${new Date(album.date).toLocaleDateString()}</p>
          <img src="${album.albumArtPath}" alt="${album.title}" />
        </div>
      `;
  
      // Append the album card to the main container
      mainContainer.appendChild(albumCard);
    });
  }
  
  // Event listener for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', async () => {
    const albums = await fetchAlbums();
    renderAlbums(albums);
  });
  