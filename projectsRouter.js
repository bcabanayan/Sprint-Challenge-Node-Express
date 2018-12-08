// dependencies

const projectsDb = require('./data/helpers/projectModel.js')
const express = require('express');

// define router

const router = express.Router();

// respond with full array of projects

router.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => {
            res
                .json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: `The projects' information could not be retrieved.`});
        })
});

// respond with individual project
 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectsDb.get(id)
        .then(project => {
            if (project) {
                res.json(project);
            }
            else {
                res
                    .status(404)
                    .json({ message: 'The project you requested does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: `The project's information could not be retrieved.`});
        });
});

// insert new project into project database

router.post('/', (req, res) => {
    const newProject = req.body;
    if (newProject.name && newProject.description) {
        projectsDb.insert(newProject)
            .then(addedProject => {
                res
                    .status(201)
                    .json(addedProject);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: 'There was an error saving the new project.'})
            });
    }
    else {
        res
            .status(400)
            .json({ message: 'Please provide the name and description of the new project.'})
    };
});

// export router

module.exports = router;