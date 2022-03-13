import React from "react";
import { useFormik } from "formik";

import { HealthCheckEntryNoId } from "../types";

interface Props {
    onSubmit: (values: HealthCheckEntryNoId) => void;
  }

  const validHealthCheck = (healthCheck: any): boolean => {
    return (healthCheck === "Healthy" || 
            healthCheck === "LowRisk" ||
            healthCheck === "HighRisk" ||
            healthCheck === "CriticalRisk"
            );
  };

  const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
  };


  const validate = (values: HealthCheckEntryNoId) => {
    const errors = {description: "", specialist: "", 
    healthCheckRating: "", date: ""};
    if (!values.description || values.description == "") {
      errors.description = 'Description required';
    }
  
    if (!values.specialist || values.specialist == "") {
      errors.specialist = 'Specialist required';
    }
    
    if (!values.healthCheckRating || !validHealthCheck(values.healthCheckRating)) {
        errors.healthCheckRating = 'Choose healthCheckRating from the list';
    }

    if (!values.date || !isDate(values.date)) {
        errors.date = 'Select proper date';
    }

    return errors;
  };

export const EntryForm: React.FC<Props> = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues: {
            description: "",
            date: "",
            specialist: "",
            healthCheckRating: 0
        },
        validate,
        onSubmit: values => onSubmit(values)
    });

    return (
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <div>
        date
        <input
            id =  "date"
            name = "date"
            type = "date"
            onChange={formik.handleChange}
            value={formik.values.date}
        />
        {formik.errors.date ? <div>{formik.errors.date}</div> : null}

        </div>
        <div>
        specialist
        <input
            id =  "specialist"
            name = "specialist"
            type = "specialist"
            onChange={formik.handleChange}
            value={formik.values.specialist}
        />
        {formik.errors.specialist ? <div>{formik.errors.specialist}</div> : null}
        </div>
        <div>
        description
        <input
            id =  "description"
            name = "description"
            type = "description"
            onChange={formik.handleChange}
            value={formik.values.description}
        />
        {formik.errors.description ? <div>{formik.errors.description}</div> : null}
        </div>
        healthCheckRating
        <input list="ratings"
            id =  "healthCheckRating"
            name = "healthCheckRating"
            type = "healthCheckRating"
            onChange={formik.handleChange}
            value={formik.values.healthCheckRating}
        />
        {formik.errors.healthCheckRating ? <div>{formik.errors.healthCheckRating}</div> : null}
        <datalist id="ratings">
            <option value="Healthy">Healthy</option>
            <option value="LowRisk">Low Risk</option>
            <option value="HighRisk">High Risk</option>
            <option value="CriticalRisk">Critical Risk</option>
        </datalist>
        <button type="submit">Submit</button>
      </form>    
      );
};