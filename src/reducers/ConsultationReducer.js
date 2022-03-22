import { 
    ADD_CONSULTATION_REQUEST,
    ADD_CONSULTATION_SUCCESS,
    ADD_CONSULTATION_FAILURE
 } from "../constants";  

const consultationState = {
    consultation: {
        doc: "",
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
        reviewSOS: "",
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
        default:
            return {...state};
          
    }
}