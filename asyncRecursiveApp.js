const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');
const operationFind = require('./OperationFind');
const request = require('request');

const startEndpoint = `https://rickandmortyapi.com/api/character/`;
let BASE_ARRAY=[];

// node app find -id=15464 -n="Rick" -s="Alive" -sp="Human" -t="Unknown" -g="Male" -l="Earth"

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

//OPERATION DECK
fetchPage(startEndpoint).then(printArray);


//SERVICE --------------------------------------------

//returns list of values received by current endpoint
async function getPage(arg_endpoint){
    let parameter = '';
    return new Promise(function (resolve) {
        request({ url: arg_endpoint, json: true }, (error, response) => {
            resolve(parameter = response.body);
            console.log(response.body.info.next);
        });
    });
}

async function fetchPage(currentEndpoint) {
    let currentPage = await getPage(currentEndpoint);
    BASE_ARRAY.push(currentPage);
    if(isNextLinkAvaliable(currentPage.info.next)){
        await fetchPage(currentPage.info.next);
    }
}

function printArray() {
    sout(BASE_ARRAY);
}

//detecting is there are a link to next resource page or not
function isNextLinkAvaliable(parameter) {
    return parameter.startsWith('https://rickandmortyapi.com/api/character');
}

//good old blended java styled imprimer-en-console function
function sout(arg) {
    console.log(arg);
}
