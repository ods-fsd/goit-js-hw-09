const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';


const saveToLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};


const loadFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem(localStorageKey);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Failed to parse data from localStorage:', error);
    return null;
  }
};


const fillFormAndObject = () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    Object.assign(formData, savedData);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
};


// form.addEventListener('input', event => {
//   const { name, value } = event.target;
//   formData[name] = value.trim();
//   saveToLocalStorage();
// });


document.addEventListener('DOMContentLoaded', () => {
  fillFormAndObject();
});


form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);


  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});