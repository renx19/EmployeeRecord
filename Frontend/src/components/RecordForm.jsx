import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import DateSelector from '../utils/DateSelector';
import PropTypes from 'prop-types'; 


const RecordForm = ({ addRecord }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [tin, setTIN] = useState('');
  const [pagibig, setPAGIBIG] = useState('');
  const [sss, setSSS] = useState('');
  const [philhealth, setPhilhealth] = useState('');
  const [birthdayDay, setBirthdayDay] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState('');
  const [birthdayYear, setBirthdayYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4001/employees', {
        name,
        phone,
        address,
        email,
        gender,
        age,
        tin,
        pagibig,
        sss,
        philhealth,
        birthday: `${birthdayYear}-${birthdayMonth}-${birthdayDay}`,
      });

      if (response.status === 201) {
        addRecord(response.data);
        clearFields();
        console.log('Contact added successfully!');
      } else {
        console.error('Error adding contact:', response.status, response.statusText);
        console.log('Failed to add contact. Please try again.');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      console.log('Failed to add contact. Please check your network connection.');
    }
  };

  const clearFields = () => {
    setName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setGender('');
    setAge('');
    setTIN('');
    setPAGIBIG('');
    setSSS('');
    setPhilhealth('');
    setBirthdayDay('');
    setBirthdayMonth('');
    setBirthdayYear('');
  };

  return (
    <div className="flex h-screen"> 
      <Sidebar/>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-5 flex flex-col min-h-full h-full overflow-auto mt-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your Name" />
          </div>

          <div>
            <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} min="0" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your Age" />
          </div>

          <div>
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {gender ? null : <option value="" disabled hidden>Select Gender</option>}
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your Address" />
          </div>

          <div>
            <label htmlFor="birthday" className="block text-gray-700 font-bold mb-2">Birthday:</label>
            <DateSelector
                day={String(birthdayDay)}
                month={String(birthdayMonth)}
                year={String(birthdayYear)}
                onDayChange={(e) => setBirthdayDay(e.target.value)}
                onMonthChange={(e) => setBirthdayMonth(e.target.value)}
                onYearChange={(e) => setBirthdayYear(e.target.value)}
              />
          </div>


        <div>
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your phone number" />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your Email" />
        </div>

        <div>
          <label htmlFor="tin" className="block text-gray-700 font-bold mb-2">TIN:</label>
          <input type="text" id="tin" value={tin} onChange={(e) => setTIN(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="TIN Number" />
        </div>

        <div>
          <label htmlFor="pagibig" className="block text-gray-700 font-bold mb-2">PAGIBIG:</label>
          <input type="text" id="pagibig" value={pagibig} onChange={(e) => setPAGIBIG(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="PAGIBIG number" />
        </div>

        <div>
          <label htmlFor="sss" className="block text-gray-700 font-bold mb-2">SSS:</label>
          <input type="text" id="sss" value={sss} onChange={(e) => setSSS(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="SSS number" />
        </div>

        <div>
          <label htmlFor="philhealth" className="block text-gray-700 font-bold mb-2">PHILHEALTH:</label>
          <input type="text" id="philhealth" value={philhealth} onChange={(e) => setPhilhealth(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " placeholder="PHILHEALTH number" />
        </div>
      </div>

      <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-10 mt-5" type="submit">Add Record</button>
    </form>
    </div>
  );
};
RecordForm.propTypes = {
  addRecord: PropTypes.func.isRequired,
};


export default RecordForm;
