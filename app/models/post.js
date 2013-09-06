var post = DS.Model.extend({
  body: DS.attr('string'),
  title: DS.attr('string')
});

post.FIXTURES = [
  {id: 1, title: "FUN"},
  {id: 2, title: "More Fun!"}
];

export default post;