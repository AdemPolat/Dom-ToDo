//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items

loadItems();

//call event listener
eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    // delete an item

    taskList.addEventListener('click', deleteItem);

    //deleter all times

    btnDeleteAll.addEventListener('click', deleteAllItems);
}

//add new Item
function addNewItem(e) {

    if (input.value === '') {
        alert('Yeni bir görev eklemek istiyor musunuz?');
    }else{
        createItem(input.value);
        setItemtoLS(input.value);
        input.value = '';
    }
    e.preventDefault();

}
// delete Item
function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {

        if (confirm('Seçtiğiniz görevi silmek istiyor musunuz?')) {

            e.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

//delete all items
function deleteAllItems(e) {

    if (confirm('Hepsini silmek istiyor musunuz?')) {

        //taskList.innerHTML='';
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}

function loadItems() {

    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];

    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemtoLS(text) {

    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {

    items = getItemsFromLS();
    items.forEach(function (item, index) {

        if (item === text) {

            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}