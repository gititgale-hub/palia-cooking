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
  .ing-chip-qty { font-weight:700; font-size:12px; min-width:18px; text-align:center;
    background:rgba(255,255,255,0.2); border-radius:10px; padding:0 4px; }
  .qty-btn { background:none; border:none; cursor:pointer; font-size:14px; line-height:1;
    padding:0 1px; color:inherit; opacity:0.85; font-family:inherit; }
  .qty-btn:hover { opacity:1; }
  .qty-add { background:none; border:1px solid currentColor; border-radius:50%;
    width:16px; height:16px; cursor:pointer; font-size:11px; padding:0; color:#7A5A10;
    margin-left:2px; display:flex; align-items:center; justify-content:center; }
  .qty-add:hover { background:#EDD99A; }

  .cost-row { display:flex; align-items:center; justify-content:space-between;
    padding:4px 0; border-bottom:1px solid #EDD9A8; font-size:12.5px; color:#3A2800; }
  .cost-row:last-child { border-bottom:none; }
  .cost-input { width:54px; text-align:right; border:1px solid #B09050; border-radius:5px;
    padding:2px 5px; font-family:'Crimson Text',serif; font-size:12.5px;
    background:#FAF5E8; color:#3A2800; outline:none; }
  .cost-input:focus { border-color:#2A4D10; background:#fff; }

  .tab-btn { padding:6px 18px; border:none; cursor:pointer; font-family:'Cinzel',serif;
    font-size:13px; font-weight:600; background:transparent; color:#8B6914;
    border-bottom:2px solid transparent; transition:all 0.15s; }
  .tab-btn.active { color:#2A4D10; border-bottom-color:#2A4D10; }
  .tab-btn:hover:not(.active) { color:#4A3000; }

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
  .plan-card.loss { border-left-color:#C87070; border-color:#E0B0A8; }

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

  .scroll { overflow-y:auto; max-height:calc(100vh - 165px); padding-right:3px; }
  .scroll::-webkit-scrollbar { width:4px; }
  .scroll::-webkit-scrollbar-thumb { background:#C8B090; border-radius:3px; }

  .star-toggle { display:inline-flex; align-items:center; gap:6px; cursor:pointer;
    font-size:12.5px; color:#8B6914; user-select:none; }
  .star-toggle input { cursor:pointer; }

  @media(max-width:740px){ .layout{flex-direction:column!important;}
    .scroll{max-height:none;} }
`;

/* ══════════════════════════════════════════════════════
   INGREDIENT DATA
══════════════════════════════════════════════════════ */
const INGREDIENT_CATEGORIES = [
  { name:"Fish", icon:"🐟", items:[
    { id:"trout",        name:"Trout",         provides:["any_fish","any_trout"],               sellPrice:30 },
    { id:"bass",         name:"Bass",          provides:["any_fish","any_bass"],                sellPrice:30 },
    { id:"bahari_bream", name:"Bahari Bream",  provides:["any_fish","any_bass","bahari_bream"], sellPrice:35 },
    { id:"catfish",      name:"Catfish",       provides:["any_fish","any_catfish"],             sellPrice:25 },
    { id:"other_fish",   name:"Other Fish",    provides:["any_fish"],                           sellPrice:20 },
  ]},
  { name:"Crustaceans & Seafood", icon:"🦀", items:[
    { id:"any_crab",    name:"Any Crab",    provides:["any_crab"],    sellPrice:30 },
    { id:"oyster_meat", name:"Oyster Meat", provides:["oyster_meat"], sellPrice:25 },
  ]},
  { name:"Meat", icon:"🥩", items:[
    { id:"chapaa_meat", name:"Chapaa Meat",    provides:["any_red_meat","chapaa_meat"], sellPrice:35 },
    { id:"sernuk_meat", name:"Sernuk Meat",    provides:["any_red_meat","sernuk_meat"], sellPrice:35 },
    { id:"muujin_meat", name:"Muujin Meat",    provides:["any_red_meat","muujin_meat"], sellPrice:40 },
    { id:"other_meat",  name:"Other Red Meat", provides:["any_red_meat"],               sellPrice:30 },
  ]},
  { name:"Mushrooms", icon:"🍄", items:[
    { id:"any_mushroom", name:"Any Mushroom", provides:["any_mushroom"], sellPrice:20 },
  ]},
  { name:"Vegetables", icon:"🥕", items:[
    { id:"tomato",      name:"Tomato",      provides:["tomato","any_vegetable"],          sellPrice:23 },
    { id:"carrot",      name:"Carrot",      provides:["carrot","any_vegetable"],          sellPrice:22 },
    { id:"potato",      name:"Potato",      provides:["potato","any_vegetable"],          sellPrice:22 },
    { id:"onion",       name:"Onion",       provides:["onion","any_vegetable"],           sellPrice:20 },
    { id:"corn",        name:"Corn",        provides:["corn","any_vegetable"],            sellPrice:20 },
    { id:"bok_choy",    name:"Bok Choy",    provides:["bok_choy"],                        sellPrice:18 },
    { id:"napa_cabbage",name:"Napa Cabbage",provides:["napa_cabbage"],                    sellPrice:20 },
    { id:"flowtato",    name:"Flowtato",    provides:["flowtato"],                        sellPrice:25 },
    { id:"rockhopper_pumpkin",name:"R. Pumpkin",provides:["rockhopper_pumpkin"],          sellPrice:35 },
    { id:"other_veg",   name:"Other Veg",   provides:["any_vegetable"],                   sellPrice:18 },
  ]},
  { name:"Herbs & Spices", icon:"🌿", items:[
    { id:"wild_garlic",      name:"Wild Garlic",      provides:["wild_garlic"],               sellPrice:15 },
    { id:"spice_sprouts",    name:"Spice Sprouts",    provides:["spice_sprouts","any_spice"], sellPrice:18 },
    { id:"dari_cloves",      name:"Dari Cloves",      provides:["dari_cloves","any_spice"],   sellPrice:20 },
    { id:"heat_root",        name:"Heat Root",        provides:["heat_root","any_spice"],     sellPrice:18 },
    { id:"wild_ginger",      name:"Wild Ginger",      provides:["wild_ginger"],               sellPrice:15 },
    { id:"wild_green_onion", name:"Wild Green Onion", provides:["wild_green_onion"],          sellPrice:12 },
    { id:"spicy_pepper",     name:"Spicy Pepper",     provides:["spicy_pepper"],              sellPrice:15 },
  ]},
  { name:"Dairy & Grains", icon:"🌾", items:[
    { id:"butter", name:"Butter", provides:["butter"], sellPrice:40 },
    { id:"milk",   name:"Milk",   provides:["milk"],   sellPrice:24 },
    { id:"egg",    name:"Egg",    provides:["egg"],    sellPrice:24 },
    { id:"wheat",  name:"Wheat",  provides:["wheat"],  sellPrice:20 },
    { id:"flour",  name:"Flour",  provides:["flour"],  sellPrice:18 },
    { id:"rice",   name:"Rice",   provides:["rice"],   sellPrice:32 },
  ]},
  { name:"Pantry", icon:"🫙", items:[
    { id:"cooking_oil", name:"Cooking Oil", provides:["cooking_oil"], sellPrice:15 },
    { id:"vinegar",     name:"Vinegar",     provides:["vinegar"],     sellPrice:15 },
    { id:"sweet_leaf",  name:"Sweet Leaf",  provides:["sweet_leaf"],  sellPrice:18 },
    { id:"salt",        name:"Salt",        provides:["salt"],        sellPrice:8  },
    { id:"honey",       name:"Honey",       provides:["honey"],       sellPrice:30 },
    { id:"sugar",       name:"Sugar",       provides:["sugar"],       sellPrice:15 },
    { id:"soy_sauce",   name:"Soy Sauce",   provides:["soy_sauce"],   sellPrice:15 },
    { id:"plant_fibre", name:"Plant Fibre", provides:["plant_fibre"], sellPrice:8  },
    { id:"any_kimchi",  name:"Any Kimchi",  provides:["any_kimchi"],  sellPrice:25 },
  ]},
  { name:"Fruits", icon:"🍎", items:[
    { id:"apple",          name:"Apple",          provides:["apple","any_fruit"],         sellPrice:40 },
    { id:"blueberries",    name:"Blueberries",    provides:["blueberries","any_fruit"],   sellPrice:30 },
    { id:"piksil_berries", name:"Piksil Berries", provides:["piksil_berries","any_fruit"],sellPrice:25 },
    { id:"other_fruit",    name:"Other Fruit",    provides:["any_fruit"],                 sellPrice:25 },
  ]},
  { name:"Special", icon:"✨", items:[
    { id:"batterfly_beans", name:"Batterfly Beans", provides:["batterfly_beans"], sellPrice:20 },
    { id:"kopaa_nuts",      name:"Kopaa Nuts",      provides:["kopaa_nuts"],      sellPrice:35 },
  ]},
  { name:"Rare Forage", icon:"🌸", items:[
    { id:"emerald_carpet_moss", name:"Emerald Carpet Moss", provides:["emerald_carpet_moss"], sellPrice:20 },
    { id:"crystal_lake_lotus",  name:"Crystal Lake Lotus",  provides:["crystal_lake_lotus"],  sellPrice:25 },
  ]},
];

const ING_MAP = {};
INGREDIENT_CATEGORIES.forEach(c => c.items.forEach(i => { ING_MAP[i.id] = i; }));
const ALL_ITEMS = INGREDIENT_CATEGORIES.flatMap(c => c.items);

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
};
const lbl = id => LABELS[id] || id.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());

/* ══════════════════════════════════════════════════════
   RECIPES (69)
══════════════════════════════════════════════════════ */
const RECIPES = [
  {name:"Congee",               sellPrice:53,  servings:1, ings:[{id:"rice",qty:2}]},
  {name:"Fisherman's Brew",     sellPrice:9,   servings:5, ings:[{id:"emerald_carpet_moss",qty:1},{id:"crystal_lake_lotus",qty:1}]},
  {name:"Grilled Fish",         sellPrice:60,  servings:1, ings:[{id:"any_fish",qty:2}]},
  {name:"Grilled Meat",         sellPrice:30,  servings:1, ings:[{id:"any_red_meat",qty:2}]},
  {name:"Grilled Mushrooms",    sellPrice:33,  servings:1, ings:[{id:"any_mushroom",qty:3}]},
  {name:"Grilled Oyster",       sellPrice:33,  servings:1, ings:[{id:"oyster_meat",qty:3}]},
  {name:"Macaron",              sellPrice:21,  servings:3, ings:[{id:"egg",qty:1},{id:"flour",qty:1},{id:"milk",qty:1},{id:"sweet_leaf",qty:1}]},
  {name:"Fish Tacos",           sellPrice:35,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_fish",qty:1},{id:"corn",qty:1}]},
  {name:"Fruit Smoothie Bowl",  sellPrice:95,  servings:3, ings:[{id:"milk",qty:1},{id:"blueberries",qty:1},{id:"apple",qty:3},{id:"piksil_berries",qty:1}]},
  {name:"Poke Bowl",            sellPrice:171, servings:3, ings:[{id:"vinegar",qty:1},{id:"any_fish",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"heat_root",qty:1}]},
  {name:"Crab Pot Pie",         sellPrice:62,  servings:3, ings:[{id:"butter",qty:1},{id:"corn",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"any_vegetable",qty:1},{id:"any_crab",qty:1}]},
  {name:"Creamy Carrot Soup",   sellPrice:32,  servings:3, ings:[{id:"carrot",qty:1},{id:"spice_sprouts",qty:1},{id:"milk",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Fish Stew",            sellPrice:19,  servings:3, ings:[{id:"any_fish",qty:1},{id:"any_spice",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Flowtato Fries",       sellPrice:72,  servings:3, ings:[{id:"salt",qty:1},{id:"cooking_oil",qty:1},{id:"flowtato",qty:1},{id:"vinegar",qty:1},{id:"tomato",qty:1}]},
  {name:"Hearty Vegetable Soup",sellPrice:21,  servings:3, ings:[{id:"any_mushroom",qty:1},{id:"any_vegetable",qty:1},{id:"any_spice",qty:1}]},
  {name:"Hot Hounds",           sellPrice:33,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Kimchi Fried Rice",    sellPrice:35,  servings:3, ings:[{id:"any_kimchi",qty:1},{id:"egg",qty:1},{id:"cooking_oil",qty:1},{id:"wild_garlic",qty:1},{id:"rice",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Meaty Stir-Fry",       sellPrice:36,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"wild_garlic",qty:1},{id:"any_vegetable",qty:1},{id:"rice",qty:1}]},
  {name:"Mushroom Quiche",      sellPrice:29,  servings:3, ings:[{id:"butter",qty:1},{id:"egg",qty:1},{id:"wheat",qty:1},{id:"any_mushroom",qty:1}]},
  {name:"Palian Onion Soup",    sellPrice:22,  servings:3, ings:[{id:"wild_garlic",qty:1},{id:"onion",qty:1},{id:"flour",qty:1}]},
  {name:"Ramen",                sellPrice:30,  servings:3, ings:[{id:"egg",qty:1},{id:"wheat",qty:1},{id:"wild_garlic",qty:1},{id:"any_mushroom",qty:1}]},
  {name:"Rice Cake Soup",       sellPrice:45,  servings:3, ings:[{id:"egg",qty:1},{id:"soy_sauce",qty:1},{id:"any_red_meat",qty:1},{id:"rice",qty:1},{id:"napa_cabbage",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Sashimi",              sellPrice:30,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_fish",qty:1},{id:"rice",qty:1}]},
  {name:"Sernuk Noodle Stew",   sellPrice:47,  servings:3, ings:[{id:"sernuk_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"carrot",qty:1}]},
  {name:"Soon Tofu",            sellPrice:120, servings:3, ings:[{id:"egg",qty:1},{id:"rice",qty:1},{id:"batterfly_beans",qty:3},{id:"wild_garlic",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Spicy Crab Fried Rice",sellPrice:88,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"soy_sauce",qty:1},{id:"egg",qty:1},{id:"any_crab",qty:1},{id:"rice",qty:1},{id:"wild_garlic",qty:1},{id:"spicy_pepper",qty:1},{id:"napa_cabbage",qty:1},{id:"corn",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Steamed Fish",         sellPrice:37,  servings:3, ings:[{id:"bahari_bream",qty:1},{id:"cooking_oil",qty:1},{id:"wild_ginger",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Stuffed Tomatoes",     sellPrice:45,  servings:3, ings:[{id:"butter",qty:1},{id:"tomato",qty:1},{id:"spice_sprouts",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Veggie Fried Rice",    sellPrice:47,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"egg",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1},{id:"carrot",qty:1},{id:"rice",qty:1}]},
  {name:"Quiche Caleri",        sellPrice:34,  servings:3, ings:[{id:"butter",qty:1},{id:"egg",qty:1},{id:"wheat",qty:1},{id:"any_mushroom",qty:1},{id:"any_red_meat",qty:1}]},
  {name:"Chapaa Asada Tacos",   sellPrice:50,  servings:3, ings:[{id:"salt",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1},{id:"corn",qty:1},{id:"onion",qty:1}]},
  {name:"Chapaa Masala",        sellPrice:130, servings:3, ings:[{id:"milk",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:2},{id:"tomato",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"heat_root",qty:1}]},
  {name:"Chapaa Onigiri",       sellPrice:34,  servings:3, ings:[{id:"salt",qty:1},{id:"rice",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Chilli Oil Dumplings", sellPrice:61,  servings:3, ings:[{id:"spice_sprouts",qty:1},{id:"any_red_meat",qty:1},{id:"any_vegetable",qty:1},{id:"wheat",qty:1},{id:"rice",qty:1},{id:"cooking_oil",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Crab Gumbo",           sellPrice:45,  servings:3, ings:[{id:"flour",qty:1},{id:"oyster_meat",qty:1},{id:"cooking_oil",qty:2},{id:"any_crab",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Fried Catfish Dinner", sellPrice:51,  servings:3, ings:[{id:"any_catfish",qty:1},{id:"flour",qty:1},{id:"any_spice",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1}]},
  {name:"Lucky Braised Fish",   sellPrice:187, servings:3, ings:[{id:"cooking_oil",qty:5},{id:"wild_ginger",qty:2},{id:"any_bass",qty:1},{id:"soy_sauce",qty:4},{id:"sugar",qty:4},{id:"spice_sprouts",qty:4},{id:"wild_green_onion",qty:5},{id:"vinegar",qty:1}]},
  {name:"Mushroom Dumpling Soup",sellPrice:58, servings:3, ings:[{id:"any_mushroom",qty:1},{id:"soy_sauce",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_ginger",qty:1},{id:"wheat",qty:1},{id:"carrot",qty:1},{id:"bok_choy",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Pan Fried Dumplings",  sellPrice:40,  servings:3, ings:[{id:"cooking_oil",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_ginger",qty:1},{id:"wheat",qty:1}]},
  {name:"Phoenixfire Relleno",  sellPrice:48,  servings:3, ings:[{id:"egg",qty:1},{id:"flour",qty:1},{id:"any_red_meat",qty:1},{id:"spicy_pepper",qty:2},{id:"spice_sprouts",qty:1},{id:"cooking_oil",qty:1}]},
  {name:"Pumpkin Curry & Rice", sellPrice:179, servings:3, ings:[{id:"rice",qty:1},{id:"onion",qty:1},{id:"spicy_pepper",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"heat_root",qty:1},{id:"kopaa_nuts",qty:1}]},
  {name:"Pumpkin Stew",         sellPrice:143, servings:3, ings:[{id:"any_red_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"onion",qty:1},{id:"heat_root",qty:1}]},
  {name:"Rice Cake Stir Fry",   sellPrice:116, servings:3, ings:[{id:"cooking_oil",qty:2},{id:"wild_garlic",qty:1},{id:"wild_ginger",qty:1},{id:"rice",qty:1},{id:"carrot",qty:1},{id:"bok_choy",qty:1},{id:"soy_sauce",qty:1},{id:"sugar",qty:1},{id:"spice_sprouts",qty:1},{id:"wild_green_onion",qty:1}]},
  {name:"Spicy Rice Cakes",     sellPrice:124, servings:3, ings:[{id:"cooking_oil",qty:2},{id:"spicy_pepper",qty:1},{id:"dari_cloves",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"heat_root",qty:1},{id:"rice",qty:1}]},
  {name:"Spicy Stir Fry",       sellPrice:50,  servings:3, ings:[{id:"salt",qty:1},{id:"any_red_meat",qty:1},{id:"wild_garlic",qty:1},{id:"any_vegetable",qty:1},{id:"rice",qty:1},{id:"cooking_oil",qty:1},{id:"spicy_pepper",qty:1}]},
  {name:"Sushi",                sellPrice:144, servings:3, ings:[{id:"dari_cloves",qty:1},{id:"any_fish",qty:1},{id:"heat_root",qty:1},{id:"vinegar",qty:1},{id:"rice",qty:1},{id:"sweet_leaf",qty:1}]},
  {name:"Veggie Chili",         sellPrice:148, servings:3, ings:[{id:"batterfly_beans",qty:3},{id:"salt",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"spicy_pepper",qty:1},{id:"onion",qty:1},{id:"corn",qty:1},{id:"carrot",qty:1},{id:"tomato",qty:1}]},
  {name:"Akwinduu Chapaa",      sellPrice:51,  servings:3, ings:[{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"potato",qty:1},{id:"any_mushroom",qty:1},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Bacon-Stuffed Mushrooms",sellPrice:67,servings:3, ings:[{id:"any_mushroom",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1},{id:"tomato",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Bouillabaisse",        sellPrice:57,  servings:3, ings:[{id:"any_bass",qty:1},{id:"oyster_meat",qty:1},{id:"wheat",qty:1},{id:"potato",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Cream of Mushroom Soup",sellPrice:51, servings:3, ings:[{id:"any_mushroom",qty:1},{id:"milk",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Cream of Tomato Soup", sellPrice:46,  servings:3, ings:[{id:"tomato",qty:1},{id:"milk",qty:1},{id:"wheat",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Loaded Flowtato",      sellPrice:42,  servings:3, ings:[{id:"flowtato",qty:1},{id:"onion",qty:1},{id:"any_red_meat",qty:1},{id:"milk",qty:1}]},
  {name:"Loaded Potato Soup",   sellPrice:50,  servings:3, ings:[{id:"potato",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Trout Dinner",         sellPrice:68,  servings:3, ings:[{id:"any_trout",qty:1},{id:"any_spice",qty:1},{id:"potato",qty:1},{id:"wild_garlic",qty:1}]},
  {name:"Apple Pie",            sellPrice:109, servings:3, ings:[{id:"wheat",qty:1},{id:"butter",qty:1},{id:"sweet_leaf",qty:1},{id:"apple",qty:3},{id:"spice_sprouts",qty:1}]},
  {name:"Blueberry Pie",        sellPrice:66,  servings:3, ings:[{id:"wheat",qty:1},{id:"butter",qty:1},{id:"sweet_leaf",qty:1},{id:"blueberries",qty:2},{id:"spice_sprouts",qty:1}]},
  {name:"Candied Kopaa Nuts",   sellPrice:23,  servings:3, ings:[{id:"salt",qty:1},{id:"honey",qty:1},{id:"milk",qty:1},{id:"sweet_leaf",qty:1},{id:"kopaa_nuts",qty:1}]},
  {name:"Celebration Cake",     sellPrice:188, servings:3, ings:[{id:"blueberries",qty:1},{id:"butter",qty:4},{id:"egg",qty:3},{id:"flour",qty:3},{id:"sweet_leaf",qty:4},{id:"any_fruit",qty:3},{id:"milk",qty:1},{id:"sugar",qty:3}]},
  {name:"Oysters Akwinduu",     sellPrice:90,  servings:3, ings:[{id:"oyster_meat",qty:1},{id:"salt",qty:5},{id:"spicy_pepper",qty:1},{id:"tomato",qty:1},{id:"onion",qty:1},{id:"wild_garlic",qty:1},{id:"heat_root",qty:1},{id:"butter",qty:1},{id:"any_red_meat",qty:1}]},
  {name:"Shepp's Pie",          sellPrice:64,  servings:3, ings:[{id:"salt",qty:1},{id:"corn",qty:1},{id:"potato",qty:1},{id:"carrot",qty:1},{id:"chapaa_meat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Spicy Honey-Baked Muujin",sellPrice:77,servings:3,ings:[{id:"honey",qty:1},{id:"spicy_pepper",qty:1},{id:"spice_sprouts",qty:1},{id:"muujin_meat",qty:1}]},
  {name:"Bean Burger",          sellPrice:221, servings:3, ings:[{id:"milk",qty:1},{id:"tomato",qty:2},{id:"onion",qty:2},{id:"batterfly_beans",qty:3},{id:"vinegar",qty:3},{id:"wild_garlic",qty:1},{id:"spice_sprouts",qty:1},{id:"egg",qty:1},{id:"cooking_oil",qty:1},{id:"wheat",qty:1}]},
  {name:"Elderwood Pie",        sellPrice:91,  servings:3, ings:[{id:"butter",qty:1},{id:"wheat",qty:3},{id:"any_red_meat",qty:1},{id:"spice_sprouts",qty:1},{id:"flowtato",qty:1},{id:"onion",qty:1}]},
  {name:"Muujin Bahari",        sellPrice:206, servings:3, ings:[{id:"butter",qty:2},{id:"wheat",qty:2},{id:"corn",qty:2},{id:"salt",qty:3},{id:"chapaa_meat",qty:1},{id:"any_mushroom",qty:1},{id:"spicy_pepper",qty:1},{id:"onion",qty:1},{id:"spice_sprouts",qty:2},{id:"wild_garlic",qty:1},{id:"muujin_meat",qty:3},{id:"plant_fibre",qty:3},{id:"cooking_oil",qty:3},{id:"vinegar",qty:1},{id:"egg",qty:1}]},
  {name:"Petit Fives",          sellPrice:81,  servings:3, ings:[{id:"sugar",qty:2},{id:"butter",qty:2},{id:"egg",qty:1},{id:"flour",qty:1},{id:"sweet_leaf",qty:2},{id:"milk",qty:1},{id:"any_fruit",qty:1},{id:"corn",qty:1}]},
  {name:"Pumpkin Pie",          sellPrice:36,  servings:3, ings:[{id:"butter",qty:1},{id:"milk",qty:1},{id:"rockhopper_pumpkin",qty:1},{id:"spice_sprouts",qty:1},{id:"wheat",qty:3}]},
  {name:"Steak Dinner",         sellPrice:34,  servings:3, ings:[{id:"any_red_meat",qty:1},{id:"wheat",qty:1},{id:"butter",qty:1},{id:"spice_sprouts",qty:1}]},
  {name:"Stuffed Cabbage Rolls",sellPrice:35,  servings:3, ings:[{id:"napa_cabbage",qty:1},{id:"any_red_meat",qty:1},{id:"any_mushroom",qty:1},{id:"carrot",qty:1},{id:"wild_green_onion",qty:1}]},
];

/* ══════════════════════════════════════════════════════
   OPTIMIZER ENGINE
══════════════════════════════════════════════════════ */
function buildPool(remaining) {
  const pool = {};
  ALL_ITEMS.forEach(item => {
    const q = remaining[item.id] || 0;
    if (q > 0) item.provides.forEach(p => { pool[p] = (pool[p] || 0) + q; });
  });
  return pool;
}

function buildCheapest(remaining, costs) {
  const map = {};
  ALL_ITEMS.forEach(item => {
    if ((remaining[item.id] || 0) > 0) {
      const c = costs[item.id] ?? 0;
      item.provides.forEach(p => { if (map[p] === undefined || c < map[p]) map[p] = c; });
    }
  });
  return map;
}

function maxCooksFromPool(recipe, pool) {
  return recipe.ings.reduce((min, { id, qty }) =>
    Math.min(min, Math.floor((pool[id] || 0) / qty)), Infinity
  );
}

// Deduct ingredients from remaining, using most-abundant provider first for "any_X"
function deductIngredients(recipe, numCooks, remaining) {
  for (const { id, qty } of recipe.ings) {
    let need = qty * numCooks;
    const providers = ALL_ITEMS
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

function runOptimizer(quantities, costs, starQuality) {
  const multiplier = starQuality ? 1.5 : 1;
  const remaining = { ...quantities };

  // Score each recipe by net profit per cook (using initial ingredient availability)
  const cheapest0 = buildCheapest(remaining, costs);
  const scored = RECIPES.map(r => {
    const costPerCook = r.ings.reduce((s, { id, qty }) => s + (cheapest0[id] || 0) * qty, 0);
    const grossPerCook = r.servings * (r.sellPrice || 0) * multiplier;
    const netPerCook = grossPerCook - costPerCook;
    return { ...r, costPerCook, grossPerCook, netPerCook };
  })
  .filter(r => r.netPerCook > 0)
  .sort((a, b) => b.netPerCook - a.netPerCook);

  const plan = [];

  for (const recipe of scored) {
    const pool = buildPool(remaining);
    const cooks = maxCooksFromPool(recipe, pool);
    if (cooks > 0 && cooks !== Infinity) {
      deductIngredients(recipe, cooks, remaining);
      plan.push({
        name:           recipe.name,
        cooks,
        servings:       recipe.servings,
        totalDishes:    cooks * recipe.servings,
        sellPrice:      recipe.sellPrice,
        grossRevenue:   Math.round(cooks * recipe.grossPerCook),
        ingredientCost: Math.round(cooks * recipe.costPerCook),
        netProfit:      Math.round(cooks * recipe.netPerCook),
      });
    }
  }

  // Sort output by net profit desc
  plan.sort((a, b) => b.netProfit - a.netProfit);

  const leftover = Object.entries(remaining)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => ({ id, qty, name: ING_MAP[id]?.name || lbl(id) }));

  return {
    plan,
    totalGross:  plan.reduce((s, p) => s + p.grossRevenue, 0),
    totalCost:   plan.reduce((s, p) => s + p.ingredientCost, 0),
    totalNet:    plan.reduce((s, p) => s + p.netProfit, 0),
    totalDishes: plan.reduce((s, p) => s + p.totalDishes, 0),
    leftover,
  };
}

/* ══════════════════════════════════════════════════════
   INGREDIENT CHIP
══════════════════════════════════════════════════════ */
function IngChip({ name, qty, onQtyChange }) {
  const active = qty > 0;
  return (
    <div className={`ing-chip ${active ? "active" : ""}`}>
      <span className="ing-chip-name" onClick={() => onQtyChange(active ? 0 : 1)}>{name}</span>
      {active ? (
        <>
          <button className="qty-btn" onClick={e => { e.stopPropagation(); onQtyChange(Math.max(0, qty - 1)); }}>−</button>
          <span className="ing-chip-qty">{qty}</span>
          <button className="qty-btn" onClick={e => { e.stopPropagation(); onQtyChange(qty + 1); }}>+</button>
        </>
      ) : (
        <button className="qty-add" onClick={e => { e.stopPropagation(); onQtyChange(1); }}>+</button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════ */
export default function App() {
  const [quantities, setQuantities] = useState({});
  const [costs, setCosts] = useState(
    Object.fromEntries(ALL_ITEMS.map(i => [i.id, i.sellPrice]))
  );
  const [tab,        setTab]        = useState("optimize"); // "optimize" | "browse"
  const [starQuality,setStarQuality]= useState(false);
  const [showCosts,  setShowCosts]  = useState(false);
  // Browse state
  const [filter,  setFilter]  = useState("all");
  const [search,  setSearch]  = useState("");
  const [sortBy,  setSortBy]  = useState("net");

  const setQty  = (id, qty) => setQuantities(p => ({ ...p, [id]: Math.max(0, qty) }));
  const setCost = (id, v)   => setCosts(p => ({ ...p, [id]: Math.max(0, v) }));

  const hasAny = Object.values(quantities).some(q => q > 0);
  const activeIngs = useMemo(() =>
    ALL_ITEMS.filter(i => (quantities[i.id] || 0) > 0), [quantities]);

  // ── Shared: available pool & cheapest cost ──
  const avail = useMemo(() => buildPool(quantities), [quantities]);
  const cheapestCost = useMemo(() => buildCheapest(quantities, costs), [quantities, costs]);

  // ── Optimizer result ──
  const optResult = useMemo(() =>
    hasAny ? runOptimizer(quantities, costs, starQuality) : null,
  [quantities, costs, starQuality]);

  // ── Browse: recipe statuses ──
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
    const grossPerCook = r.servings * (r.sellPrice || 0) * (starQuality ? 1.5 : 1);
    const netPerCook = grossPerCook - costPerCook;
    return { ...r, cooks: cookCount, ingStatus, missing, partial,
             costPerCook, grossPerCook, netPerCook,
             totalNet: Math.round(cookCount * netPerCook),
             totalGross: Math.round(cookCount * grossPerCook) };
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
      return 0;
    });
  }, [withStatus, filter, search, sortBy, avail]);

  const g = n => n.toLocaleString() + "g";

  return (
    <div style={{ fontFamily:"'Crimson Text',Georgia,serif", background:"#EDE0C8", minHeight:"100vh", padding:"16px" }}>
      <style>{STYLE}</style>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"14px" }}>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:"22px", color:"#2A4D10", margin:0 }}>
          🍳 Palia Cooking Profit Helper
        </h1>
        <p style={{ color:"#6B4A00", fontSize:"13px", margin:"3px 0 0" }}>
          Enter your ingredients · get a cooking plan that maximizes net gold
        </p>
      </div>

      <div className="layout" style={{ display:"flex", gap:"14px", maxWidth:"1200px", margin:"0 auto" }}>

        {/* ══ LEFT: Ingredients + Costs ══ */}
        <div style={{ flex:"0 0 310px", minWidth:"255px", display:"flex", flexDirection:"column", gap:"10px" }}>

          {/* Ingredient quantities */}
          <div className="panel-box">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:"13.5px", color:"#2A4D10", fontWeight:600 }}>My Ingredients</span>
              {hasAny && <button onClick={() => setQuantities({})}
                style={{ background:"none", border:"none", color:"#8B4000", cursor:"pointer", fontSize:"12px", textDecoration:"underline", fontFamily:"inherit" }}>
                Clear all
              </button>}
            </div>
            <div style={{ fontSize:"11px", color:"#8B6914", marginBottom:"8px" }}>Click to add · −/+ to set quantity</div>
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
                </div>
              ))}
            </div>
            {hasAny && (
              <div style={{ marginTop:"8px", padding:"7px", background:"#EAF3D6", borderRadius:"7px", fontSize:"12px", color:"#2A4D10", textAlign:"center" }}>
                <strong>{Object.values(quantities).reduce((s,q)=>s+q,0)}</strong> items across <strong>{activeIngs.length}</strong> ingredients
              </div>
            )}
          </div>

          {/* Costs panel */}
          <div className="panel-box">
            <button className="section-toggle" onClick={() => setShowCosts(v => !v)}>
              <span>{showCosts ? "▼" : "▶"}</span>
              <span>Ingredient Costs</span>
              <span style={{ fontSize:"10.5px", color:"#8B6914", fontFamily:"'Crimson Text',serif", fontWeight:400, marginLeft:"auto" }}>
                {activeIngs.length} active
              </span>
            </button>
            {showCosts && (
              <>
                <div style={{ fontSize:"10.5px", color:"#8B6914", margin:"6px 0 8px", lineHeight:1.4 }}>
                  Opportunity cost per unit — what you'd earn selling it raw. Defaults are estimates; correct them to improve accuracy.
                </div>
                {activeIngs.length === 0
                  ? <div style={{ fontSize:"12px", color:"#9B7B2E", padding:"6px 0" }}>No ingredients selected.</div>
                  : <div style={{ maxHeight:"200px", overflowY:"auto" }}>
                      {activeIngs.map(item => (
                        <div key={item.id} className="cost-row">
                          <span>{item.name}</span>
                          <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                            <input type="number" min="0" className="cost-input"
                              value={costs[item.id] ?? item.sellPrice}
                              onChange={e => setCost(item.id, parseInt(e.target.value) || 0)} />
                            <span style={{ fontSize:"11px", color:"#8B6914" }}>g</span>
                          </div>
                        </div>
                      ))}
                    </div>}
              </>
            )}
          </div>

          {/* Star quality toggle */}
          <div className="panel-box" style={{ padding:"10px 13px" }}>
            <label className="star-toggle">
              <input type="checkbox" checked={starQuality} onChange={e => setStarQuality(e.target.checked)} />
              <span>⭐ Assume star quality (1.5× sell price)</span>
            </label>
          </div>
        </div>

        {/* ══ RIGHT: Tabs ══ */}
        <div style={{ flex:1, minWidth:"260px" }}>
          {/* Tab bar */}
          <div style={{ borderBottom:"2px solid #D4B896", marginBottom:"12px", display:"flex", gap:"0" }}>
            <button className={`tab-btn ${tab==="optimize"?"active":""}`} onClick={() => setTab("optimize")}>
              📊 Optimize
            </button>
            <button className={`tab-btn ${tab==="browse"?"active":""}`} onClick={() => setTab("browse")}>
              📖 Browse All
            </button>
          </div>

          {/* ── OPTIMIZE TAB ── */}
          {tab === "optimize" && (
            <div>
              {!hasAny ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:"40px", marginBottom:"12px" }}>🧺</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"16px", color:"#2A4D10", marginBottom:"6px" }}>Add your ingredients</div>
                  <div style={{ fontSize:"13.5px", color:"#8B6914" }}>
                    Select ingredients on the left and the optimizer will work out the best cooking plan to maximize your net gold.
                  </div>
                </div>
              ) : !optResult || optResult.plan.length === 0 ? (
                <div style={{ textAlign:"center", padding:"50px 20px" }}>
                  <div style={{ fontSize:"36px", marginBottom:"10px" }}>😔</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"15px", color:"#8B4000", marginBottom:"6px" }}>No profitable recipes available</div>
                  <div style={{ fontSize:"13px", color:"#8B6914" }}>
                    With current ingredients and costs, cooking would lose gold vs. selling ingredients raw.
                    Try adjusting ingredient costs or adding more ingredients.
                  </div>
                </div>
              ) : (
                <div className="scroll">
                  {/* Summary bar */}
                  <div className="summary-bar">
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", fontWeight:700, marginRight:"4px" }}>
                      Cooking Plan
                    </div>
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

                  {/* Plan cards */}
                  {optResult.plan.map((p, i) => (
                    <div key={p.name} className={`plan-card ${p.netProfit < 0 ? "loss" : ""}`}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"10px" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"14.5px", color:"#1A3A08", fontWeight:700, marginBottom:"3px" }}>
                            #{i+1} &nbsp;{p.name}
                          </div>
                          <div style={{ fontSize:"12px", color:"#5A7A40", marginBottom:"5px" }}>
                            🍳 Cook <strong>{p.cooks}×</strong> &nbsp;→&nbsp;
                            <strong>{p.totalDishes}</strong> dish{p.totalDishes !== 1 ? "es" : ""} &nbsp;·&nbsp;
                            {p.sellPrice}g each{starQuality ? ` (⭐ ${Math.round(p.sellPrice*1.5)}g)` : ""}
                          </div>
                          {/* Breakdown bar */}
                          <div style={{ display:"flex", gap:"12px", fontSize:"12px", flexWrap:"wrap",
                                        background:"#F0FAF0", padding:"5px 8px", borderRadius:"6px" }}>
                            <span style={{ color:"#2A4D10" }}>Revenue: <strong>{g(p.grossRevenue)}</strong></span>
                            <span style={{ color:"#8B4000" }}>− Cost: <strong>{g(p.ingredientCost)}</strong></span>
                            <span style={{ fontWeight:700, color: p.netProfit >= 0 ? "#155724" : "#7B1717" }}>
                              = Net: <strong>{p.netProfit >= 0 ? "+" : ""}{g(p.netProfit)}</strong>
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"20px", fontWeight:700,
                                        color: p.netProfit >= 0 ? "#1A6E1A" : "#8B0000", lineHeight:1.1 }}>
                            {p.netProfit >= 0 ? "+" : ""}{g(p.netProfit)}
                          </div>
                          <div style={{ fontSize:"10.5px", color:"#888" }}>net profit</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Leftover ingredients */}
                  {optResult.leftover.length > 0 && (
                    <div className="panel-box" style={{ marginTop:"10px" }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", color:"#8B6914", marginBottom:"7px", fontWeight:600 }}>
                        🧺 Leftover Ingredients
                      </div>
                      <div>
                        {optResult.leftover.map(l => (
                          <span key={l.id} className="leftover-chip">
                            {l.name} ×{l.qty}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize:"11px", color:"#9B7B2E", marginTop:"7px" }}>
                        These couldn't be used in any positive-profit recipe with current costs.
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize:"11px", color:"#9B7B50", marginTop:"10px", lineHeight:1.5 }}>
                    Greedy optimizer: cooks highest-profit recipes first, then allocates remaining ingredients. Results are near-optimal for most inventories.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── BROWSE TAB ── */}
          {tab === "browse" && (
            <div>
              <div style={{ display:"flex", gap:"5px", marginBottom:"8px", flexWrap:"wrap", alignItems:"center" }}>
                {[
                  { key:"all",      label:`All (${RECIPES.length})` },
                  { key:"cookable", label:`✅ Ready (${cookableCount})` },
                  { key:"almost",   label:`🔶 Close (${almostCount})` },
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
                </select>
                <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ padding:"4px 10px", borderRadius:"16px", border:"1.5px solid #9B7B2E", fontSize:"12px",
                           fontFamily:"'Crimson Text',serif", background:"#FAF5E8", color:"#3A2800", outline:"none", width:"120px" }} />
              </div>

              <div className="scroll">
                {displayed.map(r => {
                  const isAlmost = r.cooks === 0 && r.missing.length + r.partial.length <= 2 && r.ings.some(i => (avail[i.id]||0) > 0);
                  const cls = r.cooks >= 1 ? "recipe-card cookable" : isAlmost ? "recipe-card almost" : "recipe-card far";
                  return (
                    <div key={r.name} className={cls}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:"10px" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"14px", color:r.cooks>=1?"#1A3A08":"#4A3000", fontWeight:600, marginBottom:"3px" }}>
                            {r.cooks>=1?"✅":isAlmost?"🔶":"❌"} {r.name}
                          </div>
                          <div style={{ fontSize:"12px", color:"#8B6914" }}>
                            {r.cooks>=1
                              ? <>🍳 ×{r.cooks} &nbsp;·&nbsp; {r.servings} dishes/cook &nbsp;·&nbsp; <span style={{fontWeight:700,color:r.totalNet>=0?"#1A6E1A":"#8B0000"}}>{r.totalNet>=0?"+":""}{r.totalNet}g net</span></>
                              : isAlmost ? `Need: ${[...r.missing,...r.partial].map(s=>lbl(s.id)).join(", ")}` : `Missing ${r.missing.length+r.partial.length} ingredient${r.missing.length+r.partial.length!==1?"s":""}`
                            }
                          </div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"17px", color:"#C8922A", fontWeight:700 }}>
                            {r.sellPrice}g
                          </div>
                          <div style={{ fontSize:"10px", color:"#999" }}>per dish</div>
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
        69 recipes · ingredient costs are estimates — open "Ingredient Costs" to correct them · star quality = 1.5× sell price
      </div>
    </div>
  );
}
