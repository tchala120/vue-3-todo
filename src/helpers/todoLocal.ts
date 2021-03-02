interface List {
  list: TodoListOption[]
}

export interface TodoListOption {
  id: number
  content: string
  isCompleted: boolean
}

export interface TodoLocalMethod {
  get(): string | TodoListOption[] | null
  set(value: string | TodoListOption[]): void
}

const prefixStorage = 'todo:'

export const clearLocalStorage = (): void => {
  const keys: string[] = ['input', 'list']
  keys.map((key: string): void => window.localStorage.removeItem(key))
}

export const getAuthDataFromLocalStorageByKey = (key: string): string | null => {
  return window.localStorage.getItem(`${prefixStorage}${key}`)
}

export const setAuthDataToLocalStorageByKey = (key: string, value: List | string): void => {
  const toString = typeof value !== 'string' ? JSON.stringify(value) : value
  window.localStorage.setItem(`${prefixStorage}${key}`, toString)
}

export const todoLocalInput: TodoLocalMethod = {
  get: (): string | null => getAuthDataFromLocalStorageByKey('input'),
  set: (input: string): void => setAuthDataToLocalStorageByKey('input', input),
}

export const todoLocalList: TodoLocalMethod = {
  get: (): TodoListOption[] | null => JSON.parse(getAuthDataFromLocalStorageByKey('list') as string)?.list,
  set: (list: TodoListOption[]): void => setAuthDataToLocalStorageByKey('list', formatTodoListToLocalStorage(list)),
}

export const formatTodoListToLocalStorage = (list: TodoListOption[]): List => {
  return { list }
}
