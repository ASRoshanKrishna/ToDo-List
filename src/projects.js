import { PubSub } from "./PubSub.js";

const itemSection = document.querySelector(".todonames");
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

    removeProject(element){
        // console.log(element)
        let prevProj;
        Object.keys(projects.allProjects).forEach((key) => {
            if(key == element){
                delete projects.allProjects[key];
                projects.printTodos(prevProj);
            }
            prevProj = key;
        })
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
        const pjName = arr[0];
        const tdName = arr[1];
        // console.log(a,b)
        // console.log(projects.allProjects[a])
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                const arr1 = [element.project, element.title, element.description, element.dueDate, element.priority];
                // console.log(arr1);
                PubSub.Publish("sendingDetails", arr1);
                return;
            }
        })
    },

    getEdits(arr){
        // console.log(arr)
        const pjName = arr[0];
        const tdName = arr[1];
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                const arr1 = [element.project, element.title, element.description, element.dueDate, element.priority];
                // console.log(arr1);
                PubSub.Publish("sendingEdits", arr1);
                return;
            }
        })
    },

    editTodos(arr){
        const pjName = arr[0];
        const tdName = arr[1];
        // console.log(pjName, tdName);
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                element.project = arr[2];
                element.title = arr[3];
                element.description = arr[4];
                element.dueDate = arr[5];
                element.priority = arr[7];
                // console.log(element);
                projects.printTodos(element.project);
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
            projects.printProjects(projectSection);
        }
    },

    printProjects(projectSection){
        Object.keys(projects.allProjects).forEach(key => {
            if(Object.keys(projects.allProjects[key]).length){
                // const projli = document.createElement('li');
                // projli.classList.add(`${key}`);
                // projli.id = "projectli";
                // // projli.classList.add('projectli');
                // projli.innerHTML = key;
                // projectSection.append(projli);
                PubSub.Publish("printingProjects", key);
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
PubSub.Subscribe("callPrintTodos", projects.printTodos);
PubSub.Subscribe("gettingDetails", projects.getDetails);
PubSub.Subscribe("gettingEdits", projects.getEdits);
PubSub.Subscribe("editingTodos", projects.editTodos);
PubSub.Subscribe("removingProjects", projects.removeProject);