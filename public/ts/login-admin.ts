const formElA = document.getElementById('form') as HTMLFormElement
const emailFieldElA = document.getElementById('email') as HTMLInputElement
const passwordFieldElA = document.getElementById('password') as HTMLInputElement

formElA.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    const response: any = await fetch('/auth/admin/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailFieldElA.value.trim(),
            password: passwordFieldElA.value.trim()
        })
    })
    if (response.status >= 400) {
        alert('Incorrect email or password')
        return
    }
    window.location.replace("/artists/manage");
})