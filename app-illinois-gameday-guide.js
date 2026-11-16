
const illGuideScouts={
 "Shema Mattox":{score:"Seals, contact finishes, rolls, offensive rebounds",defense:"Post defense and interior rebounding",interior:"Projected post lockdown and interior anchor",off:"B",stop:"D",anc:"B+",tags:["paint","glass","postD"]},
 "Solomon Nelson":{score:"Post seals, standing dunks, offensive glass",defense:"Huge interior size; modest shot blocking in early notes",interior:"7-foot-3 glass-first big",off:"B",stop:"D",anc:"B",tags:["paint","glass"]},
 "Mekel Defares":{score:"Spot-up threes, closeout drives, cuts, finishes",defense:"Long, quick defender of 2s and 3s, occasional smaller 4",interior:"Secondary rebounding, not rim protection",off:"B-",stop:"B-",anc:"D",tags:["shoot","wingD","drive"]},
 "#24":{score:"Transition, closeout attacks, cuts, rim finishes",defense:"Top guard matchup, strong point-of-attack defense",interior:"Guard rebounding",off:"C+",stop:"B+",anc:"D+",tags:["guardD","drive"]},
 "Robin Summers":{score:"Handle, drive, finish, secondary pass",defense:"Quick small-guard stopper, some shooting guards; 5-foot-11",interior:"Not an interior defender",off:"C+",stop:"B",anc:"D",tags:["handler","guardD"]},
 "#54":{score:"Seals, close finishes, standing dunks, offensive glass",defense:"Post-only defender; earlier notes cite light strength",interior:"Earlier elite shot-blocking and strong glass",off:"B-",stop:"F",anc:"B+",tags:["rim","glass","paint"]},
 "Laramie Osimani":{score:"Developing scoring big; moves unverified",defense:"Not evaluated",interior:"Earlier projected rebounding and size candidate",tags:[]},
 "Vern Leadbetter":{score:"Scoring menu not documented",defense:"Projected versatile power-forward stopper",interior:"Earlier strong rebounding for a PF",tags:[]},
 "A. Eaton":{score:"Not evaluated",defense:"Not evaluated",interior:"Not evaluated",tags:[]}
};
function illGuideFive(x){
 const names=(x.players||[]).map(p=>p.name),five=[];
 for(const n of [...(x.illinoisGuideFive||[]),"Robin Summers","#24","Mekel Defares","Shema Mattox","Solomon Nelson",...names])
  if(names.includes(n)&&!five.includes(n)&&five.length<5)five.push(n);
 return five;
}
function illGuideChange(i,name){
 const x=f(),five=illGuideFive(x);
 if(x.id!=="illinois-basketball-2010"||i<0||i>4||!x.players.some(p=>p.name===name))return;
 if(five.some((p,j)=>i!==j&&p===name)){alert("Each lineup slot needs a different player.");render();return;}
 five[i]=name;x.illinoisGuideFive=five;save();render();
}
function illGuideCard(x,n,field){
 const p=(x.players||[]).find(p=>p.name===n),s=illGuideScouts[n]||{},grade=field==="score"?s.off:field==="defense"?s.stop:s.anc;
 const ht=String(p?.size||"").split(",")[0];
 return '<div class="card"><div class="row"><strong class="wide">'+esc(n)+'</strong><span class="tag">'+esc(grade?grade+" · old scouting":"Unrated")+'</span></div><p class="muted">'+esc(p?.pos||"")+' · '+esc(ht)+(p?.overall!=null?' · '+esc(p.overall)+' OVR':'')+'</p><p>'+esc(s[field]||"Not evaluated")+'</p></div>';
}
function illGuideAnalysis(x,five){
 const scouts=five.map(n=>illGuideScouts[n]||{}),has=t=>scouts.some(s=>(s.tags||[]).includes(t)),howMany=t=>scouts.filter(s=>(s.tags||[]).includes(t)).length;
 const good=[],risks=[];
 if(has("handler"))good.push("Recorded ball handler and secondary passer.");else risks.push("No documented ballhandling leader.");
 if(has("shoot"))good.push("Spot-up shooting threat.");else risks.push("Outside spacing not documented.");
 if(has("guardD"))good.push("Point-of-attack guard defense.");else risks.push("No documented guard stopper.");
 if(has("wingD"))good.push("Wing defensive matchup.");else risks.push("No documented wing defender.");
 if(has("paint"))good.push("Scoring options around the rim.");
 if(howMany("glass")>=2)good.push("Multiple historical rebounders.");else risks.push("Rebounding depth unknown.");
 if(has("rim"))good.push("Historical shot blocker.");else risks.push("No historical shot-blocker in lineup.");
 if(has("postD"))good.push("Historical post-defense candidate.");else risks.push("No documented post-defense specialist.");
 if(howMany("paint")>=3)risks.push("Interior-heavy unit could compress driving space.");
 const grades=x.illinoisSkillGrades?.[2011]||{};
 for(const [role,label] of [["truePG","True point guard"],["postStopper","Post stopper"]]){
  const qualified=five.filter(n=>["A","B"].includes(grades[n]?.[role]));
  if(qualified.length)good.push(label+" rated B+ requirement met: "+qualified.join(", "));else risks.push(label+" not confirmed at B or better.");
 }
 const unknown=five.filter(n=>!(illGuideScouts[n]?.tags||[]).length);
 if(unknown.length)risks.push("Incomplete scouting: "+unknown.join(", "));
 return {good,risks};
}
function illinoisGamedayQuickGuide(x){
 const names=(x.players||[]).map(p=>p.name),five=illGuideFive(x),out=illGuideAnalysis(x,five);
 const group=(heading,arr,field)=>'<h3>'+heading+'</h3><div class="grid">'+arr.map(n=>illGuideCard(x,n,field)).join("")+'</div>';
 const slots=five.map((n,i)=>'<label><small>On the floor '+(i+1)+'</small><select style="width:100%" onchange="illGuideChange('+i+',this.value)">'+names.map(v=>'<option value="'+esc(v)+'" '+(v===n?'selected':'')+'>'+esc(v)+'</option>').join("")+'</select></label>').join("");
 return '<h2>Illinois · Gameday Quick Guide</h2><p class="muted">2011–12 roster, scouting from 2009–10 Quick Glance and projected 2010–11 Role Depth Chart. Current-season abilities are NOT independently verified.</p>'+
 group("Four scoring options · how they attack",["Shema Mattox","Solomon Nelson","Mekel Defares","#24"],"score")+
 '<h3>On-ball and wing defenders</h3><p class="muted">Only three players on the documented 2011–12 roster have usable earlier on-ball/wing evaluations. Fourth remains unverified.</p><div class="grid">'+["#24","Robin Summers","Mekel Defares"].map(n=>illGuideCard(x,n,"defense")).join("")+'<div class="card"><strong>Fourth defender · not evaluated</strong><p>A. Eaton is a 5-foot-6 freshman PG, but the source does not establish his on-ball defense.</p></div></div>'+
 group("Rim protectors and rebounders",["#54","Shema Mattox","Solomon Nelson","Vern Leadbetter"],"interior")+
 '<div class="card"><h3>Lineup selector · pick five</h3><p class="muted">Your selections save with the Illinois franchise. The analysis uses historical scouting notes and any True PG/Post Stopper grades you entered.</p><div class="grid">'+slots+'</div></div>'+
 '<div class="grid"><div class="card"><h3>Strengths</h3><ul>'+out.good.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul></div><div class="card"><h3>Weaknesses and matchup risks</h3><ul>'+out.risks.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul></div></div>'+
 '<p class="muted">Sources: Illinois Dynasty · In-Game Quick Glance (2009–10), Role Depth Chart (2010–11 projection), Roster History (partial 2011–12). Historical scouting is not a game simulation.</p>';
}
