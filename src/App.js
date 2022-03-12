import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
// import './App.css';
import './css/style.css';
// import './styles/jquery-ui.min.css';
import './styles/opensans-font.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';
import Search_Patient from './components/Search_Patient';
import Consultation from './components/Consultation'

const defaultValues = {
  firstName: "Dinesh",
  lastName: "Jain",
  abhaId: 5942,
  dob: "2000-04-12",
  age: "21",
  gender: "Male",
  education: "btech",
  occupation: "engineer",
  language: "hindi",
  socioEconomicStatus: "Below Poverty line",
  address: "koramangala, bangalore, karnataka",
  district: "bangalore",
  pincode: 560102,
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
          <Route path="/consult" component={() => (<Consultation view={false}/>)}></Route>
          <Route path="/" component={Search_Patient}></Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
