class Person {
    registration = 0;
    name = '';
    address = '';
    birthday_date = '';

    constructor(registration, name, address, birthday_date) {
        this.registration = registration;
        this.name = name;
        this.address = address;
        this.birthday_date = birthday_date;
    }

    getRegistration() {
        return this.registration;
    }
    setRegistration(value) {
        this.registration = value;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAddress() {
        return this.address;
    }
    setAddress(value) {
        this.address = value;
    }
    getBirthdayDate() {
        return this.birthday_date;
    }
    setBirthdayDate(value) {
        this.birthday_date = value;
    }
};

export default Person;
