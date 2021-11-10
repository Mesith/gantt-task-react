import React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";
import { walk } from "react-sortable-tree";

//Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  console.log('XXXXXXCCCCCCC',tasks)
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  const stringToArr = (string1:any) => {
    if(string1){
      let x = string1.trim().split(",")
      x.shift()
    return x;
    } else {
      return []
    }
  };


  const onVisibilityChanged = (data:any) => {
    console.log("Visibility change from example", data)
    //console.log("ccccccccccccccccc", data.node.id)
    const treeTotal1 = sumNodeValues(data);
    //nodes.toString()
    //const nodes:any = nodes(data);
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzz",treeTotal1)
    console.log("aaaaaaaaaaaa",stringToArr(treeTotal1))
    let newTasks  = tasks.filter(f => stringToArr(treeTotal1).some((item:any) => item === f.id));
    setTasks(newTasks)
    //console.log("aaaaaaaaaaaaaaaaaaaa", nodes.toString())
  }

  const getNodeKey = ({ treeIndex }:any) => treeIndex;

  // const nodes = (treeData:any)=> {
  //   let total = 0;
  //   const callback = ({ node }:any) => (total += node.value);

  //   walk({
  //     treeData,
  //     getNodeKey,
  //     callback,
  //     ignoreCollapsed: false
  //   });

  //   return total;
  // }

  const sumNodeValues = (treeData:any)=> {
    //let total = 0;
    var indexss = "";
    const callback = ({ node }:any) =>{
     
     indexss += ","+node.title
     }
     ;

    walk({
      treeData,
      getNodeKey,
      callback,
      ignoreCollapsed: true
    });
    

    return indexss;
  }



  return (
    <div>
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        onVisibilityChanged={onVisibilityChanged}
      />
    </div>
  );
};

export default App;
