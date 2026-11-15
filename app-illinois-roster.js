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
const illinoisPositions=['PG','SG','SF','PF','C'];
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
  const group=pool.filter(p=>illinoisPos(p)===pos);
  html+='<div class="snapshot-group">'+pos+'</div>';
  for(const p of group){
   html+='<div class="snapshot-player"><span class="snapshot-player-name">'+illinoisNameButton(p)+'</span><small>'+esc(pos)+(p.number?' · #'+esc(p.number):'')+(p.source==='archive'?' · Archive':'')+'</small></div>';
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
 let html='<h2>Illinois · Five-Year Outlook</h2><p class="muted">Projected basketball rotation · '+base+'–'+(base+4)+'. Positions down the left; seasons across the top. Choose starters and backups. These choices do not change the actual roster.</p>';
 html+='<div class="outlook-scroll" role="region" tabindex="0" aria-label="Illinois projected five-year basketball depth chart"><div class="outlook-table" style="--outlook-years:5"><div class="outlook-head outlook-position-head">POSITION</div>'+years.map(y=>'<div class="outlook-head">'+y+'–'+String(y+1).slice(2)+'</div>').join('');
 for(const pos of illinoisPositions){
  html+='<div class="outlook-year">'+pos+'</div>';
  for(const yr of years){
   const key=yr+'-'+pos,choices=pool.filter(p=>illinoisPos(p)===pos&&illinoisEligible(p,yr,base));
   const pick=plan[key]||{},starter=choices.find(p=>p.name===pick.starter),backup=choices.find(p=>p.name===pick.backup);
   const card=(p,label)=>p?'<div class="mini-card"><small>'+esc(pos)+' · '+esc(label)+'</small><div class="mini-name">'+esc(p.name)+'</div>'+(illinoisRating(p,yr,base)!==null?'<span class="rating-bubble" style="background:'+ratingColor(illinoisRating(p,yr,base),x)+'">'+esc(illinoisRating(p,yr,base))+'</span>':'<small>OVR not recorded</small>')+(p.source==='archive'?'<small>Historical archive</small>':'')+'</div>':'<div class="mini-card" style="opacity:.6"><small>'+esc(pos)+' · '+esc(label)+'</small><div class="mini-name">Open</div><small>Unassigned</small></div>';
   const select=(role,value)=>'<label style="display:block;margin-top:7px"><small>'+esc(role)+'</small><select style="width:100%;max-width:100%" onchange="illinoisSetDepth('+yr+',\''+pos+'\',\''+role+'\',this.value)"><option value="">Unassigned</option>'+choices.map(p=>'<option value="'+esc(p.name)+'" '+(value===p.name?'selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></label>';
   html+='<div class="outlook-cell">'+card(starter,'Starter')+select('starter',pick.starter)+card(backup,'Backup')+select('backup',pick.backup)+'</div>';
  }
 }
 return html+'</div></div><div class="card"><h3>Build the next five seasons</h3><p class="muted">The historical archive documents Shema Mattox, Mekel Defares, Robin Summers and Vern Leadbetter. Add more players and their actual class years and ratings to fill out future seasons. We will not invent eligibility or OVR values.</p><button class="primary" onclick="editItem(\'players\',-1)">+ Add player</button> <button onclick="changeTab(\'Roster Snapshot\')">Roster snapshot</button></div>';
}
function illinoisSetDepth(year,pos,role,name){
 const x=f();if(x.id!=='illinois-basketball-2010')return;
 const choices=illinoisPool(x).filter(p=>illinoisPos(p)===pos&&illinoisEligible(p,year,illinoisYears(x)[0]));
 if(name&&!choices.some(p=>p.name===name))return;
 x.illinoisDepth=x.illinoisDepth||{};
 const key=year+'-'+pos;x.illinoisDepth[key]=x.illinoisDepth[key]||{};
 x.illinoisDepth[key][role]=name;
 if(name&&x.illinoisDepth[key][role==='starter'?'backup':'starter']===name)x.illinoisDepth[key][role==='starter'?'backup':'starter']='';
 save();render();
}
