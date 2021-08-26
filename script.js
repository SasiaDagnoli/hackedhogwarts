"only strict";
let students;
let filter = "all";

window.addEventListener("DOMContentLoaded", start);

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((button) =>
    button.addEventListener("click", filterHouse)
  );
  document
    .querySelector("#menubuttonhouse")
    .addEventListener("click", toggleMenu);

  getStudents();
}

function filterHouse() {
  filter = this.dataset.house;
  console.log(filter);

  showStudents();
}

async function getStudents() {
  const resp = await fetch("https://petlatkea.dk/2021/hogwarts/students.json");
  students = await resp.json();
  console.log(students);

  showStudents();
}

function showStudents() {
  console.log("showStudents");
  let main = document.querySelector("main");
  let temp = document.querySelector("template");
  main.textContent = "";
  students.forEach((student) => {
    if (filter == student.house || filter == "all") {
      const clone = temp.cloneNode(true).content;
      clone.querySelector(".studentname").textContent = student.fullname;
      clone.querySelector(".house").textContent = student.house;

      main.appendChild(clone);
    }
  });
}

function toggleMenu() {
  console.log("toggleMenu");
  document.querySelector("#menuhouse").classList.toggle("hidden");

  let isHidden = document
    .querySelector("#menuhouse")
    .classList.contains("hidden");

  if (isHidden == true) {
    console.log("isHidden");
    document.querySelector("#menubuttonhouse").textContent = "Houses▼";
  } else {
    document.querySelector("#menubuttonhouse").textContent = "Houses▲";
  }
}
