showLightBox = () => {
    document.querySelector('.lightBox').style.display = 'flex';
}

hideLightBox = () => {
    document.querySelector('.lightBox').style.display = 'none';
    feedback.style.display = 'none';
}

const signupForm = document.querySelector("#signupForm");
const signupFullNameField = document.querySelector("#signupFullName");
const signupEmailField = document.querySelector("#signupEmail");
const signupPasswordField = document.querySelector('#signupPassword');
const signupConfirmPasswordField = document.querySelector('#signupConfirmPassword');
const feedback = document.querySelector("#confirmPassword-feedback");
const signupNewsletterConfirmCheckbox = document.querySelector("#signupNewsletterConfirm");
const signupBtn = document.querySelector("#signupBtn");
const loginEmailField = document.querySelector("#loginEmail");
const loginPasswordField = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

const enableSignupSubmitBtn = () => {
    if (signupFullNameField.value != '' && validateEmail(signupEmailField.value) && signupPasswordField.value != ''
        && signupConfirmPasswordField.value != '') {
        signupBtn.disabled = false;
        if (signupPasswordField.value != signupConfirmPasswordField.value) {
            signupBtn.disabled = true;
            feedback.style.display = 'inline';
        }
        else {
            feedback.style.display = 'none';
        }
    }
    else {
        feedback.style.display = 'none';
        signupBtn.disabled = true;
    }
};

const enableLoginSubmitBtn = () => {
    if (validateEmail(loginEmailField.value) && loginPasswordField.value != '') {
        loginBtn.disabled = false;
    }
    else {
        loginBtn.disabled = true;
    }
};

const validateEmail = (inputValue) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputValue.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

const postUser = async (event) => {
    event.preventDefault();
    signupBtn.disabled = true;
    let userDetails = {
        fullname: signupFullNameField.value,
        email: signupEmailField.value,
        password: signupPasswordField.value,
        newsletterConfirm: signupNewsletterConfirmCheckbox.checked,
    }
    let url = 'users';
    try {
        let resp = await axios.post(url, userDetails);
        alert('ההרשמה בוצעה בהצלחה, נא הזינו את כתובת האימייל והסיסמה בחלון ההתחברות');
        window.location.href = "/";
    }
    catch (err) {
        console.log(err);
        if (err.response.data.code == 11000) {
            alert('כתובת האימייל קיימת במערכת, נא הזינו את כתובת האימייל והסיסמה בחלון ההתחברות');
            window.location.href = "/";
        }
    }
}

const postLogin = async (event) => {
    event.preventDefault();
    loginBtn.disabled = true;
    let loginDetails = {
        email: loginEmailField.value,
        password: loginPasswordField.value,
    }
    let url = 'users/login';
    try {
        let resp = await axios.post(url, loginDetails);
        localStorage.setItem('token', resp.data.token);
        receiveUserData();
        // alert('ההתחברות בוצעה בהצלחה');
        // window.location.href = "/";
    }
    catch (err) {
        console.log(err);
        alert('כתובת האימייל או הסיסמה שגויים');
    }
}

const receiveUserData = async () => {
    let url = 'users/userInfo';
    try {
        let resp = await axios.get(url, { headers: { 'x-api-key': localStorage.getItem('token') } });
        localStorage.setItem('name', resp.data.fullname.split(' ')[0]);
        location.reload();
    }
    catch (err) {
        console.log(err);
        alert('כתובת האימייל או הסיסמה שגויים');
    }
}

const receiveUserDataInAnotherPages = () => {
    if (localStorage.getItem('name') != null) {
        document.querySelector('#loginSignupLink').style.display = 'none';
        document.querySelector('#userName').style.display = 'inline';
        document.querySelector('#userName').innerHTML = 'שלום ' + localStorage.getItem('name');
        document.querySelector('#logoutBtn').style.display = 'inline';
    }
}

receiveUserDataInAnotherPages();

const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    location.reload();
}