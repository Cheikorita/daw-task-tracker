// Array para almacenar el estado de la aplicación
let tasks = JSON.parse(localStorage.getItem('daw_tasks')) || [];

// Elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');

// Guardar en localStorage
function saveTasks() {
    localStorage.setItem('daw_tasks', JSON.stringify(tasks));
}

// Renderizar tareas en el DOM
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.title}</span>
                <span class="badge badge-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <button onclick="deleteTask(${index})" style="background: #dc3545;">Eliminar</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Añadir tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        title: taskInput.value,
        priority: prioritySelect.value,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
});

// Marcar como completada
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

// Eliminar tarea
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// Carga inicial
renderTasks();