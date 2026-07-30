/**
 * Beyond the Bend — Financial Projection Dashboard
 * Design: Wabi-Sabi Retreat — warm parchment, sage, blush, sand
 * Fonts: Playfair Display (headings) + Lato (body)
 * Purpose: Visual two-year financial projection for Laura Harvey
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// ─── Brand colours ───────────────────────────────────────────────────────────
const SAGE       = "#7A9E7E";
const BLUSH      = "#C9897A";
const SAND       = "#D4B896";
const WARM_TAN   = "#B8956A";
const SLATE      = "#6B7B8D";
const LAVENDER   = "#9B8EA8";
const LIGHT_SAGE = "#A8C9AB";
const CHARCOAL   = "#3A3530";
const CREAM      = "#F5F0E8";
const CREAM_DARK = "#EDE6D8";

// ─── Data ────────────────────────────────────────────────────────────────────
const months = [
  "Apr '26","May '26","Jun '26","Jul '26","Aug '26",
  "Sep '26","Oct '26","Nov '26","Dec '26",
  "Jan '27","Feb '27","Mar '27","Apr '27","May '27",
  "Jun '27","Jul '27","Aug '27","Sep '27","Oct '27",
  "Nov '27","Dec '27",
];

const rawData = [
  { studio:3500, stream:600,  sanctuary:0,    aqr:300, med:0,   ch:0,    ip:0,    aff:0   },
  { studio:3500, stream:700,  sanctuary:540,  aqr:120, med:0,   ch:0,    ip:0,    aff:0   },
  { studio:3500, stream:800,  sanctuary:756,  aqr:100, med:0,   ch:0,    ip:0,    aff:0   },
  { studio:0,    stream:900,  sanctuary:972,  aqr:100, med:200, ch:0,    ip:0,    aff:0   },
  { studio:0,    stream:1000, sanctuary:1188, aqr:100, med:300, ch:0,    ip:0,    aff:0   },
  { studio:3500, stream:1100, sanctuary:1404, aqr:100, med:300, ch:3925, ip:0,    aff:0   },
  { studio:3500, stream:1200, sanctuary:1674, aqr:120, med:350, ch:940,  ip:0,    aff:100 },
  { studio:3500, stream:1300, sanctuary:1944, aqr:120, med:350, ch:785,  ip:0,    aff:150 },
  { studio:0,    stream:1400, sanctuary:2214, aqr:120, med:400, ch:785,  ip:0,    aff:200 },
  { studio:3500, stream:1500, sanctuary:2538, aqr:120, med:400, ch:785,  ip:4440, aff:250 },
  { studio:3500, stream:1550, sanctuary:2862, aqr:120, med:450, ch:785,  ip:888,  aff:300 },
  { studio:3500, stream:1600, sanctuary:3186, aqr:120, med:450, ch:785,  ip:888,  aff:350 },
  { studio:3500, stream:1650, sanctuary:3564, aqr:120, med:500, ch:1570, ip:888,  aff:400 },
  { studio:3500, stream:1700, sanctuary:4144, aqr:120, med:500, ch:785,  ip:888,  aff:450 },
  { studio:3500, stream:1750, sanctuary:4536, aqr:120, med:550, ch:785,  ip:1110, aff:500 },
  { studio:2400, stream:1800, sanctuary:5104, aqr:120, med:600, ch:785,  ip:888,  aff:500 },
  { studio:2400, stream:1850, sanctuary:5452, aqr:120, med:650, ch:785,  ip:888,  aff:500 },
  { studio:2400, stream:1900, sanctuary:5940, aqr:120, med:700, ch:3140, ip:4440, aff:500 },
  { studio:2400, stream:1950, sanctuary:6240, aqr:120, med:750, ch:785,  ip:888,  aff:500 },
  { studio:2400, stream:2100, sanctuary:6758, aqr:120, med:800, ch:785,  ip:888,  aff:500 },
  { studio:0,    stream:2200, sanctuary:7068, aqr:120, med:850, ch:785,  ip:888,  aff:500 },
];

const chartData = rawData.map((d, i) => {
  const total = d.studio + d.stream + d.sanctuary + d.aqr + d.med + d.ch + d.ip + d.aff;
  return { month: months[i], ...d, total };
});

// Cumulative
let running = 0;
const cumulativeData = chartData.map(d => {
  running += d.total;
  return { month: d.month, monthly: d.total, cumulative: running };
});

// Sanctuary members
const membersData = [
  0,20,28,36,44,52,62,72,82,94,106,118,132,148,162,176,188,198,208,218,228
].map((m, i) => ({ month: months[i], members: m }));

// 2027 pie
const pie2027 = [
  { name: "The Sanctuary",          value: 57392, color: BLUSH },
  { name: "Studio Classes",         value: 33000, color: SAGE  },
  { name: "Livestream",             value: 21550, color: SLATE },
  { name: "The Integration Process",value: 17982, color: LIGHT_SAGE },
  { name: "Coming Home Course",     value: 12560, color: WARM_TAN  },
  { name: "Meditation Bundle",      value: 7200,  color: LAVENDER  },
  { name: "Affiliates",             value: 5250,  color: CHARCOAL  },
  { name: "A Quiet Return",         value: 1440,  color: SAND      },
];

// Annual totals
const total2026 = chartData.slice(0,9).reduce((s,d)=>s+d.total,0);
const total2027 = chartData.slice(9).reduce((s,d)=>s+d.total,0);

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (v: number) => `$${v.toLocaleString("en-CA", { maximumFractionDigits: 0 })}`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: CREAM, border: `1px solid ${SAND}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: CHARCOAL }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 6 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill, margin: "2px 0" }}>
          {p.name}: <strong>{fmt(p.value)}</strong>
        </p>
      ))}
    </div>
  );
};

const STREAM_LABELS: Record<string, string> = {
  studio: "Studio Classes", stream: "Livestream", sanctuary: "The Sanctuary",
  aqr: "A Quiet Return", med: "Meditation Bundle", ch: "Coming Home",
  ip: "Integration Process", aff: "Affiliates",
};
const STREAM_COLORS: Record<string, string> = {
  studio: SAGE, stream: SLATE, sanctuary: BLUSH,
  aqr: SAND, med: LAVENDER, ch: WARM_TAN, ip: LIGHT_SAGE, aff: CHARCOAL,
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: CHARCOAL, marginBottom: 6, marginTop: 0 }}>
      {children}
    </h2>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 14,
      padding: "28px 32px",
      boxShadow: "0 2px 16px rgba(58,53,48,0.07)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function StatBox({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{
      background: color,
      borderRadius: 12,
      padding: "22px 24px",
      flex: 1,
      minWidth: 160,
      color: "#fff",
    }}>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, opacity: 0.88, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, opacity: 0.82, marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FinancialDashboard() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", fontFamily: "'Lato', sans-serif", color: CHARCOAL }}>

      {/* Header */}
      <div style={{ background: CHARCOAL, padding: "48px 40px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: SAND, marginBottom: 10 }}>
          Beyond the Bend
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#fff", margin: "0 0 10px", fontWeight: 400 }}>
          Two-Year Financial Projection
        </h1>
        <p style={{ color: "#b0a898", fontSize: 15, margin: 0 }}>April 2026 – December 2027 &nbsp;·&nbsp; All figures in Canadian dollars</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Headline stats ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
          <StatBox label="2026 Projected (Apr–Dec)" value={fmt(total2026)} sub="9-month foundation period" color={SAGE} />
          <StatBox label="2027 Projected (Full Year)" value={fmt(total2027)} sub="Exceeds $150K goal ✓" color={BLUSH} />
          <StatBox label="Two-Year Combined" value={fmt(total2026 + total2027)} sub="Apr 2026 – Dec 2027" color={WARM_TAN} />
          <StatBox label="Sanctuary by Dec '27" value="228 members" sub="$7,068/mo recurring" color={SLATE} />
        </div>

        {/* ── Monthly revenue stacked bar ── */}
        <Card style={{ marginBottom: 28 }}>
          <SectionTitle>Monthly Revenue by Income Stream</SectionTitle>
          <p style={{ fontSize: 14, color: "#7a7068", marginBottom: 20, marginTop: 4 }}>
            Each colour represents one income stream. The dashed line marks the 2026/2027 boundary. Notice how The Sanctuary (blush) grows steadily every month — that is your recurring foundation.
          </p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CREAM_DARK} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHARCOAL }} angle={-40} textAnchor="end" interval={0} />
              <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: CHARCOAL }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
              {(["studio","stream","sanctuary","aqr","med","ch","ip","aff"] as const).map(key => (
                <Bar key={key} dataKey={key} name={STREAM_LABELS[key]} stackId="a" fill={STREAM_COLORS[key]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* ── Cumulative trajectory ── */}
        <Card style={{ marginBottom: 28 }}>
          <SectionTitle>Cumulative Revenue Trajectory</SectionTitle>
          <p style={{ fontSize: 14, color: "#7a7068", marginBottom: 20, marginTop: 4 }}>
            The green area shows total revenue building over time. The dashed reference lines mark your $75K and $150K goals. You cross $75K cumulative around February 2027, and $150K around August 2027.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativeData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <defs>
                <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SAGE} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={SAGE} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CREAM_DARK} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHARCOAL }} angle={-40} textAnchor="end" interval={0} />
              <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: CHARCOAL }} />
              <Tooltip content={<CustomTooltip />} />
              {/* $75K reference */}
              <Line dataKey={() => 75000} stroke={WARM_TAN} strokeDasharray="5 4" strokeWidth={1.5} dot={false} name="$75K Goal" legendType="none" />
              {/* $150K reference */}
              <Line dataKey={() => 150000} stroke={BLUSH} strokeDasharray="5 4" strokeWidth={1.5} dot={false} name="$150K Goal" legendType="none" />
              <Area type="monotone" dataKey="cumulative" stroke={SAGE} strokeWidth={2.5} fill="url(#cumulGrad)" name="Cumulative Revenue" dot={{ r: 3, fill: SAGE }} />
              <Line type="monotone" dataKey="monthly" stroke={BLUSH} strokeWidth={2} strokeDasharray="4 3" dot={false} name="Monthly Revenue" />
              <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            </AreaChart>
          </ResponsiveContainer>
          {/* Goal labels */}
          <div style={{ display: "flex", gap: 20, marginTop: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <div style={{ width: 28, height: 2, background: WARM_TAN, borderTop: `2px dashed ${WARM_TAN}` }} />
              <span style={{ color: WARM_TAN, fontWeight: 600 }}>$75K goal — crossed ~Feb 2027</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <div style={{ width: 28, height: 2, background: BLUSH, borderTop: `2px dashed ${BLUSH}` }} />
              <span style={{ color: BLUSH, fontWeight: 600 }}>$150K goal — crossed ~Aug 2027</span>
            </div>
          </div>
        </Card>

        {/* ── Two columns: pie + sanctuary growth ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>

          {/* Pie */}
          <Card>
            <SectionTitle>2027 Income Mix</SectionTitle>
            <p style={{ fontSize: 14, color: "#7a7068", marginBottom: 16, marginTop: 4 }}>
              By end of 2027, only 21% of income comes from in-person classes. The rest is digital and location-independent.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pie2027} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                  label={({ name, percent }) => percent > 0.05 ? `${(percent*100).toFixed(0)}%` : ""}
                  labelLine={false}>
                  {pie2027.map((entry, i) => <Cell key={i} fill={entry.color} stroke={CREAM} strokeWidth={2} />)}
                </Pie>
                <Tooltip formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginTop: 8 }}>
              {pie2027.map(d => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ color: CHARCOAL }}>{d.name}</span>
                  <span style={{ color: "#9a8f85", fontWeight: 600 }}>{fmt(d.value)}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sanctuary growth */}
          <Card>
            <SectionTitle>Sanctuary Membership Growth</SectionTitle>
            <p style={{ fontSize: 14, color: "#7a7068", marginBottom: 16, marginTop: 4 }}>
              Launches May 2026 with ~20 founding members. Reaches 100 members by January 2027. Grows to 228 by December 2027.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={membersData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="membGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BLUSH} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BLUSH} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={CREAM_DARK} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: CHARCOAL }} angle={-40} textAnchor="end" interval={1} />
                <YAxis tick={{ fontSize: 11, fill: CHARCOAL }} />
                <Tooltip content={<CustomTooltip />} />
                {/* 100-member reference */}
                <Line dataKey={() => 100} stroke={SAGE} strokeDasharray="5 4" strokeWidth={1.5} dot={false} name="100 members" legendType="none" />
                <Area type="monotone" dataKey="members" stroke={BLUSH} strokeWidth={2.5} fill="url(#membGrad)" name="Active Members" dot={{ r: 3, fill: BLUSH }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginTop: 8 }}>
              <div style={{ width: 28, height: 2, background: SAGE, borderTop: `2px dashed ${SAGE}` }} />
              <span style={{ color: SAGE, fontWeight: 600 }}>100-member milestone — reached Jan 2027</span>
            </div>
          </Card>
        </div>

        {/* ── Monthly table ── */}
        <Card style={{ marginBottom: 28 }}>
          <SectionTitle>Month-by-Month Breakdown</SectionTitle>
          <p style={{ fontSize: 14, color: "#7a7068", marginBottom: 20, marginTop: 4 }}>
            Every income stream, every month. Rows highlighted in sage are 2026; blush are 2027.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: CHARCOAL, color: "#fff" }}>
                  {["Month","Studio","Livestream","Sanctuary","A Quiet Return","Med Bundle","Coming Home","Integration","Affiliates","Total"].map(h => (
                    <th key={h} style={{ padding: "10px 10px", textAlign: h === "Month" ? "left" : "right", fontFamily: "'Lato', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.map((d, i) => {
                  const is2026 = i < 9;
                  const isAnnual = false;
                  return (
                    <tr key={d.month} style={{ background: i % 2 === 0 ? (is2026 ? "#f0ede6" : "#f5eeec") : "#fff", borderBottom: `1px solid ${CREAM_DARK}` }}>
                      <td style={{ padding: "9px 10px", fontWeight: 600, color: is2026 ? SAGE : BLUSH, whiteSpace: "nowrap" }}>{d.month}</td>
                      {[d.studio,d.stream,d.sanctuary,d.aqr,d.med,d.ch,d.ip,d.aff].map((v, j) => (
                        <td key={j} style={{ padding: "9px 10px", textAlign: "right", color: v === 0 ? "#ccc" : CHARCOAL }}>
                          {v === 0 ? "—" : fmt(v)}
                        </td>
                      ))}
                      <td style={{ padding: "9px 10px", textAlign: "right", fontWeight: 700, color: CHARCOAL }}>{fmt(d.total)}</td>
                    </tr>
                  );
                })}
                {/* 2026 subtotal */}
                <tr style={{ background: SAGE, color: "#fff" }}>
                  <td style={{ padding: "10px 10px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>2026 Total</td>
                  {[21000,9000,10692,1180,1900,6435,0,450].map((v,j) => (
                    <td key={j} style={{ padding: "10px 10px", textAlign: "right", fontWeight: 600 }}>{v === 0 ? "—" : fmt(v)}</td>
                  ))}
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, fontSize: 15 }}>{fmt(total2026)}</td>
                </tr>
                {/* 2027 subtotal */}
                <tr style={{ background: BLUSH, color: "#fff" }}>
                  <td style={{ padding: "10px 10px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>2027 Total</td>
                  {[33000,21550,57392,1440,7200,12560,17982,5250].map((v,j) => (
                    <td key={j} style={{ padding: "10px 10px", textAlign: "right", fontWeight: 600 }}>{fmt(v)}</td>
                  ))}
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, fontSize: 15 }}>{fmt(total2027)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Key assumptions ── */}
        <Card>
          <SectionTitle>Key Assumptions & What Would Change These Numbers</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: SAGE, marginBottom: 10, marginTop: 0 }}>What the model assumes</h3>
              {[
                ["Sanctuary launch", "May 2026 — founding cohort from email list"],
                ["Founding members", "~20 (10% of 200-person list)"],
                ["Sanctuary growth", "8 new/mo in 2026, 12 new/mo in 2027"],
                ["Sanctuary price", "$27/mo founding, rising to $32 avg by end 2027"],
                ["Coming Home launch", "September 2026 — live cohort of 25 × $157"],
                ["Integration Process", "January 2027 — live cohort of 20 × $222"],
                ["Studio classes", "5/wk Spring + Fall 2026; 3–4/wk from Jul 2027"],
                ["Meditation bundle", "July 2026 — 5-pack at $37"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: WARM_TAN, fontWeight: 700, minWidth: 140, flexShrink: 0 }}>{k}</span>
                  <span style={{ color: "#6b6058" }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: BLUSH, marginBottom: 10, marginTop: 0 }}>The single biggest lever</h3>
              <p style={{ fontSize: 13, color: "#6b6058", lineHeight: 1.7, marginBottom: 16 }}>
                The difference between 8 new Sanctuary members per month and 15 per month is approximately <strong>$30,000 in additional 2027 revenue</strong>. That growth comes from your newsletter and Substack — which is why consistent, quality writing is the most important business activity you can do.
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: BLUSH, marginBottom: 10, marginTop: 0 }}>Most vulnerable period</h3>
              <p style={{ fontSize: 13, color: "#6b6058", lineHeight: 1.7 }}>
                July and August 2026 — studio classes are on break and digital income is still small (~$2,200–$2,600/mo). Use this time to record course content, not worry about revenue. It is the investment period.
              </p>
            </div>
          </div>
        </Card>

        <p style={{ textAlign: "center", fontSize: 12, color: "#b0a898", marginTop: 32 }}>
          Prepared by Manus AI · March 2026 · All projections are estimates based on modelled assumptions and should not be treated as guaranteed outcomes.
        </p>
      </div>
    </div>
  );
}
