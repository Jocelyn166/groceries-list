import React, {useRef} from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddItem = ({ addInput, handleInputChange, handleAddItem }) => {
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleAddItem}>
      <label htmlFor="addItem">Add Item</label>
      <input
        type="text"
        id="addItem"
        ref={inputRef}
        autoFocus
        value={addInput}
        placeholder="Add Item"
        onChange={handleInputChange}
      />
      <button aria-label="Add Item" onClick={()=>inputRef.current.focus()} type="submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default AddItem;
