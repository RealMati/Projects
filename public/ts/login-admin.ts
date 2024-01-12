const formElA = document.getElementById('form') as HTMLFormElement
const emailFieldElA = document.getElementById('email') as HTMLInputElement
const passwordFieldElA = document.getElementById('password') as HTMLInputElement
const emailRegexAd = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

formElA.addEventListener('submit', async (event: Event) => {
    if (passwordFieldElA.value.trim().length < 6) {
        alert('Password length must be atleast 6')
        return
    }
    if (!emailRegexAd.test(emailFieldElA.value)) {
        alert('Please enter a valid email')
        return
    }
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