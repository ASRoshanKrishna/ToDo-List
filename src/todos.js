import { PubSub } from './PubSub.js';

function todoFact(arr){
    const objTodo = {};
    objTodo['project'] = arr[0];
    objTodo['title'] = arr[1];
    objTodo['description'] = arr[2];
    objTodo['dueDate'] = arr[3];
    objTodo['progress'] = arr[4];
    objTodo['priority'] = arr[5];

    const arr1 = [objTodo['project'], objTodo]

    PubSub.Publish("creatingProjects", arr1);
}

PubSub.Subscribe("creatingTodos", todoFact);