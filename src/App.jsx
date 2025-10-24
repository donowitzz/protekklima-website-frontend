import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsappButton from './components/layout/WhatsappButton'; 


function App() {

  const location = useLocation();

  
   


  const noFooterPaths=[
    '/products/:id'
  ];

 
  const shouldFooterNavbar = !noFooterPaths.some(path => {
    if (path.includes(':id')) {
      const regexPath = path.replace(':id','[^/]+');
      return new RegExp(`^${regexPath}$`).test(location.pathname);
    }
    return location.pathname === path;
  });

  return (
    <>
      
       <Navbar />

      <main>
        <Outlet />
      </main>
      {shouldFooterNavbar && <Footer /> }
      <WhatsappButton />
    </>
  );
}

export default App;
