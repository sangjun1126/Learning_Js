function addItem() {
    // ul 요소 가져옴
    let list = document.getElementById('todolist');
    // 입력값을 읽어옴.
    let todo = document.getElementById('item');
    // 새로운 li 요소를 생성
    let listitem = document.createElement('li');
    // li 요소에 들어갈 닫기 버튼 생성
    let xbtn = document.createElement('button');
  
    listitem.className = 'list-group-item list-group-item-action list-group-item-warning';
  
    xbtn.className = 'close';
    xbtn.innerHTML = '&times;';
    // close 버튼에 이벤트 처리
    xbtn.onclick = function(e) {
      // 이벤트가 발생한 li 요소를 구해서 ul 요소에서 제거
      let pnode = e.target.parentNode;
      list.removeChild(pnode);
    }
    // li 요소 구성
    listitem.innerText = todo.value;
    listitem.appendChild(xbtn);
    // ul 요소에 li 요소 추가
    list.appendChild(listitem);
  
    // 입력칸 비우기 및 포커스 이동
    todo.value = '';
    todo.focus();
  }