import {
    addConsultationRequest,
    addConsultationSuccess,
    addConsultationFailure,
} from "../actionCreators/ConsultationActions.js";
import axios from "axios"


export const addConsultation = (consultation) => {
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

