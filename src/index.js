/**
 * Task Management API - Entry Point
 * @author Abdelrahman Mohamed
 */

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Task Management API running on port ${PORT}`);
});

module.exports = app;