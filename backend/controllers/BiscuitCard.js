const moment = require('moment')
const Cart = require("../models/Cart")

//.Add new biscuite card
const AddBiscuitCard = async(req,res) => {
    
    const {resturant,price,dish,rating,review,image,qnty} = req.body;

    if(!resturant || !price || !dish || !rating || !review || !image){
        res.status(401).json("All inputs are required")
    }

    try{

        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const biscuitcard = new Cart({
            resturant,price,dish,rating,review,qnty,image,datecreated
        })
        await biscuitcard.save();
        res.status(200).json(biscuitcard)

    }catch(error){
        res.status(401).json(error);
        console.log("catch bloack error");
    }

}

//get all biscut
const getAllBiscuitCard = async(req,res) => {

    try{

        const biscuitcard = await Cart.find();
        res.status(200).json(biscuitcard)

    }catch(error){
        res.status(401).json(error);
    }
}

//get single biscuit
const SingleBiscuitCard = async (req, res) => {

    const { id } = req.params;
    let singlebiscuit

    try {
        singlebiscuit = await Cart.findOne({ _id: id });
        res.status(200).json(singlebiscuit)

    } catch (error) {

        res.status(401).json(error)
    }

}

//update biscut 
const UpdateBiscutCard = async (req, res) => {
    const { id } = req.params;

    const {resturant,price,dish,rating,review,image,qnty} = req.body;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {

        const updatebiscuitcard = await Cart.findByIdAndUpdate({ _id: id }, {

            resturant,price,dish,rating,review,qnty,image,dateUpdated
        }, {
            new: true
        })
        await updatebiscuitcard.save()
        res.status(200).json(updatebiscuitcard);

    } catch (error) {

        res.status(401).json(error)
    }


}


//delete biscuit
const DeleteBiscuit = async (req, res) => {

    const { id } = req.params
    let deletebiscuit
    try {

        deletebiscuit = await Cart.findByIdAndDelete({ _id: id })
        //res.status(200).json(deletesupplier)

    } catch (error) {

        res.status(401).json(error)

    }
    if (!deletebiscuit) {
        return res.status(500).json({ message: "Something went Wrong" });
    }

    return res.status(200).json({ message: "Item Deleted Successfully" });

}

module.exports = {
    AddBiscuitCard,
    getAllBiscuitCard,
    SingleBiscuitCard,
    UpdateBiscutCard,
    DeleteBiscuit
  };
  