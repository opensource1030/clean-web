<template>
<div :class="{ 'multiselect--active': isOpen}" @focus="activate()" class="multiselect">
  <div class="multiselect__select" @mousedown.prevent="toggle()"></div>
  <div ref="tags" class="multiselect__tags" @mousedown.prevent="toggle()">
    <span>
          {{field}}
        </span>
  </div>
  <transition name="multiselect">
    <ul v-show="isOpen" transition="multiselect" class="multiselect__content">
      <input ref="search" type="text" v-model="search" @focus.prevent="activate()" @blur.prevent="deactivate()"  @keyup="filteroptions()" autocomplete="off" :placeholder="placeholder" class="multiselect__input" />

      <li v-if="search=='' && search!=null" class="multiselect__element">


        <span v-if="labelAttr==null" tabindex="0" v-for="(option,index) in options" :key="index" class="multiselect__option" :class="{ actives: isOptionSelected(option), highlight: index }" @mousedown.prevent="select(option,index)">
                {{option}}

              </span>
        <span v-if="labelAttr!=null && labelAttr!=''" tabindex="0" v-for="(option,index) in options" :key="index" class="multiselect__option" :class="{ actives: isOptionSelected(option), highlight: index }" @mousedown.prevent="select(option,index)">

                {{option[labelAttr]}}

              </span>
      </li>
      <li v-else class="multiselect__element">

        <span v-if="labelAttr==null" v-for="(option,index) in filter " :key="index" class="multiselect__option" :class="{ actives: isOptionSelected(option), highlight: index }" :value="option" @mousedown.prevent="select(option,index)">
                {{option}}

              </span>
        <span v-if=" labelAttr!=null && labelAttr!=''" v-for="(option,index) in filter " :key="index" class="multiselect__option" :class="{ actives: isOptionSelected(option), highlight: index  }" :value="option" @mousedown.prevent="select(option,index)">

                {{option[labelAttr]}}

              </span>
      </li>


      <li v-if="filter.length==0 && show==true">

        <span class="multiselect__option">
              <slot name="noResult">No elements found. Consider changing the search query.</slot>
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import multiselectMixin from './multiselectMixin'
import functionsMixin from './functionsMixin'
export default {
  mixins: [multiselectMixin,functionsMixin],
  name: 'vue-multiselect',
  props: {
    placeholder: {
      type: String,
      default: 'Search '
    },
  },
  computed: {
  },
  data() {
    return {
    }
  }
}
</script>