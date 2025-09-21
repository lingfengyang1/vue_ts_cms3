const contentConfig = {
  pageName: 'department',
  pageNameCn: '部门',
  list: [
    {
      type: 'select',
      width: '50px'
    },
    {
      type: 'index',
      width: '60px',
      label: '序号'
    },
    {
      type: 'normal',
      width: '120px',
      label: '部门名称',
      prop: 'name'
    },
    {
      type: 'normal',
      width: '120px',
      label: '部门领导',
      prop: 'leader'
    },
    {
      type: 'normal',
      width: '150px',
      label: '上级部门',
      prop: 'parentId'
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
