import { useState, useEffect } from "react";
import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import SearchItem from "./SearchItem";
import Footer from "./Footer";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = " http://localhost:3000/items";
  const title = "Groceries list";
  const [items, setItems] = useState([]);
  const [addInput, setAddInput] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
     setIsLoading(true);
     const fetchItems = async () =>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive expected data");
        const listItems =await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch(err){
        console.log(err, 'err');
        setFetchError(err.message);
      }
      setIsLoading(false)
     }
     setTimeout(()=>{
      fetchItems();
     }, 2000)
  }, [])
 
  const handleInputChange = (e) => {
    setAddInput(e.target.value);
  };
 
  const handleAddItem = async (e) => {
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

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newItem)
    };
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = listItems.filter((item)=> item.id === id)

    const optionsObj = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const result = await apiRequest(`${API_URL}/${id}`, optionsObj)
    if(result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const optionsObj = {
      method: 'DELETE',
    };
    const result = await apiRequest(`${API_URL}/${id}`, optionsObj);
    if(result) setFetchError(result)
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
      <main>
        {isLoading && <p>Loading the data ...</p>}
        {!isLoading &&
          fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
              items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
         }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;

