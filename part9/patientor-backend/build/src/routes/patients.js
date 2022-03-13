"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPublicPatients());
});
router.post("/", (req, res) => {
    console.log(req.body);
    try {
        const createdPatient = (0, utils_1.default)(req.body);
        console.log(createdPatient, "createdPatient");
        const listedPatient = patientService_1.default.addPatient(createdPatient);
        res.json(listedPatient);
    }
    catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e);
    }
});
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.getSinglePatient(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(404).send("Patient not found with that id");
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        console.log(req.body, "req.body");
        const patient = patientService_1.default.getSinglePatient(req.params.id);
        const entry = (0, utils_1.toNewEntry)(req.body);
        if (patient && entry) {
            const addedEntry = patientService_1.default.addEntry(patient, entry);
            res.json(addedEntry);
        }
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log("error", e.message);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
