// Illinois basketball planning views: historical players are references, not fabricated current roster entries.
// Verified from Illinois Dynasty / Roster History, 2011-2012 end-of-regular-season checkpoint.
// The historical source is explicitly partial (nine visible players). Never fill unknown names from inference.
// Verified 2011–12 Illinois roster from uploaded 12-player workbook (sorted by overall).
// Preserve existing saves: match by jersey/position or name; enrich matching records;
// do not erase existing story, role grades, notes or projections.
const illinois2012Roster=[{"name":"Shema Mattox","number":43,"pos":"C","year":"SR","overall":89,"potential":"B-","close":95,"medium":73,"threePoint":62,"freeThrow":76,"handling":63,"passing":63,"lowOffense":82,"lowDefense":89,"defense":70,"blocks":86,"steals":79,"offensiveRebound":91,"defensiveRebound":90,"speed":76,"quickness":67,"vertical":74,"strength":92,"height":"7'1\"","weight":263,"hometown":"Fresno, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Robin Summers","number":1,"pos":"PG","year":"SR","overall":86,"potential":"B+","close":87,"medium":71,"threePoint":80,"freeThrow":79,"layup":88,"shootDribble":79,"shootTraffic":80,"dunk":68,"dunkStanding":0,"clutch":76,"handling":90,"passing":79,"lowOffense":56,"lowDefense":57,"defense":91,"blocks":61,"steals":83,"offensiveRebound":67,"defensiveRebound":73,"speed":91,"quickness":88,"vertical":80,"strength":77,"hustle":83,"stamina":91,"durability":95,"foul":47,"consistency":78,"offensiveAwareness":80,"defensiveAwareness":80,"height":"5'11\"","weight":175,"hometown":"Boise, ID","source":"Illinois 2K8 · Robin Summers player card screenshot"},{"name":"Solomon Nelson","number":50,"pos":"C","year":"JR","overall":85,"potential":"B","close":87,"medium":74,"threePoint":49,"freeThrow":69,"handling":67,"passing":65,"lowOffense":89,"lowDefense":87,"defense":63,"blocks":72,"steals":70,"offensiveRebound":87,"defensiveRebound":89,"speed":71,"quickness":78,"vertical":84,"strength":81,"height":"7'3\"","weight":282,"hometown":"Orange, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"SG #24","number":24,"pos":"SG","year":"SR","overall":84,"potential":"B-","close":85,"medium":76,"threePoint":73,"freeThrow":75,"handling":88,"passing":66,"lowOffense":60,"lowDefense":66,"defense":91,"blocks":52,"steals":81,"offensiveRebound":68,"defensiveRebound":77,"speed":92,"quickness":93,"vertical":96,"strength":62,"height":"6'3\"","weight":200,"hometown":"Los Angeles, CA","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Mekel Defares","number":20,"pos":"SF","year":"JR","overall":82,"potential":"C+","close":90,"medium":76,"threePoint":86,"freeThrow":76,"handling":82,"passing":68,"lowOffense":70,"lowDefense":65,"defense":85,"blocks":61,"steals":83,"offensiveRebound":65,"defensiveRebound":72,"speed":88,"quickness":93,"vertical":92,"strength":71,"height":"6'6\"","weight":201,"hometown":"Queens, NY","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Laramie Osimani","number":41,"pos":"PF","year":"SO","overall":80,"potential":"C-","close":92,"medium":70,"threePoint":75,"freeThrow":64,"handling":64,"passing":53,"lowOffense":78,"lowDefense":79,"defense":73,"blocks":66,"steals":61,"offensiveRebound":87,"defensiveRebound":82,"speed":79,"quickness":73,"vertical":73,"strength":70,"height":"6'11\"","weight":219,"hometown":"Chicago, IL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Vern Leadbetter","number":42,"pos":"PF","year":"SO","overall":80,"potential":"C","close":92,"medium":70,"threePoint":75,"freeThrow":78,"handling":58,"passing":61,"lowOffense":78,"lowDefense":79,"defense":72,"blocks":76,"steals":72,"offensiveRebound":88,"defensiveRebound":81,"speed":73,"quickness":76,"vertical":76,"strength":68,"height":"6'8\"","weight":220,"hometown":"Florissant, MO","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"C #54","number":54,"pos":"C","year":"SR","overall":80,"potential":"B","close":92,"medium":68,"threePoint":50,"freeThrow":72,"handling":57,"passing":65,"lowOffense":80,"lowDefense":78,"defense":66,"blocks":94,"steals":64,"offensiveRebound":85,"defensiveRebound":91,"speed":74,"quickness":74,"vertical":64,"strength":64,"height":"7'1\"","weight":244,"hometown":"Joliet, IL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Parker Jefferies","number":15,"pos":"PG","year":"FR","overall":77,"potential":"C","close":78,"medium":76,"threePoint":86,"freeThrow":71,"handling":84,"passing":74,"lowOffense":57,"lowDefense":52,"defense":62,"blocks":61,"steals":79,"offensiveRebound":62,"defensiveRebound":64,"speed":88,"quickness":85,"vertical":69,"strength":63,"height":"6'1\"","weight":178,"hometown":"Miami Beach, FL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Ashley Eaton","number":3,"pos":"PG","year":"FR","overall":77,"potential":"C+","close":86,"medium":78,"threePoint":76,"freeThrow":91,"handling":84,"passing":73,"lowOffense":56,"lowDefense":59,"defense":69,"blocks":51,"steals":82,"offensiveRebound":60,"defensiveRebound":65,"speed":95,"quickness":84,"vertical":68,"strength":65,"height":"5'6\"","weight":177,"hometown":"Memphis, TN","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Cortez Simpson","number":52,"pos":"PF","year":"FR","overall":76,"potential":"B-","close":84,"medium":72,"threePoint":56,"freeThrow":81,"handling":62,"passing":58,"lowOffense":85,"lowDefense":89,"defense":66,"blocks":70,"steals":59,"offensiveRebound":77,"defensiveRebound":85,"speed":73,"quickness":75,"vertical":78,"strength":62,"height":"6'8\"","weight":195,"hometown":"Memphis, TN","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Christano Timba","number":35,"pos":"SG","year":"SO","overall":71,"potential":"D","close":84,"medium":77,"threePoint":66,"freeThrow":73,"handling":79,"passing":70,"lowOffense":64,"lowDefense":56,"defense":60,"blocks":47,"steals":76,"offensiveRebound":69,"defensiveRebound":73,"speed":87,"quickness":81,"vertical":78,"strength":61,"height":"6'4\"","weight":214,"hometown":"Cameroon","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"},{"name":"Sammy Cooperwood","number":45,"pos":"PF","year":"JR","overall":71,"potential":"C","close":88,"medium":68,"threePoint":61,"freeThrow":56,"handling":56,"passing":52,"lowOffense":68,"lowDefense":74,"defense":65,"blocks":78,"steals":72,"offensiveRebound":78,"defensiveRebound":79,"speed":68,"quickness":69,"vertical":74,"strength":67,"height":"6'8\"","weight":225,"hometown":"Montgomery, AL","source":"Illinois 2K8 Roster · 12 Players · uploaded spreadsheet"}];

const illinois2012AttributeKeys = ["close","medium","threePoint","freeThrow","layup","shootDribble","shootTraffic","dunk","dunkStanding","clutch","handling","passing","lowOffense","lowDefense","defense","blocks","steals","offensiveRebound","defensiveRebound","speed","quickness","vertical","strength","hustle","stamina","durability","foul","consistency","offensiveAwareness","defensiveAwareness"];
const illinois2013Roster = [
 {"number":20,"name":"Mekel Defares","pos":"SF","year":"RS SR","overall":83,"potential":"C+","height":"6'6\"","weight":211,"hometown":"Queens, NY","source":"Screenshot 2026-11-15 21-48-41.png","close":92,"medium":78,"threePoint":87,"freeThrow":76,"layup":88,"shootDribble":75,"shootTraffic":84,"dunk":63,"dunkStanding":0,"clutch":67,"handling":82,"passing":69,"lowOffense":70,"lowDefense":65,"defense":86,"blocks":63,"steals":83,"offensiveRebound":65,"defensiveRebound":72,"speed":90,"quickness":93,"vertical":92,"strength":71,"hustle":81,"stamina":85,"durability":94,"foul":67,"consistency":76,"offensiveAwareness":80,"defensiveAwareness":65},
 {"number":42,"name":"Vern Leadbetter","pos":"PF","year":"JR","overall":80,"potential":"C","height":"6'8\"","weight":222,"hometown":"Florissant, MO","source":"Screenshot 2026-11-15 21-48-53.png","close":92,"medium":70,"threePoint":75,"freeThrow":78,"layup":87,"shootDribble":61,"shootTraffic":81,"dunk":82,"dunkStanding":72,"clutch":73,"handling":58,"passing":61,"lowOffense":78,"lowDefense":80,"defense":72,"blocks":78,"steals":73,"offensiveRebound":88,"defensiveRebound":81,"speed":73,"quickness":77,"vertical":77,"strength":69,"hustle":73,"stamina":82,"durability":93,"foul":51,"consistency":76,"offensiveAwareness":69,"defensiveAwareness":79},
 {"number":15,"name":"Parker Jefferies","pos":"PG","year":"SO","overall":79,"potential":"C","height":"6'1\"","weight":187,"hometown":"Miami Beach, FL","source":"Screenshot 2026-11-15 21-48-55.png","close":80,"medium":77,"threePoint":87,"freeThrow":72,"layup":75,"shootDribble":82,"shootTraffic":72,"dunk":78,"dunkStanding":0,"clutch":66,"handling":84,"passing":75,"lowOffense":58,"lowDefense":52,"defense":83,"blocks":51,"steals":79,"offensiveRebound":62,"defensiveRebound":65,"speed":86,"quickness":86,"vertical":69,"strength":65,"hustle":71,"stamina":88,"durability":91,"foul":61,"consistency":78,"offensiveAwareness":73,"defensiveAwareness":79},
 {"number":3,"name":"Ashley Eaton","pos":"PG","year":"SO","overall":79,"potential":null,"height":"5'6\"","weight":181,"hometown":"Memphis, TN","source":"Screenshot 2026-11-15 21-47-25.png"},
 {"number":52,"name":"Cortez Simpson","pos":"PF","year":"SO","overall":77,"potential":"B-","height":"6'8\"","weight":199,"hometown":"Memphis, TN","source":"Screenshot 2026-11-15 21-48-57.png","close":84,"medium":73,"threePoint":56,"freeThrow":81,"layup":80,"shootDribble":67,"shootTraffic":83,"dunk":70,"dunkStanding":56,"clutch":52,"handling":62,"passing":58,"lowOffense":85,"lowDefense":85,"defense":67,"blocks":70,"steals":59,"offensiveRebound":77,"defensiveRebound":85,"speed":74,"quickness":76,"vertical":78,"strength":64,"hustle":93,"stamina":73,"durability":90,"foul":78,"consistency":69,"offensiveAwareness":71,"defensiveAwareness":69},
 {"number":25,"name":"Franklin Haynes","pos":"SG","year":"FR","overall":77,"potential":"C","height":"6'5\"","weight":209,"hometown":"St. Louis, MO","source":"Screenshot 2026-11-15 21-49-00.png","close":86,"medium":71,"threePoint":85,"freeThrow":72,"layup":77,"shootDribble":81,"shootTraffic":78,"dunk":65,"dunkStanding":0,"clutch":70,"handling":79,"passing":64,"lowOffense":62,"lowDefense":57,"defense":82,"blocks":68,"steals":86,"offensiveRebound":63,"defensiveRebound":73,"speed":86,"quickness":83,"vertical":77,"strength":70,"hustle":69,"stamina":86,"durability":85,"foul":55,"consistency":78,"offensiveAwareness":63,"defensiveAwareness":73},
 {"number":30,"name":"Sylvester Curry","pos":"SF","year":"FR","overall":76,"potential":"B+","height":"6'6\"","weight":202,"hometown":"Buena Park, CA","source":"Screenshot 2026-11-15 21-49-03.png","close":83,"medium":79,"threePoint":68,"freeThrow":74,"layup":80,"shootDribble":70,"shootTraffic":83,"dunk":77,"dunkStanding":53,"clutch":58,"handling":73,"passing":62,"lowOffense":63,"lowDefense":70,"defense":75,"blocks":71,"steals":72,"offensiveRebound":71,"defensiveRebound":80,"speed":80,"quickness":77,"vertical":77,"strength":68,"hustle":79,"stamina":84,"durability":82,"foul":54,"consistency":67,"offensiveAwareness":74,"defensiveAwareness":68},
 {"number":24,"name":"Jazz Modrovich","pos":"SG","year":"FR","overall":74,"potential":"B+","height":"6'2\"","weight":188,"hometown":"West Covina, CA","source":"Screenshot 2026-11-15 21-49-05.png","close":87,"medium":73,"threePoint":71,"freeThrow":86,"layup":69,"shootDribble":77,"shootTraffic":84,"dunk":56,"dunkStanding":1,"clutch":72,"handling":77,"passing":71,"lowOffense":65,"lowDefense":63,"defense":86,"blocks":56,"steals":64,"offensiveRebound":68,"defensiveRebound":75,"speed":85,"quickness":85,"vertical":72,"strength":64,"hustle":69,"stamina":84,"durability":83,"foul":74,"consistency":70,"offensiveAwareness":63,"defensiveAwareness":71},
 {"number":2,"name":"Marquise Cambridge","pos":"PG","year":"FR","overall":73,"potential":"A-","height":"6'2\"","weight":192,"hometown":"Queens, NY","source":"Screenshot 2026-11-15 21-49-06.png","close":81,"medium":71,"threePoint":70,"freeThrow":69,"layup":70,"shootDribble":78,"shootTraffic":77,"dunk":46,"dunkStanding":2,"clutch":56,"handling":87,"passing":80,"lowOffense":60,"lowDefense":51,"defense":80,"blocks":55,"steals":73,"offensiveRebound":51,"defensiveRebound":66,"speed":92,"quickness":91,"vertical":76,"strength":64,"hustle":76,"stamina":85,"durability":76,"foul":70,"consistency":65,"offensiveAwareness":65,"defensiveAwareness":66},
 {"number":35,"name":"Christano Timba","pos":"SG","year":"RS JR","overall":72,"potential":"D","height":"6'4\"","weight":223,"hometown":"Cameroon","source":"Screenshot 2026-11-15 21-49-08.png","close":84,"medium":77,"threePoint":66,"freeThrow":73,"layup":81,"shootDribble":78,"shootTraffic":74,"dunk":61,"dunkStanding":0,"clutch":76,"handling":80,"passing":70,"lowOffense":64,"lowDefense":56,"defense":80,"blocks":48,"steals":78,"offensiveRebound":64,"defensiveRebound":73,"speed":87,"quickness":81,"vertical":78,"strength":61,"hustle":65,"stamina":87,"durability":82,"foul":72,"consistency":65,"offensiveAwareness":65,"defensiveAwareness":64},
 {"number":45,"name":"Sammy Cooperwood","pos":"PF","year":"SR","overall":71,"potential":"C","height":"6'8\"","weight":227,"hometown":"Montgomery, AL","source":"Screenshot 2026-11-15 21-49-10.png","close":88,"medium":68,"threePoint":62,"freeThrow":56,"layup":62,"shootDribble":60,"shootTraffic":89,"dunk":77,"dunkStanding":58,"clutch":64,"handling":56,"passing":53,"lowOffense":68,"lowDefense":74,"defense":66,"blocks":78,"steals":72,"offensiveRebound":78,"defensiveRebound":79,"speed":70,"quickness":70,"vertical":75,"strength":68,"hustle":75,"stamina":72,"durability":85,"foul":79,"consistency":66,"offensiveAwareness":71,"defensiveAwareness":66},
 {"number":31,"name":"Fabrice Louh","pos":"SF","year":"RS FR","overall":70,"potential":"C-","height":"6'6\"","weight":209,"hometown":"Cameroon","source":"Screenshot 2026-11-15 21-49-12.png","close":85,"medium":69,"threePoint":62,"freeThrow":64,"layup":68,"shootDribble":69,"shootTraffic":75,"dunk":73,"dunkStanding":0,"clutch":67,"handling":71,"passing":56,"lowOffense":64,"lowDefense":64,"defense":79,"blocks":57,"steals":72,"offensiveRebound":72,"defensiveRebound":71,"speed":75,"quickness":73,"vertical":73,"strength":68,"hustle":80,"stamina":80,"durability":77,"foul":56,"consistency":66,"offensiveAwareness":66,"defensiveAwareness":73},
 {"number":44,"name":"Monty Peciukas","pos":"C","year":"RS SO","overall":67,"potential":"C-","height":"6'11\"","weight":192,"hometown":"Bronx, NY","source":"Screenshot 2026-11-15 21-49-15.png","close":82,"medium":68,"threePoint":52,"freeThrow":63,"layup":62,"shootDribble":57,"shootTraffic":81,"dunk":63,"dunkStanding":62,"clutch":55,"handling":53,"passing":56,"lowOffense":76,"lowDefense":65,"defense":65,"blocks":52,"steals":63,"offensiveRebound":79,"defensiveRebound":76,"speed":67,"quickness":60,"vertical":61,"strength":72,"hustle":57,"stamina":67,"durability":79,"foul":73,"consistency":64,"offensiveAwareness":71,"defensiveAwareness":73},
 {"number":43,"name":"Dennis Carmichael","pos":"PF","year":"FR","overall":66,"potential":"C-","height":"6'10\"","weight":220,"hometown":"St. Petersburg, FL","source":"Screenshot 2026-11-15 21-49-19.png","close":83,"medium":66,"threePoint":57,"freeThrow":63,"layup":56,"shootDribble":62,"shootTraffic":76,"dunk":61,"dunkStanding":74,"clutch":57,"handling":48,"passing":50,"lowOffense":74,"lowDefense":72,"defense":70,"blocks":72,"steals":60,"offensiveRebound":73,"defensiveRebound":75,"speed":68,"quickness":70,"vertical":65,"strength":62,"hustle":77,"stamina":71,"durability":73,"foul":71,"consistency":56,"offensiveAwareness":68,"defensiveAwareness":64},
 {"number":23,"name":"Tyler Lewandowski","pos":"PG","year":"RS FR","overall":57,"potential":"D","height":"6'4\"","weight":201,"hometown":"Scottsdale, AZ","source":"Screenshot 2026-11-15 21-49-21.png","close":75,"medium":68,"threePoint":57,"freeThrow":61,"layup":64,"shootDribble":77,"shootTraffic":64,"dunk":16,"dunkStanding":0,"clutch":49,"handling":74,"passing":67,"lowOffense":45,"lowDefense":43,"defense":76,"blocks":38,"steals":57,"offensiveRebound":56,"defensiveRebound":57,"speed":81,"quickness":78,"vertical":69,"strength":48,"hustle":70,"stamina":76,"durability":72,"foul":66,"consistency":60,"offensiveAwareness":69,"defensiveAwareness":62},
 {"number":22,"name":"Ronald Shavies","pos":"SG","year":"FR","overall":52,"potential":"F","height":"6'5\"","weight":201,"hometown":"Bronx, NY","source":"Screenshot 2026-11-15 21-49-23.png","close":71,"medium":59,"threePoint":54,"freeThrow":54,"layup":50,"shootDribble":73,"shootTraffic":70,"dunk":40,"dunkStanding":0,"clutch":59,"handling":68,"passing":66,"lowOffense":51,"lowDefense":46,"defense":79,"blocks":44,"steals":64,"offensiveRebound":50,"defensiveRebound":63,"speed":81,"quickness":76,"vertical":58,"strength":56,"hustle":54,"stamina":75,"durability":67,"foul":68,"consistency":52,"offensiveAwareness":56,"defensiveAwareness":50}
];

function seedIllinoisCurrentRoster() {
 const x = data.find(z => z.id === 'illinois-basketball-2010');
 if (!x) return false;
 const version = '2012-13-opening-roster-v1';
 if (x.illinoisRosterImportVersion === version || parseInt(x.season, 10) > 2012) return false;

 const previous = Array.isArray(x.players) ? x.players : [];
 const nameKey = name => String(name || '').trim().toLowerCase();
 const matches = (saved, player) => nameKey(saved.name) === nameKey(player.name) ||
  (player.number === 3 && String(saved.number) === '3' && nameKey(saved.name) === 'a. eaton');
 if (!Array.isArray(x.illinoisRosterArchive2011)) {
  const namesFrom2012 = new Set(illinois2013Roster.map(p => nameKey(p.name)));
  const oldRoster = illinois2012Roster.map(p => ({...p,...(previous.find(q => matches(q,p)) || {})}));
  const additional = previous.filter(p => !oldRoster.some(q => matches(p,q)) && !namesFrom2012.has(nameKey(p.name)));
  x.illinoisRosterArchive2011 = [...oldRoster,...additional];
 }
 x.players = illinois2013Roster.map(player => {
  const saved = {...previous.find(p => matches(p,player))};
  for (const key of illinois2012AttributeKeys) delete saved[key];
  const note = saved.notes;
  const signing = illinois2012SigningClass.find(p => p.name === player.name);
  const recruiting = signing ? {...saved.recruiting, classYear:2012, stars:signing.stars, nationalRank:signing.nationalRank, commitment:'Illinois'} : saved.recruiting;
  return {...saved,...player, notes:note || signing?.notes, recruiting};
 });
 x.season = '2012–13';
 x.illinoisRosterImportVersion = version;
 return true;
}
const illinoisPositions=['Guard','Wing','Big'];
function illinoisGroup(p){const v=String(p.planningGroup||p.group||p.pos||p.position||'').toUpperCase().trim();if(v==='GUARD'||v==='PG'||v==='SG')return 'Guard';if(v==='WING'||v==='SF')return 'Wing';if(v==='BIG'||v==='PF'||v==='C')return 'Big';return ''}
function illinoisBase(x){return parseInt(x.season, 10) >= 2012 ? parseInt(x.season, 10) : 2011}
function illinoisPool(x){
 const current=(x.players||[]).map((p,i)=>({...p,source:'roster',rosterIndex:i}));
 const known=(x.historicalPlayers||[]).filter(p=>p.id?.startsWith('illinois-')&&!current.some(c=>c.name===p.name)).map(p=>({...p,pos:p.position||'',year:'',source:'archive'}));
 return [...current,...known];
}
function illinoisPos(p){return String(p.pos||p.position||'').toUpperCase().trim()}
function illinoisYears(x){const start=illinoisBase(x);return Array.from({length:5},(_,i)=>start+i)}
function illinoisEligible(p,year,base){
 // 2012 draft entrants, departures and graduates do not appear on 2012–13 onward.
 // Preserve their 2011–12 player profiles and historical performance.
 const ill=typeof f==='function'?f():null;
 const departure=ill?.id==='illinois-basketball-2010'?(ill.illinois2012Departures||[]).find(d=>String(d.number)===String(p.number??'')||(d.name===p.name)):null;
 if(base===2011&&year>2011&&departure)return false;
 if(p.source==='archive')return base===2011&&year===base;
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

let illinoisSnapshotYear = '2012–13';

function selectIllinoisSnapshot(year) {
 illinoisSnapshotYear = year;
 render();
}

function illinoisSnapshot(x) {
 const historical = illinoisSnapshotYear === '2011–12';
 const players = historical ? x.illinoisRosterArchive2011 || illinois2012Roster : illinois2013Roster;
 const rows = players.slice().sort((a,b) => (b.overall ?? -1) - (a.overall ?? -1)).map(p => {
  const activeIndex = historical ? -1 : (x.players || []).findIndex(player => player.name === p.name);
  const name = activeIndex < 0 ? esc(p.name) : '<button type="button" class="profile-link" onclick="openPlayer(' + activeIndex + ')">' + esc(p.name) + '</button>';
  const status = historical ? x.illinois2012Departures?.find(d => d.name === p.name)?.status : '';
  return '<tr><td>' + esc(p.number ?? '—') + '</td><td>' + name + '</td><td>' + esc(p.pos || '—') + '</td><td>' + esc(p.year || '—') + '</td><td>' + esc(p.overall ?? '—') + '</td><td>' + esc(p.potential || '—') + '</td>' + (historical ? '<td>' + esc(status || '—') + '</td>' : '') + '</tr>';
 }).join('');
 return `<div class="row"><h2 class="wide">Illinois · Roster Snapshot</h2><button type="button" onclick="changeTab('Five-Year Outlook')">Five-Year Outlook →</button></div>
 <section class="card">
  <label for="illinois-snapshot-season">Season</label>
  <select id="illinois-snapshot-season" onchange="selectIllinoisSnapshot(this.value)">
   <option ${historical ? 'selected' : ''}>2011–12</option>
   <option ${historical ? '' : 'selected'}>2012–13</option>
  </select>
  <p>${historical ? 'Saved 2011–12 roster' : 'Opening 2012–13 roster'} · ${players.length} players</p>
  <div style="overflow-x:auto"><table>
   <thead><tr><th scope="col">No.</th><th scope="col">Player</th><th scope="col">Pos</th><th scope="col">Class</th><th scope="col">OVR</th><th scope="col">Potential</th>${historical ? '<th scope="col">Offseason</th>' : ''}</tr></thead>
   <tbody>${rows}</tbody>
  </table></div>
  ${historical ? '' : '<p><a href="' + illinoisRosterRatings + '" download>Download 2012–13 roster ratings (TXT)</a></p>'}
 </section>`;
}
function illinoisOutlook(x){
 const years=illinoisYears(x),base=years[0],pool=illinoisPool(x),plan=x.illinoisDepth||{};
 let html='<h2>Illinois · Five-Year Outlook</h2><p class="muted">Projected roster depth chart · '+base+'–'+(base+4)+'. Football-style player cards with three options per Guard, Wing and Big group. These are roster priorities, not mandatory starters.</p>';
 html+='<div class="outlook-scroll" role="region" tabindex="0" aria-label="Illinois five-year roster depth chart"><div class="outlook-table" style="--outlook-years:5"><div class="outlook-head outlook-position-head">GROUP</div>'+years.map(y=>'<div class="outlook-head">'+y+'–'+String(y+1).slice(2)+'</div>').join('');
 for(const group of illinoisPositions){
  html+='<div class="outlook-year">'+esc(group)+'</div>';
  for(const yr of years){
   const candidates=pool.filter(p=>illinoisGroup(p)===group&&illinoisEligible(p,yr,base));
   const key=yr+'-'+group,picks=plan[key]||{};
   const stored=[picks['1']||picks.starter||'',picks['2']||picks.backup||'',picks['3']||''];
   const taken=new Set(stored.filter(Boolean));
   const available=candidates.filter(p=>!taken.has(p.name)).sort((a,b)=>(illinoisRating(b,yr,base)||0)-(illinoisRating(a,yr,base)||0));
   let offset=0;
   const names=stored.map(n=>n||available[offset++]?.name||'');
   const choice=slot=>candidates.find(p=>p.name===names[slot-1]);
   const yearLabel=p=>{const raw=String(p.year||'').toLowerCase(),stage=/freshman|\bfr\b/.test(raw)?0:/sophomore|\bso\b/.test(raw)?1:/junior|\bjr\b/.test(raw)?2:/senior|\bsr\b/.test(raw)?3:null;return stage===null?'Class unknown':(['FR','SO','JR','SR'][Math.min(3,stage+yr-base)]+(raw.includes('rs')?' · RS':''));};
   const identity=p=>illinoisPos(p)+(p.number?' · #'+p.number:'')+' · '+yearLabel(p);
   const edit=slot=>'<div class="depth-edit" id="illinois-depth-'+yr+'-'+group+'-'+slot+'"><select aria-label="Select '+esc(group)+' option '+slot+' for '+yr+'" onchange="illinoisSetDepth('+yr+',\''+group+'\',\''+slot+'\',this.value)"><option value="">Open</option>'+candidates.map(p=>'<option value="'+esc(p.name)+'" '+(names[slot-1]===p.name?'selected':'')+'>'+esc(p.name)+' · '+esc(illinoisPos(p))+'</option>').join('')+'</select></div>';
   const top=choice(1),topOvr=top?illinoisRating(top,yr,base):null;
   html+='<div class="outlook-cell">';
   html+=top?'<div class="mini-card">'+(topOvr!==null?'<span class="rating-bubble" style="background:'+ratingColor(topOvr,x)+'">'+esc(topOvr)+'</span>':'')+'<small>'+esc(identity(top))+'</small><div class="mini-name">'+esc(top.name)+'</div><div class="dev-mark">◆ '+esc(top.potential||'Unknown')+' Potential</div><small>'+(yr===base?'Recorded OVR':'Projected OVR')+'</small></div>':'<div class="mini-card" style="opacity:.45"><small>'+esc(group)+' · 1</small><div class="mini-name">Open</div><small>Unassigned</small></div>';
   html+='<button type="button" class="depth-change" onclick="illinoisToggleDepth('+yr+',\''+group+'\',\'1\')">Change first option ▾</button>'+edit(1);
   for(const slot of [2,3]){
    const p=choice(slot),ovr=p?illinoisRating(p,yr,base):null;
    html+='<button type="button" class="backup-line" onclick="illinoisToggleDepth('+yr+',\''+group+'\',\''+slot+'\')"><span style="color:#75658d;font-size:10px">'+slot+'</span><span class="backup-person"><span class="backup-name">'+esc(p?p.name:'Select option '+slot)+'</span>'+(p?'<span class="backup-class">'+esc(identity(p))+'</span>':'')+'</span>'+(ovr!==null?'<span class="backup-rating" style="background:'+ratingColor(ovr,x)+'">'+esc(ovr)+'</span>':'')+(p?'<span class="backup-dev" title="'+esc(p.potential||'Unknown')+' potential">◆</span>':'')+'</button>'+edit(slot);
   }
   html+='</div>';
  }
 }
 html+='</div></div><p class="outlook-note">The Washington football card style is reused here. OVR projections use Illinois potential ceilings, not football development traits. Class years and future eligibility are estimates.</p>';
 html+=illinoisEssentialsSummary(x,years);
 html+='<details class="card"><summary style="cursor:pointer;font-weight:800">Evaluate True PG / Post Stopper skills</summary>'+illinoisEssentialsEditor(x,base)+'</details>';
 html+='<div class="card"><h3>Roster construction, not a lineup lock</h3><p class="muted">Three-deep Guard, Wing and Big options. The featured card is your top roster priority, not necessarily a starter. Actual lineup combinations remain flexible.</p><button class="primary" onclick="editItem(\'players\',-1)">+ Add player</button> <button onclick="changeTab(\'Roster Snapshot\')">Roster snapshot</button></div>';
 return html;
}
function illinoisToggleDepth(yr,group,slot){
 const el=document.getElementById('illinois-depth-'+yr+'-'+group+'-'+slot);
 if(!el)return;
 const open=!el.classList.contains('open');
 document.querySelectorAll('[id^="illinois-depth-"].open').forEach(node=>node.classList.remove('open'));
 if(open){el.classList.add('open');el.querySelector('select')?.focus();}
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
