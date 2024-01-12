const formElSUA = document.getElementById('form') as HTMLFormElement
const emailFieldSUA = document.getElementById('email') as HTMLInputElement
const passwordFieldSUA = document.getElementById('password') as HTMLInputElement
const passwordFieldSU2A = document.getElementById('password2') as HTMLInputElement
const emailRegexA = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

formElSUA.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    if (!passwordFieldSUA || !passwordFieldSU2A || passwordFieldSUA.value.length < 6 || passwordFieldSUA.value !== passwordFieldSU2A.value || !emailRegexA.test(emailFieldSUA.value)) {
        // add UI indicator
        alert('Input Email or Password is invalid')
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