const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
 try{
  const productFindAll = await Product.findAll({
     include: [
      {
        model: Category,
        attributes: [
          "id", "category_name"
        ],
        },
       {
       model: Tag,
       attributes: [
        'id','tag_name'
       ],
       },
     ],
   });
   res.status(200).json(productFindAll)
  } catch (err) {
    res.status(500).json(err);
  }
 });

// get one product
router.get('/:id', async (req, res) => {
 try{
  const productFindOne = await Product.findOne({
     where: {
      id: req.params.id
    },
      include:[
        {
        model: Category, 
      attributes: [
      'id',
      'category_name'
    ]
        },
        {
          model: Tag,
          attributes: [
            'id',
            'tag_name'
          ]
        }
      ]
    });

if (!productFindOne) {
 res.status(404).json({ message: "No product found with this id!" });

 return;
}

res.status(200).json(productFindOne)
  } catch (err) {
    res.status(500).json(err);
  }
}),

 //create product
 router.post('/', async (req, res) => {
  try{
  const createProduct = await Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id
  }

  ).then((product) => {
    if (req.body.tagIds.length) {
      const productTagArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        
        };
      });
      return ProductTag.bulkCreate(productTagArr);
    }

    res.status(200).json(product);
  })

  .then((prodTagIds) => res.status(200).json(prodTagIds))
} catch (err) {
  res.status(500).json(err);
}
});
  //update product
  router.put('/:id', async (req, res) => {  
   
    const productUpdate = await Product.update(req.body, {
         
           where: {
             id: req.params.id
           },
         }
       )
       .then((product) => {
        return ProductTag.findAll({ where: { product_id: req.params.id } });
      })
      .then((productTags) => {
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_idstag_id);
            const newProductTags = req.body.tagIds
            (newProductTags || []).filter(newProductTags.tag_id=tag_id)
             if( !productTagIds.includes(tag_id)){
            //  .filter((tag_id)
              return {
                product_id: req.params.id,
                tag_id,
              };
            };
          
            const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            return Promise.all([ ProductTag.destroy
            ({ where: {id: removeProductTag } }),
            ProductTag.bulkCreate(productTagNew)
          ])
        })
          .then((updatedProductTags) => res.json(updatedProductTags))
          .catch((err) => {
         
            res.status(400).json(err);
          })
   
    
    
     //delete product

     router.delete('/:id', async (req, res) => {
      try{
      const productDelete = await Product.destroy({
         where: {
           id: req.params.id
         },
       });
         if (!productDelete) {
           res.status(404).json({ message: "No product deleted" });
     
           return;
         }
       res.status(200).json(productDelete)
      } catch (err) {
        res.status(500).json(err);
      }
    
    })
  })
     module.exports = router;
