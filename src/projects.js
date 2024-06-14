import populateContent from "./DOM.js";

export const projects = {
    allProjects: {},

    printProject(projectName){
        populateContent(projectName);
    },

    createProject(projectName, todo){
        console.log(`creating a project ${projectName} with todo ${todo}`);
        this.allProjects[projectName] = this.allProjects[projectName] || [];
        this.allProjects[projectName].push(todo);
    },

    removeTodo(projectName, todo){
        console.log(`removing todo ${todo} from project ${projectName}`);
        if(this.allProjects[projectName]){
            this.allProjects[projectName] = this.allProjects[projectName].filter((td) => td.title!=todo);
        }
        this.printProject(projectName);
        console.log(this.allProjects);
    },

    printTodos(projectName){
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