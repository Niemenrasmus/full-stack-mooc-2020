import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from "../utils"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  console.log(req.body)
  try {
    const createdPatient = toNewPatient(req.body);
    console.log(createdPatient, "createdPatient")
    const listedPatient = patientService.addPatient(createdPatient);

    res.json(listedPatient);
  } catch(e) {
    console.log(e)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getSinglePatient(req.params.id);
  if (patient) {
    res.send(patient)
  }
  else {
    res.status(404).send("Patient not found with that id")
  }
})

router.post("/:id/entries", (req, res) => {
  try {
    console.log(req.body, "req.body")
    const patient = patientService.getSinglePatient(req.params.id);
    const entry = toNewEntry(req.body);
    if (patient && entry) {
      const addedEntry = patientService.addEntry(patient, entry);
      res.json(addedEntry);
    }
  } catch(e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("error", e.message)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;