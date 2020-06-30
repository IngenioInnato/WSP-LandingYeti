Vue.component('contdown', {
  template: /*html*/ `
    <div class="contdown pt-5" v-if="(this.remainTime > 0) && (this.simpleCountDown === 'true')">
      <h4>{{remainDays}}D : {{remainHours}}H : {{remainMinutes}}M : {{remainSeconds}}S</h4>
    </div>
    <div id="contador" class="d-flex justify-content-around" v-else-if="(this.remainTime > 0) && (this.simpleCountDown === 'false')">
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
    <div class="justify-content-center d-flex" v-else>
      <div class="d-inline-flex p-5 text-center bg-white border-rounded">
        <h2 class="text-dark">{{finalMessage}}</h2>
      </div>
    <div>
  `,
  props: ['deadline', 'simpleCountDown', 'finalMessage', 'minutesExtensionTime', 'extensionTimeMessage'],
  data() {
    // IDEA: Hacer una etensión de tiempo pero 1 hora antes en ves de 1 hora después.
    return {
      now: new Date().now,
      lastDate: false,
      condition_1: (this.remainTime > 0) && (this.simpleCountDown === 'true'),
      condition_2: (this.remainTime > 0) && (this.simpleCountDown === 'false')
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
      name: 'Nombre',
      phone: 'Teléfono',
      email: 'Email'
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
        SecureToken: "5e7262f5-9fef-45ea-aeab-6a2c91c84681 ",
        To: 'worldsolarpropr@gmail.com',
        From: "info@worldsolarprous.com",
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