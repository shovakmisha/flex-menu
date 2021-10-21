document.addEventListener('DOMContentLoaded', function(){

    let menu, menuItems;

    menu = document.querySelector('#flex-menu');
    menuItems = menu.querySelectorAll('.menu_item');

    initialFlexMenu();

    function initialFlexMenu() {

        let menuWidth = parseInt(window.getComputedStyle(menu).width);
        let menuItemsWidth = defineVisibleItemsAndItemsWidth();

        // show three Dots
        if (menuItemsWidth > menuWidth) {
            createThreeDotsMenuItem();
            divideItems();
        }
    }

    // define to visible and hidden items
    function defineVisibleItemsAndItemsWidth() {

        let menuWidth = parseInt(window.getComputedStyle(menu).width);
        let menuItemsWidth = 0;

        menuItems.forEach(item => {

            // recount menu items width
            menuItemsWidth += item.clientWidth;

            if (menuItemsWidth < menuWidth ) {
                item.setAttribute('data-visible', 'true');
            } else {
                item.setAttribute('data-visible', 'false');
            }
        });

        return menuItemsWidth;
    }

    function divideItems() {

        // reset visible and hidden storage every time then user resizes window
        let visibleItems = [];
        let hiddenItems = [];

        let hiddenItemsStorage = document.querySelector('.three-dots-storage');

        menuItems.forEach( item => {
            if(item.getAttribute('data-visible') === 'false') {
                hiddenItems.push(item);
            } else {
                visibleItems.push(item);
            }
            item.remove();
        });

        visibleItems.forEach(item => menu.append(item));
        hiddenItems.forEach(item => hiddenItemsStorage.append(item));

        menuItems = [...visibleItems, ...hiddenItems];
    }


    window.addEventListener('resize', () => {
        defineVisibleItemsAndItemsWidth();
        divideItems();
    });

    function createThreeDotsMenuItem() {
        let threeDots = document.createElement('li');
        threeDots.innerHTML = "<span class='three-dots'>...</span><ul class='three-dots-storage'></ul>";
        threeDots.classList.add('menu_item_dots');

        menu.append(threeDots);

        let threeDotsButton = menu.querySelector('.three-dots');
        let threeDotsStorage = menu.querySelector('.three-dots-storage');

        threeDotsButton.addEventListener('click', () => {
            threeDotsStorage.classList.toggle('active');
        });

        return threeDots;
    }

});