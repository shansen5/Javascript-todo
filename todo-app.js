'use strict'

let todos = getStoredTodos()
document.querySelector( '#show-completed' ).checked = false

const filters = {
    search: '',
    sortBy: 'byEdited',
    showCompleted: false
}

const summary = document.createElement( 'h3' )
document.querySelector( '#selected-todos' ).appendChild( summary )
render( todos, filters )

document.querySelector( '#search' ).addEventListener( 'input', e => {
    filters.search = e.target.value
    console.log( filters.search )
    render( todos, filters )
})

document.querySelector( '#sort-by' ).addEventListener( 'input', e => {
    filters.sortBy = e.target.value
    console.log( filters.sortBy )
    render( todos, filters )
})

document.querySelector( '#todo-form' ).addEventListener( 'submit', e => {
    e.preventDefault()
    const todoText = e.target.elements.newTodo.value
    console.log( todoText )
    addTodo( todoText )
    e.target.elements.newTodo.value = ''
})

document.querySelector( '#show-completed' ).addEventListener( 'change', e => {
    filters.showCompleted = e.target.checked
    console.log( filters )
    render( todos, filters )
} )

window.addEventListener( 'storage', e => {
    if ( e.key === 'todos' ) {
        todos = JSON.parse( e.newValue )
        render( todos, filters )
    }
})