import './style.css';
import populateContent from './DOM.js';
import { projects } from './projects.js';
import todos from './todos.js';
import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

let arr = ["projectOne", "one","first","1/1/2001", false, 1];
PubSub.Publish("creatingTodos", arr);
let arr1 = ["projectOne", "two","two","1/1/2001", false, 2];
PubSub.Publish("creatingTodos", arr1);