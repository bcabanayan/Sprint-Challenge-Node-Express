// dependencies

const actionsDb = require('./data/helpers/actionModel.js')
const projectsDb = require('./data/helpers/projectModel.js')

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

// insert new project into project database

router.post('/', (req, res) => {
    const newAction = req.body;
    // COMMENTED OUT CODE TO CHECK FOR VALID PROJECT ID
    // const projectId = req.body.project_id;
    // projectsDb.get(projectId)
    //     .then(project => {
            // if (project) {
                if (newAction.description && newAction.notes) {
                    actionsDb.insert(newAction)
                        .then(addedAction => {
                            res
                                .status(201)
                                .json(addedAction);
                        })
                        .catch(err => {
                            res
                                .status(500)
                                .json({ message: 'There was an error saving the new action.'})
                        });
                }
                else {
                    res
                        .status(400)
                        .json({ message: 'Please provide the description and notes for the new action.'})
                };
            // }
        //     else {
        //         res
        //             .status(400)
        //             .json({ message: 'The project ID is invalid.'})
        //     }
        // }) 
});

router.put('/:id', (req, res) => {
    const updatedAction = req.body;
    const { id } = req.params;
    if (updatedAction.description && updatedAction.notes) {
        actionsDb.update(id, updatedAction)
            .then(action => {
                if (action) {
                    res
                        .json({action});
                }
                else {
                    res
                        .status(404)
                        .json({ message: 'The action with the specified ID does not exist.'});
                };
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: `The action's information could not be updated.`});
            });
    }
    else {
        res
            .status(400)
            .json({ message: `Please provide the action's updated description and notes.`});
    };
});

// export router

module.exports = router;