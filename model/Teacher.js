class Teacher {
    ID_teacher = 0;
    graduation = '';
    salary = 0;
    ID_registration = 0;

    constructor(ID_teacher, graduation, salary, ID_regist) {
        this.ID_teacher = ID_teacher;
        this.graduation = graduation;
        this.salary = salary;
        this.ID_registration = ID_regist;
    }
    getIDteacher() {
        return this.ID_teacher;
    }
    setIDteacher(value) {
        this.ID_teacher = value;
    }
    getGraduation() {
        return this.graduation;
    }
    setGraduation(value) {
        this.graduation = value;
    }
    getSalary() {
        return this.salary;
    }
    setSalary(value) {
        this.salary = value;
    }
    getIDregistration() {
        return this.ID_registration;
    }
    setIDregistration(value) {
        this.ID_registration = value;
    }
};

export default Teacher;