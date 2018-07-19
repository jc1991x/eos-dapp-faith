<template>
    <div class="mask">
      <div class="promtWallet">

        <p>{{$t('home.promt4')}} <i class="iconfont icon-guanbi" @click="cancel"></i></p>
        <ul>
          <li>{{$t('home.promt5')}}</li>
          <li>{{$t('home.promt6')}}</li>
          <li>{{$t('home.promt7')}}</li>
        </ul>
        <div class="bnt">
          <button @click="cancel">{{$t('home.cancel')}}</button>
          <button @click="installation">{{$t("home.walletInstallation")}}</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "PromtWallet",
      methods: {
          cancel(){

            this.$emit('openWallet');
          },
        installation(){
          window.open('https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle');
          this.$emit('openWallet')
        }
      }
    }
</script>

<style scoped>
.promtWallet{

  background: #fff;
  border-radius:8px;
  position: absolute;
  top: 50%;
  left: 50%;

  box-sizing: border-box;
  text-align: center;
}
.promtWallet p i{
  position: absolute;

  right: 12px;
  color: #9e9d9d;
  cursor: pointer;
}
.promtWallet p{
  padding-bottom: 20px;
  font-weight: bold;
  position: relative;
}


.promtWallet .bnt button{

  font-size: 14px;
  border-radius: 5px;
  border: 0;
  margin-top: 10px;
  cursor: pointer;
  box-sizing: border-box;
  color: #9e9d9d;
  border: 1px solid #e5e5e5;
  background: #fff;
  outline: none;
}
.promtWallet button:last-child{
  color: #fff!important;
  background:#2a6cde;
  border: 1px solid #2a6cde;
  margin-left: 10px;
}

@media screen and (min-width:700px){
  .promtWallet{
    width: 560px;
    height: 260px;
    margin:-130px 0 0  -280px;
    padding: 50px 0 20px 0;
  }
  .promtWallet p{
    font-size: 30px;
  }
  .promtWallet p i{
    top: -38px;
  }
  .promtWallet li{
    padding-bottom: 12px;
    font-size: 16px;
  }
  .promtWallet .bnt button{
    width: 120px;
    height: 40px;
  }
}
@media screen and (max-width:700px){
  .promtWallet{
    width: 90%;
    height: 220px;
    margin:-110px 0 0 -45%;
  }
  .promtWallet p{
    font-size: 17px;
    padding: 25px 0 20px 0;
  }
  .promtWallet p i{
    top: 12px;
  }
  .promtWallet ul{
    padding: 0 10px;
  }
  .promtWallet li{
    padding-bottom: 3px;
    font-size: 12px;
    line-height: 1.6;
  }
  .promtWallet .bnt{
    padding-top: 10px;
  }
  .promtWallet .bnt button{
    width: 90px;
    height: 30px;
  }
}

</style>
