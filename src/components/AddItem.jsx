import { useEffect, useState } from 'react'
import "../styling/AddItemForm.css"
import PropTypes from 'prop-types'

const AddItemForm = ({ item, setInventory, setAddItemToggle }) => {
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [attributes, setAttributes] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCategory(item.category);
      setSubcategory(item.subcategory);
      setAttributes(item.attributes);
      setQuantity(item.quantity);
    }
  }, [item]);
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  
  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setAttributes((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    const updatedItem = {
      id: item ? item.id : Date.now(), 
      name,
      category,
      subcategory,
      attributes,
      quantity,
    };

    if (item) {
      setInventory(prevInventory =>
        prevInventory.map(invItem =>
          invItem.id === item.id ? updatedItem : invItem
        )
      );
    } else {
      setInventory(prevInventory => [...prevInventory, updatedItem]);
    }

    setAddItemToggle(false);
  };

  return (
    <form className="add-item-form" onSubmit={submitHandler}>
      <input
        type="text"
        name="name"
        required
        className="form-input"
        value={name}
        onChange={handleNameChange} 
      />
        
      <input
        type="text"
        name="category"
        placeholder="Category"
        required
        className="form-input"
        value={category}
        onChange={handleCategoryChange} 
      />
      <input
        type="text"
        name="subcategory"
        placeholder="Subcategory"
        required
        className="form-input"
        value={subcategory}
        onChange={handleSubcategoryChange} 
      />
      {/* Attributes Inputs */}
      <input
        type="text"
        name="Size"
        placeholder="Size"
        className="form-input"
        value={attributes.Size || ''}
        onChange={handleAttributeChange}
      />
      <input
        type="text"
        name="Color"
        placeholder="Color"
        className="form-input"
        value={attributes.Color || ''}
        onChange={handleAttributeChange}
      />
      <input
        type="text"
        name="Brand"
        placeholder="Brand"
        className="form-input"
        value={attributes.Brand || ''}
        onChange={handleAttributeChange}
      />
      {/* Add more attribute fields as needed */}
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        required
        className="form-input"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button type="submit" className="form-button">
        {item ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

AddItemForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    category: PropTypes.string,
    subcategory: PropTypes.string,
    attributes: PropTypes.object,
    quantity: PropTypes.number
  }),
  setInventory: PropTypes.func.isRequired,
  setAddItemToggle: PropTypes.func.isRequired
};

export default AddItemForm;
