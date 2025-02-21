<template>
    <div class="footer">
        <footer class="bg-container">
            <div class="footer_container bd-container">
                <div class="company">
                    <h3 class="logo">Restaurante Babaçuguará</h3>
                </div>                
                <div class="addres">
                    <h3 class="footer_title">Endereço</h3>
                    <!-- <small class="footer_subtittle">Ilha de São Luis -
                        Maranhão</small> -->
                    <small class="footer_subtittle">Praia de Guarapiranguinha
                        - São José de Ribamar</small>
                    <small class="footer_subtittle">(98) 9 9169-8593</small>
                    <small
                        class="footer_subtittle">babacuguara@gmail.com</small>
                </div>
                <div>
                    <p>Desenvolvido por:</p>
                    <p>Raimundo Marques</p>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';

export default {
    name: 'App',
    components: {
        MenuIcon
    }

}
</script>

<style scoped>
.footer{
    background-color: burlywood;
}
.footer_container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}
.bd-container {
    max-width: 1024px;
    width: calc(100% - 2rem);
    margin: 0 auto;
}
.footer {
    padding: 0.2rem 0 0.2rem;
    margin-top: 0.1rem;
    columns: 3;
}
.logo{
    font-family:  'Italiana', serif;
    font-size: 1.5rem;
    padding-top: 1rem;
    background: linear-gradient(to right, #fe0703 0%, #b97e18 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.company,
.services,
.info,
.addres {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
}

.company .logo {
    font-family: 'Italiana', serif;
    font-size: 1rem;
    line-height: 29px;
    color: #fff;
    letter-spacing: 4px;
}

.company small {
    font-size: 0.813rem;
    color: #1f1d07;
}

.company .social__media a {
    font-size: 1.25rem;
    color: #1f1d07;
    border: .1rem solid #1f1d07;
    padding: .1rem;
    border-radius: 50%;
}

.company .social__media a:hover {
    color: #fff;
    border: .1rem solid #fff;
}
.footer_title {
    font-weight: 700;
    font-size: 1rem;
    line-height: 29px;
    color: #fff;
}
.footer_subtittle {
    font-size: 0.938rem;
    line-height: 22px;
    color: #1f1d07;
}
.footer p {
    font-size: 0.813rem;
    color: #fff;
    text-align: center;
}
.iconImg {
    width: 20px;
}
</style>