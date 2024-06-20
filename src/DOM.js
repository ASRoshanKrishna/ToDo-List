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
    PubSub.Publish("changingStatus", arr);
    // event.preventDefault();
    // console.log(projectName, todo)
}

function cleanDOM(itemSection){
    const old_element = document.querySelectorAll(".check");
    // console.log(old_element)
    if(old_element){
        old_element.forEach((el) => {
            // console.log(el)
            const new_element = el.cloneNode(true);
            el.parentNode.replaceChild(new_element, el); 
        })
        // const new_element = old_element.cloneNode(true);
        // old_element.parentNode.replaceChild(new_element, old_element);
    }
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

    // const elecheck = document.querySelectorAll(".check");
    // elecheck.forEach((el) =>{
    //     el.addEventListener('change', function(){
    //         chStatus(el.id, el.value);
    //         // console.log(el.id, el.value);
    //         event.preventDefault();
    //     });
        
    // })

    // const elebtn = document.querySelectorAll(".btn");
    // elebtn.forEach((el) =>{
    //     el.addEventListener('click', function(){
    //         del(el.id, el.value);
    //         // console.log(el.id, el.value);
    //     });
    // })
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


PubSub.Subscribe("printingTodos", populateContentinDOM);
PubSub.Subscribe("cleaningDOM", cleanDOM);