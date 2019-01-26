export default {
  data() {
    return {
      token: window.localStorage.getItem("token"),
      dataList: [],
      roleList: [],
      roleObj: {
        id: '',
        rid: '',
        username: ''
      },
      query: "",
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: true,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogRolesVisible: false,
      AddLabelWidth: "280px",
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editform: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDataList();
    },
    numChange(val) {
      this.pagenum = val;
      this.getDataList();
    },
    getDataList() {
      this.$http({
        url: "users",
        method: "get",
        headers: { Authorization: this.token },
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        }
      }).then(res => {
        //console.log(res);
        var { data, meta } = res.data;
        if (meta.status === 200) {
          setTimeout(() => {
            this.loading = false;
            this.dataList = data.users;
            this.total = data.total;
          }, 1000);
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
        getRoleList() {
      this.$http({
        url: "roles",
        method: "get",
        headers: { Authorization: this.token },
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 200) {
         this.roleList = data;
        } else {
          this.$message.error('获取角色列表失败');
        };
      });
    },
    search() {
      this.getDataList();
    },
    sChange(row) {
      this.$http({
        url: `users/${row.id}/state/${row.mg_state}`,
        method: "put",
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        var { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
        } else {
          this.error("修改状态失败!!");
        }
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: "users/" + id,
            method: "delete",
            headers: { Authorization: this.token }
            // params: {
            //   id: row.id,
            // }
          }).then(res => {
            var { data, meta } = res.data;
            if (meta.status === 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              this.getDataList();
            } else {
              this.error(meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.dialogAddVisible = true;
    },
    addSubmit() {
      this.$http({
        url: "users",
        method: "post",
        headers: { Authorization: this.token },
        data: {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          mobile: this.form.mobile
        }
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 201) {
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
        this.dialogAddVisible = false;
        this.getDataList();
        for (var item in this.form) {
          this.form[item] = "";
        }
      });
    },
    edit(row) {
      this.dialogEditVisible = true;
      this.editform.username = row.username;
      this.editform.email = row.email;
      this.editform.mobile = row.mobile;
      this.editform.id = row.id;
    },
    editSubmit() {
      this.$http({
        url: "users/" + this.editform.id,
        method: "put",
        headers: { Authorization: this.token },
        data: {
          email: this.editform.email,
          mobile: this.editform.mobile
        }
      }).then(res => {
        var { meta, data } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.getDataList();
          this.dialogEditVisible = false;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    roles(id) {
       this.dialogRolesVisible = true;
       this.getRoleList();
       this.$http({
         url: 'users/' + id,
         method: 'get',
         headers: { Authorization: this.token },
       }).then(res =>{
         var {data,meta} = res.data;
         if( meta.status === 200){
           this.roleObj = data;
           this.roleObj.id = data.id;
           this.roleObj.rid = data.rid;
           this.roleObj.username = data.username;

         }else{
           this.$message.error('获取用户角色数据失败!')
         };
       });
    },
    rolesSubmit(id) {
      this.$http({
        url: `users/${id}/role`,
        method: 'put',
        headers: { Authorization: this.token },
        data: {
          rid: this.roleObj.rid
        }
      })
      .then( res =>{
        var {meta} = res.data;
        if(meta.status === 200){
          this.$message({
            type: 'success',
            message: meta.msg
          });
          this.dialogRolesVisible = false;
          this.getDataList();
        }else{
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted() {
    this.getDataList();
  }
};