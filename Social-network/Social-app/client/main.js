import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';


//account config

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  


import './main.html';
Template.postsList.helpers({
    posts: function(){
        return Post.find({}, {sort: {created: -1}});
      }
    
});

Template.postsList.events({
'click.follow-link': function()
{
    event.preventDefault();

    Meteor.call('Follow',this)
}
});

Template.postForm.events({
    'submit form': function(){
      event.preventDefault();
      var content = document.getElementById('content').value;

     //call method
     Meteor.call('addPost', content);

      event.target.reset();
    }
  });

  Template.profileArea.helpers({
    following: function(){
      var user = Meteor.user();
      return user.profile.follow;
    }
  });
  
