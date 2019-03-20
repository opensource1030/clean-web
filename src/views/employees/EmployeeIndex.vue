<template>
    <div>
        <modal v-if="$store.getters['error/hasError']" @close="$store.dispatch('error/clearAll')">
        <h3 slot="body">{{ $store.getters['error/error'] }}</h3>
        </modal>

        <router-link to="" class="btn btn-dark">Add Employee</router-link>
        
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
        <tbody>
          <template>
            <tr>
              <td>añsldkfj</td>
              <td>añsldkfj</td>
              <td>añsldkfj</td>
            </tr>
          </template>
        </tbody>
      </table>

    </div>
</template>

<script src="./employee.index.ctrl.js" lang="babel">

/**
 *            
 * <tr :data-id="employee.id" :class="activeEmployee && (activeEmployee.id == employee.id) ? 'active' : ''">
              <td>{{ employee.firstName }}</td>
              <td>{{ employee.lastName }}</td>
              <td>{{ employee.email }}</td>
            </tr>
 *            <td>
                  <span @click="setActive(employee)"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>
              </td>
              <td>{{ employee.identification }}</td>
              <td>
                <div>
                  <c-switch class="mx-1" color="primary" checked name="switch1"/>
                </div>
              </td>
              <td>{{ !!employee.companies && !!employee.companies[0] ? employee.companies[0].name : '' }}</td>
</tr>
 */

</script>
