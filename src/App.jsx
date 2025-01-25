import { useState } from 'react'
import './App.css'
import data from './assets/data.json'
import AddItemForm from './components/AddItem' 
import InventoryList from './components/InventoryList'; 

function App() {
  const [inventory, setInventory] = useState(data)
  const [filterCategory, setFilterCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentItem, setCurrentItem] = useState(null)
  const [addItemToggle, setAddItemToggle] = useState(false)

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id))
}

const handleEdit = (item) => {
  setCurrentItem(item);
  setAddItemToggle(true);
};

  const filteredInventory = filterCategory 
    ? inventory.filter(item => item.category === filterCategory)
    : inventory

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if(sortOrder === 'asc') {
      return a.quantity - b.quantity
    } else {
      return b.quantity - a.quantity
    }
  })

  return (
    <div id="root">
      <h1>Inventory Management</h1>
      
      <button onClick={() => setAddItemToggle(!addItemToggle)}>
        {addItemToggle ? "Close Form" : "Add New Item"}
      </button>

      {addItemToggle && (
        <AddItemForm 
          item={currentItem} 
          setInventory={setInventory} 
          setAddItemToggle={setAddItemToggle} 
        />
      )}

      <div className="controls">
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Goods">Home Goods</option>
          <option value="Accessories">Accessories</option>
          <option value="Sports">Sports</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Tools">Tools</option>
          <option value="Musical Instruments">Musical Instruments</option>
          <option value="Groceries">Groceries</option>
          <option value="Outdoor Gear">Outdoor Gear</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort Quantity: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <InventoryList 
        items={sortedInventory} 
        handleEdit={handleEdit} 
        deleteItem={deleteItem} 
      />
    </div>
  )
}

export default App
