<template>
  <div class="home">
    <vheader :scatter="scatter" :config = "config" ref="login" @init="init" @openWallet="openWallet" :getInfoData="getInfoData"></vheader>
    <div class="bannar">
      <img src="../assets/images/pc.png"/>
      <img src="../assets/images/mobile.png"/>
      <div class="bannarFont">
        <p>{{$t('home.title1')}}</p>
        <p>{{$t('home.blurb1')}}</p>
        <button @click="publish">{{$t('home.publish')}}</button>
      </div>
      <!--<button @click="transfer">转账</button>-->
    </div>

    <div class="tab">
      <ul>
        <li>
          <p>{{eosTotal|moneyFilters}}<span>EOS</span></p>
          <p>{{$t('home.contract')}}</p>
        </li>
        <li>
          <p>{{globalData.maxid+1}}<span>{{$t('home.layer')}}</span></p>
          <p>{{$t('home.floor')}}</p>
        </li>
        <li>
          <p>{{globalData.total_up}}<span>{{$t('home.individual')}}</span></p>
          <p>{{$t('home.give')}}</p>
        </li>
        <li>
          <p>{{globalData.total_share|moneyFilters}}<span>EOS</span></p>
          <p>{{$t('home.reward')}}</p>
        </li>
        <li>
          <p>{{globalData.faith_issue|moneyFilters}}<span>FAITH</span></p>
          <p>{{$t('home.faith')}}</p>
        </li>
      </ul>
    </div>

    <div class="content">
      <ul>
        <li v-for="(item,index) in list">
          <div class="item">
            <div  class="head">
              <img :src="item.owner|getRandomAvator"/><!--'../assets/images/icon/'+(item.id+1)+'.png'-->

            </div>
            <div class="left">
              <div class="first">
                <div  class="name">
                  <span> {{item.nick}}</span><span>{{item.owner}}</span>
                </div>
                <div class="right date">
                  {{item.id+1}}{{$t('home.building')}}
                  <span>{{item.timestamp | dateFileters}}</span>
                </div>
              </div>
              <div class="second">
                <div  class="cont">{{item.desc}}{{item.active}}</div>
                <div class="option">
                  <p class=" give" >
                    <span @click="money(item.id)" :class="{active:arrGive.indexOf(item.id)!=-1}"></span>
                    <a>{{item.ups}}</a>
                  </p>
                  <p class=" money" >
                    <span  class="active">EOS</span><a>{{item.value | moneyFilters}}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>

      </ul>
      <div v-if="list.length==0" class="empty">
        <i class="iconfont icon-empty"></i>
        <p>{{$t('home.noData')}}</p>
      </div>
    </div>

    <div class="more" @click="more" v-if="list.length>0">
      <span v-show="noData">{{$t('home.viewMore')}}</span>
      <span v-show="!noData">{{$t('home.noData')}}</span>
    </div>
    <vfooter></vfooter>
    <div class="announce">
      <button @click="publish">{{$t('home.publish')}}</button>
    </div>
    <transition name="fade">
        <published  v-show="publishedBol" @publisheHide="publisheHide" ref="published" :navigator="navigator" :config = "config"></published>
    </transition>
    <transition name="reward">
      <reward v-show="rewardBol" @rewardHide ="rewardHide" :scatterEos="scatterEos" :data="rewardData" :config = "config" :navigator="navigator" ref="reward"></reward>
    </transition>
    <transition name="published">
      <reward-state :data="state"   @stateHide = "stateHide"  v-show="state.bol"></reward-state>
    </transition>
    <transition name="wallet">
      <promt-wallet v-show="walletBol" @openWallet="openWallet"></promt-wallet>
    </transition>
    <guidance v-if="navigator==-1"></guidance>
  </div>
</template>
<script>
    import Vheader from '@/components/Header'
    import Vfooter from '@/components/Footer'
    import Published from '@/components/Published'
    import Reward from '@/components/Reward'
    import RewardState from '@/components/RewardState'
    import PromtWallet from '@/components/PromtWallet'
    import Guidance from '@/components/Guidance'
    import config from '@/assets/js/config'
    import EOS from 'eosjs'
    import moment from 'moment'
    export default {
        name: '',
        components: {
          Vheader,
          Vfooter,
          Published,
          Reward,
          RewardState,
          Guidance,
          PromtWallet
        },
        data() {
            return {
              navigator:'',
              publishedBol:false,
              rewardBol:false,
              stateBol:false,
              stateTitle:'',
              state:{
                type:'',
                id:'',
                title:'',
                bol:''
              },
              stateType:'',
              stateId:'',
              scatter:'',
              list:[],
              total:0,
              pageSize:10,
              pageIndex:1,
              eos:'',
              scatterEos:'',
              rewardData:{
                id:''
              },
              arrGive:'',
              globalData:{
                total_income:0,
                maxid:-1,
                total_up:0,
                total_share:'0 EOS'
              },
              config:config,
              noData:false,
              walletBol:false,
              getInfoData:{
                account_name:'',
                ram_usage:'',
                cpu_weight:'',
                balance:'',
                faith:''
              },
              eosTotal:''
            }
        },
        computed:{

        },
         filters:{
            nameFilters(val){
              return val.substring(0,1);
            },
            dateFileters(val){
              if(val){
                return  moment(val / 1000).format("YYYY-MM-DD HH:mm:SS");
              }
            },
           moneyFilters(val){
              if(val){
                let newVal = val.split(' ');
                return parseFloat(newVal[0])
              }else{
                return 0
              }
           },
           getRandomAvator(val){
              return  '/static/images/icon/' + (val.length)%9 + '.png'
           },
         },

        created() {

        },
        mounted: function () {
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            this.navigator = -1;
          }else if(window.TPJSBrigeClient){
            //android app
            //alert(0)
            this.navigator = 2;
          }else if(window.webkit){
            //ios app
            this.navigator = 3;
          }else if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            this.navigator = 0;
          }else{
            this.navigator = 1;
            document.addEventListener('scatterLoaded', scatterExtension => {
              this.scatter = window.scatter;
              window.scatter = null;
              this.scatter.requireVersion(3.0);
              this.scatterEos = this.scatter.eos(config.eosNetwork, EOS, config.eosOptions, "http");
              if(this.scatter.identity==null){
                sessionStorage.clear();
              }else {
                this.ups();
              }
            })
          }

          this.eos = EOS(config.eosOptions);
          this.global();
        },
        methods: {
          publish(){
            if(!this.scatter&&this.navigator==1){
              this.openWallet();
              return false;
            }
            if(this.scatter&&!this.scatter.identity){
              this.rewardHide({
                type:'login',
                bol:true,
                content:this.$t('home.promt1')
              })
              return false;
            }
            this.$refs.published.name='';
            this.$refs.published.content='';
            this.publishedBol = true;
          },
          publisheHide(data){
            if(data){
              this.publishedBol = false;
              if(this.navigator==0){
                return false;
              }
              if(this.navigator==2){
                this.androidAdd(data)
                return false;
              }
              this.addfaith(data)
            }else{
              this.publishedBol = false;
            }

          },
          money(id){
            if(!this.scatter&&this.navigator==1){
              this.openWallet();
              return false;
            }
            if(!this.scatter.identity&&this.navigator==1){
              this.rewardHide({
                type:'login',
                bol:true,
                content:this.$t('home.promt1')
              })
              return false;
            }
            if(this.arrGive.indexOf(id)>-1){
              this.state.type='give';
              this.state.title=this.$t('home.isGreat')
              this.state.bol =true;
              return false;
            }
            this.$refs.reward.amount=0.01;
            this.rewardData.id= id;
            this.rewardBol =true;
          },
          rewardHide(data){
            if(data.type=='close'){
              this.rewardBol =false;
              this.state.bol = false;
            }else if(data.type=='rewardClose') {

            }else{
                this.state.type = data.type;
                this.state.title = data.content;
                if(data.transactionId){
                  this.state.id = data.transactionId
                }
                if(data.type=='success'){
                  this.global()
                  this.ups();
                  //this.init();
                }
                this.state.bol = true;
              }
          },
          stateHide(type){
            if(type=='login'){
              this.$refs.login.login();
            }
            this.state.bol = false;

          },
          more(){
            if(this.noData){
              this.pageIndex+=1;
              this.init();
            }
          },
          init(type){
            if(type=='login'){
              this.ups();
              this.getInfo();
            }else if(type=='exit'){
              this.arrGive='';
            }else if(type=='addfaith'){
              this.total+=1;
            }
            let _this = this,lower =  _this.total-(_this.pageIndex*_this.pageSize)>0?_this.total-(_this.pageIndex*_this.pageSize):0;
            this.eos.getTableRows({
              json: "true",
              code: config.faith,
              scope: config.faith,
              table: 'faith',
              limit: _this.pageIndex*_this.pageSize,
              lower_bound:lower
            }).then((data) => {
             console.log(data)
              let arr = data.rows;
              _this.list = arr.reverse();
              _this.noData = data.more;
            }).catch((e) => {
              console.error(e);
            })

          },
          ups(){
            //true,config.faith, localStorage.getItem('userName'), "ups"
            let _this = this ;
            this.scatterEos.getTableRows({
              json: "true",
              code: config.faith,
              scope: sessionStorage.getItem('userName'),
              table: 'ups',
              limit: '1000',
            }).then((data) => {
              let arr  = data.rows,arrNew=[];
              arr.forEach(function (item,index) {

                arrNew[index]=item.faithid;
              })
              this.arrGive = arrNew.join('-');

            })
          },
          global(data){
            this.eos.getTableRows(true,config.faith,config.faith, "global").then((data) => {

              if(data.rows.length>0){
                this.globalData = data.rows[0];
                this.total = data.rows[0].maxid+1;
              }else {
                this.globalData={
                  total_income:0,
                  maxid:-1,
                  total_up:0,
                  total_share:'0 EOS'
                }
              }
              this.init();
              if(sessionStorage.userName){
                this.getInfo();
              }

            });
            this.eos.getCurrencyBalance({
              code: config.eosio,
              account: config.faith,
              symbol: config.symbol
            }).then(res=>{
              this.eosTotal = res[0];


              //console.log(res)
            },res=>{
              console.log(res)
            })
          },
          addfaith(data) {
            this.rewardHide({
              type: 'loading',
              content: this.$t('home.statement')
            })

            this.addfaithPc(data);
          },
          addfaithPc(data){
            let str=data.content,str1=data.name,_this = this,memo = "1#"+str1.replace(/#/g,' ')+'#'+str.replace(/#/g,' ');
            console.log(memo)
            const requiredFields = {
              accounts: [config.eosNetwork]
            }
            let setTime = setTimeout(function () {
              _this.state.bol = false;
              _this.scatterEos.contract(config.eosio, {
                requiredFields
              }).then(contract => {
                contract.transfer(sessionStorage.getItem('userName'), config.faith, config.amount,memo).then(t => {
                  _this.$refs.published.nameBol=false;
                  _this.$refs.published.contentBol=false;
                  _this.rewardHide({
                    type: 'success',
                    content: _this.$t('home.publishIt'),
                    transactionId:t.transaction_id
                  })
                  _this.global('addfaith')
                }).catch(e => {
                  console.log(e)
                  _this.rewardHide({
                    type: 'failure',
                    content: e.toString().includes("overdrawn balance")==true?_this.$t('home.promt2'):_this.$t('home.promt3')
                  })

                })
              }).catch(e => {
                console.log(e)
                _this.rewardHide({
                  type: 'failure',
                  content: e.toString().includes("overdrawn balance")==true?_this.$t('home.promt2'):_this.$t('home.promt3')
                })
              });
              clearTimeout(setTime)
            },5000)
          },
          openWallet(){
            this.walletBol=!this.walletBol;
          },
          getInfo(){
            this.eos.getAccount({
              account_name: sessionStorage.getItem('userName')
            }).then(res=>{
              this.getInfoData.account_name=res.account_name;
              this.getInfoData.ram_usage=res.ram_usage;
              this.getInfoData.cpu_weight=res.cpu_weight;

            },res=>{
              console.log('err')
            })
             this.eos.getCurrencyBalance({
              code: config.eosio,
              account: sessionStorage.getItem('userName'),
              symbol: config.symbol
            }).then(res=>{
               this.getInfoData.balance =(res[0].split(' '))[0];
               console.log(this.getInfoData)
            },res=>{
              console.log(res)
            })
            this.eos.getCurrencyBalance({
              code: 'keytothemoon',
              account: sessionStorage.getItem('userName'),
              symbol: "FAITH"
            }).then(res=>{
              this.getInfoData.faith =res[0];
              //console.log(res)
            },res=>{
              console.log(res)
            })
          },
          androidAdd(data) {
            this.state.bol = false;
           let str=data.content,str1=data.name,memo = "1#"+str1.replace(/#/g,' ')+'#'+str.replace(/#/g,' ');
            alert(memo)
            let params = {
              from: "joetothemoon", // 必填
              to: "keytothemoon", // 必填
              amount: config.amount1, // 必填
              tokenName: "EOS",
              memo:memo, // 选填
              precision: 4,
              contract: config.eosio,
            }
            window.TPJSBrigeClient.callMessage("eosTokenTransfer", JSON.stringify(params), this.eosTokenTransferCallback);
          },
          eosTokenTransferCallback(){
            let setTime = setTimeout(function () {
              this.rewardHide({
                type: 'success',
                content: _this.$t('home.publishIt'),
                transactionId:t.transaction_id
              })
            },2000)
          }

        }
    }

</script>

<style>
  .home {
    position: relative;
    width: 100%;
    min-height: 100%;
  }
  .home .bannar img{
    width: 100%;
  }
  .home .content li .head{
    text-align: center;
    border-radius: 50%;
    background:rgba(223,223,223,1);
    color:rgba(42,108,222,1);
    font-weight: bold;
    box-shadow: 0px 3px 6px 0px #b4b4b4 inset;
  }
  .home .content li .head img{
    width: 100%;
    height: 100%;
  }
  .home .first .name{
    color:rgba(42,108,222,1);
    font-size:16px;

  }
  .home .first .date{
    color:rgba(95,95,95,1);
    font-size:12px;
  }
  .home .give span{
    cursor: pointer;
  }

  .home .money span:first-child{
    margin-right: 8px;
  }
  .home .give span:first-child{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: top;
  }
  .home .give,.home .money{
    position: relative;
    color:rgba(158,157,157,1);
    vertical-align: text-bottom;
    display: inline-block;
  }
  .home .give a,.home .money a{
    line-height: 26px;

  }
  .home .money{
    vertical-align: top;
    text-align: right;
    line-height: 26px;
  }

  .home .money span:first-child{
    float: left;


  }
  .home .more{
    background:rgba(255,255,255,1);
    border-radius:8px;
    border:1px solid #E5E5E5;
    color:rgba(158,157,157,1);
    font-size:14px;
    text-align: center;

    -webkit-user-select: none;
    cursor: pointer;
  }
  .home .money i{
    font-size: 20px;
    color: #ffae00;
  }
  @media screen and (min-width: 700px){
    .home .bannar img:nth-child(2){
      display: none;
    }
    .home .give span.active{
      background: url("../assets/images/giveActive.png") center center no-repeat!important;
      background-size: 18px 20px;

    }
    .home .give span{
      background: url("../assets/images/give.png") center center no-repeat;
      background-size: 18px 20px;
    }
    .home .give,.home .money {
      font-size: 14px;
    }
    .home .give span:first-child{

      margin-right: 5px;
    }
    .home .give{
      padding-right: 10px;
    }
    .home .bannarFont{
      position: absolute;
      top: 22%;
      left: 0;
      right: 0;
      bottom: 10%;
    }
    .home .bannarFont p{
      color: #083075;
      font-weight: bold;
      text-align: center;
    }
    .home .bannarFont p:first-child{
      font-size: 50px;


    }
    .home .bannarFont p:nth-child(2){
      font-size: 26px;

      padding-top: 20px;
    }
  }
  @media screen and (max-width: 700px){
    .home .bannar img:nth-child(1){
      display: none;
    }
    .home .give span.active{
      background: url("../assets/images/giveActive.png") center center no-repeat!important;
      background-size: 14px 15px!important;
    }
    .home .give span{
      background: url("../assets/images/give.png") center center no-repeat;
      background-size: 14px 15px;
    }

    .home .give,.home .money {
      font-size: 12px;
    }
    .home .give span:first-child{
      margin-right: 3px;
    }
    .home .give{
      padding-right: 10px;
    }
    .home .bannarFont{
      position: absolute;
      top: 27%;
      left: 0;
      right: 0;
      bottom: 10%;
    }
    .home .bannarFont p{
      color: #083075;
      font-weight: bold;
      text-align: center;
    }
    .home .bannarFont p:first-child{
      font-size: 50px;


    }
    .home .bannarFont p:nth-child(2){
      font-size: 30px;
      padding-top: 15px;
    }

  }

  @media screen and (min-width: 1200px){
    .home{
      padding-bottom: 155px;
      box-sizing: border-box;
      padding-top: 62px;
    }
    .home .bannar{
      position: relative;

    }

    .home .bannar button{
      font-size:18px;
      color:rgba(255,255,255,1);
      width: 120px;
      height: 48px;
      position: absolute;
      bottom: 0%;
      margin-left: -60px;
      left: 50%;
      border: 0;
      background:rgba(42,108,222,1);
      border-radius:8px;
      outline: none;
      cursor: pointer;
    }
    .home .tab{
      width: 1212px;
      margin:50px auto 0 auto;
      overflow: hidden;
    }
    .home .tab li{
      width: 230px;
      height: 120px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      float: left;
      margin: 0 6px;
      padding: 33px 0;
      box-sizing: border-box;
      text-align: center;
    }
    .home .tab li p:first-child{
      font-size: 28px;
      color: #2a6cde;
      font-weight: bold;
      position: relative;
    }
    .home .tab li p:first-child span{
      position: absolute;
      top: 2px;
      font-size: 10px;
      padding-left: 5px;
    }
    .home .tab li p:last-child{
      font-size: 14px;
      color: #5b5e63;
      padding-top: 10px;


    }
    .home .content{
      width: 1200px;
      margin:35px auto 0 auto;
    }
    .home .content li{
      padding: 25px 0;
      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;
    }
    .home .content li .head{
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 36px;
      float: left;
      margin-right: 19px;

    }
    .home .first{
      padding-top: 7px;
      width: 1121px;
      overflow: hidden;
    }
    .home .first .name span{
      float: left;
    }
    .home .first .name span:last-child{
      color:rgba(158,157,157,1);
      font-size:12px;
      margin-left: 10px;

    }
    .home .give,.home .money {
      font-size: 12px;
    }
    .home .first .date span{
      color:rgba(158,157,157,1);
      font-size:12px;
      margin-left: 9px;
    }
    .home .second{
      margin-top: 13px;
    }
    .home .second .cont{
      width: 800px;
      color:rgba(91,94,99,1);
      line-height:23px;
      font-size:14px;
      float: left;
    }
    .home .option{
      float: right;
    }

    .home .more{
      margin:50px auto;
      width:140px;
      height:48px;
      line-height: 48px;
    }
    .home .announce{
      display: none;
    }
    .home .empty{
      padding: 150px 0 200px 0;
      text-align: center;

    }
    .home .empty i{
      font-size: 140px;
      color: #ccc;
    }
    .home .empty p{
      text-align: center;
      color: rgba(158,157,157,1);
      font-size: 14px;
      padding-top: 15px;
    }
   .home .bannarFont{
      position: absolute;
      top: 22%;
      left: 0;
      right: 0;
      bottom: 10%;
    }
    .home .bannarFont p{
      color: #083075;
      font-weight: bold;
      text-align: center;
    }
    .home .bannarFont p:first-child{
      font-size: 70px;


    }
    .home .bannarFont p:nth-child(2){
      font-size: 24px;

      padding-top: 20px;
    }
  }
  @media screen and (max-width: 1200px){
    .home{
      padding-bottom: 50px;
      padding-top: 44px;
    }
    .home .bannar {
    position: relative;
    }
    .home .bannar button{
      display: none;
    }
    .home .tab{
      overflow: hidden;
      border-bottom: 10px solid #e6e8ed;
      margin-bottom: 10px;
    }
    .home .tab li{
      padding: 20px 15px 19px 15px;
      border-bottom: 1px solid #e5e5e5;
      height: 90px;
      box-sizing: border-box;
      position: relative;
    }
    .home .tab li P:first-child{

      font-size: 25px;
      color: #2A6CDE;
      position: absolute;
      top: 40px;

    }
    .home .tab li p:first-child span {
      position: absolute;
      top: 2px;
      font-size: 10px;
      display: inline-block;
      width: 35px;
      padding-left:5px;
    }
    .home .tab li P:last-child{
      color: #7E8288;
      font-size: 10px;
      position: absolute;
      top: 20px;
    }
    .home .tab li:nth-child(2), .home .tab li:nth-child(5), .home .tab li:nth-child(3),.home .tab li:nth-child(4){
      width: 50%;
      box-sizing: border-box;
      float: left;
      border: 0;
    }
    .home .tab li:nth-child(2), .home .tab li:nth-child(4){
      border-right: 1px solid #e5e5e5;
    }
    .home .tab li:nth-child(2), .home .tab li:nth-child(3){
      border-bottom: 1px solid #e5e5e5;
    }
    .home .content li{
      padding-left: 15px;
    }
    .home .content li .item{
      padding: 15px 15px 15px 0;
      overflow: hidden;
      position: relative;
      border-bottom:1px solid #e5e5e5 ;
      box-sizing: border-box;
    }
    .home .content li .head{
      height: 40px;
      width: 40px;
      font-size: 20px;
      line-height: 40px;
      text-align: center;

      position: absolute;
      top: 15px;
    }
    .home .content li .left{
      padding-left: 50px;
      width: 100%;
      box-sizing: border-box;
    }
    .home .content li .name{
      font-size: 15px;
      float: left;
    }
    .home .first{
      padding-bottom: 10px;
      overflow: hidden;
    }
    .home .first .name span:first-child{
      display: block;
      font-size: 15px;
      color:#2a6cde;
      padding:5px 0 3px 0;
    }
    .home .first .name span:last-child{

      font-size: 10px;
      color: #9e9d9d;
    }
    .home .first .date span{
      position: absolute;
      bottom: 18px;
      left: 50px;
    }
    .home .cont{
      font-size: 14px;
      line-height: 1.6;
      color: #5b5e63;
      padding-bottom: 10px;
    }
    .home .option{
      text-align: right;
      vertical-align: bottom;
    }
    .home .option p{
      display: inline-block;
    }
    .home .more{
      margin:25px auto 15px auto;
    }
    .home .announce{
      height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .home .announce button{
      background: #2a6cde;
      color: #fff;
      font-size: 15px;
      border: 0;
      outline: none;
      width: 100%;
      height: 100%;
      letter-spacing: 2px;
    }
    .home .more{
      width:180px;
      height:40px;
      line-height: 40px;
    }
    .home .empty{
      padding: 50px 0 60px 0;
      text-align: center;

    }
    .home .empty i{
      font-size: 70px;
      color: #ccc;
    }
    .home .empty p{
      text-align: center;
      color: rgba(158,157,157,1);
      font-size: 12px;
      padding-top: 15px;
    }
  }

</style>
