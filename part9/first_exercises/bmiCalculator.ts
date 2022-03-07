
export const calculateBmi = (height: number, weight: number) => {
    var number = weight / ((height/100)^2);
    
    if (number > 40) {
        return "Obese (Class 3)";
    }  
    
    else if (number >= 35) {
        return "Obese (Class 2)";
    }
    
    else if (number >= 30) {
        return "Obese (Class 1)";
    }
    
    else if (number >= 25) {
        return "Overweight";
    }
    
    else if (number >= 18.5) {
        return "Normal range";
    }

    else if (number >= 17) {
        return "Underweigt (Mild thinness)";
    }

    else if (number >= 16) {
        return "Underweigt (Moderate thinness)";
    }

    else {
        return "Underweigt (Severe thinness)";
    }
}

var height = Number(process.argv[2]);
var weight = Number(process.argv[3]);
console.log(height, weight);
console.log(calculateBmi(height, weight));