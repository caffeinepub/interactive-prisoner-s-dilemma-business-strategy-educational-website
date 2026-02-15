# Specification

## Summary
**Goal:** Build a responsive, single-page interactive Prisoner’s Dilemma educational website for a BBA Strategic Game Theory context, emphasizing business strategy interpretation with an adjustable payoff matrix, backend-driven simulations, and real-time dashboards/insights.

**Planned changes:**
- Create a responsive single-page layout with navigation to: Hero, Concepts, Payoff Matrix, Simulation, Dashboard, Business Applications, Insights & Analysis, and an optional Business Analytics Mode.
- Apply a consistent professional corporate visual theme (not blue/purple-dominant) with subtle transitions/animations.
- Implement a Concepts section explaining Firm A/Firm B, Cooperate/Defect (price/profit framing), payoffs, dominant strategy, Nash equilibrium, and one-shot defection outcome.
- Build an interactive payoff matrix with editable inputs for all 8 payoff numbers, automatic detection/highlighting of dominant strategies and (when present) pure-strategy Nash equilibrium, plus a dynamic explanation box.
- Implement a backend simulation engine (Motoko) for one-shot and repeated games (1–100 rounds) with strategies: Always Cooperate, Always Defect, Tit-for-Tat, Random, Grim Trigger; expose Candid methods to read/update payoffs and run simulations.
- Create simulation controls in the frontend that call the backend and display per-round actions, round payoff, and cumulative profits.
- Add a real-time dashboard: cumulative profit line chart (two series), cooperation rate percentage, round history table, and a strategy comparison visualization.
- Add a Business Applications section covering oligopoly pricing wars, cartel instability, airline price competition, and telecom price undercutting, tying to trust and repeated interactions.
- Add an Insights & Analysis panel shown after completion with: identified Nash equilibrium (from current matrix), total profits comparison, whether cooperation was sustained (repeated), and a concise business-oriented interpretation.
- Add an optional “Business Analytics Mode” toggle to show/hide: payoff heatmap, expected value calculations (with stated assumptions), risk analysis, and one-shot vs repeated comparison view.
- Structure frontend into modular components (payoff matrix, simulation controls, backend API adapter, visualization, insights) with concise comments explaining payoff/strategy logic.

**User-visible outcome:** Users can navigate a single-page business-focused Prisoner’s Dilemma site, adjust payoffs, run one-shot or repeated simulations between selectable strategies via the backend, watch charts/tables update with results, and read business-oriented explanations, applications, and post-run insights (with optional analytics mode).
