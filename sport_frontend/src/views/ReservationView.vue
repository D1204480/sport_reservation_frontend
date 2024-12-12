<script>
  import SportsFacilities from '../components/SportsFacilities.vue';

  export default {
    name: 'ReservationView',
    components: {
      SportsFacilities
    }
  }

</script>

<template>
   <div class="reservation">
    <h3>運動種類</h3>
  </div>
  
  <SportsFacilities />
</template>

<style>
  .reservation {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 10px 0px;
}

</style>