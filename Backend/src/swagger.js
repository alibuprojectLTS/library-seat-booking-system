import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Blantyre Regional Branch Library e-ticketing system API',
    description: 'API documentation for NLS e-ticketing system',
    version: '1.0.0',
    contact: {
      email: 'alibuprojectlts@gmail.com'
    }
  },
  host: 'localhost:5000',
  basePath: '/api',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your JWT token: Bearer <token>'
    }
  },
  security: [{ bearerAuth: [] }]
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);