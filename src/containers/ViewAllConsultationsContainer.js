import React from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import {setConsultationSelected} from "../services/ConsultationAPI";
import AllConsultations from "../views/AllConsultations";
import { getConsultations } from "../services/ConsultationAPI";

const ViewAllConsultationsContainer = () => {
    const dispatch = useDispatch();
    const consultationState = useSelector(state => state.ConsultationReducer);
    const patientState = useSelector(state => state.PatientReducer);
    const getPatientConsultations = (id) => getConsultations(id)(dispatch);
    const setConsultationCurrent = (consultation) => setConsultationSelected(consultation)(dispatch);
  return (
    <AllConsultations set={setConsultationCurrent} get={getPatientConsultations} id={patientState.patient.id} values={consultationState.consultations}/>
  )
}

export default ViewAllConsultationsContainer
