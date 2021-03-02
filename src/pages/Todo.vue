<template>
  <div class="home w-100 h-100">
    <h2>Todo App</h2>
    <a-form class="form-wrapper w-100" :model="todo" @submit.prevent="addNewTodo" :wrapper-col="wrapperCol">
      <a-form-item ref="newTodo" name="newTodo" v-bind="validateInfos.newTodo">
        <a-input class="todo-input w-100" v-model:value="todo.newTodo" />
      </a-form-item>
      <a-button block type="primary" @click="addNewTodo">Add new todo</a-button>
    </a-form>

    <TodoList
      :data="todo.list"
      :onDelete="deleteTodo"
      :onToggleCompleted="toggleCompletedTodo"
      :onChangePosition="changeTodoPosition"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue'

import { useForm } from '@ant-design-vue/use'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'

import TodoList from '@/components/TodoList.vue'
import { TodoListOption, todoLocalList } from '@/helpers/todoLocal'

interface FormState {
  newTodo: string
}

export interface Todo {
  newTodo: string
  list: TodoListOption[]
}

export default defineComponent({
  name: 'Home',
  components: {
    TodoList,
  },
  setup() {
    const todo: UnwrapRef<Todo> = reactive<Todo>({
      newTodo: '',
      list: (todoLocalList.get() as TodoListOption[]) || [],
    })

    const rulesRef = reactive({
      newTodo: [{ required: true, trigger: 'blur', message: 'Please input new todo.' }],
    })

    const { resetFields, validate, validateInfos } = useForm(todo, rulesRef)

    const addNewTodo = () => {
      validate()
        .then(() => {
          todo.list.push({
            id: Date.now(),
            content: todo.newTodo,
            isCompleted: false,
          })
          todo.newTodo = ''

          todoLocalList.set(todo.list)
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }

    const deleteTodo = (id: number) => {
      todo.list = todo.list.filter((t) => t.id !== id)

      todoLocalList.set(todo.list)
    }

    const toggleCompletedTodo = (data: TodoListOption) => {
      data.isCompleted = !data.isCompleted

      todoLocalList.set(todo.list)
    }

    const changeTodoPosition = (direction: string, data: TodoListOption) => {
      const index = todo.list.indexOf(data)
      if ((index === 0 && direction === 'up') || (index === todo.list.length - 1 && direction === 'down')) return

      if (direction === 'up') {
        ;[todo.list[index], todo.list[index - 1]] = [todo.list[index - 1], todo.list[index]]
      }

      if (direction === 'down') {
        ;[todo.list[index], todo.list[index + 1]] = [todo.list[index + 1], todo.list[index]]
      }

      todoLocalList.set(todo.list)
    }

    return {
      todo,
      addNewTodo,
      deleteTodo,
      toggleCompletedTodo,
      changeTodoPosition,
      resetFields,
      validateInfos,
      wrapperCol: { span: 24 },
    }
  },
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-wrapper {
    .todo-input {
      margin: 1rem 0;
    }
  }
}

.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}
</style>
