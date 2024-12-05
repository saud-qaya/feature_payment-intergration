<template>
  <div>
    <label for="seats">Anzahl der Sitze:</label>
    <input id="seats" v-model.number="seats" type="number" min="1" @input="updatePrice">
    <p>Preis: {{ price }} €</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const seats = ref(1) // Default to 1 seat
    const price = ref(0)

    function calculatePrice (seats: number): number {
      const basePricePerSeat = 112
      const maxDiscount = 0.4916 // 49.16% discount at 500 seats
      const maxSeats = 500

      // Calculate the discount factor based on the number of seats (linear)
      let discountFactor = maxDiscount * (seats / maxSeats)

      // Ensure the discount doesn't exceed the maximum discount
      if (discountFactor > maxDiscount) {
        discountFactor = maxDiscount
      }

      // Calculate the price with the linear discount
      const totalPrice = basePricePerSeat * seats * (1 - discountFactor)

      // Round the result to 2 decimal places
      return Math.round(totalPrice * 100) / 100
    }

    // Update the price whenever the seat count changes
    function updatePrice () {
      price.value = calculatePrice(seats.value)
    }

    return {
      seats,
      price,
      updatePrice
    }
  }
})
</script>

<style scoped>
/* Optional: some simple styling */
input {
  margin: 0.5rem;
  padding: 0.5rem;
  width: 100px;
}

p {
  font-size: 1.2rem;
  color: #333;
}
</style>
