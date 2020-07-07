Vue.component('contdown', {
  template: /*html*/ `
    <div class="contdown pt-5" v-if="(this.remainTime > 0) && (this.simpleCountDown === true) && ((this.restantMinutes - this.minutesExtensionTime) > 0 )">
      <h4>{{remainDays}}D : {{remainHours}}H : {{remainMinutes}}M : {{remainSeconds}}S</h4>
    </div>

    <div id="contador" class="d-flex justify-content-around" v-else-if="(this.remainTime > 0) && (this.simpleCountDown === 'false') && ((this.restantMinutes - this.minutesExtensionTime) > 0 )">
      <div class="contador__item item--dias bg-white text-center p-5 border-rounded flex-1">
        <h2>{{remainDays}}</h2>
        <h6 class="text-dark_blue">Días</h6>
      </div>
      <div class="contador__item item--horas bg-white text-center p-5 border-rounded flex-1">
        <h2>{{remainHours}}</h2>
        <h6 class="text-dark_blue">Horas</h6>
      </div>
      <div class="contador__item item--minutos bg-white text-center p-5 border-rounded flex-1">
        <h2>{{remainMinutes}}</h2>
        <h6 class="text-dark_blue">Minutos</h6>
      </div>
      <div class="contador__item item--segundos bg-white text-center p-5 border-rounded flex-1">
        <h2>{{remainSeconds}}</h2>
        <h6 class="text-dark_blue">Segundos</h6>
      </div>
    </div>

    <div class="justify-content-center d-flex" v-else-if="( (this.restantMinutes - parseInt(this.minutesExtensionTime)) <= 0 ) && (this.remainTime > 0)">
      <div class="d-inline-flex p-5 text-center bg-white border-rounded">
        <h2 class="text-dark">{{minutesExtensionMessage}}</h2>
      </div>
    </div>

    <div class="justify-content-center d-flex" v-else>
      <div class="d-inline-flex p-5 text-center bg-white border-rounded">
        <h2 class="text-dark">{{finalMessage}}</h2>
      </div>
    </div>
  `,
  props: {
    'deadline': {
      type: String,
      required: true
    }, 
    'finalMessage': {
      type: String,
      required: true
    }, 
    'simpleCountDown': {
      type: Boolean,
      required: false,
      default: true,
    }, 
    'minutesExtensionTime': {
      type: Number,
      required: false,
      default: 0,
    }, 
    'minutesExtensionMessage': {      
      type: String,
      required: false,
      default: "",  
    }
  },
  data() {
    // IDEA: Hacer una etensión de tiempo pero 1 hora antes en ves de 1 hora después.
    return {
      now: new Date().now,
      lastDate: false,
      // condition_1: (this.remainTime > 0) && (this.simpleCountDown === 'true') && ( (parseInt(this.minutesExtensionTime) - parseInt(this.remainMinutes)) > 0 ),
      // condition_2: (this.remainTime > 0) && (this.simpleCountDown === 'false'),
      // condition_3: ( (parseInt(this.minutesExtensionTime) - parseInt(this.remainMinutes)) <= 0 ) && (parseInt(this.remainMinutes) >= 0)
    }
  },
  computed: {
    remainTime() {
      // let time = (this.deadline - this.now + 1000) / 1000;
      /* Tiempo faltante para llegar está fecha limite en milisegundo y lo dividimos en 1000 transformandolo en segundos */
      return (new Date(this.deadline) - this.now + 1000) / 1000;
    },
    remainDays() {
      /* 3600 que tiene una hora y 24 horas que tiene un día */
      return Math.floor(this.remainTime / (3600 * 24));
    },
    remainHours() {
      /* Cuantos segundos hay en un hora (3600) y cuantas horas hay en un día (24) */
      return ('0' + Math.floor(this.remainTime / 3600 % 24)).slice(-2);
    },
    remainMinutes() {
      return ('0' + Math.floor(this.remainTime / 60 % 60)).slice(-2)
    },
    remainSeconds() {
      /* Math.floor redondea, y slice(-2) selecciona 2 últimos dígitos*/
      return ('0' + Math.floor(this.remainTime % 60)).slice(-2);
    },
    restantMinutes(){
      let x = new Date(this.deadline) - this.now;
      return Math.floor((x/1000/60) << 0);
    }
  },
  methods: {},
  created() { // actualizar instancia
    // https://stackoverflow.com/questions/52836501/make-computed-vue-properties-dependent-on-current-time
    let self = this;
    setInterval(function() {
      self.now = Date.now()
    }, 1000)
  },
});
let app = new Vue({
  el: '#app',
  data: {
    form: {
      name: '',
      phone: '',
      email: ''
    },
    ftab_active: true,
    burger_active: false
  },
  methods: {
    getDataForm() {
      // e.preventDefault;
      let formulario = document.querySelectorAll('.contacto');
      formulario.forEach(el => {
        el.innerHTML = /*html*/ `
          <div class="bg-light_blue p-5 text-center">
            <h2 class="text-white">¡Gracias por tu Reserva!</h2>
            <p class="text-white">En breves momentos te contactaremos</p>
          </div>
        `;
      });
      // console.log(this.form.name + " | " + this.form.phone + " | " + this.form.email)
      this.sendData(this.form);
    },
    sendData(data) {
      // 5e7262f5-9fef-45ea-aeab-6a2c91c84681 
      Email.send({
        SecureToken: "8a9ce791-d13b-44b0-8824-258b13a28660",
        To: 'leads@worldsolarprous.com',
        From: "leads@worldsolarprous.com",
        Subject: "Nueva Reservación Yeti",
        Body: `
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
    },
    burgerDisplay() {
      this.burger_active = !this.burger_active;
      let menuAnchors = document.querySelector(".menu__anchor>ul");
      this.burger_active ? menuAnchors.style.display = 'flex' : menuAnchors.style.display = 'none';
    }
  },
})