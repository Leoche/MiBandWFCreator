<template>
  <div @wheel="onScroll" class="container">
    <div class="band" id="band">
      <img src="/band.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Band',
  data(){
    return {
      ischecked:true,
      zoom: 50
    }
  },
  mounted(){
    document.addEventListener('scroll', this.onScroll)
  },
  methods:{
    setZoom(zoom){
      this.zoom = zoom;
      let newzoom = this.zoom/100;
      document.querySelector("#band").style.transform = "translate(-50%,-50%) scale("+newzoom+")"
      console.log(this.$refs.band.style);
      console.log("translate(-50%,-50%) scale("+newzoom+");");
    },
    onScroll(event){
        console.log(this);
      if(event.deltaY > 0) {
        if(this.zoom < 200) this.zoom = this.zoom + 10
      } else {
        if(this.zoom > 20) this.zoom = this.zoom - 10
      }
      this.$emit('zoom', this.zoom)
      this.setZoom(this.zoom)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.container{
  background: #222;
  width: 100%;
  height: 100%;
  display: flex;
  & .band{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%) scale(1);
    transition: transform .2s;
    width: 420px;
    height: 1200px;
    transform-origin: 50% 50%;
  }
}
</style>
