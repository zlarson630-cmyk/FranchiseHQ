/* Franchise HQ private multi-device save. Existing device save remains primary until explicitly linked. */
(function () {
  "use strict";
  const URL = "https://xciilhnbqlzlbszqctow.supabase.co";
  const KEY = "sb_publishable_xJKOJ979cec6KvnO1FjEtw_ik9odpEE";
  const table = "franchise_hq_saves";
  let client = null, user = null, cloudVersion = null, active = false, busy = false;
  let timer = null, lastSerialized = "", conflict = false, status = "Cloud sync is off.";
  let checking=false;
  const linkKey="franchise-hq-cloud-link-v2";
  function remember(){
    if(!user||!active)return;
    try{localStorage.setItem(linkKey,JSON.stringify({user:user.id,version:cloudVersion,baseline:lastSerialized}));}
    catch(e){tell("Cloud saved, but browser cannot remember sync link: "+e.message);}
  }
  function linkedSave(){
    try{const x=JSON.parse(localStorage.getItem(linkKey));return x&&x.user===user?.id?x:null;}
    catch(e){return null;}
  }
  function adoptCloud(r){
    if(!r||!allowed(r.payload))throw Error("Cloud save missing or invalid.");
    data=JSON.parse(JSON.stringify(r.payload));
    selected=data.some(x=>x.id===selected)?selected:data[0].id;
    localStorage.setItem("franchise-hq-v1",JSON.stringify(data));
    localStorage.setItem("franchise-hq-selected",selected);
    cloudVersion=r.version;lastSerialized=localPayload();active=true;conflict=false;remember();
    // Apply newly released, versioned Illinois roster only after loading the
    // latest cloud payload, so an older cloud save cannot hide the new roster.
    if(typeof seedIllinoisCurrentRoster==="function"&&seedIllinoisCurrentRoster())save();
    render();
  }
  const allowed = a => Array.isArray(a) && a.length > 0 && a.every(x => x && x.id && x.name && Array.isArray(x.players));
  const el = id => document.getElementById(id);
  const tell = msg => { status = msg; if (el("cloud-message")) el("cloud-message").textContent = msg; if (el("status")) el("status").textContent = active ? msg : "Saved on this device"; };
  const safely = txt => String(txt || "").replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[ch]));
  const localPayload = () => JSON.stringify(data);
  const backupNow = () => { if (typeof backup === "function") backup(); };
  function panel() {
    const old = el("cloud-panel"); if (old) old.remove();
    const settingsBtn = document.querySelector("#tabs button.active");
    const area = el("view");
    if (!area || !settingsBtn || settingsBtn.textContent !== "Settings") return;
    const p = document.createElement("div"); p.id="cloud-panel"; p.className="card";
    let html = '<h3>Private cloud sync · Mac + iPhone</h3><p class="muted">Each account sees only its own Franchise HQ saves. Existing device data is kept until you choose what to sync.</p>';
    if (!client) html += '<p>Cloud service did not load. Your local saves are still safe.</p>';
    else if (!user) html += '<p>Sign in with email and password, or create a new account. You can keep using the app locally without signing in.</p><div class="row" style="flex-wrap:wrap"><input id="cloud-email" type="email" autocomplete="email" placeholder="Email address" style="min-width:210px"><input id="cloud-password" type="password" autocomplete="current-password" placeholder="Password (min. 6 characters)" style="min-width:210px"><button onclick="franchiseCloud.signIn()">Sign in</button><button onclick="franchiseCloud.signUp()">Create account</button></div>';
    else {
      html += '<p><b>Signed in:</b> '+safely(user.email)+'</p>';
      if (!active) html += '<p><b>Sync is not active yet.</b> Choose which saved version to use before making edits on multiple devices.</p><div class="row" style="flex-wrap:wrap"><button onclick="franchiseCloud.useCloud()">Use cloud save on this device</button><button onclick="franchiseCloud.sendLocal()">Upload this device’s save to cloud</button></div>';
      else html += '<p><b>Sync is active on this device.</b> Changes save locally immediately and sync to your account. Avoid editing both devices at exactly the same time.</p><div class="row" style="flex-wrap:wrap"><button onclick="franchiseCloud.syncNow()">Sync now</button><button onclick="franchiseCloud.checkRemote()">Check other device</button><button onclick="franchiseCloud.reloadCloud()">Reload cloud copy</button><button onclick="franchiseCloud.disconnect()">Pause cloud sync</button></div>';
      html += '<p><button onclick="franchiseCloud.signOut()">Sign out</button></p>';
    }
    html += '<p class="muted" id="cloud-message" role="status" aria-live="polite">'+safely(status)+'</p><p class="muted" style="font-size:12px">Export a JSON backup before replacing either copy. The Christmas dashboard will use separate tables and access rules.</p>';
    p.innerHTML=html;
    area.insertBefore(p,area.firstChild);
  }
  async function record() {
    const {data:rows,error} = await client.from(table).select("payload,version,updated_at").eq("user_id",user.id).maybeSingle();
    if(error) throw error;
    return rows;
  }
  async function signIn(){ if(!client) return; const email=el("cloud-email")?.value.trim(),password=el("cloud-password")?.value; if(!email||!password){tell("Enter email and password.");return;}tell("Signing in…");try{const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;}catch(e){tell("Sign-in failed: "+e.message);} }
  async function signUp(){if(!client)return;const email=el("cloud-email")?.value.trim(),password=el("cloud-password")?.value;if(!email||!password||password.length<6){tell("Enter an email and password of at least 6 characters.");return;}tell("Creating account…");try{const {data:res,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error)throw error; if(res.session) {tell("Account ready. Choose the save to sync.");await signedIn(res.user);} else tell("Account created. Check your email to confirm it, then sign in here. If the verification link opens another page, return here afterward.");}catch(e){tell("Sign-up failed: "+e.message);} }
  async function signedIn(next){
    user=next; active=false; cloudVersion=null; conflict=false; clearTimeout(timer); lastSerialized="";
    if(!user){tell("Cloud sync is off. Your local save is untouched.");panel();return;}
    try{
      const r=await record(),linked=linkedSave();
      if(linked&&r&&allowed(r.payload)){
        if(localPayload()!==linked.baseline){
          tell("Local edits were found since the last cloud sync. Automatic sync is paused to protect them. Export a backup, then choose which copy to keep.");
        }else{
          adoptCloud(r);
          tell("Cloud sync reconnected automatically; latest cloud save loaded.");
        }
      }else tell(r?"Signed in. A cloud save exists; choose which copy to use.":"Signed in. No cloud save exists yet; upload this device’s save to begin.");
    }catch(e){tell("Cannot check cloud save: "+e.message);}
    panel();
  }
  async function useCloud(){
    if(!user)return;
    try{
      const r=await record();if(!r){tell("There is no cloud save yet. Use Upload this device’s save.");return;}
      if(!allowed(r.payload))throw Error("Cloud save format is invalid.");
      if(localPayload()!==JSON.stringify(r.payload)&&!confirm("Replace this device’s local Franchise HQ save with the cloud copy? Export a backup first if you need both versions."))return;
      adoptCloud(r);
      tell("Cloud save loaded. Automatic syncing will reconnect after refresh.");panel();
    }catch(e){tell("Download failed: "+e.message);}
  }
  async function sendLocal(){
    if(!user)return;
    try{
      const r=await record();
      if(r&&!confirm("Replace the cloud copy with ALL franchises currently saved on this device? This may overwrite work from another device. Export both backups first."))return;
      if(!r&&!confirm("Upload this device’s Franchise HQ saves to your private cloud account?"))return;
      if(!allowed(data))throw Error("Local saves are invalid.");
      backupNow();
      let result;
      if(r) result=await client.from(table).update({payload:data,version:r.version+1,updated_at:new Date().toISOString()}).eq("user_id",user.id).eq("version",r.version).select("version").maybeSingle();
      else result=await client.from(table).insert({user_id:user.id,payload:data,version:1}).select("version").maybeSingle();
      if(result.error)throw result.error;
      if(!result.data)throw Error("Cloud changed during upload. Reload this page to compare before retrying.");
      cloudVersion=result.data.version;active=true;conflict=false;lastSerialized=localPayload();remember();
      tell("Cloud save uploaded; automatic syncing will reconnect after refresh.");panel();
    }catch(e){tell("Upload failed; local data is safe: "+e.message);}
  }
  function scheduleSave(){
    if(!active||!user||conflict)return;
    if(localPayload()===lastSerialized)return;
    tell("Saved locally · cloud sync pending");
    clearTimeout(timer); timer=setTimeout(flush,900);
  }
  async function flush(){
    if(!active||!user||conflict||busy)return;
    const snap=localPayload();
    if(snap===lastSerialized)return;
    busy=true;
    try{
      const result=await client.from(table).update({payload:JSON.parse(snap),version:cloudVersion+1,updated_at:new Date().toISOString()}).eq("user_id",user.id).eq("version",cloudVersion).select("version").maybeSingle();
      if(result.error)throw result.error;
      if(!result.data){
        conflict=true;active=false;
        tell("Another device has newer changes. Sync paused to protect both copies. Export this device's JSON backup before choosing which save to keep.");
        panel();return;
      }
      cloudVersion=result.data.version;lastSerialized=snap;remember();tell("Saved locally and to cloud");
      if(localPayload()!==snap)scheduleSave();
    }catch(e){tell("Saved locally; cloud could not update: "+e.message+". Use Sync now to retry.");}
    finally{busy=false;}
  }
  async function checkRemote(){
    if(!user||!active||busy||checking)return;
    if(lastSerialized!==localPayload()){scheduleSave();return;}
    checking=true;
    try{
      const baseline=localPayload(),r=await record();
      if(!r)throw Error("Cloud save missing.");
      if(r.version!==cloudVersion){
        if(localPayload()!==baseline){scheduleSave();return;}
        adoptCloud(r);
        tell("Updated from cloud · latest changes from your other device loaded.");
      }
    }catch(e){tell("Could not check cloud updates: "+e.message);}
    finally{checking=false;}
  }
  async function syncNow(){
    if(!user||!active)return;
    await flush();
    await checkRemote();
    if(active&&lastSerialized===localPayload())tell("Up to date on this device and cloud.");
  }
  async function reloadCloud(){if(!user)return;active=false;await useCloud();}
  function disconnect(){clearTimeout(timer);active=false;conflict=false;localStorage.removeItem(linkKey);tell("Cloud sync paused. Your local saves remain available.");panel();}
  async function signOut(){if(!client)return;clearTimeout(timer);active=false;user=null;cloudVersion=null;lastSerialized="";localStorage.removeItem(linkKey);const {error}=await client.auth.signOut();tell(error?"Could not sign out: "+error.message:"Signed out. Local saves remain available.");panel();}
  window.franchiseCloud={panel,signIn,signUp,useCloud,sendLocal,scheduleSave,syncNow,reloadCloud,disconnect,signOut,checkRemote};
  window.addEventListener("focus",()=>checkRemote());
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")checkRemote();});
  setInterval(()=>{if(document.visibilityState==="visible")checkRemote();},30000);
  if(!window.supabase?.createClient){tell("Cloud library unavailable; local saves are unaffected.");return;}
  client=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:"franchise-hq-auth-v1"}});
  client.auth.onAuthStateChange((event,session)=>{
    if(event==="SIGNED_IN"&&session?.user&&user?.id!==session.user.id){setTimeout(()=>signedIn(session.user),0);}
    if(event==="SIGNED_OUT"&&user){setTimeout(()=>signedIn(null),0);}
  });
  client.auth.getSession().then(({data:session,error})=>{if(error){tell("Cloud sign-in unavailable: "+error.message);panel();return;} if(session.session?.user&&user?.id!==session.session.user.id)signedIn(session.session.user);else panel();});
  const saveOrig=save;
  save=function(){saveOrig();scheduleSave();};
  const renderOrig=render;
  render=function(){renderOrig();panel();};
})();