const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Space2Study',
      version: '1.0.0',
      description: 'Swagger REST API docs'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/utils/docs/*.docs.js']
}

module.exports = swaggerOptions
