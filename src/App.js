import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import './css/style.css';
// import './styles/jquery-ui.min.css';
import './styles/opensans-font.css';
import Navbar from './components/Navbar';
import AddPatientDetailsContainer from './containers/AddPatientDetailsContainer';
import ViewPatientDetailsContainer from './containers/ViewPatientDetailsContainer';
import SearchPatientContainer from './containers/SearchPatientContainer';
import AddConsultationContainer from "./containers/AddConsultationContainer";
import ViewPatientDashboard from "./views/ViewPatientDashboard";
import ViewConsultationContainer from "./containers/ViewConsultationContainer";
import ViewAllConsultationsContainer from "./containers/ViewAllConsultationsContainer";
import questionnaire from "./views/questionnaire";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/addPatient" component={AddPatientDetailsContainer}></Route>
          <Route path="/searchPatient" component={SearchPatientContainer}/>
          <Route path="/viewPatientDashboard" component={ViewPatientDashboard}/>
          <Route path="/viewPatient" component={ViewPatientDetailsContainer}></Route>
          <Route path="/addConsultation" component={AddConsultationContainer}></Route>
          <Route path="/viewConsultation" component={ViewConsultationContainer}></Route>
          <Route path="/viewPastConsultations" component={ViewAllConsultationsContainer}></Route>
          <Route path="/" component={questionnaire}></Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
