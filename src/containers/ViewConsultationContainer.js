import React from "react";
import {useSelector} from "react-redux"
import Consultation from "../views/Consultation";


const ViewConsultationContainer = () => {
    const consultationState = useSelector(state => state.ConsultationReducer);
    console.log(consultationState)
  return (
    <Consultation view={true} values={consultationState.consultation} />
  )
}

export default ViewConsultationContainer
