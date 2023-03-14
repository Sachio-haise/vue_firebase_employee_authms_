<template>
  <div id="employee_detail">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{ employee_id }}</li>
      <li class="collection-item">Department: {{ dept }}</li>
      <li class="collection-item">Position: {{ position }}</li>
    </ul>
    <router-link to="/" class="btn grey"> Back </router-link>
    <button @click="() => deleteEmployee(id)" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link :to="{name:'employee-edit',params:{employee_id:employee_id}}" class="btn-floating btn-large red">
       <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseInit'
export default {
  name: 'employee_detail',
  data() {
    return {
      id: null,
      employee_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  beforeRouteEnter(to, from, next) {
    const q = query(collection(db, 'employee'), where('employee_id', '==', to.params.id))
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((docs) => {
        next((vm) => {
          ;(vm.id = docs.id),
            (vm.employee_id = docs.data().employee_id),
            (vm.name = docs.data().name),
            (vm.dept = docs.data().dept),
            (vm.position = docs.data().position)
        })
      })
    })
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      const q = query(collection(db, 'employee'), where('employee_id', '==', this.$route.params.id))
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((docs) => {
          ;(this.id = docs.id),
            (this.employee_id = docs.data().id),
            (this.name = docs.data().name),
            (this.dept = docs.data().dept),
            (this.position = docs.data().position)
        })
      })
    },
    async deleteEmployee(id) {
      if (confirm('Are you sure?')) {
        await deleteDoc(doc(collection(db, 'employee'), id))
        this.$router.push('/')
      }
    }
  }
}
</script>
