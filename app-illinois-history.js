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
}
