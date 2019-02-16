<template>
  <el-col :span="24">
    <el-menu
      default-active="2"
      unique-opened
      class="el-menu-vertical-demo"
      router
    >
      <el-submenu
        class="position" v-for="item in menus"
      :key="item.id"
      :index="item.id.toString()"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.path">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>{{item1.authName}}</span>
          </template></el-menu-item>
      </el-submenu>


    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    }
  },
  methods: {
    getMenus() {
      this.$http({
        url: 'menus',
        methods: 'get',
      }).then( res => {
        let {data,meta} = res.data;
        if( meta.status===200 ){
          this.menus = data;
        }else{
          this.$message.error(meta.msg)
        };
      });
    },
  },
  created() {
    this.getMenus();
  },
};
</script>

<style scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
</style>