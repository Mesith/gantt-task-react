import React, { useMemo, useState, useEffect } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";
import SortableTree, {
  TreeItem,
  getTreeFromFlatData,
  toggleExpandedForAll,
} from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
//import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
const localeDateStringCache = {};
const toLocaleDateStringFactory = (locale: string) => (
  date: Date,
  dateTimeOptions: Intl.DateTimeFormatOptions
) => {
  const key = date.toString();
  let lds = localeDateStringCache[key];
  if (!lds) {
    lds = date.toLocaleDateString(locale, dateTimeOptions);
    localeDateStringCache[key] = lds;
  }
  return lds;
};
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};
//
// let treeData: TreeItem[] = [
//   {title: 'Project', expanded : true,  children: [{title: 'PBS001' ,expanded : true , children: [{title: 'BOR-0001' ,expanded : true , children: [{title: 'Labour' ,expanded : true, children: [{title: 'CPC001 1/5' ,expanded : true, children: [{title: 'Mesith1' ,expanded : true}]}]} , {title: 'Tools'}]} , {title: 'BOR-0002 '}]} , {title: 'PBS002'}]},
//   {title: 'Project2', children: [{title: 'PBS001' , children: [{title: 'BOR-0001' , children: [{title: 'Labour' , children: [{title: 'CPC001'}]} , {title: 'Tools'}]} , {title: 'BOR-0002 '}]} , {title: 'PBS002'}]},
// ];

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  onVisibilityChanged: (data: any) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  onVisibilityChanged,
}) => {
  const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(locale), [
    locale,
  ]);
  const [treeData, setTreeData]: any = useState([]);
  useEffect(() => {
    console.log("tasks", tasks);
    const tData = getTreeFromFlatData({
      flatData: tasks,
      getKey: (node: any) => node.id,
      getParentKey: (node: any) => node.parentId,
      // @ts-ignore
      rootKey: null,
    });
    console.log("tData", tData);

    setTreeData(
      toggleExpandedForAll({
        treeData: tData,
        expanded: true,
      })
    );
  }, [tasks]);
  return (
    <div style={{ height: rowHeight * tasks.length, color: "black" }}>
      <SortableTree
        // theme={FileExplorerTheme}
        treeData={treeData}
        onChange={treeData => {
          setTreeData(treeData);
          onVisibilityChanged(treeData);
        }}
        onVisibilityToggle={data => {
          console.log("SortableTree", data);
          // onVisibilityChanged(data);
        }}
      />
    </div>
  );
};
