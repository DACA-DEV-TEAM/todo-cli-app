import Task from './Task'

class Tasks {
  private _taskList: Task[];
  
  constructor(){
    this._taskList = [];
  }

  public getTaskList(): Task[] {
    return this._taskList
  }

  public addTask(task:Task): void {
    this._taskList.push(task)
  }

  public deleteTask(task:Task): void {
    this._taskList = this._taskList.filter(t => t !== task)
  }
  
}

export default Tasks;