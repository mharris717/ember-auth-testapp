var post = DS.Model.extend({
  body: DS.attr('string'),
  title: DS.attr('string')
});

post.FIXTURES = [
  {id: 1, title: "FUN"},
  {id: 2, title: "More Fun!"},
  {id: 3, title: "Even More Fun!"},
  {id: 4, title: "Getting Bored"},
  {id: 5, title: "Giving Up"}

];

export default post;