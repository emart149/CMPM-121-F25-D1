//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// deno-lint-ignore no-unused-vars
const counter = 0;
let decimalCounter = 0;
let decimalCounterStr: string;

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
  decimalCounter += 1;
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  //console.log("I have these thingies:", button, counterElement, counter);
});

/*const audienceInterval = setInterval(audienceMember, 1000);

function audienceMember() {
  counter++;
  counterElement.textContent = `${counter} Tomatoes Thrown`;
}*/

const fpsDisplay = document.createElement("div");
//fpsDisplay.textContent = `0 FPS`;
document.body.appendChild(fpsDisplay);

let deltaTime: number = performance.now();
let lastTime: number = 0;

function gatherRate(clock: number) {
  deltaTime = clock - lastTime;
  //fpsDisplay.textContent = `${deltaTime} FPS`;
  lastTime = performance.now();

  decimalCounter += deltaTime / 1000;
  decimalCounterStr = decimalCounter.toFixed(2);
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  //fpsDisplay.textContent = `${testCounterStr} testCounter`;
  requestAnimationFrame(gatherRate);
}

requestAnimationFrame(gatherRate);
