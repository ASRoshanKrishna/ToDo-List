export const projects = {
    allProjects: {},

    createProject(projectName, todo){
        console.log(`creating a project ${projectName} with todo ${todo}`);
        this.allProjects[projectName] = this.allProjects[projectName] || [];
        this.allProjects[projectName].push(todo);
    },

    removeTodo(projectName, todo){
        console.log(`removing todo ${todo} from project ${projectName}`);
        if(this.allProjects[projectName].length==1){
            delete this.allProjects[projectName];
        }
        if(this.allProjects[projectName]){
            this.allProjects[projectName] = this.allProjects[projectName].filter((td) => td!==todo);
        }
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