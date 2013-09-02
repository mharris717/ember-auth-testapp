function Routes() {
  // // routes/resources
  this.resource('posts', function() {
    this.route('new');
  });
  this.route("register");
}

export default Routes;
