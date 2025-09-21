const searchConfig = {
  pageName: 'role',
  list: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入查询的角色名称',
      prop: 'name'
    },
    {
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入查询的权限介绍',
      prop: 'intro'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export { searchConfig }
