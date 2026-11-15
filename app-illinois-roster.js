// Illinois basketball planning views: historical players are references, not fabricated current roster entries.
// Verified from Illinois Dynasty / Roster History, 2011-2012 end-of-regular-season checkpoint.
// The historical source is explicitly partial (nine visible players). Never fill unknown names from inference.
const illinois2012Roster=[
 {name:'Shema Mattox',pos:'C',number:'43',year:'Senior',overall:89,size:"7'1\", 263 lb",hometown:'California',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +1.'},
 {name:'Robin Summers',pos:'PG',number:'1',year:'Senior',overall:86,size:"5'11\", 175 lb",hometown:'Idaho',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +2.'},
 {name:'Solomon Nelson',pos:'C',number:'50',year:'Junior',overall:85,size:"7'3\", 282 lb",hometown:'California',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +2.'},
 {name:'#24',pos:'SG',number:'24',year:'RS Senior',overall:84,size:"6'3\", 200 lb",hometown:'California',notes:'Name not recorded; shown as SG #24. OVR increase shown: +2.'},
 {name:'Mekel Defares',pos:'SF',number:'20',year:'RS Junior',overall:82,size:"6'6\", 201 lb",hometown:'New York',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +1.'},
 {name:'#54',pos:'C',number:'54',year:'RS Senior',overall:80,size:"7'1\", 244 lb",hometown:'Illinois',notes:'Name not recorded; shown as C #54. OVR increase shown: +3.'},
 {name:'Laramie Osimani',pos:'PF',number:'41',year:'Sophomore',overall:80,size:"6'11\", 219 lb",hometown:'Illinois',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +2.'},
 {name:'Vern Leadbetter',pos:'PF',number:'42',year:'Sophomore',overall:80,size:"6'8\", 220 lb",hometown:'Missouri',notes:'2011–12 end-of-regular-season roster history. OVR increase shown: +2.'},
 {name:'A. Eaton',pos:'PG',number:'3',year:'Freshman',overall:77,size:"5'6\", 177 lb",hometown:'Tennessee',notes:'First name not documented. 2011–12 end-of-regular-season roster history. OVR increase shown: +2.'}
];
function seedIllinoisCurrentRoster(){
 const x=data.find(z=>z.id==='illinois-basketball-2010');if(!x)return false;
 x.players=Array.isArray(x.players)?x.players:[];
 let added=false;
 for(const p of illinois2012Roster){
   if(x.players.some(q=>q.name===p.name || (String(q.number||'')===p.number && String(q.pos||'')===p.pos)))continue;
   x.players.push({...p,source:'Illinois Dynasty · Roster History · 2011–12'});
   added=true;
 }
 return added;
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
function illinoisRating(p,year,base){return p.source==='archive'?null:projectedOverall(p,year,base)}
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
 html+='</div></div><p class="muted">? = rating not recorded. — = no confirmed player for that season. Future ratings for roster players are estimates, not game results. Archived players are not assumed to return in later seasons.</p><button class="primary" onclick="editItem(\'players\',-1)">+ Add Illinois player</button>';
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
 const roster=(x.players||[]).map((p,i)=>({p,i})).filter(v=>illinoisEligible(v.p,year,year));
 return '<section><h3>Evaluate roster essentials · '+year+'–'+String(year+1).slice(2)+'</h3><p class="muted">Unrated means unknown, not inadequate. Shema Mattox was a projected post-lockdown candidate in the older planning sheet, but no 2011–12 grade is confirmed. PG designations alone do not prove true-point-guard ability.</p><div class="grid">'+roster.map(({p,i})=>'<div class="card"><strong>'+esc(p.name)+'</strong><p class="muted">'+esc(p.pos||'')+' · '+(p.overall===undefined?'OVR unknown':esc(p.overall)+' OVR')+'</p>'+illinoisEssentials.map(role=>'<label style="display:block"><small>'+esc(role.title)+'</small><select style="width:100%" onchange="illinoisSetSkillGrade('+year+','+i+',\''+role.id+'\',this.value)">'+illinoisSkillGrades.map(g=>'<option value="'+g+'" '+(g===illinoisSkillGrade(x,year,p.name,role.id)?'selected':'')+'>'+esc(g||'Not evaluated')+'</option>').join('')+'</select></label>').join('')+'</div>').join('')+'</div></section>';
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
