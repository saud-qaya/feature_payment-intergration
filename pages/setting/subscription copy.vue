<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8">
        <h4 class="fw-bold text-center me-5 pt-5">
          <span class="float-start" style="cursor: pointer" @click="$router.go(-1)"><i class="fa-solid fa-arrow-left-long" /></span> {{ t("Subscription") }}
        </h4>
        <div class="row">
          <div class="col-12">
            <h4 class="fw-bold  text-center pt-3">
              {{ t("Subscribe to increase your productivity with Mindboost") }}
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-3 col-sm-4">
            <div class="card" :class="{'active-sub':oneMonth,'sub-card':!oneMonth}" @click="oneMonth=true;twoMonth=false;threeMonth=false">
              <div class="card-body py-4">
                <h5 class="text-center fw-bolder" style="font-weight: 600;font-size: 32px">
                  €2.99
                </h5>
                <p class="text-center">
                  {{ t("1 month") }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 pt-3 col-sm-4">
            <div class="card" :class="{'active-sub':twoMonth,'sub-card':!twoMonth}" @click="twoMonth=true;oneMonth=false;threeMonth=false">
              <div class="card-body py-4">
                <h5 class="text-center fw-bolder  " style="font-weight: 600;font-size: 32px">
                  €9.99
                </h5>
                <p class=" text-center">
                  {{ t("6 month") }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 pt-3 col-sm-4">
            <div class="card" :class="{'active-sub':threeMonth,'sub-card':!threeMonth}" @click="threeMonth=true;twoMonth=false;oneMonth=false">
              <div class="card-body py-4">
                <h5 class="text-center fw-bolder  " style="font-weight: 600;font-size: 32px">
                  €14.99
                </h5>
                <p class=" text-center">
                  {{ t("1 year") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-5">
          <div class="col-12 px-md-5 px-0">
            <h6 class="text-center text-muted" style="font-style: normal;font-weight: 500;font-size: 14px;line-height: 20px;">
              {{ t("You can cancel Mindboost at any time. The subscription will start automatically after the end of the trial period unless it is canceled before the end of the trial period. The total price is charged per period, price includes VAT.") }}
            </h6>
          </div>
          <div class="col-12 text-end" />
        </div>
        <div class="row pt-5 justify-content-center ">
          <div class="col-12 col-md-6 col-lg-6 text-center">
            <button :disabled="loading" type="button" class="btn text-white fs-5  col-12 fw-bold py-2 " style="background-color: #e9c046" @click="paynow">
              {{ t("Save Changes") }} <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            </button>
          </div>
          <div v-if="subscription=='monthly'||subscription=='sixmonth'||subscription=='yearly'" class="col-12 col-md-6 col-lg-6">
            <button :disabled="cancel_loading" class="btn text-white fs-5  col-12 fw-bold py-2 " style="background-color: #dc042a" @click="cancelNow">
              Cancel Now <span v-if="cancel_loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            </button>
          </div>
          <!--          <StripeElements-->
          <!--              v-if="stripeLoaded"-->
          <!--              v-slot="{ elements, instance }" ref="elms"-->
          <!--          :stripe-key="stripeKey"-->
          <!--          :instance-options="instanceOptions"-->
          <!--          :elements-options="elementsOptions"-->
          <!--          >-->
          <!--          <StripeElement-->
          <!--              ref="card"-->
          <!--              :elements="elements"-->
          <!--              :options="cardOptions"-->
          <!--          />-->
          <!--          </StripeElements>-->
          <!--          <button type="button" class="btn text-white fs-5  col-12 fw-bold py-2" @click="pay" style="background-color: #e9c046">Pay</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapStores } from 'pinia'
import { useUserStore } from '~/stores/user'

export default {
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  },

  data () {
    return {
      oneMonth: false,
      twoMonth: false,
      threeMonth: false,
      loading: false,
      cancel_loading: false,
      subscription: '',
      form: {
        type: 'one'
      }
    }
  },
  computed: {
    // ...mapState(useUserStore, ['user']),
    ...mapStores(useUserStore)
  },
  mounted () {
    // this.updateUserNow();
    // const plans=this.user.subscriptions;
    // console.log(plans);
    // if (plans) {
    //   const isMonthly = plans.some(plan => plan.name === 'monthly');
    //   if (isMonthly) {
    //     this.oneMonth = true;
    //     this.twoMonth = false;
    //     this.threeMonth = false;
    //   }
    //   const isSixMonth = plans.some(plan => plan.name === 'sixmonth');
    //   if (isSixMonth) {
    //     this.oneMonth = false;
    //     this.twoMonth = true;
    //     this.threeMonth = false;
    //   }
    //   const isYearly = plans.some(plan => plan.name === 'yearly');
    //   if (isYearly) {
    //     this.oneMonth = false;
    //     this.twoMonth = false;
    //     this.threeMonth = true;
    //   }
    // }

    this.fetchSubscription()
  },

  methods: {

    ...mapActions(useUserStore, ['updateUser', 'logout']),
    updateUserNow () {
      this.$axios.post('/api/auth/me').then(({ data }) => {
        this.updateUser(data.user)
      }).catch(() => {
        this.logout()
        this.$router.push(this.localePath('/auth/login'))
      })
    },
    paynow () {
      if (this.oneMonth === true) {
        this.form.type = 'one'
      }
      if (this.twoMonth === true) {
        this.form.type = 'six'
      }
      if (this.threeMonth === true) {
        this.form.type = 'year'
      }
      this.loading = true
      this.$axios.post('/api/subscribe', this.form).then(({ data }) => {
        this.loading = false
        if (data.message) {
          this.$toast.success(data.message)
        } else {
          window.location.href = data.checkout_url.url
        }
      }).catch(() => {
        this.loading = false
        this.$toast.error('Error while saving....')
      })
    },
    cancelNow () {
      this.cancel_loading = true
      this.$axios.post('/api/cancel-subscription').then(({ data }) => {
        this.cancel_loading = false
        if (data.success) {
          this.$toast.success('Subscription canceled successfully...')
          this.oneMonth = false
          this.twoMonth = false
          this.threeMonth = false

          this.subscription = ''
        }
      }).catch(() => {
        this.$toast.success('Subscription cancelation failed...')
        this.cancel_loading = false
      })
    },
    fetchSubscription () {
      this.$axios.post('/api/fetch-subscription').then(({ data }) => {
        this.subscription = data.name
        if (data.name === 'monthly') {
          this.oneMonth = true
          this.twoMonth = false
          this.threeMonth = false
        }
        if (data.name === 'sixmonth') {
          this.oneMonth = false
          this.twoMonth = true
          this.threeMonth = false
        }
        if (data.name === 'yearly') {
          this.oneMonth = false
          this.twoMonth = false
          this.threeMonth = true
        }
      })
    }
  }

}

// export default {
//   name: 'CardOnly',
//   data() {
//     return {
//       stripeKey: 'pk_test_0S0H9CTYtkhPlArgg4KkPFcZ',
//       instanceOptions: {},
//       elementsOptions: {},
//       cardOptions: {},
//       stripeLoaded: false,
//       card: null,
//       elms: null,
//       oneMonth:false,
//       twoMonth:false,
//       threeMonth:false,
//     };
//   },
//   components: {
//     StripeElements,
//     StripeElement,
//   },
//   beforeMount() {
//     const stripePromise = loadStripe(this.stripeKey);
//     stripePromise.then(() => {
//       this.stripeLoaded = true;
//     });
//   },
//   methods: {
//     pay() {
//       const cardElement = this.$refs.card.stripeElement;
//
//       this.$refs.elms.instance
//           .createPaymentMethod({ type: 'card', card: cardElement })
//           .then((result) => {
//         // console.log(result);
//         // console.log(result.paymentMethod);
//             this.$axios.post('/api/subscribe', result).then((response) => {
//           // console.log(response.data);
//             });
//           });
//     },
//   },
//   computed: {
//
//   },
//   created() {
//
//   },
// };
</script>
<style>
.active-sub{
  background: #E9C046;box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);border-radius: 12px;
  color:white;
  background-color:#E9C046 !important;
}
.sub-card{
  background: #FFFFFF;box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);border-radius: 12px;
  color:black;
}
</style>
