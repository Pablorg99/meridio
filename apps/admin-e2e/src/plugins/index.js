const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

const { GitHubSocialLogin } = require('cypress-social-logins').plugins;

const mongoose = require('mongoose');

const customTasks = {
  async dropDatabases() {
    await mongoose.connect(process.env.MONGO_DB_URI);
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await mongoose.connect(process.env.MONGO_EVENT_STORE_URI);
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    return null;
  },
};

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config));
  on('task', { GitHubSocialLogin: GitHubSocialLogin });
  on('task', customTasks);
};
