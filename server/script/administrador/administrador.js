import { CursosView } from "./course.js";
import { ScholarshipsView } from "./scholarships.js";
import { PagoView } from "./pagos.js";
document.addEventListener('DOMContentLoaded', (e) => {
        new AdministradorView()
});
class AdministradorView {
        constructor() {
                this.views = {
                        course: CursosView,
                        scholarships: ScholarshipsView,
                        pagos: PagoView
                };
                this.init();
                this.clickTab(this.tabsListHTML[0])
                
        }

        init() {
                //TABS
                this.tabsHTML = document.querySelector('.tabs');
                this.tabsListHTML = document.querySelectorAll('.tabs__list_item');
                //BODY
                this.bodyHTML = document.querySelector('.body')
                this.tabsMenuHTML = document.querySelector('.tabs-menu');
                this.tabsMenuContentHTML = document.querySelector('.tabs-menu__content');
                this.tabsMenuLineHTML = document.querySelectorAll(".tabs-menu__line");
                this.contentHTML = document.querySelector('.body__content');
                //FOOTER
                this.footerHTML = document.querySelector('.footer');

                // Actions
                this.tabsMenuHTML.addEventListener('click', this.clickMenuTabs);
                this.tabsListHTML.forEach(tabHTML => {
                        tabHTML.addEventListener('click', (e) => {
                                this.clickTab(tabHTML)
                        });
                });
        }

        clickMenuTabs = () => {
                if (this.tabsMenuHTML.classList.contains('tabs-menu__active')) {
                        this.tabsMenuHTML.classList.remove('tabs-menu__active');
                        this.tabsHTML.style.display = 'none';
                        this.tabsHTML.removeAttribute('open')

                } else {
                        this.tabsMenuHTML.classList.add('tabs-menu__active');
                        this.tabsHTML.style.display = 'flex';
                        this.tabsHTML.setAttribute('open', '')
                }
        }

        clickTab = async (targetElement) => {
                try {
                        const response = await fetch(`${targetElement.id}/${targetElement.id}.html`);
                        if (!response.ok) {
                                
                                return;
                        }
                        this.contentHTML.innerHTML = await response.text();
                        if (this.views.hasOwnProperty(targetElement.id)) {
                                new this.views[targetElement.id]
                        }
                } catch (error) {
                        console.error(error);
                }
        }

}
