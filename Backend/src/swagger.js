import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Library Seat Booking System API',
    description: 'API documentation for Library Seat Booking System',
    version: '1.0.0',
    contact: {
      email: 'alibuprojectlts@gmail.com'
    }
  },
  host: 'localhost:5000',
  basePath: '/api',
  schemes: ['http'],
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