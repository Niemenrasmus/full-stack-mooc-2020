"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPublicPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    console.log(patient, "patient in backend");
    const createdPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients.push(createdPatient);
    return createdPatient;
};
const getSinglePatient = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
const addEntry = (patient, entry) => {
    const createdEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    patient.entries.push(createdEntry);
    return createdEntry;
};
exports.default = {
    getPublicPatients,
    addPatient,
    getSinglePatient,
    addEntry
};
