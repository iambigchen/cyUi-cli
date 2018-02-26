<template>
  <el-pagination style="margin-top:50px;text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
  class="alignc"
  :page-sizes="[50, 100, 150, 200]" :prev-text="prevText" :next-text="nextText"
  :page-size="pageSize" :total="total" :layout='layout'>
  <div class="landz_pg">共<strong class="landz_pageNum">{{pages}}</strong>页<strong class="landz_pageNum">{{total}}</strong>条记录</div>
</el-pagination>
</template>
<script>
  export default{
    name: 'ex-pagination',
    props: {
      prevText: {
        type: String,
        default: '上一页'
      },
      nextText: {
        type: String,
        default: '下一页'
      },
      // layout: String,
      layout: {
        type: String,
        default: 'prev, pager, next, jumper, slot, sizes'
      },
      total: {
        type: Number,
        default: 1
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 1
      }
    },
    methods: {
      handleSizeChange: function (val) {
        this.$emit('size-change',val)
      },
      handleCurrentChange: function (val) {
        this.$emit('current-change',val)
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.total / this.pageSize)
      }
    }
  }
</script>
<style scoped>
  .landz_pg{
    display: inline-block;
    line-height: 28px;
    font-size: 12px;
    color:rgba(51,51,51,1);
    font-weight: 400;
    margin-left: 20px
  }
  .landz_pageNum{
    color: #3594DC;
    font-weight: 400;
  }
</style>
