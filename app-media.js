// Journalism, publications, Firebird, timeline and linked profiles.
function scribeArticles(x){return Array.isArray(x.scribeArticles)?x.scribeArticles:[]}

function mediaPublications(x){if(!Array.isArray(x.publications))x.publications=[];for(const p of [{id:'firebird',name:'Firebird',voice:'Fast-moving, personality-driven coverage of the franchise universe.',brand:'Digital-first sports feed',description:'News, reactions and ongoing storylines.'},{id:'saturday-scribe',name:'Saturday Scribe',voice:'Thoughtful, narrative-driven long-form sports journalism.',brand:'Classic sports newspaper',description:'Features, game stories and historical reporting.'}])if(!x.publications.some(z=>z.id===p.id))x.publications.push({...p});return x.publications}
function mediaWriters(x){if(!Array.isArray(x.mediaPersonalities))x.mediaPersonalities=[];return x.mediaPersonalities}
function mediaStoryList(x,pub){return scribeArticles(x).filter(a=>isPublishedStory(a)&&(!pub||(a.publicationId||'saturday-scribe')===pub)).slice().sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')))}
function mediaWriterName(x,id){return mediaWriters(x).find(w=>w.id===id)?.name||'Staff'}

function storyArt(a,large){const photo=storyLeadPhoto(a);if(photo)return photo;const label=esc((a.category||'COLLEGE FOOTBALL').toUpperCase());const color=(a.category==='Coaching'?'#243b59':a.category==='Recruiting'?'#6a342d':'#304b45');return '<div style="background:linear-gradient(135deg,'+color+',#151d2e);color:#fff;min-height:'+(large?'250':'140')+'px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:18px;text-align:center"><div style="font-family:Georgia,serif;font-weight:900;letter-spacing:.11em;font-size:'+(large?'30':'20')+'px">SATURDAY<br>SCRIBE</div><small style="letter-spacing:.15em;opacity:.8">'+label+'</small></div>'}
function storyClick(franchiseId, id, back = 'Saturday Scribe') {
  return 'onclick="' + esc('openScribeStory(' + [franchiseId, id, back].map(value => JSON.stringify(value)).join(',') + ')') + '"';
}

function writerProfile(franchiseId,writerId,back){const owner=data.find(z=>z.id===franchiseId);if(!owner)return;const w=mediaWriters(owner).find(z=>z.id===writerId);if(!w)return;const stories=mediaStoryList(owner).filter(a=>a.writerId===writerId),pubs=mediaPublications(owner),pub=pubs.find(p=>p.id===w.publicationId),returnTab=['Home','IDSN','IDSN Firebird','Dashboard','Franchise News','Firebird','Saturday Scribe','Publications','Media Personalities'].includes(back)?back:'Media Personalities';document.getElementById('view').innerHTML='<button onclick="changeTab(\''+returnTab+'\')">← Back to '+returnTab+'</button><section class="card" style="margin-top:16px"><small class="muted">WRITER PROFILE</small><h1 style="font-family:Georgia,serif">'+esc(w.name)+'</h1><p>'+esc(w.role||'Journalist')+'</p><p>'+esc(w.bio||'')+'</p><p><strong>Editorial voice:</strong> '+esc(w.voice||'Not recorded')+'</p><p><strong>Publication:</strong> '+esc(pub?.name||'Unassigned')+'</p></section>'+(Array.isArray(w.career)&&w.career.length?'<h2>Career Timeline</h2><div class="grid">'+w.career.map(c=>'<div class="card"><strong>'+esc(c.year||'')+'</strong><p>'+esc(c.publication||'')+' · '+esc(c.role||'')+'</p></div>').join('')+'</div>':'')+'<h2>More from '+esc(w.name)+'</h2>'+(stories.length?'<div class="grid">'+stories.map(a=>'<article class="card" style="cursor:pointer" '+storyClick(owner.id,a.id,returnTab)+'><small class="muted">'+esc(a.date||'')+' · '+esc(a.category||'News')+'</small><h3>'+esc(a.headline||'')+'</h3><p>'+esc(a.deck||'')+'</p><small>Read article →</small></article>').join('')+'</div>':'<p class="muted">No published articles in this archive yet.</p>')}
function newsroomFilters(x,pub){const stories=mediaStoryList(x,pub),years=[...new Set(stories.map(a=>String(a.date||'').slice(0,4)).filter(Boolean))].sort().reverse(),categories=[...new Set(stories.map(a=>a.category||'News'))].sort(),writers=[...new Set(stories.map(a=>a.writerId).filter(Boolean))];return '<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:end;margin:16px 0"><label>Year<select id="newsYear" onchange="filterNewsroom()"><option value="">All years</option>'+years.map(v=>'<option>'+esc(v)+'</option>').join('')+'</select></label><label>Category<select id="newsCategory" onchange="filterNewsroom()"><option value="">All categories</option>'+categories.map(v=>'<option>'+esc(v)+'</option>').join('')+'</select></label><label>Writer<select id="newsWriter" onchange="filterNewsroom()"><option value="">All writers</option>'+writers.map(v=>'<option value="'+esc(v)+'">'+esc(mediaWriterName(x,v))+'</option>').join('')+'</select></label></div>'}
function filterNewsroom(){const year=document.getElementById('newsYear')?.value||'',cat=document.getElementById('newsCategory')?.value||'',writer=document.getElementById('newsWriter')?.value||'';document.querySelectorAll('[data-news-story]').forEach(el=>{el.style.display=(!year||el.dataset.year===year)&&(!cat||el.dataset.category===cat)&&(!writer||el.dataset.writer===writer)?'':'none'})}

function universePeople(x){return [...(x.players||[]).map((p,i)=>({kind:'player',name:p.name,index:i,record:p})),...(x.historicalPlayers||[]).map((p,i)=>({kind:'historical',name:p.name,index:i,record:p})),...(x.staff||[]).map((p,i)=>({kind:'coach',name:p.name,index:i,record:p})),...(x.coachIndex||[]).map((p,i)=>({kind:'archivedCoach',name:p.name,index:i,record:p}))]}
function personAction(person){return person.kind==='player'?'openPlayer('+person.index+')':person.kind==='historical'?'openHistoricalPlayer('+person.index+')':'openCoach('+person.index+','+(person.kind==='archivedCoach')+')'}
function personCards(x,people){const seen=new Set();return '<div style="display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px">'+people.filter(p=>{const key=String(p.name||'').trim().toLowerCase();if(seen.has(key))return false;seen.add(key);return true}).map(p=>'<button type="button" title="View '+esc(p.name)+' profile" style="display:inline-flex;align-items:center;max-width:100%;width:auto;padding:7px 12px;border:1px solid var(--border,#d9dce5);border-radius:999px;background:var(--surface,#fff);color:var(--primary,#2859a6);font-size:.9rem;font-weight:600;line-height:1.25;cursor:pointer" onclick="'+personAction(p)+'">'+esc(p.name)+'</button>').join('')+'</div>'}
function personConnections(x,person){const others=universePeople(x).filter(p=>p.name!==person.name),personText=[person.name,person.record.notes||'',person.record.biography||'',JSON.stringify(person.record.history||[]),person.record.recruiting?.coach||''].join(' ').toLowerCase();const linked=others.filter(p=>{const n=p.name.toLowerCase();return n.length>=5&&personText.includes(n)||[p.record.notes||'',p.record.biography||'',JSON.stringify(p.record.history||[]),p.record.recruiting?.coach||''].join(' ').toLowerCase().includes(person.name.toLowerCase())}).slice(0,12);return profileSection('Connections',linked.length?personCards(x,linked):'<p class="muted">No documented personal connections yet.</p>')}
function personNews(x,person){const name=person.name.toLowerCase(),last=name.split(' ').pop().replace(/[^a-z]/g,'');const stories=mediaStoryList(x).filter(a=>{const t=[a.headline,a.deck,a.body].join(' ').toLowerCase();return t.includes(name)}).slice(0,12);return profileSection('News & coverage',stories.length?'<div class="grid">'+stories.map(a=>'<button class="card" style="text-align:left;cursor:pointer" onclick="openScribeStory('+JSON.stringify(x.id).replace(/"/g,'&quot;')+','+JSON.stringify(a.id).replace(/"/g,'&quot;')+',\'Universe Timeline\')"><small class="muted">'+esc(a.date||'')+' · '+esc(a.category||'Story')+'</small><h3>'+esc(a.headline||'')+'</h3><small>Read article →</small></button>').join('')+'</div>':'<p class="muted">No articles mentioning this person yet.</p>')}
function eventPeople(x,e){const t=[e.title,e.body].join(' ').toLowerCase();return universePeople(x).filter(p=>{const n=p.name.toLowerCase(),last=n.split(' ').pop().replace(/[^a-z]/g,'');return t.includes(n)}).slice(0,10)}

function universeTimeline(x){const events=(x.universeHistory||[]).slice().sort((a,b)=>String(b.year||'').localeCompare(String(a.year||'')));const years=[...new Set(events.map(e=>String(e.year||'Unknown')))];return '<div class="row"><h2 class="wide">Universe Timeline</h2><button onclick="changeTab(\'Archive\')">Full Archive</button></div><p class="muted">Established events from this franchise universe, with related historical coverage.</p>'+(events.length?years.map(y=>'<section style="margin:22px 0"><h2 style="font-family:Georgia,serif;border-bottom:2px solid var(--primary);padding-bottom:8px">'+esc(y)+'</h2><div style="display:grid;gap:12px">'+events.filter(e=>String(e.year||'Unknown')===y).map(e=>{const related=mediaStoryList(x).filter(a=>{const words=(e.title+' '+e.body).toLowerCase();const headline=(a.headline||'').toLowerCase();return ['eastern michigan','washington','oregon','creighton','bjornson','byu','ohio state'].some(t=>words.includes(t)&&headline.includes(t))}).slice(0,3);return '<article class="card"><small class="muted">'+esc(e.type||'Historical event')+'</small><h3>'+esc(e.title||'')+'</h3><p>'+esc(e.body||'')+'</p>'+(eventPeople(x,e).length?'<h4>People in this story</h4>'+personCards(x,eventPeople(x,e)):'')+(related.length?'<strong>Related coverage</strong><div style="display:grid;gap:8px;margin-top:8px">'+related.map(a=>'<button style="text-align:left" onclick="openScribeStory('+JSON.stringify(x.id).replace(/\"/g,'&quot;')+','+JSON.stringify(a.id).replace(/\"/g,'&quot;')+',\'Universe Timeline\')">'+esc(a.headline||'')+' →</button>').join('')+'</div>':'')+'</article>'}).join('')+'</div></section>').join(''):'<div class="card">No historical events recorded for this franchise yet.</div>')}

function mediaStoryCards(x,pub){const stories=mediaStoryList(x,pub);return stories.length?newsroomFilters(x,pub)+'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">'+stories.map(a=>'<article data-news-story data-year="'+esc(String(a.date||'').slice(0,4))+'" data-category="'+esc(a.category||'News')+'" data-writer="'+esc(a.writerId||'')+'" class="card" style="padding:0;overflow:hidden;cursor:pointer" '+storyClick(x.id,a.id,'Publications')+'>'+storyArt(a,false)+'<div style="padding:16px"><small class="muted">'+esc([storyPublication(x,a),a.date,a.category].filter(Boolean).join(' · '))+'</small><h3>'+esc(a.headline||'Untitled')+'</h3><p>'+esc(a.deck||'')+'</p><small class="muted">By '+esc(mediaWriterName(x,a.writerId))+'</small></div></article>').join('')+'</div>':'<div class="card"><p>No stories published yet.</p></div>'}
function publicationPage(x,id){const p=mediaPublications(x).find(z=>z.id===id);if(!p)return publications(x);return '<div class="card" style="border-top:6px solid var(--primary)"><small class="muted">'+esc(p.brand||'Franchise HQ media')+'</small><h1 style="font-family:Georgia,serif;font-size:clamp(30px,6vw,52px);margin:8px 0">'+esc(p.name)+'</h1><p>'+esc(p.description||'')+'</p><p class="muted">Editorial voice: '+esc(p.voice||'Not yet defined')+'</p></div><div class="row"><h2 class="wide">Latest Stories</h2><button class="primary" onclick="scribeEditById(null,'+JSON.stringify(id).replace(/"/g,'&quot;')+')">+ Write a story</button></div>'+mediaStoryCards(x,id)}
function saturdayScribe(x){const stories=mediaStoryList(x,'saturday-scribe');const lead=stories[0],rest=stories.slice(1);return '<header style="padding:24px 0;border-bottom:4px solid #1e293b;text-align:center"><small style="letter-spacing:.2em">THE HOME OF COLLEGE FOOTBALL</small><h1 style="font-family:Georgia,serif;font-size:clamp(35px,8vw,64px);letter-spacing:-.05em;margin:8px 0">SATURDAY SCRIBE</h1><small>NEWS · ANALYSIS · RECRUITING · THE COACHING CAROUSEL</small></header><div class="row" style="margin:20px 0"><h2 class="wide">Top Stories</h2><button class="primary" onclick="scribeEditById(null,\'saturday-scribe\')">+ Write a story</button></div>'+(lead?'<article class="card" style="padding:0;overflow:hidden;cursor:pointer" '+storyClick(x.id,lead.id)+'>'+storyArt(lead,true)+'<div style="padding:20px"><small class="muted">TOP STORY · '+esc(lead.category||'Feature')+' · '+esc(lead.date||'')+'</small><h2 style="font-family:Georgia,serif;font-size:clamp(25px,5vw,38px);line-height:1.14;margin:12px 0">'+esc(lead.headline)+'</h2><p>'+esc(lead.deck||'')+'</p><small class="muted">By '+esc(mediaWriterName(x,lead.writerId))+' · Read story →</small></div></article>':'<div class="card">No stories yet. Publish the first Saturday Scribe feature.</div>')+(rest.length?'<h2 style="margin-top:26px">More Headlines</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">'+rest.map(a=>'<article class="card" style="padding:0;overflow:hidden;cursor:pointer" '+storyClick(x.id,a.id)+'>'+storyArt(a,false)+'<div style="padding:16px"><small class="muted">'+esc(a.category||'News')+' · '+esc(a.date||'')+'</small><h3>'+esc(a.headline)+'</h3><p>'+esc(a.deck||'')+'</p><small>Read story →</small></div></article>').join('')+'</div>':'')}
function openScribeStory(franchiseId,storyId,back){const owner=data.find(z=>z.id===franchiseId),a=owner&&scribeArticles(owner).find(z=>z.id===storyId);if(!a||!isPublishedStory(a))return;const writer=mediaWriters(owner).find(w=>w.id===a.writerId),related=mediaStoryList(owner).filter(z=>z.id!==a.id);const byWriter=related.filter(z=>z.writerId===a.writerId);const recommendations=[...byWriter,...related.filter(z=>z.writerId!==a.writerId)].slice(0,4);const returnTab=['Home','IDSN','IDSN Firebird','Dashboard','Franchise News','Publications','Firebird','Saturday Scribe','Media Personalities','Universe Timeline'].includes(back)?back:'Saturday Scribe';document.getElementById('view').innerHTML='<div class="row"><button onclick="changeTab(\''+returnTab+'\')">← Back to '+returnTab+'</button></div><article style="max-width:850px;margin:auto"><small class="muted">'+esc([owner.name,storyPublication(owner,a),a.date,a.category].filter(Boolean).join(' · '))+'</small><h1 style="font-family:Georgia,serif;font-size:clamp(30px,6vw,48px);line-height:1.12">'+esc(a.headline||'')+'</h1><p style="font-size:1.2em">'+esc(a.deck||'')+'</p><p class="muted">By <strong>'+esc(mediaWriterName(owner,a.writerId))+'</strong></p>'+(f().id===owner.id?'<button onclick="scribeEditById('+esc(JSON.stringify(a.id))+')">Edit story</button>':'')+(storyPhotos(a).length?'':storyArt(a,true))+'<div class="card" style="margin-top:18px"><p style="white-space:pre-wrap;line-height:1.85;font-size:1.08em">'+esc(a.body||'')+'</p>'+storySource(a)+'</div>'+storyGallery(a)+(writer?'<section class="card" style="margin-top:20px;cursor:pointer" onclick="writerProfile('+JSON.stringify(owner.id).replace(/\"/g,'&quot;')+','+JSON.stringify(writer.id).replace(/\"/g,'&quot;')+','+JSON.stringify(returnTab).replace(/\"/g,'&quot;')+')"><small class="muted">ABOUT THE WRITER · VIEW PROFILE →</small><h3>'+esc(writer.name)+'</h3><p>'+esc(writer.role||'Journalist')+'</p><p>'+esc(writer.bio||'')+'</p><small>'+byWriter.length+' more stories by this writer</small></section>':'')+'<h2 style="margin-top:28px">Related Reading</h2>'+(recommendations.length?'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px">'+recommendations.map(z=>'<article class="card" style="cursor:pointer;padding:0;overflow:hidden" '+storyClick(owner.id,z.id,returnTab)+'>'+storyArt(z,false)+'<div style="padding:14px"><small class="muted">'+esc(z.category||'News')+'</small><h3>'+esc(z.headline||'')+'</h3><small>By '+esc(mediaWriterName(owner,z.writerId))+'</small></div></article>').join('')+'</div>':'<p class="muted">More stories will appear here as this publication grows.</p>')+'</article>'}
function firebirdEntries(franchise) {
  return [
    ...mediaStoryList(franchise).map(item => ({ kind: 'article', franchise, item })),
    ...(franchise.nationalHeadlines || []).filter(isPublishedStory).map(item => ({ kind: 'headline', franchise, item })),
    ...(franchise.firebirdPosts || []).filter(isPublishedStory).map(item => ({ kind: 'post', franchise, item }))
  ];
}

function firebirdCards(entries, back) {
  if (!entries.length) return '<p class="muted">No Firebird entries yet.</p>';
  return '<div class="firebird-feed">' + entries.map(({ franchise, item, kind }) => {
    let byline = 'Firebird News Desk';
    let text = [item.headline, item.deck].filter(Boolean).join(' — ');
    let story;
    if (kind === 'article') {
      byline = mediaWriterName(franchise, item.writerId);
      text = (item.deck || item.headline || '').slice(0, 260);
      story = item;
    } else if (kind === 'post') {
      byline = item.handle || item.author || 'Fan';
      text = (item.text || '').slice(0, 280);
      if (item.storyId || item.writerId) {
        story = scribeArticles(franchise).find(article => isPublishedStory(article) &&
          (item.storyId ? article.id === item.storyId :
            article.id === 'scribe-2027-bjornson-washington' && article.writerId === item.writerId));
      }
    }
    const link = story ? '<button class="firebird-story" ' + storyClick(franchise.id, story.id, back) +
      '><small>' + esc(storyPublication(franchise, story)) + '</small><strong>' +
      esc(story.headline) + '</strong><small>Read full story →</small></button>' : '';
    return '<article class="card firebird-entry"><small class="muted"><strong>' + esc(byline) +
      '</strong> · ' + esc([item.date, franchise.name].filter(Boolean).join(' · ')) +
      '</small><p>' + esc(text) + '</p>' + link + '</article>';
  }).join('') + '</div>';
}

function firebird(franchise) {
  const entries = firebirdEntries(franchise)
    .sort((a, b) => String(b.item.date || '').localeCompare(String(a.item.date || '')));
  return '<div class="card" style="background:linear-gradient(125deg,#5e1b16,#b44420);color:white;padding:22px"><small>FRANCHISE HQ SOCIAL</small><h1 style="font-family:Georgia,serif;font-size:clamp(34px,7vw,58px);margin:5px 0">FIREBIRD</h1><p>Every voice. Every headline. One sports universe.</p></div><div class="row"><h2 class="wide">The feed</h2><button class="primary" onclick="nationalHeadlineEdit()">+ National headline</button></div><p class="muted">Short posts and linked stories from your fictional sports universe.</p>' +
    firebirdCards(entries, 'Firebird');
}
function nationalHeadlineEdit(){document.getElementById('view').innerHTML='<h2>National news desk</h2><p class="muted">Record the events of your fictional sports universe.</p><form class="card" onsubmit="nationalHeadlineSave(event)"><label>Headline<input name="headline" required></label><label>Category<select name="category"><option>Heisman Trophy</option><option>National Championship</option><option>All-Americans</option><option>National Awards</option><option>Rankings</option><option>Conference Championship</option><option>Breaking News</option><option>Other</option></select></label><label>Date<input type="date" name="date" required value="'+new Date().toISOString().slice(0,10)+'"></label><label>Summary<textarea name="deck" rows="3"></textarea></label><label>Details<textarea name="body" rows="6"></textarea></label><div class="row"><button class="primary">Publish headline</button><button type="button" onclick="changeTab(\'Firebird\')">Cancel</button></div></form>'}
function nationalHeadlineSave(e){e.preventDefault();const x=f();if(!Array.isArray(x.nationalHeadlines))x.nationalHeadlines=[];x.nationalHeadlines.push({id:'headline-'+Date.now(),addedAt:new Date().toISOString(),...Object.fromEntries(new FormData(e.target))});save();changeTab('Firebird')}
function publications(x){const pubs=mediaPublications(x);return '<div class="row"><h2 class="wide">Publications</h2><button class="primary" onclick="publicationEdit()">+ Add publication</button></div><p class="muted">Each outlet has its own identity, voice, writers and stories. Open an outlet to read its feed.</p><div class="grid">'+pubs.map(p=>'<div class="card"><small class="muted">'+esc(p.brand||'Media outlet')+'</small><h2>'+esc(p.name)+'</h2><p>'+esc(p.description||'')+'</p><p class="muted">'+mediaStoryList(x,p.id).length+' stories · '+esc(p.voice||'Voice not set')+'</p><div class="row"><button class="primary" onclick="openPublication('+JSON.stringify(p.id).replace(/"/g,'&quot;')+')">Open publication</button><button onclick="publicationEdit('+JSON.stringify(p.id).replace(/"/g,'&quot;')+')">Edit profile</button></div></div>').join('')+'</div>'}
function openPublication(id){document.getElementById('view').innerHTML='<div class="row"><button onclick="changeTab(\'Publications\')">← Publications</button></div>'+publicationPage(f(),id)}
function publicationEdit(id){const x=f(),p=mediaPublications(x).find(z=>z.id===id)||{};document.getElementById('view').innerHTML='<h2>Publication profile</h2><form class="card" onsubmit="publicationSave(event,'+JSON.stringify(id||null).replace(/"/g,'&quot;')+')"><label>Name<input required name="name" value="'+esc(p.name||'')+'"></label><label>Brand / format<input name="brand" value="'+esc(p.brand||'')+'"></label><label>Description<textarea name="description" rows="3">'+esc(p.description||'')+'</textarea></label><label>Editorial voice<textarea name="voice" rows="4">'+esc(p.voice||'')+'</textarea></label><div class="row"><button class="primary">Save publication</button><button type="button" onclick="changeTab(\'Publications\')">Cancel</button></div></form>'}
function publicationSave(e,id){e.preventDefault();const x=f(),list=mediaPublications(x),v=Object.fromEntries(new FormData(e.target)),p=list.find(z=>z.id===id);if(p)Object.assign(p,v);else list.push({id:'publication-'+Date.now(),...v});save();changeTab('Publications')}
function mediaPersonalities(x){const writers=mediaWriters(x);return '<div class="row"><h2 class="wide">Media Personalities</h2><button class="primary" onclick="writerEdit()">+ Add media member</button></div><p class="muted">Reporters, columnists, analysts and hosts. Writers can contribute to multiple publications.</p>'+(writers.length?'<div class="grid">'+writers.map(w=>'<div class="card"><small class="muted">'+esc(w.role||'Media personality')+'</small><h3><button class="profile-link" onclick="writerProfile('+JSON.stringify(x.id).replace(/\"/g,'&quot;')+','+JSON.stringify(w.id).replace(/\"/g,'&quot;')+',\'Media Personalities\')">'+esc(w.name)+'</button></h3><p>'+esc(w.bio||'')+'</p><p class="muted">Voice: '+esc(w.voice||'Not yet defined')+'</p><p class="muted">'+mediaStoryList(x).filter(a=>a.writerId===w.id).length+' bylined stories</p><button onclick="writerEdit('+JSON.stringify(w.id).replace(/"/g,'&quot;')+')">Edit profile</button></div>').join('')+'</div>':'<div class="card"><p>No media personalities yet. Add a writer before publishing your first bylined story.</p></div>')}
function writerEdit(id){const w=mediaWriters(f()).find(z=>z.id===id)||{};document.getElementById('view').innerHTML='<h2>Media personality</h2><form class="card" onsubmit="writerSave(event,'+JSON.stringify(id||null).replace(/"/g,'&quot;')+')"><label>Name<input required name="name" value="'+esc(w.name||'')+'"></label><label>Role<input name="role" placeholder="Reporter, columnist, analyst…" value="'+esc(w.role||'')+'"></label><label>Biography<textarea name="bio" rows="4">'+esc(w.bio||'')+'</textarea></label><label>Writing style / voice<textarea name="voice" rows="4">'+esc(w.voice||'')+'</textarea></label><div class="row"><button class="primary">Save media member</button><button type="button" onclick="changeTab(\'Media Personalities\')">Cancel</button></div></form>'}
function writerSave(e,id){e.preventDefault();const x=f(),list=mediaWriters(x),v=Object.fromEntries(new FormData(e.target)),w=list.find(z=>z.id===id);if(w)Object.assign(w,v);else list.push({id:'writer-'+Date.now(),...v});save();changeTab('Media Personalities')}
function scribeEdit(i){const a=mediaStoryList(f())[i];scribeEditById(a?.id||null)}
function scribeEditById(id, publicationId) {
  const franchise = f();
  const story = scribeArticles(franchise).find(item => item.id === id) || {};
  const writers = mediaWriters(franchise);
  const publications = mediaPublications(franchise);
  const defaultPublication = franchise.id === 'npbl-nevada-jacks' ? 'nevada-jacks-newspaper' : 'saturday-scribe';
  const selectedPublication = story.publicationId || publicationId || defaultPublication;
  const categories = [...new Set(['Game Recap','Recruiting','Coaching','Feature','Conference','Postseason','Opinion',story.category].filter(Boolean))];
  const photos = storyPhotos(story);
  document.getElementById('view').innerHTML = `<div class="row"><h2 class="wide">${id ? 'Edit story' : 'New story'}</h2>
    <button onclick="changeTab('Franchise News')">Cancel</button></div>
    <form class="card" onsubmit="scribeSaveById(event,${esc(JSON.stringify(id || null))})">
      <label>Publication<select name="publicationId">${publications.map(p =>
        '<option value="' + esc(p.id) + '"' + (p.id === selectedPublication ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('')}</select></label>
      <label>Byline<select name="writerId"><option value="">Staff</option>${writers.map(w =>
        '<option value="' + esc(w.id) + '"' + (w.id === story.writerId ? ' selected' : '') + '>' + esc(w.name) + '</option>').join('')}</select></label>
      <label>Headline<input required name="headline" value="${esc(story.headline || '')}"></label>
      <label>Section<select name="category">${categories.map(o => '<option' + (o === story.category ? ' selected' : '') + '>' + esc(o) + '</option>').join('')}</select></label>
      <label>In-universe date<input name="date" placeholder="YYYY-MM-DD or season" value="${esc(story.date || '')}"></label>
      <label>Subheadline<input name="deck" value="${esc(story.deck || '')}"></label>
      <label>Story<textarea name="body" rows="12">${esc(story.body || '')}</textarea></label>
      <fieldset><legend>Photos</legend><div id="story-photo-fields">${(photos.length ? photos : [{}]).map(storyPhotoFields).join('')}</div>
        <button type="button" onclick="document.getElementById('story-photo-fields').insertAdjacentHTML('beforeend',storyPhotoFields())">+ Add photo</button>
        <label>Photo credit<input name="imageCredit" value="${esc(story.imageCredit || '')}"></label></fieldset>
      <div class="row"><button class="primary" name="storyStatus" value="published">Publish story</button>
        <button name="storyStatus" value="draft">Save private draft</button></div>
    </form>`;
}

function scribeSaveById(event, id) {
  event.preventDefault();
  const franchise = f();
  const form = new FormData(event.target);
  const values = Object.fromEntries(form);
  const status = event.submitter?.value === 'draft' ? 'draft' : 'published';
  if (status === 'published' && !values.body.trim()) {
    alert('Add story text before publishing.');
    return;
  }
  if (!mediaPublications(franchise).some(publication => publication.id === values.publicationId) ||
      (values.writerId && !mediaWriters(franchise).some(writer => writer.id === values.writerId))) {
    alert('Choose a valid publication and byline.');
    return;
  }
  const urls = form.getAll('imageSrc');
  if (urls.some(url => url.trim() && !storyPhotoUrl(url))) {
    alert('Use an HTTPS image URL or a path under assets/.');
    return;
  }
  const alt = form.getAll('imageAlt');
  const captions = form.getAll('imageCaption');
  const images = storyPhotos({ images: urls.map((src, index) => ({ src, alt: alt[index], caption: captions[index] })) });
  const { publicationId, writerId, headline, category, date, deck, body, imageCredit } = values;
  const articles = franchise.scribeArticles = scribeArticles(franchise);
  const existing = articles.find(story => story.id === id);
  const story = { publicationId, writerId, headline, category, date, deck, body, imageCredit, images, status };
  if (status === 'published' && (!existing || !isPublishedStory(existing)) && !existing?.addedAt) {
    story.addedAt = new Date().toISOString();
  }
  if (existing) Object.assign(existing, story);
  else articles.push({ id: 'story-' + crypto.randomUUID(), ...story });
  save();
  changeTab('Franchise News');
}
function scribeSave(e,i){const a=mediaStoryList(f())[i];scribeSaveById(e,a?.id||null)}
function scribeDeleteById(id){const x=f(),a=scribeArticles(x).find(z=>z.id===id);if(!a||!confirm('Delete this story?'))return;x.scribeArticles=x.scribeArticles.filter(z=>z!==a);save();render()}
function scribeDelete(i){const a=mediaStoryList(f())[i];if(a)scribeDeleteById(a.id)}
