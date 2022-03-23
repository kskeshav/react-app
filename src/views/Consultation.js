import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
import { MenuItem, Paper } from "@material-ui/core";
// import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import update from "immutability-helper";
import * as yup from "yup";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

const formSchema = yup.object().shape({
    consultationDate: yup.date().required(),
    complaint: yup.string().required(),
    examination: yup.string().required(),
    illnessSummary: yup.string().required(),
    diagnosisType: yup.string().required(),
    icdDescription: yup.string().required(),
    icd10Code: yup.string().required(),
    improvementStatus: yup.string().required(),
    treatmentInstructions: yup.string().required(),
    remarks: yup.string().required(),
    followUpDate: yup.date().required(),
    referral: yup.string().required(),
    moveToIP: yup.string().required(),
    reviewSos: yup.string().required(),
  });
  
  

const Medicines = {
  medicineName: "",
  dosage: "",
  dosingTime: "",
  duration: "",
};
const Consultation = (props) => {

  const defaultValues = {
    consultationDate: "",
    complaint: "",
    examination: "",
    illnessSummary: "",
    diagnosisType: "",
    icdDescription: "",
    icd10Code: "",
    improvementStatus: "",
    treatmentInstructions: "",
    remarks: "",
    followUpDate: "",
    referral: "",
    patient:props.patient,
    moveToIP: false,
    reviewSos: false,
    // Consultation_List (List of Prior Consultation Ids)
  };

  const [medicineList, setMedicineList] = useState([Medicines]);

  const handleButton = (e, index) => {
    const { name, value } = e.target;
    const list = [...medicineList];
    list[index][name] = value;
    setMedicineList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...medicineList];
    list.splice(index, 1);
    setMedicineList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setMedicineList([...medicineList, Medicines]);
  };
  const [errors, setErrors] = useState({
    consultationDate: false,
    complaint: false,
    examination: false,
    illnessSummary: false,
    diagnosisType: false,
    icdDescription: false,
    icd10Code: false,
    improvementStatus: false,
    treatmentInstructions: false,
    remarks: false,
    followUpDate: false,
    referral: false,
  });

  const [formValues, setFormValues] = useState(defaultValues);

  

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");

  const [radioValue, setRadioValue] = useState("");
  
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setFormValues({...formValues , moveToIP: (event.target.value === "moveToIP"), reviewSos: (event.target.value === "reviewSOS")})
  }

  useEffect(() => {
    setFormValues({...formValues , medicines: medicineList})
  },[medicineList])


  useEffect(() => {
    props.view ? setFormValues(props.values) : setFormValues(formValues);
    props.view ? setRadioValue(props.values.reviewSos ? "reviewSOS" : props.values.moveToIP ? "moveToIP" : "" ) : setRadioValue("")
    props.view ? setMedicineList(props.values.medicines) : setMedicineList(medicineList);
    setSuccess(props.success) 
    setFailure(props.failure) 
    setMessage(props.message) 
  }, [props.view, props.values, props.success, props.failure, props.message, props.patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: false,
    });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = React.useCallback(
    async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      // Check the schema if form is valid:
      const isFormValid = await formSchema.isValid(formValues, {
        abortEarly: false, // Prevent aborting validation after first error
      });
      if (isFormValid) {
        console.log("in")
        console.log(formValues);
        props.add(formValues);
      } else {
        formSchema.validate(formValues, { abortEarly: false }).catch((err) => {
          const errors = err.inner.reduce((acc, error) => {
            console.log(error)
            return {
              ...acc,
              [error.path]: true,
            };
          }, {});
          setErrors((prevErrors) =>
            update(prevErrors, {
              $set: errors,
            })
          );
        });
      }
    },
    [formValues]
  );

  return (
    <Paper
      elevation={10}
      style={{ margin: "5vh 10%", width: "80%" }}
      className="page-content"
    >
      <fieldset disabled={props.view}>
        <h2
          style={{ textAlign: "center", marginTop: "5px" }}
          className="heading"
        >
          {props.view ? "Consultation Details" : "Add Consultation Details"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ maxWidth: "95%", margin: "auto" }}>
            <Grid
              container
              spacing={3}
              // direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="date"
                  name="consultationDate"
                  label="Date of Consulting"
                  type="date"
                  value={formValues.consultationDate}
                  style={{ width: "100%" }}
                  sx={{ width: 220 }}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.consultationDate}
                  helperText={
                    errors.consultationDate ? "Date of Consultation is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Complaint"
                  name="complaint"
                  label="Complaint"
                  type="text"
                  style={{ width: "100%" }}
                  // variant="outlined"
                  value={formValues.complaint}
                  onChange={handleInputChange}
                  error={errors.complaint}
                  helperText={errors.complaint ? "Complaint is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Examination"
                  name="examination"
                  label="Examination"
                  type="text"
                  style={{ width: "100%" }}
                  value={formValues.examination}
                  onChange={handleInputChange}
                  error={errors.examination}
                  helperText={
                    errors.examination ? "Examination is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="IllnessSummary"
                  name="illnessSummary"
                  label="Illness Summary"
                  type="text"
                  style={{ width: "100%" }}
                  value={formValues.illnessSummary}
                  onChange={handleInputChange}
                  error={errors.illnessSummary}
                  helperText={
                    errors.illnessSummary ? "Illness Summary is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="DiagnosisType"
                  name="diagnosisType"
                  label="Diagnosis Type"
                  type="text"
                  select
                  InputProps={{readOnly: props.view}}
                  style={{ width: "100%" }}
                  value={formValues.diagnosisType}
                  onChange={handleInputChange}
                  error={errors.diagnosisType}
                  helperText={
                    errors.diagnosisType ? "Diagnosis Type is required" : ""
                  }
                >
                   <MenuItem value="Differential">Differential</MenuItem>
                   <MenuItem value="Provisional">Provisional</MenuItem>
                   <MenuItem value="Tentative">Tentative</MenuItem>
                   <MenuItem value="Final">Final</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="icdDescription"
                  name="icdDescription"
                  label="ICD Description"
                  type="text"
                  style={{ width: "100%" }}
                  value={formValues.icdDescription}
                  onChange={handleInputChange}
                  error={errors.icdDescription}
                  helperText={
                    errors.icdDescription ? "ICD Description is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="icd10Code"
                  name="icd10Code"
                  label="ICD 10 Code"
                  type="text"
                  style={{ width: "100%" }}
                  value={formValues.icd10Code}
                  onChange={handleInputChange}
                  error={errors.icd10Code}
                  helperText={errors.icd10Code ? "ICD 10 Code is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="ImprovementStatus"
                  name="improvementStatus"
                  label="Improvement Status"
                  type="text"
                  select
                  InputProps={{readOnly: props.view}}
                  style={{ width: "100%" }}
                  value={formValues.improvementStatus}
                  onChange={handleInputChange}
                  error={errors.improvementStatus}
                  helperText={
                    errors.improvementStatus
                      ? "Improvement Status is required"
                      : ""
                  }
                >
                <MenuItem value="Condition Improved">Condition Improved</MenuItem>
                <MenuItem value="Condition Worsened">Condition Worsened</MenuItem>
                <MenuItem value="Condition Unchanged">Condition Unchanged</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12}>
                  
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ textAlign: "left", marginTop: "5px", marginRight:"15px" }}>
                      Medicines
                    </h3>
                    {/* medicineList.length - 1 === i && why we have to use this? and don't remove this line*/}
                    {
                      <Button
                        onClick={handleAddClick}
                        style={{ width: "30px" }}
                        variant="contained"
                        color="primary"
                        // type="submit"x
                      >
                        Add
                      </Button>
                    }
                  </div>
                {medicineList.map((x, i) => {
                  return (
                    
                      <Grid
                        container
                        spacing={3}
                        // direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="medicineName"
                            label="Medicine Name"
                            value={x.medicineName}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="dosage"
                            label="Dosage"
                            value={x.dosage}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="dosingTime"
                            label="Dosing Time"
                            value={x.dosingTime}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="duration"
                            label="Duration"
                            value={x.duration}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "20px 0px 20px 20px",
                          }}
                        >
                          {medicineList.length !== 1 && (
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              style={{ width: "100px"}}
                              variant="contained"
                              color="primary"
                              // type="submit"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </Grid>
                  );
                })}
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Treatment Instructions"
                  name="treatmentInstructions"
                  label="Treatment Instructions"
                  style={{ width: "100%" }}
                  value={formValues.treatmentInstructions}
                  onChange={handleInputChange}
                  error={errors.treatmentInstructions}
                  helperText={
                    errors.treatmentInstructions
                      ? "Treatment Instruction is required"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Remarks"
                  name="remarks"
                  label="Remarks"
                  type="text"
                  style={{ width: "100%" }}
                  value={formValues.remarks}
                  onChange={handleInputChange}
                  error={errors.remarks}
                  helperText={errors.remarks ? "Remarks are required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                <TextField
                  variant="outlined"
                  id="followUpDate"
                  name="followUpDate"
                  label="Follow Up"
                  type="date"
                  style={{ width: "100%" }}
                  value={formValues.followUpDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.followUpDate}
                  helperText={errors.followUpDate ? "Follow Up is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={4}>
                <TextField
                  variant="outlined"
                  id="referral"
                  name="referral"
                  label="Referral"
                  value={formValues.referral}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  error={errors.referral}
                  helperText={errors.referral ? "Referral is required" : ""}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="next-steps"
                  value={radioValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="moveToIP" control={<Radio />} label="Move To IP" />
                  <FormControlLabel value="reviewSOS" control={<Radio />} label="Review SOS" />
                </RadioGroup>
              </Grid>
              
            </Grid>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "400px",
                margin: "20px auto",
              }}
            >
              <Button
                style={props.view ? { display: "none" } : { width: "200px" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
              <Collapse in={success}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccess(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt: 2, mb: 2 }}
                >
                  {message}
                </Alert>
              </Collapse>
              <Collapse in={failure}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setFailure(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt: 2, mb: 2 }}
                >
                  {message}
                </Alert>
              </Collapse>
            </div>
          </div>
        </form>
      </fieldset>
    </Paper>
  );
};
export default Consultation;
