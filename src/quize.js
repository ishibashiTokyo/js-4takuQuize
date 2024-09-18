// json =
// [
//     {
//       "question": "What is the capital of France?",
//       "answers": ["New York", "London", "Paris", "Dublin"],
//       "description": "Paris is the capital of France."
//     }
// ]


var quize_data = [];
var quize_num = 0;

function initQuizeData() {
    let request = new XMLHttpRequest();
    request.open('GET', './quize.json');
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let json = JSON.parse(request.responseText);
            json.sort(() => {
                return Math.random() - 0.5;
            });
            quize_data = json;

            loadQuize();
        }
    };
};

function loadQuize() {
    if (quize_num >= quize_data.length) {
        document.getElementById('quize').style.display = 'none';
        document.getElementById('quize_end').style.display = 'block';
        return;
    }

    let question = quize_data[quize_num];


    document.getElementById('question').innerHTML = '';
    document.getElementById('answers').innerHTML = '';
    document.getElementById('result').textContent = '';
    document.getElementById('description').textContent = '';

    let question_element = document.createElement('p');
    question_element.innerHTML = nl2br(question.question);
    document.getElementById('question').appendChild(question_element);


    question.answers.forEach((answer) => {
        let answer_element = document.createElement('button');
        answer_element.textContent = answer;
        answer_element.className = 'list-group-item list-group-item-action';
        // data-bs-toggle="modal" data-bs-target="#resultModal"
        answer_element.dataset.bsToggle = 'modal';
        answer_element.dataset.bsTarget = '#resultModal';

        answer_element.onclick = () => {
            document.getElementById('resultModalDescription').innerHTML = '';

            if (answer === question.answers[0]) {
                document.getElementById('resultModalLabel').textContent = '正解';
                let result_element = document.createElement('p');
                result_element.innerHTML = nl2br(question.description);
                document.getElementById('resultModalDescription').appendChild(result_element);
            } else {
                document.getElementById('resultModalLabel').textContent = '不正解';
                let result_element = document.createElement('p');
                result_element.innerHTML = nl2br('正解は「' + question.answers[0] + '」です。\n\n' + question.description);
                document.getElementById('resultModalDescription').appendChild(result_element);
            }
        };
        document.getElementById('answers').appendChild(answer_element);
    });

    let answers = document.getElementById('answers');
    let answers_children = answers.children;
    let answers_children_array = Array.from(answers_children);
    answers_children_array.sort(() => {
        return Math.random() - 0.5;
    });
    answers.innerHTML = '';
    answers_children_array.forEach((child) => {
        answers.appendChild(child);
    });

    quize_num = quize_num + 1;
}

// 改行コードを改行タグに変換
function nl2br(str) {
    return str.replace(/\r\n|\r|\n/g, '<br>');
}

initQuizeData();

document.getElementById('next').onclick = () => {
    loadQuize(quize_num);
};
