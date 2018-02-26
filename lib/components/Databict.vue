<template>
  <div class="exDatabict">
    <template v-if="type=='select'">
      <el-option v-for="item in list" v-if="item.dictCode !== remove" :label="item.dictName" :value="item.dictCode" :key="item.dictCode"></el-option>
    </template>
    <template v-if="type=='checkbox'">
        <el-checkbox v-for="item in list" v-if="item.dictCode !== remove" :label="item.dictCode" :value="item.dictCode" :key="item.dictCode">{{item.dictName}}</el-checkbox>
    </template>
    <template v-if="type=='radio'">
        <el-radio @change="handleChange" v-model="radioValue" v-for="item in list" v-if="item.dictCode !== remove" :label="item.dictCode" :value="item.dictCode" :key="item.dictCode">{{item.dictName}}</el-radio>
    </template>
  </div>
</template>
<script>
  //600300000004 待上传
  //601000000004 审核中
  export default {
    name: 'Databict',
    data () {
      return {
        radioValue: ''
      }
    },
    props: {
      remove: '',
      type: {
        type: String,
        default: 'select'
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('listenRadio', value)
      }
    },
    mounted () {
      console.log(111,this)
    },
    computed: {
      list () {
        let params = this.$store.getters.getDatabictMap[this.$attrs['data-databict']]
        let bictlist = this.$store.getters.getDatabict
        if (bictlist && bictlist[params]) {
          let dicts = bictlist[params].childDict
          // if (params === '6003' || params === '6010') {
          //   for (let key in dicts) {
          //     if (dicts[key].dictCode === '600300000004' || dicts[key].dictCode === '601000000004') {
          //       dicts.splice(key, 1)
          //     }
          //   }
          // }
          return dicts
        } else {
          return []
        }
      },
      props() {
        console.log(this.$attrs['prop'])
        return this.$attrs['prop']
      }
    }
  }
</script>
<style scoped>

</style>
