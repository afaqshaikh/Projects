var div = document.getElementById('todoText')

firebase.database().ref('todos').on('child_added', function (data) {
    console.log(data.val())
    var li = document.createElement('li')
    li.setAttribute('class', 'list-group-item list-group-item-white text-left shadow-sm mb-5 w-50 m-auto p-1')
    var text = document.createTextNode(data.val().value)
    li.appendChild(text)
    div.appendChild(li)



    //Setting delete button
    var del = document.createElement('button')
    var delText = document.createTextNode('Delete')
    del.appendChild(delText)
    li.appendChild(del)
    del.setAttribute('onclick', 'deleteText(this)')
    del.setAttribute('id',data.val().key)
    del.setAttribute('class', 'btn btn-danger float-right ml-2')

    //Setting Edit button
    var edit = document.createElement('button')
    var editText = document.createTextNode('Edit')
    edit.appendChild(editText)
    li.appendChild(edit)
    edit.setAttribute('onclick', 'editText(this)')
    edit.setAttribute('id',data.val().key)
    edit.setAttribute('class', 'btn btn-primary float-right ')
})

function getText() {
    //Getting text and set it into p
    var txt = document.getElementById('inputText')

    var database = firebase.database().ref('todos')
    var key = database.push().key
    var todo = {
        value: txt.value,
        key: key
    }
    database.child(key).set(todo)
    txt.value = '';


}

//Delete Function
function deleteText(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

//Remove all function
function deleteAll(s) {
    div.innerHTML = ''
}

//Edit item function
function editText(e) {

    var newChild = prompt('Edit Text', e.parentNode.firstChild.nodeValue)
    var edtiTodo = {
        value: newChild,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(edtiTodo)
    e.parentNode.firstChild.nodeValue = newChild
}