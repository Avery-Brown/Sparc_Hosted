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
        if(payload.rawfile==null){
        firebase.database().ref('messages').push(payload)
        .then(() => {
        })
        .catch(err => console.log(err.message));
    }
    else{
        let customkey = firebase.database().ref('messages').push().getKey()
        let ext = payload.rawfile.name.slice(payload.rawfile.name.lastIndexOf('.'))

        firebase.storage().ref('message_attachements/' + customkey + ext.toLowerCase()).put(payload.rawfile)
                .then((filedata) => {
                    filedata.ref.getDownloadURL()
                        .then((URL) => {
                            console.log("uploaded")
                            firebase.database().ref('messages').push({
                                type: 'file',
                                file_url: URL,
                                date:payload.date,
                                message:payload.message,
                                receiver_id:payload.receiver_id,
                                sender_id:payload.sender_id
                            })
                            .then(()=>{
                                console.log("inserted")
                            })
                            .catch(error=>(console.log(error.message)))

                        })
                    })
                .catch(error => console.log(error.message))
    }
         
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
    fetchMessages({commit,rootState}) {
         firebase.database().ref('messages').on('child_added', snapshot => {
            let user=JSON.parse(localStorage.getItem('loggedUser'))
            let date=moment().format('LT')+" | "+moment().format('D MMM') ;
            if(date==snapshot.val().date){
                if(user.id==snapshot.val().receiver_id) {
                   let sender_user=rootState.user.allUsers.find(item=>item.id==snapshot.val().sender_id)
                    commit('setNotifications',{message:sender_user.first_name+' : '+snapshot.val().message,type:"success"})
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