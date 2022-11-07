const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const result = File.csvToJson(filePath)
        const expected = [
            {
                "id": 123,
                "name": "Jadna Silva",
                "profession": "Javascript",
                "age": 25
            },
            {
                "id": 321,
                "name": "Xuxa da Silva",
                "profession": "Javascript Specialist",
                "age": 80
            },
            {
                "id": 231,
                "name": "Joaozinho",
                "profession": "Java Developer",
                "age": 30
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
