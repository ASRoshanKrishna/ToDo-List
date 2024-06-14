import { projects } from "./projects";

export default class todos{
    constructor(title, description, dueDate, status, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
    }

    // changeStatus(projectName, todo){
    //     // this.status = !this.status;
    //     if(projects.allProjects[projectName]){
    //         projects.allProjects[projectName] = projects.allProjects[projectName].filter((td) => {
    //             if(td.title == todo){
    //                 td.status = !td.status;
    //             }
    //         });
    //     }
    //     projects.printProject(projectName);
    //     console.log(projects.allProjects);
    // }

    changePriority(n){
        this.priority = n;
    }
}

// const t1 = new todos("bath", "to Take bath", "1/7/24", 1);

// console.log(t1);
