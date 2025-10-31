// Program that makes an incremental style game in which the theme is based off of rottein tomatoes
//which are used to rate media by Elijah Martiniano 10/20/25.

// deno-lint-ignore-file prefer-const

//----Initiating Variables and Upgrade Objects/Buttons----
import tomatoEmoji from "./Tomato-Emoji.png";
import "./style.css";

const centerX = globalThis.innerWidth / 2;
const centerY = globalThis.innerHeight / 2;

let deltaTime: number = performance.now();
let lastTime: number = 0;

let decimalCounter = 0;
let multiplier: number = 0;

document.body.innerHTML = `
  <button id="increment"></button>
  <button id="upgradeOne"></button>
  <button id="upgradeTwo"></button>
  <button id="upgradeThree"></button>
  <button id="upgradeFour"></button>
  <button id="upgradeFive"></button>
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  element: HTMLButtonElement;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Audience Member 😠: ",
    cost: 10,
    rate: 0.1,
    count: 0,
    element: document.getElementById("upgradeOne") as HTMLButtonElement,
    description: "Self claimed film connosieur that throws 0.1 tomatoes/sec",
  },
  {
    name: "Angry Mob 👨‍🌾: ",
    cost: 100,
    rate: 2,
    count: 0,
    element: document.getElementById("upgradeTwo") as HTMLButtonElement,
    description: "Disapointed Theater Audience throws 2 tomatoes/sec",
  },
  {
    name: "Twitter Users🤳: ",
    cost: 1000,
    rate: 50,
    count: 0,
    element: document.getElementById("upgradeThree") as HTMLButtonElement,
    description:
      "The internet trolls begin to influence the public with 50 tomatoes/sec",
  },
  {
    name: "Critics 🔎: ",
    cost: 10000,
    rate: 100,
    count: 0,
    element: document.getElementById("upgradeFour") as HTMLButtonElement,
    description: "Critics have plunged reviews with 100 tomatoes/sec",
  },
  {
    name: "News Sources 📰: ",
    cost: 100000,
    rate: 500,
    count: 0,
    element: document.getElementById("upgradeFive") as HTMLButtonElement,
    description:
      "National news report box office preformance and throws 500 tomatoes/sec",
  },
];

//----Initializing Text Elements & tomato Icon----
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

const directions = document.createElement("div");
directions.textContent = "Click Tomato to throw!";
directions.style.position = "absolute";
directions.style.top = `${centerY - 100}px`;
directions.style.left = `${centerX - 70}px`;

const counterElement = document.createElement("div");
counterElement.textContent = "0 Tomatoes Thrown";
counterElement.style.position = "absolute";
counterElement.style.top = `${centerY + 75}px`;
counterElement.style.left = `${centerX - 70}px`;

const multiplierElement = document.createElement("div");
multiplierElement.textContent = `Tomato Throwing Rate: ${multiplier} 🍅/sec `;
multiplierElement.style.position = "absolute";
multiplierElement.style.top = `${centerY + 100}px`;
multiplierElement.style.left = `${centerX - 90}px`;

button.addEventListener("click", () => {
  decimalCounter += 1;
});

//-----Implementing Events for when each upgrade Button is Clicked----
for (const curItem of availableItems) {
  curItem.element.innerHTML = `${curItem.name} ${curItem.count.toFixed(0)}      
  <br>  ${curItem.description} 
  <br>  cost:${curItem.cost.toFixed(2)} 🍅 `;

  curItem.element.disabled = true;

  curItem.element.onclick = () => {
    decimalCounter -= curItem.cost;
    curItem.cost = curItem.cost * 1.15;
    curItem.count++;
    multiplier += curItem.rate;

    curItem.element.innerHTML = `${curItem.name} ${
      curItem.count.toFixed(0)
    }      
    <br>  ${curItem.description} 
    <br>  cost:${curItem.cost.toFixed(2)} 🍅 `;

    multiplierElement.textContent = `Tomato Throwing Rate: ${
      multiplier.toFixed(2)
    } 🍅/sec `;
  };
}

//----Function that is called every frame(Update Function)----
function increaseCounter(clock: number) {
  for (let thisItem of availableItems) {
    if (decimalCounter < thisItem.cost) {
      thisItem.element.disabled = true;
    } else {
      thisItem.element.disabled = false;
    }
  }
  deltaTime = clock - lastTime;
  lastTime = performance.now();

  decimalCounter += (deltaTime / 1000) * multiplier;

  counterElement.textContent = `${decimalCounter.toFixed(2)} Tomatoes Thrown`;

  requestAnimationFrame(increaseCounter);
}

requestAnimationFrame(increaseCounter);

//----Appending Text Elements----
document.body.appendChild(directions);
document.body.appendChild(counterElement);
document.body.appendChild(multiplierElement);
