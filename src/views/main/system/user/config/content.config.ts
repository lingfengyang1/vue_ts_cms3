const contentConfig = {
  pageName: 'users',
  pageNameCn: '用户',
  list: [
    {
      type: 'select'
    },
    {
      type: 'index',
      label: '序号',
      width: '60px'
    },
    {
      type: 'normal',
      label: '用户名',
      prop: 'name',
      width: '120px'
    },
    {
      type: 'normal',
      label: '真实姓名',
      prop: 'realname',
      width: '120px'
    },
    {
      type: 'normal',
      label: '手机号码',
      prop: 'cellphone',
      width: '150px'
    },
    {
      type: 'status',
      label: '状态',
      prop: 'enable',
      width: '80px'
    },
    {
      type: 'date',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'date',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'handler',
      label: '操作',
      width: '210px'
    }
  ]
}

export { contentConfig }
