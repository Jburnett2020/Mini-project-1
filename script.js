// Get the form, input, and todos unordered list elements by their IDs
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

// Retrieve todos from local storage and parse them into an array
const todos = JSON.parse(localStorage.getItem('todos'))

// If there are any todos in local storage, add them to the list
if(todos) {
    todos.forEach(todo => addTodo(todo))
}

// Add an event listener to the form to handle the submit event
form.addEventListener('submit', (e) => {
    e.preventDefault()  // Prevent the form from submitting in the default way

    addTodo()  // Call the addTodo function to add a new todo
})

// Function to add a new todo or display an existing one
function addTodo(todo) {
    let todoText = input.value  // Get the value entered in the input field

    // If a todo object is passed in, use its text instead
    if(todo) {
        todoText = todo.text
    }

    // If there is text to add, create a new todo element
    if(todoText) {
        const todoItem = document.createElement('li')  // Create a new list item

        // If the todo is marked as completed, add the 'completed' class
        if(todo && todo.completed) {
            todoItem.classList.add('completed')
        }

        todoItem.innerText = todoText  // Set the text of the todo

        // Add an event listener to toggle the 'completed' state on left click
        todoItem.addEventListener('click', () => {
            todoItem.classList.toggle('completed')
            updateLS()  // Update local storage
        }) 

        // Add an event listener to remove the todo on right click (context menu)
        todoItem.addEventListener('contextmenu', (e) => {
            e.preventDefault()  // Prevent the context menu from appearing

            todoItem.remove()  // Remove the todo element
            updateLS()  // Update local storage
        }) 

        // Add the new todo element to the unordered list
        todosUL.appendChild(todoItem)

        input.value = ''  // Clear the input field

        updateLS()  // Update local storage
    }
}

// Function to update local storage with the current list of todos
function updateLS() {
    const todoItems = document.querySelectorAll('li')  // Get all list items (todos)

    const todos = []  // Create an empty array to hold the todos

    // Loop through each todo element and add its text and completed status to the array
    todoItems.forEach(todoItem => {
        todos.push({
            text: todoItem.innerText,
            completed: todoItem.classList.contains('completed')
        })
    })

    // Store the todos array in local storage as a JSON string
    localStorage.setItem('todos', JSON.stringify(todos))
}
