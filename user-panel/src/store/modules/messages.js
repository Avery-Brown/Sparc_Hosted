import moment from  'moment'

const state = {
    messages: [],
    notification:null
};

const getters = {
    getMessages: state => state.messages,
    notification:state=>state.notification
};

const actions = {
    sendMessages(context, payload) {
        firebase.database().ref('messages').push(payload)
        .then(() => {
            console.log('message sent')
        })
        .catch(err => console.log(err.message));
         
    },
    toggleEmailNotifications({commit}, payload) {
        firebase.database().ref('users').child(payload.loggeduser_id).child('email_notifications').set(payload.flag)
            .then(()=>{
                console.log("notification updated")
            })
            .catch(err => console.log(err.message));

    },
    blockingProcess({commit,rootState}, payload) {
        if(payload.flag==true){
            let key=firebase.database().ref('users').child(payload.receiver_id).child('blocked_by').push().getKey()
            let obj={receiver_id:payload.receiver_id,key:key,blocker_id:payload.sender_id}

            firebase.database().ref('users').child(payload.receiver_id).child('blocked_by').child(key).set({blocker_id:payload.sender_id})
            .then(()=>{
                commit('burbery',obj)
            })
            .catch(err => console.log(err.message));
        }
        else{

            firebase.database().ref('users').child(payload.receiver_id).child('blocked_by').orderByChild('blocker_id').equalTo(payload.sender_id)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    //remove each child
                    firebase.database().ref('users').child(payload.receiver_id).child('blocked_by').child(childSnapshot.key).remove();

                });
            });
        }

    },
    fetchMessages({commit}) {
        // commit('setMessages');
        // firebase.database().ref('messages').on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     console.log("cameeees")
        //   }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        //   });
         firebase.database().ref('messages').on('child_added', snapshot => {
            let user=JSON.parse(localStorage.getItem('loggedUser'))
            let date=moment().format('LT')+" | "+moment().format('D MMM') ;
            if(date==snapshot.val().date){
                console.log("yehhh")
                  
                if(user.id==snapshot.val().receiver_id) {
                    console.log(snapshot.val())
                    commit('setNotifications',{message:snapshot.val().message,type:"info"})
                }

            }
            commit('setMessages', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },


};

const mutations = {
    setMessages: (context, payload) => (state.messages.push(payload)),
    setNotifications(state,payload) {
        state.notification=payload
    },
    unSetNotifications (state) {
        state.notification=null
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}