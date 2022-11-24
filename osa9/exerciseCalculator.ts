interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
const calculateExercises = (hours: number[], target: number): result => {
    const periodLength: number = hours.length
    const trainingDays: number = hours.filter(day => day>0).length
    const success: boolean = trainingDays>=target
    const rating: number = target
    const ratingDescription: string = 'not too bad but could be better'
    const average: number = hours.reduce((a, b) => a + b, 0)/periodLength;
    return{periodLength, trainingDays, success, rating, ratingDescription, target, average}
}

const target = parseInt(process.argv[2])
const args = process.argv.slice(3)
const hours = args.map(e => parseInt(e))
console.log(calculateExercises(hours, target));