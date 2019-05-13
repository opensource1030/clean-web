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

<script src="./employee_index.ctrl.js" lang="babel"></script>
