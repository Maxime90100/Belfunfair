import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/users/login.vue";

import prestataireHome from "@/views/prestataires/prestataireHome.vue";
import prestataireManeges from "@/views/prestataires/manege/prestataireManeges.vue";
import prestataireStands from "@/views/prestataires/stand/prestataireStands.vue";
import prestataireManegeAdd from "@/views/prestataires/manege/prestataireManegeAdd.vue";
import prestataireStandAdd from "@/views/prestataires/stand/prestataireStandAdd.vue";
import prestataireManegeUpdate from "@/views/prestataires/manege/prestataireManegeUpdate.vue";
import prestataireStandUpdate from "@/views/prestataires/stand/prestataireStandUpdate.vue";
import prestataireManegeSignup from "@/views/prestataires/manege/prestataireManegeSignup.vue";
import prestataireStandSignup from "@/views/prestataires/stand/prestataireStandSignup.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes:[
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path:"/login",
            name:"Login",
            component: Login
        },
        {
            path: "/prestataire",
            name: "prestataireHome",
            component: prestataireHome
        },
        {
            path: "/prestataire/maneges",
            name: "prestataireManeges",
            component: prestataireManeges
        },
        {
            path: "/prestataire/stands",
            name: "prestataireStands",
            component: prestataireStands
        },
        {
            path: "/prestataire/maneges/add",
            name: "prestataireManegeAdd",
            component: prestataireManegeAdd
        },
        {
            path: "/prestataire/stands/add",
            name: "prestataireStandAdd",
            component: prestataireStandAdd
        },
        {
            path: "/prestataire/maneges/:id",
            name: "prestataireManegeUpdate",
            component: prestataireManegeUpdate
        },
        {
            path: "/prestataire/stands/:id",
            name: "prestataireStandUpdate",
            component: prestataireStandUpdate
        },
        {
            path: "/prestataire/maneges/:id/signup",
            name: "prestataireManegeSignup",
            component: prestataireManegeSignup
        },
        {
            path: "/prestataire/stands/:id/signup",
            name: "prestataireStandSignup",
            component: prestataireStandSignup
        }
    ]
})