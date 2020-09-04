const express = require("express");

const router = express.Router();

const projectDb = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");




router.post("/", (req, res) => {
    const newProject = req.body;
    console.log(newProject)

    projectDb.insert(newProject)
        .then((project) => {
            projectDb.get()
                .then((projects) => {
                    res.status(201).json(projects);
                });
        })
        .catch((err) => {
            res.status(500).json({ error: "New project could not be posted." });
        });
});



router.post("/:id/actions", (req, res) => {
    const newAction = req.body;

    actionDb.insert(newAction)
        .then((action) => {
            actionDb.get()
                .then((actions) => {
                    res.status(201).json(actions)
                })
        })
        .catch((err) => {
            res.status(500).json({ error: "New action could not be posted." });
        });
});



router.get("/", async (req, res) => {
    try {
        await projectDb.get()
            .then((resp) => {
                projects = resp;
            });
        res.status(200).json(projects);
    } catch {
        res.status(500).json({ message: "projects failed to load." });
    }
});



router.get("/:id", async (req, res) => {
    try {
        await projectDb.get(req.params.id)
            .then((resp) => {
                project = resp
        });
        res.status(200).json(project);
    } catch {
        res.status(500).json({ message: "project failed to load." });
    }
});



router.get("/:id/actions", (req, res) => {

    actionDb.get()
        .then(actions => {
            filteredActions = actions.filter((action) => Number(action.project_id) === Number(req.params.id))
            res.status(200).json(filteredActions)
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't load posts for the specific user." });
        })

});


router.put("/:id", (req, res) => {

    const updatedProject = req.body

    projectDb.update(req.params.id, updatedProject)
        .then(count => {
            console.log(`${count} user(s) updated.`)
            projectDb.get()
                .then(projects => {
                    res.status(200).json(projects)
                })  
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The project could not be changed." })
        })

});


router.delete("/:id", (req, res) => {

    projectDb.remove(req.params.id)
        .then(number => {
            console.log(`${number} item(s) deleted.`)
            projectDb.get()
                .then(updatedProjectList => {
                    res.status(200).json(updatedProjectList)
                })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user could not be removed." })
        })

});



module.exports = router;
