<script setup>

import NoteCard from './NoteCard.vue';
import { ref, reactive } from 'vue'

const isAddNewNote = ref(false);

const data = reactive({
    notes: []
});

const addNewNote = () => {
    isAddNewNote.value = true;
    data.notes.unshift(
        {
            id: data.notes.length + 1,
            title: '',
            description: ''
        }
    )
}

const handleDeleteNote = (event) => {
    if (event > -1) {
        data.notes = data.notes.filter(note => note.id !== event);
    }
}

</script>

<template>
    <div class="main-container">
        <p v-if="!data.notes.length" style="font-style: italic; font-size: 16px; margin-bottom: 32px;">Start capturing your ideas now—tap below!</p>
        <button @click="addNewNote">+ Add new note</button>
        <div class="row">
            <div v-for="note in data.notes" :key="note.id" class="col-md-4 note-container">
                <NoteCard :note="note" @deleteNote="handleDeleteNote"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    margin: 50px;
}
.row {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
}

.note-container {
    display: flex;
}

button {
    border: 1px solid #5d5d46;
    padding: 10px;
    background-color: unset;
    color: floralwhite;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    border: 0.5px solid #dbdb7f;
    background-color: rgb(0, 0, 0);
}
</style>