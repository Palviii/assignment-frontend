<template>
  <div class="background">
    <div>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        width="426"
        height="290"
        rounded="lg"
      >
        <div class="account-class">Account Login</div>

        <v-text-field
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          hide-details
         
          v-model="email"
        ></v-text-field>

        <v-text-field
        v-model="password"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-outer="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal"> </v-card>

        <v-btn
          @click="login"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
        >
          Log In
        </v-btn>

        <v-snackbar v-model="showAlert" :timeout="5000" right top>
          {{ alertMessage }}
          <template v-slot:action="{ attrs, on }">
            <v-btn
              color="error"
              text
              v-bind="attrs"
              v-on="on"
              @click="closeAlert"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>
  
<script>
import "../style.css";

export default {
  name: "LoginView",
  data() {
    return {
      showAlert: false, // New property to track alert state
      alertMessage: "", // New property to store alert message
      email: "",
      password: "",
      visible: false,
      isAuthenticated: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
    };
  },

  methods: {
   
    login() {
      console.log("enetred");
      if (
        this.email === "inform2palvii@gmail.com" &&
        this.password === "password"
      ) {
        this.isAuthenticated = true;
        this.$router.push({ name: 'home' });
      
        console.log("User logged in!");
      } else {
        this.showAlert = true;
        this.alertMessage = "Invalid email or password";
      }
    },
    closeAlert() {
      // Close the alert
      this.showAlert = false;
    },
  },
};
</script>
<style scoped>
.loginclass {
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-class {
  font-size: 1.5rem;
  margin-bottom: 40px;
}
</style>