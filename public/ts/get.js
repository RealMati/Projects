// Function to fetch albums from the backend
async function fetchAlbums() {
  try {
      const response = await fetch('http://localhost:3000/albums');
      console.log('Response:', response);

      if (!response.ok) {
          throw new Error(`Failed to fetch albums. Status: ${response.status}`);
      }

      const albums = await response.json();

      // Fetch album art separately for each album
      const albumsWithArt = await Promise.all(albums.map(async (album) => {
          const artResponse = await fetch(`http://localhost:3000/images/${album._id}`);
          if (artResponse.ok) {
              const artData = await artResponse.json();
              album.albumArtPath = artData.albumArtPath;
          }
          return album;
      }));

      return albumsWithArt;
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
          <img src="${album.albumArtPath}" alt="${album.title}" />
              <h2>${album.title}</h2>
              <p>Genre: ${album.genre}</p>
              <p>Description: ${album.description}</p>
              <p type="date">Date: ${Date(album.Date)}</p>
             

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