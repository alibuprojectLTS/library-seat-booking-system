import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center">
          📚 Library Seat Booking System
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Welcome to the Library Seat Booking System
        </p>
        <Outlet />
      </div>
    </div>
  );
}

export default App;