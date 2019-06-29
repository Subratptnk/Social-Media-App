
Post = new Mongo.Collection();

Meteor.methods({
    
        addPost: function(content){
          if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized', 'you are not signed in');
          }
      
          var username = Meteor.user().username;
      
          Post.insert({
            content: content,
            created: new Date(),
            username: username
          });
        },
        follow: function(post) {
          //get current user
          var user = Meteor.user();
      
          if(!user) {
            throw new Meteor.Error('not-authorized', 'you are not signed in');
          }
      
          //you can't follow yourself.
          //you can't follow someone twice
          if(user.username != post.username && user.profile.follow.indexOf(post.username) == -1) {
            Meteor.users.update(
              {_id: user._id},
              {$push: {'profile.follow': post.username}
            });
          }
        }
});
