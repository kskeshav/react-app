import React from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import {addConsultation} from "../services/ConsultationAPI";
import Consultation from "../views/Consultation";


const AddConsultationContainer = () => {
    const dispatch = useDispatch();
    const consultationState = useSelector(state => state.ConsultationReducer);
    const patientState = useSelector(state => state.PatientReducer);
    console.log(consultationState)

    const addConsultationDetails = (consultation) => addConsultation(consultation)(dispatch);
  return (
    <Consultation view={false} add={addConsultationDetails} patient={patientState.patient} success={consultationState.success} failure={consultationState.failure} message={consultationState.message}/>
  )
}

export default AddConsultationContainer
