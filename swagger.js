const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api.route.js']
const doc = {
    host: 'localhost:8000', 
    basePath: '/api/',
    securityDefinitions: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description: 'Authorization token'
      },
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ],
  };

swaggerAutogen(outputFile, endpointsFiles, doc);