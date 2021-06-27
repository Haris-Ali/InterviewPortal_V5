import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {useParams, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import './Interview_Post_Page.css'
import { useForm, Controller } from "react-hook-form"
import { isEmpty } from '../utils/validation/Validation';


import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

import { showErrorMessage, showSuccessMessage } from '../utils/notification/Notification';
import Loading from '../Loading';
import moment from 'moment';
import Chart from "react-google-charts";


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100hv',
      borderStyle: "solid",
      padding: "20px"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const useStyles_two = makeStyles((theme) => ({
    formControl: {
      minWidth: "100%",
      backgroundColor: 'transparent',
  
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Interview-Me!
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default function Report_Page({user}) {

    const {register, handleSubmit} = useForm();
    const history = useHistory()
    const {id} = useParams();

    const classes = useStyles();
    const classes_two = useStyles_two();

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);


    const [report, setReport] = useState([]);
  
    const callApi = async ()=>{     
        setLoading(true);
        await axios.post("/user/get-report-by-meetingId",{meetingId: id}).then((res)=>{
            setReport(res.data);
            console.log("Report : ",res.data)
            setLoading(false);
        }).catch((err) => {
           if(err.response.data.msg === false){
               if (user?.role === 0 ){
                    history.push('/meetings/see-meetings-schedule-for-candidate')
                    alert("Result is not announced yet")
               }
               else{
                   history.push('/meetings/see-schedule-meeting')
                   alert("Result couldn't be saved due to network error")
               }
           }
        });

        
    }
    useEffect(()=>{
        console.log("This Use Effect is being called")
        callApi();  
    },[])

    const dropdownHired = [
        {value: "hire", name: "Hire"},
        {value: "reject", name: "Reject"},
    ];

    const [hired, setHired] = useState("")

    const handleChangeForHired = (event) => {
        setHired(event.target.value);
      };
    const emptyCheck = (
        comments, hired 
        ) => {
    
        if (isEmpty(comments)){
          setError("Please give your Comments for Candidate")
          return false;
        }
        else if (isEmpty(hired)){
          setError("Please choose Hiring Option")
          return false;
        }
        else{
            return true;
        }
    } 

    const validityCheck = (comments) => {
        if(comments.length < 10){
            setError("Comments Field is too short");
            return false;
        }
        else{
            return true;
        }
    }

    const onSubmit = async (data) =>{

        const comments = data.comments;
        
        const checkEmpty = emptyCheck( comments, hired);
    
        if (checkEmpty){
      
          const checkValid = validityCheck(
            comments
            );
          console.log("The value of checkField", checkValid)
          if (checkValid){
            console.log(comments)
            console.log(hired)
            try {
              const res = await axios.post('/user/update-report-by-meetingId', {
                meetingId : id, candidate_user: report?.candidate_user,
                candidate: report?.candidate,
                interviewer_user: report?.interviewer_user, 
                interviewer: report?.interviewer,
                comments, hired
              })
              setError("")
              setSuccess(res.data.msg)
              } catch (err) {
                console.log(err)
                setError(err.response.data.msg)
              }
          }
        }
      }

    return (
        <>
        {
            loading ? (
                <>
                  <Loading />  
                </>
            ): (

                <>
                    <div>
                        <img className = "interview__home__image" src="https://res.cloudinary.com/xapper72/image/upload/v1620095929/avatar/amazon_qrzh6x.png" alt=""/>
                    </div>
                    <div className="main">
                        <div className="left__container">
                        
                            <div className="card">
                                <img src={report?.candidate_user?.avatar} className= "img_post"/>
                                <h2>{report?.candidate_name}</h2>
                                <p class="title">{report?.candidate_user?.email} </p>
                                <p>{report?.interviewer?.education?.institute_name}</p>
                            </div>
                        
                        </div>
                        <div className="right__container">
                           


                            <div className="graph__list__section">
                                <div className="company__title__section">
                                    <div className="company__list__heading__section">
                                        <h3 className= "user__section__heading"> Emotion Analysis </h3>
                                    </div>
                                </div>

                                <div className = "graph__main">
                                    <Chart
                                        width={'800px'}
                                        height={'500px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={report?.chartData}
                                        options={{
                                            title: 'Emotions',
                                            // Just add this option
                                            is3D: true,
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    />
                                </div>

                            </div>
                            
                            <div className="bar__graph__list__section">
                                <div className="company__title__section">
                                    <div className="company__list__heading__section">
                                        <h3 className= "user__section__heading"> Result Analysis </h3>
                                    </div>
                                </div>

                                <div className = "bar__graph__main">
                                    <Chart
                                        width={'800px'}
                                        height={'500px'}
                                        chartType="Bar"
                                        loader={<div>Loading Chart</div>}
                                        data={report?.chartData_2}
                                        options={{
                                        // Material design options
                                        chart: {
                                            title: 'Candidate Performance',
                                            subtitle: 'Analaysis of overall scores',
                                        },
                                        }}
                                        // For tests
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>

                            </div> {/* closing div of list section */} 


                             
                           


                                <div className="company__section">

                                    <div className="company__section__titlebar">
                                        <div className="company__heading__section">
                                            <PermIdentityOutlinedIcon />
                                            <h2 className= "company__heading_section_text"> Report Information </h2>
                                        </div>


                                    </div>
                                                

                                    <div className="user__information__main">
                                        <div className="user__information__left">
                                            
        
                                            <div className="user__information__left__section">
                                                <h4> <b> Interviewer   </b>  </h4>
                                                <h4> {report?.interviewer_user?.name}</h4>
                                            </div>
        
                                            <div className="user__information__left__section">
                                                <h4> <b> Interviewer Email   </b>  </h4>
                                                <h4> {report?.interviewer_user?.email}</h4>
                                            </div>
                                            <div className="user__information__left__section">
                                                <h4> <b> Meeting Date   </b>  </h4>
                                                <h4> {moment(report?.meeting?.createdAt, 'YYYY-MM-DD hh:mm:ss').format('MM-DD-YYYY')}</h4>
                                            </div>
                                            <div className="user__information__left__section">
                                                <h4> <b> Cand. Qualification   </b>  </h4>
                                                <h4> {report?.candidate?.education?.qualification}</h4>
                                            </div>
                                            <div className="user__information__left__section">
                                                <h4> <b> Cand. desired salary   </b>  </h4>
                                                <h4> {report?.candidate?.expected_salary}$</h4>
                                            </div>

                    
                                        </div>

                                        <div className="user__information__right">
                                            <div className="user__information__right__section">
                                                <h4> <b> candidate   </b>  </h4>
                                                <h4> {report?.candidate_user?.name}</h4>
                                            </div>
            
                                            <div className="user__information__right__section">
                                                <h4> <b> Candidate Email   </b>  </h4>
                                                <h4> {report?.candidate_user?.email}</h4>                               
                                            </div>
            
                                            <div className="user__information__right__section">
                                                <h4> <b> Quiz Pin   </b>  </h4>
                                                <h4> {report?.meeting?.pin} </h4>                                                        
                                            </div>
                                            <div className="user__information__right__section">
                                                <h4> <b> Cand. Career Level   </b>  </h4>
                                                <h4> {report?.candidate?.career_level} </h4>                                                        
                                            </div>
                                    
                                            <div className="user__information__right__section">
                                                <h4> <b> Cand. Previous Job Salary   </b>  </h4>
                                                <h4> {report?.candidate?.job_preference?.previous_jobs_salary}$ </h4>                                                        
                                            </div>
                                            
                                            </div>
                                        </div>   
                                    
                                    
                                    <div className="company__information__main">        
                                        <h4> <b> Emotion Score  </b>  </h4>
                                        <h4> {report?.emotions_percentage}% </h4>

                                        <h4> <b> Quiz Score  </b>  </h4>
                                        <h4> {report?.quiz_percentage}% </h4>

                                        <h4> <b> CV Score  </b>  </h4>
                                        <h4> {report?.cv_percentage}% </h4>

                                        <h3> <b> Overall Score  </b>  </h3>
                                        <h3> {report?.overall_score}% </h3>

                                        <h4> <b> System's Recommendation  </b>  </h4>
                                        <h4> {
                                            report?.overall_score > 50 ?
                                            (
                                                'Passed since score is greater than 50%'
                                            ):(
                                                "Candidate's score is too low to be hired."
                                            )
                                        } </h4>

                                        {user?.role == 0 && (
                                            <>
                                                <h4> <b> Interviewer's Hiring Decision  </b>  </h4>
                                                {report?.hired === "" && <h4> Decision Pending </h4>}
                                                {report?.hired === "hire" && <h4> Congrtaulations! You're Hired by Interviewer </h4>}
                                                {report?.hired === "reject" && <h4> Unfortunately, You've been rejected by Interviewer </h4>}
                                                <h4> <b> Interviewer's Interviewer's Comments  </b>  </h4>
                                                {report?.comments === "" && <h4> N/A </h4>}
                                                {report?.comments !== "" && <h4> {report?.comments} </h4>}
                                            </>
                                        )}
                                    </div>

                                </div>
                           
                                             
                            


                            {(user?.role === 1 && report?.hired === "") && (
                                <div >
                                    <Container component="main" maxWidth="md" >
                                    <CssBaseline />
                                    <div className={classes.paper}>
                                        <Avatar className={classes.avatar}>
                                        <CreateIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                        Your Decision
                                        </Typography>
                            
                                        {error && !success && showErrorMessage(error)}
                                        {success && !error && showSuccessMessage(success)}
                                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
                                        <Grid container spacing={2}>
                            
                                            
                                                    <Grid item xs={12} >
                                                        <TextField
                                                            {...register('comments')}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            id="comments"
                                                            label="Comments for Candidate"
                                                            name="comments"
                                                            autoComplete="Web Design"
                                                        />
                                                    </Grid>
                            
                                                    <Grid item xs={12}>
                                                        <FormControl variant="outlined" className={classes_two.formControl}>
                                                        <InputLabel id="hired"> Hiring Decision* </InputLabel>
                                                        <Select
                                                            labelId="hired"
                                                            id="demo-simple-select-outlined"
                                                            value={hired}
                                                            onChange={handleChangeForHired}
                                                            label="Hiring Decision*"
                                                        >
                                                            <MenuItem value="">
                                                            <em>None</em>
                                                            </MenuItem>
                                                            {dropdownHired.map(ind => {
                                                            return(
                                                                <MenuItem value={ind.value}>{ind.name}</MenuItem>
                                                            )
                                                            })             
                                                            }
                                                        </Select>
                                                        </FormControl>
                                                    </Grid> 
                                                    
                                                    
                            
                                                </Grid>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Add
                                        </Button>
                                        
                                        </form>
                                    </div>
                                    <Box mt={5}>
                                        <Copyright />
                                    </Box>
                                    </Container>
                                </div>
                                )
                            }



                        </div> {/* closing div of right container */} 

                         
                    </div>
                </>
            )
        }
        
        </>
            
    )
}


