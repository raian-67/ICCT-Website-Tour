const form = document.querySelector('form')
const error_message = document.getElementById('error-message')

const firstname_input = document.getElementById('name')  
const email_input = document.getElementById('email') || document.getElementById('signup-email')
const password_input = document.getElementById('password') || document.getElementById('signup-password')

const isSignUpPage = firstname_input !== null;

form.addEventListener('submit', (e) => {
    let errors = []

    if (isSignUpPage) {
        errors = getsignupformerrors(firstname_input.value.trim(), email_input.value.trim(), password_input.value.trim())
        
        if (errors.length === 0) {
            e.preventDefault();
            
            localStorage.setItem('storedEmail', email_input.value.trim());
            localStorage.setItem('storedPassword', password_input.value.trim());
            localStorage.setItem('storedFirstName', firstname_input.value.trim());
            
            alert('Signup Successful! Moving to Login page...');
            window.location.href = "login.html"; 
            return;
        }
    } 
    else {
        errors = getloginformerrors(email_input.value.trim(), password_input.value.trim())

        if (errors.length === 0) {
            e.preventDefault();
            
            const savedEmail = localStorage.getItem('storedEmail');
            const savedPassword = localStorage.getItem('storedPassword');

            if (email_input.value.trim() === savedEmail && password_input.value.trim() === savedPassword) {
                alert(`Welcome back, ${localStorage.getItem('storedFirstName') || 'User'}! Login successful.`);
                
                window.location.href = "dashboard.html"; 
                return;
            } else {
                errors.push('Invalid credentials. Access Denied.');
            }
        }
    }

    if (errors.length > 0) {
        e.preventDefault()
        if (error_message) {
            error_message.innerText = errors.join('. ')
        } else {
            alert(errors.join('. '));
        }
    }
})

function getsignupformerrors(firstname, email, password) {
    let errors = []

    if (firstname === '' || firstname === null) { 
        errors.push('First name is required')
        if (firstname_input.parentElement) firstname_input.parentElement.classList.add('incorrect')
    }
    if (email === '' || email === null) { 
        errors.push('Email is required')
        if (email_input.parentElement) email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password === null) { 
        errors.push('Password is required')
        if (password_input.parentElement) password_input.parentElement.classList.add('incorrect')
    }
    if (password && password.length < 8) {
        errors.push('Password must be at least 8 characters long')
        if (password_input.parentElement) password_input.parentElement.classList.add('incorrect') 
    }

    return errors;
}

function getloginformerrors(email, password) {
    let errors = []

    if (email === '' || email === null) { 
        errors.push('Email is required')
        if (email_input.parentElement) email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password === null) { 
        errors.push('Password is required')
        if (password_input.parentElement) password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

const allinputs = [firstname_input, email_input, password_input].filter(input => input !== null)
allinputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement && input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            if (error_message) error_message.innerText = ''
        }
    })
})
