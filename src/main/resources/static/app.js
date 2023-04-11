let todoList = [];

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoListEl = document.getElementById("todo-list");

  if (todoInput.value !== "") {
    const todoItem = {
      id: todoList.length,
      task: todoInput.value
    };
    todoList.push(todoItem);

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todoItem.task}</span>
      <button class="delete-btn" onclick="deleteTodo(${todoItem.id})">Delete</button>
    `;
    todoListEl.appendChild(li);

    todoInput.value = "";
  }
}

async function deleteTodo(id) {
  // Send DELETE request to server
  const response = await fetch(`/api/v1/tasks/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // Update the UI after successful deletion
    todoList = todoList.filter(todo => todo.id !== id);
    const todoListEl = document.getElementById("todo-list");
    const li = todoListEl.querySelector(`li:nth-child(${id + 1})`);
    li.remove();
  } else {
    console.error(`Error deleting task with id ${id}:`, response.statusText);
  }
}
