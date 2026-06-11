let count = 0;
const storageKey = "ercan-gorev-listesi";
const tasks = loadTasks();
let nextTaskId = getNextTaskId();
let currentFilter = "all";
let editingTaskId = null;

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
const allTasksFilter = document.querySelector("#allTasksFilter");
const pendingTasksFilter = document.querySelector("#pendingTasksFilter");
const completedTasksFilter = document.querySelector("#completedTasksFilter");
const loadWeatherButton = document.querySelector("#loadWeatherButton");
const weatherStatus = document.querySelector("#weatherStatus");
const weatherResult = document.querySelector("#weatherResult");
const weatherDescription = document.querySelector("#weatherDescription");
const weatherTemperature = document.querySelector("#weatherTemperature");
const weatherFeelsLike = document.querySelector("#weatherFeelsLike");
const weatherHumidity = document.querySelector("#weatherHumidity");
const weatherWind = document.querySelector("#weatherWind");
const weatherTime = document.querySelector("#weatherTime");

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

function getVisibleTasks() {
  if (currentFilter === "pending") {
    return tasks.filter(function (task) {
      return !task.completed;
    });
  }

  if (currentFilter === "completed") {
    return tasks.filter(function (task) {
      return task.completed;
    });
  }

  return tasks;
}

function updateFilterButtons() {
  const filters = [
    { button: allTasksFilter, name: "all" },
    { button: pendingTasksFilter, name: "pending" },
    { button: completedTasksFilter, name: "completed" },
  ];

  filters.forEach(function (filter) {
    const isActive = currentFilter === filter.name;
    filter.button.className = isActive
      ? "filter-button active"
      : "filter-button";
    filter.button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getVisibleTasks();
  const completedTaskCount = tasks.filter(function (task) {
    return task.completed;
  }).length;

  taskCount.textContent = `${completedTaskCount}/${tasks.length} tamamlandi`;
  updateFilterButtons();

  if (tasks.length === 0) {
    taskMessage.textContent = "Henuz gorev eklenmedi.";
    return;
  }

  if (visibleTasks.length === 0) {
    taskMessage.textContent = "Bu filtreye uygun gorev bulunamadi.";
    return;
  }

  taskMessage.textContent = `${visibleTasks.length} gorev gosteriliyor.`;

  visibleTasks.forEach(function (task, index) {
    const listItem = document.createElement("li");
    listItem.className = task.completed ? "task-item completed" : "task-item";

    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent = index + 1;

    const content = document.createElement("div");
    content.className = "task-content";

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = task.completed ? "Tamamlandi" : "Bekliyor";

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    if (editingTaskId === task.id) {
      const editInput = document.createElement("input");
      editInput.className = "task-edit-input";
      editInput.type = "text";
      editInput.value = task.text;

      const editMessage = document.createElement("span");
      editMessage.className = "task-edit-message";

      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "task-button complete";
      saveButton.textContent = "Kaydet";
      saveButton.addEventListener("click", function () {
        const editedText = editInput.value.trim();

        if (editedText === "") {
          editMessage.textContent = "Gorev metni bos olamaz.";
          editInput.focus();
          return;
        }

        task.text = editedText;
        editingTaskId = null;
        saveTasks();
        renderTasks();
      });

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = "task-button edit";
      cancelButton.textContent = "Iptal";
      cancelButton.addEventListener("click", function () {
        editingTaskId = null;
        renderTasks();
      });

      editInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          saveButton.click();
        }
      });

      content.append(editInput, editMessage);
      buttons.append(saveButton, cancelButton);
      listItem.append(number, content, buttons);
      taskList.append(listItem);
      editInput.focus();
      return;
    }

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "task-button complete";
    completeButton.textContent = task.completed ? "Geri al" : "Tamamla";
    completeButton.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "task-button edit";
    editButton.textContent = "Duzenle";
    editButton.addEventListener("click", function () {
      editingTaskId = task.id;
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
    buttons.append(completeButton, editButton, deleteButton);
    listItem.append(number, content, buttons);
    taskList.append(listItem);
  });
}

function changeFilter(filterName) {
  currentFilter = filterName;
  editingTaskId = null;
  renderTasks();
}

function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: "Acik",
    1: "Genellikle acik",
    2: "Parcali bulutlu",
    3: "Kapali",
    45: "Sisli",
    48: "Kiragili sis",
    51: "Hafif ciseleme",
    53: "Ciseleme",
    55: "Yogun ciseleme",
    61: "Hafif yagmur",
    63: "Yagmur",
    65: "Kuvvetli yagmur",
    71: "Hafif kar",
    73: "Kar",
    75: "Kuvvetli kar",
    80: "Hafif saganak",
    81: "Saganak",
    82: "Kuvvetli saganak",
    95: "Gok gurultulu firtina",
  };

  return descriptions[weatherCode] || `Hava kodu: ${weatherCode}`;
}

async function loadWeather() {
  const apiUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=41.0082" +
    "&longitude=28.9784" +
    "&current=temperature_2m,apparent_temperature," +
    "relative_humidity_2m,weather_code,wind_speed_10m" +
    "&timezone=Europe%2FIstanbul";

  loadWeatherButton.disabled = true;
  weatherResult.hidden = true;
  weatherStatus.className = "api-status";
  weatherStatus.textContent = "API'den veri bekleniyor...";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP hatasi: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data.current ||
      typeof data.current.temperature_2m !== "number" ||
      typeof data.current.weather_code !== "number"
    ) {
      throw new Error("API beklenen veri yapisini dondurmedi.");
    }

    const current = data.current;
    const units = data.current_units || {};

    weatherDescription.textContent = getWeatherDescription(
      current.weather_code
    );
    weatherTemperature.textContent =
      `${current.temperature_2m}${units.temperature_2m || "°C"}`;
    weatherFeelsLike.textContent =
      `${current.apparent_temperature}${units.apparent_temperature || "°C"}`;
    weatherHumidity.textContent =
      `${current.relative_humidity_2m}${units.relative_humidity_2m || "%"}`;
    weatherWind.textContent =
      `${current.wind_speed_10m} ${units.wind_speed_10m || "km/h"}`;
    weatherTime.textContent = current.time;

    weatherResult.hidden = false;
    weatherStatus.className = "api-status success";
    weatherStatus.textContent = "API verisi basariyla alindi.";
  } catch (error) {
    weatherStatus.className = "api-status error";
    weatherStatus.textContent =
      "Veri alinamadi. Internet baglantisini kontrol edip yeniden deneyin.";
  } finally {
    loadWeatherButton.disabled = false;
  }
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

allTasksFilter.addEventListener("click", function () {
  changeFilter("all");
});

pendingTasksFilter.addEventListener("click", function () {
  changeFilter("pending");
});

completedTasksFilter.addEventListener("click", function () {
  changeFilter("completed");
});

loadWeatherButton.addEventListener("click", loadWeather);

renderTasks();
