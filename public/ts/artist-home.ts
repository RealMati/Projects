document.addEventListener('DOMContentLoaded', async () => {
    // toHome and logout functionality
    const toHome = document.getElementById('toHome') as HTMLDivElement
    const toLogout = document.getElementById('toLogout') as HTMLDivElement

    toHome.addEventListener('click', () => {
        window.location.replace('/albums/manage')
    })

    toLogout.addEventListener('click', () => {
        window.location.replace('/logout')
    })

    // adding albums into the page
    const albumContainer = document.getElementById('albumContainer') as HTMLDivElement

    const albumRes = await fetch('/albums/published')

    const albums = await albumRes.json()
    console.log(albums)
    let str = ""
    albums.forEach(album => {
        // audio file path
        let path = '/images/albumPlaceholder.png'
        if (album.albumArtPath) {
            const arr = album.albumArtPath.split('\\')
            path = "/" + arr[1] + "/" + arr[2]
        }
        console.log(path)
        str += `<div class="album" data-album-id="${album._id}"><img src="${path}" alt="${album.title}"/><h2>${album.title}</h2><p>Genre: ${album.genre}</p><p>Description: ${album.description}</p><p type="date">Date: ${new Date(album.date).toLocaleDateString()}</p></div>`;
    })
    albumContainer.innerHTML = str

    albumContainer.childNodes.forEach(albumEl => {
        albumEl.addEventListener('click', () => {
            window.location.replace('/albums/info/' + (albumEl as HTMLElement).getAttribute('data-album-id'))
        })
    })
})