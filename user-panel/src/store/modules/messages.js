const state = {
    messages: [],
};

const getters = {
    getMessages: state => state.messages,

};

const actions = {
    sendMessages(context, payload) {
        const database = firebase.database();
        const casesRef = database.ref('messages');
        firebase.database().ref('messages').push(payload)
        .then(() => {
            console.log('message Registered')
        })
        .catch(err => console.log(err.message));
         
    },
    fetchMessages({commit}) {
        // commit('setMessages');
        console.log("yepp")
         firebase.database().ref('messages').on('child_added', snapshot => {
            commit('setMessages', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },


};

const mutations = {
    setMessages: (state, payload) => (state.messages.push(payload))
};


export default {
    state,
    getters,
    actions,
    mutations
}