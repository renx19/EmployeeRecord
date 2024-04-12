import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Signup';
import LoginForm from './LoginForm';
import './Styles.css';
import Home from './Home';
import RecordForm from './components/RecordForm';
import Recordlist from './components/Recordlist';
import Payroll from './components/Payroll';

function App() {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/record" element={<RecordForm addRecord={addRecord} />} />
        <Route path="/Employee" element={<Recordlist records={records} />} />
        <Route path="/payroll" element={<Payroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
