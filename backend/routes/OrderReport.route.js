const pdfTemplate = require('../models/OrderReport.model')
const pdf = require('html-pdf')
const router = require("express").Router();


router.route("/create-pdf").post((req,res)=>{
    const orders = req.body;
    pdf.create(pdfTemplate(orders),{}).toFile(`${__dirname}/result.pdf`,(err)=>{
        if(err){
            console.log(err)
            
        }
        console.log('im in create pdf')
            res.send('PDF generated');
    })
})


router.route("/fetch-pdf").get((req,res)=>{
    console.log('fetch pdf')
    res.sendFile(`${__dirname}/result.pdf`)
})

module.exports = router;