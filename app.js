let count = 0;
const storageKey = "ercan-gorev-listesi";
const tasks = loadTasks();
let nextTaskId = getNextTaskId();

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

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(storageKey);

    if (savedTasks === null) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.filter(function (task) {
      return (
        typeof task.id === "number" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean"
      );
    });
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    return true;
  } catch (error) {
    return false;
  }
}

function getNextTaskId() {
  let highestId = 0;

  tasks.forEach(function (task) {
    if (task.id > highestId) {
      highestId = task.id;
    }
  });

  return highestId + 1;
}

function renderTasks() {
  taskList.innerHTML = "";
  const completedTaskCount = tasks.filter(function (task) {
    return task.completed;
  }).length;

  taskCount.textContent = `${completedTaskCount}/${tasks.length} tamamlandi`;

  if (tasks.length === 0) {
    taskMessage.textContent = "Henuz gorev eklenmedi.";
    return;
  }

  taskMessage.textContent = "Gorevler tarayici hafizasinda saklaniyor.";

  tasks.forEach(function (task, index) {
    const listItem = document.createElement("li");
    listItem.className = task.completed ? "task-item completed" : "task-item";

    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent = index + 1;

    const content = document.createElement("div");
    content.className = "task-content";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = task.completed ? "Tamamlandi" : "Bekliyor";

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "task-button complete";
    completeButton.textContent = task.completed ? "Geri al" : "Tamamla";
    completeButton.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-button delete";
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener("click", function () {
      const taskIndex = tasks.findIndex(function (savedTask) {
        return savedTask.id === task.id;
      });

      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
      }
    });

    content.append(taskText, status);
    buttons.append(completeButton, deleteButton);
    listItem.append(number, content, buttons);
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

  const task = {
    id: nextTaskId,
    text: newTask,
    completed: false,
  };

  tasks.push(task);
  nextTaskId = nextTaskId + 1;
  const saved = saveTasks();
  taskInput.value = "";
  taskInput.focus();
  renderTasks();

  if (!saved) {
    taskMessage.textContent = "Gorev eklendi fakat tarayiciya kaydedilemedi.";
  }
});

renderTasks();
