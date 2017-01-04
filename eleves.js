// Global access
eleves = new Mongo.Collection("eleves");

if (Meteor.isServer) {
    Meteor.startup
    (
        function () {
            // Populate once
            if (!eleves.find().count()) {
                eleves.insert({firstname: "Robin", name: "BELVEDERE"});
            }
        }
    );
}

if (Meteor.isClient) {
    Template.eleves.helpers
    ({
        all_eleves: function () {
            return eleves.find();
        }
    });
    Template.eleves.events
    (
        {
            'click #click_delete': function (e, t) {
                data = this._id;
                eleves.remove({_id: data});
                console.log(this);
            },

            // "click #delete": (e, t) ->
            //  post = Posts.findOne(t.data)
            // Posts.remove _id: post._id

            'click #submit_eleve': function (event, template) {
                event.preventDefault();
                var $name = template.find("#name");
                var $firstname = template.find("#firstname");

                if ($name.value !== "" && $firstname.value !== "") {

                    eleves.insert({name: $name.value, firstname: $firstname.value});
                }
            },

            'click #click_update': function (e, t) {
                data = event.target.previousElementSibling;
                dataname = event.target.parentNode.querySelector('#name_u').value;
                datafirstname = event.target.parentNode.querySelector('#firstname_u').value;

                console.log(dataname);

                eleves.update(
                    /*{_id: playlist_id}*/
                    {_id: this._id}
                    , {
                        $set: {name: dataname, firstname : datafirstname}
                    }
                )
            }
        }
    );
}