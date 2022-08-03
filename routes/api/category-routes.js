const router = require('express').Router();
const sequelize = require('sequelize');
const { removeGlobalNodeModuleLookupPaths } = require('../../../../../AppData/Local/Programs/Microsoft VS Code/resources/app/out/bootstrap-node');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    
  })
   .then(dbcategoryData => 
    res.json(dbcategoryData)) 
    .catch(err => {
      res.status(500).json(err);
    });
   });
 
   //find one category
  router.get('/:id', (req, res) => {
    Category.findOne({
      // attributes: ['id', 'category_name'],
      where: {
        id: req.params.id
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
          model: models.Category,
          attributes: ['id',
          'category_name'],
          include: {
            model: models.Product,
            attributes:
            ['category_id', 'category']
          }            
    }]
    }
    )}
 );
  
  // find one category by its `id` value
  // be sure to include its associated Products

  // create a new category
  router.post('/', (req, res) => {
    
    Category.create(req.body) 
    .then(category => {
    if (req.body.tagIds.length) {
      const categoryData = req.body.tagIds.map((category_id) => {
        return {
          category_id: category.id,
          category_name,
        }
      })
      return ProductTag.bulkCreate(categoryData)
    }
    res.status(200).json(category)
  })
    
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  })

router.put('/:id', (req, res) => {  
    Category.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // update a category by its `id` value


router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  // delete a category by its `id` value


module.exports = router;
