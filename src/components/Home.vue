<script setup>

import NoteCard from './NoteCard.vue';
import { ref, reactive, onMounted } from 'vue';
import { auth, db } from "../firebase";
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import router from '@/router';

const data = reactive({
    notes: []
});

const queryCollectionSnapshot = ref(null);

const addNewNote = () => {
    addNote({
        id: data.notes.length + 1,
        title: '',
        description: ''
    });
}

const fetchNotes = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            router.push('/login');
            return;
        }
        const notesCollectionRef = collection(db, `users/${user.uid}/notes`);
        queryCollectionSnapshot.value = await getDocs(notesCollectionRef);
        queryCollectionSnapshot.value.docs.forEach(doc => {
            const docObj = doc.data();
            const noteAlreadyPresent = data.notes.filter(note => note.id === doc.id);
            if (!noteAlreadyPresent.length) {
                data.notes.unshift({
                    id: doc.id,
                    title: docObj.title,
                    description: docObj.description
                })
            }
        });
        console.log("Fetched notes");
    } catch (error) {
        console.log(error);
    }
};

const addNote = async (note) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            router.push('/login');
            return;
        }
        const notesCollection = collection(db, `users/${user.uid}/notes`);
        await addDoc(notesCollection, {
            title: note?.title ? note?.title : '',
            description: note?.description ? note?.description : '',
        });
        fetchNotes();
        console.log("Added note");
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateNote = async (note) => {
    if (note) {
        try {
            const user = auth.currentUser;
            if (!user) {
                router.push('/login');
                return;
            }
            const notesCollectionRef = collection(db, `users/${user.uid}/notes`);
            const querySnapshot = await getDocs(notesCollectionRef);
            const noteIdex = querySnapshot.docs.findIndex(doc => doc.id === note.id);
            if (noteIdex > - 1) {
                const noteDocRef = doc(db, `users/${user.uid}/notes`, note.id);
                await updateDoc(noteDocRef, {
                    title: note.title,
                    description: note.description
                });
            }
            console.log("Updated note");

        } catch (error) {
            console.log(error);
        }
    }
};

const handleDeleteNote = async (noteId) => {
    if (noteId) {
        try {
            const user = auth.currentUser;
            if (!user) {
                router.push('/login');
                return;
            }
            const noteDocRef = doc(db, `users/${user.uid}/notes`, noteId);
            await deleteDoc(noteDocRef);
            data.notes = data.notes.filter(note => note.id !== noteId);
            console.log("Deleted note");
        } catch (error) {
            console.log(error);
        }
    }
};

onMounted(fetchNotes);

</script>

<template>
    <div class="main-container">
        <p v-if="!data.notes.length" style="font-style: italic; font-size: 16px; margin-bottom: 32px;">Start capturing
            your ideas now—tap below!</p>
        <button @click="addNewNote">+ Add new note</button>
        <div class="row">
            <div v-for="note in data.notes" :key="note.id" class="col-md-4 note-container">
                <NoteCard :note="note" @deleteNote="handleDeleteNote" @updateNote="handleUpdateNote" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    margin: 50px;
}

@media screen and (max-width: 768px) {
    .main-container {
        margin: 25px 32px;
    }
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