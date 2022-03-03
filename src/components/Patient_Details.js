import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { MenuItem, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import update from "immutability-helper";
import * as yup from "yup";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

const formSchema = yup.object().shape({
  name: yup.string().required(),
  abhaId: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  education: yup.string().required(),
  occupation: yup.string().required(),
  language: yup.string().required(),
  socioEconomicStatus: yup.string().required(),
  address: yup.string().required(),
  phoneNo: yup.string().required().matches(/^[6-9]\d{9}$/),
  careGiverName: yup.string().required(),
  relationshipWithPatient: yup.string().required(),
  bloodGroup: yup.string().required(),
});

const defaultValues = {
  name: "",
  abhaId: 0,
  dob: "",
  gender: "",
  education: "",
  occupation: "",
  language: "",
  socioEconomicStatus: "",
  address: "",
  phoneNo: 0,
  careGiverName: "",
  relationshipWithPatient: "",
  bloodGroup: "",
  // Consultation_List (List of Prior Consultation Ids)
};
const Patient_Details = (props) => {
  

  const [errors, setErrors] = useState({
    name: false,
    abhaId: false,
    dob: false,
    gender: false,
    education: false,
    occupation: false,
    language: false,
    socioEconomicStatus: false,
    address: false,
    phoneNo: false,
    careGiverName: false,
    relationshipWithPatient: false,
    bloodGroup: false,
  });

  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    props.view ? setFormValues(props.values) : setFormValues(defaultValues)
    console.log(props.values)
    console.log(props.view)
  },[props.view, props.values]);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = React.useCallback(
    async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      console.log("submittinininininini")
      // Check the schema if form is valid:
      const isFormValid = await formSchema.isValid(formValues, {
        abortEarly: false, // Prevent aborting validation after first error
      });

      if (isFormValid) {
        console.log(formValues);
        try{
          let res = await axios.post(
            "http://localhost:8080/api/v1/patientdemographics",
            formValues
          );
          if (res.data.name === formValues.name) {
            setSuccess(true);
            setFailure(false);
            setMessage("Patient details added successfully");
          }
        }
        catch(e){
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
    <Paper elevation={10} style={{margin :"5vh 5%"}}>
    <fieldset disabled={props.view}>
      {/*add a age column */}
      <h2 style={{ textAlign: "center", marginTop: "10px" }}> {props.view ? "Patient Details" : "Add Patient Details"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{maxWidth:"80%", margin:"auto"}}>
        <Grid
          container
          spacing={3}
          // direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "10px" }}
        >
          
          <Grid item xs={6}  >
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.name}
              onChange={handleInputChange}
              // validationSchema={formSchema}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              {...(errors.name ? <>error</> : "")}
              id="AbhaId"
              name="abhaId"
              label="ABHA ID"
              type="number"
              required
              style={{ width: 400 }}
              value={formValues.abhaId === 0 ? "" : formValues.abhaId}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="date"
              name="dob"
              label="Date of Birth"
              type="date"
              required
              value={formValues.dob}
              style={{ width: 400 }}
              sx={{ width: 220 }}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} direction="column" style={props.view ?{}: {display: 'none'}}>
            <TextField
              // {...(errors.name ? <>error</> : "")}
              id="age"
              name="age"
              label="Age"
              type="number"
              // required
              style={{ width: 400 }}
              value={formValues.age}

            />
          </Grid>
          <Grid item xs={6} direction="column">
            <FormControl>
              <FormLabel>Gender*</FormLabel>
              <RadioGroup
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  key="male"
                  value="male"
                  control={<Radio size="small" required = {true}/>}
                  label="Male"
                />
                <FormControlLabel
                  key="female"
                  value="female"
                  control={<Radio size="small" required = {true}/>}
                  label="Female"
                />
                <FormControlLabel
                  key="other"
                  value="other"
                  control={<Radio size="small" required = {true}/>}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="Education"
              name="education"
              label="Education"
              type="text"
              required
              style={{ width: 400 }}
              // variant="outlined"
              value={formValues.education}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="Occupation"
              name="occupation"
              label="Occupation"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.occupation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="Languages"
              name="language"
              label="Languages"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.language}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="SocioeconomicStatus"
              name="socioEconomicStatus"
              label="Socioeconomic Status"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.socioEconomicStatus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="Address"
              name="address"
              label="Address"
              type="text"
              required
              multiline
              style={{ width: 400 }}
              value={formValues.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="TelephoneNumber"
              name="phoneNo"
              label="Telephone Number"
              type="number"
              required
              style={{ width: 400 }}
              value={formValues.phoneNo === 0 ? "" : formValues.phoneNo}
              onChange={handleInputChange}
              error={formValues.phoneNo !== 0 && !(/^[6-9]\d{9}$/).test(formValues.phoneNo)}
              helperText={formValues.phoneNo !== 0 && !(/^[6-9]\d{9}$/).test(formValues.phoneNo) ? 'Enter a valid phone Number.' : ' '}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="InformantCaregiverName"
              name="careGiverName"
              label="Informant Caregiver Name"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.careGiverName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              id="RelationshipWithPatient"
              name="relationshipWithPatient"
              label="Relationship with Patient"
              type="text"
              required
              style={{ width: 400 }}
              value={formValues.relationshipWithPatient}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={props.view ? 6 : 12}>
            <TextField
              id="BloodGroup"
              name="bloodGroup"
              label="Blood Group"
              required
              value={formValues.bloodGroup}
              onChange={handleInputChange}
              style={{ width: 400 }}
              select
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
          <div style={{display:"flex" ,flexDirection:"column", alignItems:"center",  maxWidth:"400px", margin:"30px auto"}}>
            <Button style={props.view ?{ display: 'none' }: {width:"200px"}} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          <Collapse in={success} >
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
              sx={{ mt: 2, mb:2}}
            >
              {message}
            </Alert>
          </Collapse>
          <Collapse in={failure} >
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
              sx={{ mt: 2, mb:2}}
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
