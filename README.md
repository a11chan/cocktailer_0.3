# COCKTAILER
### 럼 소개 및 칵테일 관련 체험행사 예약 사이트  
![siteLayoutImg](https://user-images.githubusercontent.com/85478918/151158178-5acbafdd-9165-4595-b6fd-41322eb7631a.png)


* Demo: https://cocktailer-allchan.herokuapp.com/  
(최초 접속 시 10~20초 소요)

#### 개발 목표
* 취향에 맞는 럼 선택필터 구현을 통한 소비자 구매 만족도 제고
* 오프라인 체험 예약 시스템을 통한 고객 대면 소통채널 활용


#### 프로젝트 담당 영역
* OUR RUMS(sub1.jsp)
* EXPERIENCES(sub3.jsp) 중 입력 폼
* 예약 게시판 및 관리자 페이지
* 본인 포함 총 4인 진행


#### 사용 기술
* HTML
* CSS
* jQuery
* Bootstrap
* MySQL
* JSP
* Maven


#### 주요 기능
* jQuery를 활용한 Taste Filter 구현  
![advan1](https://user-images.githubusercontent.com/85478918/151160109-aa6536a9-9d6a-4235-a07a-0b956d0f91e2.png)
~~~javascript
let targetClass;
	
  chevronAll.hide();
  targetList.hide();
  targetList2.hide();

  tasteFilter.click(function() {
    chevronAll.hide();
    targetList.hide();
    targetList2.hide();

    let targetValue = [];
    tasteFilter.filter(":checked").each(function() {
      targetValue.push("." + $(this).val());
    });
    targetClass = targetValue.join(", ");

    $(targetClass).fadeIn(); // 선택된 클래스 전부 표시(문서전체)
~~~


  

* Bootstrap을 활용한 입력폼 구현  
![advan2](https://user-images.githubusercontent.com/85478918/151161045-5fae9f56-f859-459c-b88f-672469350c39.png)
~~~html
<form class="app-form" method="post" action="/board/postProc.jsp">

    <div class="radioBox btn-group mb-2">
        <input type="radio" name="event" id="cClass" value="칵테일 클래스"
            class="btn-check" autocomplete="off" checked>
        <label for="cClass" class="btn btn-outline-secondary">칵테일 클래스</label>
        <input type="radio" name="event" id="fTour" value="럼 공장 투어"
            class="btn-check" autocomplete="off">
        <label for="fTour" class="btn btn-outline-secondary">럼 공장 투어</label>
        <input type="radio" name="event" id="rTasting" value="럼 시음 투어"
            class="btn-check" autocomplete="off">
        <label for="rTasting" class="btn btn-outline-secondary">럼 시음 투어</label>
    </div>

    <div class="inputSet1">
        <div class="inputSet">
            <input type="text" name="name" placeholder="신청자 닉네임(한글 또는 영문)"
                pattern="^[가-힣a-zA-Z]+$" required class="form-control mb-2" />
        </div>
        <div class="inputSet">
            <input type="tel" name="tel" placeholder="연락처 입력" maxlength="13"
                required class="form-control mb-2" />
        </div>
    </div>
~~~




* JSP를 활용한 예약 관리 게시판 구현  
* 관리자 비밀번호(P@ssW0rd) 입력 시 조회/수정/삭제 가능
![advan3](https://user-images.githubusercontent.com/85478918/151161713-fd04b11f-c75c-420b-9d86-21c1bf03f240.png)
~~~jsp
<table class="table table-striped table-hover text-center">
    <thead>
        <tr>
            <th scope="col">번 호</th>
            <th scope="col" class="subject">참여형태</th>
            <th scope="col">신청인</th>
            <th scope="col">방문일</th>
            <th scope="col">처리상태</th>
        </tr>
    </thead>
    <%
    for (int i = 0; i < numPerPage; i++) { // numPerPage(페이지당 출력되는 게시물)
        if (i == listSize)
            break;
        BoardBean bean = vlist.get(i);
        int num = bean.getNum();
        String event = bean.getEvent();
        String name = bean.getName();
        int member = bean.getMember();
        String vDate = bean.getvDate();
        String state = bean.getState();
    %>
        <tr>
            <td><%=totalRecord - ((nowPage - 1) * numPerPage) - i%></td>
            <td>
                <a href="javascript:read('<%=num%>')" class="readNum"><%=event%></a>
            </td>
            <td><%=name%></td>
            <td><%=vDate%></td>
            <td><%=state%></td>
        </tr>
    <%
    } // 게시물 컬럼 출력 끝
~~~


* 예약 처리를 위한 관리자모드 구현  
![adminImg](https://user-images.githubusercontent.com/85478918/151281112-59f62a3c-152e-4a1a-b268-73d83c78b33c.png)  
![admin2](https://user-images.githubusercontent.com/85478918/151281134-cc06ca75-54e0-4c63-97c9-a0b23cf189bb.png)  
~~~jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="cocktail.board.MemberBean"%>
<%
request.setCharacterEncoding("utf-8");
%>

<jsp:useBean id="bMgr" class="cocktail.board.BoardMgr"/>
<jsp:useBean id="bean" class="cocktail.board.BoardBean" scope="session"/><!-- 수정전 게시물 -->
<jsp:useBean id="upBean" class="cocktail.board.BoardBean"/>
<jsp:setProperty name="upBean" property="*"/>

<%
	MemberBean memBean = bMgr.getPass();
	String nowPage = request.getParameter("nowPage");
	String outPass = upBean.getPass( );//입력 비밀번호
	String inPass = memBean.getPass( );//초기 비밀번호
	if(outPass.equals(inPass)) {
		bMgr.updateState(upBean); //게시물 수정처리(DB에 등록)
		String url = "read.jsp?nowPage="+nowPage+"&num="+upBean.getNum( );
		response.sendRedirect(url);
	} else {
%>
	<script>
		alert("입력하신 비밀번호는 유효하지 않습니다.");
		history.back( );
	</script>
<%
	}
%>
~~~
