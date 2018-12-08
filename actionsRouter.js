// dependencies

const actionsDb = require('./data/helpers/actionModel.js')
const express = require('express');

// define router

const router = express.Router();

// respond with full array of projects

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

// export router

module.exports = router;