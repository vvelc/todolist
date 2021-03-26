// ITEM KEY GENERATION
const keychars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const keygenerator = () => {
    let key = ""
    for (let i = 0; i < 10; i++) {
        let randint = (Math.floor(Math.random() * 62));
        key = key + keychars[randint]
    }
    return key
}

function update() {
    // Obetener todolist del localStorage y convertirlo en un array
    let todolist = localStorage.getItem("todolist")

    // Si no existe, asignarle un array vacío
    if(todolist === null) {
        todolist = JSON.parse('{"items":[]}')
        localStorage.setItem("todolist", JSON.stringify(todolist))
        return false
    }

    else if(localStorage.getItem("todolist") === '{"items":[]}') {
        return false
    }

    else {
        todolist = JSON.parse(todolist)
        // Almacenar etiqueta <ul>
        let list = document.getElementById("list")
        
        while(list.firstChild) {
            list.removeChild(list.firstChild)
        }

        // ForEach para crear items y mostrarlos en pantalla
        todolist.items.forEach(item => {

            // Crear etiquetas
            let li = document.createElement("li")
            let span = document.createElement("span")
            let buttonsDiv = document.createElement("div")
            let button1 = document.createElement("button")
            let button2 = document.createElement("button")
            
            // Crear titulo

            let title = document.createTextNode(item.title)

            // Añadir clase a etiquetas
            li.className = "todoitem"
            li.setAttribute("id", item.id)
            buttonsDiv.classList = "todoitem-buttons"
            button1.className = "item-button edit-button"
            button2.className = "item-button delete-button"
            
            // Ponerle texto a las etiquetas
            
            span.append(title)
            button1.append("Editar")
            button2.append("Borrar")
            
            // Poner botones dentro de div

            buttonsDiv.append(button1)
            buttonsDiv.append(button2)

            // Poner todo dentro del li

            li.append(span)
            li.append(buttonsDiv)
            
            //Mostrar todo en pantalla

            list.append(li)
        });

        return false

    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    update()
});

$(document).ready(() => {
    // Obetener todolist del localStorage y convertirlo en un array
    let todolist = JSON.parse(localStorage.getItem("todolist"))

    var input = document.getElementById("new-input")

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("new-button").click();
        }
    });

    // Boton para agregar items
    $("#new-button").click(function () {
        // Almacenar etiqueta input
        let input = $(this).parent().parent().children("input")

        if(input.val() == "") {
            return false
        }

        // Obtener valor de entrada
        let newtitle = input.val()
        
        // Crear nuevo item
        newitem = createNewItem(newtitle);

        // Agregar item al todolist
        todolist.items.push(newitem)

        // Actualizar todolist en localStorage
            // Convertir todolist a string
        let stringToDoList = JSON.stringify(todolist)
            // Almacenar en localStorage
        localStorage.setItem("todolist", stringToDoList)

        // Actualizar pantalla
        //update()
        window.location = window.location

        // Limpiar input

        input.val("");
    })

    $(".edit-button").click(function () {

        // Obtener el ID del item a borrar
        let itemid = $(this).parent().parent().attr("id")

        // Obtener el item a borrar
        let item = document.getElementById(itemid)

        // Encontrar indice el elemento
        let index = todolist.items.findIndex(function(item, i){
            return item.id === itemid
        });

        // Cambiar nombre en arraw
        todolist.items[index].title = prompt("Por favor, introduce el nuevo nombre")

        // Actualizar todolist en localStorage
            // Convertir todolist a string
        let stringToDoList = JSON.stringify(todolist)
            // Almacenar en localStorage
        localStorage.setItem("todolist", stringToDoList)

        // Recargar pagina
        window.location = window.location
    })

    $(".delete-button").click(function () {

        // Eliminar de la pantalla

        // Obtener el ID del item a borrar
        let itemid = $(this).parent().parent().attr("id")

        // Obtener el item a borrar
        let item = document.getElementById(itemid)

        while(item.firstChild) {
            item.removeChild(item.firstChild)
        }

        // Almacenar etiqueta ul
        let list = document.getElementById("list")

        // Eliminar item del ul
        list.removeChild(item)

        // Eliminar de localStorage

        // Declarar indice del item a eliminar
        let index = todolist.items.findIndex(function(item, i){
            return item.id === itemid
        });

        todolist.items.splice(index, 1)

        // Actualizar todolist en localStorage
            // Convertir todolist a string
        let stringToDoList = JSON.stringify(todolist)
            // Almacenar en localStorage
        localStorage.setItem("todolist", stringToDoList)

        return false

    })
})

function createNewItem(title) {
    id = keygenerator()
    item = { "id": id, "title": title }
    return item
}
