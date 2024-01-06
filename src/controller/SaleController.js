const SaleModel = require('../models/SaleModel');

exports.createSale = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await SaleModel.create(reqBody);
        res.status(200).json({status:"success",data:data})
    }
    catch(err){
        res.status(500).json({status:"fail",data:err})
    }
}

exports.getTotalSale = async (req, res) => {
    try{

        const totalRevenue = await SaleModel.aggregate([
            {
              $group: {
                _id: null,
                total: { $sum: { $multiply: ['$quantity', '$price'] } },
              },
            },
          ]);
      
          if (totalRevenue.length > 0) {
            res.status(200).json({ totalRevenue: totalRevenue[0].total });
            // res.json({ totalRevenue: totalRevenue[0].total });
          } else {
            res.status(200).json({ totalRevenue: 0 });
            // res.json({ totalRevenue: 0 });
          }
    }
    catch(err){
        res.status(500).json({status:"fail",data:err})
        // res.status(500).json({status:"fail",data:err})
    }
}