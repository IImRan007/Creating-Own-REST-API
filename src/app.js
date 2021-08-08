const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/connection");
const Student = require("./models/students");

app.use(express.json());

// Creating student collection using promises
// app.post("/students", (req, res) => {
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// Creating student collection
// Using Async/Await
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Reading the data of registered students
app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Getting the individual student data using id
// app.get("/students/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const studentData = await Student.findById({ _id });
//     if (!studentData) {
//       return res.status(400).send();
//     } else {
//       res.status(200).send(studentData);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// finding data by name
app.get("/students/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const studentData = await Student.find({ name });
    if (!studentData) {
      return res.status(400).send();
    } else {
      res.status(200).send(studentData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Updating students data using id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateStudents);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Deleting students data using id
app.delete("/students:/id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete({ _id });
    if (!deleteStudent) {
      return res.status(400).send();
    } else {
      res.status(200).send(deleteStudent);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
