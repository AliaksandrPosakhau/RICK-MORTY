const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');
const operationFind = require('./OperationFind');

const startEndpoint = `https://rickandmortyapi.com/api/character/`;

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

const find = new operationFind(yargs.argv,startEndpoint);
find.executeOperation();










// fetchDatabase(startEndpoint);
//
// //forming one big object to store data from all database starting from response of first endpoint
// let counter =1;
// function fetchDatabase(endpoint) {
//     return new Promise((resolve,reject)=>{
//         const hrs = axios.get(endpoint).then(response=>{
//             RESPONSE_STORAGE_ARRAY.push(response.data);
//             //sout(RESPONSE_STORAGE_ARRAY[0]);
//         });
//     });
//
//
//     // axios.get(endpoint)
//     //     .then(response => {
//     //          // sout(response.data.info.next);
//     //         while (isNextLinkAvaliable(response.data)&&counter<21) {
//     //             sout(`received endpoint ${response.data.info.next} at step ${counter}`);
//     //             RESPONSE_STORAGE_ARRAY.push(response.data);
//     //             fetchDatabase(response.data.info.next);
//     //             counter++;
//     //         }
//     //     });
//
// }
//
// // while(isNextLinkAvaliable()) {
// //
// // }
//
//
//
//
//
// //detecting is there are a link to next resource page or not
// function isNextLinkAvaliable(response) {
//     return response.info.next.startsWith('https://rickandmortyapi.com/api/character');
// }

