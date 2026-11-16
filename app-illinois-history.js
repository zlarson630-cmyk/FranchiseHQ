// Illinois College Hoops 2K8 legacy: confirmed historical records only.
// Source: Illinois Legacy Log, https://docs.google.com/document/d/1HGrU6zCfyts7KhSwJtMV8xHbflsUxgeNhl3HwpXvGb8/edit
// Idempotent: never replace existing game-state rosters, current season, or user edits.
function seedIllinoisHistory(){
 const x=data.find(z=>z.id==='illinois-basketball-2010');if(!x)return;
 const seasons=[
 {id:'illinois-2007-08',season:'2007–08',wins:17,losses:17,conference:'Big Ten',conferenceWins:null,conferenceLosses:null,finish:null,status:'completed',postseason:'Not recorded'},
 {id:'illinois-2008-09',season:'2008–09',wins:18,losses:14,conference:'Big Ten',conferenceWins:null,conferenceLosses:null,finish:null,status:'completed',postseason:'Not recorded'},
 {id:'illinois-2009-10',season:'2009–10',wins:17,losses:14,conference:'Big Ten',conferenceWins:null,conferenceLosses:null,finish:null,status:'completed',postseason:'Not recorded'},
 {id:'illinois-2010-11',season:'2010–11',wins:16,losses:15,conference:'Big Ten',conferenceWins:7,conferenceLosses:11,finish:'Tied 7th',status:'completed',postseason:'Not recorded'},
 {id:'illinois-2011-12',season:'2011–12',wins:24,losses:10,conference:'Big Ten',conferenceWins:12,conferenceLosses:6,finish:'3rd',status:'in-progress',recordCheckpoint:'After Big Ten Tournament, before NCAA Tournament',regularSeason:{wins:21,losses:10},postseason:'Big Ten Tournament champions; NCAA East No. 8 seed; Baylor result pending',sourceCorrection:'Indiana replayed as a win; prior 20–11 / 11–7 is superseded'}
 ];
 const games=[
 {id:'illinois-2012-btt-penn-state',seasonId:'illinois-2011-12',stage:'Big Ten Tournament quarterfinal',opponent:'Penn State',teamScore:82,opponentScore:69,status:'final',result:'W'},
 {id:'illinois-2012-btt-michigan-state',seasonId:'illinois-2011-12',stage:'Big Ten Tournament semifinal',opponent:'Michigan State',teamScore:57,opponentScore:49,status:'final',result:'W',playerOfGameId:'illinois-mekel-defares'},
 {id:'illinois-2012-btt-ohio-state',seasonId:'illinois-2011-12',stage:'Big Ten Tournament championship',opponent:'Ohio State',teamScore:57,opponentScore:47,status:'final',result:'W',playerOfGameId:'illinois-shema-mattox'},
 {id:'illinois-2012-ncaa-baylor',seasonId:'illinois-2011-12',stage:'NCAA Tournament East Regional, No. 8 vs No. 9',opponent:'Baylor',date:'2012-03-16',venue:'SEFCU Arena',status:'scheduled',teamScore:null,opponentScore:null,result:null}
 ];
 const people=[
 {id:'illinois-shema-mattox',name:'Shema Mattox',team:'Illinois',season:'2008–12',role:'Center · No. 43',position:'C',biography:'Arrived as a freshman in fall 2008. Defensive standout under Bruce Weber; senior leader of the 2011–12 Big Ten Tournament champions.',history:[{years:'2010–11',team:'Illinois',role:'Junior center; 11.9 points, 5.3 rebounds, 1.8 blocks per game in captured snapshot'},{years:'2011–12',team:'Illinois',role:'Senior center; 17.3 points and 5.9 rebounds per game in regular-season snapshot'}],awards:[{season:'2010–11',name:'Big Ten Defender of the Year',description:'Recorded in season notes'},{season:'2011–12',name:'Big Ten championship Player of the Game',description:'Illinois 57, Ohio State 47'}]},
 {id:'illinois-mekel-defares',name:'Mekel Defares',team:'Illinois',season:'2009–12',role:'Small forward · No. 20',position:'SF',biography:'Scored 47 points across the three documented 2011–12 Big Ten Tournament victories: 10 against Penn State, 19 against Michigan State and 18 against Ohio State.',awards:[{season:'2011–12',name:'Big Ten semifinal Player of the Game',description:'Illinois 57, Michigan State 49'}]},
 {id:'illinois-robin-summers',name:'Robin Summers',team:'Illinois',season:'2009–12',role:'Point guard · No. 1',position:'PG',biography:'Illinois point guard and member of the 2011–12 Big Ten Tournament championship team.'},
 {id:'illinois-vern-leadbetter',name:'Vern Leadbetter',team:'Illinois',season:'2010–12',role:'Power forward · No. 42',position:'PF',biography:'Four-star power forward in the 2010 incoming class. Played as a freshman in 2010–11 and helped Illinois win the 2011–12 Big Ten Tournament.'}
 ];
 const coach={id:'illinois-bruce-weber',name:'Bruce Weber',team:'Illinois',role:'Head Coach',biography:'Head coach of Illinois throughout the recorded College Hoops 2K8 legacy, beginning in 2007–08. Led the 2011–12 team to the Big Ten Tournament title.',history:seasons.map(s=>({years:s.season,team:'Illinois',role:'Head Coach',record:s.wins+'–'+s.losses}))};
 const events=[
 {id:'illinois-history-2007-08',year:'2007–08',type:'Season',title:'Bruce Weber era: 17–17',body:'Illinois finished 17–17. Conference finish and postseason are not recorded.'},
 {id:'illinois-history-2008-09',year:'2008–09',type:'Season',title:'Illinois improves to 18–14',body:'Bruce Weber’s Illini finished 18–14; conference finish and postseason are not recorded.'},
 {id:'illinois-history-2009-10',year:'2009–10',type:'Season',title:'Illinois finishes 17–14',body:'The archived record is 17–14 under Bruce Weber.'},
 {id:'illinois-history-2010-11',year:'2010–11',type:'Season',title:'Illinois finishes tied for seventh in the Big Ten',body:'Illinois finished 16–15 overall and 7–11 in the Big Ten. Shema Mattox earned the recorded defensive honor.'},
 {id:'illinois-history-2011-12',year:'2011–12',type:'Season',title:'Illinois rises to third in the Big Ten',body:'Illinois finished the corrected regular season 21–10 overall and 12–6 in the Big Ten. The simulated Indiana win replaces an unsaved loss.'},
 {id:'illinois-history-2012-btt',year:'2011–12',type:'Championship',title:'Illinois wins the Big Ten Tournament',body:'Bruce Weber and Illinois defeated Penn State 82–69, Michigan State 57–49 and Ohio State 57–47. Shema Mattox was championship Player of the Game; Mekel Defares scored 47 points across the three games.'},
 {id:'illinois-history-2012-ncaa',year:'2011–12',type:'NCAA Tournament',title:'Illinois draws No. 9 Baylor in the East Regional',body:'Illinois enters the NCAA Tournament at 24–10 as the No. 8 seed. The Baylor game has not been played in the documented history.'}
 ];
 const append=(field,records)=>{x[field]=Array.isArray(x[field])?x[field]:[];for(const record of records)if(!x[field].some(y=>y.id===record.id))x[field].push(record)};
 append('historicalSeasons',seasons);append('historicalGames',games);append('historicalPlayers',people);append('coachIndex',[coach]);append('universeHistory',events);
 // 2012 NCAA opener and departure statuses: screenshots supplied by user.
 // Keep these in franchise-owned history; do not erase players or overwrite edits.
 const season=x.historicalSeasons.find(z=>z.id==='illinois-2011-12');
 if(season && season.wins===24 && season.losses===10){
   Object.assign(season,{losses:11,status:'completed',recordCheckpoint:'After NCAA Tournament first round',postseason:'Big Ten Tournament champions; NCAA East No. 8 seed; lost to Baylor 41–50 in Round of 64'});
 }
 const baylor=x.historicalGames.find(z=>z.id==='illinois-2012-ncaa-baylor');
 if(baylor && baylor.status==='scheduled'){
   Object.assign(baylor,{status:'final',teamScore:41,opponentScore:50,result:'L',notes:'Baylor won 50–41; Coverdale scored 18 for Baylor. Illinois ended 24–11.'});
 }
 const finish=x.universeHistory.find(z=>z.id==='illinois-history-2012-ncaa');
 if(finish && finish.title==='Illinois draws No. 9 Baylor in the East Regional'){
   Object.assign(finish,{title:'Baylor ends Illinois season, 50–41',body:'No. 8 Illinois lost to No. 9 Baylor 50–41 in the East Regional opening round, ending at 24–11. Baylor’s Coverdale scored 18. Illinois had won the Big Ten Tournament.'});
 }
 const departures=[
  {number:'1',name:'Robin Summers',status:'Entered draft'},
  {number:'24',name:'SG #24',status:'Entered draft'},
  {number:'43',name:'Shema Mattox',status:'Entered draft'},
  {number:'50',name:'Solomon Nelson',status:'Entered draft'},
  {number:'41',name:'Laramie Osimani',status:'Left team'},
  {number:'54',name:'C #54',status:'Graduated'}
 ];
 x.illinois2012Departures=Array.isArray(x.illinois2012Departures)?x.illinois2012Departures:[];
 for(const d of departures)if(!x.illinois2012Departures.some(z=>String(z.number)===d.number)){
   x.illinois2012Departures.push({id:'illinois-2012-departure-'+d.number,...d,season:'2011–12',source:'College Hoops 2K8 graduations screen'});
 }
 const departureEvent={id:'illinois-history-2012-departures',year:'2012',type:'Roster',title:'Four Illini enter NBA draft',body:'Robin Summers, SG #24, Shema Mattox, and Solomon Nelson entered the draft; Laramie Osimani left the team and C #54 graduated. Entry into the draft is not a confirmed NBA selection.'};
 if(!x.universeHistory.some(z=>z.id===departureEvent.id))x.universeHistory.push(departureEvent);
 const co=x.coachIndex.find(z=>z.id==='illinois-bruce-weber');
 if(co){const h=co.history?.find(z=>z.years==='2011–12');if(h&&h.record==='24–10')h.record='24–11';}
 // Source-grade canon update: ten TXT transcriptions in docs/illinois/2011-12/screenshots.
 // Keep one authoritative Baylor game record in historicalGames and point Game Night to it.
 const sourceRoot='docs/illinois/2011-12/screenshots/';
 const canonFlags=x.illinoisCanonConflicts=Array.isArray(x.illinoisCanonConflicts)?x.illinoisCanonConflicts:[];
 const flag=(id,issue,existing,source)=>{if(!canonFlags.some(c=>c.id===id))canonFlags.push({id,issue,existing,source,review:'Open'});};
 const game=x.historicalGames.find(g=>g.id==='illinois-2012-ncaa-baylor');
 if(game){
  // Preserve a user-entered differing game rather than silently claiming its score matched.
  if(game.status==='final'&&(game.teamScore!==41||game.opponentScore!==50)){
   flag('baylor-final-score','Existing Baylor final differs from screenshot transcription',String(game.teamScore)+'–'+String(game.opponentScore),'Illinois 41, Baylor 50 (05/06/07 TXT)');
  }else{
   Object.assign(game,{
    status:'final',result:'L',teamScore:41,opponentScore:50,
    periodScores:{Illinois:[21,20],Baylor:[23,27],overtime:false},
    halftime:{Illinois:21,Baylor:23,fieldGoalPct:{Illinois:47,Baylor:55},threePointers:{Illinois:'1/3',Baylor:'2/6'},rebounds:{Illinois:9,Baylor:10},turnovers:{Illinois:2,Baylor:2}},
    teamStats:{
      Baylor:{points:50,fieldGoals:'23/37',fieldGoalPct:62.2,threePointers:'2/9',threePointPct:22.2,freeThrows:'2/3',freeThrowPct:66.7,assists:14,turnovers:5,rebounds:20,offensiveRebounds:0,steals:3,blocks:2,pointsInPaint:32,benchPoints:2,fastBreakPoints:8},
      Illinois:{points:41,fieldGoals:'18/39',fieldGoalPct:46.2,threePointers:'3/9',threePointPct:33.3,freeThrows:'2/5',freeThrowPct:40,assists:12,turnovers:5,rebounds:15,offensiveRebounds:1,steals:4,blocks:0,pointsInPaint:22,benchPoints:2,fastBreakPoints:0}
    },
    illinoisBoxScore:[
      {name:'Robin Summers',pos:'PG',pts:4,reb:0,ast:4,stl:0,blk:0,to:2,fg:'2-2',three:'0-0',ft:'0-0',pf:0,min:18},
      {name:'SG #24',pos:'SG',pts:6,reb:1,ast:2,stl:0,blk:0,to:1,fg:'2-9',three:'2-3',ft:'0-0',pf:0,min:17},
      {name:'Mekel Defares',pos:'SF',pts:5,reb:1,ast:1,stl:0,blk:0,to:1,fg:'2-10',three:'1-5',ft:'0-0',pf:0,min:15},
      {name:'Vern Leadbetter',pos:'PF',pts:14,reb:2,ast:1,stl:1,blk:0,to:1,fg:'6-7',three:'0-0',ft:'2-3',pf:0,min:18},
      {name:'Shema Mattox',pos:'C',pts:10,reb:8,ast:1,stl:2,blk:0,to:0,fg:'5-7',three:'0-0',ft:'0-2',pf:1,min:18},
      {name:'Solomon Nelson',pts:2,reb:0,ast:0,stl:0,blk:0,to:0,fg:'1-1',three:'0-0',ft:'0-0',pf:0,min:2},
      {name:'Laramie Osimani',dnp:"Coach's decision"},
      {name:'C #54',pts:0,reb:2,ast:0,stl:1,blk:0,to:0,fg:'0-1',three:'0-0',ft:'0-0',pf:0,min:2},
      {name:'Parker Jefferies',pts:0,reb:0,ast:0,stl:0,blk:0,to:0,fg:'0-0',three:'0-0',ft:'0-0',pf:0,min:2},
      {name:'Ashley Eaton',pts:0,reb:1,ast:1,stl:0,blk:0,to:0,fg:'0-0',three:'0-0',ft:'0-0',pf:1,min:5},
      {name:'Cortez Simpson',dnp:"Coach's decision"}
    ],
    sources:[sourceRoot+'03-halftime-team-stats.txt',sourceRoot+'04-halftime-illinois-box-score.txt',sourceRoot+'05-final-score.txt',sourceRoot+'06-final-illinois-box-score.txt',sourceRoot+'07-final-team-stats.txt'],
    notes:'Baylor won 50–41, holding Illinois to 41 points; Baylor shot 62.2% (23/37), won the glass 20–15 and scored 32 in the paint. Leadbetter led Illinois with 14; Mattox had 10 and 8 rebounds. Baylor Coverdale 18 was reported separately by the user, not verified in the ten TXT sources.'
   });
  }
 }
 // Older game-night record(s) are legacy mirrors, not a second canonical game.
 x.illinoisGameNight=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 const mirrors=x.illinoisGameNight.filter(g=>String(g.opponent||'').trim().toLowerCase()==='baylor'&&g.status==='final');
 for(const old of mirrors){
  if(Number(old.illinoisScore)!==41||Number(old.opponentScore)!==50){
   flag('baylor-game-night-score-'+String(old.id||'unknown'),'User-entered Baylor score conflicts with 2011–12 screenshot box score',JSON.stringify(old),'Illinois 41, Baylor 50');
  }else if(old.notes&&game&&!game.legacyGameNightNotes?.includes(old.notes)){
   game.legacyGameNightNotes=Array.isArray(game.legacyGameNightNotes)?game.legacyGameNightNotes:[];
   game.legacyGameNightNotes.push(old.notes);
  }
 }
 // Preserve discrepant legacy entries in conflict log but present only the canonical game.
 x.illinoisGameNight=x.illinoisGameNight.filter(g=>!(String(g.opponent||'').trim().toLowerCase()==='baylor'&&g.status==='final'));
 // National canon: Clemson national championship and Georgia player Bron Cable's honors.
 const national=[
  {id:'illinois-national-2012-clemson-title',year:'2011–12',type:'NCAA Champion',title:'Clemson wins national championship',body:'Clemson finished 34–4, 13–3 ACC. Screenshot ratings: 94 OVR, 94 offense, 93 defense, 95 shooting, 87 rebounding.',team:'Clemson',record:'34–4',conferenceRecord:'13–3',source:sourceRoot+'08-ncaa-champions.txt'},
  {id:'illinois-national-2012-bron-cable-awards',year:'2011–12',type:'National Award',title:'Bron Cable earns National Player of the Year',body:'Georgia senior PF Bron Cable averaged 24.9 points, 7.9 rebounds, 0.2 assists, 1.1 steals and 1.8 blocks, and earned five listed honors.',person:'Bron Cable',source:sourceRoot+'09-national-player-of-the-year.txt'}
 ];
 for(const ev of national)if(!x.universeHistory.some(h=>h.id===ev.id))x.universeHistory.push(ev);
 x.historicalPlayers=Array.isArray(x.historicalPlayers)?x.historicalPlayers:[];
 const cableId='college-2012-bron-cable';
 const cable=x.historicalPlayers.find(p=>p.id===cableId||p.name==='Bron Cable');
 const awards=['Player of the Year','Big Man of the Year','First-Team All-American','Conference Player of the Year','First-Team All-Conference'];
 if(!cable)x.historicalPlayers.push({id:cableId,name:'Bron Cable',team:'Georgia',season:'2011–12',position:'PF',number:52,classYear:'SR',overall:83,height:'6\'9"',weight:227,hometown:'Jacksonville, FL',recruitStars:3,recruitOverallRank:142,recruitPositionRank:20,proBuzz:'Undrafted',seasonStats:{points:24.9,rebounds:7.9,assists:0.2,steals:1.1,blocks:1.8},awards:awards.map(name=>({season:'2011–12',name,description:'College Hoops 2K8 award screen'})),source:[sourceRoot+'09-national-player-of-the-year.txt',sourceRoot+'10-bron-cable-awards.txt']});
 else{
  cable.awards=Array.isArray(cable.awards)?cable.awards:[];
  for(const award of awards)if(!cable.awards.some(a=>a.season==='2011–12'&&a.name===award))cable.awards.push({season:'2011–12',name:award,description:'College Hoops 2K8 award screen'});
 }
 flag('bron-braun-request','User-provided name spelling differs from two source transcripts','Braun Cable (request)','Bron Cable (09 and 10 TXT); canon uses Bron');
 if(x.historicalPlayers.some(p=>p.name==='Braun Cable')){
  flag('bron-braun-name','Existing Braun Cable name conflicts with screenshot spelling','Braun Cable','Bron Cable in TXT 09 and 10');
 }
 // The legacy source archive is a frozen pre-NCAA snapshot and still says Baylor pending.
 flag('legacy-2012-checkpoint','Older Illinois Legacy narrative stops before NCAA opener','Baylor pending; Illinois 24–10','Baylor final 50–41; Illinois 24–11 in TXT 05–07');
 if(season&&season.losses!==11)flag('illinois-2012-season-total','2011–12 historical season record not reconciled',season.wins+'–'+season.losses,'24–11 after Baylor defeat');
 seedIllinois2012Offseason(x, append);
}

const illinoisOffseasonRecord = 'docs/illinois/2012-13/offseason-record.txt';
const illinoisAwardsRecord = 'docs/illinois/2011-12/awards.txt';
const illinoisRosterRatings = 'docs/illinois/2012-13/roster-ratings.txt';

const illinois2012SigningClass = [
 {"name":"Sylvester Curry","stars":4,"nationalRank":39,"notes":"Highest-ranked signee. B+ potential and 80 defensive rebounding on his first college card. Adds a wing behind Defares.","pos":"SF","overall":76,"hometown":"Buena Park, CA"},
 {"name":"Marquise Cambridge","stars":4,"nationalRank":46,"notes":"A- potential, 92 speed, 87 handling and 80 passing make him the class’s strongest developmental point guard.","pos":"PG","overall":73,"hometown":"Queens, NY"},
 {"name":"Jazz Modrovich","stars":4,"nationalRank":47,"notes":"B+ potential with 86 defense and 86 free throws. Adds guard depth and takes over jersey No. 24.","pos":"SG","overall":74,"hometown":"West Covina, CA"},
 {"name":"Franklin Haynes","stars":4,"nationalRank":58,"notes":"77 OVR, the highest opening rating among the five signees. His 85 three-point rating and 86 steals give him an immediate role at shooting guard.","pos":"SG","overall":77,"hometown":"St. Louis, MO"},
 {"name":"Dennis Carmichael","stars":3,"nationalRank":425,"notes":"Developmental 6-foot-10 forward with 74 standing dunk and 73 offensive rebounding. The lone frontcourt signee.","pos":"PF","overall":66,"hometown":"St. Petersburg, FL"}
];

function seedIllinois2012Offseason(x, append) {
 const departures = [
  {"name":"Robin Summers","number":"1","pos":"PG","year":"SR","overall":86,"status":"Drafted","bio":"5'11\", 175 lb, Boise, ID","stats":"7.6 PPG, 1.9 RPG, 3.6 APG, 1.0 SPG, 0.3 BPG. Career highs: 20 points and 10 assists.","draftSource":"Player Card Bio (21-07-58)"},
  {"name":"SG #24","number":"24","pos":"SG","year":"RS SR","overall":84,"status":"Drafted","bio":"6'3\", 200 lb, Los Angeles, CA","stats":"11.6 PPG, 3.7 RPG, 1.9 APG, 1.2 SPG, 0.0 BPG. Career highs: 29 points and 11 rebounds.","draftSource":"Player Card Bio (21-08-03)"},
  {"name":"Shema Mattox","number":"43","pos":"C","year":"SR","overall":89,"status":"Drafted","bio":"7'1\", 263 lb, Fresno, CA","stats":"16.9 PPG, 6.1 RPG and 1.4 APG on the final awards screen. Second-Team All-Big Ten and Big Ten title game Player of the Game.","draftSource":"Dynasty owner confirmation. Graduations screen (21-05-22) shows entry."},
  {"name":"Solomon Nelson","number":"50","pos":"C","year":"JR","overall":85,"status":"Drafted","bio":"7'3\", 282 lb, Orange, CA","stats":"8.6 PPG, 3.3 RPG, 0.3 APG, 0.3 SPG, 0.2 BPG. Career highs: 26 points and 12 rebounds. 2009–10 Freshman All-Conference.","draftSource":"Player Card Bio (21-09-05)"},
  {"name":"Laramie Osimani","number":"41","pos":"PF","year":"SO","overall":80,"status":"Transferred to Valparaiso","bio":"6′11″, 219 lb, Chicago, IL","stats":"2.6 PPG and 1.9 RPG in 2011–12.","destination":"Valparaiso"},
  {"name":"C #54","number":"54","pos":"C","year":"RS SR","overall":80,"status":"Graduated","bio":"7′1″, 244 lb, Joliet, IL"}
 ];
 for (const departure of departures) {
  const prior = x.illinois2012Departures.find(p => String(p.number) === departure.number);
  if (prior) Object.assign(prior, departure);
  else x.illinois2012Departures.push(departure);
  const id = 'illinois-2012-departure-player-' + departure.number;
  const person = x.historicalPlayers.find(p => p.name === departure.name);
  const profile = {id, name:departure.name, team:'Illinois', season:'2011–12', role:departure.pos + ' · No. ' + departure.number, position:departure.pos};
  if (!person) x.historicalPlayers.push(profile);
  const record = person || profile;
  record.overall = departure.overall;
  record.biography ||= departure.bio + '.';
  record.history ||= [];
  if (!record.history.some(h => h.id === id)) record.history.push({id, years:'2012', team:'Illinois', role:departure.status, notes:[departure.stats,departure.draftSource].filter(Boolean).join(' ')});
  if (departure.destination) record.transferTo = departure.destination;
 }
 const mattox = x.historicalPlayers.find(p => p.id === 'illinois-shema-mattox');
 mattox.awards ||= [];
 if (!mattox.awards.some(a => a.name === 'Second-Team All-Big Ten' && a.season === '2011–12')) {
  mattox.awards.push({season:'2011–12', name:'Second-Team All-Big Ten', description:'16.9 PPG, 6.1 RPG and 1.4 APG on the final awards screen.'});
 }
 const departureEvent = x.universeHistory.find(h => h.id === 'illinois-history-2012-departures');
 Object.assign(departureEvent,{
  title:'Four Illini drafted; Osimani transfers to Valparaiso',
  body:'Robin Summers (86 OVR), SG #24 (84), Shema Mattox (89) and Solomon Nelson (85) were drafted. NBA destinations and picks are unrecorded. Laramie Osimani transferred to Valparaiso and C #54 graduated.',
  source:illinoisOffseasonRecord
 });
 append('universeHistory',[
  {"id":"illinois-2012-awards-1","year":"2011–12","type":"Award","title":"Travis Wooden, Valparaiso · Mid-Major Player of the Year","body":"Sr. C, 83 OVR. 22.4 PPG, 8.9 RPG, 0.8 APG, 1.6 SPG, 2.4 BPG."},
  {"id":"illinois-2012-awards-2","year":"2011–12","type":"Award","title":"Coach CLEM, Clemson · National Coach of the Year","body":"465–288 career, one championship, A− overall."},
  {"id":"illinois-2012-awards-3","year":"2011–12","type":"Award","title":"Ronald Fanning, North Carolina · National Defensive Player of the Year","body":"Jr. PF, 85 OVR. 14.4 PPG, 8.4 RPG, 1.3 APG, 0.8 SPG, 2.1 BPG."},
  {"id":"illinois-2012-awards-4","year":"2011–12","type":"Award","title":"Martynas Guzman, Cincinnati · National Freshman of the Year","body":"Fr. SG, 79 OVR. 11.9 PPG, 3.7 RPG, 2.8 APG, 1.3 SPG, 0.3 BPG."},
  {"id":"illinois-2012-awards-5","year":"2011–12","type":"Award","title":"Indiana · Big Ten regular-season champion","body":"29–5 overall, 15–3 Big Ten. Illinois won the separate conference tournament."},
  {"id":"illinois-2012-awards-6","year":"2011–12","type":"Award","title":"Coach IND, Indiana · Big Ten Coach of the Year","body":"517–278 career and A overall."},
  {"id":"illinois-2012-awards-7","year":"2011–12","type":"Award","title":"Deron Bruce, Penn State · Big Ten Player of the Year","body":"Sr. C, 85 OVR. 23.6 PPG, 8.6 RPG, 0.4 APG, 1.2 SPG, 2.0 BPG."},
  {"id":"illinois-2012-awards-8","year":"2011–12","type":"Award","title":"Mark Drake, Wisconsin · Big Ten Freshman of the Year","body":"Fr. PG, 79 OVR. 9.1 PPG, 2.7 RPG, 4.1 APG, 1.4 SPG, 0.0 BPG."},
  {id:'illinois-2012-all-conference-teams',year:'2011–12',type:'Awards',title:'Mattox makes second-team All-Big Ten',body:'Shema Mattox closed his Illinois career at 16.9 PPG, 6.1 RPG and 1.4 APG on the second-team award screen. The awards file includes the national and Big Ten honor teams.',source:illinoisAwardsRecord},
  {id:'illinois-2012-coaching-carousel',year:'2012',type:'Coaching',title:'Weber stays at Illinois as Duke changes coaches',body:'Bruce Weber declined South Carolina’s two-year offer and retained Coach ARST and Maury Francis. Duke’s coach retired and Old Dominion’s head coach replaced him. South Carolina hired the former Kent State head coach.',source:illinoisOffseasonRecord},
  {id:'illinois-2012-recruiting',year:'2012',type:'Recruiting',title:'Illinois signs the No. 15 recruiting class',body:'Sylvester Curry, Marquise Cambridge, Jazz Modrovich and Franklin Haynes signed as four-stars. Dennis Carmichael, a three-star forward, rounded out the group.',source:illinoisOffseasonRecord}
 ]);
 const weber = x.coachIndex.find(c => c.id === 'illinois-bruce-weber');
 weber.offense = 'Motion';
 weber.defense = 'Man-to-man primary; 2–3 secondary';
 weber.notes = '2012 coach card: 307–153 career, age 56, 9 years displayed, A overall, 0 national titles. Declined South Carolina and stayed at Illinois. Recruiting priorities: shooting and athleticism.';
 const finalSeason = weber.history?.find(s => s.years === '2011–12');
 if (finalSeason) finalSeason.postseason = 'Big Ten Tournament champions; NCAA first round';
 const staff = [
  {id:'illinois-coach-arst', name:'Coach ARST', role:'Assistant Coach', team:'Illinois', season:'2012–13', notes:'Retained in 2012. B overall, B teaching, B+ charisma. Coach card: 212–222 career, age 53.'},
  {id:'illinois-maury-francis', name:'Maury Francis', role:'Assistant Coach', team:'Illinois', season:'2012–13', notes:'Retained in 2012. B overall, A− charisma, A+ discipline. Coach card: age 42.'}
 ];
 x.staff = Array.isArray(x.staff) ? x.staff : [];
 for (const coach of staff) {
  const match = x.staff.find(c => c.id === coach.id || (coach.id === 'illinois-coach-arst' ? /\barst\b/i.test(c.name) : /\bfrancis\b/i.test(c.name)));
  if (match) Object.assign(match, {season:coach.season, notes:match.notes || coach.notes});
  else x.staff.push(coach);
 }
 append('mediaPersonalities',[{id:'illinois-firebird-desk',name:'Firebird News Desk',role:'College basketball',publicationId:'firebird'}]);
 append('scribeArticles',[
  {id:'illinois-firebird-2012-carousel',date:'2012',category:'Coaching',publicationId:'firebird',writerId:'illinois-firebird-desk',headline:'Weber stays put as Duke turns the page',deck:'Illinois keeps its coaching staff after South Carolina’s offer. Duke hires Old Dominion’s head coach following a retirement.',body:'Bruce Weber turned down a two-year offer from South Carolina after a 24–11 season and a Big Ten Tournament title. He returns to Champaign with Coach ARST and Maury Francis still on staff.\n\nThe vacancy chain stretched beyond the SEC. South Carolina hired the Kent State head coach, while Duke replaced its retiring coach with Old Dominion’s head coach. Old Dominion turned to Chattanooga for its replacement.'},
  {id:'illinois-firebird-2012-class',date:'2012',category:'Recruiting',publicationId:'firebird',writerId:'illinois-firebird-desk',headline:'No. 15 class gives Illinois a new backcourt',deck:'Four four-stars arrive as Illinois replaces four NBA draftees and two other departures.',body:'Franklin Haynes opens at 77 overall with an 85 three-point rating. Sylvester Curry is the highest-ranked signee, and Marquise Cambridge brings A− potential at point guard. Jazz Modrovich adds perimeter defense.\n\nThe five-man group leans toward the perimeter. Dennis Carmichael is its only true frontcourt addition. With Shema Mattox and Solomon Nelson drafted and Laramie Osimani headed to Valparaiso, the Illini will need to find reliable minutes inside.'}
 ]);
}

function illinoisSigningClassCard() {
 const signings = illinois2012SigningClass.map(p => '<li><strong>' + esc(p.name) + '</strong> · ' + esc(p.pos) + ' · ' + p.stars + ' stars · No. ' + p.nationalRank + ' nationally · ' + p.overall + ' OVR<p>' + esc(p.notes) + '</p></li>').join('');
 return '<section class="card"><h3>2012 signing class · No. 15 nationally</h3><ul>' + signings + '</ul><p><a href="' + illinoisOffseasonRecord + '">Full offseason record (TXT)</a></p></section>';
}
