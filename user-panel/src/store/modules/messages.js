const state = {
    messages: [],
};

const getters = {
    getMessages: state => state.messages,

};

const actions = {

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