const cat = document.getElementById("popcat");
const shopbtn = document.getElementById("shop");
const shopOverlay = document.getElementById("shopOverlay");
const closeShop = document.getElementById("closeShop");
const buybutton1 = document.getElementById("skin1");
const buybutton2 = document.getElementById("skin2")
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const volumeSlider = document.getElementById("volume");
const rebirthBtn = document.getElementById("rebirthBtn");
const rebirthPriceDisplay = document.getElementById("rebirthPrice");
const PopCatSound = document.getElementById("PopCatSound")


let default1btn=document.getElementById("default1")
let default2btn=document.getElementById("default2")
let scoredisplay = document.getElementById("score");
let score = 0;
let multiplier = 1;
let rebirthMultiplier = 1;
let rebirthCount = 0;
let rebirthBasePrice = 1000;
let currentRebirthPrice = rebirthBasePrice;
let img1 = "PopCat.png";
let img1Size = "900px";
let img2 = "PopCatPop.png";
let img2Size = "500px";


volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
  PopCatSound.volume = volumeSlider.value
});

function updateRebirthPrice() {
  currentRebirthPrice = rebirthBasePrice * Math.pow(2, rebirthCount);
  rebirthPriceDisplay.textContent = `Цена: ${currentRebirthPrice}`;
}
updateRebirthPrice();

playBtn.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    playBtn.textContent = "🔈 Выключить музыку";
  } else {
    music.pause();
    playBtn.textContent = "🔈 Включить музыку";
  }
});

let isFirst = true;

cat.addEventListener("click", function () {
  PopCatSound.play()
  if (isFirst) {
    cat.src = img2;
    cat.style.width = img2Size;
  } else {
    cat.src = img1;
    cat.style.width = img1Size;
  }
  isFirst = !isFirst;

  score += 1 * multiplier * rebirthMultiplier;
  scoredisplay.textContent = score;
});

rebirthBtn.addEventListener("click", () => {
  if (score >= currentRebirthPrice) {
    score = 0;
    multiplier = 1;
    cat.src = img1;
    cat.style.weight=img1Size
    rebirthCount++;
    rebirthMultiplier += 1;

    updateRebirthPrice();
    scoredisplay.textContent = score;

    buyButtons.forEach(button => {
      button.disabled = false;
      button.textContent = "Купить";
    });

    alert("Вы совершили перерождение! 😺");
  } else {
    alert("У вас недостаточно Pop Cat Coin 😿");
  }
});

shopbtn.addEventListener("click", () => {
  shopOverlay.style.display = "flex";
});


closeShop.addEventListener("click", () => {
  shopOverlay.style.display = "none";
});

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "x2") {
      if (button.disabled && button.textContent === "Куплено") {
        return; // если уже активен
      }
      if (score >= 500) {
        score -= 500;
        scoredisplay.textContent = score;
        button.disabled = true;
        button.textContent = "Куплено";
        multiplier = 2;
        alert("x2 множитель куплен");
      } else {
        alert("У вас недостаточно Pop Cat Coin 😿");
      }
    }

    if (button.id === "skin1") {
      if (score >= 1000) {
        score -= 1000;
        scoredisplay.textContent = score;

        img1 = "ChristmasPopCat.png";
        button.textContent="Куплено"

        cat.src = img1;
        cat.style.width = img1Size;

        alert("Скин куплен 😸");
      }   
        
      else {
        alert("У вас недостаточно Pop Cat Coin 😿");
      }
    }

    if (button.id === "skin2") {
      if (score >= 2000) {
        score -= 2000;
        scoredisplay.textContent = score;
        button.textContent = "Куплено";
        button.disabled = true;
        alert("Скин куплен 😸");

        img2 = "PopCornPopCat.png";

        cat.src = img2;
        cat.style.width = img2Size;
      } else {
        alert("У вас недостаточно Pop Cat Coin 😿");
      }
    }
  });
});

