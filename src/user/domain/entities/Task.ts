import { v4 as uuidv4 } from 'uuid';

class Task{
    private id:string;
    private date: null| Date;
    constructor(private desc: string) {
        this.id = uuidv4();
        this.date = null;
    }
    getId():string{
        return this.id;
    }
    getDesc():string{
        return this.desc;
    }
    getDate():null | Date {
        return this.date;
    }
    setDate():void{
        this.date = new Date()
    }
}
export default Task;