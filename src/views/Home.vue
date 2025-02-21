
<template>
    <div class="home_container">
        <div class="home_data">
            <h1 class="home_title">Bem vindo ao<span
                    class="logo"><br>Restaurante
                    Babaçuguará</span></h1><br>
            <h2 class="home_subtitle">Gosto tanto de comer, que meu
                lugar preferido é o Restaurante Babaçuguará
            </h2>
        </div>
        <div class="img_home">
            <img src="../assets/img/rest_p.jpg" alt="Foto principal"
                class="home_img">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* .home {
    padding: 2rem 0 2rem;
    margin-top: 1   rem;
    align-items: center;
    text-align: center;
    position: relative;
} */
.home_container {
    padding: 5rem 1rem;
    gap: 10PX;
    display: flex;
    /* background-color: gray; */
    /* height: 500px; */
    /* width: 100%; */
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
    /* flex-flow: column wrap; */
    /* justify-content: space-evenly; */
    justify-content: center;
    align-items: center;

}
/* .bd-container {
    max-width: 1024px;
    width: calc(100% - 2rem);
    margin: 0 auto;
    justify-content: center;
} */

/* .bd-grid {
    display: grid;
    display: flex;
    gap: 1, 5rem;
} */

.home_data {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1.5 rem;
    /* width: 500px;
    height: 500px; */
}
.home_title {
    font-size: 1.5rem;
    color: #1f1d07;
    align-items: center;
}

.home_title span {
    font-family: 'italiana', serif;
    font-size: 2rem;
    letter-spacing: 4px;
    color: #fff;
}
.home_subtitle {
    font-size: 1.3rem;
    font-weight: 500;
    color: #f53939;
    margin-bottom: 2.5rem;
    align-items: center;
    padding: 3rem;
}
.img_home {
    margin-top: auto;
}
.home__img {
        width: 100%;
}
.logo{
    font-family: 'italiana', serif;
    font-size: 1.rem;
    padding-top: 3rem;
    background: linear-gradient(to right, #fe0703 0%, #b97e18 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
/* @media (max-width: 450px){
    h2 {
        color: #b97e18;
    }
} */
@media (min-width: 768px) and (max-width: 1024px) {
    h2 {
        color: greenyellow;
    }
}
</style>