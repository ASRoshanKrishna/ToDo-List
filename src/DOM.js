import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

const form = document.querySelector('#fo');
const addnew = document.querySelector('#adder');
const dialog = document.querySelector("#addDialog");
const showButton = document.querySelector("#addnew");
const closeButton = document.querySelector("#close");
const itemSection = document.querySelector(".todonames");
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
        prog = 'High';
    }
    else if(progress2){
        prog = 'Medium';
    }
    else if(progress3){
        prog = 'Low';
    }
    
    const d = new Date();
    const dc = format(d, "yyyy-MM-dd")
    const checkdue = dueDate.value>=dc;
    if(projectName.value && title.value && description.value && dueDate.value && prog){
        if(checkdue==false){
            alert("You cannot create a ToDo for the past!!")
            dueDate.value = "";
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
    let editContent = `<h2>Editing the ToDo</h2>
                    <div class="input1">
                    <label for="projectname"><b>Project: </b></label>
                    <input type="text" class="${arr[0]}" id="editprojectname" value="${arr[0]}" readonly>
                    </div>
                    <div class="input2">
                    <label for="title"><b>Title: </b></label>
                    <input type="text" class="${arr[1]}" id="edittitle" value="${arr[1]}" required>
                    </div>
                    <div class="input3">
                    <label for="description"><b>Description: </b></label>
                    <textarea id="editdescription" name="Text1" rows="4" cols="30" required>${arr[2]}</textarea>
                    </div>
                    <div class="input4">
                    <label for="duedate"><b>Due Date: </b></label>
                    <input type="date" id="editduedate" value="${arr[3]}" required>
                    </div>
                    <div class="input5">
                    <label><b>Priority: </b></label>
                    <label for="editone">High</label>
                    <input type="radio" id="editone" name="Priority" required>
                    <label for="edittwo"> Medium</label>
                    <input type="radio" id="edittwo" name="Priority" required>
                    <label for="editthree"> Low</label>
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
        prog = 'High';
    }
    else if(progress2){
        prog = 'Medium';
    }
    else if(progress3){
        prog = 'Low';
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
    let detailContent = `<h2>${arr[1]}</h2>
                        <p><b>Project:</b>  ${arr[0]}</p>
                        <p><b>Description:</b>  ${arr[2]}</p>
                        <p><b>DueDate:</b>  ${arr[3]}</p>
                        <p><b>Priority:</b>  ${arr[4]}</p>`;
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
    console.log(ele);
    let box = 'unchecked';
    const card = document.createElement('div');
    card.classList.add('card');
    if(element.progress == true){
         box = 'checked';
         card.classList.add('line');
    }
    if(element.priority == 'High'){
        card.classList.add('high');
    }
    if(element.priority == 'Medium'){
        card.classList.add('medium');
    }
    else if(element.priority == 'Low'){
        card.classList.add('low');
    }
    let values = `<div>
                <input class="check" id="${projectName}" value="${ele}" type="checkbox" ${box}>
                ${element.title}
                </div>
                <div>
                ${mmdd}
                <button class="edit btn" id="${projectName}" value="${ele}"><i id="edit" class="fa fa-edit"></i></button>
                <button class="rmv btn" id="${projectName}" value="${ele}" type="button"><i id="rmv" class="fa fa-trash"></i></button>
                <button class="details" id="${projectName}" value="${ele}">Details</button>
                </div>`;

    card.innerHTML = values;
    itemSection.appendChild(card);
}

function populateProjects(key){
    const projli = document.createElement('li');
    projli.classList.add(`${key}`);
    // projli.classList.add('projectli');
    projli.innerHTML = `<span id="${key}" class="projectli">${key}</span> <button class="rmv btn1" id="${key}" type="button"><i id="rmvp" class="fa fa-trash"></i></button>`;
    projectSection.append(projli);
}

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.classList.contains('rmv')){
        del(event.target.id, event.target.value);
    }
})

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.id == 'rmv'){
        del(event.target.parentNode.id, event.target.parentNode.value);
    }
})

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.id == 'edit'){
        edit(event.target.parentNode.id, event.target.parentNode.value);
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
    if(event.target && event.target.classList.contains("projectli")){
        // console.log(event.target.id)
        PubSub.Publish("callPrintTodos", event.target.id);
    }
})

projectSection.addEventListener('click', function(event){
    if(event.target && event.target.id == 'rmvp'){
        // console.log(event.target.parentNode.id);
        PubSub.Publish("removingProjects", event.target.parentNode.id);
    }
})


PubSub.Subscribe("printingTodos", populateContentinDOM);
PubSub.Subscribe("printingProjects", populateProjects);
PubSub.Subscribe("cleaningDOM", cleanDOM);
PubSub.Subscribe("sendingDetails", printDetails);
PubSub.Subscribe("sendingEdits", printEdits);