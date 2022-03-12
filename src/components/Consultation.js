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
import update from "immutability-helper";
import * as yup from "yup";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

const formSchema = yup.object().shape({
    doc: yup.string().required(),
    Complaint: yup.string().required(),
    Examination: yup.string().required(),
    IllnessSummary: yup.date().required(),
    DiagnosisType: yup.string().required(),
    ICDDescription: yup.string().required(),
    ICD10Code: yup.string().required(),
    ImprovementStatus: yup.string().required(),
    treatmentInstructions: yup.string().required(),
    remarks: yup.string().required(),
    followUp: yup.string().required(),
    referral: yup.string().required(),
    moveToIP: yup.string().required(),
    reviewSOS: yup.string().required(),
  });
  
  const defaultValues = {
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
    // Consultation_List (List of Prior Consultation Ids)
  };

const Medicines = {
  medicineName: "",
  dosage: "",
  dosingTime: "",
  duration: "",
};
const Consultation = (props) => {
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
    firstName: false,
    lastName: false,
    abhaId: false,
    dob: false,
    gender: false,
    education: false,
    occupation: false,
    language: false,
    socioEconomicStatus: false,
    address: false,
    district: false,
    pincode: false,
    phoneNo: false,
    careGiverName: false,
    relationshipWithPatient: false,
    bloodGroup: false,
  });

  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    props.view ? setFormValues(props.values) : setFormValues(defaultValues);
  }, [props.view, props.values]);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");

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
        console.log(formValues);
        try {
          let res = await axios.post(
            "http://localhost:8080/api/v1/patientdemographics",
            formValues
          );
          if (res.data.name === formValues.name) {
            setSuccess(true);
            setFailure(false);
            setMessage("Patient details added successfully");
          }
        } catch (e) {
          setFailure(true);
          setSuccess(false);
          setMessage(e.response.data.message);
        }
      } else {
        formSchema.validate(formValues, { abortEarly: false }).catch((err) => {
          const errors = err.inner.reduce((acc, error) => {
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
          className="wizard-heading"
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
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="date"
                  name="doc"
                  label="Date of Consulting"
                  type="date"
                  value={formValues.doc}
                  style={{ width: 270 }}
                  sx={{ width: 220 }}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.doc}
                  helperText={
                    errors.doc ? "Date of Consultation is required" : ""
                  }
                />
              </Grid>
              {/* <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Gender"
                  name="gender"
                  label="Gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  style={{ width: 270 }}
                  select
                  error={errors.gender}
                  helperText={errors.gender ? "Gender is required" : ""}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid> */}
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Complaint"
                  name="complaint"
                  label="Complaint"
                  type="text"
                  style={{ width: 270 }}
                  // variant="outlined"
                  value={formValues.complaint}
                  onChange={handleInputChange}
                  error={errors.Complaint}
                  helperText={errors.Complaint ? "Complaint is required" : ""}
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Examination"
                  name="examination"
                  label="Examination"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.examination}
                  onChange={handleInputChange}
                  error={errors.Examination}
                  helperText={
                    errors.Examination ? "Examination is required" : ""
                  }
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="IllnessSummary"
                  name="illnessSummary"
                  label="Illness Summary"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.illnessSummary}
                  onChange={handleInputChange}
                  error={errors.IllnessSummary}
                  helperText={
                    errors.IllnessSummary ? "Illness Summary is required" : ""
                  }
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="DiagnosisType"
                  name="diagnosisType"
                  label="Diagnosis Type"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.diagnosisType}
                  onChange={handleInputChange}
                  error={errors.DiagnosisType}
                  helperText={
                    errors.DiagnosisType ? "Diagnosis Type is required" : ""
                  }
                ></TextField>
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="ICDDescription"
                  name="iCDDescription"
                  label="ICD Description"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.iCDDescription}
                  onChange={handleInputChange}
                  error={errors.ICDDescription}
                  helperText={
                    errors.ICDDescription ? "ICD Description is required" : ""
                  }
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="ICD10Code"
                  name="iCD10Code"
                  label="ICD 10 Code"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.iCD10Code}
                  onChange={handleInputChange}
                  error={errors.ICD10Code}
                  helperText={errors.ICD10Code ? "ICD 10 Code is required" : ""}
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="ImprovementStatus"
                  name="improvementStatus"
                  label="Improvement Status"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.improvementStatus}
                  onChange={handleInputChange}
                  error={errors.ImprovementStatus}
                  helperText={
                    errors.ImprovementStatus
                      ? "Improvement Status is required"
                      : ""
                  }
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Treatment Instructions"
                  name="treatmentInstructions"
                  label="Treatment Instructions"
                  style={{ width: 270 }}
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
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Remarks"
                  name="remarks"
                  label="Remarks"
                  type="text"
                  style={{ width: 270 }}
                  value={formValues.remarks}
                  onChange={handleInputChange}
                  error={errors.remarks}
                  helperText={errors.remarks ? "Remarks are required" : ""}
                />
              </Grid>
              <Grid item l={4} direction="column">
                <TextField
                  variant="outlined"
                  id="FollowUp"
                  name="followUp"
                  label="Follow Up"
                  type="date"
                  style={{ width: 270 }}
                  value={formValues.followUp}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.followUp}
                  helperText={errors.followUp ? "Follow Up is required" : ""}
                />
              </Grid>
              <Grid item l={props.view ? 4 : 12}>
                <TextField
                  variant="outlined"
                  id="referral"
                  name="referral"
                  label="Referral"
                  value={formValues.referral}
                  onChange={handleInputChange}
                  style={{ width: 270 }}
                  error={errors.referral}
                  helperText={errors.referral ? "Referral is required" : ""}
                ></TextField>
              </Grid>
              <Grid item l={props.view ? 4 : 12}>
                <TextField
                  variant="outlined"
                  id="moveToIP"
                  name="moveToIP"
                  label="Move To IP"
                  value={formValues.moveToIP}
                  type="bool"
                  onChange={handleInputChange}
                  style={{ width: 270 }}
                  error={errors.moveToIP}
                  helperText={errors.moveToIP ? "move To IP is required" : ""}
                ></TextField>
              </Grid>
              <Grid item l={props.view ? 4 : 12}>
                <TextField
                  variant="outlined"
                  id="reviewSOS"
                  name="reviewSOS"
                  label="Review SOS"
                  value={formValues.reviewSOS}
                  onChange={handleInputChange}
                  style={{ width: 270 }}
                  error={errors.reviewSOS}
                  helperText={errors.reviewSOS ? "Review SOS is required" : ""}
                ></TextField>
              </Grid>
              <Grid>
                <h3 style={{ textAlign: "left", marginTop: "5px" }}>
                  Medicines
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "270px",
                    marginLeft: "50px",
                  }}
                >
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
                    <div style={{ margin: "40px" }}>
                      <Grid
                        container
                        spacing={3}
                        // direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item l={4} direction="column">
                          <TextField
                            name="medicineName"
                            label="Medicine Name"
                            value={x.medicineName}
                            style={{ width: 270 }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item l={4} direction="column">
                          <TextField
                            name="dosage"
                            label="Dosage"
                            value={x.dosage}
                            style={{ width: 270 }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item l={4} direction="column">
                          <TextField
                            name="dosingTime"
                            label="Dosing Time"
                            value={x.dosingTime}
                            style={{ width: 270 }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item l={4} direction="column">
                          <TextField
                            name="duration"
                            label="Duration"
                            value={x.duration}
                            style={{ width: 270 }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "270px",
                            marginLeft: "50px",
                          }}
                        >
                          {medicineList.length !== 1 && (
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              style={{ width: "80px" }}
                              variant="contained"
                              color="primary"
                              // type="submit"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "270px",
                margin: "50px auto",
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
