// Illinois Game Night: historicalGames is the canonical game store.
// The 2012 Baylor loss is a single game; game-night mirrors are not separate games.
function illinoisGameNight(x){
 const games=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 const historical=x.historicalGames||[];
 const baylor=historical.find(g=>g.id==='illinois-2012-ncaa-baylor');
 const final=baylor&&baylor.status==='final';
 const box=baylor?.illinoisBoxScore||[];
 const stat=baylor?.teamStats;
 const boxTable=box.length?'<div style="overflow-x:auto"><table style="min-width:850px;width:100%"><thead><tr>'+['Player','PTS','REB','AST','STL','BLK','TO','FG','3PT','FT','MIN'].map(v=>'<th>'+v+'</th>').join('')+'</tr></thead><tbody>'+box.map(p=>'<tr><td>'+esc(p.name)+'</td>'+(p.dnp?'<td colspan="10">'+esc(p.dnp)+'</td>':[p.pts,p.reb,p.ast,p.stl,p.blk,p.to,p.fg,p.three,p.ft,p.min].map(v=>'<td>'+esc(v??'—')+'</td>').join(''))+'</tr>').join('')+'</tbody></table></div>':'<p class="muted">Detailed box score not yet imported.</p>';
 const numbers=stat?'<div style="overflow-x:auto"><table style="width:100%"><thead><tr><th>Team comparison</th><th>Baylor</th><th>Illinois</th></tr></thead><tbody>'+[['FG', 'fieldGoals'],['3PT','threePointers'],['FT','freeThrows'],['Assists','assists'],['Turnovers','turnovers'],['Rebounds','rebounds'],['Offensive rebounds','offensiveRebounds'],['Points in paint','pointsInPaint'],['Fast-break points','fastBreakPoints']].map(([label,key])=>'<tr><td>'+esc(label)+'</td><td>'+esc(stat.Baylor[key])+'</td><td>'+esc(stat.Illinois[key])+'</td></tr>').join('')+'</tbody></table></div>':'<p>Baylor shot 23/37 (62.2%) and outrebounded Illinois 20–15.</p>';
 const otherGames=games.filter(g=>!(g.opponent||'').toLowerCase().includes('baylor'));
 const conflicts=x.illinoisCanonConflicts||[];
 const renderGame=g=>'<div class="card"><strong>'+esc(g.opponent||'Opponent')+'</strong><p>'+esc(g.illinoisScore)+'–'+esc(g.opponentScore)+' · '+esc(g.date||'')+'</p></div>';
 return '<h2>Illinois · Game Night</h2><div class="card"><h3>2011–12 season completed · 24–11</h3><p>Big Ten Tournament champions · 12–6 Big Ten · NCAA East No. 8 seed</p></div>'+
 '<div class="card"><h3>NCAA Round of 64 · Baylor 50, Illinois 41</h3><p>Halftime: Baylor 23, Illinois 21. Second half: Baylor 27, Illinois 20. Baylor scored 32 points in the paint; Illinois had 22. Leadbetter led Illinois with 14 points and Mattox had 10 points and 8 rebounds.</p><p class="muted">Coverdale scoring 18 for Baylor was reported separately; the ten TXT files include the Illinois player box score, not Baylor individual player stats.</p>'+numbers+'<h3>Illinois player box score</h3>'+boxTable+'<small class="muted">Sources: docs/illinois/2011-12/screenshots/03–07 · One canonical Baylor record</small></div>'+
 '<div class="card"><h3>2012 offseason departures</h3><p class="muted">NBA teams and draft picks are unrecorded.</p><div class="grid">'+(x.illinois2012Departures||[]).map(d=>'<div><strong>'+esc(d.name)+'</strong><p>'+esc(d.status)+(d.overall?' · '+esc(d.overall)+' OVR':'')+'</p>'+(d.stats?'<p>'+esc(d.stats)+'</p>':'')+'</div>').join('')+'</div></div>'+
 '<div class="card"><h3>National season milestones</h3><p><strong>Clemson</strong> · 2012 NCAA champion, 34–4 overall and 13–3 ACC.</p><p><strong>Bron Cable · Georgia</strong> · National Player of the Year, Big Man of the Year, First-Team All-American, Conference Player of the Year and First-Team All-Conference.</p></div>'+
 '<div class="card"><h3>Recorded conflicts / source checkpoints</h3><p class="muted">Discrepancies are tracked instead of silently rewriting older notes.</p>'+(conflicts.length?'<ul>'+conflicts.map(c=>'<li><strong>'+esc(c.issue)+'</strong> · '+esc(c.review||'Review')+'</li>').join('')+'</ul>':'<p>No recorded source conflicts.</p>')+'</div>'+
 '<h3>Big Ten Tournament · Road to title</h3><div class="grid">'+historical.filter(g=>g.status==='final'&&String(g.stage||'').includes('Big Ten Tournament')).map(g=>'<div class="card"><strong>'+esc(g.opponent)+'</strong><div>'+esc(g.teamScore)+'–'+esc(g.opponentScore)+'</div></div>').join('')+'</div>'+
 '<div class="card"><h3>Record a future game</h3><p>Finalized Baylor is already recorded and cannot be added a second time.</p><form onsubmit="illinoisRecordGame(event)"><div class="grid"><label>Opponent<input name="opponent" required></label><label>Date<input name="date" type="date"></label><label>Stage<input name="stage"></label><label>Illinois score<input name="illinoisScore" type="number" min="0" max="250" required></label><label>Opponent score<input name="opponentScore" type="number" min="0" max="250" required></label></div><label>Storyline<textarea name="notes" rows="3"></textarea></label><button class="primary">Save result</button></form></div>'+
 (otherGames.length?'<h3>Other recorded games</h3>'+otherGames.map(renderGame).join(''):'');
}

function illinoisRecordGame(event){
 event.preventDefault();
 const form=event.target, fd=new FormData(form),x=f();
 if(x.id!=='illinois-basketball-2010')return;
 const opponent=String(fd.get('opponent')||'').trim();
 const a=Number(fd.get('illinoisScore')),b=Number(fd.get('opponentScore'));
 if(!opponent||!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0)return alert('Enter an opponent and valid scores.');
 const entry={id:'illinois-game-'+Date.now(),opponent,date:String(fd.get('date')||''),stage:String(fd.get('stage')||''),illinoisScore:a,opponentScore:b,notes:String(fd.get('notes')||'').trim(),status:'final'};
 if((opponent.toLowerCase()==='baylor'&&(x.historicalGames||[]).some(g=>g.id==='illinois-2012-ncaa-baylor'&&g.status==='final'))||x.illinoisGameNight?.some(g=>g.status==='final'&&g.opponent?.toLowerCase()===opponent.toLowerCase()&&g.date===String(fd.get('date')||''))){alert('This game is already recorded.');return;}if(!confirm('Record Illinois '+a+'–'+b+' '+opponent+' as a final result?'))return;
 x.illinoisGameNight=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 x.illinoisGameNight.push(entry);
 save();render();
}
