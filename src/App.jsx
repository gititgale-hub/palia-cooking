import { useState, useMemo } from "react";

/* ══════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════ */
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; background: #EDE0C8; }

  .ing-chip {
    display: inline-flex; align-items: center; gap: 3px;
    border: 1.5px solid #B09050; border-radius: 20px;
    padding: 2px 6px 2px 8px; font-family: 'Crimson Text', serif;
    font-size: 12.5px; color: #5A3A00; background: #FAF5E8;
    transition: all 0.12s; white-space: nowrap;
  }
  .ing-chip.active { background: #2A4D10; color: #F0EAD6; border-color: #2A4D10; }
  .ing-chip-name { cursor: pointer; user-select: none; }
  .qty-btn { background:none; border:none; cursor:pointer; font-size:14px; line-height:1;
    padding:0 1px; color:inherit; opacity:0.85; font-family:inherit; }
  .qty-btn:hover { opacity:1; }
  .qty-direct {
    width: 38px; text-align: center; border: none;
    background: rgba(255,255,255,0.25); border-radius: 6px;
    font-family: 'Crimson Text', serif; font-size: 12px; font-weight: 700;
    color: inherit; padding: 1px 2px; outline: none;
    -moz-appearance: textfield;
  }
  .qty-direct::-webkit-outer-spin-button,
  .qty-direct::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .qty-add { background:none; border:1px solid currentColor; border-radius:50%;
    width:16px; height:16px; cursor:pointer; font-size:11px; padding:0; color:#7A5A10;
    margin-left:2px; display:flex; align-items:center; justify-content:center; }
  .qty-add:hover { background:#EDD99A; }

  .custom-fish-form {
    display: flex; gap: 5px; flex-wrap: wrap; align-items: center;
    margin-top: 6px; padding: 8px; background: #F0EAD6;
    border-radius: 8px; border: 1px dashed #B09050;
  }
  .custom-form-input {
    border: 1px solid #B09050; border-radius: 6px; padding: 3px 7px;
    font-family: 'Crimson Text', serif; font-size: 12px;
    background: #FAF5E8; color: #3A2800; outline: none; min-width: 0;
  }
  .custom-form-input:focus { border-color: #2A4D10; }
  .custom-form-input.name  { flex: 1; min-width: 90px; }
  .custom-form-input.price { width: 56px; text-align: center; }
  .btn-green { background: #2A4D10; color: #F0EAD6; border: none; border-radius: 6px;
    padding: 3px 10px; cursor: pointer; font-family: 'Crimson Text', serif; font-size: 12px; }
  .btn-ghost { background: none; border: 1px solid #B09050; border-radius: 6px;
    padding: 3px 8px; cursor: pointer; font-family: 'Crimson Text', serif; font-size: 12px;
    color: #8B6914; }
  .btn-add-custom { background: none; border: 1px dashed #9B7B2E; border-radius: 12px;
    padding: 2px 9px; cursor: pointer; font-family: 'Crimson Text', serif; font-size: 12px;
    color: #9B7B2E; margin-top: 5px; }
  .btn-add-custom:hover { background: #EDD99A; }
  .remove-x { background: none; border: none; cursor: pointer; font-size: 13px;
    color: #8B4000; padding: 0 2px; line-height: 1; opacity: 0.7; }
  .remove-x:hover { opacity: 1; }

  .cost-row { display:flex; align-items:center; justify-content:space-between;
    padding:4px 0; border-bottom:1px solid #EDD9A8; font-size:12.5px; color:#3A2800; }
  .cost-row:last-child { border-bottom:none; }
  .cost-input { width:50px; text-align:right; border:1px solid #B09050; border-radius:5px;
    padding:2px 5px; font-family:'Crimson Text',serif; font-size:12px;
    background:#FAF5E8; color:#3A2800; outline:none; }
  .cost-input:focus { border-color:#2A4D10; }

  .tab-btn { padding:6px 18px; border:none; cursor:pointer; font-family:'Cinzel',serif;
    font-size:13px; font-weight:600; background:transparent; color:#8B6914;
    border-bottom:2px solid transparent; transition:all 0.15s; }
  .tab-btn.active { color:#2A4D10; border-bottom-color:#2A4D10; }

  .filter-btn { padding:4px 13px; border-radius:20px; font-size:13px; cursor:pointer;
    border:1.5px solid #9B7B2E; font-family:'Crimson Text',serif;
    background:transparent; color:#3A2800; transition:all 0.12s; }
  .filter-btn.active { background:#2A4D10; color:#F5ECD7; border-color:#2A4D10; }

  .recipe-card { background:#FFFCF3; border:1px solid #D4B896; border-left:4px solid #D4B896;
    border-radius:10px; padding:12px 14px; margin-bottom:8px;
    box-shadow:0 2px 5px rgba(0,0,0,0.05); transition:box-shadow 0.15s; }
  .recipe-card:hover { box-shadow:0 4px 14px rgba(0,0,0,0.1); }
  .recipe-card.cookable { border-left-color:#2A8F2A; }
  .recipe-card.almost   { border-left-color:#C8922A; }
  .recipe-card.far      { border-left-color:#C87070; }

  .plan-card { background:#FFFCF3; border:1px solid #A8C890; border-left:5px solid #2A8F2A;
    border-radius:10px; padding:13px 15px; margin-bottom:9px;
    box-shadow:0 2px 6px rgba(0,0,0,0.06); }

  .summary-bar { background:#2A4D10; color:#F0EAD6; border-radius:10px;
    padding:12px 16px; margin-bottom:14px; display:flex; gap:20px; flex-wrap:wrap;
    align-items:center; font-family:'Cinzel',serif; }
  .summary-stat { display:flex; flex-direction:column; align-items:center; }
  .summary-val  { font-size:20px; font-weight:700; line-height:1.1; }
  .summary-lbl  { font-size:10px; opacity:0.75; text-transform:uppercase; letter-spacing:0.5px; }

  .tag { display:inline-flex; align-items:center; gap:3px; font-size:11px;
    padding:2px 6px; border-radius:4px; }
  .tag.have    { background:#D4EDDA; color:#144720; border:1px solid #A8D5B5; }
  .tag.partial { background:#FFF3CD; color:#856404; border:1px solid #FFE69C; }
  .tag.miss    { background:#FDECEA; color:#7B1717; border:1px solid #F5C6CB; }

  .leftover-chip { display:inline-flex; align-items:center; gap:4px; font-size:12px;
    padding:2px 9px; border-radius:12px; background:#FFF3CD; border:1px solid #FFE69C;
    color:#6B4A00; margin:3px; }

  .panel-box { background:#FFFCF3; border:1px solid #D4B896; border-radius:12px; padding:13px; }
  .section-toggle { background:none; border:none; cursor:pointer; font-family:'Cinzel',serif;
    font-size:13px; color:#2A4D10; font-weight:600; padding:0; display:flex;
    align-items:center; gap:6px; width:100%; text-align:left; }
  .cat-label { font-size:11px; font-weight:700; color:#9B7B2E; margin-bottom:5px;
    text-transform:uppercase; letter-spacing:0.6px; margin-top:12px; }
  .cat-label:first-of-type { margin-top:0; }
  .star-toggle { display:inline-flex; align-items:center; gap:6px; cursor:pointer;
    font-size:12.5px; color:#8B6914; user-select:none; }

  .scroll { overflow-y:auto; max-height:calc(100vh - 165px); padding-right:3px; }
  .scroll::-webkit-scrollbar { width:4px; }
  .scroll::-webkit-scrollbar-thumb { background:#C8B090; border-radius:3px; }

  @media(max-width:740px){ .layout{flex-direction:column!important;}
    .scroll{max-height:none;} }
`;

/* ══════════════════════════════════════════════════════
   INGREDIENT DATA  (sellPrice = base, starPrice = star; no-star items have starPrice = sellPrice)
══════════════════════════════════════════════════════ */
const INGREDIENT_CATEGORIES = [
  { name:"Fish", icon:"🐟", items:[
    { id:"cutthroat_trout",  name:"Cutthroat Trout",  provides:["any_fish","any_trout"],               sellPrice:125, starPrice:187 },
    { id:"prism_trout",      name:"Prism Trout",       provides:["any_fish","any_trout"],               sellPrice:115, starPrice:172 },
    { id:"rainbow_trout",    name:"Rainbow Trout",     provides:["any_fish","any_trout"],               sellPrice:90,  starPrice:135 },
    { id:"bahari_bass",      name:"Bahari Bass",       provides:["any_fish","any_bass"],                sellPrice:36,  starPrice:54  },
    { id:"black_sea_bass",   name:"Black Sea Bass",    provides:["any_fish","any_bass"],                sellPrice:100, starPrice:150 },
    { id:"largemouth_bass",  name:"Largemouth Bass",   provides:["any_fish","any_bass"],                sellPrice:49,  starPrice:73  },
    { id:"smallmouth_bass",  name:"Smallmouth Bass",   provides:["any_fish","any_bass"],                sellPrice:49,  starPrice:73  },
    { id:"bahari_bream",     name:"Bahari Bream",      provides:["any_fish","bahari_bream"], sellPrice:55,  starPrice:82  },
    { id:"channel_catfish",  name:"Channel Catfish",   provides:["any_fish","any_catfish"],             sellPrice:90,  starPrice:135 },
    { id:"kilima_catfish",   name:"Kilima Catfish",    provides:["any_fish","any_catfish"],             sellPrice:55,  starPrice:82  },
    { id:"stalking_catfish", name:"Stalking Catfish",  provides:["any_fish","any_catfish"],             sellPrice:200, starPrice:300 },
  ]},
  { name:"Crabs & Seafood", icon:"🦀", items:[
    { id:"bahari_crab",     name:"Bahari Crab",     provides:["any_crab"],    sellPrice:21,  starPrice:31  },
    { id:"spineshell_crab", name:"Spineshell Crab", provides:["any_crab"],    sellPrice:46,  starPrice:69  },
    { id:"vampire_crab",    name:"Vampire Crab",    provides:["any_crab"],    sellPrice:145, starPrice:217 },
    { id:"oyster_meat",     name:"Oyster Meat",     provides:["oyster_meat"], sellPrice:11,  starPrice:16  },
  ]},
  { name:"Meat", icon:"🥩", items:[
    { id:"chapaa_meat",              name:"Chapaa Meat",              provides:["any_red_meat","chapaa_meat"], sellPrice:15, starPrice:22 },
    { id:"sernuk_meat",              name:"Sernuk Meat",              provides:["any_red_meat","sernuk_meat"], sellPrice:16, starPrice:24 },
    { id:"muujin_meat",              name:"Muujin Meat",              provides:["any_red_meat","muujin_meat"], sellPrice:16, starPrice:24 },
    { id:"elder_clam_mushroom_meat", name:"Elder Clam Mushroom Meat", provides:["any_red_meat"],               sellPrice:23, starPrice:34 },
  ]},
  { name:"Mushrooms", icon:"🍄", items:[
    { id:"brightshroom",       name:"Brightshroom",       provides:["any_mushroom"], sellPrice:60, starPrice:90 },
    { id:"floatfish_mushroom", name:"Floatfish Mushroom", provides:["any_mushroom"], sellPrice:9,  starPrice:13 },
    { id:"mountain_morel",     name:"Mountain Morel",     provides:["any_mushroom"], sellPrice:11, starPrice:16 },
    { id:"staircase_mushroom", name:"Staircase Mushroom", provides:["any_mushroom"], sellPrice:9,  starPrice:13 },
    { id:"elder_clam_mushroom",name:"Elder Clam Mushroom",provides:["any_mushroom"], sellPrice:23, starPrice:34 },
  ]},
  { name:"Crops", icon:"🌱", items:[
    { id:"apple",              name:"Apple",         provides:["apple","any_fruit"],       sellPrice:64, starPrice:96  },
    { id:"blueberries",        name:"Blueberries",   provides:["blueberries","any_fruit"], sellPrice:39, starPrice:58  },
    { id:"bok_choy",           name:"Bok Choy",      provides:["bok_choy"],                sellPrice:30, starPrice:45  },
    { id:"batterfly_beans",    name:"Batterfly Beans",provides:["batterfly_beans"],         sellPrice:23, starPrice:34  },
    { id:"carrot",             name:"Carrot",        provides:["carrot","any_vegetable"],  sellPrice:23, starPrice:34  },
    { id:"corn",               name:"Corn",          provides:["corn","any_vegetable"],    sellPrice:40, starPrice:60  },
    { id:"napa_cabbage",       name:"Napa Cabbage",  provides:["napa_cabbage"],            sellPrice:40, starPrice:60  },
    { id:"onion",              name:"Onion",         provides:["onion","any_vegetable"],   sellPrice:30, starPrice:45  },
    { id:"potato",             name:"Potato",        provides:["potato","any_vegetable"],  sellPrice:45, starPrice:67  },
    { id:"rockhopper_pumpkin", name:"R. Pumpkin",    provides:["rockhopper_pumpkin"],       sellPrice:88, starPrice:132 },
    { id:"rice",               name:"Rice",          provides:["rice"],                    sellPrice:27, starPrice:40  },
    { id:"spicy_pepper",       name:"Spicy Pepper",  provides:["spicy_pepper"],            sellPrice:32, starPrice:48  },
    { id:"tomato",             name:"Tomato",        provides:["tomato","any_vegetable"],  sellPrice:23, starPrice:34  },
    { id:"wheat",              name:"Wheat",         provides:["wheat"],                   sellPrice:33, starPrice:49  },
    { id:"other_veg",          name:"Other Veg",     provides:["any_vegetable"],           sellPrice:0,  starPrice:0   },
  ]},
  { name:"Herbs & Spices", icon:"🌿", items:[
    { id:"wild_garlic",      name:"Wild Garlic",      provides:["wild_garlic"],               sellPrice:23,  starPrice:34  },
    { id:"spice_sprouts",    name:"Spice Sprouts",    provides:["spice_sprouts","any_spice"], sellPrice:23,  starPrice:34  },
    { id:"dari_cloves",      name:"Dari Cloves",      provides:["dari_cloves","any_spice"],   sellPrice:145, starPrice:217 },
    { id:"heat_root",        name:"Heat Root",        provides:["heat_root","any_spice"],     sellPrice:60,  starPrice:90  },
    { id:"wild_ginger",      name:"Wild Ginger",      provides:["wild_ginger"],               sellPrice:23,  starPrice:34  },
    { id:"wild_green_onion", name:"Wild Green Onion", provides:["wild_green_onion"],          sellPrice:11,  starPrice:16  },
    { id:"sweet_leaf",       name:"Sweet Leaf",       provides:["sweet_leaf"],                sellPrice:23,  starPrice:34  },
  ]},
  { name:"Dairy", icon:"🥛", items:[
    { id:"butter", name:"Butter", provides:["butter"], sellPrice:20, starPrice:20 },
    { id:"milk",   name:"Milk",   provides:["milk"],   sellPrice:15, starPrice:15 },
    { id:"egg",    name:"Egg",    provides:["egg"],    sellPrice:12, starPrice:12 },
    { id:"flour",  name:"Flour",  provides:["flour"],  sellPrice:5,  starPrice:5  },
  ]},
  { name:"Pantry", icon:"🫙", items:[
    { id:"cooking_oil", name:"Cooking Oil", provides:["cooking_oil"], sellPrice:10,  starPrice:10  },
    { id:"vinegar",     name:"Vinegar",     provides:["vinegar"],     sellPrice:100, starPrice:100 },
    { id:"salt",        name:"Salt",        provides:["salt"],        sellPrice:5,   starPrice:5   },
    { id:"sugar",       name:"Sugar",       provides:["sugar"],       sellPrice:10,  starPrice:10  },
    { id:"soy_sauce",   name:"Soy Sauce",   provides:["soy_sauce"],   sellPrice:20,  starPrice:20  },
    { id:"plant_fibre", name:"Plant Fibre", provides:["plant_fibre"], sellPrice:8,   starPrice:8   },
  ]},
  { name:"Gatherables", icon:"🍃", items:[
    { id:"honey",          name:"Honey",          provides:["honey"],                      sellPrice:23, starPrice:34 },
    { id:"flowtato",       name:"Flowtato",       provides:["flowtato"],                   sellPrice:60, starPrice:90 },
    { id:"piksil_berries", name:"Piksil Berries", provides:["piksil_berries","any_fruit"], sellPrice:9,  starPrice:13 },
    { id:"kopaa_nuts",     name:"Kopaa Nuts",     provides:["kopaa_nuts"],                 sellPrice:23, starPrice:34 },
  ]},
  { name:"Crafted", icon:"⚗️", items:[
    { id:"napa_cabbage_kimchi", name:"Napa Cabbage Kimchi", provides:["any_kimchi"], sellPrice:60, starPrice:90 },
    { id:"bok_choy_kimchi",     name:"Bok Choy Kimchi",     provides:["any_kimchi"], sellPrice:45, starPrice:67 },
  ]},
  { name:"Rare Forage", icon:"🌸", items:[
    { id:"emerald_carpet_moss", name:"Emerald Carpet Moss", provides:["emerald_carpet_moss"], sellPrice:20, starPrice:20 },
    { id:"crystal_lake_lotus",  name:"Crystal Lake Lotus",  provides:["crystal_lake_lotus"],  sellPrice:25, starPrice:25 },
  ]},
];

const ING_MAP = {};
const ALL_ITEMS = INGREDIENT_CATEGORIES.flatMap(c => c.items);
ALL_ITEMS.forEach(i => { ING_MAP[i.id] = i; });

const LABELS = {
  any_fish:"Any Fish",any_bass:"Any Bass",any_trout:"Any Trout",any_catfish:"Any Catfish",
  bahari_bream:"Bahari Bream",any_crab:"Any Crab",oyster_meat:"Oyster Meat",
  any_red_meat:"Any Red Meat",chapaa_meat:"Chapaa Meat",sernuk_meat:"Sernuk Meat",
  muujin_meat:"Muujin Meat",any_mushroom:"Any Mushroom",any_vegetable:"Any Vegetable",
  tomato:"Tomato",carrot:"Carrot",potato:"Potato",onion:"Onion",corn:"Corn",
  bok_choy:"Bok Choy",napa_cabbage:"Napa Cabbage",flowtato:"Flowtato",
  rockhopper_pumpkin:"R. Pumpkin",wild_garlic:"Wild Garlic",any_spice:"Any Spice",
  spice_sprouts:"Spice Sprouts",dari_cloves:"Dari Cloves",heat_root:"Heat Root",
  wild_ginger:"Wild Ginger",wild_green_onion:"Wild Green Onion",spicy_pepper:"Spicy Pepper",
  butter:"Butter",milk:"Milk",egg:"Egg",wheat:"Wheat",flour:"Flour",rice:"Rice",
  cooking_oil:"Cooking Oil",vinegar:"Vinegar",sweet_leaf:"Sweet Leaf",salt:"Salt",
  honey:"Honey",sugar:"Sugar",soy_sauce:"Soy Sauce",plant_fibre:"Plant Fibre",
  any_kimchi:"Any Kimchi",apple:"Apple",blueberries:"Blueberries",
  piksil_berries:"Piksil Berries",any_fruit:"Any Fruit",
  batterfly_beans:"Batterfly Beans",kopaa_nuts:"Kopaa Nuts",
  emerald_carpet_moss:"Emerald Carpet Moss",crystal_lake_lotus:"Crystal Lake Lotus",
  bahari_bream:"Bahari Bream",
};
const lbl = id => LABELS[id] || id.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());

/* ══════════════════════════════════════════════════════
   RECIPES — prices updated from spreadsheet
   sellPrice = base per dish, starSellPrice = star per dish
══════════════════════════════════════════════════════ */
const RECIPES = [
  {name:"Congee",                  sellPrice:53,  starSellPrice:79,  servings:1, ings:[{id:"rice",qty:2}]},
  {name:"Fisherman's Brew",        sellPrice:9,   starSellPrice:13,  servings:5, ings:[{id:"emerald_carpet_moss",qty:1},{id:"crystal_lake_lotus",qty:1}]},
  {name:"Grilled Fish",            sellPrice:60,  starSellPrice:90,  servings:1, ings:[{id:"any_fish",qty:2}]},
  {name:"Grilled Meat",            sellPrice:30,  starSellPrice:45,  servings:1, ings:[{id:"any_red_meat",qty:2}]},
  {name:"Grilled Mushrooms",       sellPrice:24,  starSellPrice:36,  servings:1, ings:[{id:"any_mushroom",qty:3}]},
  {name:"Grilled Oyster",          sellPrice:33,  starSellPrice:49,  servings:1, ings:[{id:"oyster_meat",qty:3}]},
  {name:"Macaron",                 sellPrice:21,  starSellPrice:31,  servings:3, ings:[{id:"egg",qty:1},{id:"flour",qty:1},{id:"milk",qty:1},{id:"sweet_leaf",qty:1}]},
  {name:"Fish Tacos",              sellPrice:35,  starSellPrice:52,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_fish",qty:1},{id:"corn",qty:1}]},
  {name:"Fruit Smoothie Bowl",     sellPrice:132, starSellPrice:198, servings:3, ings:[{id:"milk",qty:1},{id:"blueberries",qty:1},{id:"apple",qty:3},{id:"piksil_berries",qty:1}]},
  {name:"Poke Bowl",               sellPrice:171, starSellPrice:256, servings:3, ings:[{id:"vinegar",qty:1},{id:"any_fish",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"heat_root",qty:1}]},
  {name:"Crab Pot Pie",            sellPrice:62,  starSellPrice:93,  servings:3, ings:[{id:"butter",qty:1},{id:"corn",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"any_vegetable",qty:1},{id:"any_crab",qty:1}]},
  {name:"Creamy Carrot Soup",      sellPrice:32,  starSellPrice:48,  servings:3, ings:[{id:"carrot",qty:1},{id:"spice_sprouts",qty:1},{id:"milk",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Fish Stew",               sellPrice:29,  starSellPrice:43,  servings:3, ings:[{id:"any_fish",qty:1},{id:"any_spice",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Flowtato Fries",          sellPrice:72,  starSellPrice:108, servings:3, ings:[{id:"salt",qty:1},{id:"cooking_oil",qty:1},{id:"flowtato",qty:1},{id:"vinegar",qty:1},{id:"tomato",qty:1}]},
  {name:"Hearty Vegetable Soup",   sellPrice:21,  starSellPrice:31,  servings:3, ings:[{id:"any_mushroom",qty:1},{id:"any_vegetable",qty:1},{id:"any_spice",qty:1}]},
  {name:"Hot Hounds",              sellPrice:33,  starSellPrice:49,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Kimchi Fried Rice",       sellPrice:35,  starSellPrice:52,  servings:3, ings:[{id:"any_kimchi",qty:1},{id:"egg",qty:1},{id:"cooking_oil",qty:1},{id:"wild_garlic",qty:1},{id:"rice",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Meaty Stir-Fry",          sellPrice:36,  starSellPrice:54,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"wild_garlic",qty:1},{id:"any_vegetable",qty:1},{id:"rice",qty:1}]},
  {name:"Mushroom Quiche",         sellPrice:29,  starSellPrice:43,  servings:3, ings:[{id:"butter",qty:1},{id:"egg",qty:1},{id:"wheat",qty:1},{id:"any_mushroom",qty:1}]},
  {name:"Palian Onion Soup",       sellPrice:22,  starSellPrice:33,  servings:3, ings:[{id:"wild_garlic",qty:1},{id:"onion",qty:1},{id:"flour",qty:1}]},
  {name:"Ramen",                   sellPrice:30,  starSellPrice:45,  servings:3, ings:[{id:"egg",qty:1},{id:"wheat",qty:1},{id:"wild_garlic",qty:1},{id:"any_mushroom",qty:1}]},
  {name:"Rice Cake Soup",          sellPrice:45,  starSellPrice:67,  servings:3, ings:[{id:"egg",qty:1},{id:"soy_sauce",qty:1},{id:"any_red_meat",qty:1},{id:"rice",qty:1},{id:"napa_cabbage",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Sashimi",                 sellPrice:30,  starSellPrice:45,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_fish",qty:1},{id:"rice",qty:1}]},
  {name:"Sernuk Noodle Stew",      sellPrice:47,  starSellPrice:70,  servings:3, ings:[{id:"sernuk_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"carrot",qty:1}]},
  {name:"Soon Tofu",               sellPrice:120, starSellPrice:180, servings:3, ings:[{id:"egg",qty:1},{id:"rice",qty:1},{id:"batterfly_beans",qty:3},{id:"wild_garlic",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Spicy Crab Fried Rice",   sellPrice:88,  starSellPrice:132, servings:3, ings:[{id:"cooking_oil",qty:1},{id:"soy_sauce",qty:1},{id:"egg",qty:1},{id:"any_crab",qty:1},{id:"rice",qty:1},{id:"wild_garlic",qty:1},{id:"spicy_pepper",qty:1},{id:"napa_cabbage",qty:1},{id:"corn",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Steamed Fish",            sellPrice:37,  starSellPrice:55,  servings:3, ings:[{id:"bahari_bream",qty:1},{id:"cooking_oil",qty:1},{id:"wild_ginger",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Stuffed Tomatoes",        sellPrice:45,  starSellPrice:67,  servings:3, ings:[{id:"butter",qty:1},{id:"tomato",qty:1},{id:"spice_sprouts",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Veggie Fried Rice",       sellPrice:47,  starSellPrice:70,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"egg",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1},{id:"carrot",qty:1},{id:"rice",qty:1}]},
  {name:"Quiche Caleri",           sellPrice:34,  starSellPrice:51,  servings:3, ings:[{id:"butter",qty:1},{id:"egg",qty:1},{id:"wheat",qty:1},{id:"any_mushroom",qty:1},{id:"any_red_meat",qty:1}]},
  {name:"Chapaa Asada Tacos",      sellPrice:50,  starSellPrice:75,  servings:3, ings:[{id:"salt",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1},{id:"corn",qty:1},{id:"onion",qty:1}]},
  {name:"Chapaa Masala",           sellPrice:130, starSellPrice:195, servings:3, ings:[{id:"milk",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:2},{id:"tomato",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"heat_root",qty:1}]},
  {name:"Chapaa Onigiri",          sellPrice:34,  starSellPrice:51,  servings:3, ings:[{id:"salt",qty:1},{id:"rice",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Chilli Oil Dumplings",    sellPrice:61,  starSellPrice:91,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_red_meat",qty:1},{id:"any_vegetable",qty:1},{id:"wheat",qty:1},{id:"rice",qty:1},{id:"cooking_oil",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Crab Gumbo",              sellPrice:45,  starSellPrice:67,  servings:3, ings:[{id:"flour",qty:1},{id:"oyster_meat",qty:1},{id:"cooking_oil",qty:2},{id:"any_crab",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Fried Catfish Dinner",    sellPrice:51,  starSellPrice:76,  servings:3, ings:[{id:"any_catfish",qty:1},{id:"flour",qty:1},{id:"any_spice",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1}]},
  {name:"Lucky Braised Fish",      sellPrice:187, starSellPrice:280, servings:3, ings:[{id:"cooking_oil",qty:5},{id:"wild_ginger",qty:2},{id:"any_bass",qty:1},{id:"soy_sauce",qty:4},{id:"sugar",qty:4},{id:"spice_sprouts",qty:4},{id:"wild_green_onion",qty:5},{id:"vinegar",qty:1}]},
  {name:"Mushroom Dumpling Soup",  sellPrice:58,  starSellPrice:87,  servings:3, ings:[{id:"any_mushroom",qty:1},{id:"soy_sauce",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_ginger",qty:1},{id:"wheat",qty:1},{id:"carrot",qty:1},{id:"bok_choy",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Pan Fried Dumplings",     sellPrice:40,  starSellPrice:60,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_ginger",qty:1},{id:"wheat",qty:1}]},
  {name:"Phoenixfire Relleno",     sellPrice:48,  starSellPrice:72,  servings:3, ings:[{id:"egg",qty:1},{id:"flour",qty:1},{id:"any_red_meat",qty:1},{id:"spicy_pepper",qty:2},{id:"spice_sprouts",qty:1},{id:"cooking_oil",qty:1}]},
  {name:"Pumpkin Curry & Rice",    sellPrice:179, starSellPrice:268, servings:3, ings:[{id:"rice",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"heat_root",qty:1},{id:"kopaa_nuts",qty:1}]},
  {name:"Pumpkin Stew",            sellPrice:143, starSellPrice:214, servings:3, ings:[{id:"any_red_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"onion",qty:1},{id:"heat_root",qty:1}]},
  {name:"Rice Cake Stir Fry",      sellPrice:116, starSellPrice:174, servings:3, ings:[{id:"cooking_oil",qty:2},{id:"wild_garlic",qty:1},{id:"wild_ginger",qty:1},{id:"rice",qty:1},{id:"carrot",qty:1},{id:"bok_choy",qty:1},{id:"soy_sauce",qty:1},{id:"sugar",qty:1},{id:"spice_sprouts",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Spicy Rice Cakes",        sellPrice:124, starSellPrice:186, servings:3, ings:[{id:"cooking_oil",qty:2},{id:"spicy_pepper",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"heat_root",qty:1},{id:"rice",qty:1}]},
  {name:"Spicy Stir Fry",          sellPrice:50,  starSellPrice:75,  servings:3, ings:[{id:"salt",qty:1},{id:"any_red_meat",qty:1},{id:"wild_garlic",qty:1},{id:"any_vegetable",qty:1},{id:"rice",qty:1},{id:"cooking_oil",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Sushi",                   sellPrice:144, starSellPrice:216, servings:3, ings:[{id:"dari_cloves",qty:1},{id:"any_fish",qty:1},{id:"heat_root",qty:1},{id:"vinegar",qty:1},{id:"rice",qty:1},{id:"sweet_leaf",qty:1}]},
  {name:"Veggie Chili",            sellPrice:148, starSellPrice:222, servings:3, ings:[{id:"batterfly_beans",qty:3},{id:"salt",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"spicy_pepper",qty:1},{id:"onion",qty:1},{id:"corn",qty:1},{id:"carrot",qty:1},{id:"tomato",qty:1}]},
  {name:"Akwinduu Chapaa",         sellPrice:51,  starSellPrice:77,  servings:3, ings:[{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"potato",qty:1},{id:"any_mushroom",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Bacon-Stuffed Mushrooms", sellPrice:35,  starSellPrice:52,  servings:3, ings:[{id:"any_mushroom",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1},{id:"tomato",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Bouillabaisse",           sellPrice:68,  starSellPrice:100, servings:3, ings:[{id:"any_bass",qty:1},{id:"oyster_meat",qty:1},{id:"wheat",qty:1},{id:"potato",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Cream of Mushroom Soup",  sellPrice:51,  starSellPrice:76,  servings:3, ings:[{id:"any_mushroom",qty:1},{id:"milk",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Cream of Tomato Soup",    sellPrice:46,  starSellPrice:69,  servings:3, ings:[{id:"tomato",qty:1},{id:"milk",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Loaded Flowtato",         sellPrice:42,  starSellPrice:63,  servings:3, ings:[{id:"flowtato",qty:1},{id:"onion",qty:1},{id:"any_red_meat",qty:1},{id:"milk",qty:1}]},
  {name:"Loaded Potato Soup",      sellPrice:50,  starSellPrice:75,  servings:3, ings:[{id:"potato",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Trout Dinner",            sellPrice:68,  starSellPrice:102, servings:3, ings:[{id:"any_trout",qty:1},{id:"any_spice",qty:1},{id:"potato",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Apple Pie",               sellPrice:109, starSellPrice:163, servings:3, ings:[{id:"wheat",qty:1},{id:"butter",qty:1},{id:"sweet_leaf",qty:1},{id:"apple",qty:3},{id:"spice_sprouts",qty:1}]},
  {name:"Blueberry Pie",           sellPrice:66,  starSellPrice:99,  servings:3, ings:[{id:"wheat",qty:1},{id:"butter",qty:1},{id:"sweet_leaf",qty:1},{id:"blueberries",qty:2},{id:"spice_sprouts",qty:1}]},
  {name:"Candied Kopaa Nuts",      sellPrice:68,  starSellPrice:102, servings:3, ings:[{id:"salt",qty:1},{id:"honey",qty:1},{id:"milk",qty:1},{id:"sweet_leaf",qty:1},{id:"kopaa_nuts",qty:1}]},
  {name:"Celebration Cake",        sellPrice:188, starSellPrice:282, servings:3, ings:[{id:"blueberries",qty:1},{id:"butter",qty:4},{id:"egg",qty:3},{id:"flour",qty:3},{id:"sweet_leaf",qty:4},{id:"any_fruit",qty:3},{id:"milk",qty:1},{id:"sugar",qty:3}]},
  {name:"Oysters Akwinduu",        sellPrice:90,  starSellPrice:135, servings:3, ings:[{id:"oyster_meat",qty:1},{id:"salt",qty:5},{id:"spicy_pepper",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1},{id:"heat_root",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1}]},
  {name:"Shepp's Pie",             sellPrice:64,  starSellPrice:96,  servings:3, ings:[{id:"salt",qty:1},{id:"corn",qty:1},{id:"potato",qty:1},{id:"carrot",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Spicy Honey-Baked Muujin",sellPrice:77,  starSellPrice:115, servings:3, ings:[{id:"honey",qty:1},{id:"spicy_pepper",qty:1},{id:"spice_sprouts",qty:1},{id:"muujin_meat",qty:1}]},
  {name:"Bean Burger",             sellPrice:228, starSellPrice:342, servings:3, ings:[{id:"milk",qty:1},{id:"tomato",qty:2},{id:"onion",qty:2},{id:"batterfly_beans",qty:3},{id:"vinegar",qty:3},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"egg",qty:1},{id:"cooking_oil",qty:1},{id:"wheat",qty:1}]},
  {name:"Elderwood Pie",           sellPrice:91,  starSellPrice:136, servings:3, ings:[{id:"butter",qty:1},{id:"wheat",qty:3},{id:"any_red_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"flowtato",qty:1},{id:"onion",qty:1}]},
  {name:"Muujin Bahari",           sellPrice:206, starSellPrice:309, servings:3, ings:[{id:"butter",qty:2},{id:"wheat",qty:2},{id:"corn",qty:2},{id:"salt",qty:3},{id:"chapaa_meat",qty:1},{id:"any_mushroom",qty:1},{id:"spicy_pepper",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:2},{id:"wild_garlic",qty:1},{id:"muujin_meat",qty:3},{id:"plant_fibre",qty:3},{id:"cooking_oil",qty:3},{id:"vinegar",qty:1},{id:"egg",qty:1}]},
  {name:"Petit Fives",             sellPrice:81,  starSellPrice:121, servings:3, ings:[{id:"sugar",qty:2},{id:"butter",qty:2},{id:"egg",qty:1},{id:"flour",qty:1},{id:"sweet_leaf",qty:2},{id:"milk",qty:1},{id:"any_fruit",qty:1},{id:"corn",qty:1}]},
  {name:"Pumpkin Pie",             sellPrice:108, starSellPrice:162, servings:3, ings:[{id:"butter",qty:1},{id:"milk",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:3}]},
  {name:"Steak Dinner",            sellPrice:34,  starSellPrice:51,  servings:3, ings:[{id:"any_red_meat",qty:1},{id:"wheat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Stuffed Cabbage Rolls",   sellPrice:35,  starSellPrice:52,  servings:3, ings:[{id:"napa_cabbage",qty:1},{id:"any_red_meat",qty:1},{id:"any_mushroom",qty:1},{id:"carrot",qty:1},{id:"wild_green_onion",qty:1}]},
];

/* ══════════════════════════════════════════════════════
   OPTIMIZER ENGINE
══════════════════════════════════════════════════════ */
function buildPool(quantities, extraItems = []) {
  const pool = {};
  [...ALL_ITEMS, ...extraItems].forEach(item => {
    const q = quantities[item.id] || 0;
    if (q > 0) item.provides.forEach(p => { pool[p] = (pool[p] || 0) + q; });
  });
  return pool;
}

function buildCheapest(quantities, costs, starQuality, extraItems = []) {
  const map = {};
  [...ALL_ITEMS, ...extraItems].forEach(item => {
    if ((quantities[item.id] || 0) > 0) {
      const c = starQuality
        ? (costs[item.id + "_star"] ?? costs[item.id] ?? item.starPrice)
        : (costs[item.id] ?? item.sellPrice);
      item.provides.forEach(p => { if (map[p] === undefined || c < map[p]) map[p] = c; });
    }
  });
  return map;
}

function deductIngredients(recipe, numCooks, remaining, extraItems = []) {
  for (const { id, qty } of recipe.ings) {
    let need = qty * numCooks;
    const providers = [...ALL_ITEMS, ...extraItems]
      .filter(item => item.provides.includes(id) && (remaining[item.id] || 0) > 0)
      .sort((a, b) => (remaining[b.id] || 0) - (remaining[a.id] || 0));
    for (const p of providers) {
      if (need <= 0) break;
      const use = Math.min(need, remaining[p.id] || 0);
      remaining[p.id] = (remaining[p.id] || 0) - use;
      need -= use;
    }
  }
}

function runOptimizer(quantities, costs, starQuality, extraItems) {
  const remaining = { ...quantities };
  const cheapest0 = buildCheapest(remaining, costs, starQuality, extraItems);

  const scored = RECIPES.map(r => {
    const costPerCook = r.ings.reduce((s, { id, qty }) => s + (cheapest0[id] || 0) * qty, 0);
    const grossPerCook = r.servings * (starQuality ? r.starSellPrice : r.sellPrice);
    return { ...r, costPerCook, grossPerCook, netPerCook: grossPerCook - costPerCook };
  }).filter(r => r.netPerCook > 0).sort((a, b) => b.netPerCook - a.netPerCook);

  const plan = [];
  for (const recipe of scored) {
    const pool = buildPool(remaining, extraItems);
    const cooks = recipe.ings.reduce((min, { id, qty }) =>
      Math.min(min, Math.floor((pool[id] || 0) / qty)), Infinity);
    if (cooks > 0 && cooks !== Infinity) {
      deductIngredients(recipe, cooks, remaining, extraItems);
      plan.push({
        name: recipe.name, cooks, servings: recipe.servings,
        totalDishes: cooks * recipe.servings,
        sellPrice: starQuality ? recipe.starSellPrice : recipe.sellPrice,
        grossRevenue:   Math.round(cooks * recipe.grossPerCook),
        ingredientCost: Math.round(cooks * recipe.costPerCook),
        netProfit:      Math.round(cooks * recipe.netPerCook),
      });
    }
  }
  plan.sort((a, b) => b.netProfit - a.netProfit);
  const leftover = Object.entries(remaining)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => ({ id, qty, name: ING_MAP[id]?.name || lbl(id) }));
  return {
    plan, leftover,
    totalGross:  plan.reduce((s, p) => s + p.grossRevenue, 0),
    totalCost:   plan.reduce((s, p) => s + p.ingredientCost, 0),
    totalNet:    plan.reduce((s, p) => s + p.netProfit, 0),
    totalDishes: plan.reduce((s, p) => s + p.totalDishes, 0),
  };
}

/* ══════════════════════════════════════════════════════
   INGREDIENT CHIP — with direct number input
══════════════════════════════════════════════════════ */
function IngChip({ name, qty, onQtyChange }) {
  const active = qty > 0;
  return (
    <div className={`ing-chip ${active ? "active" : ""}`}>
      <span className="ing-chip-name" onClick={() => onQtyChange(active ? 0 : 1)}>{name}</span>
      {active ? (
        <>
          <button className="qty-btn" onClick={e => { e.stopPropagation(); onQtyChange(Math.max(0, qty - 1)); }}>−</button>
          <input type="number" min="0" value={qty} className="qty-direct"
            onChange={e => onQtyChange(Math.max(0, parseInt(e.target.value) || 0))}
            onClick={e => e.stopPropagation()} />
          <button className="qty-btn" onClick={e => { e.stopPropagation(); onQtyChange(qty + 1); }}>+</button>
        </>
      ) : (
        <button className="qty-add" onClick={e => { e.stopPropagation(); onQtyChange(1); }}>+</button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CUSTOM FISH PANEL
══════════════════════════════════════════════════════ */
function CustomFishPanel({ customFish, onAdd, onRemove, quantities, setQty }) {
  const [showForm, setShowForm] = useState(false);
  const [nm, setNm] = useState("");
  const [bp, setBp] = useState("");
  const [sp, setSp] = useState("");

  const handleAdd = () => {
    if (!nm.trim()) return;
    onAdd({ name: nm.trim(), sellPrice: parseInt(bp) || 0, starPrice: parseInt(sp) || 0 });
    setNm(""); setBp(""); setSp(""); setShowForm(false);
  };

  return (
    <div style={{ marginTop:"6px" }}>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
        {customFish.map(f => (
          <div key={f.id} style={{ display:"inline-flex", alignItems:"center", gap:"2px" }}>
            <IngChip name={f.name} qty={quantities[f.id] || 0} onQtyChange={qty => setQty(f.id, qty)} />
            <button className="remove-x" title="Remove" onClick={() => onRemove(f.id)}>×</button>
          </div>
        ))}
      </div>

      {!showForm ? (
        <button className="btn-add-custom" onClick={() => setShowForm(true)}>
          + Add fish
        </button>
      ) : (
        <div className="custom-fish-form">
          <input className="custom-form-input name" placeholder="Fish name" value={nm}
            onChange={e => setNm(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
          <input className="custom-form-input price" type="number" placeholder="Base g" value={bp}
            onChange={e => setBp(e.target.value)} />
          <input className="custom-form-input price" type="number" placeholder="⭐ g" value={sp}
            onChange={e => setSp(e.target.value)} />
          <button className="btn-green" onClick={handleAdd}>Add</button>
          <button className="btn-ghost" onClick={() => { setShowForm(false); setNm(""); setBp(""); setSp(""); }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════ */
export default function App() {
  const [quantities,   setQuantities]   = useState({});
  const [costs,        setCosts]        = useState(
    Object.fromEntries([
      ...ALL_ITEMS.map(i => [i.id, i.sellPrice]),
      ...ALL_ITEMS.map(i => [i.id + "_star", i.starPrice]),
    ])
  );
  const [customFish,   setCustomFish]   = useState([]); // [{id,name,sellPrice,starPrice,provides}]
  const [tab,          setTab]          = useState("optimize");
  const [starQuality,  setStarQuality]  = useState(false);
  const [showCosts,    setShowCosts]    = useState(false);
  const [filter,       setFilter]       = useState("all");
  const [search,       setSearch]       = useState("");
  const [sortBy,       setSortBy]       = useState("net");

  const setQty  = (id, qty) => setQuantities(p => ({ ...p, [id]: Math.max(0, qty) }));
  const setCost = (id, v)   => setCosts(p => ({ ...p, [id]: Math.max(0, v) }));

  const hasAny = Object.values(quantities).some(q => q > 0);
  const activeIngs = useMemo(() =>
    [...ALL_ITEMS, ...customFish].filter(i => (quantities[i.id] || 0) > 0),
  [quantities, customFish]);

  // Custom fish as "items" for pool building
  const customFishItems = useMemo(() =>
    customFish.map(f => ({ ...f, provides: ["any_fish"] })),
  [customFish]);

  // Shared pool and cost maps
  const avail        = useMemo(() => buildPool(quantities, customFishItems), [quantities, customFishItems]);
  const cheapestCost = useMemo(() => buildCheapest(quantities, costs, starQuality, customFishItems), [quantities, costs, starQuality, customFishItems]);

  // Optimizer
  const optResult = useMemo(() =>
    hasAny ? runOptimizer(quantities, costs, starQuality, customFishItems) : null,
  [quantities, costs, starQuality, customFishItems]);

  // Browse recipe statuses
  const withStatus = useMemo(() => RECIPES.map(r => {
    const cooks = r.ings.reduce((min, { id, qty }) =>
      Math.min(min, Math.floor((avail[id] || 0) / qty)), Infinity);
    const cookCount = cooks === Infinity ? 0 : cooks;
    const ingStatus = r.ings.map(({ id, qty }) => {
      const have = avail[id] || 0;
      return { id, qty, have, ok: Math.floor(have / qty) >= 1 };
    });
    const missing = ingStatus.filter(s => s.have === 0);
    const partial = ingStatus.filter(s => s.have > 0 && !s.ok);
    const costPerCook = r.ings.reduce((s, { id, qty }) => s + (cheapestCost[id] || 0) * qty, 0);
    const grossPerCook = r.servings * (starQuality ? r.starSellPrice : r.sellPrice);
    const netPerCook = grossPerCook - costPerCook;
    return {
      ...r, cooks: cookCount, ingStatus, missing, partial,
      costPerCook, netPerCook,
      totalNet: Math.round(cookCount * netPerCook),
      totalGross: Math.round(cookCount * grossPerCook),
    };
  }), [avail, cheapestCost, starQuality]);

  const cookableCount = withStatus.filter(r => r.cooks >= 1).length;
  const almostCount   = withStatus.filter(r => r.cooks === 0
    && r.missing.length + r.partial.length <= 2
    && r.ings.some(i => (avail[i.id] || 0) > 0)).length;

  const displayed = useMemo(() => {
    let list = withStatus;
    if (filter === "cookable") list = list.filter(r => r.cooks >= 1);
    else if (filter === "almost") list = list.filter(r =>
      r.cooks === 0 && r.missing.length + r.partial.length <= 2 && r.ings.some(i => (avail[i.id] || 0) > 0));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) ||
        r.ings.some(i => lbl(i.id).toLowerCase().includes(q)));
    }
    return [...list].sort((a, b) => {
      const ac = a.cooks >= 1, bc = b.cooks >= 1;
      if (ac !== bc) return ac ? -1 : 1;
      if (sortBy === "net")   return b.totalNet - a.totalNet;
      if (sortBy === "gross") return b.totalGross - a.totalGross;
      if (sortBy === "price") return (b.sellPrice || 0) - (a.sellPrice || 0);
      if (sortBy === "cooks") return b.cooks - a.cooks;
      if (sortBy === "alpha") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [withStatus, filter, search, sortBy, avail]);

  // Custom fish management
  let fishCounter = 0;
  const addCustomFish = ({ name, sellPrice, starPrice }) => {
    const id = `custom_fish_${Date.now()}`;
    setCustomFish(p => [...p, { id, name, sellPrice, starPrice, provides: ["any_fish"] }]);
    setCosts(p => ({ ...p, [id]: sellPrice, [id + "_star"]: starPrice }));
    setQty(id, 1);
  };
  const removeCustomFish = (id) => {
    setCustomFish(p => p.filter(f => f.id !== id));
    setQuantities(p => { const n = {...p}; delete n[id]; return n; });
  };

  const g = n => n.toLocaleString() + "g";
  const clearAll = () => { setQuantities({}); setCustomFish([]); };

  return (
    <div style={{ fontFamily:"'Crimson Text',Georgia,serif", background:"#EDE0C8", minHeight:"100vh", padding:"16px" }}>
      <style>{STYLE}</style>

      <div style={{ textAlign:"center", marginBottom:"14px" }}>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:"22px", color:"#2A4D10", margin:0 }}>
          🍳 Palia Cooking Profit Helper
        </h1>
        <p style={{ color:"#6B4A00", fontSize:"13px", margin:"3px 0 0" }}>
          Enter your ingredients · get a cooking plan that maximises net gold
        </p>
      </div>

      <div className="layout" style={{ display:"flex", gap:"14px", maxWidth:"1200px", margin:"0 auto" }}>

        {/* ══ LEFT ══ */}
        <div style={{ flex:"0 0 315px", minWidth:"255px", display:"flex", flexDirection:"column", gap:"10px" }}>

          {/* Ingredient panel */}
          <div className="panel-box">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:"13.5px", color:"#2A4D10", fontWeight:600 }}>My Ingredients</span>
              {hasAny && <button onClick={clearAll}
                style={{ background:"none", border:"none", color:"#8B4000", cursor:"pointer", fontSize:"12px", textDecoration:"underline", fontFamily:"inherit" }}>
                Clear all
              </button>}
            </div>
            <div style={{ fontSize:"11px", color:"#8B6914", marginBottom:"8px" }}>
              Click to add · type or use −/+ to set quantity
            </div>
            <div className="scroll">
              {INGREDIENT_CATEGORIES.map(cat => (
                <div key={cat.name}>
                  <div className="cat-label">{cat.icon} {cat.name}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"4px" }}>
                    {cat.items.map(item => (
                      <IngChip key={item.id} name={item.name}
                        qty={quantities[item.id] || 0}
                        onQtyChange={qty => setQty(item.id, qty)} />
                    ))}
                  </div>
                  {/* Custom fish section under Fish category */}
                  {cat.name === "Fish" && (
                    <CustomFishPanel
                      customFish={customFish}
                      onAdd={addCustomFish}
                      onRemove={removeCustomFish}
                      quantities={quantities}
                      setQty={setQty} />
                  )}
                </div>
              ))}
            </div>
            {hasAny && (
              <div style={{ marginTop:"8px", padding:"7px", background:"#EAF3D6", borderRadius:"7px",
                fontSize:"12px", color:"#2A4D10", textAlign:"center" }}>
                <strong>{Object.values(quantities).reduce((s,q)=>s+q,0)}</strong> items ·{" "}
                <strong>{cookableCount}</strong> recipe{cookableCount!==1?"s":""} ready
              </div>
            )}
          </div>

          {/* Ingredient costs */}
          <div className="panel-box">
            <button className="section-toggle" onClick={() => setShowCosts(v => !v)}>
              <span>{showCosts?"▼":"▶"}</span>
              <span>Override Ingredient Costs</span>
              <span style={{ fontSize:"10px", color:"#8B6914", fontFamily:"'Crimson Text',serif", fontWeight:400, marginLeft:"auto" }}>
                {activeIngs.length} active
              </span>
            </button>
            {showCosts && (
              <>
                <div style={{ fontSize:"10.5px", color:"#8B6914", margin:"6px 0 8px", lineHeight:1.4 }}>
                  Prices are pre-loaded from your spreadsheet. Adjust here if anything changes.
                </div>
                {activeIngs.length === 0
                  ? <div style={{ fontSize:"12px", color:"#9B7B2E", padding:"6px 0" }}>No ingredients selected.</div>
                  : <div style={{ maxHeight:"220px", overflowY:"auto" }}>
                      {activeIngs.map(item => (
                        <div key={item.id} className="cost-row">
                          <span style={{ fontSize:"12px" }}>{item.name}</span>
                          <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
                            <input type="number" min="0" className="cost-input"
                              value={costs[item.id] ?? item.sellPrice}
                              onChange={e => setCost(item.id, parseInt(e.target.value)||0)} />
                            <span style={{ fontSize:"10px", color:"#8B6914" }}>base</span>
                            <input type="number" min="0" className="cost-input"
                              value={costs[item.id+"_star"] ?? item.starPrice}
                              onChange={e => setCost(item.id+"_star", parseInt(e.target.value)||0)} />
                            <span style={{ fontSize:"10px", color:"#8B6914" }}>⭐</span>
                          </div>
                        </div>
                      ))}
                    </div>}
              </>
            )}
          </div>

          {/* Star quality */}
          <div className="panel-box" style={{ padding:"10px 13px" }}>
            <label className="star-toggle">
              <input type="checkbox" checked={starQuality} onChange={e => setStarQuality(e.target.checked)} />
              <span>⭐ Use star quality prices</span>
            </label>
            <div style={{ fontSize:"10.5px", color:"#8B6914", marginTop:"4px", lineHeight:1.4 }}>
              Uses your actual star sell prices (not a 1.5× estimate) and star ingredient costs.
            </div>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div style={{ flex:1, minWidth:"260px" }}>
          <div style={{ borderBottom:"2px solid #D4B896", marginBottom:"12px", display:"flex" }}>
            <button className={`tab-btn ${tab==="optimize"?"active":""}`} onClick={() => setTab("optimize")}>📊 Optimize</button>
            <button className={`tab-btn ${tab==="browse"?"active":""}`} onClick={() => setTab("browse")}>📖 Browse All</button>
          </div>

          {/* ── OPTIMIZE ── */}
          {tab === "optimize" && (
            <div>
              {!hasAny ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:"40px", marginBottom:"12px" }}>🧺</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"16px", color:"#2A4D10", marginBottom:"6px" }}>Add your ingredients</div>
                  <div style={{ fontSize:"13.5px", color:"#8B6914" }}>
                    Select ingredients on the left and the optimizer will build the best cooking plan to maximise your net gold.
                  </div>
                </div>
              ) : !optResult || optResult.plan.length === 0 ? (
                <div style={{ textAlign:"center", padding:"50px 20px" }}>
                  <div style={{ fontSize:"36px", marginBottom:"10px" }}>😔</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"15px", color:"#8B4000", marginBottom:"6px" }}>No profitable recipes available</div>
                  <div style={{ fontSize:"13px", color:"#8B6914" }}>
                    Cooking would cost more than selling raw with current prices. Try adjusting ingredient costs or adding more ingredients.
                  </div>
                </div>
              ) : (
                <div className="scroll">
                  <div className="summary-bar">
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", fontWeight:700, marginRight:"4px" }}>Cooking Plan</div>
                    <div style={{ flex:1 }} />
                    <div className="summary-stat">
                      <span className="summary-val" style={{ color:"#A8E890" }}>+{g(optResult.totalNet)}</span>
                      <span className="summary-lbl">Net Profit</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-val">{g(optResult.totalGross)}</span>
                      <span className="summary-lbl">Gross Revenue</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-val" style={{ color:"#FFB09A" }}>−{g(optResult.totalCost)}</span>
                      <span className="summary-lbl">Ingredient Cost</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-val">{optResult.totalDishes}</span>
                      <span className="summary-lbl">Total Dishes</span>
                    </div>
                  </div>

                  {optResult.plan.map((p, i) => (
                    <div key={p.name} className="plan-card">
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"10px" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"14.5px", color:"#1A3A08", fontWeight:700, marginBottom:"3px" }}>
                            #{i+1} &nbsp;{p.name}
                          </div>
                          <div style={{ fontSize:"12px", color:"#5A7A40", marginBottom:"5px" }}>
                            🍳 Cook <strong>{p.cooks}×</strong> → <strong>{p.totalDishes}</strong> dish{p.totalDishes!==1?"es":""} · {p.sellPrice}g each
                          </div>
                          <div style={{ display:"flex", gap:"12px", fontSize:"12px", flexWrap:"wrap",
                            background:"#F0FAF0", padding:"5px 8px", borderRadius:"6px" }}>
                            <span style={{ color:"#2A4D10" }}>Revenue: <strong>{g(p.grossRevenue)}</strong></span>
                            <span style={{ color:"#8B4000" }}>− Cost: <strong>{g(p.ingredientCost)}</strong></span>
                            <span style={{ fontWeight:700, color:p.netProfit>=0?"#155724":"#7B1717" }}>
                              = Net: <strong>{p.netProfit>=0?"+":""}{g(p.netProfit)}</strong>
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"20px", fontWeight:700,
                            color:p.netProfit>=0?"#1A6E1A":"#8B0000", lineHeight:1.1 }}>
                            {p.netProfit>=0?"+":""}{g(p.netProfit)}
                          </div>
                          <div style={{ fontSize:"10.5px", color:"#888" }}>net profit</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {optResult.leftover.length > 0 && (
                    <div className="panel-box" style={{ marginTop:"10px" }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", color:"#8B6914", marginBottom:"7px", fontWeight:600 }}>
                        🧺 Leftover Ingredients
                      </div>
                      {optResult.leftover.map(l => (
                        <span key={l.id} className="leftover-chip">{l.name} ×{l.qty}</span>
                      ))}
                      <div style={{ fontSize:"11px", color:"#9B7B2E", marginTop:"7px" }}>
                        These couldn't be profitably used with current costs.
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize:"11px", color:"#9B7B50", marginTop:"10px", lineHeight:1.5 }}>
                    Greedy optimizer: highest net-profit recipes allocated first. Results are near-optimal for most inventories.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── BROWSE ── */}
          {tab === "browse" && (
            <div>
              <div style={{ display:"flex", gap:"5px", marginBottom:"8px", flexWrap:"wrap", alignItems:"center" }}>
                {[
                  {key:"all",      label:`All (${RECIPES.length})`},
                  {key:"cookable", label:`✅ Ready (${cookableCount})`},
                  {key:"almost",   label:`🔶 Close (${almostCount})`},
                ].map(t => (
                  <button key={t.key} className={`filter-btn ${filter===t.key?"active":""}`}
                    onClick={() => setFilter(t.key)}>{t.label}</button>
                ))}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ marginLeft:"auto", padding:"4px 8px", borderRadius:"16px", border:"1.5px solid #9B7B2E",
                    fontSize:"12px", fontFamily:"'Crimson Text',serif", background:"#FAF5E8", color:"#3A2800", cursor:"pointer" }}>
                  <option value="net">Sort: Total Net Gold</option>
                  <option value="gross">Sort: Total Gross</option>
                  <option value="price">Sort: Sell Price</option>
                  <option value="cooks">Sort: # Cooks</option>
                  <option value="alpha">Sort: A &amp; Z</option>
                </select>
                <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ padding:"4px 10px", borderRadius:"16px", border:"1.5px solid #9B7B2E", fontSize:"12px",
                    fontFamily:"'Crimson Text',serif", background:"#FAF5E8", color:"#3A2800", outline:"none", width:"120px" }} />
              </div>

              <div className="scroll">
                {displayed.map(r => {
                  const isAlmost = r.cooks===0 && r.missing.length+r.partial.length<=2 && r.ings.some(i=>(avail[i.id]||0)>0);
                  const cls = r.cooks>=1?"recipe-card cookable":isAlmost?"recipe-card almost":"recipe-card far";
                  const sp = starQuality ? r.starSellPrice : r.sellPrice;
                  return (
                    <div key={r.name} className={cls}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:"10px" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"14px", color:r.cooks>=1?"#1A3A08":"#4A3000", fontWeight:600, marginBottom:"3px" }}>
                            {r.cooks>=1?"✅":isAlmost?"🔶":"❌"} {r.name}
                          </div>
                          <div style={{ fontSize:"12px", color:"#8B6914" }}>
                            {r.cooks>=1
                              ? <><strong>🍳 ×{r.cooks}</strong> · {r.servings} dishes/cook · <span style={{fontWeight:700,color:r.totalNet>=0?"#1A6E1A":"#8B0000"}}>{r.totalNet>=0?"+":""}{r.totalNet}g net</span></>
                              : isAlmost ? `Need: ${[...r.missing,...r.partial].map(s=>lbl(s.id)).join(", ")}`
                                         : `Missing ${r.missing.length+r.partial.length} ingredient${r.missing.length+r.partial.length!==1?"s":""}`}
                          </div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"17px", color:"#C8922A", fontWeight:700 }}>{sp}g</div>
                          <div style={{ fontSize:"10px", color:"#999" }}>per dish{starQuality?" ⭐":""}</div>
                        </div>
                      </div>
                      <div style={{ marginTop:"7px", display:"flex", flexWrap:"wrap", gap:"4px" }}>
                        {r.ingStatus.map(({ id, qty, have, ok }) => (
                          <span key={id} className={`tag ${have===0?"miss":!ok?"partial":"have"}`}>
                            {have===0?"✗":!ok?"⚠":"✓"} {lbl(id)}{qty>1&&<span style={{opacity:0.7}}>×{qty}</span>}
                            {have>0&&<span style={{opacity:0.7}}> ({have})</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign:"center", color:"#9B7B50", fontSize:"11px", marginTop:"12px" }}>
        69 recipes · prices from your spreadsheet · star quality uses exact star prices, not an estimate
      </div>
    </div>
  );
}
