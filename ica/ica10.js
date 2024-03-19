const button = document.querySelector("#button1");
button.addEventListener("click", changeText);

const heading = document.querySelector("h1");

function changeText() {
    heading.textContent = `Obviously`;
}

const x = document.querySelector(".button2");
x.addEventListener("click", changeBG);

function changeBG() {
    document.body.style.background = "rgb(155, 102, 102)";
}