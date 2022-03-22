import {
    getPatientsRequest,
    getPatientsSuccess,
    getPatientsFailure,
    addPatientRequest,
    addPatientSuccess,
    addPatientFailure,
    setPatient
} from "../actionCreators/PatientActions.js";
import axios from "axios"


export const getPatients = (url) => {
    return (dispatch) => {
        dispatch(getPatientsRequest()); 
        axios
            .get (url) 
            .then ((res) => {
                dispatch(getPatientsSuccess(res.data));
            })
            .catch((err)=>{
                dispatch(getPatientsFailure(err.message));
                console.log("-----this is catch------", err);
            })
    }
}

export const addPatient = (patientDetail) => {
    return (dispatch) => {
        dispatch(addPatientRequest()); 
        axios
            .post ("http://localhost:8080/api/v1/patientdemographics", patientDetail ) 
            .then ((res) => {
                dispatch(addPatientSuccess({success: true, failure: false, message: "Patient details added successfully" }));
            })
            .catch((err)=>{
                dispatch(addPatientFailure({success: false, failure: true, message: err.response.data.message }));
            })
    }
}

export const setPatientSelected = (patientDetail) => {
    console.log(patientDetail)
    return (dispatch) => {
        dispatch(setPatient(patientDetail)); 
    }
}