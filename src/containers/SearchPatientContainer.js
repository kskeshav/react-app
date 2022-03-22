import React from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import {setPatientSelected, getPatients} from "../services/patientAPI";
import SearchPatient from "../views/SearchPatient";

const SearchPatientContainer = () => {
    const dispatch = useDispatch();
    const patientState = useSelector(state => state.PatientReducer);
    const getPatientsByAPI = (url) => getPatients(url)(dispatch);
    console.log(patientState)

    const setPatientCurrent = (patientDetail) => setPatientSelected(patientDetail)(dispatch);
  return (
    <SearchPatient get={getPatientsByAPI} set={setPatientCurrent} values={patientState.patients}/>
  )
}

export default SearchPatientContainer
