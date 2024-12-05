<template>
  <div>
    <div class="row justify-content-center mt-5">
      <!-- Invert user form -->
      <div class="col-12 my-4 col-sm-10">
        <div class="row g-3">
          <div class="col-md-10">
            <label for="inputPassword2" class="visually-hidden">Email address</label>
            <input
              v-model="email"
              type="text"
              class="form-control"
              name="email"
              placeholder="Enter email"
              aria-describedby="emailHelp"
            >
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" @click="inviteUser">
              Invite User
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="col-12 col-sm-10 mt-4">
        <h6 class="m-0 p-0">
          Active Subscription
        </h6>
        <!-- Added this wrapper -->
        <div class="tabel-desing mt-2 table-responsive">
          <table class="table mb-0 table-hover align-middle">
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
                    {{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}
                  </td>
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
                      class="btn btn-primary btn-sm d-inline-flex align-items-center"
                      @click="fetchAndDisplayInvoice(subscription.paddle_transaction_id)"
                    >
                      <i class="fas fa-download me-2" />
                      <span>Invoice</span>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="CancelSubscription(subscription.subscription_id)">
                      Cancel
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cancel subscription table -->
      <div class="col-12 col-sm-10 mt-4">
        <h5 class="m-0 p-0">
          Cancel Subscription
        </h5>
        <!-- Added this wrapper -->
        <div class="tabel-desing mt-2 table-responsive">
          <table class="table mb-0 table-hover align-middle">
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
                <th scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cancelSubscriptions.length === 0">
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
                      class="btn btn-primary btn-sm d-inline-flex align-items-center"
                      @click="fetchAndDisplayInvoice(subscription.paddle_transaction_id)"
                    >
                      <i class="fas fa-download me-2" />
                      <span>Invoice</span>
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-primary btn-sm d-inline-flex align-items-center"
                      @click="deleteSubscription(subscription.subscription_id)"
                    >
                      <i class="fas fa-trash me-2" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// Import necessary dependencies
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const subscriptions = ref([])
const cancelSubscriptions = ref([])

// Access Nuxt app context for the injected axios instance
const { $axios } = useNuxtApp()

/**
 * Fetch and display Active Subscriptions and invoice
 */
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
    $toast.error('Oops, something went wrong!')
  }
}

/**
 * Fetch and display Canceled Subscriptions and invoice
 */
async function fetchCanceledSubscriptions () {
  try {
    const response = await $axios.post(
      '/api/user-cancel-subscriptions',
      {
        email: userStore.user.email
      }
    )
    cancelSubscriptions.value = response.data.data // Update the reactive variable
  } catch (error) {

    // $toast.error('Oops, something went wrong!')
  }
}

/**
 * Formats a date string into a human-readable format (YYYY-MM-DD)
 */
function formatDate (dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Returns a human-readable label for a given status code.
function getStatusLabel (status) {
  if (status === 1) {
    return 'Active'
  } else {
    return 'Cancelled'
  }
}

// Returns a human-readable budge for a given status code.
function getStatusClass (status) {
  return status === 0 ? 'badge bg-warning' : 'badge bg-success'
}

// Fetch subscriptions when the component is mounted
fetchCanceledSubscriptions()
fetchSubscriptions()

// ====================================== invite users ======================================
// Define a reactive variable for email
const email = ref('')

// Function to send invitation
async function inviteUser () {
  if (!email.value) {
    // console.error('Email is required')
    return
  }
  try {
    await $axios.post('/api/invitations/send', {
      email: email.value,
      inviter_id: userStore.user.id
    })
    // sweet alert message
    Swal.fire({
      title: 'Good job!',
      text: 'Inviateion email is sent successfully',
      icon: 'success'
    })
  } catch (_error) {

    // $toast.error('Oops, something went wrong!')
  }
}

/**
 * Fetches and displays an invoice by making an API call to retrieve the invoice URL.
 *
 * @param {number} invoiceId - The ID of the invoice to fetch and display.
 */
const fetchAndDisplayInvoice = async (invoiceId) => {
  try {
    // Make API call to get the invoice URL
    const response = await $axios.post('/api/download-invoice', {
      invoiceId
    })
    // Get the PDF URL from the response
    const invoiceUrl = response.data.data.url
    if (invoiceUrl) {
      window.open(invoiceUrl)
    } else {
      // $toast.error('Oops, something went wrong!')
    }
  } catch (_error) {
    // $toast.error('Oops, something went wrong!')
  }
}

/**
 * CancelSubscription
 */
async function CancelSubscription (id) {
  try {
    const response = await $axios.post('/api/cancel-subscriptions', {
      email: userStore.user.email,
      subscription_id: id
    })
    subscriptions.value = response.data.data
    // sweet alert message
    Swal.fire({
      title: 'Subscription Cancel!',
      text: 'Your Subscriptionis is Canceled.',
      icon: 'success'
    })
  } catch (error) {
    // $toast.error('Oops, something went wrong!')
  }
}

async function deleteSubscription (subscriptionId) {
  try {
    const response = await this.$axios.post('/api/delete-subscription', {
      subscriptionId
    })
    if (response.status === 200) {
      // Show success message
      this.$toast.success('Invoice deleted successfully!')
    } else {
      this.$toast.error('Failed to delete the invoice!')
    }
  } catch (error) {
    // Show error message
    // this.$toast.error('Oops, something went wrong!')
  }
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

.tabel-desing thead tr th {
  background-color: #e9c046;
  font-size: 13px;
  font-weight: 500;
  height: 44px;
}
</style>
