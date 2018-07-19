<template>
  <div class="published mask">
    <div class="main">
      <div class="title">{{$t('home.publish')}}
        <i class="iconfont icon-guanbi" @click="cancel"></i>
      </div>
      <ul>
        <li>
          <!--<label>{{$t('home.nickname')}}</label>-->
          <input type="text" :placeholder="$t('home.nickname')" v-model="name" :class="{borderActive:nameBol==true}" :blur="nameChange" />
        </li>
        <li>
      <!--    <label>{{$t('home.content')}}</label>-->
          <textarea  :placeholder="$t('home.content')"  maxlength="200" v-model="content" :class="{borderActive:contentBol==true}" :blur="contentChange" ></textarea>
         <span><i>（</i>{{contLength}}/200<i>）</i></span>
        </li>
      </ul>

      <div class="bnt">
        <button @click="cancel">{{$t('home.cancel')}}</button>
        <button class="active" @click="determine">{{$t('home.determine')}}</button>
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
              name:'',
              nameBol:false,
              content:'',
              contentBol:false
            }
        },
        props:['navigator','config'],
        computed:{
          contLength(){
            return this.content==''?0:this.content.length;
          }
        },
        watch:{

        },
        created() {
        },
        mounted: function () {
         /* if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            // window.addEventListener("DOMContentLoaded", function(){
            //   document.getElementById("published").addEventListener('click',openclient,false);
            //
            // }, false);
            this.navigator=0;
          }*/
        },

        methods: {
          nameChange(val){
            this.nameBol =val==''?true:false;
          },
          contentChange(val){
            this.contentBol= val==''?true:false;
          },
          cancel(){
            this.$emit('publisheHide');
          },
          determine(){

            if(this.name==''||this.content==''){
              this.nameBol =this.name==''?true:false;
              this.contentBol = this.contentBol==''?true:false;
              return false;
            }
            if(this.navigator==0){
              this.openclient();
              return false
            }
            this.$emit('publisheHide',{
              name:this.name,
              content:this.content
            });
          },
          openclient() {
            let str = this.content;

            var data = new Object();
            data.type = 11;
            data.token = "EOS";
            data.memo =  "1#"+this.name+'#'+str.replace(/#/g, ' ');
            data.amount= 0.2000;
            data.address= this.config.faith;
              window.location = 'tp://mytokenpocket.vip/path?data=' + JSON.stringify(data)

          }

        }
    }
</script>

<style>

  .published .main{
    background:rgba(255,255,255,1);
    border-radius:8px;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .published  .title{
    text-align: center;
    color:rgba(91,94,99,1);
    font-size:16px;
    position: relative;
  }
  .published .title .iconfont{
    font-size: 10px;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    color: #9e9d9d;
  }
  .published li{
    overflow: hidden;
    position: relative;
  }
  .published li label{
    width: 75px;
    display:block;
    line-height: 40px;
    color:rgba(91,94,99,1);

  }
  .published li input::placeholder,.published li textarea::placeholder{
    color:rgba(174,177,183,1);
  }
  .published li input{
    padding:0 10px;
    height: 40px;
    line-height: 38px;
    font-size:14px;
    box-sizing: border-box;
    border-radius:5px;
    border: 1px solid #E5E5E5;
    outline: none;
  }
  .published li textarea{
    padding:5px 10px;
    border-radius:5px;

    font-size:14px;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
    resize:none;
    outline: none;
  }
  .published li span{
    color:rgba(174,177,183,1);
  }
  .published .bnt{
    text-align: center;
  }
  .published .bnt button{

    border-radius:5px;
    font-size:14px;
    border: 1px solid #E5E5E5;
    background: #fff;
    color:rgba(158,157,157,1);
    cursor: pointer;
    outline: none;
  }
  .published .bnt button.active{
    background:rgba(42,108,222,1)!important;
    color:rgba(255,255,255,1)!important;
    border: 1px solid rgba(42,108,222,1);
    margin-left: 13px;
  }
  @media screen and (min-width:700px){
    .published .main{
      width: 560px;
      height:380px;
      margin:-190px 0 0  -280px;
    }
    .published li label{

      float: left;
      font-size:14px;
    }
    .published li{
      padding: 0 40px 10px 40px;
    }
    .published li input{
      width:480px;
    }
    .published  .title{
      padding: 30px;
    }
    .published li textarea{
      width:480px;
      height: 150px;
    }
    .published li input::placeholder,.published li textarea::placeholder{
      font-size:14px;

    }
    .published li span{
      position: absolute;
      bottom: 18px;
      right: 45px;
      font-size:14px;
    }
    .published li span i{
      display: none;
    }
    .published .bnt{

      margin-top: 21px;
    }
    .published .bnt button{
      width: 100px;
      height:40px;

    }
  }
  @media screen and (max-width:700px){
    .published .main{
      width: 90%;
      height:340px;
      margin:-170px 0 0 -45%;
    }
    .published li{
      padding: 0 20px 10px 20px;

    }
    .published li label{
      font-size: 12px;
    }
    .published li input{
      width:100%;
    }
    .published  .title{
      padding: 30px 0 5px 0;
    }
    .published ul{
      margin-top: 20px;
    }
    .published li textarea{
      width:100%;
      height: 140px;
    }
    .published li input::placeholder,.published li textarea::placeholder{
      font-size:13px;

    }
    .published li span{
      position: absolute;
      bottom: 18px;
      right: 25px;
      font-size:12px;
      letter-spacing: 2px;
    }
    .published li span i{
      font-style:normal;
    }
    .published .bnt{

      margin-top: 10px;
    }
    .published .bnt button{
      width: 90px;
      height:30px;

    }
  }
</style>
