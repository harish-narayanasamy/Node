const express = require("express");
const router =express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

router.get("/", (req, res) => {
    res.status(200).send(courses);
});

router.get("/rate", (req, res) => {
    res.status(500).send("Server Down !!!")
})

router.post("/api/courses", (req, res) => {

    /* const schema = {
         name: Joi.string().min(3).required()
     };
 const result = Joi.validate(req.body, schema)
     console.log(result)
     if (result.error) {
         res.status(400).send(result.error.details[0].message)
         return;
     }*/

    const { error } = validatecourse(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.status(201).send(course)
})


router.put('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The Course with the given ID was not found")


    }

    //res.status(200).send(course)

    //  const result = validatecourse(req.body)
    const { error } = validatecourse(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    course.name = req.body.name;
    res.status(200).send(course)
})

router.delete("/:id", (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {


        return res.status(404).send("The Course with the given ID was not found");
    }
    //Delete

    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.status(200).send(course)

})


router.get("/:id", (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {

        return res.status(404).send("The Course with the given ID was not found")
    }
    res.status(200).send(course)

})

function validatecourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema)
}


module.exports =router;