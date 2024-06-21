import { PubSub } from "./PubSub.js";

const itemSection = document.querySelector(".listitems");
const projectSection = document.querySelector('.projectlist');

const projects = {
    allProjects: {},

    createProject(arr){
        const projectName = arr[0];
        const todo = arr[1];
        console.log(`creating a project ${projectName} with todo ${todo.title}`);
        projects.allProjects[projectName] = projects.allProjects[projectName] || [];
        projects.allProjects[projectName].push(todo);
        console.log(projects.allProjects);
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

    getDetails(arr){
        // console.log(arr);
        const a = arr[0];
        const b = arr[1];
        // console.log(a,b)
        // console.log(projects.allProjects[a])
        projects.allProjects[a].forEach(element => {
            if(element.title == b){
                const arr1 = [element.project, element.title, element.description, element.dueDate, element.priority];
                // console.log(arr1);
                PubSub.Publish("sendingDetails", arr1);
                return;
            }
        })
    },

    changePriority(n){
        this.priority = n;
    },

    printTodos(projectName){
        PubSub.Publish("cleaningDOM",itemSection);
        PubSub.Publish("cleaningDOM", projectSection);
        console.log(projects.allProjects[projectName])
        console.log(projects.allProjects)
        if(projects.allProjects[projectName]){
            projects.allProjects[projectName].forEach(element => {
                PubSub.Publish("printingTodos", element);
            })
            PubSub.Publish("printingProjects", projectSection);
        }
    },

    printProjects(projectSection){
        Object.keys(projects.allProjects).forEach(key => {
            if(Object.keys(projects.allProjects[key]).length){
                const projli = document.createElement('li');
                projli.classList.add(`${key}`);
                projli.id = "projectli";
                // projli.classList.add('projectli');
                projli.innerHTML = key;
                projectSection.append(projli);
            }
        });    
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
PubSub.Subscribe("printingProjects", projects.printProjects);
PubSub.Subscribe("callPrintTodos", projects.printTodos);
PubSub.Subscribe("gettingDetails", projects.getDetails);