const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    meeting: {type : mongoose.Schema.Types.ObjectId, ref: "Meeting"},
    interviewer: {type : mongoose.Schema.Types.ObjectId, ref: "Interviewer"},
    candidate: {type : mongoose.Schema.Types.ObjectId, ref: "Candidate"},
    interviewer_user: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    candidate_user: {type : mongoose.Schema.Types.ObjectId, ref: "Users"},
    interviewer_name : {
        type: String,
        default: ""
    },
    candidate_name : {
        type: String,
        default: ""
    },
    emotions_percentage: {
        type: Number,
        default: 0
    },
    quiz_percentage: {
        type: Number,
        default: 0
    },
    cv_percentage:{
        type: Number,
        default: 0
    },
    overall_score:{
        type: Number,
        default: 0
    },
    chartData: [[]],
    chartData_2: [[]],
    comments:{
        type: String,
        default: ""
    },
    hired :{
        type: String,
        default: ""
    },


}, {
    timestamps: true 
})

module.exports = mongoose.model("Report", reportSchema);