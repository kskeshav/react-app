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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  abhaId: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  education: yup.string().required(),
  occupation: yup.string().required(),
  language: yup.string().required(),
  socioEconomicStatus: yup.string().required(),
  address: yup.string().required(),
  district: yup.string().required(),
  pincode: yup.string().required().matches(/^[0-9]{6}$/),
  phoneNo: yup
    .string()
    .required()
    .matches(/^[6-9]\d{9}$/),
  careGiverName: yup.string().required(),
  relationshipWithPatient: yup.string().required(),
  bloodGroup: yup.string().required(),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  abhaId: "",
  dob: "",
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
  bloodGroup: "",
  // Consultation_List (List of Prior Consultation Ids)
};
const Patient_Details = (props) => {
  

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
    <Paper elevation={10} style={{ margin: "5vh 5%" }} className="page-content">
      <fieldset disabled={props.view}>
        <h2
          style={{ textAlign: "center", marginTop: "10px" }}
          className="wizard-heading"
        >
          {props.view ? "Patient Details" : "Add Patient Details"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ maxWidth: "80%", margin: "auto" }}>
            <Grid
              container
              spacing={3}
              // direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={4}>
                <TextField
                  id="outlined-name"
                  name="firstName"
                  label="First Name *"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  // validationSchema={formSchema}
                  error={errors.firstName}
                  helperText={errors.firstName ? "First Name is required" : ""}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  id="name-input"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  helperText={errors.lastName ? "Last Name is required" : ""}
                  // validationSchema={formSchema}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="AbhaId"
                  name="abhaId"
                  label="ABHA ID"
                  style={{ width: 400 }}
                  value={formValues.abhaId}
                  onChange={handleInputChange}
                  error={errors.abhaId}
                  helperText={errors.abhaId ? "Abha Id is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="date"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  value={formValues.dob}
                  style={{ width: 400 }}
                  sx={{ width: 220 }}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.dob}
                  helperText={errors.dob ? "Date of Birth is required" : ""}
                />
              </Grid>
              <Grid
                item
                xs={4}
                direction="column"
                style={props.view ? {} : { display: "none" }}
              >
                <TextField
                  variant="outlined"
                  // {...(errors.name ? <>error</> : "")}
                  id="age"
                  name="age"
                  label="Age"
                  // required
                  style={{ width: 400 }}
                  value={formValues.age}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Gender"
                  name="gender"
                  label="Gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  style={{ width: 400 }}
                  select
                  InputProps={{readOnly: props.view}}
                  error={errors.gender}
                  helperText={errors.gender ? "Gender is required" : ""}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Education"
                  name="education"
                  label="Education"
                  type="text"
                  style={{ width: 400 }}
                  // variant="outlined"
                  value={formValues.education}
                  onChange={handleInputChange}
                  error={errors.education}
                  helperText={errors.education ? "Education is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Occupation"
                  name="occupation"
                  label="Occupation"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.occupation}
                  onChange={handleInputChange}
                  error={errors.occupation}
                  helperText={errors.occupation ? "Occupation is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Languages"
                  name="language"
                  label="Languages"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.language}
                  onChange={handleInputChange}
                  error={errors.language}
                  helperText={errors.language ? "Language is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="SocioeconomicStatus"
                  name="socioEconomicStatus"
                  label="Socioeconomic Status"
                  type="text"
                  select
                  InputProps={{readOnly: props.view}}
                  style={{ width: 400 }}
                  value={formValues.socioEconomicStatus}
                  onChange={handleInputChange}
                  error={errors.socioEconomicStatus}
                  helperText={
                    errors.socioEconomicStatus
                      ? "Socioeconomic Status is required"
                      : ""
                  }
                >
                  <MenuItem value="Below Poverty line">Below Poverty line</MenuItem>
                  <MenuItem value="Above Poverty line">Above Poverty line</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Address"
                  name="address"
                  label="Address"
                  type="text"
                  multiline
                  style={{ width: 400 }}
                  value={formValues.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  helperText={errors.address ? "Address is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="District"
                  name="district"
                  label="District"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.district}
                  onChange={handleInputChange}
                  error={errors.district}
                  helperText={errors.district ? "District is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="Pincode"
                  name="pincode"
                  label="Pincode"
                  style={{ width: 400 }}
                  value={formValues.pincode}
                  onChange={handleInputChange}
                  error={errors.pincode}
                  helperText={errors.pincode ? "Pincode is required" : ""}
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="TelephoneNumber"
                  name="phoneNo"
                  label="Telephone Number"
                  style={{ width: 400 }}
                  value={formValues.phoneNo === 0 ? "" : formValues.phoneNo}
                  onChange={handleInputChange}
                  // error={
                  //   formValues.phoneNo !== "" &&
                  //   !/^[6-9]\d{9}$/.test(formValues.phoneNo)
                  // }
                  // helperText={
                  //   formValues.phoneNo !== "" &&
                  //   !/^[6-9]\d{9}$/.test(formValues.phoneNo)
                  //     ? "Enter a valid phone Number."
                  //     : " "
                  // }
                  error={errors.phoneNo}
                  helperText={
                    errors.phoneNo ? "Enter a valid phone number" : ""
                  }
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="InformantCaregiverName"
                  name="careGiverName"
                  label="Informant Caregiver Name"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.careGiverName}
                  onChange={handleInputChange}
                  error={errors.careGiverName}
                  helperText={
                    errors.careGiverName
                      ? "Informant Caregiver is required"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={4} direction="column">
                <TextField
                  variant="outlined"
                  id="RelationshipWithPatient"
                  name="relationshipWithPatient"
                  label="Relationship with Patient"
                  type="text"
                  style={{ width: 400 }}
                  value={formValues.relationshipWithPatient}
                  onChange={handleInputChange}
                  error={errors.relationshipWithPatient}
                  helperText={
                    errors.relationshipWithPatient ? "Relation is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={props.view ? 4 : 12}>
                <TextField
                  variant="outlined"
                  id="BloodGroup"
                  name="bloodGroup"
                  label="Blood Group"
                  value={formValues.bloodGroup}
                  onChange={handleInputChange}
                  style={{ width: 400 }}
                  select
                  InputProps={{readOnly: props.view}}
                  error={errors.bloodGroup}
                  helperText={
                    errors.bloodGroup ? "Blood Group is required" : ""
                  }
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "400px",
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
export default Patient_Details;
