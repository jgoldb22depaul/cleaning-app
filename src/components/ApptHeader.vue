<template>
  <div class="b w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around">
    <router-link :to="{name: 'ServiceOptions'}" :style= "{ 'color' : col}"><p class="t">Service Options</p></router-link>
    <span> > </span>
    <router-link :to="{name: 'CheckAvailable'}" :style= "{ 'color' : col1}"><p class="t">Availabilities</p></router-link>
    <span> > </span>
    <router-link :to="{name: 'Finalize'}" :style= "{ 'color' : col2}"><p class="t">Finalize</p></router-link>
  </div>
</template>

<script>
export default {
    props: [
        'col',
        'col1',
        'col2']
}
</script>

<style>
  .b {
    font-weight:200;
    font-family: sans-serif;
   
  }
  
  
</style>