<template>
    <header>
      <div class="main">
        <div class="left logo">
          <router-link to="/">
            <img src="../assets/images/logo.png">
            <span>{{$t('home.title')}}</span>
          </router-link>
        </div>
        <div class="right menu">
          <img src="../assets/images/menu.png" @click="openMenu"/>
          <div class="maxMenu" :class="{active:menuBol==true}" @click="openMenu">
            <ul>
              <li><a href="/static/myfaith_white_paper.html" target="_blank">{{$t('home.book')}}</a></li>
              <li><router-link  target="_blank"  to="/help">{{$t('home.help')}}</router-link ></li>
              <li>
                <div style="width: 50px">
                  <a v-show="langBol"  @click="choseLang">中文</a>
                  <a v-show="!langBol"  @click="choseLang">English</a>
                </div>
              </li>
              <li >
                <button v-if="isLogin" @click="login">{{$t('home.login')}}</button>
                <div class="login" v-else @mouseout.stop="openSelect(false)" @mouseover.stop="openSelect(true)">
                  <img :src="userName|getRandomAvator" />
                 <!-- <p @click="getRandomAvator()"> {{userName| filtersName}} </p>-->
                  <transition name="select">
                    <div class="select" v-show="selectBol" >
                      <div class="main">
                        <p>{{$t('home.account')}}：{{getInfoData.account_name}}</p>
                        <p>{{$t('home.balance')}}：{{getInfoData.balance}}</p>
                        <p>CPU：{{getInfoData.cpu_weight}}</p>
                        <p>RAM：{{getInfoData.ram_usage}}</p>
                        <p>FAITH：{{getInfoData.faith|moneyFilters}}</p>
                        <p @click="exit" class="exit">{{$t('home.exit')}}</p>
                        <div class="triangle">
                          <i></i>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
              isLogin:true,
              userName:'',
              menuBol:false,
              selectBol:false,
              langBol:true
          }
        },
        filters:{
          filtersName(val){
            return val.substring(0,1);
          },
          getRandomAvator(val){
            return  '/static/images/icon/' + (val.length)%9 + '.png'
          },
          moneyFilters(val){
            if(val){
              let newVal = val.split(' ');
              return parseFloat(newVal[0])
            }
          },
        },
        props:['scatter','config','getInfoData'],

        created() {
          console.log(localStorage.getItem('lang'))
          this.langBol = localStorage.getItem('lang')!='en-US'?true:false

        },
        mounted: function () {
          this.bodyListener = e => {
            this.selectBol = false;
          };
          document.body.addEventListener("click", this.bodyListener, false);
          if(sessionStorage.getItem('userName')!=undefined&&sessionStorage.getItem('userName')!=''){
            this.userName = sessionStorage.getItem('userName');
            this.isLogin = false;
          }
        },
      beforeDestroy() {
        document.body.removeEventListener("click", this.bodyListener);
      },
        methods: {
          openMenu(){
            this.menuBol=!this.menuBol;
          },
          login(){

            if(!this.scatter){
              this.$emit('openWallet');
              return false;
            }
            this.scatter.getIdentity({ accounts: [this.config.eosNetwork] }).then(identity => {
              this.initLogin(identity);
              this.$emit('init','login')
            }).catch(e=>{
              console.log(e)
            })
          },
          initLogin(identity){
            const account  = identity.accounts.find(acc => acc.blockchain === 'eos');
            this.isLogin = false;
            this.userName = account.name;
            sessionStorage.setItem('userName',account.name);
          },
          exit(){
            this.scatter.forgetIdentity().then(() => {
              sessionStorage.clear();
              this.isLogin = true;
              this.$emit('init','exit')
            }).catch(e=>{

              console.log(e)
            });
          },
          openSelect(bol){
            this.selectBol=bol;
          },
          choseLang(){
            this.langBol = !this.langBol;
            this.$store.state.locale = this.langBol==true?'zh-CN':'en-US';
            localStorage.setItem('lang',this.langBol==true?'zh-CN':'en-US');
            this.$i18n.locale = this.langBol==true?'zh-CN':'en-US';

          }

        }
    }
</script>

<style>
  header{
    width: 100%;
    background: #fff;
    box-shadow: 0px 2px 10px  #dad6d1;
    position: fixed;
    left: 0;
    z-index: 9;
    top: 0;
  }
  header .logo img{
    display: block;
    float: left;
  }
  header span{
    display: block;
    float: left;
  }

  header .select .main{
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
    display: block;
  }
  header .select p{
    list-style: none;
    line-height: 36px;
    background: #fff;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    outline: 0;
  }
  header .select p.exit{
    border-top: 1px dashed #ccc;
  }
  header .select p:hover{
    color: #0366d6;
  }
  header .select .triangle{
    position: absolute;
    top: -2px;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #ebeef5;/*//ebeef5*/
    border-width: 6px;
    -webkit-filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
    filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
  }
  header .select .triangle  i{
    position: absolute;
    top: -5px;
    right: -6px;
    display: block;
    width: 0;
    height: 0;
    border-width: 6px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #fff;
  }
  header .select{
    position: absolute;
    top: 38px;
    padding: 10px;
    height: 230px;
    overflow: hidden;
  }
  header .select .main{
    width: 160px;
    background: #fff;
    padding:5px 10px;
    height: 215px;
  }

  @media screen and (max-width: 560px){
    header .maxMenu li:last-child{
      display: none;
    }

  }
  @media screen and (min-width: 1200px){
    header{
      height: 62px;

    }
    header .main{
      width: 1200px;
      margin: auto;
    }
    header .logo img{
      height: 45px;
      width: 45px;
      margin: 8px 7px 8px 0;

    }
    header span{
      line-height: 62px;
      font-size: 14px;
      color:rgba(39,41,46,1);
      font-size: 16px;

    }
    header .menu>img{
      display: none;
    }
    header .menu li{
      float: left;
      line-height: 62px;
      margin-left: 50px;
    }
    header .menu li:last-child{
      margin-left: 30px;
    }
    header .menu li a{
      font-size:14px;
      color:rgba(64,64,64,1);
      cursor: pointer;
    }
    header .menu li button{
      width: 60px;
      height: 32px;
      border-radius:4px;
      border: 0;
      background:#2a6cde;
      color: #fff;
      font-size: 14px;
      outline: none;
      cursor: pointer;
    }
    header .login{
      cursor: pointer;
      position: relative;
    }
    header .login img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
      margin: 11px 0;
    }
    header .select{
      left: -155px;
    }
    header .select .triangle{
      right: 40px;
    }
  }
  @media screen and (max-width: 1200px){
    header{
      height: 44px;
      line-height: 44px;

    }
    header .logo img{
      height: 30px;
      margin: 7px 8px 7px 10px;
    }
    header .logo span{
      vertical-align: top;
      font-size: 18px;
      color: #2A6CDE;
    }
    header .menu{
      position: relative;
    }
    header .menu>img{
      width: 20px;
      height: 16px;
      margin:14px  15px 14px 0;
      cursor: pointer;
      display: block;
    }
    header .menu ul{
      position: absolute;
      top: 0;
    }
    header .maxMenu{
      position: fixed;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.4);
      display: none;
    }
    header .maxMenu.active{
      display: block;
    }
    header .maxMenu ul{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 14px;

    }
    header .maxMenu li{
      border-top:1px solid #e5e5e5;
      line-height: 44px;
      background: #fff;
      padding: 0 15px;
      color: #5f5f5f;

    }
    header .maxMenu li button{
      border: 0;
      padding: 0;
      text-align: left;
      color: #5f5f5f;
      background: #fff;
      font-size: 14px;
    }
    header .maxMenu li div,header .maxMenu li a{
      color: #5f5f5f;
    }
    header .menu .login{
      height:45px ;
      position: relative;
    }
    header .menu .login img{
      height: 35px;
      width: 35px;
      margin: 5px 0;
      cursor: pointer;
    }
    header .select .triangle{
      left: 20px;
    }
    header .select{
      left: -10px;
    }
  }

</style>
