// deno-lint-ignore-file no-unused-vars prefer-const
import tomatoEmoji from "./Tomato-Emoji.png";
import "./style.css";
const canvas = document.getElementById("canvas")!;
const centerX = globalThis.innerWidth / 2;
const centerY = globalThis.innerHeight / 2;

let decimalCounter = 999;
let multiplier: number = 0;
let multiplierStr: string = "0";

document.body.innerHTML = `
  <button id="increment"></button>
  <button id="upgradeOne"></button>
  <button id="upgradeTwo"></button>
  <button id="upgradeThree"></button>
 
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  element: HTMLButtonElement;
  active: boolean;
}

const availableItems: Item[] = [
  {
    name: "Hater 😠: ",
    cost: 10,
    rate: 0.1,
    count: 0,
    element: document.getElementById("upgradeOne") as HTMLButtonElement,
    active: false,
  },
  {
    name: "Angry Mob 👨‍🌾: ",
    cost: 100,
    rate: 2,
    count: 0,
    element: document.getElementById("upgradeTwo") as HTMLButtonElement,
    active: false,
  },
  {
    name: "Twitter Users🤳: ",
    cost: 1000,
    rate: 50,
    count: 0,
    element: document.getElementById("upgradeThree") as HTMLButtonElement,
    active: false,
  },
];

for (const curItem of availableItems) {
  curItem.element.innerHTML = `${curItem.name} ${
    curItem.count.toFixed(2)
  } <br>  cost:${curItem.cost.toFixed(2)} 🍅 `;

  curItem.element.disabled = true;

  curItem.element.onclick = () => {
    decimalCounter -= curItem.cost;
    curItem.cost = curItem.cost * 1.15;
    curItem.count++;
    multiplier += curItem.rate;

    curItem.element.innerHTML = `${curItem.name} ${
      curItem.count.toFixed(2)
    } <br>  cost:${curItem.cost.toFixed(2)} 🍅 `;

    multiplierElement.textContent = `Tomato Throwing Rate: ${
      multiplier.toFixed(2)
    } 🍅/sec `;
  };
}
const counterElement = document.createElement("div");
counterElement.textContent = "0 Tomatoes Thrown";
const multiplierElement = document.createElement("div");
multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;
const button = document.getElementById("increment")!;
button.style.backgroundImage = `url(${tomatoEmoji})`;
button.style.backgroundSize = "contain";
button.style.backgroundRepeat = "no-repeat";
button.style.backgroundPosition = "center";
button.style.backgroundColor = "transparent";
button.style.position = "absolute";
button.style.top = "250px";
button.style.left = "550px";
button.style.border = "none";
button.style.padding = "0";
button.style.width = "200px";
button.style.height = "100px";

counterElement.style.position = "absolute";
counterElement.style.top = `${centerY + 75}px`;
counterElement.style.left = `${centerX - 70}px`;
document.body.appendChild(counterElement);

multiplierElement.style.position = "absolute";
multiplierElement.style.top = `${centerY + 100}px`;
multiplierElement.style.left = `${centerX - 90}px`;
document.body.appendChild(multiplierElement);

button.addEventListener("click", () => {
  decimalCounter += 1;
});

let deltaTime: number = performance.now();
let lastTime: number = 0;

function increaseCounter(clock: number) {
  for (let thisItem of availableItems) {
    if (decimalCounter < thisItem.cost) {
      thisItem.element.disabled = true;
    } else {
      thisItem.element.disabled = false;
    }
  }
  //console.log("decCtr: " + availableItems[0].name);
  deltaTime = clock - lastTime;
  //  console.log(": " + );
  //console.log("clock: " + clock);
  //console.log("lastTime: " + lastTime);
  lastTime = performance.now();
  //console.log("decCounterBef: " + decimalCounter);

  decimalCounter += (deltaTime / 1000) * multiplier;

  counterElement.textContent = `${decimalCounter.toFixed(2)} Tomatoes Thrown`;
  //console.log("decCtrafter: " + decimalCounter);

  requestAnimationFrame(increaseCounter);
}

requestAnimationFrame(increaseCounter);

const audienceInterval = setInterval(displayCounter, 10);

function displayCounter() {
  counterElement.textContent = `${decimalCounter.toFixed(2)} Tomatoes Thrown`;
}
