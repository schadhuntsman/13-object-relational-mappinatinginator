const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Product.findAll({
    attributes: { exclude: ['password'] }
  })
   .then(dbproductData => res.json(dbproductData))
   .catch(err => {
      res.status(500).json(err);
    });
   });
   
 // be sure to include its associated Category and Tag data
// get one product
router.get('/:id', (req, res) => {
    Product.findOne({
      attributes: {  exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
       {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Products,
        attributes: ['id', 'product_name]', 'price', 'stock', 'category_id', 'category']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      },
      {
        model: ProductTag,
        attributes: ['id', 'product_id', 'tag_id']
      },
    ]
  })
      .then(dbproductData => {
        if(!dbproductData) {
          res.status(404).json
          ({ message: 'No product found with this id' });
        return;
      }
        res.json(dbproductData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      });
     

  router.post('/', (req, res) => {
    
      Product.create({
        id: req.body.id,
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id
      })
      .then(dbproductData => res.json(dbproductData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
      });

router.put('/:id', (req, res) => {
  Product.update(req.body, {
    indidividualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbproductData) => {
      if (!dbproductData[0]) {
        res.status(404).json({
          message: 'No product found with this id' });
          return;
        }
      res.json(dbproductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

    router.delete('/:id', (req, res) => {
      Product.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbproductData => {
        if (!dbproductData) {
          res.status(404).json({
            message:'No product found with this id' })
            return; 
          }
          res.json(dbproductData);
        })
        .catch(err);
        console.log(err);
      });
    });
    
module.exports = router;
