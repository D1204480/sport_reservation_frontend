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
    <h1>This is an reservation page</h1>
  </div>
  
  <SportsFacilities />
</template>