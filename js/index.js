// OPTIONS

const updates_per_second = 60;
const menu_speed_max = 8;
const menu_resistance = 10;
const item_width = 300;
const item_margin = 30;
const item_border = 2;

// var menu_offset = document.documentElement.clientWidth / 4;
var menu_offset = 0;

//

var menu = document.getElementById("menu");
var items = document.getElementsByClassName("item");

var mouse_X = document.documentElement.clientWidth / 2;
var menu_hovered_over = false; 
var menu_distance = 0;
var menu_speed = 0;
var menu_width = 0;

var update_interval;

initMenu();

function initMenu(){
  for(let i = 0; i < items.length; i++) {
    menu_width += items.item(i).clientWidth
  }

  doubleMenuItems();
  updateMenu();
}

// update menu position/speed
function updateMenu(){
  // if the screen is wider than the menu, double the menu
  if (menu_width + menu_offset < document.documentElement.clientWidth){
    doubleMenuItems();
  }
  
  // if we have moved the menu left s.t. the first element is off-screen
  // and if there is no initial gap
  if (-menu_offset > item_width + 2*item_margin && menu_offset < 0){
    menu_offset += item_width + 2*(item_margin + item_border);
    menu.append(items.item(0));
  }

  // if we have moved the menu right s.t. we need a new first element
  if (menu_offset > 0){
    menu_offset -= item_width + 2*(item_margin + item_border);
    menu.prepend(items.item(items.length - 1));
  }
    
  // adjust speed if mouse hovering
  if (menu_hovered_over){
    let mouse_pos = (2 * mouse_X) / document.documentElement.clientWidth - 1;
    
    // adjustment for only moving menu right
    // mouse_pos = Math.max(mouse_pos, 0)

    menu_speed *= ((menu_resistance - 1) / menu_resistance);
    menu_speed += (1 / menu_resistance) * menu_speed_max * mouse_pos;
  }
    
  // lower speed if mouse not hovering
  else {
    menu_speed *= (menu_resistance - 1) / menu_resistance;
    if (Math.abs(menu_speed) < 0.01) {
      menu_speed = 0;
      clearInterval(update_interval);
    }
  }

  // update menu position
  menu_offset -= menu_speed;
  menu_distance += menu_speed;

  // stop menu from going too far
  if (menu_distance < 0){
    menu_offset += menu_distance;
    menu_distance = 0;
  }

  menu.style.transform = `translateX(${menu_offset}px)`;
}
  
function doubleMenuItems(){
  let duplicates = [];
  for (let item of items){ duplicates.push(item.cloneNode(true)); }
  for (let duplicate of duplicates){ menu.appendChild(duplicate); }
  
  // update internally stored menu width
  menu_width *= 2;
}

// set animation in all browsers
function setAnimation(node, animationText){
  node.style["-webkit-animation"] = animationText;
  node.style["-moz-animation"] = animationText;
  node.style["-o-animation"] = animationText;
  node.style["-ms-animation"] = animationText;
  node.style["animation"] = animationText;
}

// on mouse move, record mouse x position
document.addEventListener('mousemove', e => {
  mouse_X = e.clientX;
});

// on mouse enter menu, start/continue updateMenu
menu.addEventListener('mouseenter', () => {
  menu_hovered_over = true;

  if (menu_speed == 0){
    update_interval = setInterval(updateMenu, 1000 / updates_per_second);
  }
});

// on mouse leave menu, update menu_hovered_over
menu.addEventListener('mouseleave', () => {
  menu_hovered_over = false;
});