import './style.css';
import populateContent from './DOM.js';
import { projects } from './projects.js';
import todos from './todos.js';
import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

let arr = ["projectOne", "one","first","2024-09-01", false, 'High'];
PubSub.Publish("creatingTodos", arr);
let arr1 = ["projectOne", "two","two","2024-11-02", false, 'Low'];
PubSub.Publish("creatingTodos", arr1);