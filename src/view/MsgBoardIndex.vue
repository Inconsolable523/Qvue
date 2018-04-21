<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        transitionName: null
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      next()
    }
  }
</script>
<!-- <script lang="scss" scoped>
  .content{
    width: 100%;
    height: 100%;
  }
</script> -->
