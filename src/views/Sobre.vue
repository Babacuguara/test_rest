<template>
    <div>
        <section class="about bg-container section" id="sobre">
        
            <div class="about__container bd-container bd-grid"><br><br><br><br>
                <h1 class="section-title logo">Conheça um pouco do Restaurante Babaçuguará</h1>
        <h2 class="section-subtitle logo">Aqui você encontra o melhor da culinária maranhense!</h2>
                <div class="about__chefs">
                    <div class="chefs">
                        <img src="../assets/img/frente_nome300.jpg" alt="imagem frente com nome" class="img__chefs">
                        <span>Frente da praia</span>
                    </div>

                    <div class="chefs">
                        <img src="../assets/img/frente_praia_cheia.jpg" alt="Chef George" class="img__chefs">
                        <span>Praia de Guarapiranguinha</span>
                    </div>

                </div>
                <div class="about__data">
                    <p class="section-text">O Restaurante Babaçuguará, nasceu de um grande sonho de trabalhar com a culinária maranhense, sonho que começou nos meados de 2004, quando adquirimos um terreno na Praia de Guarapiranguinha, São José de Ribamar.</p>
                    <p class="section-text">Somente foi fundado no ano de 2021, em frente há uma grande pandemia que se extendia pelo mundo, chamada de COVID-19.</p>
                    <p class="section-text">Desde a sua fundação o Restaurante Babaçuguará, cada dia vem conquistando sua clientela, com sua história focada em um bom atendimento e respeito ao cliente, e, amor pelo que faz.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>

<style scoped>
.about {
    background-color: rgba(100, 148, 237, 0.288);
}
.bg-container {
    /* width: 1200px; */
    background-color: #fff;
    /* display: flex; */
    padding: 2rem 0 2rem;
    margin-top: 1   rem;
    columns: 3;
}
.section-title,
.section-subtitle {
    margin-top: 3rem;
    text-align: center;
    color: #1f1d07;
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
.about__container {
    padding: 0 2rem;
}
.bd-container {
    max-width: 1024px;
    width: calc(100% - 2rem);
    margin: 0 auto;
}

.bd-grid {
    display: grid;
    gap: 1, 5rem;
}
.about__chefs {
    text-align: center;
    margin-top: 1.5rem;
}

.chefs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.chefs .img__chefs {
    width: 300px;
    transition: 0.4s;
}

.chefs .img__chefs:hover {
    transform: scale(1.1);
}

.chefs span {
    font-size: 0.813rem;
    color: #1f1d07;
    margin-top: 1rem;
}

.about__data {
    margin-top: 2rem;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #1f1d07;
}

.about__data .section-text {
    font-size: 1.rem;
    font-weight: 400;
    line-height: 32px;
}
</style>