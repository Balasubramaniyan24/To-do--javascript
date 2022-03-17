export default class Todos{
    constructor(){
        this.todos = []
        this.todoContainer 
        console.log("const Todos",this.todos)
    }

    createElement(tag, classNames, id, content){
        let element = document.createElement(tag)//"img"
        classNames.forEach(className => element.classList.add(className))
        id && element.setAttribute('id', id)
        content && (element.innerText = content)
        return element
    }
    //createElement(p,bala,balaId,btn) return <p class="bala" id="balaId"> btn </p>


    getTodos(divContainer){
        let todos = JSON.parse(localStorage.getItem('todos'))
        console.log("local",todos)

        todos && todos.forEach(e => {
            this.addTodo(e.content, divContainer, e.status, e.id)
        })
    }

    addTodo(value, divContainer, check=false, id){
        let uid = id ? id : new Date().getTime().toString()
        this.todos = [ ...this.todos ,{
            id: uid,
            content: value,
            status: check
        }]

        //create new div to store all todo values
        this.li = this.createElement('li', ['todo-item'], uid)

        this.title = this.createElement('p', ['title',check ? 'checked' :'not-checked'], 'title', value)

        this.edit = this.createElement('span', ['edit-item'], 'EditBtn', 'Edit')
    
        this.delete = this.createElement('span', ['delete-item'], 'DeleteBtn', 'Delete')

        this.status = this.createElement('input', ['status'], 'Status')
        this.status.type = 'checkbox'
        this.status.checked = check

        divContainer.appendChild(this.li)
        this.li.appendChild(this.title)
        this.li.appendChild(this.status)
        this.li.appendChild(this.edit)
        this.li.appendChild(this.delete)
      
        this.todoContainer = divContainer

        // this.todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(this.todos))
        console.log("add Todos",this.todos)
        return this.todos
    }

    deleteTodo(id){
        console.log("delete", typeof(id))
        this.todoContainer.removeChild(document.getElementById(id))
        this.todos = this.todos.filter(e => e.id !== id) //match not return, 
        localStorage.setItem('todos', JSON.stringify(this.todos))
        console.log("Delete Todos",this.todos)
        return this.todos
    }

    editTodo(value, id){//1010
        let currentItem = document.getElementById(id)// li tag -> currentItem
        let title = currentItem.querySelector('#title') // p tag -> title
        currentItem.querySelector('#Status').checked = false
        title.innerText = value // set new value to name
        title.className = 'title'
        this.todos = this.todos.map(e => e.id === id ? {...e, content: value, status: false} : e)
        localStorage.setItem('todos', JSON.stringify(this.todos))
        console.log("edit Todos",this.todos)       
    }

    statusTodo(id){
        let currentItem = document.getElementById(id)
        let title = currentItem.querySelector('#title')
        title.classList.toggle('checked')
        this.todos = this.todos.map(e => e.id === id ? {...e, status: !e.status} : e)
        localStorage.setItem('todos', JSON.stringify(this.todos))
        console.log("status Todos",this.todos)
    }


}

