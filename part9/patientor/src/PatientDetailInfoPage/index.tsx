import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient, addEntry } from '../state';

import { Patient, Entry, Diagnosis, HealthCheckEntryNoId } from '../types';

import { Container } from 'semantic-ui-react';
import { EntryForm } from "./EntryForm";

const PatientDetailInfoPage = () => {
    const { id } = useParams<{ id: string}>();
    const [{ patientsList }, dispatch] = useStateValue();   

    const [{ diagnosisList }] = useStateValue();

    console.log(diagnosisList, "diagnosisList");

    React.useEffect(() => {
        const getPatient = async () => {
            try {
                if (id) {
                const {data: patient} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`,
                );
                dispatch(setPatient(patient));
                }
            } 
            catch(error) {
                console.log(error);
            }
        };
        
        if (id && !Object.keys(patientsList).includes(id)) {
            void getPatient();
        }
                    
   }, [dispatch]);

   const submitNewEntry = async (values: HealthCheckEntryNoId) => {
       const entry = {
           ...values,
           type: "HealthCheck"
       };
       
     try {
      const { data: addedEntry } = await axios.post<Patient>(
        /*eslint-disable */
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
       dispatch(addEntry(addedEntry));
   } catch (e) {
    console.error(e.response.message);
   }
};

   return (
    <div>
        {Object.values(patientsList).map((patient: Patient) => {
            if (patient.id === id) {
                return (
                    <Container text key = {patient.id}>
                        <h2>{patient.name}</h2>
                        <div>{patient.ssn}</div>
                        <div>{patient.occupation}</div>
                        <h3>Entries</h3>
                        {patient.entries?.map((entry: Entry) =>{
                            return (
                                <div key = {entry.id}>
                                 <p>{entry.description}</p>
                                    <div>
                                    {entry.diagnosisCodes?.map((diagnosisCode: string) => {
                                        return (
                                        <p key = {diagnosisCode}> 
                                            <b>{diagnosisCode}</b>
                                            {diagnosisList?.filter((diagnose: Diagnosis) => {
                                                return diagnose.code === diagnosisCode;
                                            }).map((item: Diagnosis) =>
                                            <span key={item.code}>: {item.name}</span>
                                            )
                                            }
                                        </p>
                                        );
                                    })}
                                    </div>
                                </div>
                            );
                        })}
                        <EntryForm onSubmit = {submitNewEntry}/>
                    </Container>
                );
            }
        })}
    </div>
    );
};
 
export default PatientDetailInfoPage;