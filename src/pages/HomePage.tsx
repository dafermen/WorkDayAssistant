export function HomePage() {
  return (
    <main className="app-shell">
      <section className="status-card" aria-labelledby="app-title">
        <p className="eyebrow">Phase 3 · UI in progress</p>
        <h1 id="app-title">WorkDay Assistant</h1>
        <p>
          Core time calculations are complete and tested. The accessible calculator interface is now
          being assembled from reusable components.
        </p>
        <dl>
          <div>
            <dt>Maximum workday</dt>
            <dd>07:29:45</dd>
          </div>
          <div>
            <dt>Current milestone</dt>
            <dd>Stable baseline v0.1.0</dd>
          </div>
        </dl>
        <a href="./docs/index.html">Documentation</a>
      </section>
    </main>
  );
}
