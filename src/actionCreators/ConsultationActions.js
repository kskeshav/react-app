import { 
    ADD_CONSULTATION_REQUEST,
    ADD_CONSULTATION_SUCCESS,
    ADD_CONSULTATION_FAILURE,
    GET_CONSULTATION_REQUEST,
    GET_CONSULTATION_SUCCESS,
    GET_CONSULTATION_FAILURE,
    SET_CURRENT_CONSULTATION
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

export const getConsultationRequest = () => ({
    type: GET_CONSULTATION_REQUEST
})

export const getConsultationSuccess = (consultations) => {
    return {
        type: GET_CONSULTATION_SUCCESS,
        consultations: consultations
    }
}

export const getConsultationFailure = (err) => ({
    type: GET_CONSULTATION_FAILURE,
    err: err
})

export const setConsultation = (consultation) => {
    return {
        type: SET_CURRENT_CONSULTATION,
        consultation: consultation
    }
}