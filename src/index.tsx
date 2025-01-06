import { defineComponent } from 'vue'

export const C = defineComponent({
  name: 'c-component',
  setup() {
    return () => <div>C</div>
  },
})

export const K = 'k'
