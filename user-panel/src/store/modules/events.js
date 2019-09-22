const state = {
    events: [],
    participants: [],
    virtual_participants: [],
    participated: null,
    selectedEvent: [],
    eventCreated: null,
    charities: []
};

const getters = {
    getEvents: state => state.events,
    getParticipants: state => state.participants,
    getVirtualParticipants: state => state.virtual_participants,
    getParticipated: (state) => {
        return state.participated
    },
    getSelectedEvent: state => state.selectedEvent,

    eventCreated: state => state.eventCreated,

    charities: state => state.charities
};

const actions = {
    createEvent({commit}, payload) {
        commit('unsetEventCreated', 'failed')
        if(payload.event_image == null) {
            firebase.database().ref('events').push(payload).then(event => {
                const key = event.key;
                firebase.auth().onAuthStateChanged(user => {
                    if(user) {
                        firebase.database().ref('users').child(user.uid).child('events_hosted').push(key)
                        .then(() => {
                            console.log('Event Registered')
                            commit('setEventCreated', 'success')
                        })
                    }
                })
            }).catch(err => console.log(err.message));
        }
        else {
            var storageRef = firebase.storage().ref('event_images/'+payload.event_image.name);
            let uploadTask = storageRef.put(payload.event_image);

            uploadTask.on('state_changed', snapshot => {
            
            }, function(err){
                console.log(err.message);
            }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    payload.event_image = downloadURL;
                    console.log("After " + payload.event_image);
                }).then(() => {
                    if(payload.event_video != null) {
                        var videoRef = firebase.storage().ref('event_videos/'+payload.event_video.name);
                        let uploadVideo = videoRef.put(payload.event_video);

                        uploadVideo.on('state_changed', snapshot => {
                        }, function(err){
                            console.log(err.message);
                        }, function() {
                                uploadVideo.snapshot.ref.getDownloadURL().then(downloadURL => {
                                payload.event_video = downloadURL;
                                console.log("After " + payload.event_video);
                            }).then(() => {
                                firebase.database().ref('events').push(payload).then(event => {
                                    const key = event.key;
                                    firebase.auth().onAuthStateChanged(user => {
                                        if(user) {
                                            firebase.database().ref('users').child(user.uid).child('events_hosted').push(key)
                                            .then(() => {
                                                console.log('Event Registered')
                                                commit('setEventCreated', 'success')
                                            })
                                        }
                                    })
                                    
                                }).catch(err => console.log(err.message));
                            })
                        })
                    }
                    else {
                        firebase.database().ref('events').push(payload).then(event => {
                            const key = event.key;
                            firebase.auth().onAuthStateChanged(user => {
                                if(user) {
                                    firebase.database().ref('users').child(user.uid).child('events_hosted').push(key)
                                    .then(() => {
                                        console.log('Event Registered')
                                        commit('setEventCreated', 'success')
                                    })
                                }
                            })
                        }).catch(err => console.log(err.message));
                    }
                })
            })
        }  
    },

    async fetchEventById({commit}, eventObj) {
        commit('unSetSelectedEvent');
        await firebase.database().ref('events').child(eventObj.id).on('value', snapshot => {
            //console.log(snapshot.val())
            commit('setSelectedEvent', snapshot.val())
        })
    },

    async fetchEvents({commit}) {
        commit('unSetEvents');
        await firebase.database().ref('events').on('child_added', snapshot => {
            commit('setEvents', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },

    eventParticipant({commit}, eventObj) {
        commit('unSetSelectedEvent');
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref('events').child(eventObj.id).child('users_attending').push(user.uid)
                .then(() => {
                    firebase.database().ref('users').child(user.uid).child('events_attended').push(eventObj.id)
                    .then(() => {
                        commit('unSetSelectedEvent');
                        commit('setParticipated', 'success')
                        firebase.database().ref('events').child(eventObj.id).on('value', snapshot => {
                            commit('setSelectedEvent', snapshot.val())
                        })
                    }).catch(err => {
                        console.log(err)
                        commit('setParticipated', 'failed')
                    })
                }).catch(err => {
                    console.log(err)
                    commit('setParticipated', 'failed')
                })
            }
            else {
                commit('setParticipated', 'failed')
            }
        })
    },

    virtualParticipant({commit}, eventObj) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref('events').child(eventObj.id).child('virtual_attending').push(user.uid)
                .then(() => {
                    firebase.database().ref('users').child(user.uid).child('events_attended').push(eventObj.id)
                    .then(() => {
                        commit('unSetSelectedEvent');
                        commit('setParticipated', 'success')
                        firebase.database().ref('events').child(eventObj.id).on('value', snapshot => {
                            commit('setSelectedEvent', snapshot.val())
                        })
                    }).catch(err => {
                        console.log(err)
                        commit('setParticipated', 'failed')
                    })
                }).catch(err => {
                    console.log(err)
                    commit('setParticipated', 'failed')
                })
            }
            else {
                commit('setParticipated', 'failed')
            }
        })
    },

    fetchParticipants({commit}, eventId) {
        commit('unSetParticipants');
        firebase.database().ref('events').child(eventId.id).child('users_attending').on('child_added', snapshot => {
            commit('setParticipants', snapshot.val())
        })
    },

    fetchVirtualParticipants({commit}, eventId) {
        commit('unSetVirtualParticipants');
        firebase.database().ref('events').child(eventId.id).child('virtual_attending').on('child_added', snapshot => {
            commit('setVirtualParticipants', snapshot.val())
        })
    },

    fetchCharities({commit}) {
        commit('unsetCharities')
        firebase.database().ref('charities').on('child_added', snapshot => {
            commit('setCharities', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },

    // Delete Event
    eventDelete({commit,state}, id) {
        const event = {
            deleted: true
        }
        let upd_item=state.events.find(event_item=>event_item.id==id)
        var index = state.events.indexOf(upd_item);

        // state.events[index].deleted=true
        console.log(index)
        // console.log(state.events[index])
        commit('updateEvents',index);
        // console.log(state.events.find(event_item=>event_item.id==id))

        firebase.database().ref('events').child(id).update(event).then(() => {
            // let upd_item=state.events.find(event_item=>event_item.id==id)
            // commit('unSetEvents');
            // firebase.database().ref('events').on('child_added', snapshot => {
            //     commit('setEvents', {
            //         ...snapshot.val(),
            //         id: snapshot.key
            //     })
            // })
        })
    }
};

const mutations = {
    setEvents: (state, payload) => (state.events.push(payload)),
    unSetEvents: (state) => state.events = [],
    setSelectedEvent: (state, payload) => (state.selectedEvent.push(payload)),
    unSetSelectedEvent: state => state.selectedEvent = [],
    unSetParticipants: (state) => state.participants = [],
    setParticipants: (state, payload) => (state.participants.push(payload)),
    setParticipated: (state, payload) => {
        state.participated = payload
    },

    unsetEventCreated: (state, payload) => (state.eventCreated = payload),
    setEventCreated: (state, payload) => (state.eventCreated = payload),

    unSetVirtualParticipants: (state) => state.virtual_participants = [],
    setVirtualParticipants: (state, payload) => (state.virtual_participants.push(payload)),

    setCharities: (state, payload) => (state.charities.push(payload)),

    unsetCharities: (state) => (state.charities = []),
    updateEvents(state,index){
        state.events[index].delete=true
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}