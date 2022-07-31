// ****** SELECT ITEMS **********

const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")
// edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearItems)
window.addEventListener("DOMContentLoaded", setupItems)

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
    if( value  && !editFlag){
        createListItem(id,value)
        const element = document.createElement("article")
        let attr = document.createAttribute("data-id")
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        list.appendChild(element);
        displayAlert("item added to the list", "success");
        container.classList.add("show-container")
        addToLocalStorage(id,value);
        setBackToDeafult();
    }
    else if (value && editFlag){
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        editLocalStorage(editID, value)
        setBackToDeafult();

    }
    else{
        displayAlert("please enter the value", "danger")
    }
}

function displayAlert(text,action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    },1000)
}
function clearItems() {
    const items = document.querySelectorAll(".grocery-item")
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container")
    displayAlert("empty list", "danger")
    localStorage.removeItem("list");
    setBackToDeafult();
}

function deleteItem(e) {
   const element = e.currentTarget.parentElement.parentElement;
   const id = element.dataset.id;
   list.removeChild(element)
   if (list.children.length === 0) {
    container.classList.remove("show-container");
   }
   displayAlert("item removed", "danger");
   setBackToDeafult();
   removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}


function setBackToDeafult(){
    grocery.value = ""
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id,value){
    const gr = {id, value};
    let items = getLocalStorage();
    
    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items))
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !==id){
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")):[];
    
}

// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0) {
        items.forEach(function(items){
            createListItem(items.id, items.value)
        })
    container.classList.add("show-container")    
    }
}

function createListItem(){
    const element = document.createElement("article")
        let attr = document.createAttribute("data-id")
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        list.appendChild(element);
}