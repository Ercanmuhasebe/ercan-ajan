let count = 0;
const storageKey = "ercan-gorev-listesi";
const agentMemoryKey = "ercan-ajan-hafizasi";
const tasks = loadTasks();
const agentMemory = loadAgentMemory();
let nextTaskId = getNextTaskId();
let currentFilter = "all";
let editingTaskId = null;
let currentAgentSuggestion = null;
let currentAgentMemoryId = null;
let currentAgentReview = null;

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
const aiForm = document.querySelector("#aiForm");
const aiQuestion = document.querySelector("#aiQuestion");
const aiCharacterCount = document.querySelector("#aiCharacterCount");
const askAiButton = document.querySelector("#askAiButton");
const aiStatus = document.querySelector("#aiStatus");
const aiAnswerBox = document.querySelector("#aiAnswerBox");
const aiAnswer = document.querySelector("#aiAnswer");
const createAgentPlanButton = document.querySelector(
  "#createAgentPlanButton"
);
const addAgentSuggestionButton = document.querySelector(
  "#addAgentSuggestionButton"
);
const agentStatus = document.querySelector("#agentStatus");
const agentResult = document.querySelector("#agentResult");
const agentObservation = document.querySelector("#agentObservation");
const agentDecision = document.querySelector("#agentDecision");
const agentPlan = document.querySelector("#agentPlan");
const agentSuggestion = document.querySelector("#agentSuggestion");
const reviewerStep = document.querySelector("#reviewerStep");
const reviewerVerdict = document.querySelector("#reviewerVerdict");
const reviewerChecks = document.querySelector("#reviewerChecks");
const agentMemoryCount = document.querySelector("#agentMemoryCount");
const agentMemoryMessage = document.querySelector("#agentMemoryMessage");
const agentMemoryList = document.querySelector("#agentMemoryList");
const clearAgentMemoryButton = document.querySelector(
  "#clearAgentMemoryButton"
);

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

function loadAgentMemory() {
  try {
    const savedMemory = localStorage.getItem(agentMemoryKey);

    if (savedMemory === null) {
      return [];
    }

    const parsedMemory = JSON.parse(savedMemory);

    if (!Array.isArray(parsedMemory)) {
      return [];
    }

    return parsedMemory.filter(function (memory) {
      return (
        typeof memory.id === "number" &&
        typeof memory.createdAt === "string" &&
        typeof memory.observation === "string" &&
        typeof memory.decision === "string" &&
        Array.isArray(memory.steps) &&
        typeof memory.suggestion === "string" &&
        typeof memory.applied === "boolean" &&
        (
          memory.reviewApproved === undefined ||
          typeof memory.reviewApproved === "boolean"
        )
      );
    });
  } catch (error) {
    return [];
  }
}

function saveAgentMemory() {
  try {
    localStorage.setItem(agentMemoryKey, JSON.stringify(agentMemory));
    return true;
  } catch (error) {
    return false;
  }
}

function formatAgentMemoryDate(dateText) {
  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return "Tarih bilinmiyor";
  }

  return date.toLocaleString("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function createAgentMemoryId() {
  let highestId = 0;

  agentMemory.forEach(function (memory) {
    if (memory.id > highestId) {
      highestId = memory.id;
    }
  });

  return Math.max(Date.now(), highestId + 1);
}

function renderAgentMemory() {
  agentMemoryList.innerHTML = "";
  agentMemoryCount.textContent = `${agentMemory.length} kayit`;
  clearAgentMemoryButton.disabled = agentMemory.length === 0;

  if (agentMemory.length === 0) {
    agentMemoryMessage.textContent = "Henuz ajan hafizasi olusmadi.";
    return;
  }

  agentMemoryMessage.textContent =
    "Son 10 ajan karari tarayici hafizasinda saklaniyor.";

  agentMemory.forEach(function (memory) {
    const listItem = document.createElement("li");
    listItem.className = "agent-memory-item";

    const meta = document.createElement("div");
    meta.className = "agent-memory-meta";

    const dateText = document.createElement("span");
    dateText.textContent = formatAgentMemoryDate(memory.createdAt);

    const status = document.createElement("span");
    if (memory.reviewApproved === false) {
      status.className = "agent-memory-status rejected";
      status.textContent = "Denetleyici reddetti";
    } else if (memory.applied) {
      status.className = "agent-memory-status applied";
      status.textContent = "Uygulandi";
    } else {
      status.className = "agent-memory-status";
      status.textContent = "Kullanici onayi bekliyor";
    }

    const observation = document.createElement("p");
    observation.textContent = `Gozlem: ${memory.observation}`;

    const decision = document.createElement("p");
    decision.textContent = `Karar: ${memory.decision}`;

    const suggestion = document.createElement("p");
    const suggestionLabel = document.createElement("strong");
    suggestionLabel.textContent = "Oneri: ";
    suggestion.append(suggestionLabel, memory.suggestion);

    const review = document.createElement("p");
    const reviewLabel = document.createElement("strong");
    reviewLabel.textContent = "Denetim: ";
    const reviewText =
      memory.reviewApproved === undefined
        ? "Eski kayit - denetim bilgisi yok"
        : memory.reviewApproved
          ? "Onaylandi"
          : "Reddedildi";
    review.append(reviewLabel, reviewText);

    meta.append(dateText, status);
    listItem.append(meta, observation, decision, review, suggestion);
    agentMemoryList.append(listItem);
  });
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

async function askArtificialIntelligence(event) {
  event.preventDefault();
  const question = aiQuestion.value.trim();

  if (
    typeof window !== "undefined" &&
    window.location.protocol === "file:"
  ) {
    aiStatus.className = "api-status error";
    aiStatus.textContent =
      "Uygulama dosya olarak acilmis. Edge'i kapatip VS Code'da F5'e basin.";
    return;
  }

  if (question === "") {
    aiStatus.className = "api-status error";
    aiStatus.textContent = "Lutfen once bir soru yazin.";
    aiQuestion.focus();
    return;
  }

  askAiButton.disabled = true;
  aiAnswerBox.hidden = true;
  aiStatus.className = "api-status";
  aiStatus.textContent = "Yapay zeka cevabi bekleniyor...";

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Yapay zeka istegi basarisiz oldu.");
    }

    aiAnswer.textContent = data.answer;
    aiAnswerBox.hidden = false;
    aiStatus.className = "api-status success";
    aiStatus.textContent = `Cevap alindi. Model: ${data.model}`;
  } catch (error) {
    aiStatus.className = "api-status error";
    aiStatus.textContent = error.message;
  } finally {
    askAiButton.disabled = false;
  }
}

function buildLocalAgentPlan() {
  const pendingTasks = tasks.filter(function (task) {
    return !task.completed;
  });
  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  });

  if (tasks.length === 0) {
    return {
      observation: "Listede henuz gorev bulunmuyor.",
      decision:
        "Ajan, once somut bir hedef belirlenmesi gerektigine karar verdi.",
      steps: [
        "Yapmak istediginiz mobil uygulamayi tek cumleyle tanimlayin.",
        "Uygulamanin cozecegi bir problemi yazin.",
        "Ilk kucuk ozelligi gorev listesine ekleyin.",
      ],
      suggestion: "Ilk mobil uygulama fikrimi bir cumleyle yaz",
    };
  }

  if (pendingTasks.length === 0) {
    return {
      observation:
        `${tasks.length} gorevin tamami tamamlanmis durumda.`,
      decision:
        "Ajan, yeni bir ogrenme hedefi belirleme zamaninin geldigine " +
        "karar verdi.",
      steps: [
        "Tamamlanan calismalari kisaca gozden gecirin.",
        "Eksik hissettiginiz bir konuyu belirleyin.",
        "Bu konu icin 25 dakikalik yeni bir gorev olusturun.",
      ],
      suggestion: "Yeni bir yazilim ogrenme hedefi belirle",
    };
  }

  const focusTask = pendingTasks[0];
  const workloadMessage =
    pendingTasks.length >= 4
      ? "Bekleyen gorev sayisi yuksek; dagilmamak icin ilk gorev secildi."
      : "Ilk bekleyen gorev, sirayi korumak icin odak olarak secildi.";

  return {
    observation:
      `${pendingTasks.length} bekleyen ve ${completedTasks.length} ` +
      "tamamlanan gorev var.",
    decision: `${workloadMessage} Odak: "${focusTask.text}".`,
    steps: [
      `"${focusTask.text}" gorevini acik ve kucuk bir parcaya ayirin.`,
      "25 dakika boyunca yalnizca bu gorev uzerinde calisin.",
      "Sonucu test edip gorevi tamamlandi olarak isaretleyin.",
    ],
    suggestion: `25 dakika odaklan: ${focusTask.text}`,
  };
}

function reviewLocalAgentPlan(plan) {
  const checks = [];
  let approved = true;

  if (plan.steps.length === 3) {
    checks.push("Plan uc acik adimdan olusuyor.");
  } else {
    checks.push("Planin adim sayisi uygun degil.");
    approved = false;
  }

  if (
    plan.suggestion.length >= 5 &&
    plan.suggestion.length <= 160
  ) {
    checks.push("Oneri kisa ve uygulanabilir uzunlukta.");
  } else {
    checks.push("Onerinin uzunlugu uygulanabilir degil.");
    approved = false;
  }

  const suggestionExists = tasks.some(function (task) {
    return task.text.toLocaleLowerCase("tr-TR") ===
      plan.suggestion.toLocaleLowerCase("tr-TR");
  });

  if (suggestionExists) {
    checks.push("Ayni oneri gorev listesinde zaten bulunuyor.");
    approved = false;
  } else {
    checks.push("Oneri gorev listesinde tekrar etmiyor.");
  }

  checks.push(
    "Eylem yalnizca yeni gorev ekler; mevcut gorevleri silmez."
  );

  return {
    approved,
    checks,
    verdict: approved
      ? "Denetleyici plani onayladi."
      : "Denetleyici plani reddetti; uygulayici calistirilmayacak.",
  };
}

function showLocalAgentPlan() {
  const plan = buildLocalAgentPlan();
  const review = reviewLocalAgentPlan(plan);
  currentAgentSuggestion = plan.suggestion;
  currentAgentReview = review;
  currentAgentMemoryId = createAgentMemoryId();

  agentMemory.unshift({
    id: currentAgentMemoryId,
    createdAt: new Date().toISOString(),
    observation: plan.observation,
    decision: plan.decision,
    steps: plan.steps,
    suggestion: plan.suggestion,
    reviewApproved: review.approved,
    applied: false,
  });

  if (agentMemory.length > 10) {
    agentMemory.length = 10;
  }

  saveAgentMemory();
  renderAgentMemory();

  agentObservation.textContent = plan.observation;
  agentDecision.textContent = plan.decision;
  agentSuggestion.textContent = plan.suggestion;
  agentPlan.innerHTML = "";
  reviewerChecks.innerHTML = "";

  plan.steps.forEach(function (step) {
    const listItem = document.createElement("li");
    listItem.textContent = step;
    agentPlan.append(listItem);
  });

  reviewerVerdict.textContent = review.verdict;
  reviewerStep.className = review.approved
    ? "agent-step reviewer-step approved"
    : "agent-step reviewer-step rejected";

  review.checks.forEach(function (check) {
    const listItem = document.createElement("li");
    listItem.textContent = check;
    reviewerChecks.append(listItem);
  });

  agentResult.hidden = false;
  addAgentSuggestionButton.disabled = !review.approved;
  agentStatus.className = review.approved
    ? "api-status success"
    : "api-status error";
  agentStatus.textContent = review.approved
    ? "Denetleyici onayladi. Uygulayici, kullanici onayini bekliyor."
    : "Denetleyici reddetti. Tekrarlanan veya uygun olmayan eylem uygulanmaz.";
}

function addAgentSuggestionToTasks() {
  if (
    currentAgentSuggestion === null ||
    currentAgentReview === null ||
    !currentAgentReview.approved
  ) {
    return;
  }

  const suggestionExists = tasks.some(function (task) {
    return task.text.toLocaleLowerCase("tr-TR") ===
      currentAgentSuggestion.toLocaleLowerCase("tr-TR");
  });

  if (suggestionExists) {
    agentStatus.className = "api-status error";
    agentStatus.textContent = "Bu oneri gorev listesinde zaten bulunuyor.";
    addAgentSuggestionButton.disabled = true;
    return;
  }

  tasks.push({
    id: nextTaskId,
    text: currentAgentSuggestion,
    completed: false,
  });
  nextTaskId = nextTaskId + 1;
  saveTasks();
  currentFilter = "all";
  renderTasks();

  const memoryRecord = agentMemory.find(function (memory) {
    return memory.id === currentAgentMemoryId;
  });

  if (memoryRecord) {
    memoryRecord.applied = true;
    saveAgentMemory();
    renderAgentMemory();
  }

  agentStatus.className = "api-status success";
  agentStatus.textContent =
    "Uygulayici, denetleyici ve kullanici onayiyla gorevi ekledi.";
  currentAgentSuggestion = null;
  currentAgentReview = null;
  addAgentSuggestionButton.disabled = true;
}

function clearAgentMemory() {
  agentMemory.length = 0;
  currentAgentMemoryId = null;
  currentAgentReview = null;
  saveAgentMemory();
  renderAgentMemory();
  agentStatus.className = "api-status success";
  agentStatus.textContent = "Ajan hafizasi kullanici istegiyle temizlendi.";
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

aiQuestion.addEventListener("input", function () {
  aiCharacterCount.textContent = `${aiQuestion.value.length}/1000`;
});

aiForm.addEventListener("submit", askArtificialIntelligence);

createAgentPlanButton.addEventListener("click", showLocalAgentPlan);
addAgentSuggestionButton.addEventListener(
  "click",
  addAgentSuggestionToTasks
);
clearAgentMemoryButton.addEventListener("click", clearAgentMemory);

renderTasks();
renderAgentMemory();
