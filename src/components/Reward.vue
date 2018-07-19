<template>
  <div class="reward mask">
    <div class="main">
      <div class="title">{{$t('home.exceptional')}}
        <i class="iconfont icon-guanbi" @click="cancel"></i>
      </div>
      <ul>
        <li>
          <label>EOS</label>
          <input type="text" :placeholder="bol==true?$t('home.placeholder3'):'0.0000'" v-model="amount" :class="{borderActive:bol==true}"/>

        </li>

      </ul>
      <div class="bnt">
        <button @click="cancel">{{$t('home.cancel')}}</button>
        <button class="active"  @click="determine">{{$t('home.determine')}}</button>
      </div>

    </div>
  </div>
</template>
<script>
  import EOS from 'eosjs'
  import tp from 'tp-js-sdk'
  export default {
    name: '',
    components: {},
    data() {
      return {
        content:'',
        amount:0.0100,
        bol:false
      }
    },
    props:['scatterEos','data','config','navigator'],
    watch:{
      amount(val,oldVal){
        if(val){
          this.bol=false;
          let str = eval("/^\\d+\\.?\\d{0,4}$/");
          this.amount= str.test(val)==true?val:oldVal;
        }

      }
    },
    created() {

    },
    mounted: function () {


    },
    methods: {
      cancel(){

        this.$emit('rewardHide',{
          type:'close'
        });
      },
      determine(){
        if(this.amount==''){
          this.bol=true;
          return false;
        }
        this.cancel();

        if(this.navigator==0){
          this.openclient();
          return false;
        }
        if(this.navigator==2){
          tp.eosTokenTransfer({
            from: sessionStorage.getItem('userName'), // 必填
            to: this.config.faith, // 必填
            amount: this.amount, // 必填
            tokenName: "EOS",
            memo:"2#"+this.data.id, // 选填
            precision: 4,
            contract: this.config.eosio,
          }).then(res=>{
            let data = JSON.parse(result);
            this.$emit('rewardHide',{
              type:'loading',
              content:this.$t('home.promt9')
            });
            let setTime = setTimeout(function () {
              this.$emit('rewardHide',{
                type:'close'
              });
              this.$emit('rewardHide',{
                type:'success',
                content:_this.$t('home.promt8')
              });
            },2000)

          })

          return false;
        }
        this.$emit('rewardHide',{
          type:'loading',
          content:this.$t('home.promt9')
        });
        var _this = this,amount = parseFloat(this.amount).toFixed(4)+ " EOS",memo = "2#"+this.data.id;
        const requiredFields = {
          accounts: [this.config.eosNetwork]
        }
        let setTime = setTimeout(function () {
          _this.scatterEos.contract(_this.config.eosio, {
            requiredFields
          }).then(contract => {
            _this.$emit('rewardHide',{
              type:'close'
            });
            contract.transfer(sessionStorage.getItem('userName'), _this.config.faith, amount,memo).then(t => {
              _this.$emit('rewardHide',{
                type:'success',
                content:_this.$t('home.promt8')
              });

            }).catch(e => {
              _this.$emit('rewardHide',{
                type:'failure',
                content:e.toString().includes("overdrawn balance")==true?_this.$t('home.promt2'):_this.$t('home.promt3')
              });
            })
          }).catch(e=>{
            _this.$emit('rewardHide',{
              type:'failure',
              content:e.toString().includes("overdrawn balance")==true?_this.$t('home.promt2'):_this.$t('home.promt3')
            });
          });
          clearTimeout(setTime);
        },5000)
      },
      openclient() {

        var data = new Object();
        data.type = 11;
        data.token = "EOS";
        data.memo = "2#"+this.data.id;
        data.amount =this.amount;
        data.address = this.config.faith;
        window.location = 'tp://mytokenpocket.vip/path?data=' + JSON.stringify(data)
      }
    }
  }

</script>

<style>

  .reward .main{
    background:rgba(255,255,255,1);
    border-radius:8px;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .reward  .title{
    text-align: center;
    color:rgba(91,94,99,1);
    font-size:16px;
    position: relative;
  }
  .reward .title .iconfont{
    font-size: 10px;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    color: #9e9d9d;
  }
  .reward li{
    overflow: hidden;
    position: relative;
  }
  .reward li label{
    width: 49px;
    display:block;

    line-height: 40px;
    color:rgba(91,94,99,1);
    font-size:14px;
  }

  .reward li input::placeholder{
    font-size:14px;
    color:rgba(174,177,183,1);

  }
  .reward li input{
    padding:0 50px 0 10px;
    height: 40px;
    line-height: 38px;
    font-size:14px;
    box-sizing: border-box;
    border-radius:5px;
    border: 1px solid #E5E5E5;
    outline: none;
  }
  .reward .bnt{
    text-align: center;
    margin-top: 21px;
  }
  .reward .bnt button{
    border-radius:5px;
    font-size:14px;
    border: 1px solid #E5E5E5;
    background: #fff;
    color:rgba(158,157,157,1);
    cursor: pointer;
    outline: none;
  }
  .reward .bnt button.active{
    background:rgba(42,108,222,1)!important;
    color:rgba(255,255,255,1)!important;
    border: 1px solid rgba(42,108,222,1);
    margin-left: 13px;
  }
  @media screen and (min-width:700px){
    .reward .main{
      width: 560px;
      height:210px;
      margin:-105px 0 0  -280px;
    }
    .reward  .title{
      padding: 30px;
    }
    .reward li{
      padding: 0 30px 10px 30px;

    }
    .reward li label{
      float: left;
    }
    .reward li input{
      width:450px;
    }
    .reward .bnt button{
      width: 100px;
      height:40px;

    }
  }
  @media screen and (max-width:700px){
    .reward .main{
      width: 90%;
      height:210px;
      margin:-105px 0 0 -45%;
    }
    .reward  .title{
      padding: 22px 0 4px 0;
    }
    .reward li input{
      width: 100%;
    }
    .reward .bnt button{
      width: 90px;
      height:30px;
    }
    .reward li{
      padding: 0 15px 10px 15px;

    }
  }
</style>
