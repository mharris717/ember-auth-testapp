var PostsRoute = Ember.Route.extend({
  model: function() {
    console.debug("PostsRoute model call");
    return App.Post.find();
  }
});

export default PostsRoute;
