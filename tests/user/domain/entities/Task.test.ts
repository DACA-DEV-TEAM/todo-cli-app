import Task from "../../../../src/user/domain/entities/Task"



describe("Task", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task("Comprar leche");
  });
  it("debe tener un id único", () => {
      expect(task.getId()).toBeDefined();
    });
    it("debe tener una descripción", () => {
        expect(task.getDesc()).toEqual("Comprar leche");
    });
    
    it("debe tener completadoEn como null inicialmente", () => {
        expect(task.getDate()).toBeNull();
    });     
    
  it("debe poder marcar la tarea como completada", () => {
    task.setDate();
    expect(task.getDate()).toBeInstanceOf(Date);
  }); 
});


