class Student {
    ID_student = 0;
    course = '';
    registration_student = 0;
    ID_registration = 0;

    constructor(ID_student, course, regist_stud, ID_regist) {
        this.ID_student = ID_student;
        this.course = course;
        this.registration_student = regist_stud;
        this.ID_registration = ID_regist;
    }
    getIDstudent() {
        return this.ID_student;
    }
    setIDstudent(value) {
        this.ID_student = value;
    }
    getCourse() {
        return this.course;
    }
    setCourse(value) {
        this.course = value;
    }
    getRegistStud() {
        return this.registration_student;
    }
    setRegistStud(value) {
        this.registration_student = value;
    }
    getIDregistration() {
        return this.ID_registration;
    }
    setIDregistration(value) {
        this.ID_registration = value;
    }
};

export default Student;