document.addEventListener('DOMContentLoaded', (e) => {
        new AdministradorView()
});
class AdministradorView {
        constructor() {
                this.init();
        }

        init() {
                // Elements
                this.headerHTML = document.querySelector('.header');
                this.tabsHTML = document.querySelector('.tabs');
                this.tabsMenuHTML = document.querySelector('.tabs-menu');
                this.tabsMenuLineHTML = document.querySelector(".tabs-menu__line");
                this.contentHTML = document.querySelector('.content');
                this.footerHTML = document.querySelector('.footer');
                // Actions
                this.tabsMenuHTML.addEventListener('click', this.clickMenuTabs);
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

}
