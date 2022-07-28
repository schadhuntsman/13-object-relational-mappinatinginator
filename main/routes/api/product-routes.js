const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Product.findAll({
    attributes: { exclude: ['password'] }
  })
   .then(dbeCommerce => res.json(dbeCommerce))
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
      .then(dbeCommerce => {
        if(!dbeCommerce) {
          res.status(404).json
          ({ message: 'No product found with this id' });
        return;
      }
        res.json(dbeCommerce);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      });
     
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data


// create new product
router.post('/', (req, res) => {})

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  router.post('/', (req, res) => {
    
    Product.create(req.body) 
    .then(product => {
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        }
      })
      return ProductTag.bulkCreate(productTagIdArr)
    }
    res.status(200).json(product)
  })
    
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  })

router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
     
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);


      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
