import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const weight: number = parseInt(String(req.query.weight));
    const height: number = parseInt(String(req.query.height));
    const error = "Malformatted parameters";

    if (!height || !weight){
        res.json({error}); 
    }else{
        const bmi: string = calculateBmi(height,weight);
        res.json({weight, height, bmi});
    }
});

app.post('/exercises', (req, res) => {
    const daily_exercises: number[] = req.body.daily_exercises
    console.log(daily_exercises)
    const target: number = req.body.target
    let error: string

    if (!daily_exercises || !target){
        error = "Parameters missing"
        res.json(error)
    }else try{
        res.json(calculateExercises(daily_exercises, target))
    }catch{
        error = "Malformatted parameters"
        res.json(error)
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});