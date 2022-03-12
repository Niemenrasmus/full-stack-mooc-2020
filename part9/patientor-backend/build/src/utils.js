"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isDate = (dateOfBirth) => {
    return Boolean(Date.parse(dateOfBirth));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error(`Incorrect ${JSON.stringify(ssn)}`);
    }
    return ssn;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
};
const toNewPatient = (object) => {
    const newPatient = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
    };
    return newPatient;
};
exports.default = toNewPatient;
