const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const lodash = require('lodash');
const firstEndpoint = 'https://rickandmortyapi.com/api/character/';
const dataFilePath='./responses.json';

// node app find --id=101 --name="E. Coli" --status="Dead" --species="Disease" --type="" --gender="unknown" --location="Anatomy Park"

yargs.command({
    command: 'find',
    describe: 'finding all matches according to additional parameters',
    builder: {
        id: {
            describe: 'Character ID - f.e. any number',
            alias:'id'
        },
        name: {
            describe: 'Characters name, f.e. Rick Sanchez',
            alias: 'n'
        },
        status: {
            describe: 'Characters status - Dead or Alive',
            alias: 's'
        },
        species: {
            describe: 'Characters species, - f.e. Human',
            alias: 'sp'
        },
        type: {
            describe: 'Characters type',
            alias: 't'
        },
        gender: {
            describe: 'Characters gender, f.e. Male or Female',
            alias: 'g'
        },
        location: {
            describe: 'Characters location name, f. e. as option - Earth',
            alias: 'l'
        }
    }
});

let requestArray = yargs.argv;
const arrayOfAcceptableArgs = ['id','name', 'status', 'species', 'type', 'gender', 'location'];
let formedArray = Object.entries(requestArray).filter(argument => arrayOfAcceptableArgs.includes(argument[0]));

getDatabase();
operationFind(yargs.argv,dataFilePath);

async function getDatabase() {
    let promisesArray = [];
    let resultsArray = [];
    const firstRequestData = await axios.get(firstEndpoint);
    const amountOfPages = firstRequestData.data.info.pages;
    resultsArray.push(firstRequestData.data.results);

    for (let i=2;i<amountOfPages;++i){
        promisesArray.push(axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`));
    }

    let responses = await Promise.all(promisesArray);

    responses.forEach((item,index)=>{
        return responses[index]=item.data.results;
    });

    responses = lodash.flatten(responses);
    resultsArray = [...resultsArray,... responses];
    resultsArray = lodash.flatten(resultsArray);
    return fs.writeFileSync('responses.json',JSON.stringify(resultsArray,null,'\t','utf8'));
}

async function getReportData(reportPath){
    return new Promise(resolve => {
        resolve(fs.readFileSync(dataFilePath));
    });
}

async function operationFind(operationsArray, dataFilePath) {

    const currentData = await getReportData(dataFilePath);
    const jsonParsedData = JSON.parse(currentData.toString());
    const filteredList = jsonParsedData.filter(character => {
        return characterMatchesParams(character, formedArray);
    });

    sout(filteredList);
    return fs.writeFileSync('report.json',JSON.stringify(filteredList,null,'\t','utf8'));
}

function characterMatchesParams(characterObject, params) {
    let matchesParameter= true;
    params.forEach(parameter => {
        if (characterObject[parameter[0]] !== parameter[1]) {
            matchesParameter = false;
        }
    });
    return matchesParameter;
}


// short java-styled function to operate console log output shorter and more convenient
function sout(arg){
    console.log(arg);
}

