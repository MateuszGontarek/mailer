const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    [
      '/api/messages',
      '/api/get-messages',
      '/api/login',
      '/api/user-email-get',
      '/api/delete-message',
      '/api/read-message'
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );  
};