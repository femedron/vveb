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
    //remove
    document.querySelectorAll(".delete").forEach(btn => { btn.addEventListener('click', deleteItem);});

    //remove
    document.querySelectorAll('.item').forEach((item)=>{
        item.querySelectorAll('.buy').forEach(btn =>{
            btn.addEventListener('click', ()=>{ changeBuyState(item, btn)});
        });
    });

    initItems();
}

function initItems(){
    addItem("Памідор");
    addItem("Один елбан", 1);
    addItem("Два елбана", 2);
    addItem("Три елбана", 3, false);
    addItem("Дцп1", 1, true);
    addItem("Дцп2", 2, true);
}

function deleteItem(e){
    if(e.target && e.target.classList.contains('delete')){
        const item = e.target.closest('.item');
        if(item){
            item.remove();
        }
    }
}

function addItem(name = document.getElementById("item-add-text").value, quantity = 1, isDisabled = false){
    const list = document.getElementsByClassName("items-list")[0];
    const child = document.createElement("div");
    child.className = "item";
    child.innerHTML =
        `<span class="item-name">${name}</span>
        <div class="quantity-controls">
        <button class="btn quantity-btn minus ${quantity == 1 ? 'disabled" disabled="disabled' : ''}" data-tooltip="-">-
        </button>
        <span class="quantity-value">${quantity}</span>
            <button class="btn quantity-btn plus" data-tooltip="+">+</button>
            </div>
            <div class="action-buttons">
            <button class="btn action-btn buy" data-tooltip="tooltip">Куплено</button>
            <button class="btn action-btn delete" data-tooltip="x">✖</button>
            </div>`;
    if(isDisabled)
        changeBuyState(child);    
    child.querySelectorAll('.buy').forEach(btn =>{
        btn.addEventListener('click', ()=>{ changeBuyState(child, btn)});
    });

    addNameInputHandler(child);
        
    items_container.appendChild(child);
    list.appendChild(child);

    if(arguments.length === 0){
        const text_field = document.getElementById("item-add-text");
        text_field.value = "";
        text_field.focus();
    }
}

function addNameInputHandler(item){
    const span_field = item.querySelector('.item-name');
    span_field.addEventListener('click', ()=>{
        let prev_value = span_field.textContent;
        //<template>
        const template = document.createElement('template');
        template.innerHTML = `<input type="text" class="item-name" value="${prev_value}">`;
        const result = template.content.children;

        let input_field = result[0];
        span_field.replaceWith(input_field);
        input_field.focus();
        input_field.addEventListener('blur', function() {
                let newValue = input_field.value;
                span_field.textContent = newValue;
                input_field.replaceWith(span_field);
            });
        });
}

function changeBuyState(item, btn = item.querySelector(".buy")){
    if(item.classList.contains('bought')){
        item.classList.remove('bought');
        btn.textContent = "Куплено";

        const quantity = item.querySelector(".quantity-value").textContent;
        const minus = `<button class="btn quantity-btn minus ${quantity == 1 ? 'disabled" disabled="disabled' : ''}" data-tooltip="-">-</button>`;
        const plus = '<button class="btn quantity-btn plus" data-tooltip="+">+</button>';
        const xxbtn = '<button class="btn action-btn delete" data-tooltip="x">✖</button>';
        item.querySelector(".quantity-controls").insertAdjacentHTML('afterbegin', minus);
        item.querySelector(".quantity-controls").insertAdjacentHTML('beforeend', plus);
        item.querySelector(".action-buttons").insertAdjacentHTML('beforeend', xxbtn);
    } else{
        item.classList.add('bought');
        btn.textContent = "Не куплено";

        item.querySelector(".minus").remove();
        item.querySelector(".plus").remove();
        item.querySelector(".delete").remove();
    }
}