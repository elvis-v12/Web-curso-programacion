import { UserService } from "../service/UserService.js";
export class PagoView {

        constructor() {
                this.userService = new UserService();
                this.init();
        }

        init() {
                this.btnVentasPagoAdmin = document.querySelector('#btnVentasPagoAdmin');
                this.btnVentasPagoAdminSpan = document.querySelector('#btnVentasPagoAdmin > span');
                this.btnVentasPendienteAdmin = document.querySelector('#btnVentasPendienteAdmin');
                this.btnVentasPendienteAdminSpan = document.querySelector('#btnVentasPendienteAdmin > span');
                this.btnVentasVencidoAdmin = document.querySelector('#btnVentasVencidoAdmin');
                this.btnVentasVencidoAdminSpan = document.querySelector('#btnVentasVencidoAdmin > span');
                this.tbodyTableUsersFilter = document.querySelector(".pago-admin__estudiantes-table > tbody")
                this.mostrarDatos()

        }

        async mostrarDatos() {
                try {
                        const usuarios = await this.userService.findUsersDetallesPago();
                        const usuariosPendientes = usuarios.filter(usuario => usuario.pendiente != 0)
                        const usuariosVencidos = usuarios.filter(usuario => usuario.deuda != 0)

                        this.btnVentasPagoAdminSpan.innerHTML = "$" + usuarios.map(becado => becado.cancelado)
                                .reduce((acc, val) => acc + val, 0).toFixed(2);
                        this.btnVentasPendienteAdminSpan.innerHTML = "$" + usuariosPendientes.map(becado => becado.pendiente)
                                .reduce((acc, val) => acc + val, 0).toFixed(2);
                        this.btnVentasVencidoAdminSpan.innerHTML = "$" + usuariosVencidos.map(becado => becado.deuda)
                                .reduce((acc, val) => acc + val, 0).toFixed(2);

                        // preterminado
                        this.tbodyTableUsersFilter.innerHTML = usuarios.map((usuario, index) => {
                                return `
                                <tr>
                                        <td>${index + 1}</td>
                                        <td>${usuario.code}</td>
                                        <td>${usuario.name}</td>
                                        <td>${usuario.gmail}</td>
                                        <td>${usuario.country}</td>
                                        <td>${usuario.cancelado}</td>
                                        <td>${usuario.status ? "Activo" : "Inactivo"}</td>
                                        <td><button class="btn ${usuario.status ? "btn-bloquear" : "btn-activar"}" id="btnAction${usuario.code}">${usuario.status ? "Bloquear" : "Activar"}</button></td>
                                </tr>
                                `
                        }).join("")
                        document.querySelector('.th-column-dinero').innerHTML = `Cancelado`;
                        this.btnVentasPagoAdmin.addEventListener('click', () => {
                                this.tbodyTableUsersFilter.innerHTML = usuarios.map((usuario, index) => {
                                        return `
                                        <tr>
                                                <td>${index + 1}</td>
                                                <td>${usuario.code}</td>
                                                <td>${usuario.name}</td>
                                                <td>${usuario.gmail}</td>
                                                <td>${usuario.country}</td>
                                                <td>${usuario.cancelado}</td>
                                                <td>${usuario.status ? "Activo" : "Inactivo"}</td>
                                                <td><button class="btn ${usuario.status ? "btn-bloquear" : "btn-activar"}" id="btnAction${usuario.code}">${usuario.status ? "Bloquear" : "Activar"}</button></td>
                                        </tr>
                                        `
                                }).join("")
                                document.querySelector('.th-column-dinero').innerHTML = `Cancelado`;
                        });
                        this.btnVentasPendienteAdmin.addEventListener('click', () => {
                                this.tbodyTableUsersFilter.innerHTML = usuariosPendientes.map((usuario, index) => {
                                        return `
                                        <tr>
                                                <td>${index + 1}</td>
                                                <td>${usuario.code}</td>
                                                <td>${usuario.name}</td>
                                                <td>${usuario.gmail}</td>
                                                <td>${usuario.country}</td>
                                                <td>${usuario.pendiente}</td>
                                                <td>${usuario.status ? "Activo" : "Inactivo"}</td>
                                                <td><button class="btn ${usuario.status ? "btn-bloquear" : "btn-activar"}" id="btnAction${usuario.code}">${usuario.status ? "Bloquear" : "Activar"}</button></td>
                                        </tr>
                                        `
                                }).join("")
                                document.querySelector('.th-column-dinero').innerHTML = `Pendiente`;
                        });
                        this.btnVentasVencidoAdmin.addEventListener('click', () => {
                                this.tbodyTableUsersFilter.innerHTML = usuariosVencidos.map((usuario, index) => {
                                        return `
                                        <tr>
                                                <td>${index + 1}</td>
                                                <td>${usuario.code}</td>
                                                <td>${usuario.name}</td>
                                                <td>${usuario.gmail}</td>
                                                <td>${usuario.country}</td>
                                                <td>${usuario.deuda}</td>
                                                <td>${usuario.status ? "Activo" : "Inactivo"}</td>
                                                <td><button class="btn ${usuario.status ? "btn-bloquear" : "btn-activar"}" id="btnAction${usuario.code}">${usuario.status ? "Bloquear" : "Activar"}</button></td>
                                        </tr>
                                        `
                                }).join("")
                                document.querySelector('.th-column-dinero').innerHTML = `Ventas`;
                        });


                } catch (error) {
                        console.error("Error al mostrar postulantes:", error);
                }
        }
}