// Initializes the `contact` service on path `/contact`
const { Contact } = require('./contact.class');
const createModel = require('../../models/contact.model');
const hooks = require('./contact.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contact', new Contact(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contact');

  service.hooks(hooks);
};
