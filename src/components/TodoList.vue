<template>
  <div class="list-container" v-for="item in data" :key="item.id">
    <div class="content-block" :class="{ 'todo-completed': item.isCompleted }" @click="onToggleCompleted(item)">
      {{ item.content }}
    </div>
    <div class="action-block">
      <div>
        <span class="direction-control" @click="onChangePosition('up', item)">&#8593;</span>
        <span class="direction-control" @click="onChangePosition('down', item)">&#8595;</span>
      </div>
      <a-button type="link" @click="onToggleCompleted(item)">{{ item.isCompleted ? 'Uncheck' : 'Check' }}</a-button>
      <a-button type="link" @click="onDelete(item.id)">Delete</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { TodoListOption } from '@/helpers/todoLocal'
import { defineComponent, PropType } from '@vue/runtime-core'

export default defineComponent({
  name: 'TodoList',
  props: {
    data: {
      type: Array as PropType<Array<TodoListOption>>,
      default: [],
    },
    onDelete: {
      type: Function,
    },
    onToggleCompleted: {
      type: Function,
    },
    onChangePosition: {
      type: Function,
    },
  },
})
</script>

<style scoped lang="scss">
.list-container {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 0;

  .content-block {
    text-align: left;
    width: 100%;

    font-size: 24px;

    cursor: pointer;

    &.todo-completed {
      text-decoration: line-through;
    }
  }

  .action-block {
    display: flex;
    align-items: center;

    .direction-control {
      padding: 0 0.5rem;

      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
