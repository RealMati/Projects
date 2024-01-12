const formEl = document.getElementById('form') as HTMLFormElement
const emailFieldEl = document.getElementById('email') as HTMLInputElement
const passwordFieldEl = document.getElementById('password') as HTMLInputElement
const emailRegexL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

formEl.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    if (passwordFieldEl.value.trim().length < 6) {
        alert('Password length must be atleast 6')
        return
    }
    if (!emailRegexL.test(emailFieldEl.value)) {
        alert('Please enter a valid email')
        return
    }
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
    if (response.ok) {
        window.location.replace('/albums/manage')
    } else {
        alert('Incorrect username or password')
    }
})