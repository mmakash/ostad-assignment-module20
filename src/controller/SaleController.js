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
            res.status(200).json({status:"success", data: totalRevenue[0].total });
          } else {
            res.status(200).json({ totalRevenue: 0 });
          }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

exports.totalQuantityByProduct = async (req, res) => {
    try {
        const quantityByProduct = await SaleModel.aggregate([
          {
            $group: {
              _id: '$product',
              totalQuantity: { $sum: '$quantity' },
            },
          },
        ]);
    
        res.status(200).json({status:"success", data: quantityByProduct });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
exports.topProducts = async (req, res) => {
    try {
      const topProducts = await SaleModel.aggregate([
        {
          $group: {
            _id: '$product',
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
          }
        },
        {
          $sort: { totalRevenue: -1 }
        },
        {
          $limit: 5
        }
      ]);
        res.status(200).json({status:"success", data: topProducts });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.averageProductPrice = async (req, res) => {
    try {
      const averagePrice = await Sale.aggregate([
        {
          $group: {
            _id: null,
            totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } },
            totalQuantity: { $sum: '$quantity' }
          }
        },
        {
          $project: {
            _id: 0,
            averagePrice: { $divide: ['$totalPrice', '$totalQuantity'] }
          }
        }
      ]);
  
      res.status(200).json({status:"success", data: averagePrice[0].averagePrice });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
exports.RevenueByMonth = async (req, res) => {
    try {
      const revenueByMonth = await Sale.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' }
            },
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
          }
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            totalRevenue: 1
          }
        },
        {
          $sort: { year: 1, month: 1 }
        }
      ]);
  
      res.status(200).json({status:"success", data: revenueByMonth });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.HighestQuantitySold = async (req, res) => {

  try {
    const highestQuantitySold = await Sale.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            product: '$product'
          },
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          product: '$_id.product',
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({status:"success", data: highestQuantitySold[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

exports.DepartmentSalaryExpenses = async (req, res) => {
  
  try {
    const departmentSalaryExpense = await Sale.aggregate([
      {
        $group: {
          _id: '$department', 
          totalSalaryExpense: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      },
      {
        $project: {
          _id: 0,
          department: '$_id',
          totalSalaryExpense: 1
        }
      }
    ]);

    res.status(200).json({status:"success", data: departmentSalaryExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}