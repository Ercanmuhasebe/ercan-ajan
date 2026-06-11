let count = 0;
const tasks = [];

const countText = document.querySelector("#count");
const messageText = document.querySelector("#message");
const increaseButton = document.querySelector("#increaseButton");
const resetButton = document.querySelector("#resetButton");
const nameInput = document.querySelector("#nameInput");
const greetingForm = document.querySelector("#greetingForm");
const greetingMessage = document.querySelector("#greetingMessage");
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskMessage = document.querySelector("#taskMessage");
const taskCount = document.querySelector("#taskCount");

function showCount() {
  countText.textContent = count;
}

function renderTasks() {
  taskList.innerHTML = "";
  taskCount.textContent = `${tasks.length} gorev`;

  if (tasks.length === 0) {
    taskMessage.textContent = "Henuz gorev eklenmedi.";
    return;
  }

  taskMessage.textContent = "Gorevler dizi icinden donguyle ekrana yazildi.";

  tasks.forEach(function (task, index) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent = index + 1;

    const taskText = document.createElement("span");
    taskText.textContent = task;

    listItem.append(number, taskText);
    taskList.append(listItem);
  });
}

increaseButton.addEventListener("click", function () {
  count = count + 5;
  showCount();
  messageText.textContent = `Dugmeye ${count} kez bastiniz.`;
});

resetButton.addEventListener("click", function () {
  count = 0;
  showCount();
  messageText.textContent = "Sayac sifirlandi.";
});

greetingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();

  if (name === "") {
    greetingMessage.textContent = "Lutfen once adinizi yazin.";
    nameInput.focus();
    return;
  }

  greetingMessage.textContent = `Merhaba ${name}, uygulamaya hos geldiniz!`;
});

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = taskInput.value.trim();

  if (newTask === "") {
    taskMessage.textContent = "Lutfen bir gorev yazin.";
    taskInput.focus();
    return;
  }

  tasks.push(newTask);
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
});

renderTasks();
