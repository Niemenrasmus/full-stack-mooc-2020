import patientData from '../../data/patients.json';

import { Patient, PatientNoSsn } from '../types';

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

export default {
  getPatients
}
