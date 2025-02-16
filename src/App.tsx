import Header from './components/Header.tsx';
import Booking from './components/Booking.tsx';
import RideOptions from './components/RideOptions.tsx';
import DriverForm from './components/DriverForm.tsx';
import Footer from './components/Footer.tsx';
import NotFound from './components/NotFound.tsx';

function App() {
  const currentPath = window.location.pathname;
  
  return (
    <>
    <div>
      {currentPath === '/' ? (
        <>
          <Header />
          <Booking />
          <RideOptions />
          <DriverForm />
          <Footer />
        </>
      ) : (
        <NotFound />
      )}
    </div>
    </>
  )
}

export default App
