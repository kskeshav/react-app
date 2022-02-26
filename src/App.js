import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';
import Search_Patient from './components/Search_Patient'

const defaultValues = {
  name: "Dinesh Jain",
  abhaId: 5942,
  dob: "2000-04-12",
  age: "21",
  gender: "male",
  education: "btech",
  occupation: "engineer",
  language: "hindi",
  socioEconomicStatus: "below poverty line",
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
      <Router>
        <Switch>
          <Route path="/addPatient" component={() => (<Patient_Details view={false}/>)}></Route>
          <Route path="/searchPatient" component={Search_Patient}/>
          {/* component={() => (<Comments myProp="value" />)}/> */}
          <Route path="/viewPatient" component={() => (<Patient_Details view={true} values = {defaultValues} />)}></Route>
          <Route path="/" component={Search_Patient}></Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
