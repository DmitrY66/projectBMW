const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, falseCallBack) => {
  const request = new XMLHttpRequest();
  request.open('POST', server);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200 || request.status === 201) {
      const response = JSON.parse(request.responseText);
      callBack(response.id);
    } else {
      falseCallBack(request.status);
      throw new Error(request.status);

    }
  });

  request.send(data)
};

const formHandler = (form) => {
  const smallElem = document.createElement('small');
  form.append(smallElem);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {};
    let flag = true;

    const buttonSubmit = form.querySelector('.button[type="submit"]');

    for (const elem of form.elements) {
      const { name, value } = elem;
      if (name) {
        if (value.trim()) {
          elem.style.border = '';
          data[name] = value.trim();
        } else {
          elem.style.border = '1px solid red';
          flag = false;
          elem.value = '';
        }
      }
    }

    if (!flag) {
      return smallElem.textContent = 'заполните все поля';
    }

    sendData(JSON.stringify(data),
      (id) => {
        smallElem.textContent = 'ваша заявка №' + id +
          '! в бижайшем веке мы вам перезвоним!';
        smallElem.style.color = 'green';
        buttonSubmit.disabled = true;

        setTimeout(() => {
          smallElem.textContent = '';
          buttonSubmit.disabled = false;
        }, 3000)
      },
      (err) => {
        smallElem.textContent = 'к сожалению у нас все пьяные, попробуйте подождать до завтра';
        smallElem.style.color = 'red';
      });
    form.reset();
  })
};

export default function sendForm() {

  const formElems = document.querySelectorAll('.form');

  formElems.forEach(formHandler);
  
}














