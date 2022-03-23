import { 
    ADD_CONSULTATION_REQUEST,
    ADD_CONSULTATION_SUCCESS,
    ADD_CONSULTATION_FAILURE,
    GET_CONSULTATION_REQUEST,
    GET_CONSULTATION_SUCCESS,
    GET_CONSULTATION_FAILURE,
    SET_CURRENT_CONSULTATION
 } from "../constants";  

const consultationState = {
    consultation: {
        consultationDate: "",
        complaint: "",
        examination: "",
        illnessSummary: "",
        diagnosisType: "",
        iCDDescription: "",
        iCD10Code: "",
        improvementStatus: "",
        treatmentInstructions: "",
        remarks: "",
        followUp: "",
        referral: "",
        moveToIP: "",
        reviewSos: "",
    },
    errMessage: "",
    success: false,
    failure: false,
    message: "",
    consultationLoading: false, 
    consultationAdding: false,
    consultations: []
}

export const ConsultationReducer = (state = consultationState, action) => {
    console.log(action)
    switch (action.type) {
        case GET_CONSULTATION_SUCCESS : 
            return {
                ...state,
                consultations: action.consultations,
                consultationLoading: false
            };
        case GET_CONSULTATION_FAILURE:
            return {
                ...state, 
                consultationLoading: false,
                errMessage: action.err 
            }
        
        case GET_CONSULTATION_REQUEST:
            return {
                ...state,
                consultationLoading: true
            }
        case ADD_CONSULTATION_REQUEST:
            return {
                ...state,
                consultationAdding: true
            }
        
        case ADD_CONSULTATION_SUCCESS: 
            return {
                ...state,
                success: action.status.success,
                failure: action.status.failure,
                message: action.status.message,
                consultationAdding: false,
            }
        case ADD_CONSULTATION_FAILURE:
            return {
                ...state,
                success: action.status.success,
                failure: action.status.failure,
                message: action.status.message,
                consultationAdding: false,
            }
        case SET_CURRENT_CONSULTATION:
            return {
                ...state,
                consultation: action.consultation
            }
        default:
            return {...state};
          
    }
}