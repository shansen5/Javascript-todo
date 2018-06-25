'use strict'

const todoId = location.hash.substring( 1 )

let todos = getStoredTodos()

let todo = todos.find( todo => todo.id === todoId )

if ( !todo ) {
    location.assign( '../todo-app/index.html')
}

todoTextEl = document.querySelector( '#todo-text' )
todoTextEl.value = todo.text

todoNotesEl = document.querySelector( '#todo-notes' )
todoNotesEl.value = todo.notes

const createdDate = moment( todo.createdAt )
const updatedDate = moment( todo.updatedAt )
const createdDateEl = document.createElement( 'p' )
let dateString = `Created: ${createdDate.toString()}`
createdDateEl.textContent = dateString
const updatedDateEl = document.createElement( 'p' )
dateString = `Updated: ${updatedDate.toString()}`
updatedDateEl.textContent = dateString
const summaryEl = document.querySelector( '#todo-summary' )
summaryEl.appendChild( createdDateEl )
summaryEl.appendChild( updatedDateEl )
if ( todo.completed ) {
    const completedDateEl = document.createElement( 'p' )
    const completedDate = moment( todo.completedAt )
    dateString = `Completed: ${completedDate.toString()}`
    completedDateEl.textContent = dateString
    summaryEl.appendChild( completedDateEl )
}

let submitActor = null

document.querySelector( "#todo-edit-form" ).addEventListener( 'submit', e => {
    e.preventDefault()
    if ( !submitActor ) {
        const todoNotes = e.target.elements.todoNotes.value.trim()
        const now = new Date()
        todo.text = e.target.elements.todoText.value
        todo.updatedAt = now.getTime()
        if ( todoNotes.length > 0 ) {
            todo.notes = todoNotes
        }  
        localStorage.setItem( 'todos', JSON.stringify( todos ))
    }
    location.assign( '../todo-app/index.html')
})

document.querySelector( "#todo-edit-cancel" ).addEventListener( 'click', e => {
    submitActor = this
})

window.addEventListener( 'storage', e => {
    if ( e.key === 'todos' ) {
        todos = JSON.parse( e.newValue )
        todo = todos.find( todo => todo.id === todoId )
        if ( !todo ) {
            location.assign( '../todo-app/index.html')
        }
        todoTextEl.value = todo.text
    }
})

if ( !todo ) {
    location.assign( '../todo-app/index.html')
}