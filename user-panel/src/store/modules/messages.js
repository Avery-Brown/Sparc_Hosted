const state = {
    messages: [],
};

const getters = {
    getMessages: state => state.messages,

};

const actions = {
    sendMessages(context, payload) {
        firebase.database().ref('messages').push(payload)
        .then(() => {
            console.log('message sent')
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
         firebase.database().ref('messages').on('child_added', snapshot => {
            commit('setMessages', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },


};

const mutations = {
    setMessages: (context, payload) => (state.messages.push(payload)),
};


export default {
    state,
    getters,
    actions,
    mutations
}