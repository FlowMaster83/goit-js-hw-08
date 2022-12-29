import throttle from 'lodash.throttle';

const editedForm = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  editedForm[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(editedForm));
}

writeInForm();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(editedForm);
}

function writeInForm() {
  const values = localStorage.getItem(LOCALSTORAGE_KEY);
  let objectParse;
  try {
    objectParse = JSON.parse(values);
  } catch (error) {
    console.log(error.message);
  }

  if (values) {
    for (const key in objectParse) {
      let inputHTML = feedbackForm.querySelector(`[name="${key}"]`);
      inputHTML.value = objectParse[key];
    }
  }
}
