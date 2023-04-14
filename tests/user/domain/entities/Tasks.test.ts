import Task from "../../../../src/user/domain/entities/Task";
import Tasks from "../../../../src/user/domain/entities/Tasks";

describe("Tasks", () => {
  let tasks: Tasks;

  beforeEach(() => {
    tasks = new Tasks();
  });

  it("addTask agrega una nueva tarea a la lista de tareas", () => {
    // Arrange
    const arg = new Task("Nueva tarea"); // Valor de prueba para el argumento de la función
    // Act
    tasks.addTask(arg); // Llamar al método addTask con el valor de prueba
    // Assert
    expect(tasks.getTaskList().length).toBe(1); // Verificar que la longitud de la lista de tareas sea 1
    expect(tasks.getTaskList()[0].getDesc()).toBe(arg.getDesc()); // Verificar que la descripción de la tarea agregada sea igual al valor de prueba
  });

  it("getTaskList devuelve todas las tareas de la lista de tareas", () => {
    //Arrange
    const tarea1 = new Task("1");
    const tarea2 = new Task("2");
    const tarea3 = new Task("3");
    const tareas = [tarea1, tarea2, tarea3];
    tasks.addTask(tarea1);
    tasks.addTask(tarea2);
    tasks.addTask(tarea3);
    // Act
    tasks.getTaskList();
    // Assert
    expect(tasks.getTaskList()).toStrictEqual(tareas);
    expect(tasks.getTaskList().length).toBe(3);
    expect(tasks.getTaskList()).toContain(tarea1);
    expect(tasks.getTaskList()).toContain(tarea2);
    expect(tasks.getTaskList()).toContain(tarea3);
  });

  it("deleteTask", () => {
    //Arrange
    const tarea1 = new Task("1");
    tasks.addTask(tarea1);
    //Act
    tasks.deleteTask(tarea1);
    //Assert
    expect(tasks.getTaskList()).not.toContain(tarea1);
  });
});
