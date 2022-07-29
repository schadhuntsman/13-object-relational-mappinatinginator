const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', (req, res) => {
  Product.findAll({
    attributes: [
    'id', 'tag_name']  
    })
   .then(dbtagData => 
    res.json(dbtagData))
    .catch(err => {
      res.status(500).json(err);
    });
  });
  //find one
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
            ['tag_name', 'tag']
          }            
    }] 
    })
  });
  
  // find one tag by its `id` value
  // be sure to include its associated Products

  // create a new tag
  router.post('/', (req, res) => {
    
    Tag.create(req.body) 
    .then(tag => {
    if (req.body.tagIds.length) {
      const dbtagData = req.body.tagIds.map((tag_name) => {
        return {
          tag_id: tag.id,
          tag_name,
        }
      })
      return dbtagData(dbtagData)
    }
    res.status(200).json(tag)
  })
    
    .then((dbtagData) => res.status(200).json(dbtagData))
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
        return tag.findAll({ where: { product_id: req.params.id } });
      })
      .then((Tags) => {
        
        const tagIds = Tags.map(({ tag_name }) => tag_name);
  
        const newTags = req.body.tagIds
          .filter((tag_name) => !tagIds.includes(tag_name))
          .map((tag_name) => {
            return {
              product_id: req.params.id,
              tag_name,
            };
          });
       
        const TagsToRemove = Tags
          .filter(({ tag_name }) => !req.body.tagIds.includes(tag_name))
          .map(({ id }) => id);
  
  
        return Promise.all([
          tag.destroy({ where: { id: TagsToRemove } }),
          tag.bulkCreate(newTags),
        ]);
      })
      .then((updatedTags) => res.json(updatedTags))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  });
  
  // update a tag by its `id` value


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
