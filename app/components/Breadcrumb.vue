
<template>
  <nav aria-label="You are here:" role="navigation">
    <ul class="breadcrumbs for-clean" v-if="$breadcrumbs.length">
      <li><a href="javascript:;"><i class="fa fa-home "> </i></a></li>
      <li v-for="(i, crumb) in $breadcrumbs">
        <span class="show-for-sr">Current: </span>
        <a v-link="crumb">{{ crumb.handler.breadcrumb }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
/*import auth from './../api/auth'*/

export default {
    name: "Breadcrumb"
}
</script>
