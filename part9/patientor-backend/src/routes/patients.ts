import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from "../utils"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const createdPatient = toNewPatient(req.body);

    const listedPatient = patientService.addPatient(createdPatient);

    res.json(listedPatient);
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send("failed to add patient");
  }
});

export default router;