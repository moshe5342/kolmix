function declareBtns() {
  let burger_btn = document.querySelector("#burger_btn");
  let nav_open = document.querySelector("#nav_open");
  burger_btn.addEventListener("click", function () {
    (nav_open.style.display != "block") ? nav_open.style.display = "block" : nav_open.style.display = "none";
  })
}

declareBtns();

function myFunction(x) {
  let nav_open = document.querySelector("#nav_open");
  if (x.matches) {
    nav_open.style.display = "none";
  } else {
    nav_open.style.display = "block";
  }
}

var x = window.matchMedia("(max-width: 768px)")
myFunction(x)
x.addListener(myFunction)

let badgeQuantity = [];
if (JSON.parse(localStorage.getItem("products")) != null) {
  badgeQuantity = JSON.parse(localStorage.getItem("products"));
}

const setBadgeQuantity = () => {
  document.querySelector('.badge').setAttribute('value', badgeQuantity.length);
}
setBadgeQuantity();