import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Patient_Details from './components/Patient_Details';
import Search_Patient from './components/Search_Patient'
function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Switch>
          <Route path="/addPatient" component={Patient_Details} view={false}></Route>
          <Route path="/searchPatient" component={Search_Patient}/>
          <Route path="/" component={Search_Patient}></Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
