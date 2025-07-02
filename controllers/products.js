const CustomError = require('../middleware/customError');
const Products = require('../models/product');

const getAllProductsStatics = async (req, res) => {
  const products = await Products.find({ price: { $gt: 30 } });

  res.status(200).json({
    status: 'success',
    numOfProducts: products.length,
    data: products,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': 'eq',
      '<': 'lt',
      '<=': 'lte',
    };

    const regEx = /\b(>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'ratings'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: +value };
      }
    });

    console.log(queryObject);
  }

  let result = Products.find(queryObject);

  //sort
  const sortList = sort ? sort.split(',').join(' ') : 'createdAt';
  result = result.sort(sortList);
  //fields
  if (fields) {
    const selectedFields = fields.split(',').join(' ');
    result = result.select(selectedFields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({
    status: 'success',
    numOfProducts: products.length,
    data: products,
  });
};

module.exports = { getAllProductsStatics, getAllProducts };
