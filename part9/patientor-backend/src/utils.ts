import {NewPatient,  Gender, EntryNoId, Discharge, HealthCheckRating, SickLeave } from "./types"


const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
  };
  
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
  };


const isEntry = (entry: any): entry is EntryNoId => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean = entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};
// const isArray = (Entry: unknown): Entry is Entry[] => {
//     return Array.isArray(Entry) || Entry instanceof Array;
//   };

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name: " + name);
    }
  
    return name;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Incorrect or missing occupation: " + occupation);
    }
  
    return occupation;
  };
  
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
  };

  const parseSsn = (ssn: any): string => {
    if (!isString(ssn)) {
      throw new Error(`Incorrect ${JSON.stringify(ssn)}`);
    }
    return ssn;
  };
  
  const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
  };
  
  const parseEntry = (entry: any): EntryNoId => {
    if (!entry || !isEntry(entry)) {
      throw new Error("Incorrect entry type");
    }
  
    return entry;
  };

  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error("Incorrect Date");
    }
    return date;
  };

  const parseString = (string: any, type: String): string => {
    if (!string || !isString(string)) {
      throw new Error("Incorrectly formatted " + type);
    }
  
    return string;
  };    

  const parseDischarge = (discharge: any): Discharge => {
    if (!discharge) return discharge;
    else {
      if (!discharge.date) {
        throw new Error("Missing date for discharge");
      }
      if (!discharge.criteria) {
        throw new Error("Missing criteria for discharge");
      }

      const date = parseDate(discharge.date)
      const crit = parseString(discharge.criteria, "date")
      
      return { date: date, criteria: crit} 
    }
  }

  const isHealthCheck = (healthCheck: any): healthCheck is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheck);
  }

  const parseHealthCheckRating = (healthCheck: any) => {
    if (!healthCheck || !isHealthCheck(healthCheck)) {
      throw new Error("Incorrect health check rating"); 
    }
  }

  const parseEmployerName = (employer: any) => {
    const employerName = parseString(employer, "employer name")
    return employerName
  }


  const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave) return sickLeave;
    else {
      if (!sickLeave.date) {
        throw new Error("Missing date for sickLeave");
      }
      if (!sickLeave.criteria) {
        throw new Error("Missing criteria for sickLeave");
      }

      const startDate = parseDate(sickLeave.startDate)
      const endDate = parseDate(sickLeave.endDate)
      
      return { startDate, endDate } 
    }
  }


const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: []
    };
  
    return newPatient;
  };

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (entry: any): EntryNoId => {
  const validEntry = parseEntry(entry);
  if (!validEntry) throw new Error("Not valid entry type");
  const validDate = parseDate(validEntry.date);
  const validDesc= parseString(validEntry.description, "description");
  const validSpecialist =  parseString(validEntry.specialist, "specialist");

  if (!validDate || !validDesc || !validSpecialist) throw new Error("Not valid entry")
  switch (validEntry.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntry.type,
        discharge: parseDischarge(validEntry.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntry.type,
        healthCheckRating: parseHealthCheckRating(
          validEntry.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntry.type,
        employerName: parseEmployerName(validEntry.employerName),
        sickLeave: parseSickLeave(validEntry.sickLeave),
      };
    default:
      return assertNever(validEntry);
    }
  };
  export default toNewPatient;