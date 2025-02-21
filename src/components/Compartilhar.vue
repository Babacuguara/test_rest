<template>
    <div>
        <section class="compartilhar">
            <div class="compartilhar__container">
                <h1 class="section-title">Compartilhe</h1>
                <!--     <p>#lovesalad</p> -->
                <div class="compartilhar__social">
                    <i class='bx bxl-instagram insta'></i>
                    <a
                        href="https://www.instagram.com/restaurante_babacuguara">
                        @babacuguara</a>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>

</script>


<style scoped>
.compartilhar {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-image: url(../assets/img/bg-compartilar.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.compartilhar__container .section-title {
    margin-top: 1.5rem;
}

.compartilhar__container p {
    font-weight: 700;
    font-size: 1.25rem;
}
.section-title {
    margin-top: 6rem;
    text-align: center;
    background-color: darkorange;
    width: 100%;
}

.compartilhar__social {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}
.compartilhar__social a,
.insta {
    font-weight: 400;
    font-size: 1.25rem;
    color: #fff;
}
.compartilhar__social:hover > .insta,
.compartilhar__social:hover > a{
    color: #1f1d07;
}

.compartilhar__social a,
.insta {
    font-weight: 400;
    font-size: 1.25rem;
    color: black;
}

.insta {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
}


    
</style>