import { PubSub } from "./PubSub.js";

const projects = {
    allProjects: {},

    // printProject(projectName){
    //     populateContent(projectName);
    // },

    createProject(arr){
        const projectName = arr[0];
        const todo = arr[1];
        console.log(`creating a project ${projectName} with todo ${todo.title}`);
        projects.allProjects[projectName] = projects.allProjects[projectName] || [];
        projects.allProjects[projectName].push(todo);
        console.log(projects.allProjects);
        // projects.consoleTodos(projectName);
        projects.printTodos(projectName);
    },

    removeTodo(arr){
        const pjName = arr[0];
        const tdName = arr[1];
        console.log(`removing todo ${tdName} from project ${pjName}`);
        if(projects.allProjects[pjName]){
            projects.allProjects[pjName] = projects.allProjects[pjName].filter((td) => td.title!=tdName);
        }
        projects.printTodos(pjName);
        console.log(projects.allProjects);
    },

    changeStatus(arr){
        // todos.changeStatus(elclass, elvalue);
        // console.log(projectName, todo);
        const pjName = arr[0];
        const tdName = arr[1];
        console.log(`changing progress of ${tdName} from project ${pjName}`);
        projects.allProjects[pjName].forEach((td) =>{
            if(td.title==tdName){
                console.log(td.title, td.progress);
                td.progress = !td.progress;
                console.log(td.title, td.progress);
                event.preventDefault();
            }
        })
        event.preventDefault();
        projects.printTodos(pjName);
        console.log(projects.allProjects);
    },

    changePriority(n){
        this.priority = n;
    },

    printTodos(projectName){
        const itemSection = document.querySelector(".listitems");
        PubSub.Publish("cleaningDOM",itemSection);
        // event.preventDefault();
        if(projects.allProjects[projectName]){
            projects.allProjects[projectName].forEach(element => {
                PubSub.Publish("printingTodos", element);
                // event.preventDefault();
            })
        }
    },
    
    consoleTodos(projectName){
        if(this.allProjects[projectName]){
            this.allProjects[projectName].forEach(element => {
                console.log(element);
            });
        }
        else{
            console.log("emp");
        }
    },
}

PubSub.Subscribe("creatingProjects", projects.createProject);
PubSub.Subscribe("removingTodos", projects.removeTodo);
PubSub.Subscribe("changingStatus", projects.changeStatus);