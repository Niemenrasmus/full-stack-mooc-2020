import patientData from '../../data/patients';

import { Patient, NewPatient, PublicPatient, EntryNoId, Entry } from '../types';
import { v1 as uuid } from 'uuid'


const patients: Array<Patient> = patientData;


const getPublicPatients = (): PublicPatient [] => {
  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }
  )
  );
}

const addPatient = (patient: NewPatient): Patient => {
  console.log(patient, "patient in backend")
  const createdPatient: Patient = {
    id: uuid(),
    ...patient,
  };
  patients.push(createdPatient);
  return createdPatient;
};

const getSinglePatient = (id: String): Patient| undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
} 

const addEntry = (patient: Patient, entry: EntryNoId): Entry => {
  const createdEntry: Entry = {
    ...entry,
    id: uuid(),
  };
  patient.entries.push(createdEntry);
  return createdEntry;
}

export default {
  getPublicPatients,
  addPatient,
  getSinglePatient,
  addEntry
}
