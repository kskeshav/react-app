
import './App.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';

const defaultValues = {
  name: "Dinesh Jain",
  abhaId: 5942,
  dob: "2000-04-12",
  gender: "male",
  education: "btech",
  occupation: "engineer",
  language: "hindi",
  socioEconomicStatus: "rich",
  address: "koramangala, bangalore, karnataka",
  phoneNo: 9192912929,
  careGiverName: "ramesh",
  relationshipWithPatient: "father",
  bloodGroup: "A+",
  // Consultation_List (List of Prior Consultation Ids)
};

function App() {
  return (
    <>
      <Navbar/>
      <Patient_Details view={true} values = {defaultValues}/>
    </>
  );
}

export default App;
