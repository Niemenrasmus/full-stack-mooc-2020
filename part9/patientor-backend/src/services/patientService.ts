import patientData from '../../data/patients.json';

import { Patient, NewPatient, PatientNoSsn } from '../types';
import { v1 as uuid } from 'uuid'


const patients: Array<Patient> = patientData;


const getPatients = (): PatientNoSsn [] => {
  
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
  const createdPatient: Patient = {
    id: uuid(),
    ...patient,
  };
  patients.push(createdPatient);
  return createdPatient;
};


export default {
  getPatients,
  addPatient
}
