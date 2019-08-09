<template>
  <div id="app">
    <div class="modal-overlay">
      <div class="bigmodal">
        <FileManager />
      </div>
    </div>
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
    <div class="options">
      <div class="card background">
        <header class="card-header">
          <p class="card-header-title">
            Background
          </p>
        </header>
        <div class="card-content">
          <div class="number_span">
            <span>X</span>
            <b-numberinput size="is-small" type="is-light"  controls-position="compact" v-model="wf.Background.Image.X"></b-numberinput>
          </div>
          <div class="number_span">
            <span>Y</span>
            <b-numberinput size="is-small" type="is-light"  controls-position="compact" v-model="wf.Background.Image.Y"></b-numberinput>
          </div>
        </div>
      </div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card json">
        <header class="card-header">
          <p class="card-header-title">
            JSON
          </p>
        </header>
        <div class="card-content">
          <pre>
            {{wf}}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Band from './components/Band.vue'
import FileManager from './components/FileManager.vue'
import json from '../exemple.json'

export default {
  name: 'app',
  components: {
    Band,
    FileManager
  },
  data(){
    return{
      zoom:50,
      wf:json
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
  & .options{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas: "a b c z"
                         "d e f z"
                         "g h i z"
                         "k l m z";
    box-sizing: border-box;
    & .card{
      box-sizing: border-box;
      & .number_span{
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        &>span{
          margin-right: 10px;
          font-weight: bold;
        }
      }
    }
    & .background{
      grid-area:a;
    }
    & .json{
      grid-area: z;
      & .card-content{
        overflow:hidden;
        display: flex;
        flex-grow: 0;
        & pre{
          max-height: calc(100vh - 10px);
          display: flex;
          flex-grow: 0;
          white-space: pre;
          word-wrap: normal;
         white-space: pre-wrap;       /* css-3 */
         white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
         white-space: -pre-wrap;      /* Opera 4-6 */
         white-space: -o-pre-wrap;    /* Opera 7 */
         word-wrap: break-word;       /* Internet Explorer 5.5+ */
        }
      }
    }
  }
  .modal-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999998;
    & .bigmodal{
      width: 90%;
      height: 90%;
      position: absolute;
      top: 5%;
      left: 5%;
      background: #FFF;
      box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
      padding:16px;
    }
  }
}
</style>
