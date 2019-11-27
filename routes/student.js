const router = require('express').Router();
const Student = require('../db/models/students');
const Test = require('../db/models/tests');

router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
  Student.findAll({ include: { all: true } }).then(students =>
    res.json(students)
  );
});

router.put('/:id', function (req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.post('/', async function (req, res, next) {
  try {
    let student = req.body
    let newStudent = await Student.create(student)
    if (newStudent) {
      res.send(newStudent)
    } else {
      res.send("rut roh!")
    }
  } catch (error) {
    next(error)
  }
})

// try {
//   let newStudentObject = await Student.create(req.body)
//   if (newStudentObject) {
//     res.send(newStudentObject)
//   } else {
//     res.send("student not created")
//   }


router.delete('/:id', function (req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
