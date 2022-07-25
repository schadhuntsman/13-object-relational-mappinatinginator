const router = require('express').Router();
const sequelize = require('sequelize');
const { removeGlobalNodeModuleLookupPaths } = require('../../../../../../AppData/Local/Programs/Microsoft VS Code/resources/app/out/bootstrap-node');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Product.findAll()
   .then(dbcategoryData => {
    (dbcategoryData)) 
    .catch(err => {
      res.status(500).json(err);
    });
   });



  .then(dbcategoryData)
  router.get('/:id', (req, res) => {
    Category.findOne({
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
          'category_name',
          include: {
            model: models.Product,
            attributes:
            ['category_id', 'category']
          }            
      ] 
    }
    });
  });
  // find one category by its `id` value
  // be sure to include its associated Products

  // create a new category
router.Category('/', (req, res) => {
  Category.create({
    title: req.body.title,
    category_url: req.body.category_url,
    user_id: req.body.user_id
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.put('/:id', (req, res) => {
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
});

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
