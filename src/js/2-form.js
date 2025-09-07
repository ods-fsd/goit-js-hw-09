const formData = {
  email: "",
  message: ""
};

const form = document.querySelector('.form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const storageKey = "feedback-form-state";


function loadFromStorage() {
  try {
    const serializedState = localStorage.getItem(storageKey);
    if (serializedState) {
      const parsedState = JSON.parse(serializedState);
      formData.email = parsedState.email || "";
      formData.message = parsedState.message || "";
      emailInput.value = formData.email;
      messageTextarea.value = formData.message;
    }
  } catch (error) {
    console.error("Помилка завантаження зі сховища:", error);
  }
}

document.addEventListener('DOMContentLoaded', loadFromStorage);


function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

form.addEventListener('input', handleInput);


function handleSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Дані форми:", formData);


  localStorage.removeItem(storageKey);
  formData.email = "";
  formData.message = "";
  form.reset();
}

form.addEventListener('submit', handleSubmit);