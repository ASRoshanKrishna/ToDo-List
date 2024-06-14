import { projects } from './projects.js';

const itemSection = document.querySelector(".listitems");

function del(elid, elValue){
    projects.removeTodo(elid, elValue);
}

export default function populateContent(projectName){
    while(itemSection.firstChild){
        itemSection.removeChild(itemSection.firstChild);
    }

    if(projects.allProjects[projectName]){
        projects.allProjects[projectName].forEach(element => {
            // console.log(element);
            let ele = element.title;
            console.log(ele);
            const card = document.createElement('div');
            card.classList.add('card');
            let values = `<p>${element.priority}</p>
                        <input type="checkbox">
                        <label>${element.title}</label>
                        <p>${element.description}</p>
                        <p>${element.dueDate}</p>
                        <button class="btn" id="${projectName}" value="${ele}" type="button">Remove</button>`;

            card.innerHTML = values;
            itemSection.appendChild(card);
        });
    };
    const elebtn = document.querySelectorAll(".btn");
    elebtn.forEach((el) =>{
        el.addEventListener('click', function(){
            del(el.id, el.value);
        });
    })
}