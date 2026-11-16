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
 // If already manually recorded, do not insert a duplicate game-night entry.
 x.illinoisGameNight=Array.isArray(x.illinoisGameNight)?x.illinoisGameNight:[];
 if(!x.illinoisGameNight.some(g=>String(g.opponent||'').toLowerCase()==='baylor'&&g.status==='final')){
  x.illinoisGameNight.push({id:'illinois-game-2012-baylor',opponent:'Baylor',date:'2012-03-16',stage:'NCAA Tournament · East Regional · Round of 64',illinoisScore:41,opponentScore:50,status:'final',notes:'Baylor’s Coverdale scored 18. Illinois finished 24–11 after winning the Big Ten Tournament.'});
 }

}
