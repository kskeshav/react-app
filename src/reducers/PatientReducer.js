import { 
    GET_PATIENTS_REQUEST, 
    GET_PATIENTS_SUCCESS, 
    GET_PATIENTS_FAILURE,
    ADD_PATIENTS_REQUEST,
    ADD_PATIENTS_SUCCESS,
    ADD_PATIENTS_FAILURE,
    SET_CURRENT_PATIENT
 } from "../constants"; 

const patientState = {
    patient: {
        firstName: "",
        lastName: "",
        abhaId: "",
        dob: "",
        age: "",
        gender: "",
        education: "",
        occupation: "",
        language: "",
        socioEconomicStatus: "",
        address: "",
        district: "",
        pincode: "",
        phoneNo: "",
        careGiverName: "",
        relationshipWithPatient: "",
        bloodGroup: ""
    },
    errMessage: "",
    success: false,
    failure: false,
    message: "",
    patientLoading: false, 
    patientAdding: false,
    patients: []
}

export const PatientReducer = (state = patientState, action) => {
    console.log(action)
    switch (action.type) {
        case GET_PATIENTS_SUCCESS : 
            return {
                ...state,
                patients: action.patientDetails,
                patientLoading: false
            };
        case GET_PATIENTS_FAILURE:
            return {
                ...state, 
                patientLoading: false,
                errMessage: action.err 
            }
        
        case GET_PATIENTS_REQUEST:
            return {
                ...state,
                patientLoading: true
            }
        case ADD_PATIENTS_REQUEST:
            return {
                ...state,
                patientAdding: true
            }
        
        case ADD_PATIENTS_SUCCESS: 
            return {
                ...state,
                success: action.status.success,
                failure: action.status.failure,
                message: action.status.message,
                patientAdding: false,
            }
        case ADD_PATIENTS_FAILURE:
            return {
                ...state,
                success: action.status.success,
                failure: action.status.failure,
                message: action.status.message,
                patientAdding: false,
            }
        case SET_CURRENT_PATIENT:
            return {
                ...state,
                patient: action.patientDetail
            }
        default:
            return {...state};
          
    }
}