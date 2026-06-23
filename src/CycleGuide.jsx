import { useState } from "react";

const p = {
  bg: "#13100d", surface: "#1e1812", surfaceAlt: "#261f17",
  border: "#3a2e22", accent: "#c8714a",
  teal: "#5fa897", gold: "#c9a84c", text: "#f0e8de",
  muted: "#8a7a6a", dim: "#5a4e42",
  red: "#b85c5c", purple: "#9b7bbf",
};

const cycleData = [
  {
    id: "menstrual", name: "Menstrual", days: "Days 1-5", icon: "🌑", color: p.red,
    summary: "Estrogen and progesterone at their lowest. Iron being lost. Prostaglandins driving inflammation and cramping. Energy low, mood low, bloating possible.",
    calorieNote: "No adjustment. Stick to 1,500 kcal base.",
    avoid: "Processed foods, excess sodium, alcohol, excess coffee (worsens cramping).",
    focus: [
      { label: "Iron", note: "Beef mince, lamb, lentils, spinach, chickpeas" },
      { label: "Anti-inflammatory", note: "Salmon, sardines, walnuts, flaxseed" },
      { label: "Magnesium", note: "Dark chocolate 85%+, spinach, almonds, pumpkin seeds" },
      { label: "Hydration", note: "Water and herbal teas" },
    ],
    trainingNote: "Energy is genuinely low here. Reduce intensity. Walking, light resistance work, or rest are all valid. Don't push through hard sessions.",
    meals: [
      { slot: "Breakfast", options: [
        "Shakshuka: 2 eggs poached in tomato-pepper sauce with spinach + 1 slice whole wheat toast",
        "Greek yogurt 0% 200g + chia seeds 15g + mixed berries 80g + walnuts 10g",
        "3 scrambled eggs + sauteed spinach + cherry tomatoes + 1 slice whole wheat toast",
      ]},
      { slot: "Lunch", options: [
        "Red lentil soup 300ml + lamb kofta 130g",
        "Turkish-style red lentil and beef soup: lean beef 80g + red lentils 50g dry + carrot + cumin + lemon + parsley + 1 slice bread",
        "Grilled sardines 150g + tabbouleh (bulgur 55g dry, parsley, tomato, cucumber, lemon)",
      ]},
      { slot: "Dinner", options: [
        "Grilled salmon fillet 150g + quinoa 55g dry + leafy green salad",
        "Pasta 60g dry + tuna 100g + capers + olives 5g + tomato sauce + parsley",
        "Moroccan beef and chickpea stew: lean beef 130g + chickpeas 50g + canned tomatoes + onion + cumin, coriander, cinnamon + couscous 50g dry",
      ]},
      { slot: "Snack", options: [
        "Greek yogurt 0% 150g + dark chocolate 85%+ 15g",
        "Almonds 20g + 1 piece fruit",
        "Pumpkin seeds 15g + labneh 60g + cucumber",
      ]},
    ]
  },
  {
    id: "follicular", name: "Follicular", days: "Days 6-13", icon: "🌒", color: p.teal,
    summary: "Estrogen rising steadily. Insulin sensitivity at its peak. Energy building progressively through the phase. Best compliance window of the month -- cravings are quiet, mood is stable, the plan feels easy.",
    calorieNote: "No adjustment by default. After 4-6 weeks of consistent tracking, optionally tighten by 100 kcal on rest days only.",
    avoid: null,
    focus: [
      { label: "Lean protein", note: "Chicken breast, turkey, white fish, egg whites" },
      { label: "Complex carbs", note: "Oats, bulgur, quinoa, brown rice, sweet potato" },
      { label: "Fermented foods", note: "Greek yogurt, labneh (support estrogen metabolism)" },
      { label: "Cruciferous vegetables", note: "Broccoli, cauliflower, cabbage" },
    ],
    trainingNote: "Energy is building day by day. Good window for progressive overload. Performance improves through the phase.",
    meals: [
      { slot: "Breakfast", options: [
        "Greek yogurt 0% 200g + rolled oats 40g + mixed berries 80g + 1 tsp honey",
        "2 poached eggs + 1 slice whole wheat toast + labneh 60g + cucumber",
        "Overnight oats: oats 40g + Greek yogurt 0% 150g + chia seeds 10g + banana (prepped night before)",
      ]},
      { slot: "Lunch", options: [
        "Chicken shawarma bowl: chicken thigh 160g + bulgur 65g dry + cucumber + tomato + tzatziki 2 tbsp",
        "Grilled turkey breast 150g + roasted broccoli 150g + brown rice 55g dry",
        "Italian chicken and white bean soup: chicken breast 120g + white beans 60g canned + tomato + carrot + celery + herbs + 1 slice bread",
      ]},
      { slot: "Dinner", options: [
        "Grilled sea bass 150g + quinoa 55g dry + roasted broccoli and zucchini",
        "Chicken cacciatore: chicken thigh 140g braised with tomatoes, olives 5g, capers, garlic, rosemary + couscous 50g dry",
        "Italian stuffed zucchini: 2 large zucchini filled with lean mince 120g + brown rice 35g dry + tomato sauce + herbs, baked + side salad",
      ]},
      { slot: "Snack", options: [
        "Greek yogurt 0% 200g + 1 tsp honey",
        "Rice cake + labneh 60g + cucumber",
        "Cottage cheese 150g + mixed berries 80g",
      ]},
    ]
  },
  {
    id: "ovulatory", name: "Ovulatory", days: "Days 12-16", icon: "🌕", color: p.gold,
    summary: "Estrogen peaks, LH surges, brief testosterone spike on top. Peak energy, peak strength, peak mood. Short window of 3-5 days. Take full advantage.",
    calorieNote: "No adjustment. If training hard, use the training day budget (1,750 kcal).",
    avoid: null,
    focus: [
      { label: "Quality protein", note: "Chicken, turkey, eggs, Greek yogurt" },
      { label: "Antioxidants", note: "Berries, tomatoes, bell peppers, leafy greens" },
      { label: "Zinc", note: "Beef, pumpkin seeds, chickpeas" },
      { label: "Anti-inflammatory fats", note: "Olive oil, fatty fish" },
    ],
    trainingNote: "This is the actual peak. Strongest week of the month. Best time for new personal bests at the gym. Take full advantage.",
    meals: [
      { slot: "Breakfast", options: [
        "3-egg omelette with bell peppers, cherry tomatoes, za'atar",
        "Greek yogurt 0% 200g + mixed berries 80g + pumpkin seeds 10g + 1 tsp honey",
        "2 scrambled eggs + lean beef mince 50g + spinach + cherry tomatoes",
      ]},
      { slot: "Lunch", options: [
        "Chicken souvlaki bowl: chicken breast 160g + quinoa 65g dry + roasted peppers + tzatziki 2 tbsp",
        "Grilled lean beef strips 130g + chickpea and roasted pepper salad + lemon-olive oil dressing",
        "Turkey and roasted vegetable wrap: turkey breast 130g + roasted zucchini and peppers + tzatziki + whole wheat pita",
      ]},
      { slot: "Dinner", options: [
        "Shish tawook 140g + fattoush salad (romaine, tomato, cucumber, pita croutons, sumac) + half small pita",
        "Sea bream in acqua pazza: sea bream 180g simmered with tomatoes, garlic, parsley + quinoa 50g dry",
        "Grilled beef tenderloin 140g + roasted bell peppers + brown rice 50g dry + side salad",
      ]},
      { slot: "Snack", options: [
        "Greek yogurt 0% 150g + mixed berries 80g + pumpkin seeds 10g",
        "2 hard-boiled eggs + cherry tomatoes",
        "Labneh 80g + cucumber + 1 rice cake",
      ]},
    ]
  },
  {
    id: "luteal", name: "Luteal", days: "Days 15-28", icon: "🌘", color: p.purple,
    summary: "Progesterone dominates. Insulin sensitivity drops. BMR increases 100-300 kcal. Cravings spike hard, especially carbs and fat combined. Water retention adds 1-3 kg on the scale. PMS symptoms build in the final days.",
    calorieNote: "Add 150-200 kcal, mostly from complex carbs and protein. This is not cheating -- her body is burning more. Fighting it causes bingeing.",
    avoid: "Processed foods, deli meats, salty snacks (worsen bloating).",
    cravingNote: "The carb-fat combo craving is driven by progesterone. Satisfy it with Greek yogurt + dark chocolate + oats, almond butter on rice cakes, or a slightly larger dinner with complex carbs. Don't white-knuckle it -- redirect it.",
    focus: [
      { label: "Complex carbs", note: "Sweet potato, oats, brown rice, whole wheat pita" },
      { label: "Magnesium", note: "Dark chocolate, pumpkin seeds, spinach, almonds" },
      { label: "Reduced sodium", note: "Skip processed and salty foods -- worsens bloating" },
      { label: "Calcium", note: "Greek yogurt, labneh, small amounts of feta" },
    ],
    trainingNote: "Energy is variable. Train by feel. Reduce intensity in the final 3-4 days. Water retention is not fat gain.",
    meals: [
      { slot: "Breakfast", options: [
        "Oat bowl: rolled oats 45g + Greek yogurt 0% 150g + banana + 1 tsp honey",
        "French toast: 2 slices whole wheat bread dipped in beaten egg + cinnamon, pan-cooked in 3ml olive oil + Greek yogurt 0% 100g on the side",
        "Turkish menemen: 3 eggs scrambled with tomatoes, green peppers, onion, cumin + 1 slice whole wheat toast + labneh 50g",
      ]},
      { slot: "Lunch", options: [
        "Arabic stuffed peppers: lean mince 120g + brown rice 40g dry + parsley, mint, allspice + tomato sauce, baked",
        "Pasta e fagioli: pasta 55g dry + white beans 80g canned + tomato + garlic + herbs + chicken breast 120g on the side",
        "Levantine mujaddara: brown lentils 80g dry + brown rice 40g dry + caramelized onion + cumin + coriander + Greek yogurt 0% 100g on the side",
      ]},
      { slot: "Dinner", options: [
        "Chicken tagine: chicken thigh 140g + chickpeas 50g + canned tomatoes + cumin, coriander, cinnamon + couscous 50g dry",
        "Italian beef ragu: lean beef mince 120g + canned tomatoes + garlic + basil + pasta 55g dry + parmesan 15g + side salad",
        "Pasta arrabiata with beef: pasta 60g dry + lean beef mince 120g + tomato + chili + garlic + parmesan 15g + side salad",
      ]},
      { slot: "Snack", options: [
        "Dark chocolate 85%+ 20g + banana",
        "Greek yogurt 0% 150g + honey + walnuts 10g",
        "No-bake oat balls: oats 30g + almond butter 10g + honey 5g + dark chocolate chips 10g (mix and refrigerate night before)",
      ]},
    ]
  },
];

export default function CycleGuide() {
  const [phase, setPhase] = useState(0);
  const d = cycleData[phase];

  return (
    <div style={{ minHeight:"100vh", background:p.bg, color:p.text, fontFamily:"'DM Sans',sans-serif", paddingBottom:60 }}>
      <div style={{ background:`linear-gradient(180deg,#201510 0%,${p.bg} 100%)`, borderBottom:`1px solid ${p.border}`, padding:"28px 24px 18px", textAlign:"center" }}>
        <div style={{ fontSize:10, color:p.muted, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:6 }}>Sovereign Health System</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, margin:"0 0 4px" }}>Cycle Nutrition Guide</h1>
        <div style={{ fontSize:12, color:p.muted }}>Phase-specific eating for Despina</div>
      </div>

      <div style={{ display:"flex", borderBottom:`1px solid ${p.border}`, background:p.surface, overflowX:"auto" }}>
        {cycleData.map((ph, i) => (
          <button key={ph.id} onClick={() => setPhase(i)} style={{
            flex:1, minWidth:80, padding:"13px 8px", fontSize:11, fontWeight: phase===i ? 600 : 400,
            color: phase===i ? ph.color : p.muted, cursor:"pointer",
            letterSpacing:"0.07em", textTransform:"uppercase", background:"none",
            border:"none", borderBottom:`2px solid ${phase===i ? ph.color : "transparent"}`,
          }}>
            <div style={{ fontSize:15, marginBottom:2 }}>{ph.icon}</div>
            {ph.name}
          </button>
        ))}
      </div>

      <div style={{ padding:"20px 16px", maxWidth:700, margin:"0 auto" }}>
        <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderLeft:`3px solid ${d.color}`, borderRadius:8, padding:20, marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:21, margin:"0 0 3px" }}>{d.name} Phase</h2>
              <span style={{ fontSize:11, color:d.color, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>{d.days}</span>
            </div>
            <div style={{ fontSize:30 }}>{d.icon}</div>
          </div>
          <p style={{ fontSize:13, color:p.muted, lineHeight:1.7, margin:"0 0 12px" }}>{d.summary}</p>
          <div style={{ padding:"8px 12px", background:`${d.color}0d`, border:`1px solid ${d.color}30`, borderRadius:6, marginBottom:8 }}>
            <div style={{ fontSize:10, color:d.color, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:2 }}>Calorie Adjustment</div>
            <div style={{ fontSize:13 }}>{d.calorieNote}</div>
          </div>
          {d.avoid && (
            <div style={{ padding:"8px 12px", background:`${p.red}0d`, border:`1px solid ${p.red}25`, borderRadius:6, marginBottom:8 }}>
              <div style={{ fontSize:10, color:p.red, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:2 }}>Avoid</div>
              <div style={{ fontSize:13 }}>{d.avoid}</div>
            </div>
          )}
          {d.cravingNote && (
            <div style={{ padding:"8px 12px", background:`${p.purple}0d`, border:`1px solid ${p.purple}25`, borderRadius:6, marginBottom:8 }}>
              <div style={{ fontSize:10, color:p.purple, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:2 }}>Craving Management</div>
              <div style={{ fontSize:13 }}>{d.cravingNote}</div>
            </div>
          )}
          <div style={{ fontSize:10, color:p.muted, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:8, marginTop:4 }}>Focus On</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {d.focus.map((f, i) => (
              <div key={i} style={{ flex:"1 1 45%", padding:"8px 10px", background:p.surfaceAlt, border:`1px solid ${p.border}`, borderRadius:6 }}>
                <div style={{ fontSize:11, fontWeight:600, color:d.color, marginBottom:2 }}>{f.label}</div>
                <div style={{ fontSize:11, color:p.muted }}>{f.note}</div>
              </div>
            ))}
          </div>
        </div>

        {d.meals.map((meal, mi) => (
          <div key={mi} style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:18, marginBottom:12 }}>
            <div style={{ fontSize:10, color:d.color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, fontWeight:600 }}>{meal.slot}</div>
            {meal.options.map((opt, oi) => (
              <div key={oi} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom: oi < meal.options.length-1 ? `1px solid ${p.border}` : "none", alignItems:"flex-start" }}>
                <div style={{ minWidth:22, height:22, borderRadius:"50%", background:`${d.color}18`, border:`1px solid ${d.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:d.color, flexShrink:0, marginTop:1 }}>
                  {oi+1}
                </div>
                <div style={{ fontSize:13, lineHeight:1.6 }}>{opt}</div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderLeft:`3px solid ${d.color}`, borderRadius:8, padding:16, marginBottom:14 }}>
          <div style={{ fontSize:10, color:d.color, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>Training Note</div>
          <div style={{ fontSize:13, lineHeight:1.6 }}>{d.trainingNote}</div>
        </div>

        <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20, marginBottom:14 }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, margin:"0 0 12px" }}>Scale and Measurement Rules</h3>
          {[
            { label:"When to weigh", note:"Follicular phase only, days 6-10. Every other reading is contaminated by water fluctuation." },
            { label:"When to measure waist", note:"Days 6-10 only. Same logic." },
            { label:"Expected cycle fluctuation", note:"1-4 kg of water weight across the cycle. Normal. Ignore it." },
          ].map((rule, i) => (
            <div key={i} style={{ padding:"10px 0", borderBottom: i<2 ? `1px solid ${p.border}` : "none" }}>
              <div style={{ fontSize:11, fontWeight:600, color:p.teal, marginBottom:2 }}>{rule.label}</div>
              <div style={{ fontSize:13, color:p.muted }}>{rule.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:8, padding:20 }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, margin:"0 0 8px" }}>Cycle Tracking</h3>
          <p style={{ fontSize:13, color:p.muted, lineHeight:1.6, margin:"0 0 12px" }}>This guide is useless without knowing what phase you are in. Both apps below track cycle phases automatically and send reminders. Setup takes two minutes.</p>
          <div style={{ display:"flex", gap:10 }}>
            {["Flo", "Clue"].map((app) => (
              <div key={app} style={{ flex:1, padding:"10px 14px", background:p.surfaceAlt, border:`1px solid ${p.border}`, borderRadius:6, textAlign:"center" }}>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{app}</div>
                <div style={{ fontSize:11, color:p.muted }}>Free on Android</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
