import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';

function Payroll() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Define the URL of your local API
    const apiUrl = 'http://localhost:4001/employees';

    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Set the fetched data to the employeeData state
        setEmployeeData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div className="flex h-screen"> 
      <Sidebar/>
      <div className='mx-auto'>
        <h2 className='text-3xl mt-10 mb-10'>Payroll</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Salary</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {employeeData.map(emp => (
              <tr key={emp.id}>
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">$20,000</td>
                {/* Add more columns with employee data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
