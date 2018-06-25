'use strict'

const getStoredTodos = _ => {
    let todosJSON = localStorage.getItem( 'todos' )
    try {
        return todosJSON ? JSON.parse( todosJSON ) : []
    } catch ( e ) {
        return []
    }
}

const sortTodos = ( todos, sortBy ) => {
    let step1 = todos.sort( ( a, b ) => 
         !a.completed && b.completed ? -1 :
         !b.completed && a.completed ? 1 : 0
    )
    if ( sortBy === 'byEdited' ) {
        return step1.sort( ( a, b ) => 
            a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0
        )
    }
    if ( sortBy === 'byCreated' ) {
        return step1.sort( ( a, b ) => 
            a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
        )
    }
    return step1.sort( ( a, b ) => 
        a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 
        a.text.toLowerCase() > b.text.toLowerCase() ? 1 : 0
    )
}

const removeTodo = id => {
    const idx = todos.findIndex( function( todo ) {
        return todo.id === id
    })
    if ( idx >= 0 ) {
        todos.splice( idx, 1 )
    }
}

const markCompleted = ( id, checked ) => {
    const idx = todos.findIndex( todo => {
        if ( todo.id === id ) {
            todo.completed = checked
            todo.completedAt = moment()
            return true
        } 
        return false
    })
}

const generateTodoDOM = todo => {
    const todoEl = document.createElement( 'div' )
    const completedCheckbox = document.createElement( 'input' )
    const textEl = document.createElement( 'a' )
    const createdEl = document.createElement( 'span' )
    const updatedEl = document.createElement( 'span' )
    const completedEl = document.createElement( 'span' )
    const removeButton = document.createElement( 'button' )
    const createdDate = moment( todo.createdAt )
    const updatedDate = moment( todo.updatedAt )

    completedCheckbox.type = 'checkbox'
    completedCheckbox.checked = todo.completed
    completedCheckbox.addEventListener( 'click', e => {
        markCompleted( todo.id, e.target.checked )
        localStorage.setItem( 'todos', JSON.stringify( todos ))
        render( todos, filters )
    } )
    todoEl.appendChild( completedCheckbox )
    textEl.href = '/todo-app/edit.html#' + todo.id
    textEl.textContent = todo.text
    todoEl.appendChild( textEl )
    createdEl.textContent = `Created: ${createdDate.fromNow()}`
    updatedEl.textContent = `Updated: ${updatedDate.fromNow()}`
    todoEl.appendChild( createdEl )
    todoEl.appendChild( updatedEl )
    if ( todo.completed ) {
        const completedDate = moment( todo.completedAt )
        completedEl.textContent = `Completed: ${completedDate.fromNow()}`
    }
    removeButton.textContent = 'Del'
    removeButton.addEventListener( 'click', _ => {
        removeTodo( todo.id )
        render( todos, filters )
    })
    todoEl.appendChild( removeButton )
    return todoEl
}

const updateTodo = ( todo, text ) => {
    todo.text = text
    localStorage.setItem( 'todos', JSON.stringify( todos ))
}

const render = ( todos, filters ) => {
    const filteredTodos = todos.filter( todo => {
        const searchMatch = todo.text.toLowerCase().includes( filters.search.toLowerCase() )
        if ( filters.showCompleted ) {
            return searchMatch
        }
        return searchMatch && !todo.completed
    })
    document.querySelector( '#todos' ).innerHTML = ''
    const sorted = sortTodos( filteredTodos, filters.sortBy )
    filteredTodos.forEach( todo => {
        const todoEl = generateTodoDOM( todo )
        document.querySelector( '#todos' ).appendChild( todoEl )
    } )
    const singular1 = filteredTodos.length === 1 ? 'There is ' : 'There are '
    const singular2 = filteredTodos.length === 1 ? ' task' : ' tasks'
    const sense = filters.showCompleted ? '' : 'uncompleted'
    summary.textContent = singular1 + `${filteredTodos.length} ` + sense + singular2
}

const addTodo = text => {
    if ( text.length > 0 ) {
        todos.push( {
            id: uuidv4(),
            text: text, 
            notes: "",
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf(),
            completedAt: null,
            completed: false
        } )
        localStorage.setItem( 'todos', JSON.stringify( todos ))
        render( todos, filters )
    }
}