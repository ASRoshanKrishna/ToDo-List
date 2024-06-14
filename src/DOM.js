import { projects } from './projects.js';
import { format } from 'date-fns';
import todos from './todos.js';

const itemSection = document.querySelector(".listitems");

function del(elid, elValue){
    projects.removeTodo(elid, elValue);
}

function chStatus(projectName, todo){
    // todos.changeStatus(elclass, elvalue);
    // console.log(projectName, todo);
    projects.allProjects[projectName].forEach((td) =>{
        if(td.title==todo){
            // console.log(td.title, td.status);
            td.status = !td.status;
            // console.log(td.title, td.status);
        }
    })
    projects.printProject(projectName);
    console.log(projects.allProjects);
}

export default function populateContent(projectName){
    while(itemSection.firstChild){
        itemSection.removeChild(itemSection.firstChild);
    }

    if(projects.allProjects[projectName]){
        projects.allProjects[projectName].forEach(element => {
            // console.log(element);
            let ele = element.title;
            let mmdd = format(element.dueDate, "MMM Qo");
            let box = 'unchecked';
            if(element.status == true) box = 'checked';
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
        });
    };

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
        });
    })
}