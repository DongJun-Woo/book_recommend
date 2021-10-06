//관리자 회원관리 페이지 회원추가
var f = 0;
$(document).ready(function(){
	$('.insert-btn input').click(function(){
		if(f===0){
			$(this).attr('value','회원추가▲');
			f=1;
		}else{
			$(this).attr('value','회원추가▼');
			f=0;
		}
		$('.insertUser').toggleClass('flex');
	})
})

//회원가입 전화번호 입력
var autoHypenPhone = function(str){
      str = str.replace(/[^0-9]/g, '');
      var tmp = '';
      if( str.length < 4){
          return str;
      }else if(str.length < 7){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3);
          return tmp;
      }else if(str.length < 11){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 3);
          tmp += '-';
          tmp += str.substr(6);
          return tmp;
      }else{              
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 4);
          tmp += '-';
          tmp += str.substr(7);
          return tmp;
      }
  
      return str;
}


var phoneNum = document.getElementById('phoneNum');

phoneNum.onkeyup = function(){
  this.value = autoHypenPhone( this.value ) ;  
}

