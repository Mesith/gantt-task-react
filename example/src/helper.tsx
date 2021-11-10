import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "P0040",
      title: "P0040",
      id: "P0040",
      progress: 25,
      type: "project",
      hideChildren: false,
      parentId : null
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "PBS-0001",
      title: "PBS-0001",
      id: "PBS-0001",
      progress: 25,
      type: "task",
      project: "project",
      parentId : "P0040"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "BOR-0001",
      title: "BOR-0001",
      id: "BOR-0001",
      progress: 10,
      dependencies: ["PBS-0001"],
      type: "task",
      project: "project",
      parentId : "PBS-0001"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "ResourceOne",
      title: "ResourceOne",
      id: "ResourceOne",
      progress: 2,
      dependencies: ["BOR-0001"],
      type: "task",
      project: "project",
      parentId : "BOR-0001"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      title: "Review",
      id: "Review",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "project",
      parentId : "ResourceOne"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      title: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "project",
      parentId : "Review"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      title: "Release",
      id: "Task 7",
      progress: currentDate.getMonth(),
      type: "milestone",
      project: "project",
      parentId : null
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      title: "Release",
      id: "Task 8",
      progress: currentDate.getMonth(),
      type: "milestone",
      project: "project",
      parentId : null
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      title: "Release",
      id: "Task 9",
      progress: currentDate.getMonth(),
      type: "milestone",
      project: "project",
      parentId : null
    }
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
