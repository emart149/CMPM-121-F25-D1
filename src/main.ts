//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <button id="increment">THROW 🍅</button>
`;
//<p>Example img: <img src="${exampleIconUrl}" class="icon" /></p>
//<p>Tomatoes Thrown: <span id="counter">0</span></p>

const button = document.getElementById("increment")!;
const counterElement = document.createElement("div");
counterElement.textContent = "0 Tomatoes Thrown";
document.body.appendChild(counterElement);

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = `${counter} Tomatoes Thrown`;
  //console.log("I have these thingies:", button, counterElement, counter);
});

// deno-lint-ignore no-unused-vars
const audienceInterval = setInterval(audienceMember, 1000);

function audienceMember() {
  counter++;
  counterElement.textContent = `${counter} Tomatoes Thrown`;
}
