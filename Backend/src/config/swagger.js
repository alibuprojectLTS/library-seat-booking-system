import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Seat Booking System API',
      version: '1.0.0',
      description: 'API documentation for Library Seat Booking System',
      contact: {
        name: 'API Support',
        email: 'alibuprojectlts@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);