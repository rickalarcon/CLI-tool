#!c:/progra~1/nodejs/node
/*
Notes:
1) Always add the ./ to access to file from the same directory
2) To export class or function use:
    mode.export = doTask; (for example)
3) questionAnswer() returns a Promise.. the promise is an object with the 
values that the user entered. ei . answer.NAME , answer.DOB, etc

*/
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const SunSign = require('./sunsign');
const horoscope = require('./horoscope');

// init method
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('HOROSCOPE!', {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data);
            })
        )
    );
}

const questionAnswer = () => {
    const questions = [
        {
            name: "NAME",
            type: "input",
            message: "What is your Full Name?"
        },
        {
            name: "DOB",
            type: "input",
            message: "What is your Date of Birth in (dd/mm/yyyy) format?"
        },
        {
            name: "DURATION",
            type: "list",
            message: "For which duration?",
            choices: ["Today", "Week", "Month", "Year"]
        },
        {
            name: "REPORT_TYPES",
            type: "checkbox",
            message: "What type of report would you like to generate?",
            choices: ["Text", "HTML"]
        }

    ];
    return inquirer.prompt(questions);
}



const doTask = async() => {
    // initialize the tool with some text
    init();

    // Ask Questions
    questionAnswer().then(answers => {
        // Calculate Zodiac Sun-Sign
        console.log(`${answers.name}`)
        console.log(
            chalk.yellow(
                `Calculating Zodiac Sign of ${answers.NAME} with date of birth ${answers.DOB}....`
            )
        );
        const sunSign = new SunSign().getSunSign(answers.DOB);
        console.log(
            chalk.yellow(
                `Calculated Zodiac Sign of ${answers.NAME} is, [${sunSign}]`
            )
        );

        const dataToProcess = {};
        dataToProcess['name'] = answers.NAME;
        dataToProcess['dob'] = answers.DOB;
        dataToProcess['report'] = answers.REPORT_TYPES;
        dataToProcess['sunsign'] = sunSign;
        dataToProcess['duration'] = answers.DURATION;
        
        // console.log(dataToProcess);
        // Call API to get the Horoscope based on the sunSign
        horoscope.getHoroscope(dataToProcess);
    });
};

// This line is required as we are publishing it as NPM

module.exports = doTask;





