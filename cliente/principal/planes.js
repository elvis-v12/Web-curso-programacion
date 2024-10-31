import { PlanService } from "../../server/script/service/planes.js";
import { Carrito } from "../carrito.js";

document.addEventListener('DOMContentLoaded', () => {
      new Index();
});

class Index {
      planService = new PlanService();

      constructor() {
            this.init();
      }

      init() {
            this.priceComparison = document.querySelector('.price-comparison');

            if (!this.priceComparison) {
                  console.error("Elemento '.price-comparison' no encontrado en el DOM.");
                  return;
            }

            let planes = [
                  {
                        "code": "PL001",
                        "name": "Básico",
                        "tipoModeda": "S",
                        "cantidad": 1,
                        "tiempoPago": "mes",
                        "cantidadVendida": 10,
                        "price": 200,
                        "tiene": [
                              "Contenido profesional y actualizado",
                              "Certificados digitales"
                        ],
                        "noTiene": [
                              "English Academy, Escuela de Startups, Liderazgo y Management",
                              "Eventos exclusivos como Platzi Conf",
                              "Descarga contenido en la app móvil",
                              "Certificados físicos para rutas de perfil profesional"
                        ]
                  },
                  {
                        "code": "PL002",
                        "name": "Avanzado",
                        "tipoModeda": "S",
                        "cantidad": 2,
                        "tiempoPago": "mes",
                        "cantidadVendida": 100,
                        "price": 350,
                        "tiene": [
                              "Contenido profesional y actualizado",
                              "Certificados digitales",
                              "English Academy, Escuela de Startups, Liderazgo y Management",
                              "Eventos exclusivos como Platzi Conf",
                              "Descarga contenido en la app móvil",
                              "Certificados físicos para rutas de perfil profesional"
                        ],
                        "noTiene": []
                  },
                  {
                        "code": "PL003",
                        "name": "Expert",
                        "tipoModeda": "S",
                        "cantidad": 4,
                        "tiempoPago": "mes",
                        "cantidadVendida": 10,
                        "price": 500,
                        "tiene": [
                              "Contenido profesional y actualizado",
                              "Certificados digitales",
                              "English Academy, Escuela de Startups, Liderazgo y Management",
                              "Eventos exclusivos como Platzi Conf",
                              "Descarga contenido en la app móvil",
                              "Certificados físicos para rutas de perfil profesional"
                        ],
                        "noTiene": []
                  }
            ];

            let maxPopular = Math.max(...planes.map(plan => plan.cantidadVendida));
            let contentHTML = ''; // Acumulador de contenido HTML

            planes.forEach(plan => {
                  const feature = plan.tiene.map(t => `
                                <div class="feature">
                                        <img src="check-circle.svg"> ${t}
                                </div>`).join('');

                  const featureInactive = plan.noTiene.map(t => `
                                <div class="feature inactive">
                                        <img src="x-square.svg"> ${t}
                                </div>`).join('');

                  const popular = (maxPopular === plan.cantidadVendida) ? "popular" : "";

                  contentHTML += `
                  <div class="price-column ${popular}" id="plan-${plan.code}">
                        <div class="price-header">
                              <div class="price">
                                          <div class="currency">${plan.tipoModeda}/</div>
                                          ${plan.price}
                                          <div class="per-month">/${plan.tiempoPago}</div>
                              </div>
                              <div class="plan-name">${plan.name}</div>
                        </div>
                        <div class="divider"></div>
                        ${feature}
                        ${featureInactive}
                        <button class="cta" id="btnplan-${plan.code}">Agregar a un plan</button>
                  </div>`;
            });

            this.priceComparison.innerHTML = contentHTML;

            planes.forEach(plan => {
                  const botonAddCarro = document.querySelector(`#btnplan-${plan.code}`);

                  botonAddCarro.addEventListener('click', () => {
                        Carrito.addProduct(plan);
                  });

            });
      }
}
