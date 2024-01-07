const formEl = document.getElementById('form') as HTMLFormElement
const emailFieldEl = document.getElementById('email') as HTMLInputElement
const passwordFieldEl = document.getElementById('password') as HTMLInputElement

formEl.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    const response: any = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailFieldEl.value,
            password: passwordFieldEl.value
        })
    })
})