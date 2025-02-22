<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    note: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['deleteNote']);

const deleteNote = (id) => {
    emit('deleteNote', id);
}

</script>

<template>
    <div class="note-card-main-container">
        <input placeholder="Title" :value="note.title">
        <textarea placeholder="Start Writing Here">{{ note.description }}</textarea>
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