export default class todos{
    constructor(title, description, dueDate, status, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
    }

    changeStatus(){
        this.status = !this.status;
    }

    changePriority(n){
        this.priority = n;
    }
}

// const t1 = new todos("bath", "to Take bath", "1/7/24", 1);

// console.log(t1);
