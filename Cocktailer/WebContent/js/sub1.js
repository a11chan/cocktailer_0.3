$(function() {
	// navBar 메뉴 트리거
	$("#trigger").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$("#mainmenu").toggleClass("active");
	});
	
	
	// Taste 선택 효과 및 결과 표시 메서드
	let tasteName = $(".submenu input");
	let pickedItem = $(".itemShow > .itemBox");
	let pickedTasteName = $(".pickedBox > div > label");
	
	let allChevron = $(".chevron");
	let noseChevron = $(".pickedBox > .toLeft1, .pickedBox > .toRight1");
	let palateChevron = $(".pickedBox > .toLeft2, .pickedBox > .toRight2");
	let finishChevron = $(".pickedBox > .toLeft3, .pickedBox > .toRight3");
	let typeChevron = $(".pickedBox > .toLeft4, .pickedBox > .toRight4");

	let pickedItemClass;
	
	pickedItem.hide();
	pickedTasteName.hide();
	allChevron.hide();

	tasteName.click(function() {
		allChevron.hide();
		pickedItem.hide();
		pickedTasteName.hide();

		let targetValue = [];
		tasteName.filter(":checked").each(function() {
			targetValue.push("." + $(this).val());
		});
		pickedItemClass = targetValue.join(", ");
		$(pickedItemClass).fadeIn();

		if (pickedItemClass.match(".n_")) {
			noseChevron.fadeIn()
		} else {
			noseChevron.hide();
		}

		if (pickedItemClass.match(".p_")) {
			palateChevron.fadeIn()
		} else {
			palateChevron.hide();
		}

		if (pickedItemClass.match(".f_")) {
			finishChevron.fadeIn()
		} else {
			finishChevron.hide();
		}

		if (pickedItemClass.match(".t_")) {
			typeChevron.fadeIn()
		} else {
			typeChevron.hide();
		}

		if (pickedItemClass == "") {
			allChevron.fadeOut();
			$(".itemShow").fadeOut();
		}

	});

	
	// 검색 결과 출력 토글
	$(".itemShow").hide();
	$("#searchBtn").click(function() {
		if (!pickedItemClass) {
			alert("찾을 조건을 선택해주세요.");
			return false;
		} else $(".itemShow").fadeToggle();
	});


	// Taste Filter 라디오버튼 효과 적용
	$("#noseBtn").click(function() {
		$('input[name="taste"]').not("#noseBtn").prop("checked", false);
	});
	$("#palateBtn").click(function() {
		$('input[name="taste"]').not("#palateBtn").prop("checked", false);
	});
	$("#finishBtn").click(function() {
		$('input[name="taste"]').not("#finishBtn").prop("checked", false);
	});
	$("#typeBtn").click(function() {
		$('input[name="taste"]').not("#typeBtn").prop("checked", false);
	});

	
	// 선택된 Taste 이름 좌우 스크롤
	$(".toLeft1").click(function() {
		$("div.box1 > div.pickedNose").animate({
			scrollLeft : "-=100"
		}, 30, "swing");
	});
	$(".toRight1").click(function() {
		$("div.box1 > div.pickedNose").animate({
			scrollLeft : "+=100"
		}, 30, "swing");
	});
	$(".toLeft2").click(function() {
		$("div.box2 > div.pickedPalate").animate({
			scrollLeft : "-=100"
		}, 30, "swing");
	});
	$(".toRight2").click(function() {
		$("div.box2 > div.pickedPalate").animate({
			scrollLeft : "+=100"
		}, 30, "swing");
	});
	$(".toLeft3").click(function() {
		$("div.box3 > div.pickedFinish").animate({
			scrollLeft : "-=100"
		}, 30, "swing");
	});
	$(".toRight3").click(function() {
		$("div.box3 > div.pickedFinish").animate({
			scrollLeft : "+=100"
		}, 30, "swing");
	});
	$(".toLeft4").click(function() {
		$("div.box4 > div.pickedType").animate({
			scrollLeft : "-=100"
		}, 30, "swing");
	});
	$(".toRight4").click(function() {
		$("div.box4 > div.pickedType").animate({
			scrollLeft : "+=100"
		}, 30, "swing");
	});

});