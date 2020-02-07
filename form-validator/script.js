const form = document.getElementById('form');
const allInputs = form.querySelectorAll('input');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
// const formControl = form.querySelectorAll('.form-control');

const formValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const showErrorHandler = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

const showSuccessHandler = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const getFieldName = (input) => {
    if (typeof input.id !== 'string') return '';
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequiredHandler = (inputs) => {
    for (let input of inputs) {
        if (input.value.trim() === '') {
            const message = `${getFieldName(input)} is required`;
            showErrorHandler(input, message);
        } else {
            showSuccessHandler(input)
        }
    }
};

const checkEmailHandler = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = re.test(String(input.value.trim()).toLowerCase());
    if (isEmail) {
        formValue[input.id] = input.value;
        showSuccessHandler(input);
    } else {
        const message = 'Email is not valid';
        showErrorHandler(input, message);
    }
};

const checkLength = (input, min, max) => {
    const inputVal = input.value;

    if (inputVal.length < min) {
        const message = `${getFieldName(input)} at least ${min} characters long.`;
        showErrorHandler(input, message)
    } else if (inputVal.length > max) {
        const message = `${getFieldName(input)} is maximum ${max} characters long.`;
        showErrorHandler(input, message)
    }
    else {
        formValue[input.id] = input.value;
        showSuccessHandler(input)
    }
};

const matchPassword = (input1, input2) => {
    const password = input1.value;
    const confirmPassword = input2.value;

    if (password !== confirmPassword) {
        showErrorHandler(input2, 'Password do not match');
    } else {
        formValue[input2.id] = confirmPassword
    }
};

document.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequiredHandler(allInputs);
    checkEmailHandler(email);
    checkLength(username, 3, 10);
    checkLength(password, 6, 25);
    matchPassword(password, confirmPassword);

    if (formValue.username && formValue.email && formValue.password && formValue.confirmPassword) {
        console.log(formValue);
    }
});