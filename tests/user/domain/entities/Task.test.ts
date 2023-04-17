import {Task,TaskStatus} from "../../../../src/user/domain/entities/Task"



describe("Task", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task("Comprar leche");
  });
  it("debe tener un id único", () => {
      expect(task.id).toBeDefined();
    });
    it("debe tener una descripción", () => {
        expect(task.description).toEqual("Comprar leche");
    });
    
    it("debe tener endTime como null inicialmente", () => {
        expect(task.endTime).toBeNull();
    });     
    
  it("debe poder marcar la tarea como PENDING incialmente", () => {
    expect(task.status).toBe(TaskStatus.PENDING);
  }); 
});


