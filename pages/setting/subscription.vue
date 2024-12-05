<template>
  <div>
    <div class="row justify-content-center mt-5">
      <div class="col-12 col-sm-9">
        <table v-if="subscriptions.length !== 0" class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">
                #
              </th>
              <th scope="col">
                Subscription Name
              </th>
              <th scope="col">
                Duration
              </th>
              <th scope="col">
                Payment Method
              </th>
              <th scope="col">
                Payment Type
              </th>
              <th scope="col">
                Subscription Qty
              </th>
              <th scope="col">
                Price
              </th>
              <th scope="col">
                Status
              </th>
              <th scope="col">
                Purchase Date
              </th>
              <th scope="col">
                Expiry Date
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="subscriptions.length === 0">
              <tr>
                <td colspan="11" class="text-center">
                  No Cancelled Subscriptions available
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(subscription, index) in subscriptions" :key="subscription.id">
                <th scope="row">
                  {{ index + 1 }}
                </th>
                <td>{{ subscription.product_name }}</td>
                <td>
                  {{ subscription.product_billing_frequency }}
                  {{ subscription.product_billing_interval }}
                </td>

                <template v-if="subscription.payment_method === 'card'">
                  <i class="fas fa-credit-card" /> Card
                </template>
                <template v-else-if="subscription.payment_method === 'bank'">
                  <i class="fas fa-university" /> Bank
                </template>
                <template v-else>
                  {{ subscription.payment_method }}
                </template>

                <td>{{ subscription.payment_type }}</td>
                <td>{{ subscription.product_quantity }}</td>
                <td>${{ subscription.product_price }}</td>
                <td>
                  <span :class="getStatusClass(subscription.status)">
                    {{ getStatusLabel(subscription.status) }}
                  </span>
                </td>
                <td>{{ formatDate(subscription.purchasing_date) }}</td>
                <td>{{ formatDate(subscription.expiry_date) }}</td>
                <td>
                  <button class="btn btn-danger" @click="CancelSubscription(subscription.subscription_id)">
                    Cancel
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="cancelSubscriptions.length !== 0">
          <h3>Cancel Subscription</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  Subscription Name
                </th>
                <th scope="col">
                  Duration
                </th>
                <th scope="col">
                  Payment Method
                </th>
                <th scope="col">
                  Payment Type
                </th>
                <th scope="col">
                  Subscription Qty
                </th>
                <th scope="col">
                  Price
                </th>
                <th scope="col">
                  Status
                </th>
                <th scope="col">
                  Expiry Date
                </th>
                <th scope="col">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cancelSubscriptions && cancelSubscriptions.length === 0">
                <tr>
                  <td colspan="11" class="text-center">
                    No Cancelled Subscriptions available
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(subscription, index) in cancelSubscriptions" :key="subscription.id">
                  <th scope="row">
                    {{ index + 1 }}
                  </th>
                  <td>{{ subscription.product_name }}</td>
                  <td>{{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}</td>
                  <td>
                    <template v-if="subscription.payment_method === 'card'">
                      Card
                    </template>
                    <template v-else-if="subscription.payment_method === 'bank'">
                      <i class="fas fa-university" /> Bank
                    </template>
                    <template v-else>
                      {{ subscription.payment_method }}
                    </template>
                  </td>
                  <td>{{ subscription.payment_type }}</td>
                  <td>{{ subscription.product_quantity }}</td>
                  <td>${{ subscription.product_price }}</td>
                  <td>
                    <span :class="getStatusClass(subscription.status)">
                      {{ getStatusLabel(subscription.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(subscription.expiry_date) }}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="fetchAndDisplayInvoice(subscription.paddle_transaction_id)"
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="cancelSubscriptions.length === 0 && subscriptions.length === 0" class="row justify-content-center">
          <h6> No Subscription Data</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

// Access Nuxt app context for the injected axios instance
const { $axios } = useNuxtApp()

const subscriptions = ref([])
const cancelSubscriptions = ref([])

async function fetchSubscriptions () {
  try {
    const response = await $axios.post(
      '/api/user-active-subscriptions',
      {
        email: userStore.user.email
      }
    )
    subscriptions.value = response.data.data
  } catch (error) {
    this.$toast.error('Oops, something went wrong!')
  }
}

function formatDate (dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
// Define a ref for the subscription ID (you should replace this with your actual logic)
ref('sub_01j4yk5j02xwfwnsjqjgpk4npg') // Replace with your subscription ID

// ========================= fetchCanceledSubscriptions =========================
async function fetchCanceledSubscriptions () {
  try {
    const response = await $axios.post(
      '/api/user-cancel-subscriptions',
      {
        email: userStore.user.email
      }
    )
    cancelSubscriptions.value = response.data.data // Update the reactive variable
    // console.log('cancelSubscriptions.value', cancelSubscriptions.value)
  } catch (error) {
    this.$toast.error('Oops, something went wrong!')
  }
}

// ========================= call function on mounted =========================
fetchSubscriptions()
fetchCanceledSubscriptions()

//  ========================= CancelSubscription ===========================
async function CancelSubscription (id) {
  try {
    const response = await $axios.post(
      '/api/cancel-subscriptions',
      {
        email: userStore.user.email,
        subscription_id: id
      }
    )
    subscriptions.value = response.data.data
    // sweet alert message
    Swal.fire({
      title: 'Subscription Cancel!',
      text: 'Your Subscriptionis is Canceled.',
      icon: 'success'
    })
  } catch (error) {
    // this.$toast.error('Oops, something went wrong!')
  }
}

// Fetches and displays an invoice by making an API call to retrieve the invoice URL.
const fetchAndDisplayInvoice = async (invoiceId) => {
  try {
    // Make API call to get the invoice URL
    const response = await $axios.post('/api/download-invoice', {
      invoice_id: invoiceId // Send the invoiceId in the request body
    })
    // Get the PDF URL from the response
    const invoiceUrl = response.data.data.url
    if (invoiceUrl) {
      window.open(invoiceUrl)
    } else {
      // this.$toast.error('Oops, something went wrong!')
    }
  } catch (error) {
    $toast.error('Oops, something went wrong!')
  }
}

function getStatusLabel (status) {
  if (status === 1) {
    return 'Active'
  } else {
    return 'Cancelled'
  }
}

function getStatusClass (status) {
  return status === 0 ? 'badge bg-warning' : 'badge bg-success'
}
</script>

<style>
.active-sub {
  background: #e9c046;
  box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
  border-radius: 12px;
  color: white;
  background-color: #e9c046 !important;
}

.sub-card {
  background: #ffffff;
  box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
  border-radius: 12px;
  color: black;
}
</style>
