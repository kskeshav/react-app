import { Card } from "@material-ui/core";
import { CardActionArea, CardContent, Typography, Grid, Paper, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {ReactComponent as ConsultationIcon} from '../common/Icons/addConsultation.svg';
import {ReactComponent as PatientIcon} from '../common/Icons/patient.svg';
import {ReactComponent as HistoryIcon} from '../common/Icons/pastRecords.svg';
import {useHistory} from 'react-router-dom'

const ViewPatientDashboard = () => {
    const useStyles = makeStyles({
        root: {
          maxWidth: 300,
        //   margin: 10
          
        }
      });
      const classes = useStyles();
      const paperStyle={padding :50, margin:"70px"};
      let history = useHistory();
      
    const gotoViewPatient = () => {
        history.push('/viewPatient')
    }
    const gotoAddConsultation = () => {
        history.push('/addConsultation')
    }
    const gotoViewPastConsultations = () => {
        history.push('/viewPastConsultations')
    }
    return (
        <>
         <Paper elevation={5} style={paperStyle}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Button onClick={gotoViewPatient}>
                    <Card className={classes.root}>
                        <CardActionArea >
                            <CardContent>
                                <div style={{height: "240px", width: "240px", padding: "10px"}}><PatientIcon/></div>
                                <Typography align="center">
                                    View Patient Details
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Button>
             
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Button onClick={gotoAddConsultation}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                <div style={{height: "240px", width: "240px", padding: "10px"}}>
                                <ConsultationIcon/></div>
                                    <Typography align="center">
                                        Add Consultation
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button onClick={gotoViewPastConsultations}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                <div style={{height: "240px", width: "240px", padding: "10px"}}>
                                    <HistoryIcon/>
                                    </div>
                                    <Typography align="center">
                                        View Past Consultations
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Button>
                </Grid>

            </Grid>
         </Paper>
        </>
    )
} 
export default ViewPatientDashboard;