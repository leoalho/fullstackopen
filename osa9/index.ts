import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});