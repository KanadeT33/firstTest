let autos = require("./autos");
let concesionaria = {
  autos: autos,

  buscarAuto: function (patente) {
    let autoBuscado = autos.filter(function (auto) {
      return auto.patente == patente;
    });
    if (autoBuscado[0] == undefined) {
      return null;
    } else if (autoBuscado[0].patente == patente);
    {
      return autoBuscado[0];
    }
  },
  venderAuto: function (patente) {
    let autoAVender = this.buscarAuto(patente);
    if (autoAVender != null) {
      autoAVender.vendido = true;
    }
    return "Auto vendido";
  },
  autosParaLaVenta: function () {
    let autosAMostrar = autos.filter(function (auto) {
      return auto.vendido == false;
    });
    return autosAMostrar;
  },
  autosNuevos: function () {
    let listaDeAutos = this.autosParaLaVenta();
    autos0km = listaDeAutos.filter(function (auto) {
      return auto.km < 100;
    });
    return autos0km;
  },
  listaDeVentas: function () {
    let ArrayDeGanancias = autos.filter(function (auto) {
      if (auto.vendido == true) {
        return auto;
      }
    });
    let arrayDeGananciasProcesado = [];
    for (let i = 0; i < ArrayDeGanancias.length; i++) {
      const element = ArrayDeGanancias[i].precio;
      arrayDeGananciasProcesado.push(element);
    }
    return arrayDeGananciasProcesado;
  },
  totalDeVentas: function () {
    let resultadoDeVentas = this.listaDeVentas();
    if (resultadoDeVentas.length == 0) {
      return 0;
    }
    let resultadoDeVentasProcesado = resultadoDeVentas.reduce(function (
      pv,
      cv
    ) {
      return pv + cv;
    });
    return resultadoDeVentasProcesado;
  },
  puedeComprar: function (auto, persona) {
    let valorDeLaCuota = auto.precio / auto.cuotas;
    if (
      auto.precio < persona.capacidadDePagoTotal &&
      persona.capacidadDePagoEnCuotas > valorDeLaCuota
    ) {
      return true;
    }
    return false;
  },
  autosQuePuedeComprar: function (persona) {
    let autosALaVenta = this.autosParaLaVenta();
    let listaDeAutosQuePuedeComprar = [];
    for (let i = 0; i < autosALaVenta.length; i++) {
      const element = autosALaVenta[i];
      if (this.puedeComprar(element, persona)) {
        listaDeAutosQuePuedeComprar.push(element);
      }
    }
    return listaDeAutosQuePuedeComprar;
  },
};

console.log(
  concesionaria.autosQuePuedeComprar({
    nombre: "Juan",
    capacidadDePagoEnCuotas: 1000000000,
    capacidadDePagoTotal: 100000000,
  })
);
