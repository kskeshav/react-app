import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@material-ui/core/Button";
import { TextField } from "@mui/material";
import { MenuItem, Paper } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Questionnaire = (props) => {
  let questionnaire = {
    id: 0,
    name: "string",
    questions: {
      additionalProp1: {
        options: ["yes", "no"],
        question: "Loss of Consciousness",
      },
      additionalProp2: {
        options: ["yes", "no", "maybe"],
        question: "Sudden episode of loss of contact with the surroundings",
      },
      additionalProp3: {
        options: ["yes", "no", "maybe", "maybe not"],
        question: "Uncontrollable shaking of head, arms or legs",
      },
    },
    version: "string",
  };

  let f = {};

  Object.entries(questionnaire.questions).map(
    ([key,data]) => (f[key] = "not answered")
  );

  console.log(f);

  const [responseList, setResponseList] = useState(f);

  const handleButton = (e, key) => {
    let newState = responseList;
    newState[key] = e.target.value;
    setResponseList(newState);

    console.log(e.target.value);
    console.log(responseList);
  };

  const func = (e) => {};
  return (
    <Paper
      elevation={10}
      style={{ margin: "20px 5%" }}
      className="page-content"
    >
      <fieldset disabled={props.view}>
        <h1
          style={{ textAlign: "center", marginTop: "10px" }}
          className="heading"
        >
          {"Common Questionnaire"}
        </h1>

        <form onSubmit={func}>
          <div style={{ maxWidth: "80%", margin: "auto" }}>
            <Grid
              container
              spacing={3}
              // direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {Object.entries(questionnaire.questions).map(([key, data]) => {
                if (data.options.length <= 3) {
                  return (
                    <>
                      <Grid item xs={9} sm={9} md={9} xl={9}>
                        <h3>{data.question}</h3>
                      </Grid>
                      <Grid>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="response"
                            name="response"
                            defaultValue="not answered"
                            onChange={(e) => handleButton(e, key)}
                          >
                            {data.options.map((option, itr) => {
                              return (
                                <>
                                  <FormControlLabel
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                    labelPlacement="top"
                                  />
                                </>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </>
                  );
                }
                return (
                  <>
                    <Grid item xs={9} sm={9} md={9} xl={9}>
                      <h3>{data.question}</h3>
                    </Grid>
                    <Grid>
                      <TextField
                        variant="outlined"
                        name="selectOption"
                        label="select option"
                        defaultValue=""
                        type="text"
                        select
                        style={{ width: "200px" }}
                        onChange={(e) => handleButton(e, key)}
                      >
                        {data.options.map((option, itr) => {
                          return (
                              <MenuItem value={option}>{option}</MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                  </>
                );
              })}
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
                style={{ width: "200px" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </fieldset>
    </Paper>
  );
};

export default Questionnaire;
