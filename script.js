const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

// function for adding item after Event Listener
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Add something First");
    return;
  }

  // creating the new List
  const newList = document.createElement("li");
  newList.appendChild(document.createTextNode(newItem));

  const newButton = createButton("remove-item btn-link text-red");

  newList.appendChild(newButton);

  itemList.appendChild(newList);

  itemInput.value = "";
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

// Function for removing the items
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

// Function for clearing all in one go
function clearAllItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAllItems);
