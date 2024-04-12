import  { useState, useEffect } from 'react';
import axios from 'axios';
import { getPageRange } from '../utils/Pagination';
import RecordTable from '../utils/RecordTable';
import Sidebar from '../Sidebar';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';


const downloadExcel = () => {
  const worksheet = XLSX.utils.table_to_sheet(document.getElementById('record-table'));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Records');
  XLSX.writeFile(workbook, 'records.xlsx');
};


const RecordList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [records, setRecords] = useState([]); // State to store fetched records
  const recordsPerPage = 6; // Display 6 records per page

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/employees');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const editRecord = async (id, newData) => {
    try {
      await axios.put(`http://localhost:4001/employees/${id}`, newData);
      fetchData(); // Refetch data after editing
    } catch (error) {
      console.error('Error editing record:', error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/employees/${id}`);
      fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filterRecords = (query) => {
    const filtered = records.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterRecords(value);
    setCurrentPage(1); // Reset pagination to first page when search query changes
  };

  // Pagination
  const recordsToPaginate = searchQuery ? filteredRecords : records;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = recordsToPaginate.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen"> 
      <Sidebar/>
      <div className="container mx-auto p-4 text-center"> {/* Add text-center class */}
  <input
    type="text"
    value={searchQuery}
    onChange={handleSearchChange}
    placeholder="Search..."
    className="border border-gray-300 rounded-md p-2 mb-4 block mx-auto w-72"
  />
  <button
    className='mb-5 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'
    onClick={downloadExcel}
  >
    Export
  </button>




      <RecordTable records={currentRecords} editRecord={editRecord} deleteRecord={deleteRecord} />
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={recordsToPaginate.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
    </div>
  );
};


const Pagination = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const maxPagesToShow = 3; // Set the maximum number of pages to show
  const pageRange = getPageRange(currentPage, totalPages, maxPagesToShow);

  return (
    <nav className="mt-5">
      <ul className="pagination flex flex-row gap-2 items-center justify-center">
        {currentPage > 1 && (
          <li>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => paginate(currentPage - 1)}>Prev</button>
          </li>
        )}
        {pageRange.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  recordsPerPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default RecordList;
