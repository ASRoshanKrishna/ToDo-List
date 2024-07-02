import './style.css';
import populateContent from './DOM.js';
import { projects } from './projects.js';
import todos from './todos.js';
import { format } from 'date-fns';
import { PubSub } from './PubSub.js';

if (!localStorage.getItem("allProjects")) {
    PubSub.Publish("sendingJSON", 'dummy');
} 
else {
    PubSub.Publish("gettingJSON", 'dummy');
}