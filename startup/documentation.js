const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Symphonia',
        description: 'Symphonia app Restful API documentation',
        contact: {
          name: 'Symphonia Backend Team'
        },
        servers: [`http://localhost:${process.env.PORT}`]
      }
    },
    apis: ['./routes/*.js']
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
