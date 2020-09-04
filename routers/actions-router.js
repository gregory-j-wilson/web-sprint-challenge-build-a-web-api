const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel')





router.get('/', (req, res) => {

  actionDb.get()
    .then(actions => {
        res.status(200).json(actions)
        console.log('Here are all the actions for all projects!')
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't load the actions" });
    })

});

router.get('/:id', (req, res) => {
  
  actionDb.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't load the action." });
    })
});

router.delete('/:id', (req, res) => {
    actionDb.remove(req.params.id)
      .then(number => {
        console.log(`${number} item(s) deleted.`)
        res.status(204).end()
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The action could not be removed." })
      })
});

router.put('/:id', (req, res) => {
  
  const updatedAction = req.body
  
    actionDb.update(req.params.id, updatedAction)
      .then(count => {
        console.log(`${count} user(s) updated.`)
        res.status(200).json(updatedAction)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The action could not be updated." })
      })

});




module.exports = router;

