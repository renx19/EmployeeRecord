import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Sidebar() {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data or performing API calls
    // For now, let's log a message to the console
    console.log('Logged out');
    
    // Set loggedOut to true to trigger redirection to login page
    setLoggedOut(true);
  };

  if (loggedOut) {
    // Redirect to the login page
    navigate('/login'); // Call the navigate function to redirect
    return null; // Return null since Navigate cannot be returned directly
  }

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            M
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4">
              {/* Replace <a> tags with <Link> tags */}
              <Link to="/home" className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700">
                <HomeIcon className="size-5 opacity-75" />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Home
                </span>
              </Link>
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              <li>
                <Link to="/record" className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <PersonAddIcon className="size-5 opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Add Employee
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/Employee" className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <GroupsIcon className="size-5 opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Employee List
                  </span>
                </Link>
              </li>

              {/* Leave the payroll link blank */}
              <li>
                <Link to="/payroll" className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <PaymentIcon className="size-5 opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Payroll
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form action="#">
          <button
            onClick={handleLogout} // Call handleLogout function on click
            type="button" // Change type to button to prevent form submission
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <LogoutIcon className="size-5 opacity-75" />
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
