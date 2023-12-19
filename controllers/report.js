const { response } = require('express');
const Report = require('../moduls/report')

exports.addReport = async (req, res) => {
 
 try{
  
    let file = 'N/A'
    if (req.file) {
        file = req.file.filename
    }
      const prefix = 'RID'
      const USER_ID = (prefix + Date.now())

      const newReport = new Report({
        report_id: USER_ID,
        doctor_name: req.body.doctor_name,
        illness: req.body.illness,
        date: req.body.date,
        picture: file
      });

      newReport.save().then(()=>{
        res.json("Added")
    }).catch((err) => {
        console.log(err);
    })

    
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..! +",
      error: error
    })

  }
}


exports.getAllReport = async (req, res) => {
  try {
    const allReport = await Report.find();
    if (allReport) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allReport
      })
    }
  }catch(error){
    console.log(error)
  }
}

exports.getOneReport = async (req, res) => {
  try {
    let userId = req.params.id;
    const repo = await Report.findById(userId);
    if (repo) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: repo
      })
    }
  }catch(error){
    console.log(error)
  }
}


exports.updateReport =  (async(req,res)=>{

    let file = 'N/A'
    if (req.file) {
        file = req.file.filename
    }

    let userId = req.params.id;

    const report_id = req.body.report_id;
    const doctor_name = req.body.doctor_name;
    const illness = req.body.illness;
    const date = req.body.date;
    const picture = file;
   
    const updateReport = {
        report_id,
        doctor_name,
        illness,
        date,
        picture
    }
    console.log(updateReport);
    const update = await Report.findByIdAndUpdate(userId, updateReport).then(() => {
        res.status(200).send({status: "Report Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

exports.deleteReport = (async (req,res) =>{
     let userId = req.params.id;

     await Report.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})
