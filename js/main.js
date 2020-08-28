const result = document.querySelector(".result");
const copy = document.querySelector(".copy");
const length = document.querySelector(".length-input");
const uppercase = document.querySelector(".upper-case");
const lowercase = document.querySelector(".lower-case");
const numbers = document.querySelector(".numbers");
const symbols = document.querySelector(".symbols");
const generate = document.querySelector("#generate");
let total = 0;
let randomFunction = [];

function randomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function randomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function randomSymbol() {
  const symbolList = "~!@#$%^&*()_-={[}]:;+,.?/";
  return symbolList[Math.floor(Math.random() * symbolList.length)];
}

function showAlert(message, color) {
  result.innerHTML = message;
  result.classList.add("alert");
  result.style.background = color;
  copy.style.color = "whitesmoke";
  setTimeout(() => {
    result.classList.remove("alert");
    result.innerHTML = "";
    result.style.background = "";
    copy.style.color = "rgb(158, 158, 158)";
  }, 1500);
}

function copyPassword() {
  if (result.innerHTML !== "" && result.innerHTML.length < 21) {
    dummytext = document.createElement("textarea");
    dummytext.textContent = result.innerHTML;
    document.body.appendChild(dummytext);
    dummytext.select();
    document.execCommand("copy");
    document.body.removeChild(dummytext);
    showAlert("Copied!", "rgb(67, 180, 22)");
  } else {
    showAlert("Nothing to copy!", "rgb(190, 14, 14)");
  }
}

uppercase.addEventListener("click", () => {
  if (uppercase.classList.contains("active")) {
    uppercase.classList.remove("active");
    randomFunction = randomFunction.filter((task) => task != randomUpperCase);
    total--;
  } else {
    uppercase.classList.add("active");
    randomFunction.push(randomUpperCase);
    total++;
  }
});

lowercase.addEventListener("click", () => {
  if (lowercase.classList.contains("active")) {
    lowercase.classList.remove("active");
    randomFunction = randomFunction.filter((task) => task != randomLowerCase);
    total--;
  } else {
    lowercase.classList.add("active");
    randomFunction.push(randomLowerCase);
    total++;
  }
});

numbers.addEventListener("click", () => {
  if (numbers.classList.contains("active")) {
    numbers.classList.remove("active");
    randomFunction = randomFunction.filter((task) => task != randomNumber);
    total--;
  } else {
    numbers.classList.add("active");
    randomFunction.push(randomNumber);
    total++;
  }
});

symbols.addEventListener("click", () => {
  if (symbols.classList.contains("active")) {
    symbols.classList.remove("active");
    randomFunction = randomFunction.filter((task) => task != randomSymbol);
    total--;
  } else {
    symbols.classList.add("active");
    randomFunction.push(randomSymbol);
    total++;
  }
});

generate.addEventListener("click", (e) => {
  let password = "";
  e.preventDefault();
  if (length.value <= 20 && length.value >= 1) {
    if (randomFunction.length > 0) {
      for (let i = 0; i < length.value; i++) {
        let randomCall = Math.floor(Math.random() * total);
        password += randomFunction[randomCall]();
      }
      result.innerHTML = password;
    } else {
      showAlert("Select a password requirement", "rgb(190, 14, 14)");
    }
  } else if (length.value === "") {
    showAlert("Please enter the length", "rgb(190, 14, 14)");
  } else {
    showAlert("Enter a length between 1 and 20", "rgb(190, 14, 14)");
  }
});

copy.addEventListener("click", () => {
  copyPassword();
});
