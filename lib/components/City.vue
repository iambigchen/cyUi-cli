<template>
  <div>
    <el-option v-for="(item,index) in list" :label="item" :value="item" :key="item"></el-option>
  </div>
</template>
<script>
  export default {
    name: 'City',
    props: {
      remove: ''
    },
    computed: {
      list() {
        if (this.$attrs['data-databict'] === 'NATIONALITY_MSG') {
          let citylist = this.$store.getters.getNationality
          return citylist
        } else if (this.$attrs['data-databict'] === 'CHINA_PROVINCE_MSG') {
          let citylist = this.$store.getters.getProvince
          return citylist
        } else {
          return []
        }
      }
    }
  }
</script>