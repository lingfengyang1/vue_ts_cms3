<template>
  <div class="count-card">
    <el-card class="header-card">
      <template #header>
        <span class="title">{{ title }}</span>
        <el-icon color="#00000073" size="14"><Warning /></el-icon>
      </template>
      <template #default>
        <span ref="number1Ref">{{ number1 }}</span>
      </template>
      <template #footer>
        <span>{{ title }}</span>
        <span ref="number2Ref">{{ number2 }}</span>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'

const { item } = defineProps<{
  item: any
}>()
const { title, number1, number2, amount } = item
const number1Ref = ref()
const number2Ref = ref()
const countUpOptions = {
  prefix: amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  // 当页面渲染完毕后 开始进行增量动画
  const countUp1 = new CountUp(number1Ref.value, number1, countUpOptions)
  const countUp2 = new CountUp(number2Ref.value, number2, countUpOptions)
  countUp1.start()
  countUp2.start()
})
</script>

<style scoped lang="less">
.count-card {
  .header-card {
    padding: 0 20px;
  }
  .el-card {
    height: 130px;
    display: flex;
    flex-direction: column;
    color: #000000d9;

    :deep(.el-card__header),
    :deep(.el-card__body),
    :deep(.el-card__footer) {
      padding: 0;
    }

    :deep(.el-card__header) {
      height: 38px;
      border-bottom: none;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .title {
        font-size: 14px;
        color: #00000073;
      }
    }

    :deep(.el-card__body) {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 26px;
    }

    :deep(.el-card__footer) {
      height: 38px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
