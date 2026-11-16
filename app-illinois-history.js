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
 if(x.historicalPlayers.some(p=>p.name==='Braun Cable')){
  flag('bron-braun-name','Existing Braun Cable name conflicts with screenshot spelling','Braun Cable','Bron Cable in TXT 09 and 10');
 }
 // The legacy source archive is a frozen pre-NCAA snapshot and still says Baylor pending.
 flag('legacy-2012-checkpoint','Older Illinois Legacy narrative stops before NCAA opener','Baylor pending; Illinois 24–10','Baylor final 50–41; Illinois 24–11 in TXT 05–07');
 if(season&&season.losses!==11)flag('illinois-2012-season-total','2011–12 historical season record not reconciled',season.wins+'–'+season.losses,'24–11 after Baylor defeat');
}
