<script>

</script>

<template>
    <div class="not-found-container">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <router-link to="/login" class="home-button">Click here to login</router-link>
    </div>
</template>


<style>
body {
    background-color: #181818;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
}

.not-found-container {
    text-align: center;
    padding: 50px;
}

h1 {
    font-size: 100px;
    margin: 0;
}

p {
    font-size: 20px;
    margin-bottom: 20px;
}

.home-button {
    display: inline-block;
    background-color: transparent;
    color: white;
    border: 1px solid white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: 0.3s;
}

.home-button:hover {
    background-color: white;
    color: #181818;
}
</style>