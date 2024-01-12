const contentContainer = document.getElementById('contentContainer') as HTMLDivElement
const emailRegexArtist = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const logoutBtn = document.getElementById('logoutBtn') as HTMLDivElement

logoutBtn.addEventListener('click', async (event) => {
    await fetch('/logout')
    window.location.replace("/auth/admin/login");
})

const run = async () => {
    const response = await fetch('/artists', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    const artistArr = await response.json()
    let str = ""
    artistArr.forEach((artist) => {
        str += `<div class="h-20 border-b border-slate-500 flex justify-between shadow-sm contentItem"><div class="flex flex-col justify-center px-5"><h2 class="text-xl">${artist.name} - ${artist.email}</h2><p class="text-md text-center text-violet-900">${artist._id.toString()}</p></div><div class="flex mr-4"><img src="/images/pencil-purp.svg" alt="" class="w-8 mx-2"><img src="/images/delete-icon.svg" alt="" class="w-8 mx-2"></div></div><div class="border-b border-slate-950 flex-col hidden"><form class="flex w-full items-center justify-center gap-4 mt-2"><input type="email" placeholder="Email" class="h-10 px-2 rounded-sm shadow-md"><input type="text" placeholder="New Password" class="h-10 px-2 rounded-sm shadow-md"><button type="submit" class="bg-purple-800 h-10 pb-1 px-3 rounded-lg text-slate-50">Send</button></form><div class="italic text-red-800 text-center mt-1">*Leave unchanged fields empty</div></div>`
    })

    contentContainer.innerHTML = str

    const contentArr = document.querySelectorAll('.contentItem')
    // add event listeners for the delete icons
    contentArr.forEach(contentTab => {
        const button = (contentTab.lastChild as any).lastChild
        button.addEventListener('click', (event) => {
            const ans = confirm('Are you sure you want to delete the specified artist?')
            if (!ans) return
            contentTab.remove()
            const id = (contentTab.firstChild as any).lastChild.innerText.trim()
            fetch('/artists/' + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })

    // add event listeners for the pencil icons
    contentArr.forEach(contentTab => {
        const button = (contentTab.lastChild as any).firstChild
        const formContainer = (contentTab.nextSibling as any)
        button.addEventListener('click', (event) => {
            contentTab.classList.toggle('border-b')
            formContainer.classList.toggle('hidden')
            formContainer.classList.toggle('flex')
        })
        const formEl = formContainer.firstChild

        formEl.addEventListener('submit', async (event) => {
            event.preventDefault()
            const emailEl = formEl.firstChild
            const passwordEl = emailEl.nextSibling
            const id = (contentTab.firstChild as any).lastChild.innerText.trim()

            let updateBody
            if (emailEl.value === "" && passwordEl.value === "") {
                return
            } else if (emailEl.value === "") {
                updateBody = { password: passwordEl.value.trim() }
            } else if (!emailRegexArtist.test(emailEl.value)) {
                return
            } else if (passwordEl.value === "") {
                updateBody = { email: emailEl.value.trim() }
            } else {
                updateBody = {
                    email: emailEl.value,
                    password: passwordEl.value
                }
            }
            console.log(updateBody)
            const response = await fetch('/artists/' + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateBody)
            })
            const data = await response.json()

            if (updateBody.email) {
                const h2El = contentTab.firstChild?.firstChild
                const tempArr = h2El?.textContent?.split('-')!
                const finalStr = tempArr[0].trim() + " - " + data.email;
                (h2El as Node).textContent = finalStr
            }
        })
    })
}

run()