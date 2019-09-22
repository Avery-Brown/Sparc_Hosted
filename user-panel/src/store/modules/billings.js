const state = {
    allBillings: []
};

const getters = {
    getBillings: (state) => {
        return state.allBillings
    }
};

const actions = {
    createBill({commit}, payload) {
        firebase.database().ref('billings').push(payload).then(data => {
            const key = data.key;
            firebase.database().ref('events').child(payload.event_id).child('bills').push(key).then(() => {
                firebase.database().ref('users').child(payload.user_id).child('paid_bills').push(key).then(() => {
                    console.log("Bill Paid")
                })
            })
        })
    },

    fetchBillings({commit}) {
        commit('unsetBillings')
        firebase.database().ref('billings').on('child_added', snapshot => {
            commit('setBillings', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    }
};

const mutations = {
    setBillings: (state, payload) => (state.allBillings.push(payload)),

    unsetBillings: (state) => (state.allBillings = [])
};

export default {
    state,
    getters,
    actions,
    mutations
}