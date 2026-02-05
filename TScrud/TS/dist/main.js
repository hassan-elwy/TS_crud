"use strict";
//----MOdal indicator---//
let modal = document.getElementById("taskModal");
function isModalActive() {
    modal = document.getElementById("taskModal");
    return modal?.style.display == 'block';
}
modal?.addEventListener('click', function (e) {
    if (e.target == modal || e.target == cancelbtn || e.target == btnClose) {
        isUpdate = false;
        udpateIndex = -1;
    }
});
let infoList = [];
let count = 0;
let isUpdate = false;
let udpateIndex = -1;
let searchControl = document.getElementById("TaskTitle");
let priority = document.getElementById("selectPriority");
let dueDate = document.getElementById("dueDate");
let descript = document.getElementById("Description");
let savebtn = document.getElementById("saveBtn");
let cancelbtn = document.getElementById("cancelBtn");
let btnClose = document.getElementById("btnClose");
searchControl?.addEventListener("input", function () {
    console.log("SearchValue:", searchControl?.value);
});
priority?.addEventListener("change", function () {
    console.log(priority?.value);
});
dueDate?.addEventListener("change", function () {
    console.log(dueDate?.value);
});
descript?.addEventListener("input", function () {
    console.log(descript?.value);
});
savebtn?.addEventListener("click", function () {
    let dangerSpan = document.getElementById("Form_Errorspan");
    if (String(searchControl?.value).length < 3) {
        dangerSpan.textContent = "must exceed 3 words";
    }
    else if (isUpdate) {
        updateCard(udpateIndex);
        isUpdate = false;
        udpateIndex = -1;
    }
    else {
        dangerSpan.textContent = '*';
        infoList.push({ id: count, Title: searchControl?.value, pirority: priority?.value, dueDate: new Date(dueDate?.value), Discription: descript?.value });
        console.log("infoList:", infoList);
        console.log("the to do", Todo);
        Todo?.insertAdjacentHTML("beforeend", CreateCard(infoList[infoList.length - 1].id));
        let editbtn = document.getElementById(`ed-${infoList[infoList.length - 1].id}`);
        console.log(editbtn);
        editbtn?.addEventListener('click', function () {
            isUpdate = true;
            udpateIndex = Number(this.id.split("-")[1]);
            console.log("model update mode:sending index:", udpateIndex);
        });
        let delbtn = document.getElementById(`del-${infoList[infoList.length - 1].id}`);
        console.log("del Button is actve:", delbtn);
        delbtn?.addEventListener('click', function () {
            deleteInfo(Number(this.id.split('-')[1]));
        });
        TodoTranstions(infoList[infoList.length - 1].id);
        cancelbtn.click();
        count++;
        JSON.parse(JSON.stringify(infoList));
        console.log("infoList tracked cards:", infoList);
    }
});
//--------inserting data to board----------//
let Todo = document.getElementById("ToDo");
console.log(Todo);
var Progress = document.getElementById("Progress");
var Completed = document.getElementById("Completed");
let emptyState = ` 
<div class="empty-state text-center text-slate-100 fw-semibold">
    <i class="fa-regular fa-folder-open fs-1 mb-2 opacity-50"></i>
        <p class="mb-0 ">No tasks yet</p>
    <small>Click + to add one</small>
</div>
                `;
function CreateCard(index) {
    let newElement = infoList.find((e) => { return e.id == index; });
    console.log("inserting card for:", newElement);
    return ` <div class="task-card card my-3 p-3 shadow-sm border" id='ca-${newElement?.id}'>
                       
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="dot bg-secondary"></span>
                                        <span class="task-id text-uppercase">#${newElement?.id}</span>
                                    </div>
    
                                    <div class="task-actions">
                                        <button class="btn btn-sm btn-light edit-btn" id="ed-${index}" data-bs-toggle="modal" data-bs-target="#taskModal" title="Edit task">
                                            <i class="fa-solid fa-pen small"></i>
                                        </button>
    
                                        <button class="btn btn-sm btn-light delete-btn text-danger" id="del-${index}" title="Delete task">
                                            <i class="fa-solid fa-trash-can small"></i>
                                        </button>
                                    </div>
                                </div>
    
                              
                                <h6 class="fw-semibold text-dark mb-2">
                                    ${newElement?.Title}
                                </h6>
                                <p class="fw-semibold text-secondary mb-2">
                                    ${newElement?.Discription}
                                </p>
                            
                                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                                    <span class="badge priority-badge text-primary bg-info-subtle">
                                        <span class="priority-dot bg-primary"></span>
                                        ${newElement?.pirority}
                                    </span>
                                    <span class="badge priority-badge text-red bg-red ">
                                        <i class="fa-solid fa-triangle-exclamation"></i>
                                        OVERDUE
                                    </span>
                                </div>
    
                             
                                <div class="d-flex align-items-center gap-3 text-muted small pb-3 mb-3 border-bottom">    
                                
                                <div class="d-flex align-items-center gap-1">
                                        <i class="fa-regular fa-clock"></i>
                                        <span>${new Date().getMinutes()} ago</span>
                                    </div>
                                </div>
    
                                <div class="d-flex flex-wrap gap-2" id="transition_buttons">
                               <button class="btn btn-sm text-amber-500 bg-amber-50 status-btn" id='ToProgress' data-status="in-progress">
                                    <i class="fa-solid fa-play"></i> Start
                                </button>
                                
                                <button class="btn btn-sm text-emerald-500 bg-emerald-50  status-btn" id="ToComplete" data-status="completed">
                                    <i class="fa-solid fa-check"></i> Complete
                                </button>
                                </div>
                            </div>`;
}
//------------updating---------//
function updateCard(index) {
    let card = document.getElementById(`ca-${index}`);
    let transGroup = card.querySelector("#transition_buttons");
    let IdIndex = infoList.findIndex((e) => { return e.id == index; });
    console.log("updating the index:", index, "\nwhere info:", infoList[IdIndex], '\n updating card:', card);
    infoList[IdIndex] = { id: infoList[IdIndex].id, Title: searchControl?.value, pirority: priority?.value, dueDate: new Date(dueDate?.value), Discription: descript?.value };
    card.innerHTML = CreateCard(infoList[IdIndex].id);
    card.innerHTML = card.firstElementChild?.getHTML() ?? "error";
    card.querySelector("#transition_buttons")?.replaceChildren(transGroup);
    let editbtn = document.getElementById(`ed-${infoList[IdIndex].id}`);
    console.log("edit button is active:", editbtn);
    editbtn?.addEventListener('click', function () {
        isUpdate = true;
        udpateIndex = Number(this.id.split("-")[1]);
        console.log("model update mode:sending index:", udpateIndex);
    });
    let delbtn = document.getElementById(`del-${infoList[IdIndex].id}`);
    console.log("del Button is actve:", delbtn);
    delbtn?.addEventListener('click', function () {
        deleteInfo(Number(this.id.split('-')[1]));
    });
    cancelbtn.click();
    JSON.parse(JSON.stringify(infoList));
    console.log("infoList After Updating cards:", infoList);
}
//-----delete---//
function deleteInfo(index) {
    let IdIndex = infoList.findIndex((e) => { return e.id == index; });
    let card = document.getElementById(`ca-${index}`);
    card.remove();
    console.log("removing elements \n before removal of element:", index, ":", infoList);
    infoList.splice(IdIndex, 1);
    console.log("after removal:", infoList);
}
//----transitions----//
function TodoTranstions(index) {
    let card = document.getElementById(`ca-${index}`);
    let transGroup = card.querySelector('#transition_buttons');
    let ToProgress;
    let ToComplete;
    transGroup.innerHTML = ``;
    transGroup?.insertAdjacentHTML('beforeend', ` <button class="btn btn-sm text-amber-500 bg-amber-50 status-btn" id='ToProgress' data-status="in-progress">
                                    <i class="fa-solid fa-play"></i> Start
                                </button>
                                
                                <button class="btn btn-sm text-emerald-500 bg-emerald-50  status-btn" id="ToComplete" data-status="completed">
                                    <i class="fa-solid fa-check"></i> Complete
                                </button>`);
    ToProgress = transGroup?.querySelector("#ToProgress");
    ToComplete = transGroup?.querySelector("#ToComplete");
    ToProgress?.addEventListener('click', function () {
        card.remove();
        Progress?.insertAdjacentElement('beforeend', card);
        ToProgressTranstions(index);
    });
    ToComplete?.addEventListener('click', function () {
        card.remove();
        Completed?.insertAdjacentElement('beforeend', card);
        ToCompleteTranstions(index);
    });
}
function ToProgressTranstions(index) {
    let card = document.getElementById(`ca-${index}`);
    let transGroup = card.querySelector('#transition_buttons');
    let ToTodo;
    let ToComplete;
    transGroup.innerHTML = ``;
    transGroup?.insertAdjacentHTML('beforeend', ` <button class="btn btn-sm bg-slate-100 status-btn" id='ToTodo' data-status="in-progress">
                                    <i class="fa-solid fa-rotate-right"></i> Todo
                                </button>
                                
                                <button class="btn btn-sm text-emerald-500 bg-emerald-50  status-btn" id="ToComplete" data-status="completed">
                                    <i class="fa-solid fa-check"></i> Complete
                                </button>`);
    ToTodo = transGroup?.querySelector("#ToTodo");
    ToComplete = transGroup?.querySelector("#ToComplete");
    ToTodo?.addEventListener('click', function () {
        card.remove();
        Todo?.insertAdjacentElement('beforeend', card);
        TodoTranstions(index);
    });
    ToComplete?.addEventListener('click', function () {
        card.remove();
        Completed?.insertAdjacentElement('beforeend', card);
        ToCompleteTranstions(index);
    });
}
function ToCompleteTranstions(index) {
    let card = document.getElementById(`ca-${index}`);
    let transGroup = card.querySelector('#transition_buttons');
    let ToProgress;
    let ToTodo;
    transGroup.innerHTML = ``;
    transGroup?.insertAdjacentHTML('beforeend', ` 
        <button class="btn btn-sm bg-slate-100 status-btn" id='ToTodo' data-status="in-progress">
                                    <i class="fa-solid fa-rotate-right"></i> Todo
                                </button>
        
        <button class="btn btn-sm text-amber-500 bg-amber-50 status-btn" id='ToProgress' data-status="in-progress">
        <i class="fa-solid fa-play"></i> Start
        </button>
                                
                                `);
    ToProgress = transGroup?.querySelector("#ToProgress");
    ToTodo = transGroup?.querySelector("#ToTodo");
    ToProgress?.addEventListener('click', function () {
        card.remove();
        Progress?.insertAdjacentElement('beforeend', card);
        ToProgressTranstions(index);
    });
    ToTodo?.addEventListener('click', function () {
        card.remove();
        Todo?.insertAdjacentElement('beforeend', card);
        TodoTranstions(index);
    });
}
//# sourceMappingURL=main.js.map