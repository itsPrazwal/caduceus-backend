const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api.route.js']

swaggerAutogen(outputFile, endpointsFiles);