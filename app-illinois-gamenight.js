// Illinois game-night workspace. Only user-entered results become game-night records.
function illinoisGameNight(x){
 const games=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 const historical=x.historicalGames||[];
 const baylor=historical.find(g=>g.id==='illinois-2012-ncaa-baylor');
 const latest=games.slice().reverse();
 const recorded=games.find(g=>g.opponent?.toLowerCase()==='baylor'&&g.status==='final');
 const next=recorded?'Season complete · Baylor 50, Illinois 41':'No. 9 Baylor · March 16, 2012 · East Regional';
 const line=(g)=>'<div class="card"><strong>'+esc(g.opponent||'Opponent')+'</strong> <span class="muted">'+esc(g.stage||'Game')+' · '+esc(g.date||'Date not recorded')+'</span><p>'+esc(g.status==='final'?(g.illinoisScore+'–'+g.opponentScore+' · '+(g.illinoisScore>g.opponentScore?'W':g.illinoisScore<g.opponentScore?'L':'T')):'Scheduled')+'</p>'+(g.notes?'<p>'+esc(g.notes)+'</p>':'')+'</div>';
 return '<section class="card" style="background:linear-gradient(120deg,#13294b,#213e63);color:#fff"><small>COLLEGE HOOPS 2K8 · GAME NIGHT</small><h2 style="color:#fff;margin:.4em 0">Illinois Fighting Illini</h2><p style="color:#fff">Bruce Weber · 2011–12 · Big Ten Tournament Champions</p><div class="grid"><div><strong style="font-size:1.8em">24–11</strong><div>Final record</div></div><div><strong style="font-size:1.8em">12–6</strong><div>Big Ten · 3rd</div></div><div><strong style="font-size:1.8em">No. 8</strong><div>NCAA East seed</div></div></div></section>'+
 '<div class="card"><h3>Season finale</h3><p><strong>'+esc(next)+'</strong></p><p class="muted">Illinois finished 24–11. Baylor’s Coverdale scored 18 in the NCAA opening-round win.</p></div>'+
 '<div class="card"><h3>Record a game</h3><p class="muted">Enter the result after you play. Notes and storylines will remain attached to this franchise and sync with your cloud save.</p><form onsubmit="illinoisRecordGame(event)"><div class="grid"><label>Opponent<input name="opponent" required value="'+(recorded?'': 'Baylor')+'"></label><label>Date<input name="date" type="date" value="'+(recorded?'':'2012-03-16')+'"></label><label>Stage<input name="stage" value="'+(recorded?'':'NCAA Tournament · East Regional')+'"></label><label>Illinois score<input name="illinoisScore" type="number" min="0" max="250" required></label><label>Opponent score<input name="opponentScore" type="number" min="0" max="250" required></label></div><label>Game notes, standout players, storylines<textarea name="notes" rows="4" placeholder="Who stepped up? Turning point? What should the media remember?"></textarea></label><button class="primary" type="submit">Save game result</button></form></div>'+
 '<div class="card"><h3>NCAA Tournament · Baylor 50, Illinois 41</h3><p>Baylor shot 23/37 (62.2%) and outrebounded Illinois 20–15. Coverdale scored 18 points.</p><p>Vern Leadbetter scored 14; Shema Mattox added 10 points and 8 rebounds.</p></div>'+
 '<div class="card"><h3>Offseason departures</h3><p class="muted">Entering the NBA draft is not the same as being drafted.</p><div class="grid">'+(x.illinois2012Departures||[]).map(d=>'<div><strong>'+esc(d.name)+'</strong><p class="muted">'+esc(d.status)+'</p></div>').join('')+'</div></div>'+ '<h3>Big Ten Tournament · Road to the title</h3><div class="grid">'+historical.filter(g=>g.status==='final'&&String(g.stage||'').includes('Big Ten Tournament')).map(g=>'<div class="card"><small>'+esc(g.stage)+'</small><h3>'+esc(g.opponent)+'</h3><div class="stat">'+esc(g.teamScore)+'–'+esc(g.opponentScore)+'</div><p>Illinois victory</p></div>').join('')+'</div>'+
 '<div class="card"><h3>Key characters</h3><div class="grid">'+(x.historicalPlayers||[]).filter(p=>p.id?.startsWith('illinois-')).map(p=>'<div><strong>'+esc(p.name)+'</strong><p class="muted">'+esc(p.role||p.position||'')+'</p></div>').join('')+'<div><strong>Bruce Weber</strong><p class="muted">Head coach</p></div></div></div>'+
 '<h3>Your recorded game nights</h3>'+(latest.length?latest.map(line).join(''):'<div class="card"><p class="muted">No additional games recorded.</p></div>')+
 '<div class="row"><button onclick="changeTab(\'Archive\')">Open complete Illinois archive</button><button onclick="changeTab(\'Publications\')">Publications</button></div>';
}
function illinoisRecordGame(event){
 event.preventDefault();
 const form=event.target, fd=new FormData(form),x=f();
 if(x.id!=='illinois-basketball-2010')return;
 const opponent=String(fd.get('opponent')||'').trim();
 const a=Number(fd.get('illinoisScore')),b=Number(fd.get('opponentScore'));
 if(!opponent||!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0)return alert('Enter an opponent and valid scores.');
 const entry={id:'illinois-game-'+Date.now(),opponent,date:String(fd.get('date')||''),stage:String(fd.get('stage')||''),illinoisScore:a,opponentScore:b,notes:String(fd.get('notes')||'').trim(),status:'final'};
 if(x.illinoisGameNight?.some(g=>g.status==='final'&&g.opponent?.toLowerCase()===opponent.toLowerCase()&&g.date===String(fd.get('date')||''))){alert('This game is already recorded.');return;}if(!confirm('Record Illinois '+a+'–'+b+' '+opponent+' as a final result?'))return;
 x.illinoisGameNight=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 x.illinoisGameNight.push(entry);
 save();render();
}
