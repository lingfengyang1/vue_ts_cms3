const contentConfig = {
  pageName: 'menu',
  pageNameCn: '菜单',
  list: [
    {
      type: 'normal',
      width: '180px',
      label: '菜单名称',
      prop: 'name'
    },
    {
      type: 'normal',
      width: '120px',
      label: '级别',
      prop: 'type'
    },
    {
      type: 'normal',
      width: '150px',
      label: '菜单url',
      prop: 'url'
    },
    {
      type: 'icon',
      width: '200px',
      label: '菜单icon',
      prop: 'icon'
    },
    {
      type: 'normal',
      width: '60px',
      label: '排序',
      prop: 'sort'
    },
    {
      type: 'normal',
      width: '150px',
      label: '权限',
      prop: 'permission'
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
