$(document).ready(function(e){

//몇개씩 보여줄지 정하는 변수(0넣으면 안됨)
var rowPerPage = 3;
//0을 넣었을때 오류검출
var zeroWarning = 'Sorry, but we cat\'t display "0" rows page. + \nPlease try again.'
if (!rowPerPage) {
	alert(zeroWarning);
	return;
}
//페이징 한번 삭제
$('#nav').remove();
var $manageTable = $('.manageTable');
//manageTable 클래스 밑에 nav 삽입
$manageTable.after('<div id="nav"></div>');

var $ui = $($manageTable).find('.userInfo');
var rowTotals = $ui.length;
//pageTotal은 페이지 수, Math.ceil(x/y)는 x/y값을 올림해주는 함수
var pageTotal = Math.ceil(rowTotals/ rowPerPage);
var i = 0;

for (; i < pageTotal; i++) {
	$('<a href="#"></a>')
			.attr('rel', i)
			.html(i + 1)
			.appendTo('#nav');
}

$ui.addClass('off-screen')
			.slice(0, rowPerPage)
			.removeClass('off-screen');

var $pagingLink = $('#nav a');
$pagingLink.on('click', function (evt) {
	evt.preventDefault();
	var $this = $(this);
	if ($this.hasClass('active')) {
		return;
	}
	$pagingLink.removeClass('active');
	$this.addClass('active');

	// 0 => 0(0*4), 4(0*4+4)
	// 1 => 4(1*4), 8(1*4+4)
	// 2 => 8(2*4), 12(2*4+4)
	// 시작 행 = 페이지 번호 * 페이지당 행수
	// 끝 행 = 시작 행 + 페이지당 행수

	var currPage = $this.attr('rel');
	var startItem = currPage * rowPerPage;
	var endItem = startItem + rowPerPage;

	$ui.css('opacity', '0.0')
			.addClass('off-screen')
			.slice(startItem, endItem)
			.removeClass('off-screen')
			.animate({opacity: 1}, 300);

});

$pagingLink.filter(':first').addClass('active');
})