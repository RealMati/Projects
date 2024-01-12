const formElSU = document.getElementById('form') as HTMLFormElement
const nameFieldSU = document.getElementById('name') as HTMLInputElement
const emailFieldSU = document.getElementById('email') as HTMLInputElement
const passwordFieldSU = document.getElementById('password') as HTMLInputElement
const passwordFieldSU2 = document.getElementById('password2') as HTMLInputElement
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

formElSU.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    if (!passwordFieldSU.value || !passwordFieldSU2.value || passwordFieldSU.value.trim().length < 6) {
        alert('Password length must be atleast 6')
        return
    }
    if (passwordFieldSU.value !== passwordFieldSU2.value) {
        alert('Passwords do not match')
        return
    }
    if (!emailRegex.test(emailFieldSU.value)) {
        alert('Please enter a valid email')
        return
    }
    const body = {
        name: nameFieldSU.value,
        email: emailFieldSU.value,
        password: passwordFieldSU.value
    }
    const response: any = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        // redirect to site
        const response: any = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailFieldSU.value,
                password: passwordFieldSU.value
            })
        })
        window.location.replace('/albums/manage')
    }
})