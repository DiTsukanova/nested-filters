import React, { useState } from "react";
import data from "../data/categories.json";

const Folder = ({ ids, dict, categoryChecked, changeFilter }) => {
  const [expand, setExpand] = useState([]);

  function addComponent(id) {
    if (!expand.includes(id)) {
      setExpand((prev) => [...prev, id]);
    } else {
      setExpand((prev) => prev.filter((elem) => elem !== id));
    }
  }

  //   function addCheckedId(idParent) {
  //     setCategoryChecked((prev) => [
  //       ...prev,
  //       idParent,
  //       ...dict[idParent]?.children,
  //     ]);
  //   }

  return (
    <ul>
      {ids.map((id) => {
        return (
          <li style={{ listStyleType: "none" }}>
            {dict[id].children && (
              <button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => addComponent(id)}
              >
                {">"}
              </button>
            )}
            <input
              type="checkbox"
              onChange={() => changeFilter(id)}
              checked={categoryChecked.some((checkedId) => {
                // console.log(checkedId, "---------------, Выбранные ID");
                return checkedId === id;
              })}
            />
            <label>{dict[id].name}</label>

            {dict[id].children && expand.includes(id) && (
              <Folder
                ids={dict[id].children}
                dict={dict}
                categoryChecked={categoryChecked}
                changeFilter={changeFilter}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Folder;

{
  /* 
        // console.log(arr);
        // return (
        //   <li>
        //     {dict[id].name}
        //     {dict[id].children && (
        //       <Folder ids={dict[id].children} dict={dict} />
        //     )}
        //   </li>
        // ); */
}
