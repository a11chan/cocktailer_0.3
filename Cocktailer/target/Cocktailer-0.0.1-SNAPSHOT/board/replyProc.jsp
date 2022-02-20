<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="cocktail.board.MemberBean"%>
<%
request.setCharacterEncoding("utf-8");
%>

<jsp:useBean id="bMgr" class="cocktail.board.BoardMgr"/>
<jsp:useBean id="updateBean" class="cocktail.board.BoardBean"/>
<jsp:setProperty name="updateBean" property="*"/>

<%
	MemberBean memBean = bMgr.getPass();
	String nowPage = request.getParameter("nowPage");
	String inputPassword = updateBean.getPass( );
	String firstPassword = memBean.getPass( );
	if(inputPassword.equals(firstPassword)) {
		bMgr.updateState(updateBean); //게시물 수정처리(DB에 등록)
		String url = "read.jsp?nowPage="+nowPage+"&num="+updateBean.getNum( );
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