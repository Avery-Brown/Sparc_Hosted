const state = {
    tags: []
};

const getters = {
    allTags: (state) => state.tags
};

const actions = {
    fetchTags(context) {
        context.commit('unSetTags')
        const database = firebase.database();
        const tagsRef = database.ref('tags');
        tagsRef.on('child_added', snapshot =>{
            context.commit('setTags', {
                ...snapshot.val(),
                id: snapshot.key
            })
        });
    },

    updateTags({commit}, payload) {
        const tag = {
            count: payload.count
        }
        firebase.database().ref('tags').child(payload.id).update(tag).then(() => {
            // Count Updated
            console.log('Count Updated')
        })
    }
};

const mutations = {
    setTags(state,payload) {
        state.tags.push(payload)
    },
    
    unSetTags(state) {
        state.tags = []
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}