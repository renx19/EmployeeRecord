import  { useState } from 'react';
import PropTypes from 'prop-types';

const RecordTable = ({ records, editRecord, deleteRecord }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedTIN, setEditedTIN] = useState('');
  const [editedPAGIBIG, setEditedPAGIBIG] = useState('');
  const [editedSSS, setEditedSSS] = useState('');
  const [editedPhilhealth, setEditedPhilhealth] = useState('');
  const [editedBirthday, setEditedBirthday] = useState('');



  const handleEdit = (record) => {
    setEditingId(record._id);
    setEditedName(record.name);
    setEditedPhone(record.phone);
    setEditedAddress(record.address);
    setEditedEmail(record.email);
    setEditedGender(record.gender);
    setEditedAge(record.age);
    setEditedTIN(record.tin);
    setEditedPAGIBIG(record.pagibig);
    setEditedSSS(record.sss);
    setEditedPhilhealth(record.philhealth);
    setEditedBirthday(record.birthday);
  };
  

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      // Perform actions to save the edited data, such as sending it to the server
      // You can use the edited values (editedName, editedPhone, etc.) to construct the updated record
      const updatedRecord = {
        _id: editingId,
        name: editedName,
        phone: editedPhone,
        address: editedAddress,
        email: editedEmail,
        gender: editedGender,
        age: editedAge,
        tin: editedTIN,
        pagibig: editedPAGIBIG,
        sss: editedSSS,
        philhealth: editedPhilhealth,
        birthday: editedBirthday,
      };
  
      // Call the editRecord function (assuming it sends a PUT request to update the record)
      await editRecord(editingId, updatedRecord);
  
      // After saving, reset the editing state
      setEditingId(null);
    } catch (error) {
      console.error('Error saving record:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  

  return (
    <table id='record-table' className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">TIN</th>
          <th className="px-4 py-2">PAGIBIG</th>
          <th className="px-4 py-2">SSS</th>
          <th className="px-4 py-2">PHILHEALTH</th>
          <th className="px-4 py-2">Birthday</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record._id}>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : record.name}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="number" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} /> : record.phone}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} /> : record.address}</td>
            
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /> : record.email}</td>
                    
            <td className="border px-4 py-2">
            {editingId === record._id ? (
              <select
                id="gender"
                value={editedGender}
                onChange={(e) => setEditedGender(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {editedGender ? null : <option value="" disabled hidden>Select Gender</option>}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            ) : (
              <span>{record.gender}</span>
            )}
          </td>


            <td className="border px-4 py-2">{editingId === record._id ? <input type="number" value={editedAge} onChange={(e) => setEditedAge(e.target.value)} /> : record.age}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedTIN} onChange={(e) => setEditedTIN(e.target.value)} /> : record.tin}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedPAGIBIG} onChange={(e) => setEditedPAGIBIG(e.target.value)} /> : record.pagibig}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedSSS} onChange={(e) => setEditedSSS(e.target.value)} /> : record.sss}</td>
            <td className="border px-4 py-2">{editingId === record._id ? <input type="text" value={editedPhilhealth} onChange={(e) => setEditedPhilhealth(e.target.value)} /> : record.philhealth}</td>
           
           
            <td className="border px-4 py-2">
              {editingId === record._id ? (
                <input
                  type="date"
                  value={editedBirthday}
                  onChange={(e) => setEditedBirthday(e.target.value)}
                />
              ) : (
                new Date(record.birthday).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              )}
            </td>

          
          
          
            <td className="border px-4 py-2">
              {editingId === record._id ? (
                <>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2" onClick={handleSave}>Save</button>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => handleEdit(record)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => deleteRecord(record._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

RecordTable.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    tin: PropTypes.string.isRequired,
    pagibig: PropTypes.string.isRequired,
    sss: PropTypes.string.isRequired,
    philhealth: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  })).isRequired,
  editRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

export default RecordTable;
