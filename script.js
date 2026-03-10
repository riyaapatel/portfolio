// =============================================================
// WAIT FOR DOM
// =============================================================
document.addEventListener("DOMContentLoaded", function () {

  var landing = document.getElementById("landing");
  var pokedex = document.getElementById("pokedex");
  var backBtn = document.getElementById("back-btn");
  var screenContent = document.getElementById("screen-content");
  var landingFigure = document.getElementById("landing-figure");
  var characterImg = document.getElementById("character-landing");

  if (landingFigure) {
    landingFigure.addEventListener("click", function () {
      openPokedex();
    });
  }

  function openPokedex() {
    playOpenSound();
    if (characterImg) {
      characterImg.style.transform = "scale(0.1)";
      characterImg.style.opacity = "0";
    }
    setTimeout(function () {
      landing.classList.add("hidden");
      pokedex.classList.remove("hidden");
      backBtn.classList.remove("hidden");
      showWelcomeScreen();
    }, 500);
  }

  window.closePokedex = function () {
    playClickSound();
    pokedex.classList.add("hidden");
    backBtn.classList.add("hidden");
    landing.classList.remove("hidden");
    if (characterImg) {
      characterImg.style.transition = "none";
      characterImg.style.transform = "scale(1)";
      characterImg.style.opacity = "1";
      requestAnimationFrame(function () {
        characterImg.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      });
    }
  };

  function showWelcomeScreen() {
    screenContent.innerHTML =
      '<div class="screen-welcome">' +
        '<h2>Welcome, Trainer!</h2>' +
        "<p>Select a button below to explore Riya's stats.</p>" +
        '<div class="pokeball-icon">' +
          '<svg viewBox="0 0 100 100" width="60" height="60">' +
            '<circle cx="50" cy="50" r="48" fill="#fff" stroke="#2c3e50" stroke-width="3"/>' +
            '<path d="M2 50 L98 50" stroke="#2c3e50" stroke-width="3"/>' +
            '<path d="M2 50 A48 48 0 0 0 98 50" fill="#e74c3c"/>' +
            '<circle cx="50" cy="50" r="12" fill="#fff" stroke="#2c3e50" stroke-width="3"/>' +
            '<circle cx="50" cy="50" r="6" fill="#2c3e50"/>' +
          "</svg>" +
        "</div>" +
      "</div>";
  }

  // =============================================================
  // SHOW CONTENT
  // =============================================================
  window.showContent = function (section) {
    var data = portfolioData[section];
    if (!data) return;
    playScreenSound();
    screenContent.style.animation = "none";
    void screenContent.offsetWidth;
    screenContent.style.animation = "screenFlicker 0.15s ease";
    screenContent.innerHTML = data.html;

    var buttons = document.querySelectorAll(".btn-pokedex");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active-btn");
    }
    var clickedBtn = document.querySelector(".btn-" + section);
    if (clickedBtn) clickedBtn.classList.add("active-btn");

    if (section === "skills") {
      setTimeout(function () {
        var bars = document.querySelectorAll(".skill-bar-fill");
        for (var j = 0; j < bars.length; j++) {
          bars[j].style.animation = "none";
          void bars[j].offsetWidth;
          bars[j].style.animation = "skillGrow 1s ease forwards";
        }
      }, 50);
    }
  };

  // =============================================================
  // CATCH ME ANIMATION
  // =============================================================
  window.startCatchAnimation = function () {
    playCatchSound();
    var ov = document.getElementById("catch-overlay");
    var pb = document.getElementById("catch-pokeball");
    var st = document.getElementById("catch-stars");
    var cd = document.getElementById("catch-contact");

    ov.classList.remove("hidden");
    st.classList.add("hidden");
    cd.classList.add("hidden");
    pb.style.animation = "none";
    void pb.offsetWidth;
    pb.style.animation = "pokeWiggle 0.4s ease 3";

    setTimeout(function () { st.classList.remove("hidden"); }, 1300);
    setTimeout(function () {
      cd.classList.remove("hidden");
      cd.innerHTML =
        '<h3>Trainer Caught!</h3>' +
        '<a href="mailto:rs.patelriya@gmail.com">📧 rs.patelriya@gmail.com</a>' +
        '<a href="https://linkedin.com/in/riyapatel-dev" target="_blank">💼 LinkedIn</a>' +
        '<a href="https://github.com/riyaapatel" target="_blank">🐙 GitHub</a>' +
        '<p style="margin-top:8px;">📍 Bowling Green, KY</p>' +
        '<button id="catch-close-inner" class="catch-close-btn">Close</button>';

      var closeBtn = document.getElementById("catch-close-inner");
      if (closeBtn) {
        closeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          document.getElementById("catch-overlay").classList.add("hidden");
        });
      }
    }, 1800);
  };

  window.closeCatchOverlay = function () {
    document.getElementById("catch-overlay").classList.add("hidden");
  };

  var catchOverlay = document.getElementById("catch-overlay");
  if (catchOverlay) {
    catchOverlay.addEventListener("click", function (e) {
      if (e.target === catchOverlay) catchOverlay.classList.add("hidden");
    });
  }

  // =============================================================
  // DOWNLOAD TRAINER CARD
  // =============================================================
  window.downloadTrainerCard = function () {
    playClickSound();
    var canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 480;
    var ctx = canvas.getContext("2d");

    var grad = ctx.createLinearGradient(0, 0, 700, 480);
    grad.addColorStop(0, "#dc2626"); grad.addColorStop(1, "#991b1b");
    ctx.fillStyle = grad;
    rr(ctx, 0, 0, 700, 480, 24, true);

    ctx.fillStyle = "#1a1a2e"; rr(ctx, 14, 14, 672, 452, 18, true);
    ctx.fillStyle = "#9bbc0f"; rr(ctx, 28, 28, 644, 424, 12, true);

    ctx.fillStyle = "#0f380f";
    ctx.font = "bold 26px Poppins, sans-serif";
    ctx.fillText("★ TRAINER CARD ★", 210, 68);

    ctx.strokeStyle = "#0f380f"; ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(50, 82); ctx.lineTo(650, 82); ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = "bold 22px Poppins, sans-serif";
    ctx.fillText("RIYA PATEL", 50, 115);

    ctx.font = "15px Poppins, sans-serif";
    ctx.fillText("Type: Software Engineer  ·  AI Engineer", 50, 142);
    ctx.fillText("Region: Bowling Green, KY  |  Level: 5+ Years XP", 50, 165);

    ctx.font = "bold 16px Poppins, sans-serif";
    ctx.fillText("—— SKILLS ——", 50, 200);

    ctx.font = "13px Poppins, sans-serif";
    ctx.fillText("C#  ·  .NET Core  ·  Angular  ·  React  ·  Python  ·  TypeScript", 50, 222);
    ctx.fillText("TensorFlow  ·  Scikit-learn  ·  Flask  ·  FAISS  ·  LLM Agents (Gemini)", 50, 242);
    ctx.fillText("SQL Server  ·  PostgreSQL  ·  Docker  ·  GitHub Actions  ·  CI/CD", 50, 262);

    ctx.font = "bold 16px Poppins, sans-serif";
    ctx.fillText("—— KEY WINS ——", 50, 296);

    ctx.font = "13px Poppins, sans-serif";
    ctx.fillText("▸ 30% faster page loads — Angular + .NET Core optimization", 50, 318);
    ctx.fillText("▸ 90% time saved on stored procedures — custom TS automation", 50, 338);
    ctx.fillText("▸ NuGet package shipped — adopted across 10+ production projects", 50, 358);
    ctx.fillText("▸ Sub-500ms queries — sole developer on Fortune 500 platform", 50, 378);

    ctx.font = "bold 16px Poppins, sans-serif";
    ctx.fillText("—— CONTACT ——", 50, 412);

    ctx.font = "13px Poppins, sans-serif";
    ctx.fillText("rs.patelriya@gmail.com  |  linkedin.com/in/riyapatel-dev", 50, 434);

    var link = document.createElement("a");
    link.download = "Riya_Patel_Trainer_Card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  function rr(ctx, x, y, w, h, r, fill) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
  }

  // =============================================================
  // SOUND EFFECTS
  // =============================================================
  var audioCtx = null;
  window.soundEnabled = true;

  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playTone(freq, dur, type) {
    if (!window.soundEnabled) return;
    try {
      var ctx = getAudioCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = type || "square";
      osc.frequency.value = freq;
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  }

  window.playOpenSound = function () {
    playTone(523, 0.1); setTimeout(function () { playTone(659, 0.1); }, 100);
    setTimeout(function () { playTone(784, 0.15); }, 200);
  };
  window.playClickSound = function () { playTone(880, 0.06); };
  window.playScreenSound = function () {
    playTone(440, 0.05); setTimeout(function () { playTone(660, 0.08); }, 60);
  };
  window.playCatchSound = function () {
    playTone(330, 0.12); setTimeout(function () { playTone(330, 0.12); }, 200);
    setTimeout(function () { playTone(330, 0.12); }, 400);
    setTimeout(function () { playTone(523, 0.3); }, 700);
  };
  window.toggleSound = function () {
    window.soundEnabled = !window.soundEnabled;
    var el = document.getElementById("sound-toggle");
    if (el) el.textContent = window.soundEnabled ? "🔊" : "🔇";
  };

  // =============================================================
  // PARTICLE EFFECTS
  // =============================================================
  var particleCanvas = document.getElementById("particle-canvas");
  if (particleCanvas) {
    var pCtx = particleCanvas.getContext("2d");
    var particles = [];

    function resizePC() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    resizePC();
    window.addEventListener("resize", resizePC);

    function spawnP(x, y, count) {
      var colors = ["#facc15", "#f87171", "#60a5fa", "#34d399", "#f472b6", "#fff"];
      for (var i = 0; i < count; i++) {
        var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        var speed = 2 + Math.random() * 4;
        particles.push({
          x: x, y: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: 0.015 + Math.random() * 0.02,
          size: 3 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    function animP() {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        pCtx.globalAlpha = p.life;
        pCtx.fillStyle = p.color;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fill();
      }
      pCtx.globalAlpha = 1;
      requestAnimationFrame(animP);
    }
    animP();

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".btn-pokedex");
      if (btn) {
        var rect = btn.getBoundingClientRect();
        spawnP(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }
    });
  }

  // =============================================================
  // VISITOR COUNTER
  // =============================================================
  function initVisitorCounter() {
    var el = document.getElementById("visitor-count");
    if (!el) return;
    var count = parseInt(localStorage.getItem("pokedex-visits") || "0", 10) + 1;
    localStorage.setItem("pokedex-visits", String(count));
    el.textContent = String(count);
  }
  initVisitorCounter();

}); // END DOMContentLoaded


// =============================================================
// PORTFOLIO DATA
// =============================================================
var portfolioData = {

  about: {
    title: "About Me",
    html:
      '<div class="screen-section">' +
        '<h3>▾ TRAINER PROFILE</h3>' +
        '<p style="color:#0f380f;"><strong>Name:</strong> Riya Patel</p>' +
        '<p style="color:#0f380f;"><strong>Type:</strong> Software Engineer · AI Engineer</p>' +
        '<p style="color:#0f380f;"><strong>Region:</strong> Bowling Green, KY</p>' +
        '<p style="color:#0f380f;"><strong>Level:</strong> 5+ Years Production XP ★★★★☆</p>' +
        '<p style="color:#0f380f;"><strong>Status:</strong> <span style="background:#0f380f;color:#9bbc0f;padding:2px 8px;border-radius:8px;font-size:0.72rem;font-weight:700;">AVAILABLE FOR OPPORTUNITIES</span></p>' +
        '<br/>' +
        '<p style="color:#1a3a1a;">Software engineer with <strong style="color:#0f380f;">5+ years</strong> building enterprise .NET/Angular systems for international clients and AI systems end-to-end — from an <strong style="color:#0f380f;">LLM agent platform</strong> with OCR + semantic retrieval to a full <strong style="color:#0f380f;">ML training platform</strong> supporting 9+ algorithms.</p>' +
        '<br/>' +
        '<p style="color:#1a3a1a;">Shipped an open-source <strong style="color:#0f380f;">NuGet package</strong> used across 10+ production projects. Cut stored procedure overhead by <strong style="color:#0f380f;">90%</strong>. Debugs what AI tools cannot.</p>' +
        '<br/>' +
        '<p style="color:#1a3a1a;"><strong style="color:#0f380f;">Currently:</strong> M.S. in Computer Science at Western Kentucky University · Graduate Teaching Assistant.</p>' +
      '</div>'
  },

  skills: {
    title: "Skills",
    html:
      '<div class="screen-section">' +
        '<h3>▾ SKILL STATS</h3>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">🤖 AI &amp; ML</div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>Python</span><span>95%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>Scikit-learn / TensorFlow</span><span>85%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>LLM Agents (Gemini/ADK)</span><span>82%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:82%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>FAISS / SentenceTransformers</span><span>80%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>' +
          '<div class="skill-tags"><span class="skill-tag">HuggingFace</span><span class="skill-tag">NLTK</span><span class="skill-tag">Tesseract</span><span class="skill-tag">EasyOCR</span><span class="skill-tag">Pandas</span><span class="skill-tag">NumPy</span><span class="skill-tag">Matplotlib</span><span class="skill-tag">Seaborn</span></div>' +
        '</div>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">⚙️ Backend</div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>C# / .NET Core / ASP.NET</span><span>92%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:92%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>Flask / Reflex / Node.js</span><span>82%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:82%"></div></div></div>' +
          '<div class="skill-tags"><span class="skill-tag">REST APIs</span><span class="skill-tag">Entity Framework</span><span class="skill-tag">Microservices</span><span class="skill-tag">WCF</span><span class="skill-tag">.NET Framework</span></div>' +
        '</div>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">🎨 Frontend</div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>Angular / TypeScript</span><span>90%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>React / JavaScript</span><span>85%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>' +
          '<div class="skill-tags"><span class="skill-tag">HTML5</span><span class="skill-tag">CSS3</span><span class="skill-tag">DOM Optimization</span><span class="skill-tag">PHP</span></div>' +
        '</div>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">🗄️ DB &amp; DevOps</div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>SQL Server / PostgreSQL</span><span>88%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:88%"></div></div></div>' +
          '<div class="skill-bar-container"><div class="skill-label"><span>Git / GitHub Actions / CI-CD</span><span>90%</span></div><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>' +
          '<div class="skill-tags"><span class="skill-tag">MySQL</span><span class="skill-tag">FAISS (vector)</span><span class="skill-tag">Docker</span><span class="skill-tag">JWT</span><span class="skill-tag">OAuth2</span><span class="skill-tag">Swagger/OpenAPI</span><span class="skill-tag">NuGet</span><span class="skill-tag">Bitbucket</span></div>' +
        '</div>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">🧠 Core</div>' +
          '<div class="skill-tags"><span class="skill-tag">Agile/Scrum</span><span class="skill-tag">TDD</span><span class="skill-tag">DSA</span><span class="skill-tag">System Design</span><span class="skill-tag">Tech Docs</span><span class="skill-tag">ETL</span><span class="skill-tag">Selenium</span><span class="skill-tag">Beautiful Soup</span></div>' +
        '</div>' +

        '<div class="skill-category">' +
          '<div class="skill-category-title">🔧 Tools</div>' +
          '<div class="skill-tags"><span class="skill-tag">VS Code</span><span class="skill-tag">Visual Studio</span><span class="skill-tag">Git</span><span class="skill-tag">Bitbucket</span><span class="skill-tag">Postman</span></div>' +
        '</div>' +
      '</div>'
  },

  experience: {
    title: "Experience",
    html:
      '<div class="screen-section">' +
        '<h3>▾ BATTLE LOG</h3>' +

        // GTA
        '<div class="exp-item">' +
          '<div class="exp-title">Graduate Teaching Assistant</div>' +
          '<div class="exp-company">Western Kentucky University</div>' +
          '<div class="exp-date">Aug 2025 – Present</div>' +
          '<p class="exp-details" style="color:#1a3a1a;">Teaching Python labs + tutoring 20+ undergrads — debugging, OOP, logic development.</p>' +
        '</div>' +

        // Mindport
        '<div class="exp-item">' +
          '<div class="exp-title">Software Engineer — Full-Stack</div>' +
          '<div class="exp-company">Mindport Systems LLP, Mumbai</div>' +
          '<div class="exp-date">Sep 2019 – Jul 2024</div>' +
          '<p style="font-size:0.7rem;font-style:italic;margin-bottom:8px;color:#2d5a2d;">Enterprise apps for Netherlands-based clients incl. Fortune 500 logistics.</p>' +
          '<ul>' +

            // 1. Sole developer — Fortune 500
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">Sub-500ms queries</strong> — sole developer on a Fortune 500 logistics platform; owned UI, DB, and API end-to-end.' +
            '</li>' +

            // 2. Page load
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">30% faster page loads</strong> — tuned Angular change detection and .NET Core response paths.' +
            '</li>' +

            // 3. Sprint delivery
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">40% faster sprint delivery</strong> — designed scalable REST APIs (.NET Core, C#, SQL) adopted as team standards.' +
            '</li>' +

            // 4. SP automation
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">90% time cut</strong> on stored procedures — built a TypeScript automation tool used across 10-12 projects.' +
            '</li>' +

            // 5. NuGet
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">Shipped NuGet package</strong> — auto-generates maintenance modules; adopted across 10+ production codebases.' +
            '</li>' +

            // 6. Production fires
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">10+ live env fixes</strong> — debugged via logs, SQL execution plans, and API refactors.' +
            '</li>' +

            // 7. Docs + collab
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">Deployment docs</strong> — authored setup guides; participated in code reviews, sprint planning, and architecture discussions.' +
            '</li>' +

            // 8. Mentoring
            '<li style="color:#1a3a1a;">' +
              '<strong style="color:#0f380f;">Mentored 3 engineers</strong> — pair programming + tech walkthroughs; cut onboarding time by ~40%.' +
            '</li>' +

          '</ul>' +
        '</div>' +
      '</div>'
  },

  projects: {
    title: "Projects",
    html:
      '<div class="screen-section">' +
        '<h3>▾ POKÉDEX ENTRIES</h3>' +

        '<div class="project-card"><h4 style="color:#0f380f;">🤖 Multi-Modal LLM Agent <span style="font-size:0.55rem;background:#0f380f;color:#9bbc0f;padding:2px 6px;border-radius:6px;vertical-align:middle;">Academic</span></h4>' +
        '<p style="color:#1a3a1a;">Reasoning over PDFs, images, handwritten notes, OCR text, and web content. FAISS semantic retrieval + Gemini LLM + structured exports (CSV, Excel, DOCX).</p>' +
        '<div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">Flask</span><span class="project-tag">Gemini/ADK</span><span class="project-tag">FAISS</span><span class="project-tag">SentenceTransformers</span><span class="project-tag">OCR</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">📊 ML Training Platform <span style="font-size:0.55rem;background:#0f380f;color:#9bbc0f;padding:2px 6px;border-radius:6px;vertical-align:middle;">Academic</span></h4>' +
        '<p style="color:#1a3a1a;">Upload datasets, train 9+ models, auto task detection, SMOTE handling, ROC curves, confusion matrices, feature importance.</p>' +
        '<div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">Reflex</span><span class="project-tag">Scikit-learn</span><span class="project-tag">TensorFlow</span><span class="project-tag">PostgreSQL</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">🏢 AVVS</h4>' +
        '<p style="color:#2d5a2d;font-size:0.7rem;font-style:italic;">Industry · 2022–2024</p>' +
        '<p style="color:#1a3a1a;">Enterprise-scale app — architecture improvements, reusable Angular components, optimized .NET + SQL Server.</p>' +
        '<div class="project-tags"><span class="project-tag">Angular</span><span class="project-tag">.NET</span><span class="project-tag">SQL Server</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">📈 TOPS</h4>' +
        '<p style="color:#2d5a2d;font-size:0.7rem;font-style:italic;">Industry · 2022–2023</p>' +
        '<p style="color:#1a3a1a;">BI modules — complex SQL, Angular dashboards, analytics-focused reporting.</p>' +
        '<div class="project-tags"><span class="project-tag">Angular</span><span class="project-tag">.NET</span><span class="project-tag">SQL</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">💰 Maxxwill</h4>' +
        '<p style="color:#2d5a2d;font-size:0.7rem;font-style:italic;">Industry · 2021–2022</p>' +
        '<p style="color:#1a3a1a;">Financial app — core modules, dashboards, mentored junior devs.</p>' +
        '<div class="project-tags"><span class="project-tag">Angular</span><span class="project-tag">.NET</span><span class="project-tag">SQL</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">📦 Settings-Maintenance</h4>' +
        '<p style="color:#1a3a1a;">Open-source NuGet package — auto-generates maintenance modules + stored procedures. Active in 10+ enterprise projects.</p>' +
        '<div class="project-tags"><span class="project-tag">C#</span><span class="project-tag">.NET Core</span><span class="project-tag">SQL Server</span><span class="project-tag">NuGet</span></div></div>' +

        '<div class="project-card"><h4 style="color:#0f380f;">🌐 Early &amp; Freelance</h4>' +
        '<p style="color:#1a3a1a;"><strong style="color:#0f380f;">EnterTTech</strong> · <strong style="color:#0f380f;">Gitaar School</strong> · <strong style="color:#0f380f;">Bespoke Nation</strong> · <strong style="color:#0f380f;">Equipoise</strong> · <strong style="color:#0f380f;">Aerial Arts</strong> · <strong style="color:#0f380f;">Jiyanshi Fashion</strong> · <strong style="color:#0f380f;">Venisons</strong></p>' +
        '<div class="project-tags"><span class="project-tag">HTML/CSS</span><span class="project-tag">WordPress</span><span class="project-tag">Wix</span><span class="project-tag">E-commerce</span></div></div>' +
      '</div>'
  },

  education: {
    title: "Education",
    html:
      '<div class="screen-section">' +
        '<h3>▾ TRAINING ACADEMY</h3>' +
        '<div class="exp-item"><div class="exp-title">M.S. in Computer Science</div><div class="exp-company">Western Kentucky University</div><div class="exp-date">Expected Dec 2026</div><p class="exp-details" style="color:#1a3a1a;">ML, AI Systems, Advanced Databases</p></div>' +
        '<div class="exp-item"><div class="exp-title">M.S. in Information Technology</div><div class="exp-company">Nagindas Khandwala College, India</div><div class="exp-date">2021</div></div>' +
        '<div class="exp-item"><div class="exp-title">B.S. in Information Technology</div><div class="exp-company">Nagindas Khandwala College, India</div><div class="exp-date">2019</div></div>' +
        '<br/>' +
        '<h3>▾ CERTIFICATIONS</h3>' +
        '<ul><li style="color:#1a3a1a;">Google x Kaggle: AI Agents Course</li><li style="color:#1a3a1a;">ChatGPT Prompt Engineering — DeepLearning.AI</li></ul>' +
        '<br/>' +
        '<h3>▾ STATS</h3>' +
        '<p style="color:#0f380f;font-weight:700;"><span style="font-size:1.1rem;">5+</span> Years XP &nbsp;·&nbsp; <span style="font-size:1.1rem;">10+</span> Projects &nbsp;·&nbsp; <span style="font-size:1.1rem;">2+</span> Certs</p>' +
        '<br/>' +
        '<h3>▾ GITHUB CONTRIBUTIONS</h3>' +
        '<p style="font-size:0.7rem;color:#2d5a2d;margin-bottom:6px;">Every pixel counts in code and caffeine! ☕</p>' +
        '<div style="text-align:center;padding:8px;background:#0f380f;border-radius:8px;">' +
          '<img src="https://ghchart.rshah.org/9bbc0f/riyaapatel" alt="GitHub Contributions" style="width:100%;height:auto;border-radius:4px;" />' +
        '</div>' +
        '<p style="font-size:0.6rem;color:#2d5a2d;text-align:center;margin-top:4px;">github.com/riyaapatel</p>' +
      '</div>'
  },

  contact: {
    title: "Contact",
    html:
      '<div class="screen-section">' +
        '<h3>▾ CATCH THIS TRAINER!</h3>' +
        '<p style="text-align:center;margin-bottom:12px;color:#1a3a1a;">Click the Pokéball to catch me!</p>' +
        '<div style="text-align:center;margin-bottom:16px;">' +
          '<button onclick="startCatchAnimation()" style="background:none;border:none;cursor:pointer;font-size:3rem;animation:float 2s ease-in-out infinite;filter:drop-shadow(0 4px 12px rgba(220,38,38,0.4));">🔴</button>' +
        '</div>' +
        '<p style="font-size:0.75rem;text-align:center;color:#2d5a2d;">...or use these links directly:</p>' +
        '<div class="contact-links">' +
          '<a class="contact-link" href="mailto:rs.patelriya@gmail.com"><span>📧</span> rs.patelriya@gmail.com</a>' +
          '<a class="contact-link" href="https://linkedin.com/in/riyapatel-dev" target="_blank"><span>💼</span> linkedin.com/in/riyapatel-dev</a>' +
          '<a class="contact-link" href="https://github.com/riyaapatel" target="_blank"><span>🐙</span> github.com/riyaapatel</a>' +
          '<a class="contact-link" href="https://www.nuget.org/packages/Settings-Maintenance" target="_blank"><span>📦</span> NuGet: Settings-Maintenance</a>' +
          '<div class="contact-link"><span>📍</span> Bowling Green, KY</div>' +
        '</div>' +
      '</div>'
  }
};
