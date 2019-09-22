const state = {
    allRatings: [],
    ratingDone: null,
};

const getters = {
    allRatings: (state) => state.allRatings,

    ratingDone: (state) => state.ratingDone
};

const actions = {
    saveRating({commit}, payload) {
        firebase.database().ref('ratings').push(payload).then(rating => {
            const key = rating.key;
            firebase.database().ref('events').child(payload.event_id).child('event_ratings').push(key)
            .then(() => {
                firebase.database().ref('users').child(payload.host_id).child('event_ratings').push(key)
                .then(() => {
                    firebase.database().ref('users').child(payload.user_id).child('events_rated').push(payload.event_id)
                    .then(() => {
                        commit('ratingStatus', 'success')
                        console.log('Rating Submitted Successfully')
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    },

    fetchRatings({commit}) {
        commit('unsetRatings')
        firebase.database().ref('ratings').on('child_added', snapshot => {
            commit('setRatings', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    }
};

const mutations = {
    setRatings: (state, payload) => (state.allRatings.push(payload)),
    unsetRatings: (state) => (state.allRatings = []),

    ratingStatus: (state, payload) => (state.ratingDone = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}

