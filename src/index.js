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


// let arr = ["Welcome",
//         "Welcome!",
//         "To get started try selecting the default todo list provided on the left. Also + button is present on the bottom that you can use to create your own todos!",
//         "2030-01-01",
//         false, 
//         "Low"];

// PubSub.Publish("creatingTodos", arr);

// let arr1 = ["ToDo", 
//         "Complete your first task!",
//         "Once you've finished your first task you can click the checkbox next to the task to mark it as complete. A completed task will not be deleted unless you opt to.",
//         "2030-01-01",
//         false, 
//         "High"];

// PubSub.Publish("creatingTodos", arr1);

// let arr2 = ["ToDo",
//         "Editing tasks",
//         "You can also edit the todo using the edit icon next to it!",
//         "2030-01-01",
//         false,
//         "Medium"];

// PubSub.Publish("creatingTodos", arr2);

// PubSub.Publish("callPrintTodos", arr[0]);

// PubSub.Publish("sendingJSON", arr[0]);
// PubSub.Publish("gettingJSON", arr[0]);