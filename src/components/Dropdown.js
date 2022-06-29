import { cloneElement, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks";

export default function Dropdown(props) {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div ref={ref} className="fixed">
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        {cloneElement(props.icon, { open: open })}
      </div>

      {open && cloneElement(props.children, { setOpen: setOpen })}
    </div>
  );
}
