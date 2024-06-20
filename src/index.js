import './style.css';
import populateContent from './DOM.js';
import { projects } from './projects.js';
import todos from './todos.js';
import { PubSub } from './PubSub.js';
import { format } from 'date-fns';

const form = document.querySelector('#fo');
const addnew = document.querySelector('#adder');
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#addnew");
const closeButton = document.querySelector("#close");

addnew.addEventListener("click", () => {
    // console.log('hi')
    // event.preventDefault();
    // form.reset();
    // dialog.close();
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
    else{
        prog = 3;
    }
    
    const d = new Date();
    const dc = format(d, "yyyy-MM-dd")
    const checkdue = dueDate.value>=dc;
    // console.log(projectName.value, title.value, description.value, dueDate.value, checkdue, prog)
    // console.log('hi new')
    newArr = [projectName.value, title.value, description.value, dueDate.value, false, prog];
    // console.log(newArr)
    PubSub.Publish("creatingTodos", newArr);
    event.preventDefault();
    form.reset();
    dialog.close();
}

let arr = ["projectOne", "one","first","1/1/2001", false, 1];
PubSub.Publish("creatingTodos", arr);
let arr1 = ["projectOne", "two","two","1/1/2001", false, 2];
PubSub.Publish("creatingTodos", arr1);