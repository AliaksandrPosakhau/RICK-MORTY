const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');

const startEndpoint = `https://rickandmortyapi.com/api/character/`;

let RESPONSE_STORAGE_ARRAY =[];

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

sout(yargs.argv);

getDatabase(startEndpoint);

//forming one big object to store data from all database starting from response of first endpoint
let counter =1;
function getDatabase(endpoint) {
    axios.get(endpoint)
        .then(response => {
             // sout(response.data.info.next);
            while (isNextLinkAvaliable(response.data)&&counter<21) {
                sout(`received endpoint ${response.data.info.next} at step ${counter}`);
                RESPONSE_STORAGE_ARRAY.push(response.data);
                getDatabase(response.data.info.next);
                counter++;
            }
        });
}

//detecting is there are a link to next resource page or not
function isNextLinkAvaliable(response) {
    return response.info.next.startsWith('https://rickandmortyapi.com/api/character');
}

// short java-styled function to operate console log output shorter and more convenient
function sout(arg) {
    console.log(arg);
}