import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/bmi', (req, res) => {
    var weight = Number(req.query.weight);
    var height = Number(req.query.height);            
    if (!height || !weight) {
        res.send ({
            "error": "malformatted parameters"
        });
    }
    else {
        var bmi = calculateBmi(height, weight); 
        res.send({
            "weight":weight,
            "height": height,
            "bmi": bmi
        });

    }
});

app.post('/exercises', (req, res) => {
    var exercises = req.body.daily_exercises;
    console.log(req.body.daily_exercises)
    var target = Number(req.body.target);            
    console.log(exercises, target)
    
    let validExerciseParams: boolean;
    let allParamsValid: boolean;

    if (target && exercises) {
        
        if (Array.isArray(exercises)) {
            validExerciseParams = (exercises as []).some((
              e: number) => isNaN(Number(e)));
        } else {
            validExerciseParams = true;
        }
    
        allParamsValid = !validExerciseParams && !isNaN(Number(target));
    }
    else {
        allParamsValid = false
    }

    if (!exercises[0] || !target) {
        res.send ({
            error: "parameters missing"
        });
    }
    else if (!allParamsValid) {
        res.send({
          error: "malformatted parameters",
        });
    } 
    else {
        var bmi = calculateExercises(exercises, target); 
        res.send(bmi);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});