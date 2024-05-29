window.onload = init;
function init(){
    document.getElementById("item-add-btn").addEventListener("click", ()=>{addItem()});
    document.getElementById("item-add-text").addEventListener('keypress', (e)=>{
        if(e.key == "Enter"){
            e.preventDefault();
            addItem();
        }
    })

    //remove
    document.querySelectorAll(".delete").forEach(btn => { btn.addEventListener('click', deleteItem);});

    //remove
    document.querySelectorAll('.item').forEach((item)=>{
        item.querySelectorAll('.buy').forEach(btn =>{
            btn.addEventListener('click', ()=>{ changeBuyState(item)});
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
            <span class="quantity-value">${quantity}</span>
        </div>
        <div class="action-buttons">
        </div>`;
    addNameInputHandler(child);
    addItemButtons(child, true);
    if(isDisabled)
        changeBuyState(child);    
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
        const html = `<input type="text" class="item-name" value="${prev_value}">`;
        let input_field = htmlElement(html);
        span_field.replaceWith(input_field);
        input_field.focus();
        input_field.addEventListener('blur', function() {
                let newValue = input_field.value;
                span_field.textContent = newValue;
                input_field.replaceWith(span_field);
            });
        });
}

function addItemButtons(item, isFresh = false){
    if(isFresh){
        const buyb = htmlElement('<button class="btn action-btn buy" data-tooltip="tooltip">Куплено</button>'); 
        buyb.addEventListener('click', ()=>{ changeBuyState(item)});
        item.querySelector(".action-buttons").append(buyb);
    }
    const quantity = item.querySelector(".quantity-value").textContent;
    const minus = htmlElement(`<button class="btn quantity-btn minus ${quantity == 1 ? 'disabled" disabled="disabled' : ''}" data-tooltip="-">-</button>`);
    const plus = htmlElement('<button class="btn quantity-btn plus" data-tooltip="+">+</button>');
    const xxbtn = htmlElement('<button class="btn action-btn delete" data-tooltip="x">✖</button>');
    //minus.addEventListener('click', todo);
    //plus.addEventListener('click', todo);
    xxbtn.addEventListener('click', deleteItem);
    
    item.querySelector(".quantity-controls").prepend(minus);    //insertAdjacentHTML('afterbegin', minus); 
    item.querySelector(".quantity-controls").append(plus);   //insertAdjacentHTML('beforeend', plus);
    item.querySelector(".action-buttons").append(xxbtn);
}

function removeItemButtons(item){
    item.querySelector(".minus").remove();
    item.querySelector(".plus").remove();
    item.querySelector(".delete").remove();
}

function htmlElement(html){
    let div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
}

function changeBuyState(item){
    const btn = item.querySelector(".buy");
    if(item.classList.contains('bought')){
        item.classList.remove('bought');
        btn.textContent = "Куплено";
        //todo hide
        addItemButtons(item);
    } else{
        item.classList.add('bought');
        btn.textContent = "Не куплено";
        removeItemButtons(item);
    }
}