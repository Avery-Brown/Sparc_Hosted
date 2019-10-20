import Vuex from 'vuex';
import Vue from 'vue';
import tags from './modules/tags';
import user from './modules/user';
import events from './modules/events';
import ratings from './modules/ratings';
import billings from './modules/billings';
import messages from './modules/messages';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        tags,
        user,
        events,
        ratings,
        billings,
        messages
    }
});