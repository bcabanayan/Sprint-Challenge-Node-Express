// dependencies

const actionsDb = require('./data/helpers/actionModel.js')
const express = require('express');

// define router

const router = express.Router();

// respond with full array of actions

router.get('/', (req, res) => {
    actionsDb.get()
        .then(actions => {
            res
                .json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: `The actions' information could not be retrieved.`});
        });
});

// respond with individual action
 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionsDb.get(id)
        .then(action => {
            if (action) {
                res.json(action);
            }
            else {
                res
                    .status(404)
                    .json({ message: 'The action you requested does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: `The action's information could not be retrieved.`});
        });
});

// export router

module.exports = router;