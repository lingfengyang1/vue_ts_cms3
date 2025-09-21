const contentConfig = {
  pageName: 'role',
  pageNameCn: '角色',
  list: [
    {
      type: 'select',
      width: '80px'
    },
    {
      type: 'index',
      width: '80px',
      label: '序号'
    },
    {
      type: 'normal',
      width: '150px',
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'normal',
      width: '180px',
      label: '权限介绍',
      prop: 'intro'
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
      width: '210px',
      label: '操作'
    }
  ]
}

export { contentConfig }
