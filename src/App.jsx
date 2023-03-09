import logo from "./logo.svg";
import "./App.css";
import Folder from "./components/Folder";
import data from "./data/categories.json";
import { useState } from "react";
import {
  getDescendants,
  checkAncestors,
  getAncestors,
} from "./helpers/helpers";

// fromEntries
const categoriesEntries = data.map(({ id, ...rest }) => [id, rest]);

const categoriesDict = Object.fromEntries(categoriesEntries);

for (const { id, parentId } of data) {
  if (parentId === undefined) {
    continue;
  }
  // if(newData[parentId].children === undefined) {
  //    newData[parentId].children = [];
  // }
  categoriesDict[parentId].children ??= [];
  categoriesDict[parentId].children.push(id);
}

// const dataObj = data.map((obj) => {
//   let objCopy = { ...obj };
//   delete objCopy.id;
//   return [obj.id, objCopy];
// });

let topLevelIds = data
  .filter((obj) => !obj.hasOwnProperty("parentId"))
  .map((obj) => obj.id);

let nestedChildren = []; //Где будет правильнее записать данный массив и если я запишу его внутри App, то как он будет себя вести при рендеринге?
function App() {
  const [categoryChecked, setCategoryChecked] = useState([]);

  function changeCheckedId(idParent) {
    setCategoryChecked((prev) => {
      if (prev.includes(idParent)) {
        const ancestors = getAncestors(idParent, categoriesDict);
        const descendants = getDescendants(idParent, categoriesDict);
        const idsToExclude = [...ancestors, ...descendants, idParent];
        return prev.filter((id) => !idsToExclude.includes(id));
      } else {
        const descendants = getDescendants(idParent, categoriesDict);
        const current = [...prev, idParent, ...descendants];
        const unique = Array.from(new Set(current));
        checkAncestors(idParent, categoriesDict, unique);

        return unique;
      }
    });

    // if (
    //   categoryChecked.includes(idParent) &&
    //   categoriesDict[idParent].children
    // ) {
    //   nestedChildren = nestedChildren.filter((id) => id !== idParent);
    //   setCategoryChecked((prev) => prev.filter((id) => id !== idParent));
    //   for (let child of categoriesDict[idParent].children) {
    //     changeCheckedId(child);
    //   }
    //   // https://magma.com/d/YbASCTfLl7
    // } else if (categoryChecked.includes(idParent)) {
    //   nestedChildren = nestedChildren.filter((id) => id !== idParent);
    //   setCategoryChecked((prev) => prev.filter((id) => id !== idParent));
    // } else {
    //   //Логика добавления галочки в зависимости от того, есть ли дети. Деи есть - обойди рекурсивно всех и добавь в массив
    //   if (categoriesDict[idParent].children) {
    //     nestedChildren.push(...categoriesDict[idParent].children);
    //     console.log(nestedChildren);
    //     for (let child of categoriesDict[idParent].children) {
    //       changeCheckedId(child);
    //     }
    //     setCategoryChecked((prev) => [...prev, idParent, ...nestedChildren]);
    //   } else {
    //     nestedChildren.push(idParent);
    //   }
    // }
  }

  console.log(nestedChildren, "МОЙ МАССИВ");
  console.log(categoryChecked);

  return (
    <div>
      <Folder
        ids={topLevelIds}
        dict={categoriesDict}
        categoryChecked={categoryChecked}
        changeFilter={changeCheckedId}
      />
    </div>
  );
}

export default App;
