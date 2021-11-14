const popupElement = document.querySelector('.popup');

const closeButton = document.querySelector('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

function popupOpen() {

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  popupElement.classList.add('popup_opened');
}

function popupClose() {
  popupElement.classList.remove('popup_opened');
}


const nameElement = document.querySelector('.profile__user-name');
const jobElement = document.querySelector('.profile__user-job');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()


// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.


    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;


    // Вставьте новые значения с помощью textContent
    nameElement.textContent = nameInputValue;
    jobElement.textContent = jobInputValue;

    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
