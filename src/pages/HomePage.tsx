export function HomePage() {
  return (
    <main className="app-shell">
      <section className="status-card" aria-labelledby="app-title">
        <p className="eyebrow">Phase 0</p>
        <h1 id="app-title">WorkDay Assistant</h1>
        <p>
          Project foundation is ready. Time calculations will be implemented in the business logic
          phase.
        </p>
        <dl>
          <div>
            <dt>Maximum workday</dt>
            <dd>07:29:45</dd>
          </div>
          <div>
            <dt>Current status</dt>
            <dd>Initialized</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
