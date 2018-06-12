<template>
<div v-if="search!=null" class="large-4 large-offset-4 columns end search-cost" v-show="show">
  <div class="large-4 columns">
    <label>{{searchs.costMinName}}
        <input v-bind:class="{ 'search-input' : true, 'error-input': searchs.errorCost }" v-model="search.costMin" title="The minimum cost of the Services listed below." type="number" min="0" placeholder="">
      </label>
  </div>
  <div class="large-4 columns">
    <label>{{searchs.costMaxName}}
        <input v-bind:class="{ 'search-input' : true, 'error-input': searchs.errorCost }" v-model="search.costMax" title="The maximum cost of the Services listed below." type="number" min="0" placeholder="">
      </label>
  </div>
  <div class="large-3 columns">
    <a class="special-button" @click="searchCost()">{{searchs.searchName}}</a>
  </div>
  <div class="large-1 end columns">
    <a class="special-button" @click="resetValuesCost()">{{searchs.resetName}}</a>
  </div>
</div>
</template>
<script>
/*  values necessary on the childreen page
search:{
costmax:0,
costMin:0,
 searchShow:false or true,
costFilterMessage:''
}
  */
//callback api
//show true or false
//object v-model
export default {
  props: {
    callback: {
      Type: Object
    },
    show: {
      Type: Boolean,

    },
    search: {
      default: null,
    }

  },
  data() {
    return {
      searchs: {
        errorCost: false,
        searchName: 'Search',
        resetName: 'R',
        costMinName: 'MIN Cost',
        costMaxName: 'MAX Cost',
      }
    }

  },

  methods: {
    searchCost() {

      if (this.search.costMin <= this.search.costMax) {
        this.searchs.errorCost = false;
        if (this.search.costMin != 0 || this.search.costMax != 0) {
          this.search.costFilterMessage = this.search.costMin + ' > ' + this.search.costMax;
        } else {
          this.search.costFilterMessage = '';
        }

        this.callback();
      } else {
        this.searchs.errorCost = true;
      }

    },
    resetValuesCost() {
      this.search.costMin = 0;
      this.search.costMax = 0;
      this.searchs.errorCost = false;
    }
  }

};
</script>
<style>
.search-cost {
  border-color: #1243A5;
  border-style: solid;
  border-radius: 5px;
  margin-top: 0.5rem;
}

.search-input {
  height: 65%;
}

.error-input {
  border-color: #FF0000;
}

.special-button {
  display: inline-block;
  padding: 0.5em 0.7em;
  border-radius: 0.5rem;
  background-color: #1243A5;
  color: #FFFFFF;
  margin-top: 1.9rem;
}
</style>
