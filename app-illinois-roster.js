// Illinois basketball planning views: historical players are references, not fabricated current roster entries.
// Verified from Illinois Dynasty / Roster History, 2011-2012 end-of-regular-season checkpoint.
// The historical source is explicitly partial (nine visible players). Never fill unknown names from inference.
// Verified 2011–12 Illinois roster from uploaded 12-player workbook (sorted by overall).
// Preserve existing saves: match by jersey/position or name; enrich matching records;
// do not erase existing story, role grades, notes or projections.
const illinois2012Roster=[{"name":"Shema Mattox","number":43,"pos":"C","year":"SR","overall":89,"potential":"B-","close":95,"medium":73,"threePoint":62,"freeThrow":76,"handling":63,"passing":63,"lowOffense":82,"lowDefense":89,"defense":70,"blocks":86,"steals":79,"offensiveRebound":91,"defensiveRebound":90,"speed":76,"quickness":67,"vertical":74,"strength":92,"height":"7'1\"","weight":263,"hometown":"Fresno, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Robin Summers","number":1,"pos":"PG","year":"SR","overall":86,"potential":"B+","close":87,"medium":71,"threePoint":80,"freeThrow":79,"layup":88,"shootDribble":79,"shootTraffic":80,"dunk":68,"dunkStanding":0,"clutch":76,"handling":90,"passing":79,"lowOffense":56,"lowDefense":57,"defense":91,"blocks":61,"steals":83,"offensiveRebound":67,"defensiveRebound":73,"speed":91,"quickness":88,"vertical":80,"strength":77,"hustle":83,"stamina":91,"durability":95,"foul":47,"consistency":78,"offensiveAwareness":80,"defensiveAwareness":80,"height":"5'11\"","weight":175,"hometown":"Boise, ID","source":"Illinois 2K8 · Robin Summers player card screenshot"},{"name":"Solomon Nelson","number":50,"pos":"C","year":"JR","overall":85,"potential":"B","close":87,"medium":74,"threePoint":49,"freeThrow":69,"handling":67,"passing":65,"lowOffense":89,"lowDefense":87,"defense":63,"blocks":72,"steals":70,"offensiveRebound":87,"defensiveRebound":89,"speed":71,"quickness":78,"vertical":84,"strength":81,"height":"7'3\"","weight":282,"hometown":"Orange, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"SG #24","number":24,"pos":"SG","year":"SR","overall":84,"potential":"B-","close":85,"medium":76,"threePoint":73,"freeThrow":75,"handling":88,"passing":66,"lowOffense":60,"lowDefense":66,"defense":91,"blocks":52,"steals":81,"offensiveRebound":68,"defensiveRebound":77,"speed":92,"quickness":93,"vertical":96,"strength":62,"height":"6'3\"","weight":200,"hometown":"Los Angeles, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Mekel Defares","number":20,"pos":"SF","year":"JR","overall":82,"potential":"C+","close":90,"medium":76,"threePoint":86,"freeThrow":76,"handling":82,"passing":68,"lowOffense":70,"lowDefense":65,"defense":85,"blocks":61,"steals":83,"offensiveRebound":65,"defensiveRebound":72,"speed":88,"quickness":93,"vertical":92,"strength":71,"height":"6'6\"","weight":201,"hometown":"Queens, NY","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Laramie Osimani","number":41,"pos":"PF","year":"SO","overall":80,"potential":"C-","close":92,"medium":70,"threePoint":75,"freeThrow":64,"handling":64,"passing":53,"lowOffense":78,"lowDefense":79,"defense":73,"blocks":66,"steals":61,"offensiveRebound":87,"defensiveRebound":82,"speed":79,"quickness":73,"vertical":73,"strength":70,"height":"6'11\"","weight":219,"hometown":"Chicago, IL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Vern Leadbetter","number":42,"pos":"PF","year":"SO","overall":80,"potential":"C","close":92,"medium":70,"threePoint":75,"freeThrow":78,"handling":58,"passing":61,"lowOffense":78,"lowDefense":79,"defense":72,"blocks":76,"steals":72,"offensiveRebound":88,"defensiveRebound":81,"speed":73,"quickness":76,"vertical":76,"strength":68,"height":"6'8\"","weight":220,"hometown":"Florissant, MO","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"C #54","number":54,"pos":"C","year":"SR","overall":80,"potential":"B","close":92,"medium":68,"threePoint":50,"freeThrow":72,"handling":57,"passing":65,"lowOffense":80,"lowDefense":78,"defense":66,"blocks":94,"steals":64,"offensiveRebound":85,"defensiveRebound":91,"speed":74,"quickness":74,"vertical":64,"strength":64,"height":"7'1\"","weight":244,"hometown":"Joliet, IL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Parker Jefferies","number":15,"pos":"PG","year":"FR","overall":77,"potential":"C","close":78,"medium":76,"threePoint":86,"freeThrow":71,"handling":84,"passing":74,"lowOffense":57,"lowDefense":52,"defense":62,"blocks":61,"steals":79,"offensiveRebound":62,"defensiveRebound":64,"speed":88,"quickness":85,"vertical":69,"strength":63,"height":"6'1\"","weight":178,"hometown":"Miami Beach, FL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Ashley Eaton","number":3,"pos":"PG","year":"FR","overall":77,"potential":"C+","close":86,"medium":78,"threePoint":76,"freeThrow":91,"handling":84,"passing":73,"lowOffense":56,"lowDefense":59,"defense":69,"blocks":51,"steals":82,"offensiveRebound":60,"defensiveRebound":65,"speed":95,"quickness":84,"vertical":68,"strength":65,"height":"5'6\"","weight":177,"hometown":"Memphis, TN","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Cortez Simpson","number":52,"pos":"PF","year":"FR","overall":76,"potential":"B-","close":84,"medium":72,"threePoint":56,"freeThrow":81,"handling":62,"passing":58,"lowOffense":85,"lowDefense":89,"defense":66,"blocks":70,"steals":59,"offensiveRebound":77,"defensiveRebound":85,"speed":73,"quickness":75,"vertical":78,"strength":62,"height":"6'8\"","weight":195,"hometown":"Memphis, TN","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Christano Timba","number":35,"pos":"SG","year":"SO","overall":71,"potential":"D","close":84,"medium":77,"threePoint":66,"freeThrow":73,"handling":79,"passing":70,"lowOffense":64,"lowDefense":56,"defense":60,"blocks":47,"steals":76,"offensiveRebound":69,"defensiveRebound":73,"speed":87,"quickness":81,"vertical":78,"strength":61,"height":"6'4\"","weight":214,"hometown":"Cameroon","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Sammy Cooperwood","number":45,"pos":"PF","year":"JR","overall":71,"potential":"C","close":88,"medium":68,"threePoint":61,"freeThrow":56,"handling":56,"passing":52,"lowOffense":68,"lowDefense":74,"defense":65,"blocks":78,"steals":72,"offensiveRebound":78,"defensiveRebound":79,"speed":68,"quickness":69,"vertical":74,"strength":67,"height":"6'8\"","weight":225,"hometown":"Montgomery, AL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"}];
function seedIllinoisCurrentRoster(){
 const x=data.find(z=>z.id==='illinois-basketball-2010');if(!x)return false;
 const version='2026-11-15-roster-13-with-robin-summers';
 if(x.illinoisRosterImportVersion===version)return false;
 x.players=Array.isArray(x.players)?x.players:[];
 let changed=false;
 const source='Illinois Dynasty · Roster History · 2011–12';
 // Keep existing historical and user-authored player records; match Robin by name/number.
 for(const p of illinois2012Roster){
  const match=x.players.find(q=>(String(q.number??'')===String(p.number)&&String(q.pos||'').toUpperCase()===p.pos)||q.name===p.name||
    (p.name==='Ashley Eaton'&&q.name==='A. Eaton'&&String(q.number)==='3'));
  if(match){
   // Spreadsheet fields are authoritative for previously seeded partial records.
   // For independently edited players, add missing fields but keep custom values.
   const oldSeed=match.source===source;
   for(const [key,value] of Object.entries(p)){
    if(key==='source'&&!oldSeed)continue;
    if(key==='name'&&!oldSeed)continue;
    if(oldSeed||match[key]===undefined||match[key]===null||match[key]===''){
     if(match[key]!==value){match[key]=value;changed=true;}
    }
   }
  }else{x.players.push({...p});changed=true;}
 }
 // Mark import complete. This prevents a future refresh from overwriting game-night edits.
 x.illinoisRosterImportVersion=version;
 return true;
}
const illinoisPositions=['Guard','Wing','Big'];
function illinoisGroup(p){const v=String(p.planningGroup||p.group||p.pos||p.position||'').toUpperCase().trim();if(v==='GUARD'||v==='PG'||v==='SG')return 'Guard';if(v==='WING'||v==='SF')return 'Wing';if(v==='BIG'||v==='PF'||v==='C')return 'Big';return ''}
function illinoisBase(x){return 2011}
function illinoisPool(x){
 const current=(x.players||[]).map((p,i)=>({...p,source:'roster',rosterIndex:i}));
 const known=(x.historicalPlayers||[]).filter(p=>p.id?.startsWith('illinois-')&&!current.some(c=>c.name===p.name)).map(p=>({...p,pos:p.position||'',year:'',source:'archive'}));
 return [...current,...known];
}
function illinoisPos(p){return String(p.pos||p.position||'').toUpperCase().trim()}
function illinoisYears(x){const start=illinoisBase(x);return Array.from({length:5},(_,i)=>start+i)}
function illinoisEligible(p,year,base){
 if(p.source==='archive')return year===base;
 const raw=String(p.year||'').toLowerCase();
 const stage=/freshman|\bfr\b/.test(raw)?0:/sophomore|\bso\b/.test(raw)?1:/junior|\bjr\b/.test(raw)?2:/senior|\bsr\b/.test(raw)?3:null;
 return stage===null?year===base:stage+(year-base)<=3;
}
// Illinois-only planning estimates; not the game's actual progression formula.
// Grade caps never reduce an already-recorded overall rating.
const illinoisProgression={
 'A+':[4,99],'A':[4,95],'A-':[3,90],
 'B+':[3,89],'B':[2,85],'B-':[2,80],
 'C+':[2,79],'C':[1,75],'C-':[1,70],
 'D+':[1,69],'D':[1,65],'D-':[0,60],'F':[0,59]
};
function illinoisRating(p,year,base){
 if(p.source==='archive'||p.overall===undefined||p.overall===null||p.overall==='')return null;
 const current=Number(p.overall);
 if(!Number.isFinite(current))return null;
 const years=Math.max(0,year-base);
 const profile=illinoisProgression[String(p.potential||'').toUpperCase().trim()];
 if(!profile||!years)return current;
 return Math.min(99,Math.max(current,profile[1]),current+years*profile[0]);
}
function illinoisNameButton(p){return p.source==='roster'?'<button class="profile-link" onclick="openPlayer('+p.rosterIndex+')">'+esc(p.name)+'</button>':'<strong>'+esc(p.name)+'</strong>'}
function illinoisSnapshot(x){
 const pool=illinoisPool(x),years=illinoisYears(x),base=years[0];
 let html='<div class="row"><h2 class="wide">Illinois · Roster Snapshot</h2><button onclick="changeTab(\'Five-Year Outlook\')">Projected roster cards →</button></div><p class="muted">Players down the left, seasons across the top. Archived names are shown as references for 2011–12; unknown ratings remain blank. Add confirmed players through Roster.</p>';
 html+='<div class="snapshot-scroll" role="region" tabindex="0" aria-label="Illinois five-season roster snapshot"><div class="snapshot-grid"><div class="snapshot-head snapshot-player-head">PLAYER</div>'+years.map(y=>'<div class="snapshot-head">'+y+'–'+String(y+1).slice(2)+'</div>').join('');
 for(const pos of illinoisPositions){
  const group=pool.filter(p=>illinoisGroup(p)===pos);
  html+='<div class="snapshot-group">'+pos+'</div>';
  for(const p of group){
   html+='<div class="snapshot-player"><span class="snapshot-player-name">'+illinoisNameButton(p)+'</span><small>'+esc(illinoisPos(p)||pos)+(p.number?' · #'+esc(p.number):'')+(p.source==='archive'?' · Archive':'')+'</small></div>';
   for(const yr of years){
    const present=illinoisEligible(p,yr,base),ovr=present?illinoisRating(p,yr,base):null;
    html+='<div class="snapshot-rating-cell">'+(present?'<span class="snapshot-rating" style="background:'+(ovr===null?'#68778b':ratingColor(ovr,x))+'">'+(ovr===null?'?':esc(ovr))+'</span>':'<span class="snapshot-empty">—</span>')+'</div>';
   }
  }
  if(!group.length)html+='<div class="snapshot-player"><small class="muted">No '+pos+' recorded yet</small></div>'+years.map(()=>'<div class="snapshot-rating-cell"><span class="snapshot-empty">—</span></div>').join('');
 }
 html+='</div></div><p class="muted">? = rating not recorded. — = no confirmed player for that season. Future ratings are potential-capped planning estimates, not game results. Archived players are not assumed to return in later seasons.</p><button class="primary" onclick="editItem(\'players\',-1)">+ Add Illinois player</button>';
 return html;
}
function illinoisOutlook(x){
 const years=illinoisYears(x),base=years[0],pool=illinoisPool(x);
 const plan=x.illinoisDepth||{};
 let html='<h2>Illinois · Five-Year Outlook</h2><p class="muted">Three-deep roster planning: Guard, Wing, Big. These are roster groups, not fixed lineup positions. Assign any three eligible players per group for each season; how they fit into your five-man lineup can vary.</p>';
 html+=illinoisEssentialsSummary(x,years)+illinoisEssentialsEditor(x,base);
 html+='<div class="outlook-scroll" role="region" tabindex="0" aria-label="Illinois five-year roster planning board"><div class="outlook-table" style="--outlook-years:5"><div class="outlook-head outlook-position-head">GROUP</div>'+years.map(y=>'<div class="outlook-head">'+y+'–'+String(y+1).slice(2)+'</div>').join('');
 for(const group of illinoisPositions){
  html+='<div class="outlook-year">'+group+'</div>';
  for(const yr of years){
   const key=yr+'-'+group;
   const choices=pool.filter(p=>illinoisGroup(p)===group&&illinoisEligible(p,yr,base));
   const picked=plan[key]||{};
   const saved=[picked['1']||picked.starter||'',picked['2']||picked.backup||'',picked['3']||''];
   const assigned=new Set(saved.filter(Boolean));
   const defaults=choices.filter(p=>!assigned.has(p.name)).sort((a,b)=>(Number(illinoisRating(b,yr,base))||0)-(Number(illinoisRating(a,yr,base))||0));
   let d=0;
   const effective=saved.map(name=>name||defaults[d++]?.name||'');
   const select=(slot,name)=>'<label style="display:block;margin:8px 0"><small>Depth '+slot+'</small><select style="width:100%;max-width:100%" onchange="illinoisSetDepth('+yr+',\''+group+'\',\''+slot+'\',this.value)"><option value="">Open</option>'+choices.map(p=>'<option value="'+esc(p.name)+'" '+(name===p.name?'selected':'')+'>'+esc(p.name)+' · '+esc(illinoisPos(p))+'</option>').join('')+'</select></label>';
   html+='<div class="outlook-cell">';
   for(let n=0;n<3;n++){
    const p=choices.find(p=>p.name===effective[n]),rating=p?illinoisRating(p,yr,base):null;
    html+='<div class="mini-card" style="margin-bottom:4px;'+(!p?'opacity:.6;':'')+'"><small>'+group+' · '+(n+1)+'</small><div class="mini-name">'+(p?esc(p.name):'Open')+'</div>'+(p?'<small>'+esc(illinoisPos(p))+(p.number?' · #'+esc(p.number):'')+'</small>':'')+(rating!==null&&rating!==undefined?'<span class="rating-bubble" style="background:'+ratingColor(rating,x)+'">'+esc(rating)+'</span>':p?'<small>OVR not recorded</small>':'')+'</div>'+select(n+1,effective[n]);
   }
   html+='</div>';
  }
 }
 return html+'</div></div><div class="card"><h3>Roster construction, not a lineup lock</h3><p class="muted">Guard includes PG/SG; Wing includes SF; Big includes PF/C. These are initial groupings based on the source roster positions. Three players per group are shown, but the lineup can use any combination. Rankings shown automatically until you select your own depth order. No future ratings or eligibility are invented.</p><button class="primary" onclick="editItem(\'players\',-1)">+ Add player</button> <button onclick="changeTab(\'Roster Snapshot\')">Roster snapshot</button></div>';
}
function illinoisSetDepth(year,group,slot,name){
 const x=f();if(x.id!=='illinois-basketball-2010')return;
 if(!illinoisPositions.includes(group)||!['1','2','3'].includes(slot))return;
 const choices=illinoisPool(x).filter(p=>illinoisGroup(p)===group&&illinoisEligible(p,year,illinoisYears(x)[0]));
 if(name&&!choices.some(p=>p.name===name))return;
 x.illinoisDepth=x.illinoisDepth||{};
 const key=year+'-'+group;
 const existing=x.illinoisDepth[key]||{};
 const next={'1':existing['1']||existing.starter||'','2':existing['2']||existing.backup||'','3':existing['3']||''};
 next[slot]=name;
 for(const k of ['1','2','3'])if(k!==slot&&name&&next[k]===name)next[k]='';
 x.illinoisDepth[key]=next;
 save();render();
}

// ROSTER ESSENTIALS RULES (Illinois)
// True PG: passing, handle, decisions, enough perimeter defense to stay on floor.
// Post Stopper: one-on-one interior defense, strength and positioning; used situationally.
// A: elite; B: credible specialist; C: functional NOT specialist; D/F: poor fit.
// Unrated is unknown, never promote the roster's best player to a B by default.
// Need at least one A/B for each skill on the roster each season. Ratings are
// skill-specific, season-specific, and independent of overall and position.
// Source: earlier Role Depth Chart projects Shema Mattox as a "Post Lockdown"
// specialist (no specific A-F grade); Jack Wilcox was projected a "Pure PG"
// in 2010–11 but is not on the documented 2011–12 end-of-season roster.
// PG-labeled Robin Summers and A. Eaton are candidates, not verified B specialists.
const illinoisEssentials=[
 {id:'truePG',title:'True Point Guard',why:'Passing · handling · decisions · viable perimeter defense'},
 {id:'postStopper',title:'Post Stopper',why:'One-on-one post defense · strength · positioning'}
];
const illinoisSkillGrades=['','A','B','C','D','F'];
function illinoisSkillGrade(x,year,name,role){return x.illinoisSkillGrades?.[year]?.[name]?.[role]||''}
function illinoisEssentialsSummary(x,years){
 const pool=illinoisPool(x),base=years[0];
 let html='<section class="card"><h3>Roster Essentials · Five-Year Coverage</h3><p class="muted">One genuine A/B in each role is the goal. A C is functional but does not count as a specialist. No automatic grades from overall, listed position or depth-chart rank.</p><div style="overflow-x:auto"><table style="min-width:800px;width:100%;border-collapse:separate;border-spacing:6px"><tr><th>Essential</th>'+years.map(y=>'<th>'+y+'–'+String(y+1).slice(2)+'</th>').join('')+'</tr>';
 for(const role of illinoisEssentials){
  html+='<tr><th>'+esc(role.title)+'</th>';
  for(const year of years){
   const grades=pool.filter(p=>illinoisEligible(p,year,base)).map(p=>({name:p.name,grade:illinoisSkillGrade(x,year,p.name,role.id)})).filter(v=>v.grade);
   const eligible=grades.filter(v=>v.grade==='A'||v.grade==='B').sort((a,b)=>a.grade.localeCompare(b.grade));
   const best=eligible[0],label=best?best.grade+' · '+best.name:grades.length?'No B/A yet':'Not evaluated';
   html+='<td style="padding:8px;background:var(--soft,#f2f4f7);border-radius:8px"><strong>'+esc(label)+'</strong></td>';
  }
  html+='</tr>';
 }
 return html+'</table></div></section>';
}
function illinoisEssentialsEditor(x,year){
 const roster=(x.players||[]).map((p,i)=>({p,i})).filter(v=>illinoisEligible(v.p,year,illinoisYears(x)[0]));
 return '<section><h3>Evaluate roster essentials · '+year+'–'+String(year+1).slice(2)+'</h3><p class="muted">Unrated means unknown, not inadequate. Shema Mattox was a projected post-lockdown candidate in the older planning sheet, but no 2011–12 grade is confirmed. PG designations alone do not prove true-point-guard ability.</p><p class="muted"><b>Historical clues:</b> Shema Mattox was listed first for projected Post Lockdown; Robin Summers was an earlier guard stopper, but his passing and handling grade is unverified; Solomon Nelson and #54 were described as interior anchors, which does not prove one-on-one post defense. A. Eaton has no specialist assessment recorded. Every grade remains unassigned until confirmed.</p><div class="grid">'+roster.map(({p,i})=>'<div class="card"><strong>'+esc(p.name)+'</strong><p class="muted">'+esc(p.pos||'')+' · '+(p.overall===undefined?'OVR unknown':esc(p.overall)+' OVR')+'</p>'+illinoisEssentials.map(role=>'<label style="display:block"><small>'+esc(role.title)+'</small><select style="width:100%" onchange="illinoisSetSkillGrade('+year+','+i+',\''+role.id+'\',this.value)">'+illinoisSkillGrades.map(g=>'<option value="'+g+'" '+(g===illinoisSkillGrade(x,year,p.name,role.id)?'selected':'')+'>'+esc(g||'Not evaluated')+'</option>').join('')+'</select></label>').join('')+'</div>').join('')+'</div></section>';
}
function illinoisSetSkillGrade(year,index,role,grade){
 const x=f(),p=x.players?.[index];
 if(x.id!=='illinois-basketball-2010'||!p||!illinoisEssentials.some(r=>r.id===role)||!illinoisSkillGrades.includes(grade))return;
 x.illinoisSkillGrades=x.illinoisSkillGrades||{};
 const entry=(x.illinoisSkillGrades[year]=x.illinoisSkillGrades[year]||{});
 const traits=(entry[p.name]=entry[p.name]||{});
 if(grade)traits[role]=grade;else delete traits[role];
 save();render();
}
