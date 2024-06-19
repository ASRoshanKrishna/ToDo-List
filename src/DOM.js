import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

const itemSection = document.querySelector(".listitems");

function del(elid, elValue){
    const arr = [elid, elValue];
    PubSub.Publish("removingTodos", arr);
    // console.log(elid, elValue);
}

function chStatus(projectName, todo){
    const arr = [projectName, todo];
    console.log(projectName, todo)
    PubSub.Publish("changingStatus", arr);
}

function cleanDOM(itemSection){
    while(itemSection.firstChild){
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
                <p>${mmdd}</p>
                <button class="btn" id="${projectName}" value="${ele}" type="button">Remove</button>`;

    card.innerHTML = values;
    itemSection.appendChild(card);

    const elecheck = document.querySelectorAll(".check");
    elecheck.forEach((el) =>{
        el.addEventListener('click', function(){
            chStatus(el.id, el.value);
            // console.log(el.id, el.value);
        });
    })

    const elebtn = document.querySelectorAll(".btn");
    elebtn.forEach((el) =>{
        el.addEventListener('click', function(){
            del(el.id, el.value);
            // console.log(el.id, el.value);
        });
    })
}







PubSub.Subscribe("printingTodos", populateContentinDOM);
PubSub.Subscribe("cleaningDOM", cleanDOM);