<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    note: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['deleteNote', 'updateNote']);

const deleteNote = (id) => {
    emit('deleteNote', id);
}

const updateNote = (note) => {
    emit('updateNote', note);
}

</script>

<template>
    <div class="note-card-main-container">
        <input @focusout="updateNote(note)" placeholder="Title" v-model="note.title">
        <textarea @focusout="updateNote(note)" placeholder="Start Writing Here"
            v-model="note.description">{{ note.description }}</textarea>
        <span @click="deleteNote(note.id)" class="trash-button"><i class="bi bi-trash3-fill"></i></span>
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

@media screen and (max-width: 768px) {
    .note-card-main-container {
        width: 150px !important;
        height: 230px !important;
    }

    textarea {
        width: 78% !important;
        height: 48% !important;
        padding: 16px !important;
    }

    .trash-button {
        bottom: -2px;
    right: 4px;
    font-size: 18px;
    }
}

textarea {
    width: 96%;
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