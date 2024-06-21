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

function NewTodo(){
    let newArr = [];
    const projectName = document.getElementById('projectname');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('duedate');
    const progress1 = document.getElementById('one').checked; 
    const progress2 = document.getElementById('two').checked; 
    const progress3 = document.getElementById('three').checked;
    let prog = 0;
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
    let mmdd = format(element.dueDate, "MMM Qo");
    let box = 'unchecked';
    if(element.progress == true) box = 'checked';
    console.log(ele);
    const card = document.createElement('div');
    card.classList.add('card');
    let values = `<p>${element.priority}</p>
                <input class="check" id="${projectName}" value="${ele}" type="checkbox" ${box}>
                <label>${element.title}</label>
                <p>${element.description}</p>
                <button class="details" id="${projectName}" value="${ele}">Details</button>
                <p>${mmdd}</p>
                <button class="btn" id="${projectName}" value="${ele}" type="button">Remove</button>`;

    card.innerHTML = values;
    itemSection.appendChild(card);
}

itemSection.addEventListener('click', function(event){
    if(event.target && event.target.classList.contains('btn')){
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