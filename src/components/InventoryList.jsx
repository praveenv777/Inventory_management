import PropTypes from 'prop-types';

const InventoryList = ({ items, handleEdit, deleteItem }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Attributes</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.subcategory}</td>
            <td>
              {Object.entries(item.attributes).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
              ))}
            </td>
            <td>{item.quantity}</td>
            <td>
              <button onClick={() => handleEdit(item)} className="edit-button">
                Edit
              </button>
              <button onClick={() => deleteItem(item.id)} className="delete-button">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

InventoryList.propTypes = {
  items: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default InventoryList;

