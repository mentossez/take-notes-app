<script setup>
import router from "@/router";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";

const email = ref('akavathekar03@gmail.com');
const password = ref('Sanliash');

const registerUser = async () => {
  try {
    const login = true;
    
    const userCredential = login ? await signInWithEmailAndPassword(auth, email.value, password.value) : await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    auth.currentUser = user;

    await setDoc(doc(db, "users", user.uid), {
      email: email.value
    });

    alert("User registered successfully!");
    router.push('/home');

  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
    <h1>Login component</h1>
    <button @click="registerUser">Register</button>    
</template>