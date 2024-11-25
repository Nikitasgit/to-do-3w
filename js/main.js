//Selecteurs
const form = document.getElementById("form-add-task");
const prioritySelector = document.getElementById("priorities");
const submitBtn = document.getElementById("submit-btn");
const deleteTasksBtn = document.getElementById("delete-tasks-btn");
const tasksList = document.getElementById("tasks-list");
const taskInput = document.getElementById("task-input");

//----Global variables----//
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    title: "Créer mon compte Github",
    priority: 2,
  },
  {
    title: "Apprendre mon cours de JavaScript",
    priority: 1,
  },
  {
    title: "Répondre à mes emails",
    priority: 3,
  },
];

//----Events----//
//ajoute une tâche à la liste de tâches.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = {
    title: taskInput.value,
    priority: Number(prioritySelector.value),
  };
  tasks.push(newTask);
  tasks.sort((a, b) => a.priority - b.priority);
  tasksList.innerHTML = "";
  renderTasks();
  taskInput.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
//supprime tâches séléctionnées
deleteTasksBtn.addEventListener("click", () => {
  const titlesToDelete = [];
  Array.from(tasksList.children).forEach((listItem) => {
    const checkbox = listItem.querySelector("input");
    if (checkbox.checked) {
      const title = listItem.querySelector("label").textContent;
      titlesToDelete.push(title);
      tasksList.removeChild(listItem);
    }
  });
  const totalDeleted = titlesToDelete.length;
  tasks = tasks.filter((task) => !titlesToDelete.includes(task.title));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert(
    totalDeleted > 0
      ? `${totalDeleted} tâche${
          totalDeleted > 1 ? "s vont" : " va"
        }  être supprimée${totalDeleted > 1 ? "s" : ""}`
      : "Aucune tâche séléctionnée"
  );
});
//----Functions----//
//Intègre nouvelle tâche en html
const createTask = (task) => {
  const priority =
    task.priority === 1
      ? "priority-one"
      : task.priority === 2
      ? "priority-two"
      : task.priority === 3
      ? "priority-three"
      : null;
  const listItem = document.createElement("li");
  const taskLabel = document.createElement("label");
  const taskInput = document.createElement("input");
  taskInput.type = "checkbox";
  const taskName = document.createTextNode(task.title);
  taskLabel.classList.add(priority);
  taskLabel.appendChild(taskInput);
  taskLabel.appendChild(taskName);
  listItem.appendChild(taskLabel);
  return tasksList.appendChild(listItem);
};
//Rendu des tâches
const renderTasks = () => {
  tasks
    .sort((a, b) => a.priority - b.priority)
    .forEach((task) => {
      createTask(task);
    });
};
//Intègre la liste de tâches au document html à l'ouverture de la page.
//----Call Functions----//
renderTasks();
