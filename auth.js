const form = document.querySelector('form')
const firstname_input = document.getElementById('#firstname-input')  
const email_input = document.getElementById('#email-input')
const password_input = document.getElementById('#password-input')
const error_message = document.getElementById('#error-message')

form.addEventListener('submit', (e) => {
   

 let errors = []

 if (firstname_input.value.trim() === '') {
    // if we have a first name to input and then we are in the signup67
    errors = getsignupformerrors('Firstname_input.value, email_input.value, password_input.value')
 } 
 else{
    // if we don't have a first name input then we are in the login67
    errors = getloginformerrors('email_input.value, password_input.value')

 }
 if(error.lenght > 0 ) {
    // if there is any errors67
    e.preventDefault()
    error_message.innerText = errors.join('. ')
 }

})

function getsignupformerrors(firstname, email, password) {
    let errors = []

    if (firstname === '' || firstname === null) { 
        errors.push('First name is required')
        firstname_input.parentElement.classList.add('incorrect')
    }

    if (email === '' || email === null) { 
        errors.push('email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if (password === '' || password === null) { 
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 8) {
        errors.push('Password must be at least 8 characters long')
        password.input.parentElement.classList.add('incorrect')
    }

    return errors;
}

function getloginformerrors(email, password) {
    let errors = []

    if (email === '' || email === null) { 
        errors.push('email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if (password === '' || password === null) { 
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

const allinputs = [firstname_input, email_input, password_input].filter(input => input !== null)

allinputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentelement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})
