import express, { response } from "express";
const app = express();

app.set("engine ejs", "ejs");
app.set('views', './views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import controller from '../controller/controller.js';   //Control
import Person from '../model/Person.js';                //Class Person(Model)
import Teacher from '../model/Teacher.js';
import Student from '../model/Student.js';

//localhost:3000/
//(1)GET
app.get('/', async function (request, response) {
    let collectionT = [];
    let collectionS = [];
    collectionT = await controller.showTeacher();
    collectionS = await controller.showStudent();
    response.render('index.ejs', { data_T: collectionT, data_S: collectionS }); // define dados para render da pagina index
});
//localhost:3000/insertT
//(2)GET
app.get('/insertTeacher', function (request, response) {
    response.render("insertT.ejs", { data: {} });
});
//localhost:3000/insertT
//POST
app.post('/insertTeacher', async function (request, response) {
    const person = new Person(
        0,
        request.body.name,
        request.body.address,
        request.body.birthdaydate
    );
    controller.insertPerson(person); //Send object to insertion
    let FK = await controller.selectLastInsertId();

    const teacher = new Teacher(
        0,
        request.body.detail_attribute1,
        request.body.detail_attribute2,
        0
    );
    controller.insertTeacher(teacher, FK); //Send object to insertion
    response.redirect("/");

});
//localhost:3000/insertS
//GET
app.get('/insertStudent', function (request, response) {
    response.render("insertS.ejs", { data: {} });
});
//localhost:3000/insertS
//POST
app.post('/insertStudent', async function (request, response) {
    const person = new Person(
        0,
        request.body.name,
        request.body.address,
        request.body.birthdaydate
    );
    controller.insertPerson(person); //Send object to insertion
    let FK = await controller.selectLastInsertId();

    const student = new Student(
        0,
        request.body.detail_attribute1,
        request.body.detail_attribute2,
        0
    );
    controller.insertStudent(student, FK); //Send object to insertion
    response.redirect("/");

});
//localhost:3000/insertM
//(3)GET
app.get('/insertD', function (request, response) {
    response.render("insertD.ejs", { data: {} });
});
//localhost:3000/edit/teacher/:id_m/:id_d
//(3)GET
app.get('/edit/teacher/:id_m/:id_d', async function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    try {
        var result = await controller.selectTeacher(idm, idd);
    } catch (err) {
        console.error('Erro = ', err);
    }
    response.render("editT.ejs", { data: result });
});
//localhost:3000/edit/student/:id_m/:id_d
//(4)GET
app.get('/edit/student/:id_m/:id_d', async function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    try {
        var result = await controller.selectStudent(idm, idd);
    } catch (err) {
        console.error('Erro = ', err);
    }
    response.render("editS.ejs", { data: result });
});
//localhost:3000/edit/teacher/:id_m/:id_d
//POST
app.post('/edit/teacher/:id_m/:id_d', function (request, response) {
    const person = new Person(
        request.params.id_m,
        request.body.name,
        request.body.address,
        request.body.birthdaydate
    );
    const teacher = new Teacher(
        request.params.id_d,
        request.body.graduation,
        request.body.salary,
        request.params.id_m
    );
    console.log(teacher);
    controller.editPerson(person);
    controller.editTeacher(teacher);

    response.redirect("/");
});
//localhost:3000/edit/student/:id_m/:id_d
//POST
app.post('/edit/student/:id_m/:id_d', function (request, response) {
    const person = new Person(
        request.params.id_m,
        request.body.name,
        request.body.address,
        request.body.birthdaydate
    );
    const student = new Student(
        request.params.id_d,
        request.body.course,
        request.body.registration_student,
        request.params.id_m
    );

    controller.editPerson(person);
    controller.editStudent(student);

    response.redirect("/");
});
//localhost:3000/delete/student/:id_m/:id_d
//GET
app.get('/delete/student/:id_m/:id_d', async function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    try {
        var result = await controller.selectStudent(idm, idd);
    } catch (err) {
        console.error('Erro = ', err);
    }
    response.render("deleteS.ejs", { data: result });
});
//localhost:3000/delete/teacher/:id_m/:id_d
//GET
app.get('/delete/teacher/:id_m/:id_d', async function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    try {
        var result = await controller.selectTeacher(idm, idd);
    } catch (err) {
        console.error('Erro = ', err);
    }
    response.render("deleteT.ejs", { data: result });
});
//localhost:3000/delete/teacher/:id_d
//POST
app.post('/delete/teacher/:id_d', function (request, response) {
    const idd = request.params.id_d;
    controller.eraseTeacher(idd);
    response.redirect("/");
});
//localhost:3000/delete/student/:id_d
//POST
app.post('/delete/student/:id_d', function (request, response) {
    const idd = request.params.id_d;
    controller.eraseStudent(idd);
    response.redirect("/");
});
//localhost:3000/deletePersonAll/student/:id_m/:id_d
//GET
app.get('/deletePersonAll/student/:id_m/:id_d', function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    controller.deleteStudent(idd);
    controller.deletePerson(idm);
    response.redirect("/");
});
//localhost:3000/deletePersonAll/teacher/:id_m/:id_d
//GET
app.get('/deletePersonAll/teacher/:id_m/:id_d', function (request, response) {
    const idm = request.params.id_m;
    const idd = request.params.id_d;
    controller.deleteTeacher(idd);
    controller.deletePerson(idm);
    response.redirect("/");
});


app.listen(3000, () => {
    console.log('SERVER IS ON, ACCESS: http://localhost:3000');
});



