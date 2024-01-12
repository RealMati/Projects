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

    // Loading songs into the page
    const trackContainer = document.getElementById('tracks') as HTMLDivElement
    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1].slice(0, 24)

    const songRes = await fetch('/albums/songs/' + id)
    const songs = await songRes.json()
    let str = ""
    songs.forEach(song => {
        // audio file path
        const arr = song.filePath.split('\\')
        const path = "/" + arr[1] + "/" + arr[2]

        str += `<div class="rounded-[5px] border-2 border-white flex flex-wrap justify-between items-center py-2 px-5 hover:bg-neutral-900 hover:bg-opacity-35"><div class="flex gap-4 items-center"><img src="/images/albumPlaceholder.png" alt="Album Art for the Track" class="h-10"><p class="text-lg">${song.name}</p></div><audio src="${path}" controls class="bg-purple-500 rounded-md w-full my-1 md:my-0 md:w-fit"></audio></div>`
        console.log(path)
    })
    trackContainer.innerHTML = str
})