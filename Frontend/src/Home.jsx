import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; 
import img123 from './assets/123.jpg'; // Import the image file

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820); // Change the breakpoint as needed
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex h-screen"> 
        <Sidebar/>
        
        <div className="container mx-auto relative mt-5 flex justify-center items-center">
          {isMobile ? (
            <div className="flex flex-col items-center">
              <img src={img123} alt="" className="w-2/3 mx-10 mb-10 mt-16" /> {/* Adjust image width for smaller devices */}
              <h2 className="text-md font-semibold mb-2 text-center mx-5 text-justify">
                The employee record system website is a handy tool designed specifically for small business owners or managers. 
                It's like a digital filing cabinet where you can keep track of your employees' details without any extra hassle. 
                From managing payroll to staying on top of regulations, 
                it simplifies everything. And since it's made with small businesses in mind, it's straightforward and easy to use. 
                Just what you need to keep your business running smoothly without any unnecessary complexity.
              </h2>
            </div>
          ) : (
            <div className="absolute inset-x-0 h-96 flex items-center justify-center ">
              <img src={img123} alt="" className="w-2/5 order-1 mx-10" />
              <h2 className="text-lg font-semibold mb-2 order-2 right-1/2 mx-20 text-justify">
                The employee record system website is a handy tool designed specifically for small business owners or managers. 
                It's like a digital filing cabinet where you can keep track of your employees' details without any extra hassle. 
                From managing payroll to staying on top of regulations, 
                it simplifies everything. And since it's made with small businesses in mind, it's straightforward and easy to use. 
                Just what you need to keep your business running smoothly without any unnecessary complexity.
              </h2>
            </div>
          )}

        <h2 className="absolute top-0 text-3xl md:text-3xl xl:text-5xl font-sans hover:text-blue-400 hover:font-extrabold text-center mt-10">
          Employee Data Record Management System
        </h2>


        
        </div>
      </div>
    </>
  );
}

export default Home;
