FORM_REQUEST_INFO = document.getElementById('FormSolicitarInfo');
INPUTS_FORM_REQUEST_INFO = document.querySelectorAll('#FormSolicitarInfo input');
inputName = document.getElementById('nombre');
inputPhone = document.getElementById('telefono');
inputEmail = document.getElementById('email');


const expressions = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letras y espacios, pueden llevar acentos. Minimo 1 y maximo 40 caracteres
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //
  telefono: /^[0-9+]{6,12}$/, //Solo números, minimo 7 y máximo 14 caracteres
};

let fieldsFormRequestInfo = {
  nombre : false,
  telefono : false,
  correo : false
};

const resetFieldsFormRequestInfo = ()=>{
  fieldsFormRequestInfo.nombre = false;
  fieldsFormRequestInfo.telefono = false;
  fieldsFormRequestInfo.correo = false;
};

const validateInputFormRequestInfo = (e)=>{
  switch (e.target.name) {
    case "nombre":
      validateField(expressions.nombre, e.target, e.target.name);
    break;

    case "telefono":
      validateField(expressions.telefono, e.target, e.target.name);
    break;

    case "correo":
      validateFieldNotRequired(expressions.correo, e.target, e.target.name);
    break;
  }
};

const validateTotalFormRequestInfo = (input)=>{
  switch (input.name) {
    case "nombre":
      validateField(expressions.nombre, input, input.name);
    break;

    case "telefono":
      validateField(expressions.telefono, input, input.name);
    break;

    case "correo":
      validateFieldNotRequired(expressions.correo, input, input.name);
    break;
   
  }
};

const validateField = (expressions, input, field)=>{
  if(expressions.test(input.value)){
    document.getElementById(field).classList.remove('inputIncorrect');
    document.getElementById(`msgErrorInput${field}`).classList.remove('msgErrorNOK');
    document.getElementById(`msgErrorInput${field}`).classList.add('msgErrorOK');
    fieldsFormRequestInfo[field] = true;
    
  } else {
    document.getElementById(field).classList.add('inputIncorrect');
    document.getElementById(`msgErrorInput${field}`).classList.remove('msgErrorOK');
    document.getElementById(`msgErrorInput${field}`).classList.add('msgErrorNOK');
    fieldsFormRequestInfo[field] = false;
  }
};
  

const validateFieldNotRequired = (expressions, input, field)=>{
  if(expressions.test(input.value) || !input.value ){
    document.getElementById(field).classList.remove('inputIncorrect');
    document.getElementById(`msgErrorInput${field}`).classList.remove('msgErrorNOK');
    document.getElementById(`msgErrorInput${field}`).classList.add('msgErrorOK');
    fieldsFormRequestInfo[field] = true;

  } else {
    document.getElementById(field).classList.add('inputIncorrect');
    document.getElementById(`msgErrorInput${field}`).classList.remove('msgErrorOK');
    document.getElementById(`msgErrorInput${field}`).classList.add('msgErrorNOK');
    fieldsFormRequestInfo[field] = false;
  }
  
};


INPUTS_FORM_REQUEST_INFO.forEach( input => {
  
  input.addEventListener('keyup', validateInputFormRequestInfo);  
  input.addEventListener('keyup', ()=>{
    console.log(input);
  });  
  input.addEventListener('blur', validateInputFormRequestInfo);  
});


FORM_REQUEST_INFO.addEventListener('submit', (e)=>{
  e.preventDefault();
  // console.log(e);
  INPUTS_FORM_REQUEST_INFO.forEach( input=>{
    validateTotalFormRequestInfo(input);
  });
  if (fieldsFormRequestInfo.nombre && fieldsFormRequestInfo.telefono && fieldsFormRequestInfo.correo){
    const data = {
      name : inputName,
      phone : inputPhone,
      email : inputEmail
    };

    console.log(data);
    
    resetFieldsFormRequestInfo();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Genial!',
      text: `Te contactaremos pronto.
      Los horarios de atención son de 9:00am - 6:00pm`,
      showConfirmButton: true,
      timer: 10000
    })
    FORM_REQUEST_INFO.reset();
  };
  
});