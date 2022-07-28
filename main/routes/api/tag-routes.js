const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/', (req, res) => {
  Product.findAll()
   .then(dbtagData => 
    res.json(dbtagData))
    .catch(err => {
      res.status(500).json(err);
    });
   });




  router.get('/:id', (req, res) => {
    tag.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'tag_name',
        [
          sequelize.literal('SELECT COUNT(*) FROM ')
        ]
      ],
      include: [
        {
          model: models.tag,
          attributes: ['id',
          'tag_name'],
          include: {
            model: models.Product,
            attributes:
            ['tag_id', 'tag']
          }            
    }] 
    })
  });
  
  // find one tag by its `id` value
  // be sure to include its associated Products

  // create a new tag
router.tag('/', (req, res) => {
  tag.create({
    title: req.body.title,
    tag_url: req.body.tag_url,
    user_id: req.body.user_id
  })
    .then(dbtagData => res.json(dbtagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.put('/:id', (req, res) => {
  router.put('/:id', (req, res) => {
    tag.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbtagData => {
        if (!dbtagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
        }
        res.json(dbtagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // update a tag by its `id` value
});

router.delete('/:id', (req, res) => {
  tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbtagData => {
      if (!dbtagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbtagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
