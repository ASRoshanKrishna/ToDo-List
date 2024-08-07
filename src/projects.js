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
        projects.changeallProjects();
    },

    removeProject(element){
        let prevProj = "";
        Object.keys(projects.allProjects).forEach((key) => {
            console.log(prevProj)
            if(key == element){
                delete projects.allProjects[key];
                projects.changeallProjects();
                if(prevProj == "") {
                    projects.newPopulate();
                }
                else {
                    projects.printTodos(prevProj);
                }
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
        projects.changeallProjects();
    },

    getDetails(arr){
        const pjName = arr[0];
        const tdName = arr[1];
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                const arr1 = [element.project, element.title, element.description, element.dueDate, element.priority];
                PubSub.Publish("sendingDetails", arr1);
                return;
            }
        })
    },

    getEdits(arr){
        const pjName = arr[0];
        const tdName = arr[1];
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                const arr1 = [element.project, element.title, element.description, element.dueDate, element.priority];
                PubSub.Publish("sendingEdits", arr1);
                return;
            }
        })
    },

    editTodos(arr){
        const pjName = arr[0];
        const tdName = arr[1];
        projects.allProjects[pjName].forEach(element => {
            if(element.title == tdName){
                element.project = arr[2];
                element.title = arr[3];
                element.description = arr[4];
                element.dueDate = arr[5];
                element.priority = arr[7];
                projects.printTodos(element.project);
            }
        })
        projects.changeallProjects();
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

    sendJSON(dummy){
        let arr = ["Welcome",
        "Welcome!",
        "To get started try selecting the default todo list provided on the left. Also + button is present on the bottom that you can use to create your own todos!",
        "2030-01-01",
        false, 
        "Low"];

        PubSub.Publish("creatingTodos", arr);

        let arr1 = ["ToDo", 
                "Complete task",
                "Once you've finished your first task you can click the checkbox next to the task to mark it as complete. A completed task will not be deleted unless you opt to.",
                "2030-01-01",
                false, 
                "High"];

        PubSub.Publish("creatingTodos", arr1);

        let arr2 = ["ToDo",
                "Editing tasks",
                "You can also edit the todo using the edit icon next to it!",
                "2030-01-01",
                false,
                "Medium"];

        PubSub.Publish("creatingTodos", arr2);

        PubSub.Publish("callPrintTodos", arr[0]);
    },

    getJSON(dummy){
        let allProjects_deserialized = JSON.parse(localStorage.getItem("allProjects"));
        projects.allProjects = allProjects_deserialized;
        console.log(projects.allProjects)
        projects.newPopulate();
    },

    changeallProjects(dummy){
        let allProjects_serialized = JSON.stringify(projects.allProjects);
        localStorage.setItem("allProjects", allProjects_serialized);
    },

    newPopulate(){
        Object.keys(projects.allProjects).forEach((key) => {
            projects.printTodos(key);
        })
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
PubSub.Subscribe("sendingJSON", projects.sendJSON);
PubSub.Subscribe("gettingJSON", projects.getJSON);
PubSub.Subscribe("settingLocals", projects.changeallProjects);