const number = Number(prompt('몇 명이 참가하나요??'));
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word= document.querySelector('#word');
const $order = document.querySelector('#order');

let word; // 제시어
let newWord; // 현재 단어

const onClickButton = () => {
    if(!word || word[word.length-1] === newWord[0]) {
        word = newWord; // 입력한 단어가 제시어가 됨
        $word.textContent = word; // 화면에 제시어를 표시함
        const order = Number($order.textContent);
        
        if(order + 1 > number) {
            $order.textContent = 1;
        } else {
            alert('올바르지 않은 단어입니다.');
        }

        $input.value = '';
        $input.focus();
    };

    const onInput = (event) => {
        newWord = event.target.value; // 입력한 단어를 현재 단어로
    }

    $button.addEventListener('click', onClickButton);
    $input.addEventListener('input', onInput)
}
