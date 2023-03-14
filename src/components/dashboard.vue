<template>
  <div id="emp_dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">
          {{ employee.dept }}
        </div>
        {{ employee.employee_id }} : {{ employee.name }}

        <router-link
          class="secondary-content"
          :to="{ name: 'employee', params: { id: employee.employee_id } }"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/employee-create" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from './firebaseInit'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
export default {
  name: 'emp_dashboard',
  data() {
    return {
      employees: []
    }
  },
  created() {
    const q = query(collection(db, 'employee'), orderBy('dept'))
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          }
          this.employees.push(data)
        })
      })
      .catch((err) => console.log(err))
  }
}
</script>
