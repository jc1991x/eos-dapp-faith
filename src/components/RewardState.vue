<template>
    <div class="mask publishedState">
        <div class="main">
            <img src="../assets/images/publishe.png" v-if="data.type=='loading'"/>
           <img src="../assets/images/success.png" v-if="data.type=='success'"/>
           <img src="../assets/images/failure.png" v-if="data.type=='failure'"/>
          <img src="../assets/images/login.png" v-if="data.type=='login'"/>
           <i class="iconfont icon-dianzanhou" v-if="data.type=='give'"></i>
            <p>
              {{data.title}}<a :href="'https://explorer.eoseco.com/transactions/'+data.id"  target="_blank" v-if="data.id" >， TX ID：{{data.id.substring(0, 15)}}...</a>
            </p>
            <button v-if="data.type=='loading'" @click="closed">{{$t('home.hide')}}</button>
            <button v-if="data.type!='loading'&&data.type!='login'" @click="closed">{{$t('home.closed')}}</button>
            <div  class="bnt"  v-if="data.type=='login'">
              <button class="active" @click="closed">{{$t('home.closed')}}</button>
              <button @click="login">{{$t('home.login')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {

            }
        },
        props:['data'],
        created() {

        },
        mounted: function () {
        },
        methods: {
          closed(){
            this.data.id = '';
            this.$emit('stateHide');
          },
          login(){
            this.$emit('stateHide','login');
          }
        }
    }
</script>

<style>
  .publishedState .main{
    background:rgba(255,255,255,1);
    border-radius:8px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    text-align: center;
  }
  .publishedState .main img{
    margin: auto;
    display: block;
  }
  .publishedState .main i{
    font-size: 60px;
    color: #2a6cde;
  }

  .publishedState .main button{
    width: 100px;
    height: 40px;
    background: #2a6cde;
    color: #fff;
    font-size: 14px;
    outline: none;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
  }
  .publishedState .closed{
    background: #f44336!important;
  }
  .publishedState .main p a{
    color: #2a6cde;
  }
  .publishedState .active{
    background: #fff!important;
    border:1px solid #e5e5e5!important;
    color: #9e9d9d!important;
    margin-right: 10px;
  }
  @media screen and (min-width:700px){
    .publishedState .main{
      width: 560px;
      height: 260px;
      margin:-130px 0 0  -280px;
      padding: 35px 0 30px 0;
    }
    .publishedState .main img{
      width: 60px;
    }
    .publishedState .main p{
      font-size: 16px;

      color: #5b5e63;
      padding: 30px 0 50px 0;

    }
  }
  @media screen and (max-width:700px){
    .publishedState .main{
      width: 90%;
      height: 218px;
      margin:-109px 0 0  -45%;
      padding: 24px 0 30px 0;
    }
    .publishedState .main img{
      width: 50px;
    }
    .publishedState .main p{
      font-size: 13px;
      color: #5b5e63;
      padding: 20px 0 40px 0;

    }

  }
</style>
