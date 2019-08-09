<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="heading">File Manager</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-upload multiple v-on:input="upload" v-model="files"
                drag-drop>
              <a class="button is-light">
                  <b-icon icon="upload"></b-icon>
                  <span>Click or Drag and drop to upload</span>
              </a>
          </b-upload>
        </div>
      </div>
    </div>

    <hr>
    <figure v-for="ressource in ressources">
    <img :src="ressource.file" alt="">
    </figure>
    <button @click=""></button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'FileManager',
  data(){
    return {
      files:[]
    }
  },
  computed: {
    ...mapGetters('resources', {
      ressources: 'getRessources'
    })
  },
  mounted(){
  },
  methods:{
    upload(files){
      this.files = []
      let reader = {};
        files.forEach((file, index) => {
          if(file.type != "image/png") return this.$buefy.notification.open({
              duration: 4000,
              message: "Not a png image",
              position: 'is-bottom-right',
              type: 'is-danger',
              hasIcon: true
          })
          reader[index] = new FileReader();
          reader[index].onload = e => {
            var image = new Image();
            image.onload = (event) => {
              console.log(image);
              const obj = /<img.*src="data:(.*);base64,(.*?)"/.exec(image);
                let error = "";
                if(image.width > 120) error = "Your image width is > 120px!"; 
                if(image.height > 240) error =  "Your image height is > 240px!";
                if(error !== "") {
                  this.$buefy.notification.open({
                      duration: 4000,
                      message: error,
                      position: 'is-bottom-right',
                      type: 'is-danger',
                      hasIcon: true
                  })
                }else{
                  this.$store.dispatch('resources/addRessource', {
                    file:e.target.result
                  })
                    console.log(this.$store);
                }
            };
            image.onerror = (e) => {
              this.$buefy.notification.open({
                  duration: 4000,
                  message: "Your image is invalid",
                  position: 'is-bottom-right',
                  type: 'is-danger',
                  hasIcon: true
              })
            }
            image.src = e.target.result;
          };
          reader[index].readAsDataURL(file);
        })
    }
  }
}
</script>

<style scoped lang="scss">
div.container{
}
</style>
