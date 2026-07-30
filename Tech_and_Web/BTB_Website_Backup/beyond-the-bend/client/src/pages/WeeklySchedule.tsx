/**
 * Beyond the Bend — Weekly Schedule Visual Dashboard
 * Design: Wabi-Sabi Retreat — warm parchment, sage, blush, Playfair Display + Lato
 * Purpose: Visual overview of Laura's weekly rhythm — teaching, business, personal
 */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type BlockType = "teaching" | "business-writing" | "business-editing" | "business-light" | "client" | "personal" | "protected" | "recording" | "launch";

interface TimeBlock {
  start: number; // decimal hours, e.g. 8.0, 10.5
  end: number;
  label: string;
  sublabel?: string;
  type: BlockType;
}

const SCHEDULE: Record<string, TimeBlock[]> = {
  Monday: [
    { start: 8, end: 12, label: "Writing Block", sublabel: "Newsletter · Substack · Course PDFs", type: "business-writing" },
    { start: 12, end: 13, label: "Lunch", type: "personal" },
    { start: 13, end: 17, label: "Writing / Planning", sublabel: "Content · Strategy · Admin", type: "business-writing" },
    { start: 18, end: 19.25, label: "Somatic Vinyasa", sublabel: "Studio + Livestream", type: "teaching" },
    { start: 19.25, end: 21, label: "Wind Down", sublabel: "No screens after 8:30 PM", type: "protected" },
  ],
  Tuesday: [
    { start: 8, end: 9.5, label: "Morning Prep", sublabel: "Light admin · emails", type: "business-light" },
    { start: 10, end: 11.25, label: "Rise and Restore", sublabel: "Studio + Livestream", type: "teaching" },
    { start: 11.25, end: 13.5, label: "Post-Class Admin", sublabel: "Light tasks only", type: "business-light" },
    { start: 13.5, end: 17.5, label: "Rest / Personal", sublabel: "Two classes today — protect this time", type: "personal" },
    { start: 18, end: 19.25, label: "Restore and Reclaim", sublabel: "Studio + Livestream", type: "teaching" },
    { start: 19.25, end: 21, label: "Rest", sublabel: "No business work tonight", type: "protected" },
  ],
  Wednesday: [
    { start: 8, end: 9.5, label: "Morning Prep", type: "business-light" },
    { start: 10, end: 11.25, label: "Somatic Hatha", sublabel: "Studio + Livestream", type: "teaching" },
    { start: 11.25, end: 13, label: "Recovery + Lunch", type: "personal" },
    { start: 13, end: 17, label: "Protected Personal Time", sublabel: "Son · Family · Rest", type: "protected" },
    { start: 17.5, end: 18.5, label: "Embodied Flow", sublabel: "Studio Only", type: "teaching" },
    { start: 18.5, end: 21, label: "Rest", type: "personal" },
  ],
  Thursday: [
    { start: 8, end: 12, label: "🎬 RECORDING BLOCK", sublabel: "Course content — sacred, do not book", type: "recording" },
    { start: 12, end: 13, label: "Lunch + Break", type: "personal" },
    { start: 13, end: 15, label: "Editing Block", sublabel: "Descript · previous week's recording", type: "business-editing" },
    { start: 15, end: 15.5, label: "Client: Angelina", sublabel: "Private session", type: "client" },
    { start: 16.5, end: 21, label: "Evening Group", sublabel: "Out for the night", type: "personal" },
  ],
  Friday: [
    { start: 8, end: 12, label: "Editing + Uploading", sublabel: "Descript · Podia · Sanctuary library", type: "business-editing" },
    { start: 12, end: 14, label: "Lunch + Rest", type: "personal" },
    { start: 14, end: 15, label: "Client: Angelina", sublabel: "Private session", type: "client" },
    { start: 15, end: 21, label: "Weekend Begins", sublabel: "Protect this time", type: "protected" },
  ],
  Saturday: [
    { start: 9, end: 12, label: "Writing Block", sublabel: "PDFs · Sales copy · Launch emails", type: "business-writing" },
    { start: 12, end: 21, label: "Personal Time", sublabel: "Close the laptop at noon", type: "personal" },
  ],
  Sunday: [
    { start: 8, end: 17, label: "Rest + Personal", sublabel: "No business work", type: "protected" },
    { start: 17, end: 20, label: "Family Dinner", sublabel: "Non-negotiable ♥", type: "protected" },
    { start: 20, end: 21, label: "Rest", type: "personal" },
  ],
};

const TYPE_STYLES: Record<BlockType, { bg: string; border: string; text: string; dot: string }> = {
  teaching:          { bg: "bg-[#8B9E7A]/20",  border: "border-[#8B9E7A]",  text: "text-[#4a5e3a]", dot: "bg-[#8B9E7A]" },
  recording:         { bg: "bg-[#c17b4e]/20",  border: "border-[#c17b4e]",  text: "text-[#7a3e18]", dot: "bg-[#c17b4e]" },
  "business-writing":{ bg: "bg-[#b8a99a]/20",  border: "border-[#b8a99a]",  text: "text-[#6b4f3a]", dot: "bg-[#b8a99a]" },
  "business-editing":{ bg: "bg-[#d4b8a8]/20",  border: "border-[#d4b8a8]",  text: "text-[#7a5040]", dot: "bg-[#d4b8a8]" },
  "business-light":  { bg: "bg-[#e8ddd5]/40",  border: "border-[#c8b8ae]",  text: "text-[#8a6858]", dot: "bg-[#c8b8ae]" },
  client:            { bg: "bg-[#c4a882]/20",  border: "border-[#c4a882]",  text: "text-[#7a5830]", dot: "bg-[#c4a882]" },
  personal:          { bg: "bg-[#f0ebe5]/60",  border: "border-[#d8cfc8]",  text: "text-[#9a8878]", dot: "bg-[#d8cfc8]" },
  protected:         { bg: "bg-[#e8d5d5]/40",  border: "border-[#c8a8a8]",  text: "text-[#8a5858]", dot: "bg-[#c8a8a8]" },
  launch:            { bg: "bg-[#7a8e9e]/20",  border: "border-[#7a8e9e]",  text: "text-[#3a5060]", dot: "bg-[#7a8e9e]" },
};

const LEGEND: { type: BlockType; label: string }[] = [
  { type: "teaching",           label: "Teaching (Studio + Livestream)" },
  { type: "recording",          label: "Recording Block (Sacred)" },
  { type: "business-writing",   label: "Business: Writing" },
  { type: "business-editing",   label: "Business: Editing + Uploading" },
  { type: "business-light",     label: "Business: Light Admin" },
  { type: "client",             label: "Private Client (Angelina)" },
  { type: "protected",          label: "Protected / Rest" },
  { type: "personal",           label: "Personal Time" },
];

const DAY_SUMMARIES: Record<string, { hours: string; focus: string }> = {
  Monday:    { hours: "~6 hrs business", focus: "Writing" },
  Tuesday:   { hours: "~2 hrs business", focus: "Light admin only" },
  Wednesday: { hours: "~1 hr business",  focus: "Minimal — 3 teaching days" },
  Thursday:  { hours: "~6 hrs business", focus: "Recording + Editing" },
  Friday:    { hours: "~4 hrs business", focus: "Editing + Uploading" },
  Saturday:  { hours: "~3 hrs business", focus: "Writing" },
  Sunday:    { hours: "0 hrs business",  focus: "Rest + Family" },
};

const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;

function formatTime(decimal: number): string {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}${m > 0 ? `:${m.toString().padStart(2, "0")}` : ""} ${period}`;
}

function BlockItem({ block, totalHours }: { block: TimeBlock; totalHours: number }) {
  const style = TYPE_STYLES[block.type];
  const heightPct = ((block.end - block.start) / totalHours) * 100;
  const topPct = ((block.start - START_HOUR) / totalHours) * 100;
  const minHeight = 3.5; // rem

  return (
    <div
      className={`absolute left-0 right-0 mx-0.5 rounded border-l-2 px-1.5 py-1 overflow-hidden ${style.bg} ${style.border}`}
      style={{
        top: `${topPct}%`,
        height: `max(${heightPct}%, ${minHeight}rem)`,
      }}
    >
      <p className={`text-[10px] font-semibold leading-tight ${style.text} font-['Lato',sans-serif]`}>
        {block.label}
      </p>
      {block.sublabel && heightPct > 6 && (
        <p className={`text-[9px] leading-tight mt-0.5 opacity-80 ${style.text} font-['Lato',sans-serif]`}>
          {block.sublabel}
        </p>
      )}
      {heightPct > 10 && (
        <p className={`text-[9px] mt-1 opacity-60 ${style.text} font-['Lato',sans-serif]`}>
          {formatTime(block.start)} – {formatTime(block.end)}
        </p>
      )}
    </div>
  );
}

export default function WeeklySchedule() {
  const hourMarkers = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: "linear-gradient(160deg, #f5f0ea 0%, #ede6dc 50%, #e8ddd5 100%)" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B9E7A] font-['Lato',sans-serif] mb-2">
          Beyond the Bend
        </p>
        <h1
          className="text-3xl md:text-4xl text-[#3d3530] mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your Weekly Rhythm
        </h1>
        <p className="text-sm text-[#7a6858] font-['Lato',sans-serif] max-w-xl">
          A visual map of your week — teaching, business, clients, and protected personal time.
          Approximately <strong>22–23 hours</strong> of business work per week, distributed across the windows that genuinely exist.
        </p>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap gap-2">
          {LEGEND.map(({ type, label }) => {
            const s = TYPE_STYLES[type];
            return (
              <div key={type} className="flex items-center gap-1.5 text-[10px] font-['Lato',sans-serif] text-[#6b5848]">
                <span className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${s.dot}`} />
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Summary Cards */}
      <div className="max-w-7xl mx-auto mb-6 grid grid-cols-7 gap-1.5">
        {DAYS.map((day) => {
          const summary = DAY_SUMMARIES[day];
          const isRestDay = day === "Sunday";
          return (
            <div
              key={day}
              className={`rounded-lg p-2 text-center border ${isRestDay ? "border-[#c8a8a8] bg-[#f5eded]" : "border-[#d8cfc8] bg-white/50"}`}
            >
              <p
                className="text-xs font-semibold text-[#3d3530] mb-0.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {day.slice(0, 3)}
              </p>
              <p className="text-[9px] text-[#8B9E7A] font-['Lato',sans-serif] font-semibold">{summary.hours}</p>
              <p className="text-[9px] text-[#9a8878] font-['Lato',sans-serif] mt-0.5">{summary.focus}</p>
            </div>
          );
        })}
      </div>

      {/* Main Calendar Grid */}
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Day headers */}
          <div className="grid grid-cols-[3rem_repeat(7,1fr)] gap-1 mb-1">
            <div />
            {DAYS.map((day) => (
              <div key={day} className="text-center">
                <p
                  className="text-xs font-semibold text-[#3d3530]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {day}
                </p>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-[3rem_repeat(7,1fr)] gap-1">
            {/* Hour markers */}
            <div className="relative" style={{ height: `${TOTAL_HOURS * 4}rem` }}>
              {hourMarkers.map((h) => (
                <div
                  key={h}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%` }}
                >
                  <span className="text-[9px] text-[#b0a090] font-['Lato',sans-serif] leading-none pr-1 w-full text-right">
                    {h > 12 ? `${h - 12}pm` : h === 12 ? "12pm" : `${h}am`}
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="relative rounded-lg border border-[#d8cfc8]/60 bg-white/30"
                style={{ height: `${TOTAL_HOURS * 4}rem` }}
              >
                {/* Hour grid lines */}
                {hourMarkers.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-[#d8cfc8]/40"
                    style={{ top: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%` }}
                  />
                ))}

                {/* Time blocks */}
                {SCHEDULE[day].map((block, i) => (
                  <BlockItem key={i} block={block} totalHours={TOTAL_HOURS} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Hours Summary */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#d8cfc8] bg-white/50 p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B9E7A] font-['Lato',sans-serif] mb-2">
            Total Business Hours
          </p>
          <p
            className="text-4xl text-[#3d3530] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            22–23
          </p>
          <p className="text-xs text-[#9a8878] font-['Lato',sans-serif]">hours per week available for business work</p>
        </div>

        <div className="rounded-xl border border-[#d8cfc8] bg-white/50 p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B9E7A] font-['Lato',sans-serif] mb-2">
            Teaching Hours
          </p>
          <p
            className="text-4xl text-[#3d3530] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            6.25
          </p>
          <p className="text-xs text-[#9a8878] font-['Lato',sans-serif]">hours per week in studio + livestream classes</p>
        </div>

        <div className="rounded-xl border border-[#c8a8a8] bg-[#f8f0f0]/50 p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#c8a8a8] font-['Lato',sans-serif] mb-2">
            Protected Time
          </p>
          <p
            className="text-4xl text-[#6a3a3a] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sunday
          </p>
          <p className="text-xs text-[#9a7878] font-['Lato',sans-serif]">is fully off — family dinner is non-negotiable</p>
        </div>
      </div>

      {/* The One Rule */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="rounded-xl border border-[#c17b4e]/40 bg-[#c17b4e]/10 p-5">
          <p
            className="text-base text-[#7a3e18] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The One Rule
          </p>
          <p className="text-sm text-[#8a5030] font-['Lato',sans-serif]">
            <strong>Thursday morning recording blocks are the only thing that cannot slip.</strong> Everything else — editing, writing, uploading — can be pushed a week if life intervenes. One missed recording day means one missed module, which moves the July 1st launch date. Protect Thursdays above everything else.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-xs text-[#b0a090] font-['Lato',sans-serif]">
          Beyond the Bend · Laura Harvey · Updated March 2026
        </p>
      </div>
    </div>
  );
}
