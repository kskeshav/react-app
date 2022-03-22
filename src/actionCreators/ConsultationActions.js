import { 
    ADD_CONSULTATION_REQUEST,
    ADD_CONSULTATION_SUCCESS,
    ADD_CONSULTATION_FAILURE
 } from "../constants";  

export const addConsultationRequest = () => ({
    type: ADD_CONSULTATION_REQUEST
})

export const addConsultationSuccess = (status) => {
    return {
        type: ADD_CONSULTATION_SUCCESS,
        status: status
    }
}

export const addConsultationFailure = (status) => ({
    type: ADD_CONSULTATION_FAILURE,
    status: status
})
