<script setup>
import router from "@/router";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue';

const email = ref('');
const password = ref('');
const isValidEmail = ref(true);
const isValidForm = ref(false);
const showPassword = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref(false);
const isSignUp = ref(true);
const showSpinner = ref(false);

const validateUser = async (isExistingUser) => {
  try {
    showErrorMessage.value = false;
    showSpinner.value = true;
    const userCredential = isExistingUser ? await signInWithEmailAndPassword(auth, email.value, password.value) : await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    auth.currentUser = user;

    await setDoc(doc(db, "users", user.uid), {
      email: email.value
    });

    // showSpinner.value = false;
    router.push('/home');

  } catch (error) {
    showErrorMessage.value = true;
    if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
      errorMessage.value = 'User already present, please login!';
    } else if (error.message === 'Firebase: Error (auth/invalid-credential).') {
      errorMessage.value = 'Sorry, Email or Password is incorrect!';
    } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
      errorMessage.value = 'Password should be at least 6 characters';
    } else {
      errorMessage.value = 'Oops! Something went wrong, please try again!';
    }
    // showSpinner.value = false;
    console.log(error);
  }
};

const checkIfValidForm = () => {
  showErrorMessage.value = false;
  validateEmail();
  isValidForm.value = isValidEmail.value && password.value !== '';
}

const validateEmail = () => {
  isValidEmail.value = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value) && email.value !== '';
}
</script>

<template>
  <div class="container" :class="showSpinner ? 'is-loading' : ''">
    <h3 style="color: white; margin-bottom: 18px;">{{ isSignUp ? "Register" : "Login" }}</h3>

    <!-- Email Input -->
    <div class="input-group">
      <label>Email</label>
      <input type="email" placeholder="Enter your email" @keyup="checkIfValidForm" v-model="email" required />
      <p class="error-message" v-if="!isValidEmail">Please enter valid email</p>
    </div>

    <!-- Password Input -->
    <div class="input-group password-group">
      <label>Password</label>
      <input :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" @keyup="checkIfValidForm"
        v-model="password" required />
      <span class="eye-icon" @click="showPassword = !showPassword">
        {{ !showPassword ? '👁️' : '🙈' }}
      </span>
    </div>

    <!-- Buttons -->
    <button v-if="!isSignUp" @click="validateUser(true)" class="btn" :disabled="!isValidForm">
      Login
    </button>

    <button v-if="isSignUp" @click="validateUser(false)" class="btn" :disabled="!isValidForm">
      Sign Up
    </button>
    <p class="error-message font-14" style="margin-top: 12px; font-size: 12px;" v-if="showErrorMessage">{{ errorMessage
    }}</p>
    <!-- Toggle between Login and Register -->
    <p v-if="!isSignUp" class="register-link">
      Don't have an account? <a @click="isSignUp = true">Register</a>
    </p>
    <p v-if="isSignUp" class="register-link">
      Already have an account? <a @click="isSignUp = false">Login</a>
    </p>
  </div>
  <div v-if="showSpinner" class="pacman-spinner">
    <PacmanLoader color="#007bff" />
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #181818;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: #222;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  justify-self: anchor-center;
  margin-top: 10%;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  color: white;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #333;
  color: white;
  font-size: 14px;
  outline: none;
}

input:focus {
  border: 2px solid #555;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
  margin-top: 5px;
}

.font-14 {
  font-size: 14px !important;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #444;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.btn:disabled {
  background: #555;
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:hover {
  background: #666;
}

.register-link {
  margin-top: 15px;
  color: white;
  font-size: 14px;
}

.register-link a {
  color: #888;
  text-decoration: none;
  cursor: pointer;
}

.register-link a:hover {
  color: white;
  text-decoration: underline;
}

.password-group {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 33px;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

.is-loading {
  pointer-events: none;
  opacity: 0.3;
}

.pacman-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute !important;
  left: 0;
  top: 0;
}

</style>