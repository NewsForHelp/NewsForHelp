//------- IPアドレス設定画面用モジュール -------

//IP Addressリスト
var lsKeyIPAddressList = 'ip_address_list';

//getter
function getIPAddress(){
  var IPAddressList = localStorage.getItem(lsKeyIPAddressList);
  return IPAddressList;
}

//setter
function setIPAddress(IPAddressList){
  localStorage.setItem(lsKeyIPAddressList, IPAddressList);
}

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
  if(checkNumeric(value)){
    if(value > 254){
    return false;
    }
  }
}

//入力されたIPアドレスを画面に表示します
function loadIPAddress(){
  for(var y=0;x<3;x++){
    var idx=x+''+y+'';
    var setIPAddress ='';
    for(var x=0;x<5;x++){
      var ipItem = document.getElementById("netAdr"+idx);
      ipItem.value = "";
    }
}

//入力されたIPアドレスを保存します
function saveIPAddress(){
  for(var y=0;x<3;x++){
    var idx=x+''+y+'';
    var setIPAddress ='';
    for(var x=0;x<5;x++){
      var ipItem = document.getElementById("netAdr"+idx);
      if(ipItem){
      if (ipItem == "") {
        alert('IPが不正です');
        return false;
      } else {
        if(checkIP(ipItem){
          setIPAddress=setIPAddress+ipItem;
        }else{
          alert('IPが不正です');
        }
      }
    }
    IPAddressList.add(setIPAddress);
  }
  ipArray = IPAddressList;
  setIPAddress(IPAddressList);
}

//画面遷移用
function closeConfig(){
  //removeClass Config               
  $("#video-area").removeClass("hideDiv");
  $("#config-area").addClass("hideDiv");
}

//画面遷移用
function openConfig(){
  //removeClass Config               
  $("#video-area").addClass("hideDiv");
  $("#config-area").removeClass("hideDiv");
}
                             

$(document).ready(function(){
  
  var sv = document.getElementById("saveIP");
  sv.addEventListener("click", saveIPAddress, false);

  var ld = document.getElementById("loadIP");
  ld.addEventListener("click", getIPAddress, false);
  
  
  
  
});

  