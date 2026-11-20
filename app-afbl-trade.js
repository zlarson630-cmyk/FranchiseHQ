/* Kentucky's private, browser-local deal evaluator. */
const AFBL_TRADE_KEY = 'franchise-hq-kentucky-trade-v1';
const AFBL_TRADE_SIDES = ['receive', 'send'];
const AFBL_TRADE_SCENARIOS = ['Downside', 'Base', 'Upside'];
const AFBL_TRADE_MAX_ASSETS = 6;
const AFBL_TRADE_WAR_SCALE = 20; // Package probabilities use 0.05 WAR increments.

function afblTradeState() {
  try {
    const saved = JSON.parse(localStorage.getItem(AFBL_TRADE_KEY));
    if (saved && AFBL_TRADE_SIDES.every(side => Array.isArray(saved[side]))) return saved;
  } catch {}
  return { discount: '10', receive: [], send: [] };
}

let afblTradeDraft;

function afblTradePlayer() {
  return {
    type: 'player', name: '', wait: '0',
    scenarios: [
      { chance: '25', war: '0, 0, 0' },
      { chance: '50', war: '1, 1, 1' },
      { chance: '25', war: '2, 2, 2' }
    ]
  };
}

function afblTradePick() {
  return { type: 'pick', first: '49', last: '64', draftWait: '1', development: '4', seasons: '5' };
}

function afblTradeNumber(value, min, max, integer = false) {
  if (value === '' || value == null) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max
    && (!integer || Number.isInteger(number)) ? number : null;
}

function afblTradeOutcome(annualWAR, wait, discount, probability) {
  return {
    probability,
    career: annualWAR.reduce((sum, war) => sum + war, 0),
    value: annualWAR.reduce((sum, war, i) => sum + war / (1 + discount) ** (wait + i), 0),
    near: annualWAR.slice(0, Math.max(0, 3 - wait)).reduce((sum, war) => sum + war, 0)
  };
}

function afblTradeProject(asset, discount) {
  if (asset.type === 'player') {
    const wait = afblTradeNumber(asset.wait, 0, 20, true);
    if (wait === null) return { error: 'Enter 0–20 seasons until first production.' };
    const outcomes = [];
    let total = 0;
    for (const scenario of asset.scenarios) {
      const chance = afblTradeNumber(scenario.chance, 0, 100);
      if (chance === null) return { error: 'Enter a probability from 0 to 100 for each scenario.' };
      total += chance;
      if (!chance) continue;
      const annualWAR = scenario.war.split(',').map(v => afblTradeNumber(v.trim(), -20, 20));
      if (annualWAR.length > 20 || annualWAR.includes(null)) {
        return { error: 'Enter 1–20 season WAR values separated by commas for each scenario in use.' };
      }
      outcomes.push(afblTradeOutcome(annualWAR, wait, discount, chance / 100));
    }
    if (Math.abs(total - 100) > 0.000001) return { error: 'Scenario probabilities must add up to 100%.' };
    return { outcomes };
  }

  const first = afblTradeNumber(asset.first, 33, 80, true);
  const last = afblTradeNumber(asset.last, 33, 80, true);
  const draftWait = afblTradeNumber(asset.draftWait, 0, 20, true);
  const development = afblTradeNumber(asset.development, 0, 20, true);
  const seasons = afblTradeNumber(asset.seasons, 1, 20, true);
  if (first === null || last === null || first > last) return { error: 'Use an overall pick or range from 33 to 80.' };
  if ([draftWait, development, seasons].includes(null)) {
    return { error: 'Use whole seasons for draft timing, development and production.' };
  }
  const outcomes = [];
  for (const band of AFBL_TRADE_PICK_BANDS) {
    const slots = Math.min(last, band.last) - Math.max(first, band.first) + 1;
    if (slots <= 0) continue;
    const weight = slots / (last - first + 1) / band.history.length;
    for (const careerWAR of band.history) {
      const annualWAR = Array(seasons).fill(careerWAR / seasons);
      const outcome = afblTradeOutcome(annualWAR, draftWait + development, discount, weight);
      outcomes.push({ ...outcome, career: careerWAR });
    }
  }
  return { outcomes };
}

function afblTradeMean(outcomes, field) {
  return outcomes.reduce((sum, o) => sum + o.probability * o[field], 0);
}

function afblTradePackage(projects, direction = 1, initial = new Map([[0, 1]])) {
  let distribution = initial;
  for (const project of projects) {
    const asset = new Map();
    for (const outcome of project.outcomes) {
      const value = Math.sign(outcome.value) * Math.round(Math.abs(outcome.value) * AFBL_TRADE_WAR_SCALE) * direction;
      asset.set(value, (asset.get(value) || 0) + outcome.probability);
    }
    const next = new Map();
    for (const [sum, probability] of distribution) {
      for (const [value, weight] of asset) {
        const key = sum + value;
        next.set(key, (next.get(key) || 0) + probability * weight);
      }
    }
    distribution = next;
  }
  return distribution;
}

function afblTradeRisk(receive, send) {
  const net = afblTradePackage(send, -1, afblTradePackage(receive));
  let ahead = 0;
  let even = 0;
  let cumulative = 0;
  let low;
  let high;
  for (const [bin, probability] of [...net].sort(([a], [b]) => a - b)) {
    const war = bin / AFBL_TRADE_WAR_SCALE;
    if (bin > 0) ahead += probability;
    if (bin === 0) even += probability;
    cumulative += probability;
    if (cumulative >= 0.1 - 1e-9 && low === undefined) low = war;
    if (cumulative >= 0.9 - 1e-9 && high === undefined) high = war;
  }
  return { ahead, even, low, high };
}

function afblTradeInput(label, field, value, options = '') {
  return `<label>${label}<input data-field="${field}" value="${esc(value)}" ${options}></label>`;
}

function afblTradeAssetCard(asset, index) {
  const whole = 'type="number" min="0" max="20" step="1"';
  const slot = 'type="number" min="33" max="80" step="1"';
  const fields = asset.type === 'pick'
    ? `<div class="trade-fields">
      ${afblTradeInput('First overall slot', 'first', asset.first, slot)}
      ${afblTradeInput('Last overall slot', 'last', asset.last, slot)}
      ${afblTradeInput('Seasons until draft', 'draftWait', asset.draftWait, whole)}
      ${afblTradeInput('Seasons to MLB after draft', 'development', asset.development, whole)}
      ${afblTradeInput('Seasons to spread MLB WAR over', 'seasons', asset.seasons, 'type="number" min="1" max="20" step="1"')}
      </div><p class="muted">Use the same slot twice for a known pick. An uncertain range weights each slot equally.</p>`
    : `<div class="trade-fields">
      ${afblTradeInput('Player or role', 'name', asset.name, 'maxlength="80" placeholder="e.g. 25-year-old CF"')}
      ${afblTradeInput('Seasons until first MLB WAR', 'wait', asset.wait, whole)}
      </div><p class="muted">Enter WAR in season order, such as 1.2, 1.0, 0.5. Fill out the useful seasons you expect. Use fractions for a partial season.</p>
      ${asset.scenarios.map((scenario, i) => `<fieldset class="trade-scenario" data-scenario="${i}">
        <legend>${AFBL_TRADE_SCENARIOS[i]}</legend>
        ${afblTradeInput('Probability (%)', 'chance', scenario.chance, 'type="number" min="0" max="100" step="any"')}
        ${afblTradeInput('WAR by season', 'war', scenario.war, 'maxlength="140"')}
      </fieldset>`).join('')}`;
  return `<article class="trade-asset" data-index="${index}">
    <div class="trade-card-top"><h4>${asset.type === 'pick' ? 'Draft pick' : 'Player projection'}</h4>
      <button type="button" data-action="remove" aria-label="Remove ${asset.type} ${index + 1}">Remove</button></div>
    ${fields}<p class="trade-asset-result" data-asset-result></p>
  </article>`;
}

function afblTradeSide(state, side, label) {
  return `<section class="card trade-side" data-side="${side}">
    <h3>${label}</h3>
    ${state[side].map(afblTradeAssetCard).join('') || '<p class="muted">Add a player or pick.</p>'}
    <div class="trade-actions">
      <button type="button" data-action="player" ${state[side].length >= AFBL_TRADE_MAX_ASSETS ? 'disabled' : ''}>+ Player</button>
      <button type="button" data-action="pick" ${state[side].length >= AFBL_TRADE_MAX_ASSETS ? 'disabled' : ''}>+ Pick</button>
    </div>
  </section>`;
}

function afblTradeLab() {
  const state = afblTradeDraft ||= afblTradeState();
  queueMicrotask(() => {
    const root = document.getElementById('afbl-trade-lab');
    if (root) afblTradeRefresh(root);
  });
  return `<div class="afbl-dashboard trade-lab" id="afbl-trade-lab" oninput="afblTradeEdit(event)" onclick="afblTradeAction(event)">
    <div class="afbl-hero">
      <small>KENTUCKY LIONS · FRONT OFFICE</small><h2>Trade Lab</h2>
      <p>Compare what Kentucky gets with what it gives up. AFBL player rights are career-long.</p>
      ${AFBL_TRADE_SIDES.every(side => !state[side].length) ? '<button type="button" data-action="example">Load an example deal</button>' : ''}
    </div>
    <section class="card trade-results">
      <div class="trade-card-top"><h3>Trade projection</h3>
        <div class="trade-discount">${afblTradeInput('Annual discount (%)', 'discount', state.discount, 'type="number" min="0" max="50" step="any"')}</div>
      </div>
      <div data-summary aria-live="polite"></div>
      <p class="muted">The discount is how much less you value a win for each season you wait. Set it to 0 to give future wins equal weight.</p>
    </section>
    <div class="trade-sides">
      ${afblTradeSide(state, 'receive', 'Kentucky receives')}
      ${afblTradeSide(state, 'send', 'Kentucky sends')}
    </div>
    <details class="card trade-method">
      <summary>Draft evidence and model assumptions</summary>
      <p>Pick distributions use AFBL career WAR from 2065–70 by overall slot. Only archive rows whose round and pick agree with the overall slot under a 20-team order are included. Missing records may bias the sample. The complete 2071–73 drafts use 16 teams and their players are still developing.</p>
      <div class="trade-table"><table><thead><tr><th scope="col">Overall</th><th scope="col">2065–70, 1+ WAR</th><th scope="col">2071–73, 1+ WAR so far</th></tr></thead>
      <tbody>${AFBL_TRADE_PICK_BANDS.map(band => `<tr><th scope="row">${band.first}–${band.last}</th>
      <td>${band.history.filter(war => war >= 1).length}/${band.history.length}</td><td>${band.recentHits}/${band.recentCount}</td></tr>`).join('')}</tbody></table></div>
      <p>In 2075, the median was 2.5 OSA potential stars across each of rounds 3–5. At the time of the review, 3 of 16 third-rounders, 3 of 16 fourth-rounders, and 1 of 16 fifth-rounders had 3+ stars. These were post-draft grades. Pick WAR probabilities do not use them.</p>
      <p>Pick career outcomes are spread evenly across your assumed MLB seasons. Player forecasts and their probabilities are your estimates. Package odds assume independent outcomes and round each outcome to the nearest 0.05 discounted WAR. Edit WAR for the playing time you expect. The tool adds asset WAR, so account for overlapping roles before adding multiple players.</p>
      <p><a href="https://statsplus.net/afbl/draftyear/?year=2065">Draft archive</a> · <a href="https://statsplus.net/afbl/draftyear/?year=2075">2075 draft</a> · <a href="https://afblbaseball.com/rules">AFBL rules</a></p>
    </details>
    <p class="muted trade-storage" data-storage>Working deal saved on this device.</p>
  </div>`;
}

function afblTradeSave() {
  try {
    localStorage.setItem(AFBL_TRADE_KEY, JSON.stringify(afblTradeDraft));
    return true;
  } catch {
    return false;
  }
}

function afblTradeEdit(event) {
  const input = event.target;
  const field = input.dataset.field;
  if (!field) return;
  const root = event.currentTarget;
  if (field === 'discount') {
    afblTradeDraft.discount = input.value;
  } else {
    const card = input.closest('[data-index]');
    const side = card.closest('[data-side]').dataset.side;
    const asset = afblTradeDraft[side][card.dataset.index];
    const scenario = input.closest('[data-scenario]');
    const entry = scenario ? asset.scenarios[scenario.dataset.scenario] : asset;
    entry[field] = input.value;
  }
  if (!afblTradeSave()) root.querySelector('[data-storage]').textContent = 'This browser could not save the working deal.';
  afblTradeRefresh(root);
}

function afblTradeAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const root = event.currentTarget;
  if (action === 'example') {
    if (AFBL_TRADE_SIDES.some(side => afblTradeDraft[side].length)) return;
    const player = afblTradePlayer();
    player.name = 'Example · 25-year-old fringe regular';
    afblTradeDraft.receive.push(player);
    afblTradeDraft.send.push({ ...afblTradePick(), first: '57', last: '64' });
  } else {
    const entries = afblTradeDraft[button.closest('[data-side]').dataset.side];
    if (action === 'remove') entries.splice(Number(button.closest('[data-index]').dataset.index), 1);
    else if (entries.length < AFBL_TRADE_MAX_ASSETS) entries.push(action === 'player' ? afblTradePlayer() : afblTradePick());
  }
  const saved = afblTradeSave();
  root.outerHTML = afblTradeLab();
  const nextRoot = document.getElementById('afbl-trade-lab');
  if (!saved) nextRoot.querySelector('[data-storage]').textContent = 'This browser could not save the working deal.';
  if (action !== 'remove') {
    const side = action === 'example' ? 'receive' : button.closest('[data-side]').dataset.side;
    const cards = nextRoot.querySelectorAll(`[data-side="${side}"] [data-index]`);
    cards[cards.length - 1]?.querySelector('input').focus();
  }
}

function afblTradeRefresh(root) {
  const summary = root.querySelector('[data-summary]');
  const rate = afblTradeNumber(afblTradeDraft.discount, 0, 50);
  const number = n => (Math.abs(n) < 0.05 ? 0 : n).toFixed(1);
  const percent = n => `${Math.round(n * 100)}%`;
  const projects = {};
  for (const side of AFBL_TRADE_SIDES) {
    const cards = root.querySelectorAll(`[data-side="${side}"] [data-index]`);
    projects[side] = afblTradeDraft[side].map((asset, index) => {
      const result = cards[index].querySelector('[data-asset-result]');
      const project = afblTradeProject(asset, (rate ?? 0) / 100);
      result.classList.toggle('trade-error', Boolean(project.error));
      if (project.error) result.textContent = project.error;
      else if (rate === null) result.textContent = '';
      else {
        const hits = project.outcomes.reduce((sum, o) => sum + (o.career >= 1 ? o.probability : 0), 0);
        result.textContent = `${number(afblTradeMean(project.outcomes, 'value'))} expected discounted WAR · ${percent(hits)} chance of 1+ total WAR`;
      }
      return project;
    });
  }
  if (rate === null) {
    summary.textContent = 'Enter an annual discount from 0 to 50%.';
    return;
  }
  if (AFBL_TRADE_SIDES.some(side => projects[side].some(project => project.error))) {
    summary.textContent = 'Review the highlighted assumptions to calculate this deal.';
    return;
  }
  if (AFBL_TRADE_SIDES.some(side => !projects[side].length)) {
    summary.textContent = 'Add at least one asset to each side to compare the deal.';
    return;
  }
  const totals = (side, field) => projects[side].reduce((sum, project) => sum + afblTradeMean(project.outcomes, field), 0);
  const metricRow = (label, field) => {
    const receive = totals('receive', field);
    const send = totals('send', field);
    return `<tr><th scope="row">${label}</th><td>${number(receive)}</td><td>${number(send)}</td><td>${number(receive - send)}</td></tr>`;
  };
  const risk = afblTradeRisk(projects.receive, projects.send);
  summary.innerHTML = `<div class="trade-outcomes">
    <div><strong>${percent(risk.ahead)}</strong><span>Kentucky comes out ahead</span></div>
    <div><strong>${percent(Math.max(0, 1 - risk.ahead - risk.even))}</strong><span>Kentucky comes out behind</span></div>
    <div><strong>${number(risk.low)} to ${number(risk.high)}</strong><span>10th–90th percentile net WAR</span></div>
  </div><p class="muted">Tied outcomes ${percent(risk.even)}. Odds use discounted WAR.</p>
  <div class="trade-table"><table><thead><tr><th scope="col">Expected WAR</th><th scope="col">Receive</th><th scope="col">Send</th><th scope="col">Net</th></tr></thead>
  <tbody>${metricRow('First three seasons', 'near')}${metricRow('Career, discounted', 'value')}${metricRow('Career, undiscounted', 'career')}</tbody></table></div>`;
}
