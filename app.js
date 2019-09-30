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
