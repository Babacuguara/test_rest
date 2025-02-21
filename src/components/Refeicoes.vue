<template>
    <div class="card_cardapio" id="card_cardapio">
        <h2 class="card_subtitle">REFEIÇÕES</h2><br>
        
        <div class="card_principal">
            <div class="card_cardapio_container" v-for="p in produtos" :key="p.id">                
                <div class="card">
                    <div class="card_img">
                         <!-- Exibir a foto do produto -->
                        <img v-if="p.foto" :src="'http://localhost:3000/' + p.foto" alt="Foto do Produto" width="300">
                        <!-- <img v-if="p.foto" :src="`http://localhost:3000/uploads/${p.foto}`" alt="Foto do Produto" width="400"> -->

                    </div>
                    <div class="card_produto">
                        <h3>{{ p.nome }}</h3>
                        <div class="card_descripition">
                            <small>{{ p.descricao }}<span>...</span></small>
                        </div>
                    </div>
                    <div class="card_preco">
                        <span>R$ {{ p.preco }},00</span>
                    </div><br>
                    <!-- <div class="fechar_div">
                        <button class="fechar">
                            <a href="#fechar">Fechar</a>
                        </button>
                    </div> -->

                    <div class="card_pessoas">Serve <br>
                        <span>{{ p.qtpessoas }}</span><br>Pessoas<br>
                    </div>

                        <!-- <i class='bx bxs-cart card__cart'></i> -->
                    <!-- </a> -->
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {

    data () {
        return {
            id: this.$route.params.id,
            produtos: []
        }
    },
    mounted() {
        fetch("http://localhost:3000/produtos")
        .then(resp => resp.json())
        .then(data => this.produtos = data)
    }
}

</script>

<style scoped>
h2{
    position: sticky;
}
.card_cardapio{
    position: sticky;
    z-index: -1;
}
</style>