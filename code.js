window.onload = init;
function init(){
    document.getElementById("item-add-btn").addEventListener("click", addItem);
    // document.getElementById("item-add-btn").addEventListener("", addItem);
}

function addItem(){
    let name = document.getElementById("item-add-text").value;
    const list = document.getElementsByClassName("items-list")[0];
    const child = document.createElement("div");
    child.className = "item";
    child.innerHTML = `<span class="item-name">${name}</span>
    <div class="quantity-controls">
    <button class="btn quantity-btn minus" data-tooltip="-">-
    </button>
    <span class="quantity-value">1</span>
        <button class="btn quantity-btn plus" data-tooltip="+">+</button>
        </div>
        <div class="action-buttons">
        <button class="btn action-btn buy" data-tooltip="tooltip">Куплено</button>
        <button class="btn action-btn delete" data-tooltip="x">✖</button>
        </div>`
    list.appendChild(child);
}
