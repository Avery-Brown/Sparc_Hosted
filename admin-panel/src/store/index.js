import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import firebase from 'firebase'


export default new Vuex.Store({

    state: {
        users:[],
        tags:[],
        loggedUser:null,
        notification:null,
        events:[],
        allevents:[]
    },
    getters:{
        users: state => state.users,
        tags: state => state.tags,
        loggedUser: state => state.loggedUser,
        notification: state => state.notification,
        getUsers:state=> state.users.filter(user_item=>user_item.role==null),
        events: state => state.events,
        allevents:state=>state.allevents

    },
    actions:{
        signOutRequest(context){
            firebase.auth().signOut()
                .then(() => {
                    context.commit("unSetUser")
                })
        },
        authenticatelogin(context, user_payload) {
            localStorage.setItem("email", user_payload.email);
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log("auth state changed")
                    firebase.database().ref('users').child(user.uid)
                        .once('value', snapshot => {
                            if (snapshot.val()) {
                            context.commit('setLoggedUser', {
                                    ...snapshot.val(),
                                    id: snapshot.key})
                            }
                        })
                    }
            })
            firebase.auth().signInWithEmailAndPassword(user_payload.email, user_payload.password)
                .then(() => {
                    console.log("auth completed")

                })
                .catch(error => {
                    context.commit("setNotifications",{message:error.message,type:"error"})
                });
        },
        fetchUsers(context){
            const database = firebase.database();
            const usersRef = database.ref('users');
            usersRef.on('child_added', snapshot =>{
            context.commit('setUsers', {
                ...snapshot.val(),
                id: snapshot.key
            })
        });
        },
        fetchAllEvents(context){
            const database = firebase.database();
            const tagsRef = database.ref('events');
            tagsRef.on('child_added', snapshot =>{
            context.commit('setAllEvents', {
                ...snapshot.val(),
                id: snapshot.key
            })
        });

        },
        fetchTags(context) {
            const database = firebase.database();
            const tagsRef = database.ref('tags');
            tagsRef.on('child_added', snapshot =>{
            context.commit('setTags', {
                ...snapshot.val(),
                id: snapshot.key
            })
        });
        },
        CreateTags(context,payload){
            const database = firebase.database();
            const tagsRef = database.ref('tags');
            tagsRef.push({value:payload})
            .then(()=>{
                context.commit("setNotifications",{message:'Tags Created successfully',type:"success"})

            })
            .catch(error => {
                context.commit("setNotifications",{message:error.message,type:"error"})
            });


        },
        UpdateTags (context,payload) {
            const database = firebase.database();
            const tagsRef = database.ref('tags');
            tagsRef.child(payload.id).update({value:payload.value})
            .then(()=>{
                context.commit("setNotifications",{message:'Tags Updated successfully',type:"success"})

            })
            .catch(error => {
                context.commit("setNotifications",{message:error.message,type:"error"})
            });
             let updated_tag= context.state.tags.find(tag_item=>tag_item.id==payload.id)
             updated_tag.value=payload.value

        },
        findEvent (context,payload) {
            context.commit("unSetEvents")
            firebase.database().ref('events').child(payload.event_id).once('value').then(function(snapshot) {
                console.log(snapshot.val())
                context.commit('setEvents',{
                    ...snapshot.val(),
                    id:snapshot.key,
                    type:payload.type
                })
            }).catch(error=> {
                context.commit("setNotifications",{message:error.message,type:"error"})

            });


        }
    },
    mutations:{
        setUsers(state,payload){
             state.users.push(payload)
        },
        setTags(state,payload) {
            state.tags.push(payload)
        },
        setAllEvents(state,payload){
            state.allevents.push(payload)

        },
        setLoggedUser(state,payload) {
            localStorage.setItem("loggedUser", JSON.stringify(payload));
            console.log("auth user set")
            state.loggedUser=payload
        },
        unSetUser(state) {
            state.loggedUser=null
            localStorage.removeItem("loggedUser");

        },
        setNotifications(state,payload) {
            state.notification=payload
        },
        unSetNotifications (state) {
            state.notification=null
        },
        setEvents(state,payload) {
            state.events.push(payload)
        },
        unSetEvents (state) {
            state.events=[]
        }
        
    }
})