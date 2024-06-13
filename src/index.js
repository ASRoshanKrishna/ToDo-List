import './style.css';
import todos from './todos.js';
import { projects } from './s.js';

console.log("ToDo-List")

const p1 = "projectOne";
const p2 = "projectTwo";

const t1 = new todos("one","first","1/1/2001",1);
const t2 = new todos("two","second","2/2/2002",2);
const t3 = new todos("three","third","3/3/2003",3);
const t4 = new todos("four","fourth","4/4/2004",3);

projects.createProject(p1, t1);
projects.createProject(p1, t2);
projects.createProject(p1, t3);

projects.createProject(p2, t4);

projects.removeTodo(p1,t1);
projects.removeTodo(p1,t2);
projects.removeTodo(p1,t3);

projects.printTodos(p1);

// projects.printTodos(p2);