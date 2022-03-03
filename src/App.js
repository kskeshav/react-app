import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
// import './App.css';
import './css/style.css';
// import './styles/jquery-ui.min.css';
import './styles/opensans-font.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';
import Search_Patient from './components/Search_Patient'

const defaultValues = {
        "abhaId": "112233445560",
        "firstName": "Keshav",
        "lastName": "Singhal",
        "dob": "2000-01-20",
        "age": 22,
        "gender": "male",
        "education": "Cs",
        "occupation": "student",
        "language": "english",
        "socioEconomicStatus": "a",
        "address": "zxc",
        "district": "Ajmer",
        "pincode": "123456",
        "phoneNo": "6234567890",
        "careGiverName": "parithimalan",
        "relationshipWithPatient": "friend",
        "bloodGroup": "B+ve"
    }

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
