const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterOpt = document.getElementById("filter");
const addBtn = itemForm.querySelector("button");
let isEditMode = false;

// Function for displaying items From the Local Storage while re- loadind/revisitng
function displayItems(e) {
  const localStorageItems = getItemFromLocalStr();

  localStorageItems.forEach((item) => addItemToDOM(item));

  checkUi();
}

// function for adding item after Event Listener
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Add something First");
    return;
  }

  // Checkinhg it its in edit mode
  if (isEditMode) {
    const itemEditing = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemEditing.textContent);
    itemEditing.classList.remove("edit-mode");
    itemEditing.remove();
    isEditMode = "false";
  } else {
    if (duplicateItems(newItem)) {
      alert("This ITEM already exists on the list");
      return;
    }
  }

  // creating the new List and adding it to the DOM
  addItemToDOM(newItem);

  // Adding the List items to the Local Storage
  addItemToLocalStr(newItem);

  checkUi();

  itemInput.value = "";
}

// Function for adding item to the DOM
function addItemToDOM(item) {
  const newList = document.createElement("li");
  newList.appendChild(document.createTextNode(item));

  const newButton = createButton("remove-item btn-link text-red");

  newList.appendChild(newButton);

  itemList.appendChild(newList);
}

// function for creating the button
function createButton(classes) {
  const button = document.createElement("button");
  button.classList = classes;

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}

// function for creating the Icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.classList = classes;
  return icon;
}

// Function for adding item to the Local Storage
function addItemToLocalStr(item) {
  const localStorageItems = getItemFromLocalStr();

  // Adding new Item to the local storage
  localStorageItems.push(item);

  // Convertin it back to JSON for local storage
  localStorage.setItem("items", JSON.stringify(localStorageItems));
}

function getItemFromLocalStr() {
  let localStorageItems;

  if (localStorage.getItem("items") === null) {
    localStorageItems = [];
  } else {
    localStorageItems = JSON.parse(localStorage.getItem("items"));
  }

  return localStorageItems;
}

// things happens when clicked on items Area
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    editItem(e.target);
  }
}

// fucntion for checking ducplicate itemes
function duplicateItems(newItem) {
  const itemsFromLocalStr = getItemFromLocalStr();
  return itemsFromLocalStr.includes(newItem);
}

// function for editing item
function editItem(items) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  items.classList.add("edit-mode");
  addBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
  addBtn.style.backgroundColor = "#228B22";
  itemInput.value = items.textContent;
}

// Function for removing the items
function removeItem(item) {
  // removing from the dom
  item.remove();

  // removing from the local storage
  removeItemFromStorage(item.textContent);

  checkUi();
}

function removeItemFromStorage(item) {
  let itemFromTheStr = getItemFromLocalStr();

  // filtering the item to be removed
  itemFromTheStr = itemFromTheStr.filter((i) => i != item);

  // reset the local storage
  localStorage.setItem("items", JSON.stringify(itemFromTheStr));
}

// Function for clearing all in one go
function clearAllItems(e) {
  while (itemList.firstChild) {
    // for removing items from the DOM
    itemList.removeChild(itemList.firstChild);

    // for removing items from the Local Storage
    localStorage.removeItem("items");

    checkUi();
  }
}

// creating filter function for filtering objects
function filterItem(e) {
  const listItems = itemList.querySelectorAll("li");
  const filter = e.target.value.toLowerCase();

  listItems.forEach(function (items) {
    const item = items.firstChild.textContent.toLowerCase();
    if (item.indexOf(filter) != -1) {
      items.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  });
}

// Function for removing Add Item and Clear All button when no object is there.
function checkUi() {
  itemInput.value = "";

  const listItems = itemList.querySelectorAll("li");

  if (listItems.length === 0) {
    clearBtn.style.display = "none";
    filterOpt.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterOpt.style.display = "block";
  }

  addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  addBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

function init() {
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAllItems);
  filterOpt.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUi();
}

init();
