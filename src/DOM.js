import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

const form = document.querySelector('#fo');
const addnew = document.querySelector('#adder');
const dialog = document.querySelector("#addDialog");
const showButton = document.querySelector("#addnew");
const closeButton = document.querySelector("#close");
const itemSection = document.querySelector(".listitems");
const projectSection = document.querySelector('.projectlist');

addnew.addEventListener("click", () => {
    NewTodo();
})

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    event.preventDefault();
    form.reset();
    dialog.close();
});


const detailbtn = document.querySelector('#detailDialog');
const detailDiv = document.querySelector('.detailDiv');
const detailClose = document.querySelector('#detailClose');

detailClose.addEventListener('click', () => {
    event.preventDefault();
    detailbtn.close();
});

const editbtn = document.querySelector('#editDialog');
const editDiv = document.querySelector('.editDiv');
const editAdd = document.querySelector('#editAdder');
const editClose = document.querySelector('#editClose');

editAdd.addEventListener("click", () => {
    editTodo();
})

editClose.addEventListener('click', () => {
    event.preventDefault();
    editbtn.close();
});


function NewTodo(){
    let newArr = [];
    const projectName = document.getElementById('projectname');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('duedate');
    const progress1 = document.getElementById('one').checked; 
    const progress2 = document.getElementById('two').checked; 
    const progress3 = document.getElementById('three').checked;
    let prog;
    if(progress1){
        prog = 1;
    }
    else if(progress2){
        prog = 2;
    }
    else if(progress3){
        prog = 3;
    }
    
    const d = new Date();
    const dc = format(d, "yyyy-MM-dd")
    const checkdue = dueDate.value>=dc;
    if(projectName.value && title.value && description.value && dueDate.value && prog){
        if(checkdue==false){
            alert("You cannot create a ToDo for the past!!")
            form.reset();
            NewTodo();
            return;
        }
        newArr = [projectName.value, title.value, description.value, dueDate.value, false, prog];
        PubSub.Publish("creatingTodos", newArr);
        event.preventDefault();
        form.reset();
        dialog.close();
    }
}

function del(elid, elValue){
    const arr = [elid, elValue];
    PubSub.Publish("removingTodos", arr);
}

function chStatus(projectName, todo){
    const arr = [projectName, todo];
    PubSub.Publish("changingStatus", arr);
}

function details(projectName, todo){
    const arr = [projectName, todo];
    PubSub.Publish("gettingDetails", arr);
}

function edit(projectName, todo){
    const arr = [projectName, todo];
    // console.log(arr)
    PubSub.Publish("gettingEdits", arr);
}

function printEdits(arr){
    console.log(arr);
    let editContent = `<h2>Create new To Do</h2>
                    <div class="input1">
                    <label for="projectname">Project</label>
                    <input type="text" class="${arr[0]}" id="editprojectname" value="${arr[0]}" readonly>
                    </div>
                    <div class="input2">
                    <label for="title">Title</label>
                    <input type="text" class="${arr[1]}" id="edittitle" value="${arr[1]}" required>
                    </div>
                    <div class="input3">
                    <label for="description">Description</label>
                    <textarea id="editdescription" name="Text1" cols="40" rows="5" required>${arr[2]}</textarea>
                    </div>
                    <div class="input4">
                    <label for="duedate">Due Date</label>
                    <input type="date" id="editduedate" value="${arr[3]}" required>
                    </div>
                    <div class="input5">
                    <label>Priority</label>
                    <label for="editone">1</label>
                    <input type="radio" id="editone" name="Priority" required>
                    <label for="edittwo">2</label>
                    <input type="radio" id="edittwo" name="Priority" required>
                    <label for="editthree">3</label>
                    <input type="radio" id="editthree" name="Priority" required>
                    </div>`;
    editDiv.innerHTML = editContent;
    editbtn.showModal();
}

function editTodo(){
    let newArr = [];
    const projectName = document.getElementById('editprojectname');
    const title = document.getElementById('edittitle');
    const description = document.getElementById('editdescription');
    const dueDate = document.getElementById('editduedate');
    const progress1 = document.getElementById('editone').checked; 
    const progress2 = document.getElementById('edittwo').checked; 
    const progress3 = document.getElementById('editthree').checked;
    let prog;
    if(progress1){
        prog = 1;
    }
    else if(progress2){
        prog = 2;
    }
    else if(progress3){
        prog = 3;
    }
    
    const d = new Date();
    const dc = format(d, "yyyy-MM-dd")
    const checkdue = dueDate.value>=dc;
    // newArr = [projectName.className, title.className, projectName.value, title.value, description.value, dueDate.value, false, prog];
    // console.log(newArr)
    if(projectName.value && title.value && description.value && dueDate.value && prog){
        if(checkdue==false){
            alert("You cannot create a ToDo for the past!!")
            event.preventDefault();
        }
        else{
            newArr = [projectName.className, title.className, projectName.value, title.value, description.value, dueDate.value, false, prog];
            console.log(newArr)
            PubSub.Publish("editingTodos", newArr);
            event.preventDefault();
            editbtn.close();
        }
    }
}

function printDetails(arr){
    let detailContent = `<p>Project: ${arr[0]}</p>
                        <p>Title: ${arr[1]}</p>
                        <p>Description: ${arr[2]}</p>
                        <p>DueDate: ${arr[3]}</p>
                        <p>Priority: ${arr[4]}</p>`;
    detailDiv.innerHTML = detailContent;
    detailbtn.showModal();
    console.log(arr);
}

function cleanDOM(itemSection){
    console.log(itemSection);
    while(itemSection.firstChild){
        console.log(`${itemSection} is deleting`);
        itemSection.removeChild(itemSection.firstChild);
    }
}

function populateContentinDOM(element){
    let projectName = element.project;
    let ele = element.title;
    let mmdd = format(element.dueDate, "MMM-do");
    console.log(mmdd)
    let box = 'unchecked';
    if(element.progress == true) box = 'checked';
    console.log(ele);
    const card = document.createElement('div');
    card.classList.add('card');
    if(element.priority == 1){
        card.classList.add('high');
    }
    if(element.priority == 2){
        card.classList.add('medium');
    }
    else if(element.priority == 3){
        card.classList.add('low');
    }
    let values = `<div>
                <input class="check" id="${projectName}" value="${ele}" type="checkbox" ${box}>
                <label>${element.title}</label>
                </div>
                <div>
                <span>${mmdd}</span>
                <button class="edit btn" id="${projectName}" value="${ele}"><i class="fa fa-edit"></i></button>
                <button class="rmv btn" id="${projectName}" value="${ele}" type="button"><i class="fa fa-trash"></i></button>
                <button class="details" id="${projectName}" value="${ele}">Details</button>
                </div>`;

    card.innerHTML = values;
    itemSection.appendChild(card);
}

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.classList.contains('rmv')){
        del(event.target.id, event.target.value);
    }
})


itemSection.addEventListener('change', function(event){
    if(event.target && event.target.classList.contains('check')){
        // console.log(event.target.id, event.target.value);
        chStatus(event.target.id, event.target.value);
    }
})

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.classList.contains('details')){
        // console.log(`details of ${event.target.value}`);
        details(event.target.id, event.target.value);
    }
})

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.classList.contains('edit')){
        // console.log(`Editing ${event.target.value}`);
        edit(event.target.id, event.target.value);
    }
})


projectSection.addEventListener('click', function(event){
    if(event.target && event.target.id == "projectli"){
        PubSub.Publish("callPrintTodos", event.target.className);
    }
    // PubSub.Publish("callPrintTodos", event.target.className);
    // console.log(event.target.className, event.target.id);
})


PubSub.Subscribe("printingTodos", populateContentinDOM);
PubSub.Subscribe("cleaningDOM", cleanDOM);
PubSub.Subscribe("sendingDetails", printDetails);
PubSub.Subscribe("sendingEdits", printEdits);