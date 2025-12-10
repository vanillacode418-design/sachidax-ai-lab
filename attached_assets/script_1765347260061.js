/* ==========================================================================
   KAIZEN — script.js
   - Modal system (single modal reused)
   - Data-driven modal population for services & use-cases
   - Audio player: play/pause, progress, duration, seek, download
   - Demo audio generator (creates short WAV blobs so UI works offline)
   - Sidebar active state wiring
   - Smooth scroll & page transitions
   - Minor micro-interactions (card hover, button animation)
   ========================================================================== */

(function () {
  'use strict';

  /* ============
     Utilities
     ============ */

  // Simple DOM helper
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Create WAV blob of a short generated example "voice-like" audio.
  // This uses a basic FM-ish tone with an amplitude envelope to sound more 'speechy'.
  function generateDemoWavBlob({ seconds = 4, sampleRate = 44100, baseFreq = 220 } = {}) {
    const length = Math.floor(seconds * sampleRate);
    const channels = 1;
    const buffer = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // frequency modulation for "expressive" tone
      const fm = Math.sin(2 * Math.PI * 2 * t) * 20; // slow FM
      const freq = baseFreq + 80 * Math.sin(2 * Math.PI * 0.25 * t) + fm;
      const carrier = Math.sin(2 * Math.PI * freq * t);
      // amplitude envelope (attack-decay-sustain-release)
      let env = 1.0;
      if (t < 0.08) env = t / 0.08; // attack
      else if (t < 0.6) env = 1 - (t - 0.08) * 0.2; // slight decay
      else if (t < seconds - 0.2) env = 0.85; // sustain
      else env = Math.max(0, (seconds - t) / 0.2); // release

      // add some harmonics
      const h2 = 0.25 * Math.sin(2 * Math.PI * (freq * 2) * t);
      const h3 = 0.12 * Math.sin(2 * Math.PI * (freq * 3) * t);
      buffer[i] = (carrier + h2 + h3) * 0.5 * env * (0.85 + 0.15 * Math.random());
    }

    // Convert float buffer to 16-bit PCM WAV
    function floatTo16BitPCM(float32Array) {
      const buffer = new ArrayBuffer(float32Array.length * 2);
      const view = new DataView(buffer);
      let offset = 0;
      for (let i = 0; i < float32Array.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, float32Array[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7fff;
        view.setInt16(offset, s, true);
      }
      return view;
    }

    function writeString(view, offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    const wavBuffer = new ArrayBuffer(44 + buffer.length * 2);
    const view = new DataView(wavBuffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * 2, true);
    writeString(view, 8, 'WAVE');
    /* fmt chunk */
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // chunk size
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * 2, true); // byte rate
    view.setUint16(32, channels * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    /* data chunk */
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * 2, true);

    // write PCM samples
    const pcmView = floatTo16BitPCM(buffer);
    for (let i = 0; i < pcmView.byteLength; i++) {
      view.setUint8(44 + i, pcmView.getUint8(i));
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  // Helper to create object URL safely (we'll revoke previous ones)
  function createObjectUrl(blob) {
    if (!blob) return null;
    return URL.createObjectURL(blob);
  }

  /* ============
     Data (placeholders)
     ============ */

  // Service descriptions (short)
  const SERVICES = {
    "Voice AI": {
      title: "Voice AI",
      description: "Multilingual speech synthesis & recognition, IVR, and telephony integrations. Fine tune prosody and phonemes for realistic agents.",
    },
    "Text AI": {
      title: "Text AI",
      description: "Contextual assistants, summarization, classification and natural language APIs. Use embeddings and chain-of-thought flows.",
    },
    "Virtual Agents": {
      title: "Virtual Agents",
      description: "Dialog flows, webhook integrations, and stateful agents for calls & chat with session memory and routing.",
    },
    "Automation Workflows": {
      title: "Automation Workflows",
      description: "Connectors, builders, and templates to automate voice and data flows between systems with retries and observability.",
    },
    "APIs & SaaS": {
      title: "APIs & SaaS",
      description: "Robust APIs, SDKs and platform hosting to plug Kaizen into your product. Rate-limits, auth and dashboards included.",
    },
    "IoT & Dashboards": {
      title: "IoT & Dashboards",
      description: "Real-time telemetry, dashboards and smart triggers for voice automations and device orchestration.",
    }
  };

  // Fallback modal text for use-cases (simple pattern)
  function getCaseContent(caseName) {
    const description = `Template: ${caseName}. This template includes automated call flow steps, retry logic, and logging. Preview the demo audio to hear a sample agent voice and then deploy the template to your project.`;
    return {
      title: caseName,
      description,
      previewNotes: "Preview Flow: Intro → Key question → Option handling → Confirmation → Wrap-up",
    };
  }

  /* ============
     DOM refs
     ============ */
  const modalRoot = $('#modal-root');
  const modalBackdrop = $('.modal-backdrop', modalRoot);
  const modalPanel = $('.modal-panel', modalRoot);
  const modalContent = $('#modal-content');
  const modalCloseBtns = $$('.modal-close', modalRoot);
  const demoAudioEl = $('#demo-audio');

  // Keep track of current audio blob so we can revoke after use
  let currentAudioBlobUrl = null;
  let currentAudioBlob = null;

  // Animated bars interval id
  let barAnimRAF = null;

  /* ============
     Audio player logic
     ============ */

  // Build the audio player UI and return its container element and controls.
  function createAudioPlayerUI({ blobUrl, blob, fallbackText = "" } = {}) {
    // Container
    const container = document.createElement('div');
    container.className = 'modal-audio-player';
    container.innerHTML = `
      <div class="audio-controls">
        <button class="play-btn" aria-label="Play/Pause"><span class="play-icon">▶</span></button>
        <div class="audio-bars" aria-hidden="true">
          <div class="bar" style="height:8px"></div>
          <div class="bar" style="height:14px"></div>
          <div class="bar" style="height:10px"></div>
        </div>
      </div>
      <div class="audio-seek" title="Click to seek">
        <div class="progress" style="width:0%"></div>
      </div>
      <div class="audio-meta">
        <div class="time"><span class="current">0:00</span> / <span class="duration">0:00</span></div>
        <div class="meta-actions"><a class="download-link" href="#" download="kaizen-demo.wav" title="Download audio">Download</a></div>
      </div>
    `;

    const playBtn = $('.play-btn', container);
    const playIcon = $('.play-icon', playBtn);
    const bars = $$('.bar', container);
    const seekBar = $('.audio-seek', container);
    const progressEl = $('.progress', container);
    const currentTimeEl = $('.current', container);
    const durationEl = $('.duration', container);
    const downloadLink = $('.download-link', container);

    // Set audio element source
    if (!blobUrl && blob) {
      blobUrl = createObjectUrl(blob);
    }
    if (!blobUrl) {
      // nothing to play
      playBtn.disabled = true;
      downloadLink.style.opacity = 0.4;
    } else {
      demoAudioEl.src = blobUrl;
      downloadLink.href = blobUrl;
    }

    // Utility: format seconds to mm:ss
    function formatTime(t) {
      if (!isFinite(t)) return '0:00';
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      return `${m}:${(s < 10 ? '0' : '') + s}`;
    }

    // Update duration once metadata is loaded
    function updateDuration() {
      const dur = demoAudioEl.duration || 0;
      durationEl.textContent = formatTime(dur);
    }

    // Update current time and progress
    function updateProgress() {
      const cur = demoAudioEl.currentTime || 0;
      const dur = demoAudioEl.duration || 0;
      const pct = dur > 0 ? (cur / dur) * 100 : 0;
      progressEl.style.width = pct + '%';
      currentTimeEl.textContent = formatTime(cur);
    }

    // Play/pause toggle
    function togglePlay() {
      if (demoAudioEl.paused) demoAudioEl.play().catch(() => {});
      else demoAudioEl.pause();
    }

    // Seek by click
    function seekByClick(e) {
      const rect = seekBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      demoAudioEl.currentTime = (demoAudioEl.duration || 0) * pct;
    }

    // Animated bars: when playing, animate heights via requestAnimationFrame
    function startBars() {
      if (barAnimRAF) cancelAnimationFrame(barAnimRAF);
      function frame() {
        if (!demoAudioEl.paused && !demoAudioEl.ended) {
          bars.forEach((b, i) => {
            // base heights influenced by time and random
            const h = 8 + Math.abs(Math.sin(Date.now() / (200 + i * 80))) * 36 * (0.6 + Math.random() * 0.6);
            b.style.height = Math.round(h) + 'px';
            b.style.opacity = 0.9;
          });
        } else {
          bars.forEach((b, i) => {
            b.style.height = (8 + i * 6) + 'px';
            b.style.opacity = 0.6;
          });
        }
        barAnimRAF = requestAnimationFrame(frame);
      }
      barAnimRAF = requestAnimationFrame(frame);
    }

    function stopBars() {
      if (barAnimRAF) cancelAnimationFrame(barAnimRAF);
      bars.forEach((b, i) => {
        b.style.height = (8 + i * 6) + 'px';
        b.style.opacity = 0.6;
      });
    }

    // Event hookups
    playBtn.addEventListener('click', togglePlay);
    seekBar.addEventListener('click', seekByClick);

    // Sync UI with audio element
    demoAudioEl.addEventListener('loadedmetadata', () => {
      updateDuration();
      updateProgress();
    });
    demoAudioEl.addEventListener('timeupdate', updateProgress);
    demoAudioEl.addEventListener('play', () => {
      playIcon.textContent = '⏸';
      startBars();
    });
    demoAudioEl.addEventListener('pause', () => {
      playIcon.textContent = '▶';
      stopBars();
    });
    demoAudioEl.addEventListener('ended', () => {
      playIcon.textContent = '▶';
      stopBars();
      demoAudioEl.currentTime = 0;
      updateProgress();
    });

    // Download link: blob URL may be already set
    if (blob) {
      const blobUrl2 = createObjectUrl(blob);
      downloadLink.href = blobUrl2;
      downloadLink.setAttribute('download', 'kaizen-demo.wav');

      // remember to revoke old blob if necessary (caller handles revocation)
    }

    // expose a destroy for cleaning up
    container._cleanup = () => {
      // pause audio
      demoAudioEl.pause();
      // revoke created blob if any (we won't revoke the global currentAudioBlobUrl here)
      stopBars();
    };

    return container;
  }

  /* ============
     Modal population and open/close
     ============ */

  function openModalWithContent({ title = '', description = '', previewNotes = '', audioBlob = null } = {}) {
    // Clean any previous audio blob URL
    if (currentAudioBlobUrl) {
      try { URL.revokeObjectURL(currentAudioBlobUrl); } catch (e) {}
      currentAudioBlobUrl = null;
      currentAudioBlob = null;
    }

    // Create a new blob if provided (or generate a demo audio blob)
    let blob = audioBlob || generateDemoWavBlob({ seconds: 4, baseFreq: 210 + Math.random() * 80 });
    currentAudioBlob = blob;
    currentAudioBlobUrl = createObjectUrl(blob);

    // Build modal inner HTML
    modalContent.innerHTML = ''; // clear

    const titleEl = document.createElement('h2');
    titleEl.className = 'modal-title';
    titleEl.textContent = title;

    const descEl = document.createElement('p');
    descEl.className = 'modal-desc';
    descEl.textContent = description;

    const flowEl = document.createElement('div');
    flowEl.className = 'modal-flow';
    flowEl.innerHTML = `<strong>Preview Flow</strong><p style="color:var(--muted);margin-top:6px">${previewNotes}</p>`;

    // Create audio UI
    const audioUI = createAudioPlayerUI({ blobUrl: currentAudioBlobUrl, blob: currentAudioBlob });

    // Deploy button
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    const deployBtn = document.createElement('button');
    deployBtn.className = 'btn btn-primary';
    deployBtn.textContent = 'Deploy Template';
    deployBtn.addEventListener('click', () => {
      // small demo action: show visual feedback then close modal
      deployBtn.textContent = 'Deploying…';
      deployBtn.disabled = true;
      setTimeout(() => {
        deployBtn.textContent = 'Deployed ✓';
        deployBtn.disabled = false;
      }, 900);
    });
    actions.appendChild(deployBtn);

    // Append pieces
    modalContent.appendChild(titleEl);
    modalContent.appendChild(descEl);
    modalContent.appendChild(flowEl);
    modalContent.appendChild(audioUI);
    modalContent.appendChild(actions);

    // show modal
    showModal();
  }

  function showModal() {
    modalRoot.classList.add('open');
    modalRoot.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Enable escape to close
    document.addEventListener('keydown', escHandler);
  }

  function closeModal() {
    modalRoot.classList.remove('open');
    modalRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Pause audio and cleanup
    try { demoAudioEl.pause(); } catch (e) {}
    // Revoke audio URL if we created one
    if (currentAudioBlobUrl) {
      try { URL.revokeObjectURL(currentAudioBlobUrl); } catch (e) {}
      currentAudioBlobUrl = null;
      currentAudioBlob = null;
    }
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) {
    if (e.key === 'Escape') closeModal();
  }

  // Modal clicks: backdrop and close buttons
  function setupModalEvents() {
    modalBackdrop.addEventListener('click', (e) => {
      // close
      closeModal();
    });
    // close buttons
    modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));
  }

  /* ============
     Event delegation for cards & services
     ============ */

  function handleOpenService(serviceName) {
    const svc = SERVICES[serviceName] || { title: serviceName, description: 'No extra info' };
    openModalWithContent({
      title: svc.title,
      description: svc.description,
      previewNotes: 'Demo: short intro and sample voice playback.'
    });
  }

  function handleOpenCase(caseName) {
    const c = getCaseContent(caseName);
    openModalWithContent({
      title: c.title,
      description: c.description,
      previewNotes: c.previewNotes
    });
  }

  // Use event delegation for service and case open buttons
  function setupDelegation() {
    document.addEventListener('click', (e) => {
      const serviceBtn = e.target.closest('.open-service');
      if (serviceBtn) {
        const name = serviceBtn.dataset.service || serviceBtn.getAttribute('data-service');
        if (name) handleOpenService(name);
        return;
      }

      const caseBtn = e.target.closest('.open-case');
      if (caseBtn) {
        const name = caseBtn.dataset.case || caseBtn.getAttribute('data-case');
        if (name) handleOpenCase(name);
        return;
      }

      // hero talk button
      const talkBtn = e.target.closest('#talk-kaizen');
      if (talkBtn) {
        // open a small modal demo
        openModalWithContent({
          title: 'Talk to Kaizen — Live Demo',
          description: 'This demo plays a short sample of an automated Kaizen voice agent introducing itself and offering options.',
          previewNotes: 'Sample: "Hello — this is Kaizen. Press 1 for sales, 2 for support..."',
          audioBlob: generateDemoWavBlob({ seconds: 5, baseFreq: 260 })
        });
      }
    });
  }

  /* ============
     Sidebar active state & smooth scroll
     ============ */

  function setSidebarActive() {
    // Get current filename from location pathname
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const hrefName = href.split('/').pop();
      if (hrefName === path || (path === '' && hrefName === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ============
     Micro-interactions
     ============ */

  function setupCardHover() {
    const cards = $$('.card, .service-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('card-hover');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('card-hover');
      });
    });
  }

  /* ============
     Page transition: simple fade on load
     ============ */

  function applyPageTransition() {
    document.documentElement.classList.add('page-transition-start');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('page-transition-start');
    });
    // We can add a subtle class to animate in important elements
    const fadeTargets = $$('.fade-enter');
    fadeTargets.forEach(el => {
      el.classList.add('fade-enter-active');
      setTimeout(() => el.classList.remove('fade-enter-active'), 700);
    });
  }

  /* ============
     Init
     ============ */

  function init() {
    setupModalEvents();
    setupDelegation();
    setupCardHover();
    setSidebarActive();
    setupSmoothScroll();
    applyPageTransition();

    // Accessibility: focus trapping basic behavior is not implemented here (simple)
    // Initialize any other on-load UI bits (e.g., hero wave small animation)
    animateHeroWave();
  }

  /* ============
     Hero wave subtle animation (non-critical)
     ============ */
  function animateHeroWave() {
    const bars = $$('.wave .bar');
    if (!bars.length) return;
    let angle = 0;
    function frame() {
      angle += 0.03;
      bars.forEach((b, i) => {
        const h = 14 + Math.sin(angle + i * 0.6) * (16 + i * 2);
        b.style.height = Math.max(6, Math.round(h)) + 'px';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose minimal debug API on window (optional)
  window.__KAIZEN = {
    generateDemoWavBlob,
    openModalWithContent,
  };

})();
