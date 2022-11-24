const calculateBmi = (length: number, weight: number): string => {
	const bmi: number = weight/((length/100)**2);
    switch (true){
        case bmi<16:
            return('Underweight (Severe thinness)');
        case bmi<17:
            return('Underweight (Moderate thinness)');
        case bmi<18.5:
            return('Underweight (Mild thinness)');
        case bmi<25:
            return('Normal range');
        case bmi<30:
            return('Overwight');
        case bmi<40:
            return('Obese')
        default:
            return('Morbidly Obese')
    }
}

const l: number = Number(process.argv[2])
const w: number = Number(process.argv[3])
console.log(calculateBmi(l, w));
