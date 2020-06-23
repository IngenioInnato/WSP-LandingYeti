Vue.component('contdown', {
  template: `
  <h1>{{remainSeconds}}</h1>
  `,
  props: ['deadline', 'simpleCountDown', 'finalMessage'],
  data() {
    return {
      deadline: new Date(this.deadline),
      now: new Date().now,
      simpleCountDown: this.simpleCountDown,
      currentTime: false,
      lastDate: false,
      finalMessage: ''
    }
  },
  computed: {
    remainTime() {
      return (new Date(this.deadline) - this.now + 1000) / 1000;
    },
    remainDays() {
      return Math.floor(this.remainTime / (3600 * 24));
    },
    remainHours() {
      return ('0' + Math.floor(this.remainTime / 3600 % 24)).slice(-2);
    },
    remainMinutes() {
      return ('0' + Math.floor(this.remainTime / 60 % 60)).slice(-2)
    },
    remainSeconds() {
      return ('0' + Math.floor(this.remainTime % 60)).slice(-2);
    }
  },
  methods: {},
  created() { // actualizar instancia
    // https://stackoverflow.com/questions/52836501/make-computed-vue-properties-dependent-on-current-time
    var self = this;
    setInterval(function() {
      self.now = Date.now()
    }, 1000)
  },
});
var app = new Vue({
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
      var formulario = document.querySelectorAll('.contacto');
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
      var menuAnchors = document.querySelector(".menu__anchor>ul");
      this.burger_active ? menuAnchors.style.display = 'flex' : menuAnchors.style.display = 'none';
    }
  },
})