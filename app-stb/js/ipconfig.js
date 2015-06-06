//------- IPアドレス設定画面用モジュール -------

//テスト用
var ipArray = ['192.168.109.36','192.168.109.85'];


//IP Addressリスト
var lsKeyIPAddressList = 'ip_address_list';

//getter
function getIPAddress(){
  var IPAddressList = new Array();
  IPAddressList = localStorage.getItem(lsKeyIPAddressList);
  return IPAddressList;
}

//setter
function setIPAddress(IPAddressList){
  localStorage.setItem(lsKeyIPAddressList, IPAddressList);
}

var configIPAddressList = new Array();


//数値を表す文字列かどうかチェックします。
//@return 有効な場合は true を返します。
function checkNumeric(value) {
  var numeric = unformatNumeric(trim(value));
  if (numeric == "") {
    return false;
  } else {
    return !isNaN(numeric);
  }
}

//有効なIPアドレスかどうかチェックします。
//@return 255以下の場合は true を返します。
function checkIP(value){
  if(value > 254){
    return false;
  }else{
    return true;
  }
}

//入力されたIPアドレスを画面に表示します
function loadIPAddress(){
    console.log("loadIPAddress");

  //ローカルストレージよりデータ取得
  var ipJOSN=getIPAddress();
  //JSON形式なので、parseして配列に戻す
  var itemXIP = JSON.parse(ipJOSN);

  if(itemXIP == null || itemXIP.length == 0){
      console.log("itemXIP = null");
    itemXIP=ipArray;
  }

  for(var y=1;y<3;y++){
    for(var x=1;x<5;x++){
      var idx=y+''+x+'';
      var ipItem = document.getElementById("netAdr"+idx);
      var separateXIP=itemXIP[y-1].split('.');
      ipItem.value = separateXIP[x-1];
    }
    
  }
}

//入力されたIPアドレスを保存します
function saveIPAddress(){
  for(var y=1;y<3;y++){
    var ipAddress ='';
    var addFlg = true;
    for(var x=1;x<5;x++){
      var idx=y+''+x+'';
      var ipItem = document.getElementById("netAdr"+idx);
      if (ipItem.value == "") {
        console.log('IPが不正：'+idx);
        addFlg = false;
      }else{
        if(checkIP(ipItem.value)){
          if(x==1){
            ipAddress=ipItem.value;
          }else{
            ipAddress=ipAddress+'.'+ipItem.value;
          }
        }else{
          console.log('IPが不正：'+idx);
          addFlg = false;
        }
      }
    }
    if(addFlg){
      configIPAddressList.push(ipAddress);
    }
  }
  if(configIPAddressList.length > 0){
    ipArray = configIPAddressList;
    setIPAddress(JSON.stringify(configIPAddressList));
  }
    console.log("saveIPAddress");
    closeConfig();
}  
  
//画面遷移用
function closeConfig(){
  //removeClass Config               
  $("#config-area").addClass("hideDiv");
    console.log("closeConfig");
}

//画面遷移用
function openConfig(){
  //removeClass Config               
  $("#config-area").removeClass("hideDiv");
}
  
$(document).ready(function(){
  var sv = document.getElementById("saveIP");
  sv.addEventListener("click", saveIPAddress, false);

  var ld = document.getElementById("loadIP");
  ld.addEventListener("click", loadIPAddress, false);
  
   loadIPAddress();
});
  
  
