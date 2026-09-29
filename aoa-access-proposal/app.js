// AOA Access 2.0 proposal: content data and the page's small interactions.
(function () {
  'use strict';

  // ---------- Content ----------

  var NAV = [
    ['overview', 'Overview', 'ph-squares-four'],
    ['portal', "Today's portal", 'ph-monitor'],
    ['scope', 'Scope', 'ph-package'],
    ['identity', 'Identity', 'ph-seal'],
    ['arc', 'Launch arc', 'ph-flag-banner'],
    ['email', 'Email sequence', 'ph-envelope-simple'],
    ['login', 'Login states', 'ph-sign-in'],
    ['help', 'Help Center', 'ph-lifebuoy'],
    ['team', 'Team', 'ph-users'],
    ['investment', 'Investment', 'ph-currency-dollar'],
    ['next', 'Next steps', 'ph-arrow-circle-right'],
  ];

  var KPIS = [
    { label: 'Workstreams', value: '4', icon: 'ph-stack', tint: '#E3EDFA', ink: '#1F5FAE' },
    { label: 'Email templates', value: '3', icon: 'ph-layout', tint: '#EFE8FB', ink: '#6B3FC4' },
    { label: 'HubSpot sends', value: '10', icon: 'ph-paper-plane-tilt', tint: '#FDE3CC', ink: '#B4460E' },
    { label: 'Login states', value: '5', icon: 'ph-sign-in', tint: '#DDF3EA', ink: '#0F7A55' },
  ];

  var SHOTS = [
    { src: 'assets/portal-dashboard.png', title: 'Dashboard', note: 'OTD, remake rate, alerts, rebates and TSI listing' },
    { src: 'assets/portal-new-order.png', title: 'New order', note: 'Appliance selection with 3D preview and Create RX' },
    { src: 'assets/portal-orders.png', title: 'Orders', note: 'Status tracking from draft to production' },
  ];

  var WORKSTREAMS = {
    'Branding': { tint: '#EFE8FB', ink: '#6B3FC4', edge: '#DCCDF6', icon: 'ph-seal' },
    'Email': { tint: '#FDE3CC', ink: '#B4460E', edge: '#F8C9A0', icon: 'ph-envelope-simple' },
    'Login': { tint: '#E3EDFA', ink: '#1F5FAE', edge: '#C4D8F2', icon: 'ph-sign-in' },
    'Help Center': { tint: '#DDF3EA', ink: '#0F7A55', edge: '#B8E5D3', icon: 'ph-lifebuoy' },
  };

  var DELIVERABLES = [
    ['BR-01', 'Branding', 'Portal logo design, including concept development and revision rounds.', 'Concept boards · AI'],
    ['BR-02', 'Branding', 'Final logo package delivered in vector and raster formats, including AI, EPS, SVG, PNG, and JPG, in full color, single color, and reversed versions.', 'AI · EPS · SVG · PNG · JPG'],
    ['BR-03', 'Branding', 'Portal product brand guide covering logo usage, color palette, typography, and application standards, delivered as a PDF.', 'PDF'],
    ['EM-01', 'Email', 'Drip campaign strategy and sequence mapping, timed against the determined portal launch date.', 'Strategy & sequence map'],
    ['EM-02', 'Email', 'Designed, responsive email templates (3) with design files provided in Figma.', 'Figma · HubSpot'],
    ['EM-03', 'Email', 'Build-out of the individual sends (10) in the sequence, including pre-launch, launch, and post-launch reminder messaging.', 'HubSpot'],
    ['UX-01', 'Login', 'Login screen design, delivered as a Figma file with handoff specifications.', 'Figma + handoff specs'],
    ['UX-02', 'Login', 'Supporting screen states, including error messaging, password recovery, and first-time or migrating user prompts.', 'Figma + handoff specs'],
    ['HC-01', 'Help Center', 'Portal landing page design, delivered as a Figma file with handoff specifications.', 'Figma + handoff specs'],
    ['HC-02', 'Help Center', 'Development of Help Center content, including How-To guides, FAQs, and instructional resources in both written and video formats.', 'Written + video'],
  ];

  var LOGO_VERSIONS = ['Full color', 'Single color', 'Reversed'];

  var PHASES = [
    { n: 'Phase 1', name: 'Awareness', goal: 'Build anticipation', items: ['"Something new is coming"', 'Teaser emails', 'Internal rep communications', 'Branding rollout'] },
    { n: 'Phase 2', name: 'Education', goal: 'Explain the value', items: ['Benefits-focused content', 'Why switch', "What's changing", "What's improving"] },
    { n: 'Phase 3', name: 'Launch', goal: 'Drive go-live', items: ['Go-live campaign', 'Rep enablement', 'Customer onboarding'] },
    { n: 'Phase 4', name: 'Migration', goal: 'Complete the transition', items: ['Transition messaging', 'Old portal retirement communications', 'Adoption nudges', 'Success metrics'] },
  ];

  // [when, phase, subject, role, audience, template]
  var SENDS = [
    ['T–30', 'Awareness', 'Something new is coming to AOA Access', 'Teaser that sets expectations and dates before anything changes.', 'All accounts', 'Announcement'],
    ['T–21', 'Education', "What's changing, and what isn't", 'Explains the move plainly, so no one is surprised on go-live.', 'All accounts', 'Editorial'],
    ['T–14', 'Education', 'Faster orders, clearer status, one place for TSIs', 'Benefits-focused: why switch, what improves in day-to-day ordering.', 'All accounts', 'Editorial'],
    ['T–7', 'Education', 'Your account is ready to move', 'Prepares migrating users: credentials, what carries over, where to get help.', 'Migrating users', 'Action'],
    ['T–1', 'Launch', 'Tomorrow: AOA Access 2.0 goes live', 'Final reminder with the login link and a 90-second walkthrough.', 'All accounts', 'Announcement'],
    ['Day 0', 'Launch', "It's live. Sign in to AOA Access 2.0", 'Go-live send. One action: sign in and place the first order.', 'All accounts', 'Action'],
    ['T+3', 'Launch', 'Your first order, step by step', 'Video-led how-to for users who have signed in but not yet ordered.', 'Signed in, no order', 'Editorial'],
    ['T+10', 'Migration', "You haven't signed in yet", 'Adoption nudge for accounts with no login since go-live.', 'Not yet signed in', 'Action'],
    ['T+21', 'Migration', 'The previous portal is being retired', 'Transition messaging with the retirement date and support contacts.', 'Legacy portal users', 'Announcement'],
    ['T+30', 'Migration', 'Final notice: previous portal closes soon', 'Last phase-out notice ahead of retirement.', 'Legacy portal users', 'Action'],
  ];

  var TEMPLATES = [
    { name: 'Announcement', use: 'Teasers, go-live and retirement notices. Big headline, one date, one button.', hero: 26 },
    { name: 'Editorial', use: 'Education and how-to content with room for imagery, steps and video.', hero: 16 },
    { name: 'Action', use: 'Short reminders and nudges built around a single sign-in action.', hero: 8 },
  ];

  var LOGIN_STATES = [
    ['signin', 'Sign in', 'Default', 'A simple, secure, frictionless entry point', 'Two fields, one action. Everything else is secondary, so returning users are in within seconds.'],
    ['error', 'Error', 'Error messaging', 'Errors that explain the fix', 'Plain-language messages tied to the field that failed, with a clear path to recovery. This is where support tickets are won or lost.'],
    ['recovery', 'Password recovery', 'Password recovery', 'Recovery without a phone call', 'A self-serve reset that tells users exactly what will happen next, reducing login-related support requests.'],
    ['first', 'First-time user', 'First-time user', 'Onboarding that shows the finish line', 'New accounts see every step up front, so setup feels short and the first order comes sooner.'],
    ['migrating', 'Migrating user', 'Migrating user', 'Reassurance before anything else', 'Users moving from the previous portal are told first that their work came with them. This is the prompt that moves the 70%.'],
  ];

  var HELP_CATS = [
    { name: 'Getting started', desc: "What's new in 2.0 and first sign-in", icon: 'ph-rocket-launch' },
    { name: 'New order & Rx', desc: 'Selecting appliances and creating an Rx', icon: 'ph-plus-circle' },
    { name: 'Orders & status', desc: 'Draft, verification, on hold, production', icon: 'ph-cube' },
    { name: 'Templates & TSI', desc: 'User templates, defaults and TSI requests', icon: 'ph-bookmark-simple' },
    { name: 'Catalog', desc: 'Appliance categories and descriptions', icon: 'ph-image' },
    { name: 'Teams & practices', desc: 'Doctors, affiliations and access', icon: 'ph-users' },
  ];

  var VIDEOS = [
    { t: 'Portal walkthrough', d: 'A guided first look at AOA Access.', dur: '1:30' },
    { t: 'Case submission', d: 'A real workflow, step by step.', dur: '1:00' },
    { t: 'Rep talking points', d: 'Clips reps send before a visit.', dur: '0:45' },
    { t: 'Feature spotlight', d: 'One feature, one clear benefit.', dur: '0:30' },
    { t: 'Migration FAQ', d: 'Answers to switching questions.', dur: '1:00' },
    { t: 'Help Center library', d: 'Bite-sized answers, added over time.', dur: '0:30–0:45' },
  ];

  var PROOF = [
    { v: '14 mo.', d: 'Embedded on a comparable dental account, full-funnel performance and creative.' },
    { v: '1.4% CTR', d: '191,000 clicks, 527 qualified leads, $84 CPL in one quarter of that engagement.' },
    { v: '60,000', d: 'Subscribers on a weekly template we manage end-to-end for a healthcare-adjacent brand.' },
    { v: '3-person', d: 'Embedded pod model, not a rotating account team relearning the brief each sprint.' },
  ];

  var TEAM = [
    { role: 'Digital Marketing Strategist', icon: 'ph-compass', items: ['Campaign strategy across the portal lifecycle, from awareness through adoption', 'Communication calendars aligned to portal milestones', 'Primary point of contact for approvals and priorities'] },
    { role: 'Digital Marketing Analyst', icon: 'ph-chart-line-up', items: ['HubSpot execution: journeys, segmentation, workflows and QA', 'Tracking for email engagement and portal adoption', 'Regular performance reporting with actionable insights'] },
    { role: 'UX Designer', icon: 'ph-pen-nib', items: ['Portal brand and design standards across touchpoints', 'Email, portal and Help Center experiences', 'Usability, accessibility and developer handoff'] },
    { role: 'Project Manager (Shared)', icon: 'ph-kanban', items: ['Delivery governance, timelines and resource planning', 'Status reviews, risks, dependencies and change requests', 'Client and internal alignment on priorities'] },
  ];

  var MODELS = [['A', 'Model A · Fixed-fee packages'], ['B', 'Model B · Embedded monthly pod']];

  var TIERS = [
    { kicker: 'Tier 1', name: 'Launch Essentials', price: '$18,000 – $24,000', items: ['Branding', 'Templates', 'Core email campaigns', 'Basic videos'] },
    { kicker: 'Tier 2 · Recommended', name: 'Launch + Adoption', price: '$28,000 – $36,000', items: ['Everything in Essentials', 'Rep enablement', 'Training assets', 'Expanded content production'], featured: true },
    { kicker: 'Tier 3', name: 'Strategic Marketing Partner', price: 'Custom, scoped together', items: ['Full-service engagement', 'Ongoing campaign management', 'HubSpot operations', 'Analytics', 'Creative support'] },
  ];

  var POD = [
    { r: 'Brand designer', a: '0.5 FTE', m: 2000 },
    { r: 'UI/UX designer', a: '1.0 FTE', m: 4500 },
    { r: 'Lifecycle & content strategist', a: '0.5 FTE', m: 2100 },
    { r: 'Program lead', a: '0.25 FTE', m: 1200 },
  ];

  var STEPS = [
    'Share the AOA style guide, Ormco guidelines, and current Spark Figma access.',
    'Confirm a target launch date to build the sequence and arc against.',
    'Flag timing on the naming decision — either way, we plan around it.',
    'Kickoff with the pod to source case-submission and FAQ content.',
  ];

  // ---------- Helpers ----------

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function usd(n) { return '$' + n.toLocaleString('en-US'); }

  function render(id, list, tpl) { $(id).innerHTML = list.map(tpl).join(''); }

  // Segmented tab row; returns a function that marks the selected key.
  function tabs(id, defs, onPick) {
    var el = $(id);
    el.innerHTML = defs.map(function (d) {
      return '<button type="button" data-key="' + esc(d[0]) + '">' + esc(d[1]) + '</button>';
    }).join('');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) onPick(b.dataset.key);
    });
    return function (key) {
      el.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.key === key)); });
    };
  }

  // ---------- Gate ----------

  $('enter').addEventListener('click', function () {
    try { localStorage.setItem('aoa-prop-entered', '1'); } catch (e) {}
    document.documentElement.setAttribute('data-entered', '');
    window.scrollTo(0, 0);
  });

  // ---------- Sidebar nav + active section ----------

  function go(id) {
    var el = $(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
  }

  render('nav', NAV, function (n) {
    return '<button type="button" data-id="' + n[0] + '"><i class="ph ' + n[2] + '"></i><span>' + esc(n[1]) + '</span></button>';
  });
  $('nav').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) go(b.dataset.id);
  });

  var active = null;
  function setActive(id) {
    if (id === active) return;
    active = id;
    $('nav').querySelectorAll('button').forEach(function (b) {
      if (b.dataset.id === id) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    var def = NAV.find(function (n) { return n[0] === id; }) || NAV[0];
    $('active-label').textContent = def[1];
  }
  function onScroll() {
    var cur = NAV[0][0];
    NAV.forEach(function (n) {
      var el = $(n[0]);
      if (el && el.getBoundingClientRect().top < 160) cur = n[0];
    });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = 'next';
    setActive(cur);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Overview ----------

  render('kpis', KPIS, function (k) {
    return '<div class="card kpi"><div><div class="kpi-label">' + esc(k.label) + '</div><div class="kpi-value">' + esc(k.value) + '</div></div>' +
      '<div class="icon-dot" style="background:' + k.tint + ';color:' + k.ink + '"><i class="ph ' + k.icon + '"></i></div></div>';
  });

  render('shots', SHOTS, function (s) {
    return '<figure class="card shot"><div class="shot-frame"><img src="' + s.src + '" alt="' + esc(s.title) + '" loading="lazy"></div>' +
      '<figcaption><b>' + esc(s.title) + '</b><span>' + esc(s.note) + '</span></figcaption></figure>';
  });

  // ---------- Scope ----------

  var SCOPE_FILTERS = [['All', 'All deliverables', { tint: '#EEF0F3', ink: '#344054', icon: 'ph-package' }]]
    .concat(Object.keys(WORKSTREAMS).map(function (k) { return [k, k, WORKSTREAMS[k]]; }));

  render('scope-cards', SCOPE_FILTERS, function (f) {
    var count = f[0] === 'All' ? DELIVERABLES.length : DELIVERABLES.filter(function (r) { return r[1] === f[0]; }).length;
    return '<button type="button" class="scope-card" data-key="' + esc(f[0]) + '">' +
      '<div class="scope-card-top"><span>' + esc(f[1]) + '</span><span class="icon-dot" style="background:' + f[2].tint + ';color:' + f[2].ink + '"><i class="ph ' + f[2].icon + '"></i></span></div>' +
      '<span class="scope-card-count">' + count + '</span></button>';
  });

  function setWorkstream(ws) {
    $('scope-cards').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.key === ws)); });
    var rows = DELIVERABLES.filter(function (r) { return ws === 'All' || r[1] === ws; });
    render('scope-rows', rows, function (r) {
      var c = WORKSTREAMS[r[1]];
      return '<div class="scope-row"><span class="id">' + r[0] + '</span><span class="text">' + esc(r[2]) + '</span>' +
        '<span><span class="pill" style="background:' + c.tint + ';color:' + c.ink + ';border-color:' + c.edge + '">' + esc(r[1]) + '</span></span>' +
        '<span class="format">' + esc(r[3]) + '</span></div>';
    });
    $('scope-count').textContent = 'Showing ' + rows.length + ' of ' + DELIVERABLES.length + ' deliverables';
  }
  $('scope-cards').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) setWorkstream(b.dataset.key);
  });
  setWorkstream('All');

  // ---------- Identity ----------

  $('format-grid').insertAdjacentHTML('beforeend', LOGO_VERSIONS.map(function (v) {
    var tick = '<span class="tick"><i class="ph ph-check"></i></span>';
    return '<span class="row-label">' + esc(v) + '</span>' + tick + tick + tick + tick + tick;
  }).join(''));

  // ---------- Launch arc ----------

  render('phases', PHASES, function (p) {
    return '<div class="phase"><div class="phase-n">' + p.n + '</div><div class="phase-name">' + esc(p.name) + '</div>' +
      '<div class="phase-goal">' + esc(p.goal) + '</div><ul>' +
      p.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul></div>';
  });

  // ---------- Email sequence ----------

  render('sends', SENDS, function (s, i) {
    return '<button type="button" class="send' + (s[1] === 'Launch' ? ' is-launch' : '') + '" data-i="' + i + '" aria-label="Send ' + (i + 1) + ', ' + esc(s[0]) + '">' +
      '<span class="send-num">' + (i + 1) + '</span><span class="send-when">' + esc(s[0]) + '</span><span class="send-phase">' + esc(s[1]) + '</span></button>';
  });

  function setSend(i) {
    $('sends').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.i) === i)); });
    var s = SENDS[i];
    $('send-meta').textContent = 'Send ' + (i + 1) + ' · ' + s[0];
    $('send-subject').textContent = s[2];
    $('send-role').textContent = s[3];
    $('send-aud').textContent = s[4];
    $('send-tpl').textContent = s[5];
    $('send-phase').textContent = s[1];
  }
  $('sends').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) setSend(Number(b.dataset.i));
  });
  setSend(5); // Day 0

  render('templates', TEMPLATES, function (t) {
    return '<div class="card template"><div class="template-thumb" aria-hidden="true"><span class="t-logo"></span>' +
      '<span class="t-hero" style="height:' + t.hero + 'px"></span><span class="t-line"></span><span class="t-line short"></span><span class="t-cta"></span></div>' +
      '<div><b>' + esc(t.name) + '</b><p>' + esc(t.use) + '</p></div></div>';
  });

  // ---------- Login states ----------

  var markLoginTab = tabs('login-tabs', LOGIN_STATES, setLoginState);
  function setLoginState(key) {
    markLoginTab(key);
    document.querySelectorAll('.login-card [data-state]').forEach(function (el) { el.hidden = el.dataset.state !== key; });
    var s = LOGIN_STATES.find(function (d) { return d[0] === key; });
    $('ls-kicker').textContent = s[2];
    $('ls-title').textContent = s[3];
    $('ls-body').textContent = s[4];
  }
  setLoginState('signin');

  // ---------- Help Center ----------

  render('help-cats', HELP_CATS, function (h) {
    return '<div class="help-cat"><span class="help-cat-icon"><i class="ph ' + h.icon + '"></i></span>' +
      '<div><b>' + esc(h.name) + '</b><span>' + esc(h.desc) + '</span></div></div>';
  });

  render('videos', VIDEOS, function (v) {
    return '<div class="card video"><div class="video-thumb"><span class="video-play"><i class="ph ph-play"></i></span>' +
      '<span class="video-dur">' + esc(v.dur) + '</span></div><div class="video-body"><b>' + esc(v.t) + '</b><span>' + esc(v.d) + '</span></div></div>';
  });

  // ---------- Team ----------

  render('proof', PROOF, function (p) {
    return '<div class="proof-item"><b>' + esc(p.v) + '</b><span>' + esc(p.d) + '</span></div>';
  });

  render('team-grid', TEAM, function (m) {
    return '<div class="card member"><div class="member-head"><span class="icon-dot"><i class="ph ' + m.icon + '"></i></span><b>' + esc(m.role) + '</b></div>' +
      '<ul>' + m.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul></div>';
  });

  // ---------- Investment ----------

  render('tiers', TIERS, function (t) {
    return '<div class="tier' + (t.featured ? ' is-featured' : '') + '"><div class="tier-kicker">' + esc(t.kicker) + '</div>' +
      '<div class="tier-name">' + esc(t.name) + '</div><div class="tier-price">' + esc(t.price) + '</div><ul>' +
      t.items.map(function (it) { return '<li><i class="ph ph-check"></i>' + esc(it) + '</li>'; }).join('') + '</ul></div>';
  });

  render('pod-rows', POD, function (p) {
    return '<div class="pod-row"><span>' + esc(p.r) + '</span><span>' + esc(p.a) + '</span><span>' + usd(p.m) + '</span></div>';
  });
  $('pod-total').textContent = usd(POD.reduce(function (sum, p) { return sum + p.m; }, 0));

  var markModelTab = tabs('model-tabs', MODELS, setModel);
  function setModel(key) {
    markModelTab(key);
    document.querySelectorAll('#investment [data-model]').forEach(function (el) { el.hidden = el.dataset.model !== key; });
  }
  setModel('A');

  // ---------- Next steps ----------

  render('steps', STEPS, function (t, i) {
    return '<div class="step"><b>0' + (i + 1) + '</b><span>' + esc(t) + '</span></div>';
  });
})();
