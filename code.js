let items_container;
window.onload = init;
function init(){
    document.getElementById("item-add-btn").addEventListener("click", ()=>{addItem()});
    document.getElementById("item-add-text").addEventListener('keypress', (e)=>{
        if(e.key == "Enter"){
            e.preventDefault();
            addItem();
        }
    })

    items_container = document.getElementsByClassName("items-list")[0];
    items_container.addEventListener("click", deleteItem);
    document.querySelectorAll(".delete").forEach(btn => { btn.addEventListener('click', deleteItem);});

    document.querySelectorAll('.item').forEach((item)=>{
        item.querySelectorAll('.buy').forEach(btn =>{
            btn.addEventListener('click', ()=>{ changeBuyState(item, btn)});
        });
    });
}

function deleteItem(e){
    if(e.target && e.target.classList.contains('delete')){
        const item = e.target.closest('.item');
        if(item){
            item.remove();
        }
    }
}

function addItem(name = document.getElementById("item-add-text").value, quantity = 1){
    const list = document.getElementsByClassName("items-list")[0];
    const child = document.createElement("div");
    child.className = "item";
    child.innerHTML =
        `<span class="item-name">${name}</span>
        <div class="quantity-controls">
        <button class="btn quantity-btn minus ${quantity === 1 ? "disabled" : ""} data-tooltip="-">-
        </button>
        <span class="quantity-value">${quantity}</span>
            <button class="btn quantity-btn plus" data-tooltip="+">+</button>
            </div>
            <div class="action-buttons">
            <button class="btn action-btn buy" data-tooltip="tooltip">Куплено</button>
            <button class="btn action-btn delete" data-tooltip="x">✖</button>
            </div>`
    list.appendChild(child);
    child.querySelectorAll('.buy').forEach(btn =>{
        btn.addEventListener('click', ()=>{ changeBuyState(child, btn)});
    });
    items_container.appendChild(child);

    if(arguments.length === 0){
        const text_field = document.getElementById("item-add-text");
        text_field.value = "";
        text_field.focus();
    }
}

function changeBuyState(item, btn){
    if(item.classList.contains('bought')){
        item.classList.remove('bought');
        btn.textContent = "Куплено";
    } else{
        item.classList.add('bought');
        btn.textContent = "Не куплено";
    }
}