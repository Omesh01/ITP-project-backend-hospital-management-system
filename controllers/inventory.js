let Inventory = require("../moduls/inventory");

exports.AddInventory = ((req,res) => {
    const inventory_id = req.body.inventory_id;
    const inventory_type = req.body.inventory_type;
    const item_name = req.body.item_name;
    const location = req.body.location;
    const update_date = req.body.update_date;
    const status = req.body.status;

    const newInventory = new Inventory({
        inventory_id,
        inventory_type,
        item_name,
        location,
        update_date,
        status
    })

    newInventory.save().then(()=>{
        res.json("Inventory Added")
    }).catch((err) => {
        console.log(err);
    })

})

exports.UpdateInventory= (async(req,res)=>{
    let userId = req.params.id;
    const {inventory_id, inventory_type, item_name, location, update_date, status} = req.body;

    const updateInventory = {
        inventory_id, 
        inventory_type, 
        item_name, 
        location, 
        update_date, 
        status
    }

    const update = await Inventory.findByIdAndUpdate(userId, updateInventory).then(() => {
        res.status(200).send({status: "Inventory Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

exports.DeleteInventory = (async (req,res) =>{
     let userId = req.params.id;

     await Inventory.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Inventory deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})

exports.GetOneInventory= (async (req,res) => {
    let userId = req.params.id;
    
    const inventory = await Inventory.findById(userId)
    .then((inven) => {
        res.json(inven);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

exports.GetInventory= ((req,res) =>{
    Inventory.find().then((inven)=>{
        res.json(inven)
    }).catch((err) =>{
        console.log(err)
    })
})
