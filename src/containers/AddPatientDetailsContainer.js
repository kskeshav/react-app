import React from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import {addPatient} from "../services/patientAPI";
import PatientDetails from "../views/PatientDetails";


const AddPatientDetailsContainer = () => {
    const dispatch = useDispatch();
    const patientState = useSelector(state => state.PatientReducer);
    console.log(patientState)

    const addPatientDetails = (patientDetail) => addPatient(patientDetail)(dispatch);
  return (
    <PatientDetails view={false} add={addPatientDetails} success={patientState.success} failure={patientState.failure} message={patientState.message}/>
  )
}

export default AddPatientDetailsContainer
