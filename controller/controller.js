import { json, response } from 'express';
import Person from '../model/Person.js';
import Teacher from '../model/Teacher.js';
import Student from '../model/Student.js';
import db from './db.js';

var person;

//called by GET INSERT
async function showTeacher() {
    return new Promise((register, reject) => {
        const sql = "SELECT * FROM Person, Teacher WHERE registration=ID_registration ORDER BY registration DESC";
        db.query(sql, [],
            function (err, result_colection) {
                if (err) return console.error(err.message);
                register(result_colection);
            }
        );//end of query
    });//end promise function
}
//called by GET INSERT
async function showStudent() {
    return new Promise((register, reject) => {
        const sql = "SELECT * FROM Person, Student WHERE registration=ID_registration ORDER BY registration DESC";
        db.query(sql, [],
            function (err, result_colection) {
                if (err) return console.error(err.message);
                register(result_colection);
            }
        );//end of query
    });//end promise function
}

function selectLastInsertId() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Person ORDER BY registration DESC limit 1;";
        db.query(sql, [], function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0].registration);
        });
    });
}

//called by POST INSERT - Person
function insertPerson(person) {
    const params = [
        person.getName(),
        person.getAddress(),
        person.getBirthdayDate()
    ];
    console.log("Inserting :" + params);
    let sql = "INSERT INTO Person (name, address, birthday_date) VALUES (?,?,?);";
    db.query(sql, params,
        function (err) { if (err) throw console.log("INSERT ERROR FROM = " + params + err) }
    );
}

//called by POST INSERT - Teacher
function insertTeacher(teacher, fk) {

    const params = [
        teacher.getGraduation(),
        teacher.getSalary(),
        fk
    ];
    console.log("Inserting :" + params);
    let sql = "INSERT INTO Teacher (graduation, salary, ID_registration) VALUES (?,?,?);";
    db.query(sql, params,
        function (err) { if (err) throw console.log("INSERT - (teacher-table) ERROR FROM = " + params + err) }
    );
}

//called by POST INSERT - Student
function insertStudent(student, fk) {
    const params = [
        student.getCourse(),
        student.getRegistStud(),
        fk
    ];
    console.log("Inserting :" + params);
    let sql = "INSERT INTO Student (course, registration_student, ID_registration) VALUES (?,?,?);";
    db.query(sql, params,
        function (err) { if (err) throw console.log("INSERT - (student-table) ERROR FROM = " + params) }
    );
}

//called by GET EDIT TEACHER
function selectTeacher(id_master, id_detail) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Person, Teacher";
        sql += " WHERE (registration=ID_registration)";
        sql += " and (registration=?) and (ID_teacher=?);";
        const params = [id_master, id_detail];

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result[0]);
            }
        );
    });
}

//called by GET EDIT STUDENT
function selectStudent(id_master, id_detail) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Person, Student";
        sql += " WHERE (registration=ID_registration)";
        sql += " and (registration=?) and (ID_student=?);";
        const params = [id_master, id_detail];

        db.query(sql, params,
            function (err, result, fields) {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve(result[0]);
            }
        );
    });
}
async function editPerson(person) {

    let sql = "UPDATE Person SET name= ?, address= ?, birthday_date= ? WHERE registration = ?;";
    const params = [
        person.getName(),
        person.getAddress(),
        person.getBirthdayDate(),
        person.getRegistration()
    ];
    console.log("Updating Person Table: " + params);
    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE(Person)ERROR FROM ID = " + params[3]) }
    );
}

async function editTeacher(teacher) {

    let sql = "UPDATE Teacher SET graduation= ?, salary= ? WHERE ID_teacher = ?;";
    const params = [
        teacher.getGraduation(),
        teacher.getSalary(),
        teacher.getIDteacher()
    ];
    console.log("Updating Teacher Table: " + params);
    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE(Teacher) ERROR FROM ID = " + params[3]) }
    );
}

async function editStudent(student) {

    let sql = "UPDATE Student SET course= ?, registration_student= ? WHERE ID_student = ?;";
    const params = [
        student.getCourse(),
        student.getRegistStud(),
        student.getIDstudent()
    ];
    console.log("Updating Student Table: " + params);
    db.query(sql, params,
        function (err) { if (err) throw console.log("UPDATE(Student) ERROR FROM ID = " + params[3]) }
    );
}

//called by POST DELETE
function deletePerson(id) {
    let sql = "DELETE FROM Person WHERE registration=?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("DELETE (Person)ERROR FROM ID = " + param) }
    );
}
//called by POST DELETE
function deleteStudent(id) {
    let sql = "DELETE FROM Student WHERE ID_student = ?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("'DELETE' (Student)ERROR FROM ID = " + param) }
    );
}
//called by POST DELETE
function deleteTeacher(id) {
    let sql = "DELETE FROM Teacher WHERE ID_teacher = ?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("'DELETE' (Teacher)ERROR FROM ID = " + param) }
    );
}
//called by POST DELETE
function eraseStudent(id) {
    let sql = "UPDATE Student SET course=NULL, registration_student=NULL WHERE ID_student = ?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("'DELETE' (Student)ERROR FROM ID = " + param) }
    );
}
//called by POST DELETE
function eraseTeacher(id) {
    let sql = "UPDATE Teacher SET graduation=NULL, salary=NULL WHERE ID_teacher = ?;";
    let param = parseInt(id);
    db.query(sql, param,
        function (err) { if (err) throw console.log("'DELETE' (Teacher)ERROR FROM ID = " + param) }
    );
}
export default {
    showTeacher, showStudent,
    selectLastInsertId, selectTeacher, selectStudent,
    insertPerson, insertStudent, insertTeacher,
    editPerson, editTeacher, editStudent,
    deletePerson, deleteStudent, deleteTeacher,
    eraseStudent, eraseTeacher
};