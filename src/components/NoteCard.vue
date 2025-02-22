<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const props = defineProps({
    note: {
        type: Object,
        default: null
    }
});

const noteObj = ref(props.note);

const emit = defineEmits(['deleteNote']);

const deleteNote = (id) => {
    emit('deleteNote', id);
}

const saveNote = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      errorMessage.value = "User not logged in!";
      return;
    }
    
    const notesCollection = collection(db, `users/${user.uid}/notes`);

    await addDoc(notesCollection, {
      title: noteObj?.title ?? '',
      description: noteObj?.description ?? '',
    });

    alert("Note saved!");
  } catch (error) {
    console.log(error);
  }
};

const saveTitle = (title) => {
    if (title !== noteObj.title) {
        noteObj.title = title;
        console.log(noteObj.title);
    }
}

const saveDescription = (description) => {
    if (description !== noteObj.description) {
        noteObj.description = description;
        console.log(noteObj.description);
    }
}

</script>

<template>
    <div class="note-card-main-container">
        <input @focusout="saveTitle(note.title)" placeholder="Title" v-model="note.title">
        <textarea @focusout="saveDescription(note.description)" placeholder="Start Writing Here" v-model="note.description">{{ note.description }}</textarea>
        <span @click="deleteNote(note.id)" class="trash-button"><i class="bi bi-trash3-fill"></i></span>
        <button @click="saveNote" >Save</button>
    </div>
</template>

<style scoped>
.note-card-main-container {
    width: 350px;
    height: 450px;
    border: 1px solid #9ba44b;
    margin-top: 32px;
    background-color: #faff69;
    overflow: hidden;
}

textarea {
    width: 96% !important;
    height: 74%;
    background: #faff69;
    padding: 15px;
    font-family: cursive;
    resize: none;
    border: none;
    font-size: 16px;
    padding-right: 17px;
    box-sizing: content-box;
}

input {
    width: 100%;
    height: 48px;
    background: #d8c264;
    border: none;
    padding: 15px;
    font-size: 20px;
    font-family: cursive;
}

textarea:focus,
input:focus {
    outline: none;
}

.trash-button {
    position: relative;
    float: right;
    bottom: 2px;
    right: 5px;
    color: #ff6464;
    font-size: 20px;
    cursor: pointer;
}
.trash-button:hover {
    color: red;
}
</style>