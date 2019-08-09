<template>
  <div id="app">
    <b-navbar type="is-info" class="navbar">
        <template slot="brand">
            <b-navbar-item href="/">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                  ZOOM
            </b-navbar-item>
            <b-navbar-item tag="div">
                <div class="buttons" style="width:120px;">
                  <b-field>
                      <b-numberinput v-on:input="zoomChange" step="10" v-model="zoom" min="20" max="200" controls-position="compact" type="is-light"></b-numberinput>
                  </b-field> 
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <div class="previewer">
      <Band ref="band" v-on:zoom="zoomWheel"/>
    </div>
  </div>
</template>

<script>
import Band from './components/Band.vue'

export default {
  name: 'app',
  components: {
    Band
  },
  data(){
    return{
      zoom:50
    }
  },
  methods:{
    zoomWheel(zoom){
      this.zoom = zoom;
    },
    zoomChange(event){
      this.zoom = event;
      this.$refs.band.setZoom(event)
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #000000;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
#app{
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  left:0;
  display:grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 52px 1fr;
  grid-template-areas: "header header"
                      "body sidebar";
  & .navbar{
    grid-area:header;
  }
  & .previewer{
    grid-area:body;
    overflow:hidden;

  }
}
</style>
