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

// update existing project

router.put('/:id', (req, res) => {
    const updatedProject = req.body;
    const { id } = req.params;
    if (updatedProject.name && updatedProject.description) {
        projectsDb.update(id, updatedProject)
            .then(project => {
                if (project) {
                    res
                        .json({project});
                }
                else {
                    res
                        .status(404)
                        .json({ message: 'The project with the specified ID does not exist.'});
                };
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: 'The project information could not be updated.'});
            });
    }
    else {
        res
            .status(400)
            .json({ message: `Please provide the project's updated name and description.`});
    };
});

// delete existing project 

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectsDb.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: 'The project was deleted.' })
            }
            else {
                res
                    .status(404)
                    .json({ message: 'The project with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The project could not be removed.' })
        });
});

// export router

module.exports = router;