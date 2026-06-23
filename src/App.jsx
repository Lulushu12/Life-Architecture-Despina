import { useState } from "react";
import CycleGuide from './CycleGuide';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const p = {
  bg: "#13100d", surface: "#1e1812", surfaceAlt: "#261f17",
  border: "#3a2e22", accent: "#c8714a", accentLight: "#d4875f",
  teal: "#5fa897", gold: "#c9a84c", text: "#f0e8de",
  muted: "#8a7a6a", dim: "#5a4e42",
};

const goalData = {
  current: "80 kg", target: "65-67 kg",
  timeline: "End of August (~15 weeks)",
  expectation: "12-15 kg loss at 0.75-1 kg/week",
  restDay: { kcal: 1500, pr: 120, fat: 50, carbs: 130 },
  trainDay: { kcal: 1750, pr: 130, fat: 55, carbs: 160 },
};

const frameworkData = [
  { slot: "Breakfast", timing: "Within 1-2h of waking", kcal: "350-400 kcal", note: "Moderate protein, lower carb", optional: false },
{ slot: "Lunch", timing: "Midday — largest meal", kcal: "450-580 kcal", note: "Highest protein meal of the day", optional: false },
{ slot: "Dinner", timing: "Evening — shared with Radu", kcal: "490-570 kcal", note: "Same meal, adjusted portions", optional: false },
{ slot: "Snack", timing: "Only when genuinely hungry", kcal: "100-200 kcal", note: "Protein-focused. Pre/post workout on training days.", optional: true },
];

const weekData = [
  {
    day: "Monday", short: "MON", type: "rest",
    totals: { kcal: 1500, pr: 123, fat: 44, carbs: 146 },
    meals: [
      { slot: "Breakfast", kcal: 380, pr: 28, fat: 14, carbs: 38, name: "Shakshuka", desc: "2 eggs poached in tomato-pepper sauce (canned tomatoes, bell pepper, onion, garlic, cumin, paprika) + 1 slice whole wheat bread" },
      { slot: "Lunch", kcal: 480, pr: 42, fat: 12, carbs: 48, name: "Chicken Tabbouleh Bowl", desc: "Grilled chicken breast 150g + tabbouleh (60g bulgur dry, parsley, tomato, cucumber, lemon juice, 5ml olive oil)" },
      { slot: "Dinner", kcal: 490, pr: 38, fat: 18, carbs: 40, name: "Grilled Salmon + Quinoa", desc: "Grilled salmon fillet 140g + roasted mixed vegetables (zucchini, bell peppers, cherry tomatoes) + quinoa 55g dry", shared: true, raduNote: "Salmon 190g + quinoa 80g dry" },
      { slot: "Snack", kcal: 150, pr: 15, fat: 0, carbs: 20, name: "Greek Yogurt + Honey", desc: "Greek yogurt 0% fat 200g + 1 tsp honey", optional: true },
    ]
  },
{
  day: "Tuesday", short: "TUE", type: "training",
  totals: { kcal: 1750, pr: 127, fat: 43, carbs: 200 },
  meals: [
    { slot: "Breakfast", kcal: 400, pr: 22, fat: 8, carbs: 60, name: "Yogurt Oat Bowl", desc: "Greek yogurt 0% fat 200g + rolled oats 40g + mixed berries 80g + 1 tsp honey" },
    { slot: "Lunch", kcal: 580, pr: 45, fat: 14, carbs: 60, name: "Chicken Shawarma Bowl", desc: "Grilled chicken thigh skinless 160g + bulgur 65g dry + cucumber + tomato + 2 tbsp tzatziki + parsley" },
    { slot: "Pre/Post Workout", kcal: 200, pr: 20, fat: 5, carbs: 22, name: "Banana + Protein Shake", desc: "1 banana + protein shake 1 scoop (or labneh 100g + 1 rice cake)", training: true },
    { slot: "Dinner", kcal: 570, pr: 40, fat: 16, carbs: 58, name: "Shish Tawook + Fattoush", desc: "Chicken breast skewers 140g marinated in lemon, garlic, yogurt + fattoush salad (romaine, tomato, cucumber, pita croutons, sumac dressing) + half small pita", shared: true, raduNote: "Chicken 180g + full pita" },
  ]
},
{
  day: "Wednesday", short: "WED", type: "infraslim",
  totals: { kcal: 1600, pr: 126, fat: 56, carbs: 132 },
  meals: [
    { slot: "Breakfast", kcal: 380, pr: 30, fat: 22, carbs: 12, name: "Za'atar Omelette", desc: "3-egg omelette with feta 20g + fresh spinach + cherry tomatoes + za'atar" },
    { slot: "Lunch", kcal: 520, pr: 42, fat: 10, carbs: 58, name: "Lentil Soup + Grilled Chicken", desc: "Red lentil soup 300ml (lentils 60g dry, onion, cumin, lemon) + grilled chicken breast 130g + simple green salad" },
    { slot: "Snack", kcal: 180, pr: 16, fat: 8, carbs: 12, name: "Yogurt + Almonds", desc: "Greek yogurt 0% fat 150g + almonds 10g" },
    { slot: "Dinner", kcal: 520, pr: 38, fat: 16, carbs: 50, name: "Grilled Sea Bass + Bulgur", desc: "Grilled sea bass fillet 150g + roasted zucchini and peppers + bulgur 55g dry + lemon-herb dressing", shared: true, raduNote: "Sea bass 200g + bulgur 80g dry" },
  ]
},
{
  day: "Thursday", short: "THU", type: "rest",
  totals: { kcal: 1500, pr: 119, fat: 47, carbs: 132 },
  meals: [
    { slot: "Breakfast", kcal: 350, pr: 18, fat: 12, carbs: 42, name: "Labneh Plate", desc: "Labneh 80g + cucumber + cherry tomatoes + 1 small whole wheat pita 50g + dried herbs" },
    { slot: "Lunch", kcal: 500, pr: 38, fat: 12, carbs: 52, name: "Tuna Rice Salad", desc: "Canned tuna in water 120g drained + cherry tomatoes + cucumber + red onion + parsley + lemon juice + 5ml olive oil + brown rice 55g dry" },
    { slot: "Dinner", kcal: 500, pr: 38, fat: 18, carbs: 38, name: "Lamb Kofta + Greek Salad", desc: "Lean lamb mince kofta 130g grilled + Greek salad (tomato, cucumber, 5g olives, 15g feta, 5ml olive oil) + brown rice 45g dry", shared: true, raduNote: "Kofta 170g + rice 70g dry" },
    { slot: "Snack", kcal: 150, pr: 25, fat: 3, carbs: 8, name: "Protein Shake", desc: "1 scoop protein powder in water", optional: true },
  ]
},
{
  day: "Friday", short: "FRI", type: "training",
  totals: { kcal: 1700, pr: 118, fat: 56, carbs: 184 },
  meals: [
    { slot: "Breakfast", kcal: 400, pr: 26, fat: 18, carbs: 38, name: "Shakshuka + Labneh Toast", desc: "2-egg shakshuka + labneh 60g on the side + 1 slice whole wheat toast" },
    { slot: "Lunch", kcal: 560, pr: 44, fat: 14, carbs: 62, name: "Chicken Souvlaki Bowl", desc: "Grilled chicken breast 160g + roasted bell peppers and zucchini + quinoa 65g dry + 2 tbsp tzatziki + lemon" },
    { slot: "Pre/Post Workout", kcal: 200, pr: 8, fat: 8, carbs: 28, name: "Banana + Almond Butter", desc: "1 banana + 15g almond butter", training: true },
    { slot: "Dinner", kcal: 540, pr: 40, fat: 16, carbs: 56, name: "Greek Lemon Chicken", desc: "Chicken thigh skinless 140g baked with lemon, garlic, oregano + roasted root vegetables (sweet potato, carrot) + couscous 50g dry", shared: true, raduNote: "Chicken 190g + couscous 75g dry" },
  ]
},
{
  day: "Saturday", short: "SAT", type: "training",
  totals: { kcal: 1690, pr: 119, fat: 57, carbs: 164 },
  meals: [
    { slot: "Breakfast", kcal: 450, pr: 28, fat: 20, carbs: 40, name: "Full Mediterranean Breakfast", desc: "2 scrambled eggs + labneh 60g + 5 olives + cucumber + tomato + 1 slice whole wheat toast" },
    { slot: "Lunch", kcal: 520, pr: 36, fat: 14, carbs: 58, name: "Arabic Stuffed Peppers", desc: "2 bell peppers filled with lean mince 120g + brown rice 40g dry + herbs (parsley, mint, allspice) + tomato sauce, baked" },
    { slot: "Snack", kcal: 160, pr: 15, fat: 5, carbs: 16, name: "Yogurt + Honey + Walnuts", desc: "Greek yogurt 0% fat 150g + 1 tsp honey + walnuts 10g" },
    { slot: "Dinner", kcal: 560, pr: 40, fat: 18, carbs: 50, name: "Grilled Sea Bream + Tabbouleh", desc: "Grilled sea bream 180g + tabbouleh (bulgur 50g dry, parsley, tomato, lemon, minimal olive oil) + roasted vegetables", shared: true, raduNote: "Fish 220g + bulgur 70g dry" },
  ]
},
{
  day: "Sunday", short: "SUN", type: "rest",
  totals: { kcal: 1500, pr: 109, fat: 40, carbs: 156 },
  meals: [
    { slot: "Breakfast", kcal: 380, pr: 20, fat: 6, carbs: 62, name: "Yogurt Parfait", desc: "Greek yogurt 0% fat 200g + rolled oats 35g + mixed berries 80g + 1 tsp honey" },
    { slot: "Lunch", kcal: 480, pr: 36, fat: 12, carbs: 50, name: "Chicken & Chickpea Soup", desc: "Chicken breast 120g + chickpeas 60g canned + vegetables (carrot, zucchini, celery, onion) + 1 slice whole wheat bread" },
    { slot: "Dinner", kcal: 490, pr: 38, fat: 16, carbs: 44, name: "Chicken Tagine", desc: "Chicken thigh skinless 140g + chickpeas 50g + canned tomatoes + onion + cumin, coriander, cinnamon, ginger + couscous 50g dry", shared: true, raduNote: "Chicken 190g + couscous 75g dry" },
    { slot: "Snack", kcal: 150, pr: 4, fat: 10, carbs: 16, name: "Almonds + Fruit", desc: "Almonds 15g + 1 piece fruit", optional: true },
  ]
},
];

const emergencyData = [
  {
    slot: "Breakfast", note: "10 min or less — no cooking required",
    items: [
      { name: "Yogurt + Banana + Walnuts", kcal: 280, pr: 22, fat: 5, carbs: 38, desc: "Greek yogurt 0% 200g + 1 banana + 10g walnuts" },
      { name: "Hard-Boiled Eggs + Fruit + Rice Cake", kcal: 220, pr: 14, fat: 10, carbs: 20, desc: "2 hard-boiled eggs (prepped ahead) + 1 fruit + 1 rice cake" },
      { name: "Protein Shake + Banana", kcal: 260, pr: 26, fat: 4, carbs: 32, desc: "1 scoop protein powder + 1 banana" },
      { name: "Labneh Plate", kcal: 180, pr: 10, fat: 8, carbs: 16, desc: "Labneh 100g + cucumber + tomato + 1 rice cake" },
    ]
  },
{
  slot: "Lunch", note: "Quick-grab or minimal prep",
  items: [
    { name: "Tuna + Rice Cakes + Cucumber", kcal: 280, pr: 32, fat: 4, carbs: 24, desc: "Canned tuna 120g drained + rice cakes 3x + cucumber + lemon" },
    { name: "Rotisserie Chicken + Salad", kcal: 250, pr: 40, fat: 5, carbs: 0, desc: "Rotisserie chicken breast 150g (Mega Image/Lidl) + any salad, no dressing" },
    { name: "Turkey Pita", kcal: 300, pr: 26, fat: 5, carbs: 32, desc: "Deli turkey 100g + small whole wheat pita + mustard + tomato" },
    { name: "Chickpea Salad", kcal: 280, pr: 12, fat: 9, carbs: 38, desc: "Canned chickpeas 150g + cucumber + tomato + lemon + 5ml olive oil" },
  ]
},
{
  slot: "Dinner", note: "15 min or less",
  items: [
    { name: "Chicken + Frozen Veg + Rice", kcal: 430, pr: 44, fat: 6, carbs: 50, desc: "Grilled chicken breast 150g + frozen mixed vegetables microwaved + rice 50g dry" },
    { name: "Sardines + Salad + Bread", kcal: 350, pr: 28, fat: 14, carbs: 24, desc: "Canned sardines in tomato sauce 120g + large salad + 1 slice bread" },
    { name: "Scrambled Eggs + Vegetables", kcal: 320, pr: 22, fat: 18, carbs: 22, desc: "3 eggs scrambled + spinach + tomato + 1 slice bread" },
    { name: "Frozen Fish + Veg + Quinoa", kcal: 400, pr: 36, fat: 10, carbs: 44, desc: "Frozen grilled fish fillet + frozen vegetables + quinoa 50g dry" },
  ]
},
{
  slot: "Snack", note: "Protein-first options",
  items: [
    { name: "Protein Shake", kcal: 150, pr: 25, fat: 3, carbs: 8, desc: "1 scoop protein powder in water" },
    { name: "Greek Yogurt 0%", kcal: 110, pr: 18, fat: 0, carbs: 12, desc: "Greek yogurt 0% fat 200g — plain" },
    { name: "Rice Cake + Labneh", kcal: 130, pr: 7, fat: 5, carbs: 16, desc: "1 rice cake + labneh 60g" },
    { name: "Boiled Egg + Fruit", kcal: 130, pr: 7, fat: 5, carbs: 16, desc: "1 boiled egg + 1 piece fruit" },
  ]
},
];

const shoppingData = [
  { cat: "Proteins", icon: "🥩", items: ["Chicken breast — 600-700g","Chicken thigh skinless boneless — 500g","Salmon fillet — 2x 150-200g","Sea bass or sea bream — 2x 200g","Lean lamb mince — 300g","Lean beef/mixed mince — 200g","Canned tuna in water — 3x 120g","Eggs — 12","Greek yogurt 0% fat — 1.5kg","Labneh — 300g","Feta cheese — 100g","Protein powder — as needed"] },
{ cat: "Grains", icon: "🌾", items: ["Bulgur — 500g","Quinoa — 300g","Brown rice — 500g","Couscous — 300g","Rolled oats — 300g","Whole wheat bread — 1 loaf","Whole wheat pita — 4-6 small","Rice cakes — 1 pack"] },
{ cat: "Vegetables", icon: "🥦", items: ["Cherry tomatoes — 500g","Cucumber — 4","Bell peppers — 8 mixed","Zucchini — 4","Spinach — 200g bag","Romaine lettuce — 1 head","Red onion — 2","White onion — 2","Garlic — 1 head","Fresh parsley — 2 bunches","Fresh mint — 1 bunch","Carrot — 4","Sweet potato — 2","Celery — 1 stalk"] },
{ cat: "Fruit", icon: "🍋", items: ["Bananas — 6-7","Mixed berries (fresh or frozen) — 300g","Lemons — 5"] },
{ cat: "Pantry", icon: "🫙", items: ["Olive oil","Canned tomatoes — 3x 400g","Canned chickpeas — 2x 400g","Red lentils — 300g","Olives — small jar","Walnuts — 100g","Almonds — 100g","Honey — small jar","Za'atar, cumin, paprika, coriander, cinnamon, ginger, allspice, sumac, oregano","Mustard — small jar"] },
{ cat: "Emergency Pantry", icon: "🆘", items: ["Canned sardines in tomato sauce — 2 tins","Extra canned tuna — 2 tins","Extra rice cakes — 1 pack","Frozen mixed vegetables — 1 bag","Frozen fish fillet — 2 portions"] },
];

const typeColor = (type) => type === "training" ? p.teal : type === "infraslim" ? p.gold : p.muted;
const typeLabel = (type) => type === "training" ? "TRAINING DAY" : type === "infraslim" ? "INFRASLIM DAY" : "REST DAY";

const Pill = ({ label, value, color }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 7px", borderRadius:4, background:`${color}18`, border:`1px solid ${color}40`, fontSize:11, fontFamily:"'DM Sans',sans-serif", color, fontWeight:500, letterSpacing:"0.03em" }}>
  {label} <strong>{value}g</strong>
  </span>
);

const KcalTag = ({ kcal }) => (
  <span style={{ padding:"2px 8px", borderRadius:4, background:`${p.accent}1a`, border:`1px solid ${p.accent}50`, fontSize:11, color:p.accent, fontWeight:600 }}>
  {kcal} kcal
  </span>
);

function SHS() {
  const [tab, setTab] = useState("overview");
  const [day, setDay] = useState(0);
  const [checked, setChecked] = useState({});
  const toggle = (k) => setChecked(prev => ({ ...prev, [k]: !prev[k] }));

  const tabs = [
    { id:"overview", label:"Overview" },
    { id:"menu", label:"Weekly Menu" },
    { id:"emergency", label:"Emergency Meals" },
    { id:"shopping", label:"Shopping List" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:p.bg, color:p.text, fontFamily:"'DM Sans',sans-serif", paddingBottom:60 }}>
    <style>{FONTS}</style>

    {/* Header */}
    <div style={{ background:`linear-gradient(180deg,#201510 0%,${p.bg} 100%)`, borderBottom:`1px solid ${p.border}`, padding:"32px 24px 22px", textAlign:"center" }}>
    <div style={{ fontSize:10, color:p.muted, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>Sovereign Health System</div>
    <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, margin:"0 0 6px", letterSpacing:"-0.01em" }}>Despina</h1>
    <div style={{ fontSize:12, color:p.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>1,500 kcal base · 120g protein · Mediterranean & Arab</div>
    </div>

    {/* Tab bar */}
    <div style={{ display:"flex", borderBottom:`1px solid ${p.border}`, background:p.surface, overflowX:"auto" }}>
    {tabs.map(t => (
      <button key={t.id} onClick={() => setTab(t.id)} style={{
        padding:"13px 18px", fontSize:11, fontWeight: tab===t.id ? 600 : 400,
        color: tab===t.id ? p.accent : p.muted, cursor:"pointer", whiteSpace:"nowrap",
        letterSpacing:"0.09em", textTransform:"uppercase", background:"none",
        border:"none", borderBottom:`2px solid ${tab===t.id ? p.accent : "transparent"}`,
      }}>{t.label}</button>
    ))}
    </div>

    {/* Content */}
    <div style={{ padding:"22px 16px", maxWidth:700, margin:"0 auto" }}>

    {/* OVERVIEW */}
    {tab === "overview" && (
      <div>
      <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20, marginBottom:16 }}>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, margin:"0 0 14px" }}>Goal Snapshot</h3>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
      {[["Current Weight", goalData.current],["Target Weight", goalData.target],["Timeline", goalData.timeline],["Realistic Expectation", goalData.expectation]].map(([label,val]) => (
        <div key={label}>
        <div style={{ fontSize:10, color:p.muted, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</div>
        <div style={{ fontSize:13, fontWeight:500, marginTop:3 }}>{val}</div>
        </div>
      ))}
      </div>
      <div style={{ borderTop:`1px solid ${p.border}`, paddingTop:14, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
      {[{label:"Rest Day Budget", data:goalData.restDay, color:p.muted},{label:"Training Day Budget", data:goalData.trainDay, color:p.teal}].map(({label,data,color}) => (
        <div key={label} style={{ background:`${color}0d`, border:`1px solid ${color}30`, borderRadius:6, padding:12 }}>
        <div style={{ fontSize:10, color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>{label}</div>
        <div style={{ fontSize:20, fontWeight:700, color, marginBottom:6 }}>{data.kcal} kcal</div>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        <Pill label="P" value={data.pr} color={p.accent} />
        <Pill label="F" value={data.fat} color={p.gold} />
        <Pill label="C" value={data.carbs} color={p.teal} />
        </div>
        </div>
      ))}
      </div>
      </div>

      <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20, marginBottom:16 }}>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, margin:"0 0 6px" }}>Daily Meal Framework</h3>
      <div style={{ fontSize:11, color:p.muted, marginBottom:14 }}>No rigid clock times. Meals anchor to activity, not schedule.</div>
      {frameworkData.map((meal, i) => (
        <div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom: i<3 ? `1px solid ${p.border}` : "none", opacity: meal.optional ? 0.7 : 1 }}>
        <div style={{ minWidth:34, height:34, borderRadius:"50%", background:`${p.accent}18`, border:`1px solid ${p.accent}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:p.accent, flexShrink:0 }}>
        {i+1}{meal.optional?"*":""}
        </div>
        <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
        <span style={{ fontSize:14, fontWeight:600 }}>{meal.slot}</span>
        {meal.optional && <span style={{ fontSize:10, color:p.muted, background:p.border, borderRadius:3, padding:"1px 5px" }}>OPTIONAL</span>}
        </div>
        <div style={{ fontSize:12, color:p.muted }}>{meal.timing}</div>
        <div style={{ fontSize:11, color:p.dim, marginTop:1 }}>{meal.note}</div>
        </div>
        <div style={{ fontSize:12, color:p.accent, fontWeight:600, whiteSpace:"nowrap" }}>{meal.kcal}</div>
        </div>
      ))}
      <div style={{ marginTop:14, padding:11, background:`${p.teal}0d`, border:`1px solid ${p.teal}30`, borderRadius:6 }}>
      <div style={{ fontSize:10, color:p.teal, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>Shared Dinner Rule</div>
      <div style={{ fontSize:12 }}>Same meal, same prep — different portions. Despina: 130-150g protein + 50-60g carbs dry. Radu: 180-200g protein + 70-90g carbs dry.</div>
      </div>
      <div style={{ marginTop:10, padding:11, background:`${p.gold}0d`, border:`1px solid ${p.gold}30`, borderRadius:6 }}>
      <div style={{ fontSize:10, color:p.gold, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>4-Week Check</div>
      <div style={{ fontSize:12 }}>Loss below 0.5 kg/week: cut carbs by 20g. Energy crashes: add 100 kcal to lunch.</div>
      </div>
      </div>
      </div>
    )}

    {/* WEEKLY MENU */}
    {tab === "menu" && (
      <div>
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
      {weekData.map((d,i) => (
        <button key={i} onClick={() => setDay(i)} style={{
          padding:"7px 12px", borderRadius:6, cursor:"pointer",
          background: day===i ? `${typeColor(d.type)}1a` : p.surface,
                              border:`1px solid ${day===i ? typeColor(d.type) : p.border}`,
                              color: day===i ? typeColor(d.type) : p.muted,
                              fontSize:12, fontWeight:600, letterSpacing:"0.05em",
        }}>{d.short}</button>
      ))}
      </div>

      {(() => { const d = weekData[day]; return (
        <div>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18 }}>
        <div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, margin:"0 0 4px" }}>{d.day}</h2>
        <span style={{ fontSize:10, color:typeColor(d.type), textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:600 }}>{typeLabel(d.type)}</span>
        </div>
        <div style={{ textAlign:"right" }}>
        <div style={{ fontSize:22, fontWeight:700, color:p.accent }}>{d.totals.kcal} kcal</div>
        <div style={{ display:"flex", gap:4, justifyContent:"flex-end", marginTop:5 }}>
        <Pill label="P" value={d.totals.pr} color={p.accent} />
        <Pill label="F" value={d.totals.fat} color={p.gold} />
        <Pill label="C" value={d.totals.carbs} color={p.teal} />
        </div>
        </div>
        </div>

        {d.meals.map((meal,i) => (
          <div key={i} style={{ background:p.surface, border:`1px solid ${p.border}`, borderLeft:`3px solid ${meal.training ? p.teal : meal.optional ? p.dim : p.accent}`, borderRadius:8, padding:18, marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
          <div>
          <div style={{ fontSize:10, color: meal.training ? p.teal : p.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>
          {meal.slot}{meal.optional ? " (optional)" : ""}
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16 }}>{meal.name}</div>
          </div>
          <KcalTag kcal={meal.kcal} />
          </div>
          <div style={{ fontSize:13, color:p.muted, lineHeight:1.6, marginBottom:10 }}>{meal.desc}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          <Pill label="P" value={meal.pr} color={p.accent} />
          <Pill label="F" value={meal.fat} color={p.gold} />
          <Pill label="C" value={meal.carbs} color={p.teal} />
          </div>
          {meal.shared && (
            <div style={{ marginTop:10, padding:"6px 10px", background:`${p.teal}0d`, border:`1px solid ${p.teal}25`, borderRadius:4, fontSize:11, color:p.teal }}>
            Shared with Radu — {meal.raduNote}
            </div>
          )}
          </div>
        ))}
        </div>
      ); })()}
      </div>
    )}

    {/* EMERGENCY MEALS */}
    {tab === "emergency" && (
      <div>
      {emergencyData.map((cat,ci) => (
        <div key={ci} style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20, marginBottom:14 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, margin:"0 0 4px" }}>{cat.slot} Emergencies</h3>
        <div style={{ fontSize:11, color:p.muted, marginBottom:14 }}>{cat.note}</div>
        {cat.items.map((item,ii) => (
          <div key={ii} style={{ padding:"12px 0", borderBottom: ii<cat.items.length-1 ? `1px solid ${p.border}` : "none" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
          <div style={{ fontSize:14, fontWeight:500 }}>{item.name}</div>
          <KcalTag kcal={item.kcal} />
          </div>
          <div style={{ fontSize:12, color:p.muted, marginBottom:7 }}>{item.desc}</div>
          <div style={{ display:"flex", gap:5 }}>
          <Pill label="P" value={item.pr} color={p.accent} />
          <Pill label="F" value={item.fat} color={p.gold} />
          <Pill label="C" value={item.carbs} color={p.teal} />
          </div>
          </div>
        ))}
        </div>
      ))}
      </div>
    )}

    {/* SHOPPING LIST */}
    {tab === "shopping" && (
      <div>
      <div style={{ fontSize:12, color:p.muted, marginBottom:16 }}>Tap items to mark as collected.</div>
      {shoppingData.map((cat,ci) => (
        <div key={ci} style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20, marginBottom:14 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, margin:"0 0 14px", display:"flex", alignItems:"center", gap:8 }}>
        <span>{cat.icon}</span>{cat.cat}
        </h3>
        {cat.items.map((item,ii) => {
          const k = `${ci}-${ii}`;
          const done = checked[k];
          return (
            <div key={ii} onClick={() => toggle(k)} style={{
              display:"flex", alignItems:"center", gap:10, padding:"8px 0",
              borderBottom: ii<cat.items.length-1 ? `1px solid ${p.border}` : "none",
              cursor:"pointer", opacity: done ? 0.35 : 1, transition:"opacity 0.15s",
            }}>
            <div style={{ width:16, height:16, borderRadius:3, border:`1.5px solid ${done ? p.teal : p.border}`, background: done ? p.teal : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {done && <span style={{ color:p.bg, fontSize:10, fontWeight:700, lineHeight:1 }}>✓</span>}
            </div>
            <span style={{ fontSize:13, textDecoration: done ? "line-through" : "none" }}>{item}</span>
            </div>
          );
        })}
        </div>
      ))}
      </div>
    )}

    </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("shs");
  return (
    <div>
      <div style={{ display:"flex", background:"#1e1812", borderBottom:"1px solid #3a2e22", position:"sticky", top:0, zIndex:100 }}>
        {[["shs","Weekly Plan"],["cycle","Cycle Guide"]].map(([id, label]) => (
          <button key={id} onClick={() => setView(id)} style={{
            flex:1, padding:"13px 8px", fontSize:11, fontWeight: view===id ? 600 : 400,
            color: view===id ? "#c8714a" : "#8a7a6a", cursor:"pointer",
            letterSpacing:"0.09em", textTransform:"uppercase", background:"none",
            border:"none", borderBottom:`2px solid ${view===id ? "#c8714a" : "transparent"}`,
          }}>{label}</button>
        ))}
      </div>
      {view === "shs" ? <SHS /> : <CycleGuide />}
    </div>
  );
}
