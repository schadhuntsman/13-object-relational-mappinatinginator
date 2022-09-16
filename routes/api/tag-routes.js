const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

  // find all tags
  router.get('/', async (req, res) => {
    try{
    const allTag = Tag({
       include: [
        {
          model: Product,
          attributes: [
            "id",
           "price",
            "product_name",
            "stock", 
            "category_id"],
        },
      ],
    });

     res.status(200).json(allTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //find one
  router.get('/:id', async (req, res) => {
    try{
    const oneTag = tag.oneTag({
      where: {
        id:req.params.id
      },
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
        }
      ],
    });
  
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  
  // find one tag by its `id` value
  // be sure to include its associated Products

  // create a new tag
  router.post('/', async (req, res) => {
    try{
    
    const createTag = Tag.create({
    tag_name : req.body.tag_name
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  
  // update a tag by its `id` value
 
  router.put('/:id', async (req, res) => {  
    try{
    tagUpdate = Tag.update(req.body, {
         
           where: {
             id: req.params.id
           }

         }
       );
       if(!tagUpdate) {
        res.status(404).json({message: "No tag updated"})
        return;
       }
       res.status(200).json(tagUpdate);
      } catch (err) {
        res.status(500).json(err);
      }
    });
      
     //delete tag
     router.delete('/:id', async (req, res) => {
      try{
      const tagDelete = Tag.destroy({
         where: {
           id: req.params.id
         },
       });
         if (!tagDelete) {
           res.status(404).json({ message: "No tag deleted" });
     
           return;
         }
       res.status(200).json(tagDelete);
      } catch (err) {
        res.status(500).json(err);
      }
    });

module.exports = router;
