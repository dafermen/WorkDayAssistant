(() => {
  'use strict';
  const data = window.INNOVALOGIC_DOCUMENTATION,
    $ = (selector) => document.querySelector(selector),
    en = data.language === 'en';
  const text = (es, english) => (en ? english : es);
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const normalize = (value) =>
    String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const slug = (value) =>
    normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section';
  const route = (id, anchor = '') =>
    '#/' + encodeURIComponent(id) + (anchor ? '/' + encodeURIComponent(anchor) : '');
  const md = window.markdownit({ html: false, linkify: false });
  let selected;
  document.documentElement.lang = data.language;
  document.title = data.project + ' · ' + text('Documentación', 'Documentation');
  $('#home').textContent = data.project;
  $('#app').href = data.application;
  $('#app').textContent = text('Aplicación ↗', 'Application ↗');
  $('#search-label').textContent = text('Buscar documentación', 'Search documentation');
  $('#search').setAttribute('aria-label', text('Buscar documentación', 'Search documentation'));
  $('#search').placeholder = text('Buscar documentación…', 'Search documentation…');
  $('#revision').textContent = ' · ' + data.revision;
  $('#menu').textContent = text('☰ Menú', '☰ Menu');
  $('#close').textContent = text('Cerrar ×', 'Close ×');
  $('#outline strong').textContent = $('#mobile-toc summary').textContent = text(
    'En esta página',
    'On this page',
  );
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    $('#theme').textContent =
      theme === 'dark' ? text('Tema claro', 'Light theme') : text('Tema oscuro', 'Dark theme');
    $('#theme').setAttribute('aria-pressed', String(theme === 'dark'));
  };
  try {
    setTheme(localStorage.getItem('innovalogic-docs-theme') === 'dark' ? 'dark' : 'light');
  } catch {
    setTheme('light');
  }
  $('#theme').onclick = () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try {
      localStorage.setItem('innovalogic-docs-theme', theme);
    } catch {
      /* Visit-only preference. */
    }
  };
  const closeMenu = () => {
    $('#sidebar').classList.remove('open');
    $('#overlay').hidden = true;
    $('#menu').setAttribute('aria-expanded', 'false');
  };
  $('#menu').onclick = () => {
    $('#sidebar').classList.add('open');
    $('#overlay').hidden = false;
    $('#menu').setAttribute('aria-expanded', 'true');
    $('#close').focus();
  };
  $('#close').onclick = () => {
    closeMenu();
    $('#menu').focus();
  };
  $('#overlay').onclick = closeMenu;
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && $('#sidebar').classList.contains('open')) {
      closeMenu();
      $('#menu').focus();
    }
    if (event.key === 'Tab' && $('#sidebar').classList.contains('open')) {
      const nodes = [...$('#sidebar').querySelectorAll('button,a,summary')].filter(
        (el) => el.getClientRects().length,
      );
      if (!event.shiftKey && document.activeElement === nodes.at(-1)) {
        event.preventDefault();
        nodes[0].focus();
      }
      if (event.shiftKey && document.activeElement === nodes[0]) {
        event.preventDefault();
        nodes.at(-1).focus();
      }
    }
  });
  function catalog() {
    const query = normalize($('#search').value.trim()),
      docs = data.documents.filter((item) =>
        normalize(item.title + ' ' + item.content).includes(query),
      );
    $('#catalog').innerHTML = [...new Set(docs.map((item) => item.section))]
      .map(
        (section) =>
          `<details open><summary>${escape(section)}</summary>${docs
            .filter((item) => item.section === section)
            .map(
              (item) =>
                `<a href="${route(item.id)}"${selected?.id === item.id ? ' aria-current="page"' : ''}>${escape(item.title)}</a>`,
            )
            .join('')}</details>`,
      )
      .join('');
    $('#results').textContent = docs.length + ' ' + text('documentos', 'documents');
  }
  $('#search').oninput = catalog;
  function render() {
    let parts;
    try {
      parts = location.hash.slice(2).split('/').map(decodeURIComponent);
    } catch {
      parts = [];
    }
    const item = data.documents.find((doc) => doc.id === parts[0]) || data.documents[0];
    if (!item) return;
    if (selected?.id !== item.id) {
      selected = item;
      const article = $('#article');
      article.innerHTML = md.render(item.content);
      const seen = new Map();
      article.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
        const base = slug(heading.textContent),
          count = seen.get(base) || 0;
        seen.set(base, count + 1);
        heading.id = base + (count ? '-' + count : '');
      });
      article.querySelectorAll('a').forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (/^https?:|mailto:/i.test(href)) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          return;
        }
        try {
          const target = new URL(href, 'https://documentation.invalid/' + item.source),
            source = decodeURIComponent(target.pathname.slice(1)),
            doc = data.documents.find((candidate) => candidate.source === source);
          if (doc) {
            link.href = route(doc.id, target.hash.slice(1));
          } else {
            link.removeAttribute('href');
            link.title = text('Fuente fuera de este lector', 'Source outside this reader');
          }
        } catch {
          link.removeAttribute('href');
        }
      });
      article.querySelectorAll('img').forEach((image) => {
        try {
          const source = decodeURIComponent(
            new URL(
              image.getAttribute('src'),
              'https://documentation.invalid/' + item.source,
            ).pathname.slice(1),
          );
          if (Object.hasOwn(data.images, source)) {
            image.src = data.images[source];
            image.loading = 'lazy';
            return;
          }
        } catch {
          /* Unapproved source. */
        }
        const label = document.createElement('span');
        label.textContent = image.alt;
        image.replaceWith(label);
      });
      article.querySelectorAll('table').forEach((table) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-scroll';
        wrapper.tabIndex = 0;
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', text('Tabla desplazable', 'Scrollable table'));
        table.before(wrapper);
        wrapper.append(table);
      });
      const toc = [...article.querySelectorAll('h2,h3')]
        .map(
          (heading) => `<a href="${route(item.id, heading.id)}">${escape(heading.textContent)}</a>`,
        )
        .join('');
      $('#outline nav').innerHTML = $('#mobile-toc nav').innerHTML = toc;
      $('#breadcrumb').textContent =
        text('Documentación', 'Documentation') + ' / ' + item.section + ' / ' + item.title;
      const index = data.documents.indexOf(item);
      $('#pager').innerHTML = [
        [-1, text('← Anterior', '← Previous')],
        [1, text('Siguiente →', 'Next →')],
      ]
        .map(([delta, label]) => {
          const next = data.documents[index + delta];
          return next
            ? `<a href="${route(next.id)}">${label}<br>${escape(next.title)}</a>`
            : '<span></span>';
        })
        .join('');
      $('#paths').hidden = index !== 0;
      $('#paths').innerHTML = data.paths
        .map((path) => `<a href="${route(path.id, path.anchor)}">${escape(path.label)}</a>`)
        .join('');
      window.InnovaLogicDocs?.enhance(article);
      catalog();
      closeMenu();
      const title = article.querySelector('h1');
      if (title) {
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }
      if (!parts[1]) window.scrollTo({ top: 0 });
    }
    if (parts[1]) document.getElementById(parts[1])?.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', render);
  render();
})();
