let Order = require("../moduls/order");

exports.AddOrder = ((req,res) => {
    try{
        const newBill = new Order({
          company_name: req.body.company_name,
          brand: req.body.brand,
          model: req.body.model,
          model_number: req.body.model_number,
          quantity: req.body.quantity,
        });
  
        newBill.save().then(()=>{
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
})
