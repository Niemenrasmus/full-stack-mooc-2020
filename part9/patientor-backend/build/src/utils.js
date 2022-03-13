"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.assertNever = void 0;
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
const isEntry = (entry) => {
    const healthCheck = entry.type === "HealthCheck";
    const occupationalHealthcare = entry.type === "OccupationalHealthcare";
    const hospital = entry.type === "Hospital";
    return healthCheck || occupationalHealthcare || hospital;
};
// const isArray = (Entry: unknown): Entry is Entry[] => {
//     return Array.isArray(Entry) || Entry instanceof Array;
//   };
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
const parseEntry = (entry) => {
    if (!entry || !isEntry(entry)) {
        throw new Error("Incorrect entry type");
    }
    return entry;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect Date");
    }
    return date;
};
const parseString = (string, type) => {
    if (!string || !isString(string)) {
        throw new Error("Incorrectly formatted " + type);
    }
    return string;
};
const parseDischarge = (discharge) => {
    if (!discharge)
        return discharge;
    else {
        if (!discharge.date) {
            throw new Error("Missing date for discharge");
        }
        if (!discharge.criteria) {
            throw new Error("Missing criteria for discharge");
        }
        const date = parseDate(discharge.date);
        const crit = parseString(discharge.criteria, "date");
        return { date: date, criteria: crit };
    }
};
const isHealthCheck = (healthCheck) => {
    return Object.values(types_1.HealthCheckRating).includes(healthCheck);
};
const parseHealthCheckRating = (healthCheck) => {
    if (!healthCheck || !isHealthCheck(healthCheck)) {
        throw new Error("Incorrect health check rating");
    }
};
const parseEmployerName = (employer) => {
    const employerName = parseString(employer, "employer name");
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave)
        return sickLeave;
    else {
        if (!sickLeave.date) {
            throw new Error("Missing date for sickLeave");
        }
        if (!sickLeave.criteria) {
            throw new Error("Missing criteria for sickLeave");
        }
        const startDate = parseDate(sickLeave.startDate);
        const endDate = parseDate(sickLeave.endDate);
        return { startDate, endDate };
    }
};
const toNewPatient = (object) => {
    const newPatient = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: []
    };
    return newPatient;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
const toNewEntry = (entry) => {
    const validEntry = parseEntry(entry);
    if (!validEntry)
        throw new Error("Not valid entry type");
    const validDate = parseDate(validEntry.date);
    const validDesc = parseString(validEntry.description, "description");
    const validSpecialist = parseString(validEntry.specialist, "specialist");
    if (!validDate || !validDesc || !validSpecialist)
        throw new Error("Not valid entry");
    switch (validEntry.type) {
        case "Hospital":
            return Object.assign(Object.assign({}, entry), { type: validEntry.type, discharge: parseDischarge(validEntry.discharge) });
        case "HealthCheck":
            return Object.assign(Object.assign({}, entry), { type: validEntry.type, healthCheckRating: parseHealthCheckRating(validEntry.healthCheckRating) });
        case "OccupationalHealthcare":
            return Object.assign(Object.assign({}, entry), { type: validEntry.type, employerName: parseEmployerName(validEntry.employerName), sickLeave: parseSickLeave(validEntry.sickLeave) });
        default:
            return (0, exports.assertNever)(validEntry);
    }
};
exports.toNewEntry = toNewEntry;
exports.default = toNewPatient;
