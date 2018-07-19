<template>
    <div class="help">
       <div class="main">
         <h1>新手创建EOS账号和登录钱包——Scatter使用指南</h1>
         <p>在EOS主网上进行转账、买卖RAM、投票等操作，都要求你有个属于自己的EOS主网账号。</p>
         <p> 由于创建账号需要用到ram，必须要一个已经有ram的账号才能创建。如果自己还没有任何账号，需找别人帮你创建。</p>
         <p>创建账号第1步，生成密钥对：自己保存好私钥，然后拿公钥去创建账号。</p>
         <p>这里先介绍如何用scatter生成公钥。</p>
         <h2>Scatter插件介绍</h2>
         <p>Scatter是一个浏览器插件式的EOS钱包，目前看来安全性不错，受过多个节点的推荐，如EOSNewYork，generEOS等，代码开源可查<a href="https://github.com/EOSEssentials/Scatter">https://github.com/EOSEssentials/Scatter</a></p>
          <p>Scatter安装（需连梯子）：<br><a href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle">https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle</a></p>
          <p>或在chrome商店搜索scatter安装。</p>

         <p> 安装完毕后，进入scatter：</p>
         <p style="font-weight:bold">第一步：输入密码，确认密码，创建一个新的scatter钱包</p>
         <img src="../assets/images/blobid0.png" style="max-width: 80%"/>
         <p style="font-weight:bold;margin-top: 50px">第二步：记下助记词。助记词非常重要，一定做好备份保管，以防scatter密码丢失。</p>
         <img src="../assets/images/blobid1.png" style="max-width: 80%"/>
         <p style="font-weight:bold;margin-top: 50px">第三步：生成密钥对</p>
         <img src="../assets/images/blobid2.png" style="max-width: 80%"/>
         <img src="../assets/images/blobid3.png" style="max-width: 80%;margin-top: 20px"/>
         <p style="font-weight:bold">点击generate key pair生成密钥。</p>
         <p style="font-weight:bold"> 注意：此处务必先点击【copy】，再点击【save】，然后将已复制到粘贴板的密钥对备份保存。错过此步，此后将无法导出明文私钥。</p>
         <img src="../assets/images/blobid4.png" style="max-width: 80%"/>
         <p style="font-weight:bold"> 第四步：复制公钥，让别人帮创建账户</p>
         <p>账户名必须是12位，只能用以下字符：</p>
         <p>12345abcdefghijklmnopqrstuvwxyz</p>
         <p>可在此处查询账号名是否已被占用：<a href="http://www.dappworld.com/api/v1/eos/account">http://www.dappworld.com/api/v1/eos/account</a></p>
         <img src="../assets/images/8.png" style="max-width: 100%"/>
         <p style="font-weight:bold"> 账号创建完毕且检查没有问题后，导入scatter：</p>
         <img src="../assets/images/blobid6.png" style="max-width: 80%"/>
         <img src="../assets/images/blobid5.png" style="max-width: 80%;margin-top: 20px"/>
         <p>选择EOS主网，选择创建密钥对时填入的名字，点击导入。</p>
         <img src="../assets/images/blobid8.png" style="max-width: 80%"/>
         <p>到此，你就已经登录了scatter钱包，在需要用到钱包进行转账、买卖内存等操作的地方，<span style="font-weight:bold">调起scatter登录即可。</span></p>
         <p style="font-weight:bold">注意：请务必妥善保管好你的scatter解锁密码、助记词、私钥。</p>
         <p style="font-weight:bold">如果你已有账号，要帮他人创建账号，访问 <a href="https://eostoolkit.io/">https://eostoolkit.io</a></p>
       </div>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        mounted: function () {
        },
        methods: {}
    }
</script>

<style>
  .help{
    width: 100%;
    height:100%;
    background: #f8f8f8;
    overflow: auto;
  }
  .help .main{
    line-height: 1.5em;
    color: #222;
    -webkit-text-size-adjust:none;
    min-width: 200px;
    max-width: 760px;
    margin: 0 auto;
    padding: 20px;
  }
  .help h1 {
    position: relative;
    padding-top: 1em;
    padding-bottom: 0.2em;
    margin-bottom: 1em;
    font-size: 2em;
    line-height: 1.2em;
    border-bottom: 1px dashed #e5e5e5;
  }
  .help p{
    margin-bottom: 0.8em;
    margin-top: 0.8em;
  }
  .help h2{
    padding-top: 0.8em;
    padding-bottom: 0.2em;
    border-bottom: 1px dashed #e5e5e5;
    display: block;
    font-size: 1.5em;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }
  .help a {
    color: #0072EF;
    text-decoration: none;
  }
  .help img{
    display: block;
  }
</style>
