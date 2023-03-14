<template>
  <div id="employees_edit">
    <h3>Employee Update</h3>
    <div class="row">
      <form @submit.prevent="() => updateData(id)" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from './firebaseInit'
import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore'
export default {
  name: 'employees_edit',
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
    async updateData(id) {
      await updateDoc(doc(collection(db, 'employee'), id), {
        employee_id: this.employee_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      })
      this.$router.push({ name: 'employee', params: { id: this.employee_id } })
    }
  }
}
</script>
