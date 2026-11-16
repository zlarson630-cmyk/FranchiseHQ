const bootBefore=JSON.stringify(data);
seedKentuckyLions();afblSeedPlanner();seedIllinoisHistory();if(!localStorage.getItem('franchise-hq-cloud-link-v2'))seedIllinoisCurrentRoster();seedBjornsonArticleArchive();seedBjornsonNewsroom();seedBjornsonFoundation();seedBjornsonMedia();
if(JSON.stringify(data)!==bootBefore)save();
render();
if(location.hash.startsWith('#player=')){const name=decodeURIComponent(location.hash.slice(8));const i=f().players.findIndex(p=>p.name===name);if(i>=0)openPlayer(i)}
