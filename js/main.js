class Todo {
    constructor(title) {
        this.title = title;
    }
}
function supports_storage() {
    try {
        'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        new Error('your browser does not use LocalStorage');
    }
}
supports_storage();

function removeTodoFromList(e) {
    HandleUI.deleteTodo(e.target);
    if (supports_storage) {
        LocalStorage.removeTodoFromLocalStorage(
            e.target.parentElement.textContent
        );
    } else {
        SessionStorage.removeTodoFromLocalStorage(
            e.target.parentElement.textContent
        );
    }

    HandleUI.showAlert('Item Removed', 'success');
}

function renderTodoList(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;

    if (title === '') {
        HandleUI.showAlert('Please fill in all fields', 'danger');
    } else {
        const todo = new Todo(title);
        HandleUI.addTodoToList(todo);

        if (supports_storage) {
            LocalStorage.addTodoToLocalStorage(todo);
        } else {
            SessionStorage.addTodoToLocalStorage(todo);
        }
        HandleUI.showAlert('Item Added', 'success');
        HandleUI.clearFields();
    }
}
const filterTodo = (e) => {
    let filterValue = e.target.value.toLowerCase();
    let li = document.querySelector('.todo').querySelectorAll('li.task');

    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.toLowerCase().includes(filterValue)) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }
};

document.getElementById('filterInput').addEventListener('keyup', filterTodo);
document.addEventListener('DOMContentLoaded', HandleUI.displayTodos);
document
    .querySelector('.form-control')
    .addEventListener('submit', renderTodoList);
