const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

itemForm.addEventListener("submit", addItem);

console.log(itemList);
