Vue.component({
  template: `
  
  `,
  data(){
    return{

    }
  },
  methods:{

  }
})
const app = new Vue({
  el: '#app',
  data: {
    form:{
      name: 'Nombre',
      phone: 'Teléfono',
      email: 'Email'
    },
    tab_data: [
      {
        obj_1:'1 Batería de lítio Goal Yeti',
        obj_2: ''
      }
    ]
    ,
    ftab_active: true
  },
  methods: {
    getDataForm(){
      // e.preventDefault;
      var formulario = document.querySelectorAll('.contacto');
      formulario.forEach(el => {
        el.innerHTML = /*html*/`
          <div class="bg-light_blue p-5 text-center">
            <h2 class="text-white">¡Gracias por tu Reserva!</h2>
            <p class="text-white">En breves momentos te contactaremos</p>
          </div>
        `;
      });
      // console.log(this.form.name + " | " + this.form.phone + " | " + this.form.email)
      this.sendData(this.form);
    },
    sendData(data){
      // 5e7262f5-9fef-45ea-aeab-6a2c91c84681 
      Email.send({
        SecureToken : "5e7262f5-9fef-45ea-aeab-6a2c91c84681 ",
        To : 'worldsolarpropr@gmail.com',
        From : "info@worldsolarprous.com",
        Subject : "Nueva Reservación Yeti",
        Body : `
        <h1>Datos dados por el usuario</h1>
        <p>Nombre: ${data.name}. <br>
        Teléfono: ${data.phone}. <br>
        Email: ${data.email}.
        </p>
        `
    }).then(
      message => console.log("Mensaje Enviado Correctamente " + message)
    ).catch(
      message => console.log("Error: " + message)
    );
    }
  },
  computed: {}
})