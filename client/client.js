const handleResponse = async (response, method) => {
  const content = document.querySelector('#content');

  switch(response.status) {
    case 200: 
      content.innerHTML = `<b>Success</b>`;
      break;
    case 201:
      content.innerHTML = `<b>Created</b>`;
      break;
    case 204:
      content.innerHTML = '<b>Updated (No Content)</b>';
      break;
    case 400: 
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 404:
      content.innerHTML = `<b>Resource Not Found</b>`;
      break;
    default: 
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  
  if(method === 'get'){
    let obj = await response.json();
    console.log(obj);

    if(response.status === 200){
      let jsonString = JSON.stringify(obj.users);
      content.innerHTML += `<p>${jsonString}</p>`;
    } else{
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }
  else if(method === 'head') {
    content.innerHTML += '<p>Meta Data Received</p>';
  }
  else if(method === 'post'){
    let obj = await response.json();
    console.log(obj);

    if(obj.message){
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }
};

const requestUpdate = async (userForm) => {
  
  const url = userForm.querySelector('#urlField').value;
  const method = userForm.querySelector('#methodSelect').value;
  
  let response = await fetch(url, {
    method,
    headers: {
        'Accept': 'application/json'
    },
  });

  handleResponse(response, method);
};

const sendPost = async (nameForm) => {
  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');
  
  const nameField = nameForm.querySelector('#nameField');
  const ageField = nameForm.querySelector('#ageField');

  const formData = `name=${nameField.value}&age=${ageField.value}`;

  let response = await fetch(nameAction, {
    method: nameMethod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: formData,
  });

  handleResponse(response, nameMethod);
};

const init = () => {
  const userForm = document.querySelector('#userForm');
  const nameForm = document.querySelector('#nameForm')
  
  const getUsers = (e) => {
    e.preventDefault();
    requestUpdate(userForm);
    return false;
  }

  const addUser = (e) => {
    e.preventDefault;
    sendPost(nameForm);
    return false;
  }
  
  userForm.addEventListener('submit', getUsers);
  nameForm.addEventListener('submit', addUser)
};

window.onload = init;