
import './App.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';
function App() {
  return (
    <>
      <Navbar/>
      <Patient_Details view={false}/>
    </>
  );
}

export default App;