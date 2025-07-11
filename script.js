const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');

let tasks = [];

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  const due = taskDateTime.value;

  if (text) {
    tasks.push({ id: Date.now(), text, due, completed: false });
    taskInput.value = '';
    taskDateTime.value = '';
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const content = document.createElement('div');
    content.className = 'task-content';
    content.innerHTML = `<strong>${task.text}</strong><br><small>${task.due ? `Due: ${new Date(task.due).toLocaleString()}` : ''}</small>`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = task.completed ? '✅' : '✔️';
    completeBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(content);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  const newDue = prompt("Edit due date (YYYY-MM-DD HH:MM):", task.due?.slice(0, 16));
  if (newText !== null) {
    task.text = newText;
    task.due = newDue || '';
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

renderTasks();
