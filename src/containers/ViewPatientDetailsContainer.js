import React from "react";
import {useSelector} from "react-redux"
import PatientDetails from "../views/PatientDetails";


const ViewPatientDetailsContainer = () => {
    const patientState = useSelector(state => state.PatientReducer);
    console.log(patientState)
  return (
    <PatientDetails view={true} values={patientState.patient} />
  )
}

export default ViewPatientDetailsContainer
