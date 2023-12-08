const formInput = document.querySelector(".form");
const inputDate = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

// When HTML loades
window.onload = () => {
  main();
};

const main = () => {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();

    // Call crror handle function
    if (!errorHandle()) {
      calculateAge(
        parseInt(inputYear.value),
        parseInt(inputMonth.value),
        parseInt(inputDate.value)
      );
    }
  });
};

// Error handle function
const errorHandle = () => {
  let isError = false;

  if (!checkRequiredField()) {
    isError = true;
  } else if (!checkValidDate()) {
    isError = true;
  } else if (
    parseInt(inputMonth.value) > 12 ||
    parseInt(inputMonth.value) <= 0
  ) {
    errorMessage("Must be a valid month", inputMonth);
    isError = true;
  } else if (parseInt(inputYear.value) > new Date().getUTCFullYear()) {
    errorMessage("Must be in the past", inputYear);
    isError = true;
  }

  return isError;
};

// Check required field
const checkRequiredField = () => {
  let filled = true;
  const inputs = [inputDate, inputMonth, inputYear];

  // Check required filed
  inputs.forEach((input) => {
    if (!parseInt(input.value)) {
      errorMessage("This field is required.", input);
      filled = false;
    } else {
      removeErrorMessage(input);
    }
  });

  return filled;
};

// Check valid date
const checkValidDate = () => {
  let isValid = true;
  const isLeapYear = parseInt(inputYear.value) % 4 === 0;
  const isFebrurary = parseInt(inputMonth.value) === 2;

  if (
    parseInt(inputDate.value) > 31 ||
    (isFebrurary && parseInt(inputDate.value) > 29)
  ) {
    errorMessage("Must be a valid date", inputDate);
    isValid = false;
  } else if (!isLeapYear && parseInt(inputDate.value) === 29) {
    errorMessage("Not a leap year", inputDate);
    isValid = false;
  } else if (
    isThirtyDays(
      parseInt(inputDate.value),
      parseInt(inputMonth.value),
      parseInt(inputYear.value)
    )
  ) {
    errorMessage("Must be a valid date", inputDate);
    isValid = false;
  }

  return isValid;
};

// Calculate age
const calculateAge = (givenYear, givenMonth, givenDate) => {
  const present = new Date();
  const presentYear = present.getUTCFullYear();
  const presentMonth = present.getMonth() + 1;
  const presentDate = present.getDate();
  let ageDate;
  let ageMonth;
  let ageYear;

  if (givenMonth > presentMonth) {
    ageYear = presentYear - givenYear - 1;
    ageMonth = presentMonth + 12 - givenMonth;
    if (givenDate > presentDate) {
      ageMonth = ageMonth - 1;
      ageDate = presentDate + 30 - givenDate;
    } else {
      ageDate = presentDate - givenDate;
    }
  } else if (givenDate > presentDate) {
    ageYear = presentYear - givenYear;
    ageMonth = presentMonth - givenMonth;
    if (ageMonth === 0) {
      ageYear = ageYear - 1;
      ageMonth = presentMonth + 11 - givenMonth;
    } else {
      ageMonth = presentMonth - givenMonth - 1;
    }
    ageDate = presentDate + 30 - givenDate;
  } else {
    ageYear = presentYear - givenYear;
    ageMonth = presentMonth - givenMonth;
    ageDate = presentDate - givenDate;
  }

  // Check if given month is thirty days or not
  const isThirty = isThirtyDays(givenYear, givenMonth, givenDate);

  if (isThirty) {
    ageDate = ageDate;
  } else if (givenMonth === 2) {
    ageDate = ageDate;
  } else {
    ageDate += 1;
  }

  // Show age
  showAge(ageYear, ageMonth, ageDate);
};

// Show age
const showAge = (year, month, date) => {
  const yearText = document.querySelector(".body-copy-years");
  const monthText = document.querySelector(".body-copy-months");
  const dateText = document.querySelector(".body-copy-days");

  yearText.innerText = year;
  monthText.innerText = month;
  dateText.innerText = date;
};

// Is thirty days
const isThirtyDays = (date, month, year) => {
  const birthDate = new Date(year, month, 0);

  let isThirtyDays = birthDate.getDate() === 30;

  return isThirtyDays && date > 30;
};

// Error message
const errorMessage = (msg, input) => {
  const inputContainer = input.parentElement;
  if (!inputContainer.querySelector(".error-message")) {
    const span = document.createElement("span");
    span.classList.add("error-message");
    span.innerText = msg;
    inputContainer.appendChild(span);
    inputContainer.querySelector("label").classList.add("error-color");
    inputContainer.querySelector("input").classList.add("error-border");
  }
};

// Remove error message
const removeErrorMessage = (input) => {
  const inputContainer = input.parentElement;
  if (inputContainer.querySelector(".error-message")) {
    inputContainer.querySelector(".error-message").remove();
    inputContainer.querySelector("label").classList.remove("error-color");
    inputContainer.querySelector("input").classList.remove("error-border");
  }
};
