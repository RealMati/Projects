const formElSUA = document.getElementById('form') as HTMLFormElement
const emailFieldSUA = document.getElementById('email') as HTMLInputElement
const passwordFieldSUA = document.getElementById('password') as HTMLInputElement
const passwordFieldSU2A = document.getElementById('password2') as HTMLInputElement
const emailRegexA = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

formElSUA.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    if (!passwordFieldSUA.value || !passwordFieldSU2A.value || passwordFieldSUA.value.trim().length < 6) {
        alert('Password length must be atleast 6')
        return
    }
    if (passwordFieldSUA.value !== passwordFieldSU2A.value) {
        alert('Passwords do not match')
        return
    }
    if (!emailRegexA.test(emailFieldSUA.value)) {
        alert('Please enter a valid email')
        return
    }
    const body = {
        email: emailFieldSUA.value,
        password: passwordFieldSUA.value
    }
    const response: any = await fetch('/auth/admin/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (response.status === 201) {
        // redirect to site
        const response: any = await fetch('/auth/admin/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailFieldSUA.value,
                password: passwordFieldSUA.value
            })
        })
    }
    if (response.status >= 400) {
        alert('Incorrect email or password')
        return
    }
    window.location.replace("/artists/manage");
})