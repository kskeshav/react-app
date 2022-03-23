import {
    addConsultationRequest,
    addConsultationSuccess,
    addConsultationFailure,
    getConsultationRequest,
    getConsultationSuccess,
    getConsultationFailure,
    setConsultation
} from "../actionCreators/ConsultationActions.js";
import axios from "axios"



export const addConsultation = (consultation) => {
    console.log(consultation)
    return (dispatch) => {
        dispatch(addConsultationRequest()); 
        axios
            .post ("http://localhost:8080/api/v1/consultationrecords", consultation ) 
            .then ((res) => {
                dispatch(addConsultationSuccess({success: true, failure: false, message: "Consultation added successfully" }));
            })
            .catch((err)=>{
                dispatch(addConsultationFailure({success: false, failure: true, message: err.response.data.message }));
            })
    }
}

export const getConsultations = (id) => {
    return (dispatch) => {
        dispatch(getConsultationRequest()); 
        axios
            .get ("http://localhost:8080/api/v1/consultationrecords/patientId/"+id) 
            .then ((res) => {
                dispatch(getConsultationSuccess(res.data));
            })
            .catch((err)=>{
                dispatch(getConsultationFailure(err.message));
                console.log("-----this is catch------", err);
            })
    }
}

export const setConsultationSelected = (consultation) => {
    console.log(consultation)
    return (dispatch) => {
        dispatch(setConsultation(consultation)); 
    }
}