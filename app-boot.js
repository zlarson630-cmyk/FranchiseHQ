const bootBefore=JSON.stringify(data);
seedKentuckyLions();afblSeedPlanner();seedIllinoisHistory();seedBjornsonArticleArchive();seedBjornsonNewsroom();seedBjornsonFoundation();seedBjornsonMedia();
if(JSON.stringify(data)!==bootBefore)save();
render();
if(location.hash.startsWith('#player=')){const name=decodeURIComponent(location.hash.slice(8));const i=f().players.findIndex(p=>p.name===name);if(i>=0)openPlayer(i)}
