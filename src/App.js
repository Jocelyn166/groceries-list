import { useState, useEffect } from "react";
import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import SearchItem from "./SearchItem";
import Footer from "./Footer";

function App() {
  const title = "Groceries list";
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglistItem")) || []
  );

  useEffect(()=>{
    localStorage.setItem("shoppinglistItem", JSON.stringify(items))
  }, [items])
  const [addInput, setAddInput] = useState("");
  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    setAddInput(e.target.value);
  };
 
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!addInput) return;
    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item: addInput,
    };
    const listItems = [...items, newItem];
    setAddInput("");
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  return (
    <div className="App">
      <Header title={title} />
      <AddItem
        addInput={addInput}
        handleAddItem={handleAddItem}
        handleInputChange={handleInputChange}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;

