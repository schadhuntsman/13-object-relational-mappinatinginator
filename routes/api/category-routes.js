const router = require('express').Router();
const sequelize = require('sequelize');
const { removeGlobalNodeModuleLookupPaths } = require('../../../../../AppData/Local/Programs/Microsoft VS Code/resources/app/out/bootstrap-node');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 const categoryFindAll = Category.findAll({
    include: [
      {
      model: Product,
      attributes: [
        "id",
        "price",
        "product_name",
        "stock",
        "category_id"
      ],
      },
    ],
  });
  res.status(200).json(categoryFindAll)
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
   
 
   //find one category
  router.get('/:id', async (req, res) => {
   const categoryFindOne = Category.findOne({
      // attributes: ['id', 'category_name'],
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'category_name',
        [
          sequelize.literal('SELECT COUNT(*) FROM ')
        ]
      ],
      include: [
        {
          model: Product,
          attributes: [
          'id',
          'price',
          'product_name', 
          'stock',
          'category_id'],
    },
  ],
  },
    )},
 );
 if (!categoryOne) {
  res.status(404).json({ message: "No category found with this id!" });

  return;
 }

 res.status(200).json(categoryFindOne)
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  
  // find one category by its `id` value
  // be sure to include its associated Products

  // create a new category
  router.post('/', async (req, res) => {
    
    const createCategory = Category.create({
      category_name: req.body.category_name,
    
    }) 

    if (!createCategory) {
      res.status(404).json({ message:"No new category created" });
      return;
    } 
    res.status(200).json(createCategory)
    .catch (err);
    res.status(500).json(err);
  }
  );

  //update category
router.put('/:id', async (req, res) => {  
 categoryUpdate = Category.update(req.body, {
      
        where: {
          id: req.params.id
        }
      }
    );
      // .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.status(200).json(categoryUpdate)
        .catch(err) 
          res.status(500).json(err);
      }
 
  );

 
  // delete a category by its `id` value

router.delete('/:id', async (req, res) => {
 categoryDelete = Category.destroy({
    where: {
      id: req.params.id
    },
  });
    if (!categoryDelete) {
      res.status(404).json({ message: "No category deleted" });

      return;
    }
  res.status(200).json(categoryDelete)
  .catch (err) 
    res.status(500).json(err);
  
});
  // delete a category by its `id` value


module.exports = router;
