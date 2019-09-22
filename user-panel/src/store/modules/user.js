const state = {
    user: [],
    status: null,
    error: null,
    loggedUser: null,
    verified: null,
    allUsers: [],
    reset: null,

};

const getters = {
    status: (state) => {
        return state.status
    },

    user: (state) => {
        return state.user
    },

    error: (state) => {
        return state.error
    },

    loggedUser: (state) => {
        return state.loggedUser
    },
    verified: (state) => {
        return state.verified
    },
    allUsers: (state) => {
        return state.allUsers
    },
    reset: (state) => {
        return state.reset
    }

};

const actions = {
    // Register New User
    createUser({commit}, userObj) {
        
        firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(newUser => {
            firebase.auth().currentUser.sendEmailVerification()
            .then(() => console.log('Verification Email Sent')).catch(err => console.log('Not Sent ', err));
           // newUser.sendEmailVerification()
            firebase.database().ref('users').child(newUser.user.uid).set(userObj)
            .then(data => {
                
                commit('setStatus', 'success')
                commit('setError', null)
                console.log("chuk")
                
            }).catch(err => {
                commit('setStatus', 'failure')
                commit('setError', err.message)
                console.log(err)
                console.log("chuk")
            });
        }).catch(err => {
            commit('setStatus', 'failure')
            commit('setError', err.message)
            console.log(err)
            console.log("chuk")
        })
    },

    // Login and Authenticate User
    authenticateLogin(context, user_payload) {
            
            firebase.auth().signInWithEmailAndPassword(user_payload.email, user_payload.password)
                .then(() => {
                    console.log("auth completed")
                    if(firebase.auth().currentUser.emailVerified){
                        localStorage.setItem("email", user_payload.email);
                        firebase.auth().onAuthStateChanged(user => {
                            if (user) {
                                
                                firebase.database().ref('users').child(user.uid)
                                    .once('value', snapshot => {
                                        
                                    if (snapshot.val()) {
                                        context.commit('setVerified', 'yes')
                                        context.commit('setLoggedUser', {
                                                ...snapshot.val(),
                                                id: snapshot.key})
                                        }
                                    else {
                                        console.log('Nothing')
                                    }
                                })
                            }
                        })
                    }
                    else {
                        context.commit('setVerified', 'no')
                    }
                    
                })
                .catch(error => {
                    context.commit('setError', error.message)
                    console.log(error.message)
                });
    },

    signOutRequest(context){
        firebase.auth().signOut()
            .then(() => {
                console.log('User Logged Out')
                context.commit("unSetUser")
            })
    },
    finalSignoutrequest(context){
        firebase.auth().signOut()
        .then(() => {
            console.log('User Logged Out')
            context.commit("unSetFinal")
        })
    },

    passwordReset({commit}, email){
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            commit('resetPassword', 'success')
        }).catch(err => {
            commit('resetPassword', 'failed')
        })
    },

    updateUserProfile({commit}, payload) {
        
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref('users').child(user.uid).update(payload).then(() => {
                    firebase.database().ref('users').child(user.uid)
                                .once('value', snapshot => {
                                    
                                    if (snapshot.val()) {
                                        console.log('Profile Updated ');
                                        commit('unSetUser')
                                        commit('setVerified', 'yes')
                                        commit('setLoggedUser', {
                                                ...snapshot.val(),
                                                id: snapshot.key})
                                    }
                                    else {
                                        console.log('Nothing')
                                    }
                                })
                }).catch(err => console.log(err.message))
            }
        })
    },

    updateImage({commit}, payload) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                if(payload.profile_image != null) {
                    var storageRef = firebase.storage().ref('profile_images/'+payload.profile_image.name);
                    let uploadTask = storageRef.put(payload.profile_image);

                    uploadTask.on('state_changed', snapshot => {
        
                    }, function(err){
                        console.log(err.message);
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            payload.profile_image = downloadURL;
                            console.log("After " + payload.profile_image);
                        }).then(() => {
                            firebase.database().ref('users').child(user.uid).update(payload).then(() => {
                                firebase.database().ref('users').child(user.uid)
                                            .once('value', snapshot => {
                                                
                                                if (snapshot.val()) {
                                                    console.log('Profile Updated ');
                                                    commit('unSetUser')
                                                    commit('setVerified', 'yes')
                                                    commit('setLoggedUser', {
                                                            ...snapshot.val(),
                                                            id: snapshot.key})
                                                }
                                                else {
                                                    console.log('Nothing')
                                                }
                                            })
                            }).catch(err => console.log(err.message))
                        }).catch(err => console.log(err))
                    })
                }
            }
        })
    },

    updateVideo({commit}, payload) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                if(payload.profile_video != null) {
                    var storageRef = firebase.storage().ref('profile_videos/'+payload.profile_video.name);
                    let uploadTask = storageRef.put(payload.profile_video);

                    uploadTask.on('state_changed', snapshot => {
        
                    }, function(err){
                        console.log(err.message);
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            payload.profile_video = downloadURL;
                            console.log("After " + payload.profile_video);
                        }).then(() => {
                            firebase.database().ref('users').child(user.uid).update(payload).then(() => {
                                firebase.database().ref('users').child(user.uid)
                                            .once('value', snapshot => {
                                                
                                                if (snapshot.val()) {
                                                    console.log('Profile Updated ');
                                                    commit('unSetUser')
                                                    commit('setVerified', 'yes')
                                                    commit('setLoggedUser', {
                                                            ...snapshot.val(),
                                                            id: snapshot.key})
                                                }
                                                else {
                                                    console.log('Nothing')
                                                }
                                            })
                            }).catch(err => console.log(err.message))
                        }).catch(err => console.log(err))
                    })
                }
            }
        })
    },

    fetchUser({commit}) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref('users').child(user.uid).on('value', snapshot => {
                    if (snapshot.val()) {
                        console.log('User Fetched ');
                        commit('unSetUser')
                        commit('setVerified', 'yes')
                        commit('setLoggedUser', {
                                ...snapshot.val(),
                                id: snapshot.key})
                    }
                    else {
                        console.log('Nothing')
                    }
                })
            }
        })
    },

    fetchAllUsers({commit}) {
        commit('unsetAllSetUsers')
        firebase.database().ref('users').on('child_added', snapshot => {
            if(snapshot.val()) {
                commit('setAllUsers', {
                        ...snapshot.val(),
                        id: snapshot.key})
            }
        })
    },

    fetchUserById({commit}, userId){
        firebase.database().ref('users').child(userId).on('value', snapshot => {
            commit('setUser', {
                ...snapshot.val(),
                id: snapshot.key
            });
        })
    },

    saveSearch(context,search) {
        console.log(search)
        firebase.database().ref('searches').push({search}).then(() => {
            console.log("search saved")
        }).catch(err => console.log(err))
    }
};

const mutations = {
    setUser: (state, user) => (state.user = user),
    setStatus: (state, payload) => (state.status = payload),
    setError: (state, payload) => (state.error = payload),
    setVerified: (state, payload) => (state.verified = payload),
    removeUser: (state) => (state.user = null),
    setLoggedUser: (state, payload) => {
        localStorage.setItem("loggedUser", JSON.stringify(payload));
        console.log("auth user set")
        state.loggedUser=payload
    },
    unSetFinal(state){
        state.loggedUser=null
        localStorage.removeItem("loggedUser");
        window.location.reload(false);
    },
    unSetUser(state) {
        state.loggedUser=null
        localStorage.removeItem("loggedUser");
    },

    setAllUsers: (state, payload) => (state.allUsers.push(payload)),
    unsetAllSetUsers: (state) => state.allUsers = [],
    resetPassword: (state, payload) => (state.reset = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}
