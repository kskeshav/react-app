import { combineReducers } from "redux";
import { PatientReducer } from "./PatientReducer";
import {ConsultationReducer} from "./ConsultationReducer"

export default combineReducers({
   PatientReducer,
   ConsultationReducer
}); 
