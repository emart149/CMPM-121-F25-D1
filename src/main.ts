// deno-lint-ignore-file no-unused-vars prefer-const
//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

const counter = 0;
let decimalCounter = 0;
let decimalCounterStr: string = "0";
let multiplier: number = 0;
let multiplierStr: string = "0";
let upgradeOneActive = false;
let upgradeOneCost = 10;
let upgradeOneCount = 0;
let upgradeTwoActive = false;
let upgradeTwoCost = 100;
let upgradeTwoCount = 0;
let upgradeThreeActive = false;
let upgradeThreeCost = 1000;
let upgradeThreeCount = 0;

document.body.innerHTML = `
  <button id="increment">THROW 🍅</button>
  <button id="upgradeOne">Upgrade One: ${upgradeTwoCount}   cost: 10 🍅 </button>
  <button id="upgradeTwo">Upgrade Two: ${upgradeTwoCount}   cost: 100 🍅 </button>
  <button id="upgradeThree">Upgrade Three: ${upgradeTwoCount}   cost:  1000 🍅 </button>

  
`;
//<p>Example img: <img src="${exampleIconUrl}" class="icon" /></p>
//<p>Tomatoes Thrown: <span id="counter">0</span></p>

const counterElement = document.createElement("div");
counterElement.textContent = "0 Tomatoes Thrown";
const multiplierElement = document.createElement("div");
multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;
const button = document.getElementById("increment")!;
document.body.appendChild(counterElement);
document.body.appendChild(multiplierElement);

const upgradeOneButton = document.getElementById(
  "upgradeOne",
) as HTMLButtonElement;
upgradeOneButton.disabled = true;
upgradeOneButton.innerHTML =
  `Upgrade One: ${upgradeOneCount} <br>  cost: ${upgradeOneCost} 🍅 `;

const upgradeTwoButton = document.getElementById(
  "upgradeTwo",
) as HTMLButtonElement;
upgradeTwoButton.disabled = true;
upgradeTwoButton.innerHTML =
  `Upgrade Two: ${upgradeTwoCount} <br>  cost: ${upgradeTwoCost} 🍅 `;

const upgradeThreeButton = document.getElementById(
  "upgradeThree",
) as HTMLButtonElement;
upgradeThreeButton.disabled = true;
upgradeThreeButton.innerHTML =
  `Upgrade Three: ${upgradeThreeCount} <br>  cost:${upgradeThreeCost} 🍅 `;

button.addEventListener("click", () => {
  decimalCounter += 1;
  decimalCounterStr = decimalCounter.toFixed(2);
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  if (decimalCounter > 9) {
    upgradeOneButton.disabled = false;
  }
  if (decimalCounter > 99) {
    upgradeTwoButton.disabled = false;
  }
  if (decimalCounter > 999) {
    upgradeThreeButton.disabled = false;
  }
});

let deltaTime: number = performance.now();
let lastTime: number = 0;

function increaseCounter(clock: number) {
  if (decimalCounter < 10) {
    upgradeOneButton.disabled = true;
  } else {
    upgradeOneButton.disabled = false;
  }
  if (decimalCounter < 100) {
    upgradeTwoButton.disabled = true;
  } else {
    upgradeTwoButton.disabled = false;
  }
  if (decimalCounter < 1000) {
    upgradeThreeButton.disabled = true;
  } else {
    upgradeThreeButton.disabled = false;
  }
  //console.log("decCtr: " + decimalCounter);
  deltaTime = clock - lastTime;
  //  console.log(": " + );
  //console.log("clock: " + clock);
  //console.log("perfnow: " + performance.now());
  lastTime = performance.now();
  console.log("decCounterBef: " + decimalCounter);

  decimalCounter += (deltaTime / 1000) * multiplier;

  decimalCounterStr = decimalCounter.toFixed(2);
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
  console.log("decCtrafter: " + decimalCounter);

  requestAnimationFrame(increaseCounter);
}

upgradeOneButton.addEventListener("click", () => {
  decimalCounter -= 10;
  upgradeOneCount++;
  upgradeOneButton.innerHTML =
    `Upgrade One: ${upgradeOneCount} <br>  cost: ${upgradeOneCost} 🍅 `;
  multiplier += 0.1;
  multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;
  if (!upgradeOneActive) {
    lastTime = performance.now();
    console.log("LastTime in upgradeOne: " + lastTime);
    //what if just always reqAnimFrame but then let mutiplier decide if upgrade is on or off
    upgradeOneActive = true;
  }
});

upgradeTwoButton.addEventListener("click", () => {
  decimalCounter -= 100;
  multiplier += 2;
  upgradeTwoCount++;
  upgradeTwoButton.innerHTML =
    `Upgrade Two: ${upgradeTwoCount} <br>  cost: ${upgradeTwoCost} 🍅 `;
  multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;

  if (!upgradeTwoActive) {
    upgradeTwoActive = true;
  }
  if (!upgradeOneActive) {
    lastTime = performance.now();
  }
});

upgradeThreeButton.addEventListener("click", () => {
  decimalCounter -= 1000;
  multiplier += 50;
  upgradeThreeCount++;
  upgradeThreeButton.innerHTML =
    `Upgrade Three: ${upgradeThreeCount} <br>  cost: ${upgradeThreeCost} 🍅 `;

  multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;

  if (!upgradeThreeActive) {
    upgradeThreeActive = true;
  }
  if (!upgradeOneActive) {
    lastTime = performance.now();
  }
});

requestAnimationFrame(increaseCounter);

const audienceInterval = setInterval(displayCounter, 10);

function displayCounter() {
  counterElement.textContent = `${decimalCounterStr} Tomatoes Thrown`;
}
