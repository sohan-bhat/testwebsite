const storageKey = "tutorial_todos"

const convertStringToObj = (str) => JSON.parse(str) || []

const convertObjToString = (obj) => JSON.stringify(obj) || ""

const getToDos = () => convertStringToObj(localStorage.getItem(storageKey))

const addToDo = (todo) => localStorage.setItem(storageKey, convertObjToString([...getToDos(), todo]))

const deleteToDO = (todo) => localStorage.setItem(storageKey, convertObjToString(getToDos().filter(_todo => _todo !== todo)))

const buildToDoEl = (todo) => {
    const el = document.createElement('li')
    el.classList.add('list-group-item')
    el.innerText = todo
    return el
}

const appendLiToDom = (el) => document.getElementById('todo-list-container').appendChild(el)

const clearToDoListDisplay = () => document.getElementById('todo-list-container').innerHTML = ""

const clearInput = () => document.getElementById('new-todo-input').value = ""

const displayToDos = () => {
    clearInput()
    clearToDoListDisplay()
    getToDos().forEach(_todo => appendLiToDom(buildToDoEl(_todo)))
    intitClickListeners()
}
const intitClickListeners = () => {
    Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
        _item.addEventListener('click', ($event) => {
            const todo = $event.target.innerText
            if(window.confirm('Have you completed this task: ' + todo)) {
                deleteToDO(todo)
                displayToDos()
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () => displayToDos())

document.getElementById('add-new-todo-btn').addEventListener('click', ($event) => {
    console.log("im here")
    const newTodoInput = document.getElementById('new-todo-input')
    if(newTodoInput.value) {
        addToDo(newTodoInput.value.trim())
        displayToDos()
    }
})

document.getElementById('reset-storage-btn').addEventListener('click', ($event) => {
    localStorage.removeItem(storageKey)
    displayToDos()
})