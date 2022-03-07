interface ExerciseInformation {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
  



export const calculateExercises = (exercises: Array<number>, target: number): ExerciseInformation => {
    var totalDays = exercises.length
    var trainingDays = exercises.filter(v => v !==0).length;
    var trainingHours = exercises.reduce((partialSum, v) => partialSum + v, 0)
    if (trainingHours/trainingDays > target) {
        var rating = 3;
        var desc = "You reached your exercise goal. Well done!"
    }
    else if (trainingHours/trainingDays > target*2/3) {
        var rating = 2;
        var desc = "You can still add more exercise into your routine";
    }
    else {
        var rating = 1;
        var desc = "Try to find some time for exercising even though you are not able to fit in long workouts";
    }
    
    var returnValue = {
        periodLength: totalDays,
        trainingDays: trainingDays,
        success: trainingHours/totalDays >= target,
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: trainingHours / totalDays
    } 
    return returnValue
}   

var target = Number(process.argv[2]);
var exercises = process.argv.slice(3, process.argv.length).map(Number);
console.log(target, exercises);
console.log(calculateExercises(exercises, target));