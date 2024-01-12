document.addEventListener('DOMContentLoaded', async () => {
    const trackContainer = document.getElementById('tracks') as HTMLDivElement

    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1].slice(0, 24)

    const songRes = await fetch('/albums/songs/' + id)
    const songs = await songRes.json()
    console.log(songs)
})