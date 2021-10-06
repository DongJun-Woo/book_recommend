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