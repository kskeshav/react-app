import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { MenuItem } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
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
  const [success, setSuccess] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        alert("Form Submitted")
        let res = await axios.post(
          "http://localhost:8080/api/v1/patientdemographics",
          formValues
        );
        
        if (res.data.name === formValues.name) setSuccess(1);
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
    <fieldset disabled={props.view}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          // direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ marginLeft: "", marginTop: "140px" }}
        >
          <Grid item xs={5} direction="column">
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.name}
              onChange={handleInputChange}
              validationSchema={formSchema}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              {...(errors.name ? <>error</> : "")}
              id="AbhaId"
              name="abhaId"
              label="ABHA ID"
              type="number"
              required
              style={{ width: 300 }}
              value={formValues.abhaId === 0 ? "" : formValues.abhaId}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="date"
              name="dob"
              label="Date of Birth"
              type="date"
              required
              value={formValues.dob}
              style={{ width: 300 }}
              sx={{ width: 220 }}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5} direction="column">
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
          <Grid item xs={5} direction="column">
            <TextField
              id="Education"
              name="education"
              label="Education"
              type="text"
              required
              style={{ width: 300 }}
              // variant="outlined"
              value={formValues.education}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="Occupation"
              name="occupation"
              label="Occupation"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.occupation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="Languages"
              name="language"
              label="Languages"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.language}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="SocioeconomicStatus"
              name="socioEconomicStatus"
              label="Socioeconomic Status"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.socioEconomicStatus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="Address"
              name="address"
              label="Address"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="TelephoneNumber"
              name="phoneNo"
              label="Telephone Number"
              type="number"
              required
              style={{ width: 300 }}
              value={formValues.phoneNo === 0 ? "" : formValues.phoneNo}
              onChange={handleInputChange}
              error={formValues.phoneNo !== 0 && !(/^[6-9]\d{9}$/).test(formValues.phoneNo)}
              helperText={formValues.phoneNo !== 0 && !(/^[6-9]\d{9}$/).test(formValues.phoneNo) ? 'Enter a valid phone Number.' : ' '}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="InformantCaregiverName"
              name="careGiverName"
              label="Informant Caregiver Name"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.careGiverName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5} direction="column">
            <TextField
              id="RelationshipWithPatient"
              name="relationshipWithPatient"
              label="Relationship with Patient"
              type="text"
              required
              style={{ width: 300 }}
              value={formValues.relationshipWithPatient}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="BloodGroup"
              name="bloodGroup"
              label="Blood Group"
              required
              value={formValues.bloodGroup}
              onChange={handleInputChange}
              style={{ width: 300 }}
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
          <Grid item xs={3}>
            <Button style={props.view ?{ display: 'none' }: {}} variant="contained" color="primary" type="submit">
              Submit
            </Button>
            {success === 0 ? <></> : <div>Added Patient details!</div>}
          </Grid>
        </Grid>
      </form>
    </fieldset>
  );
};
export default Patient_Details;
