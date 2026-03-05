import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Share2, Check, Plus, Trash2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* ─── types ─── */
interface SubjectModule {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
}
interface Subject {
  name: string;
  modules: SubjectModule[];
}
interface FormData {
  name: string;
  className: string;
  division: string;
  institution: string;
  rollNo: string;
  subjects: Subject[];
  startTime: string;
  endTime: string;
  includeBreaks: boolean;
  breakDuration: number;
  minStudyDuration: number;
}

const DIFFICULTY_WEIGHT: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };

const defaultForm: FormData = {
  name: "",
  className: "",
  division: "",
  institution: "",
  rollNo: "",
  subjects: [{ name: "", modules: [{ name: "", difficulty: "Medium" }] }],
  startTime: "08:00",
  endTime: "17:00",
  includeBreaks: true,
  breakDuration: 10,
  minStudyDuration: 60,
};

/* ─── helpers ─── */
const timeToMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const minToTime = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

interface TimetableRow {
  module: string;
  subject: string;
  difficulty: string;
  start: string;
  end: string;
  duration: number;
}

function generateTimetable(data: FormData): TimetableRow[] {
  const totalMin = timeToMin(data.endTime) - timeToMin(data.startTime);
  if (totalMin <= 0) return [];

  // Collect all modules
  const allModules: { module: string; subject: string; difficulty: string; weight: number }[] = [];
  data.subjects.forEach((s) =>
    s.modules.forEach((m) =>
      allModules.push({ module: m.name || "Untitled", subject: s.name || "Untitled", difficulty: m.difficulty, weight: DIFFICULTY_WEIGHT[m.difficulty] })
    )
  );
  if (allModules.length === 0) return [];

  const totalWeight = allModules.reduce((a, b) => a + b.weight, 0);

  // Calculate break time
  const breakCount = data.includeBreaks ? Math.max(0, allModules.length - 1) : 0;
  const totalBreakMin = breakCount * data.breakDuration;
  const studyMin = Math.max(totalMin - totalBreakMin, allModules.length * 10);

  let cursor = timeToMin(data.startTime);
  const rows: TimetableRow[] = [];

  allModules.forEach((mod, i) => {
    const rawDuration = Math.round((mod.weight / totalWeight) * studyMin);
    const duration = Math.max(rawDuration, 10);
    rows.push({
      module: mod.module,
      subject: mod.subject,
      difficulty: mod.difficulty,
      start: minToTime(cursor),
      end: minToTime(cursor + duration),
      duration,
    });
    cursor += duration;
    if (data.includeBreaks && i < allModules.length - 1) {
      cursor += data.breakDuration;
    }
  });

  return rows;
}

/* ─── step components ─── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [timetable, setTimetable] = useState<TimetableRow[]>([]);
  const [fileName, setFileName] = useState("StudyAI_Timetable");
  const tableRef = useRef<HTMLDivElement>(null);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const validate = useCallback((): string[] => {
    const errs: string[] = [];
    if (step === 0) {
      if (!form.name.trim()) errs.push("Name is required");
      if (!form.institution.trim()) errs.push("Institution is required");
    }
    if (step === 1) {
      if (form.subjects.length === 0) errs.push("Add at least one subject");
      form.subjects.forEach((s, i) => {
        if (!s.name.trim()) errs.push(`Subject ${i + 1} name is required`);
        if (s.modules.length === 0) errs.push(`Subject ${i + 1} needs at least one module`);
        s.modules.forEach((m, j) => {
          if (!m.name.trim()) errs.push(`Subject ${i + 1}, Module ${j + 1} name is required`);
        });
      });
      const totalMin = timeToMin(form.endTime) - timeToMin(form.startTime);
      if (totalMin < 30) errs.push("Study duration must be at least 30 minutes");
      if (totalMin <= 0) errs.push("End time must be after start time");
    }
    return errs;
  }, [step, form]);

  const next = () => {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    if (step === 1) {
      setTimetable(generateTimetable(form));
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const prev = () => {
    setErrors([]);
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const finish = () => navigate("/");

  const updateField = (field: keyof FormData, value: any) =>
    setForm((f) => ({ ...f, [field]: value }));

  const addSubject = () =>
    setForm((f) => ({
      ...f,
      subjects: [...f.subjects, { name: "", modules: [{ name: "", difficulty: "Medium" }] }],
    }));

  const removeSubject = (idx: number) =>
    setForm((f) => ({ ...f, subjects: f.subjects.filter((_, i) => i !== idx) }));

  const updateSubject = (idx: number, name: string) =>
    setForm((f) => ({
      ...f,
      subjects: f.subjects.map((s, i) => (i === idx ? { ...s, name } : s)),
    }));

  const addModule = (sIdx: number) =>
    setForm((f) => ({
      ...f,
      subjects: f.subjects.map((s, i) =>
        i === sIdx ? { ...s, modules: [...s.modules, { name: "", difficulty: "Medium" }] } : s
      ),
    }));

  const removeModule = (sIdx: number, mIdx: number) =>
    setForm((f) => ({
      ...f,
      subjects: f.subjects.map((s, i) =>
        i === sIdx ? { ...s, modules: s.modules.filter((_, j) => j !== mIdx) } : s
      ),
    }));

  const updateModule = (sIdx: number, mIdx: number, field: "name" | "difficulty", value: string) =>
    setForm((f) => ({
      ...f,
      subjects: f.subjects.map((s, i) =>
        i === sIdx
          ? {
              ...s,
              modules: s.modules.map((m, j) => (j === mIdx ? { ...m, [field]: value } : m)),
            }
          : s
      ),
    }));

  /* ─── download ─── */
  const downloadAs = async (format: string) => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current, { backgroundColor: "#0a0a0a", scale: 2 });
    if (format === "pdf") {
      const pdf = new jsPDF("l", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save(`${fileName}.pdf`);
    } else {
      const link = document.createElement("a");
      link.download = `${fileName}.${format}`;
      link.href = canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : format}`);
      link.click();
    }
  };

  const shareTable = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current, { backgroundColor: "#0a0a0a", scale: 2 });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `${fileName}.png`, { type: "image/png" });
      if (navigator.share) {
        try {
          await navigator.share({ files: [file], title: "StudyAI Timetable" });
        } catch {}
      } else {
        // fallback: download
        downloadAs("png");
      }
    });
  };

  /* ─── input style ─── */
  const inputClass =
    "w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";
  const labelClass = "mb-1 block text-xs font-mono text-muted-foreground";

  return (
    <div className="relative z-10 container mx-auto px-6 py-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center justify-between">
        <h1 className="font-mono text-3xl font-bold gradient-text text-glow">StudyAI</h1>
        <span className="rounded-full border border-glow/30 px-4 py-1 text-xs font-mono text-primary">Adaptive Study Orchestrator</span>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-muted-foreground font-mono">
          Step {step + 1} / {totalSteps}
        </p>
      </motion.div>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
            {errors.map((e) => (
              <p key={e} className="text-xs text-destructive">{e}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps */}
      <div className="glass rounded-2xl p-8 min-h-[400px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            {/* Step 0: Basic Details */}
            {step === 0 && (
              <div className="space-y-4 max-w-lg mx-auto">
                <h2 className="font-mono text-lg font-bold text-foreground mb-4">Basic Details</h2>
                {[
                  { label: "Name", field: "name" as const, placeholder: "Your full name" },
                  { label: "Class", field: "className" as const, placeholder: "e.g. 12th" },
                  { label: "Division", field: "division" as const, placeholder: "e.g. A" },
                  { label: "Institution", field: "institution" as const, placeholder: "Your institution" },
                  { label: "Roll No.", field: "rollNo" as const, placeholder: "e.g. 42" },
                ].map((f) => (
                  <div key={f.field}>
                    <label className={labelClass}>{f.label}</label>
                    <input
                      className={inputClass}
                      placeholder={f.placeholder}
                      value={(form as any)[f.field]}
                      onChange={(e) => updateField(f.field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Subjects & Modules */}
            {step === 1 && (
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="font-mono text-lg font-bold text-foreground mb-2">Subjects & Modules</h2>

                {form.subjects.map((subj, sIdx) => (
                  <motion.div key={sIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        className={inputClass}
                        placeholder={`Subject ${sIdx + 1} name`}
                        value={subj.name}
                        onChange={(e) => updateSubject(sIdx, e.target.value)}
                      />
                      {form.subjects.length > 1 && (
                        <button onClick={() => removeSubject(sIdx)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {subj.modules.map((mod, mIdx) => (
                      <div key={mIdx} className="ml-4 flex items-center gap-2">
                        <input
                          className={inputClass + " flex-1 min-w-0"}
                          placeholder={`Module ${mIdx + 1}`}
                          value={mod.name}
                          onChange={(e) => updateModule(sIdx, mIdx, "name", e.target.value)}
                        />
                        <select
                          className={inputClass + " w-20 shrink-0"}
                          value={mod.difficulty}
                          onChange={(e) => updateModule(sIdx, mIdx, "difficulty", e.target.value)}
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Med</option>
                          <option value="Hard">Hard</option>
                        </select>
                        {subj.modules.length > 1 && (
                          <button onClick={() => removeModule(sIdx, mIdx)} className="text-destructive/60 hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button onClick={() => addModule(sIdx)} className="ml-4 flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono">
                      <Plus className="h-3 w-3" /> Add Module
                    </button>
                  </motion.div>
                ))}

                <button onClick={addSubject} className="flex items-center gap-1 rounded-lg border border-dashed border-primary/40 px-4 py-2 text-sm text-primary hover:border-primary font-mono transition-colors">
                  <Plus className="h-4 w-4" /> Add Subject
                </button>

                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
                  <h3 className="font-mono text-sm font-semibold text-foreground">Schedule Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Start Time</label>
                      <input type="time" className={inputClass} value={form.startTime} onChange={(e) => updateField("startTime", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>End Time</label>
                      <input type="time" className={inputClass} value={form.endTime} onChange={(e) => updateField("endTime", e.target.value)} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="breaks" checked={form.includeBreaks} onChange={(e) => updateField("includeBreaks", e.target.checked)} className="accent-primary" />
                    <label htmlFor="breaks" className="text-sm text-foreground">Include breaks between modules</label>
                  </div>

                  {form.includeBreaks && (
                    <div>
                      <label className={labelClass}>Break Duration (minutes)</label>
                      <input type="number" className={inputClass + " w-32"} value={form.breakDuration} min={5} max={60} onChange={(e) => updateField("breakDuration", Number(e.target.value))} />
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Min Study Duration per Module (minutes)</label>
                    <input type="number" className={inputClass + " w-32"} value={form.minStudyDuration} min={10} max={180} onChange={(e) => updateField("minStudyDuration", Number(e.target.value))} />
                  </div>

                  <div className="mt-2 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground font-mono">
                    <p>Difficulty weights: Easy=1x, Medium=2x, Hard=3x</p>
                    <p>Time is distributed proportionally by difficulty.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Timetable */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-mono text-lg font-bold text-foreground mb-2">Your Timetable</h2>

                <div ref={tableRef} className="rounded-xl border border-border bg-card p-6 space-y-4">
                  {/* Header info */}
                  <div className="text-center space-y-1">
                    <p className="text-sm text-foreground font-semibold">{form.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {form.className && `Class: ${form.className}`} {form.division && `| Div: ${form.division}`} {form.institution && `| ${form.institution}`}
                    </p>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">#</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Subject</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Module</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Difficulty</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Start</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">End</th>
                          <th className="pb-2 font-mono text-xs text-primary">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timetable.map((row, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-border/50"
                          >
                            <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                            <td className="py-2 pr-4 text-foreground">{row.subject}</td>
                            <td className="py-2 pr-4 text-foreground">{row.module}</td>
                            <td className="py-2 pr-4">
                              <span className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                                row.difficulty === "Hard" ? "bg-destructive/20 text-destructive" :
                                row.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                                "bg-primary/20 text-primary"
                              }`}>
                                {row.difficulty}
                              </span>
                            </td>
                            <td className="py-2 pr-4 font-mono text-muted-foreground">{row.start}</td>
                            <td className="py-2 pr-4 font-mono text-muted-foreground">{row.end}</td>
                            <td className="py-2 font-mono text-muted-foreground">{row.duration}m</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {form.includeBreaks && (
                    <p className="text-xs text-muted-foreground">
                      ☕ {form.breakDuration} min break between each module
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      Generated: {new Date().toLocaleString()}
                    </p>
                    <p className="text-xs font-mono text-primary">StudyAI – CognifyAI</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Download & Share */}
            {step === 3 && (
              <div className="max-w-lg mx-auto space-y-6 text-center">
                <h2 className="font-mono text-lg font-bold text-foreground">Export & Share</h2>

                <div>
                  <label className={labelClass}>File Name</label>
                  <input
                    className={inputClass}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>

                {/* Hidden table for capture */}
                <div className="absolute -left-[9999px]">
                  <div ref={tableRef} className="rounded-xl border border-border bg-card p-6 space-y-4 min-w-[800px]">
                    <div className="text-center space-y-1">
                      <p className="text-sm text-foreground font-semibold">{form.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {form.className && `Class: ${form.className}`} {form.division && `| Div: ${form.division}`} {form.institution && `| ${form.institution}`}
                      </p>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">#</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Subject</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Module</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Difficulty</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">Start</th>
                          <th className="pb-2 pr-4 font-mono text-xs text-primary">End</th>
                          <th className="pb-2 font-mono text-xs text-primary">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timetable.map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                            <td className="py-2 pr-4 text-foreground">{row.subject}</td>
                            <td className="py-2 pr-4 text-foreground">{row.module}</td>
                            <td className="py-2 pr-4 text-foreground">{row.difficulty}</td>
                            <td className="py-2 pr-4 font-mono text-muted-foreground">{row.start}</td>
                            <td className="py-2 pr-4 font-mono text-muted-foreground">{row.end}</td>
                            <td className="py-2 font-mono text-muted-foreground">{row.duration}m</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">Generated: {new Date().toLocaleString()}</p>
                      <p className="text-xs font-mono text-primary">StudyAI – CognifyAI</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["png", "jpg", "jpeg", "pdf"].map((fmt) => (
                    <motion.button
                      key={fmt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => downloadAs(fmt)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm text-foreground transition-all hover:border-primary/50"
                    >
                      <Download className="h-4 w-4 text-primary" />
                      .{fmt.toUpperCase()}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={shareTable}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(145_80%_50%/0.3)]"
                >
                  <Share2 className="h-4 w-4" />
                  Share Timetable
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        {step > 0 ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={prev}
            className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-mono text-foreground hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </motion.button>
        ) : (
          <div />
        )}

        {step < totalSteps - 1 ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={next}
            className="flex items-center gap-1 rounded-lg bg-primary px-6 py-2 text-sm font-mono font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(145_80%_50%/0.3)]"
          >
            Next <ChevronRight className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={finish}
            className="flex items-center gap-1 rounded-lg bg-primary px-6 py-2 text-sm font-mono font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(145_80%_50%/0.3)]"
          >
            <Check className="h-4 w-4" /> Finish
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Explore;
