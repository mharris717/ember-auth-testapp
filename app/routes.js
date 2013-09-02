function Routes() {
  // // routes/resources
  this.resource('posts', function() {
    this.route('new');
  });
  EmberAuth.setupRouter(this);
}

export default Routes;
