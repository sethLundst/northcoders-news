import "../styles/MobileDropdown.css";
import { ChevronDown } from "../icons";
import { cloneElement } from "react";

export function MobileDropdownMenu({ categories, active, icons, fn, setOpen }) {
  return (
    <div className="mob-drop">
      <div className="mob-drop-heading">SORT POSTS BY:</div>
      <div className="mob-drop-div"></div>
      {categories.map((category, index) => {
        return (
          <li
            key={index}
            className="mob-drop-option"
            onClick={() => {
              setOpen(false);
              fn(category, index);
            }}
          >
            {cloneElement(icons[category.toLowerCase().replace(/\s/g, "_")], {
              className: `mob-drop-icon${category === active ? "-active" : ""}`,
            })}
            {category}
          </li>
        );
      })}
    </div>
  );
}

export function MobileDropdownIcon({ open, icons, active }) {
  return (
    <>
      {open && <div className="mob-drop-backdrop"></div>}
      <div className="mob-drop-btn">
        {cloneElement(icons[active.toLowerCase().replace(/\s/g, "_")], {
          className: "mob-icon",
        })}
        <div className="mob-sort-by">{active}</div>
        <ChevronDown className="mob-sort-by-chevron" />
      </div>
    </>
  );
}
