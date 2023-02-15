const contactForm = document.querySelector("#contactForm");
const requestRecordForm = document.querySelector("#requestRecordForm");
const fullnameField = document.querySelector('#fullname');
const telField = document.querySelector("#tel");
const emailField = document.querySelector("#email");
const dateField = document.querySelector("#date");
const timeField = document.querySelector("#time");
const subjectField = document.querySelector("#subject");
const submitBtn = document.querySelector("#submitBtn");

const enableSubmitBtn = () => {
    if (fullnameField.value.length > 0 && telField.value.length >= 9 && (validateEmail(emailField.value) || emailField.value.length == 0)) {
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
}

const onlyNumberKey = (evt) => {
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

const postContactForm = async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    let contactFormDetails = {
        fullname: fullnameField.value,
        tel: telField.value,
        email: emailField.value,
        subject: subjectField.value,
    }
    let url = 'http://localhost:3000/contactForms';
    try {
        let resp = await axios.post(url, contactFormDetails);
        alert('הטופס נשלח בהצלחה');
        window.location.href = "/";
    }
    catch (err) {
        console.log(err);
    }
}

const postRequestRecordForm = async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    let requestRecordFormDetails = {
        fullname: fullnameField.value,
        tel: telField.value,
        email: emailField.value,
        date: dateField.value,
        time: timeField.value,
    }
    let url = 'http://localhost:3000/requestRecordForms';
    try {
        let resp = await axios.post(url, requestRecordFormDetails);
        alert('הטופס נשלח בהצלחה');
        window.location.href = "/";
    }
    catch (err) {
        console.log(err);
    }
}