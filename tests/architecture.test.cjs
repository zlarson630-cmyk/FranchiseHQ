const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const {test}=require('node:test');
const read=p=>fs.readFileSync(p,'utf8');
test('all browser scripts parse',()=>{for(const p of ['app-core.js','app-media.js','app-news.js','app-seeds.js','app-illinois-history.js','app-afbl.js','app-afbl-trade-data.js','app-afbl-trade.js','app-boot.js','illinois-legacy.js','franchise-cloud.js','franchise-sharing.js'])assert.doesNotThrow(()=>new vm.Script(read(p),{filename:p}));for(const m of read('reader.html').matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))assert.doesNotThrow(()=>new vm.Script(m[1]));});
test('application script dependencies load in order',()=>{const h=read('index.html');const names=['app-core.js','app-media.js','app-news.js','app-seeds.js','app-illinois-history.js','app-afbl.js','app-afbl-trade-data.js','app-afbl-trade.js','app-boot.js','illinois-legacy.js','franchise-cloud.js','franchise-sharing.js'];let pos=-1;for(const n of names){const at=h.indexOf('src="'+n);assert.ok(at>pos,n+' missing or out of order');pos=at;}assert.ok(h.includes('assets/franchise-hq.css'));});
test('all owner navigation handlers have implementations',()=>{const s=read('app-core.js')+read('app-media.js');for(const name of ['render','changeTab','openPlayer','openCoach','openScribeStory','writerProfile','universeTimeline','firebird','publicationPage','mediaStoryList'])assert.match(s,new RegExp('function\\s+'+name+'\\s*\\('));assert.doesNotMatch(s,/\bq\(owner\.id\)|\bq\(x\.id\)/);});
test('reader publication contract and private-field exclusions',()=>{const s=read('franchise-sharing.js');const fn=s.slice(s.indexOf('function snapshot('),s.indexOf('function readerUrl('));assert.match(fn,/publications/);assert.match(fn,/scribeArticles/);for(const forbidden of ['"notes"','"recruiting"','"nil"','"transferRisk"','"warRoom"','"password"'])assert.ok(!fn.includes(forbidden),'private field in snapshot: '+forbidden);});
test('reader is separate from owner code',()=>{const h=read('reader.html');assert.doesNotMatch(h,/src="app-core\.js"|src="franchise-cloud\.js"/);assert.match(h,/\.eq\("published",true\)/);});
test('IDSN combines Firebird entries while franchise feeds and private drafts stay scoped',()=>{
  const washington={id:'washington',name:'Washington Huskies',firebirdPosts:[
    {handle:'@Huskies',text:'Washington reaction',date:'2029',storyId:'draft'},
    {text:'Private post',status:'draft'}
  ],scribeArticles:[{id:'draft',headline:'Private draft',status:'draft'}]};
  const nevada={id:'nevada',name:'Nevada Jacks',nationalHeadlines:[{headline:'Nevada headline',date:'2108'}],
    scribeArticles:[{id:'walk-off',headline:'Nevada walk-off',date:'2108',addedAt:'2026-11-17'}]};
  const context=vm.createContext({data:[washington,nevada],esc:s=>String(s)});
  vm.runInContext(read('app-media.js')+read('app-news.js'),context);
  const combined=vm.runInContext('interdimensionalFirebird(data)',context);
  assert.match(combined,/Washington reaction/);
  assert.match(combined,/Nevada headline/);
  assert.match(combined,/openScribeStory\("nevada","walk-off","IDSN Firebird"\)/);
  assert.doesNotMatch(combined,/Private draft|Private post/);
  assert.ok(combined.indexOf('Nevada walk-off')<combined.indexOf('Nevada headline'));
  assert.doesNotMatch(vm.runInContext('firebird(data[0])',context),/Nevada/);
  const filtered=vm.runInContext('newsFranchise="nevada"; interdimensionalNews(true)',context);
  assert.match(filtered,/Nevada headline/);
  assert.doesNotMatch(filtered,/Washington reaction/);
});

test('Illinois canonical history is idempotent and preserves pending Baylor',()=>{const source=read('app-illinois-history.js');const sandbox={data:[{id:'illinois-basketball-2010',players:[{name:'Existing player'}],historicalPlayers:[]}],localStorage:{}};vm.createContext(sandbox);vm.runInContext(source+';seedIllinoisHistory();seedIllinoisHistory();',sandbox);const x=sandbox.data[0];assert.equal(x.historicalSeasons.length,5);assert.equal(x.historicalGames.length,4);assert.equal(x.historicalPlayers.length,4);assert.equal(x.coachIndex.length,1);assert.equal(x.players.length,1);assert.equal(x.historicalSeasons.find(z=>z.id==='illinois-2011-12').regularSeason.wins,21);const baylor=x.historicalGames.find(z=>z.opponent==='Baylor');assert.equal(baylor.status,'scheduled');assert.equal(baylor.result,null);assert.equal(baylor.teamScore,null);});

test('Kentucky franchise seeds once without invented stats',()=>{const context={data:[]};vm.createContext(context);vm.runInContext(read('app-afbl.js')+';seedKentuckyLions();seedKentuckyLions();',context);assert.equal(context.data.length,1);const x=context.data[0];assert.equal(x.id,'afbl-kentucky-lions');assert.equal(x.afbl.record.wins,null);assert.equal(x.afbl.record.losses,null);assert.equal(x.afbl.nextGame.opponent,'');assert.equal(x.players.length,0);assert.match(x.sport,/AFBL/);});

test('Washington outlook keeps position rows and year columns with mobile single-year rendering',()=>{const core=read('app-core.js');const css=read('assets/franchise-hq.css');assert.match(core,/const years=mobile\?\[outlookMobileYear\]/);assert.match(core,/for\(const \[slot,pos\] of outlookSlots\)/);assert.match(core,/for\(const yr of years\)/);assert.match(core,/candidateCache=new Map/);assert.match(core,/catch\(error\)\{console\.error\('Franchise HQ view error'/);assert.match(css,/--outlook-years/);});

test('Washington five-year planner remains a simultaneous comparison on mobile',()=>{const core=read('app-core.js'),css=read('assets/franchise-hq.css');assert.doesNotMatch(core,/outlookMobileYear/);assert.match(core,/const years=Array\.from\(\{length:5\}/);assert.match(css,/overflow-x:auto/);assert.match(css,/\.outlook-table \.outlook-year\{position:sticky;left:0/);assert.match(css,/\.outlook-table \.outlook-head\{position:sticky;top:0/);});

test('startup restores navigation without unconditional full-data save',()=>{const core=read('app-core.js'),boot=read('app-boot.js');assert.match(core,/franchise-hq-navigation-v1/);assert.match(core,/function rememberNavigation\(/);assert.match(core,/function changeTab\(t\)\{tab=t;rememberNavigation\(\);render\(\)\}/);assert.match(boot,/if\(JSON\.stringify\(data\)!==bootBefore\)save\(\)/);assert.doesNotMatch(boot,/seedBjornsonMedia\(\);save\(\);render\(\)/);});

test('Trade Lab applies overall draft slots, window timing and independent downside odds', () => {
  const context = vm.createContext({});
  vm.runInContext(read('app-afbl-trade-data.js') + read('app-afbl-trade.js'), context);
  const evaluate = expression => vm.runInContext(expression, context);
  const stats = evaluate(`(() => {
    const pick = (first, last, wait = '1') => afblTradeProject({
      ...afblTradePick(), first, last, draftWait: wait
    }, 0.1);
    const player = afblTradeProject(afblTradePlayer(), 0.1);
    const early = pick('33', '40');
    const late = pick('41', '48');
    const edge = pick('40', '41');
    const delayed = pick('33', '40', '2');
    const odds = afblTradeRisk([player], [early]);
    return {
      early: afblTradeMean(early.outcomes, 'value'),
      late: afblTradeMean(late.outcomes, 'value'),
      edge: afblTradeMean(edge.outcomes, 'value'),
      delayed: afblTradeMean(delayed.outcomes, 'value'),
      pickNear: afblTradeMean(early.outcomes, 'near'),
      playerNear: afblTradeMean(player.outcomes, 'near'),
      ahead: odds.ahead,
      even: odds.even,
      invalid: pick('48', '33').error,
      invalidWeights: afblTradeProject({
        ...afblTradePlayer(), scenarios: [{chance:'80', war:'1'}]
      }, 0.1).error
    };
  })()`);
  assert.ok(stats.early > stats.late);
  assert.ok(Math.abs(stats.edge - (stats.early + stats.late) / 2) < 1e-9);
  assert.ok(Math.abs(stats.delayed - stats.early / 1.1) < 1e-9);
  assert.equal(stats.pickNear, 0);
  assert.equal(stats.playerNear, 3);
  assert.ok(stats.ahead > 0 && stats.ahead + stats.even < 1);
  assert.match(stats.invalid, /33 to 80/);
  assert.match(stats.invalidWeights, /100%/);
});
