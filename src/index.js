import './style.css';
import todos from './todos.js';
import populateContent from './DOM.js';
import { projects } from './projects.js';
import { format } from 'date-fns';

console.log("ToDo-List")

const p1 = "projectOne";
const p2 = "projectTwo";

const t1 = new todos("one","first","1/1/2001", true, 1);
const t2 = new todos("two","second","2/2/2002", true, 2);
const t3 = new todos("three","third","3/3/2003", false, 3);
const t4 = new todos("four","fourth","4/4/2004", true, 3);

projects.createProject(p1, t1);
projects.createProject(p1, t2);
projects.createProject(p1, t3);

// projects.createProject(p2, t4);

// projects.removeTodo(p1,t1);
// projects.removeTodo(p1,t2);
// projects.removeTodo(p1,t3);

// projects.printTodos(p1);

function dele(){
    console.log("hi")
}


populateContent(p1);

// function removeCard(event){
//     console.log(event.target.id)
// }

// document.querySelector(".listitems").addEventListener('click', function(event){
//     if(event.target.classList.contains('btn')){
//         removeCard(event);
//     }
// })

// t1.changeStatus();
// t1.changePriority(3);

// projects.printTodos(p1);

// projects.removeTodo(p1,t1);
// projects.removeTodo(p1,t2);

projects.printTodos(p1);

// const dateSample = format(new Date(2010, 1, 14), "MMM-dd-yyyy");

// console.log(dateSample);
// projects.printTodos(p2);