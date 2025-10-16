//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// deno-lint-ignore no-unused-vars
const counter = 0;
let decimalCounter = 0;
let decimalCounterStr: string = "0";
let multiplier: number = 0;
let upgradeOneActive = false;

document.body.innerHTML = `
  <button id="increment">THROW 🍅</button>
  <button id="autoIncrement">Upgrade 1: 10 🍅 </button>
  
`;
//<p>Example img: <img src="${exampleIconUrl}" class="icon" /></p>
//<p>Tomatoes Thrown: <span id="counter">0</span></p>

const counterElement = document.createElement("div");
counterElement.textContent = "0 Tomatoes Thrown";
const button = document.getElementById("increment")!;
document.body.appendChild(counterElement);

const autoIncrementButton = document.getElementById(
  "autoIncrement",
) as HTMLButtonElement;
autoIncrementButton.disabled = true;

button.addEventListener("click", () => {
  decimalCounter += 1;
  decimalCounterStr = decimalCounter.toFixed(2);
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  if (decimalCounter > 9) {
    autoIncrementButton.disabled = false;
  }
  //console.log("I have these thingies:", button, counterElement, counter);
});

/*const audienceInterval = setInterval(audienceMember, 1000);

function audienceMember() {
  counter++;
  counterElement.textContent = `${counter} Tomatoes Thrown`;
}*/

let deltaTime: number = performance.now();
let lastTime: number = 0;

function gatherRate(clock: number) {
  if (decimalCounter < 10) {
    autoIncrementButton.disabled = true;
  } else {
    autoIncrementButton.disabled = false;
  }
  console.log("decCtr: " + decimalCounter);
  deltaTime = clock - lastTime;
  lastTime = performance.now();

  decimalCounter += (deltaTime / 1000.00000) * multiplier;

  decimalCounterStr = decimalCounter.toFixed(2);
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  requestAnimationFrame(gatherRate);
}

autoIncrementButton.addEventListener("click", () => {
  decimalCounter -= 10;
  multiplier++;
  lastTime = performance.now();
  if (!upgradeOneActive) {
    requestAnimationFrame(gatherRate);
    upgradeOneActive = true;
  }
});

// deno-lint-ignore no-unused-vars
const audienceInterval = setInterval(displayCounter, 10);

function displayCounter() {
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
}
