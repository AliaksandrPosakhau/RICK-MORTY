const axios = require('axios');

class OperationFind {
    constructor(operationArray, startEndpoint) {
        this.operationArray = operationArray;
        this.startEndpoint = startEndpoint;
    }

    async executeOperation() {               
        await this.sout(this.formDataArray());
    }

    getTotalPagesAmount() {
        axios.get(this.startEndpoint)
            .then(response => {
                this.sout(`There are ${response.data.info.pages} pages available in the resource`);
                return response.data.info.pages;
            });
    }

    async formDataArray() {
        let dataArray = [];
        for (let i = 1; i < await this.getTotalPagesAmount(); ++i) {
            axios.get(`${this.startEndpoint}?page=${i}`)
                .then(response => {
                    dataArray.push(response.data);
                    this.sout(promisesArray[i]);
                    return response.data;
                });
        }
    }




    // short java-styled function to operate console log output shorter and more convenient
    sout(arg) {
        console.log(arg);
    }

}

module.exports = OperationFind;
