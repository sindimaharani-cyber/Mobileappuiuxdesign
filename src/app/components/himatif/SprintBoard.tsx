import { useState } from 'react';
import { Plus, Clock, CheckCircle2, AlertCircle, Flame, ChevronRight, User2, Tag, X, Zap } from 'lucide-react';
import { UserRole } from '@/types';

interface SprintTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  points: number;
  tag: string;
  status: 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
}

const INITIAL_TASKS: SprintTask[] = [
  { id: 't1', title: 'Implementasi modul autentikasi', description: 'Login, register, forgot password dengan Sanctum', assignee: 'Budi S.', priority: 'high', points: 8, tag: 'Backend', status: 'done' },
  { id: 't2', title: 'Desain UI Dashboard utama', description: 'Mobile-first responsive design dark mode', assignee: 'Dewi L.', priority: 'high', points: 5, tag: 'Frontend', status: 'done' },
  { id: 't3', title: 'API Manajemen Anggota', description: 'CRUD endpoint untuk data anggota HIMATIF', assignee: 'Budi S.', priority: 'medium', points: 5, tag: 'Backend', status: 'review' },
  { id: 't4', title: 'Fitur Forum Diskusi', description: 'Real-time chat antar divisi dengan channels', assignee: 'Andi R.', priority: 'medium', points: 8, tag: 'Feature', status: 'inprogress' },
  { id: 't5', title: 'Sistem Notifikasi Push', description: 'Notifikasi otomatis untuk kegiatan & pengumuman', assignee: 'Sindi M.', priority: 'high', points: 13, tag: 'Feature', status: 'inprogress' },
  { id: 't6', title: 'Modul Keuangan Transparan', description: 'Laporan pemasukan & pengeluaran dengan chart', assignee: 'Siti R.', priority: 'critical', points: 8, tag: 'Finance', status: 'todo' },
  { id: 't7', title: 'SCRUM Sprint tracking', description: 'Implementasi board SCRUM untuk monitoring development', assignee: 'Budi S.', priority: 'medium', points: 5, tag: 'SCRUM', status: 'todo' },
  { id: 't8', title: 'Sertifikat Digital generator', description: 'Generate PDF sertifikat kegiatan otomatis', assignee: 'Andi R.', priority: 'low', points: 3, tag: 'Feature', status: 'backlog' },
  { id: 't9', title: 'Database migration & seeder', description: 'Schema database lengkap dengan data dummy', assignee: 'Budi S.', priority: 'critical', points: 5, tag: 'Backend', status: 'done' },
  { id: 't10', title: 'Unit testing API endpoints', description: 'PHPUnit tests untuk semua API controller', assignee: 'Dewi L.', priority: 'medium', points: 8, tag: 'Testing', status: 'backlog' },
];

const COLUMNS = [
  { id: 'backlog', label: 'Backlog', icon: Clock, color: '#8899AA' },
  { id: 'todo', label: 'To Do', icon: AlertCircle, color: '#60A5FA' },
  { id: 'inprogress', label: 'In Progress', icon: Flame, color: '#FBC02D' },
  { id: 'review', label: 'Review', icon: Zap, color: '#A78BFA' },
  { id: 'done', label: 'Done', icon: CheckCircle2, color: '#34D399' },
];

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
  medium: { label: 'Medium', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
  high: { label: 'High', color: '#FBC02D', bg: 'rgba(251,192,45,0.12)' },
  critical: { label: 'Critical', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
};

const TAG_COLORS: Record<string, string> = {
  Backend: '#60A5FA', Frontend: '#A78BFA', Feature: '#34D399', Finance: '#FBC02D',
  SCRUM: '#F87171', Testing: '#FB923C',
};

interface Props { userRole: UserRole; }

export function SprintBoard({ userRole }: Props) {
  const [tasks, setTasks] = useState<SprintTask[]>(INITIAL_TASKS);
  const [activeCol, setActiveCol] = useState<string>('inprogress');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignee: '', priority: 'medium' as SprintTask['priority'], tag: 'Feature', points: 3 });

  const canEdit = userRole === 'admin' || userRole === 'ketua_divisi' || userRole === 'anggota';

  const moveTask = (taskId: string, newStatus: SprintTask['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task: SprintTask = {
      id: `t${Date.now()}`,
      title: newTask.title,
      description: 'Task baru dari Sprint Planning',
      assignee: newTask.assignee || 'Unassigned',
      priority: newTask.priority,
      points: newTask.points,
      tag: newTask.tag,
      status: 'backlog',
    };
    setTasks(prev => [...prev, task]);
    setShowAddModal(false);
    setNewTask({ title: '', assignee: '', priority: 'medium', tag: 'Feature', points: 3 });
  };

  const totalPoints = tasks.reduce((s, t) => s + t.points, 0);
  const donePoints = tasks.filter(t => t.status === 'done').reduce((s, t) => s + t.points, 0);
  const velocity = Math.round((donePoints / totalPoints) * 100);

  const colTasks = tasks.filter(t => t.status === activeCol);

  return (
    <div className="pb-24" style={{ minHeight: '100vh', background: '#060E1C' }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="font-bold text-white" style={{ fontSize: '18px' }}>SCRUM Sprint Board</h2>
            <p style={{ color: '#8899AA', fontSize: '12px' }}>Sprint 3 · 14 Jun – 28 Jun 2024</p>
          </div>
          {canEdit && (
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600 }}>
              <Plus size={14} /> Tambah Task
            </button>
          )}
        </div>

        {/* Sprint velocity */}
        <div className="mt-4 rounded-2xl p-4" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#8899AA', fontSize: '11px', fontWeight: 500 }}>SPRINT VELOCITY</p>
            <p style={{ color: '#FBC02D', fontSize: '11px', fontWeight: 700 }}>{donePoints}/{totalPoints} pts</p>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: '#112240', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '3px', width: `${velocity}%`, background: 'linear-gradient(90deg, #1565C0, #FBC02D)', transition: 'width 0.5s ease' }} />
          </div>
          <div className="flex justify-between mt-2">
            {COLUMNS.map(col => {
              const count = tasks.filter(t => t.status === col.id).length;
              const Icon = col.icon;
              return (
                <div key={col.id} className="flex items-center gap-1">
                  <Icon size={10} style={{ color: col.color }} />
                  <span style={{ color: col.color, fontSize: '10px', fontWeight: 600 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Column tabs */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {COLUMNS.map(col => {
          const count = tasks.filter(t => t.status === col.id).length;
          const isActive = activeCol === col.id;
          return (
            <button key={col.id} onClick={() => setActiveCol(col.id)}
              style={{ borderRadius: '10px', padding: '6px 12px', whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: isActive ? 700 : 400, background: isActive ? col.color : 'rgba(13,27,46,0.8)', color: isActive ? '#0A1D37' : '#8899AA', border: `1px solid ${isActive ? col.color : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s', flexShrink: 0 }}>
              {col.label} <span style={{ opacity: 0.8 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Tasks */}
      <div className="px-4 space-y-3">
        {colTasks.length === 0 && (
          <div className="rounded-2xl p-8 text-center" style={{ background: '#0D1B2E', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <CheckCircle2 size={32} style={{ color: '#8899AA', margin: '0 auto 8px' }} />
            <p style={{ color: '#8899AA', fontSize: '13px' }}>Tidak ada task di kolom ini</p>
          </div>
        )}
        {colTasks.map(task => {
          const p = PRIORITY_CONFIG[task.priority];
          const tagColor = TAG_COLORS[task.tag] || '#8899AA';
          const nextStatus = COLUMNS[COLUMNS.findIndex(c => c.id === task.status) + 1]?.id as SprintTask['status'];
          return (
            <div key={task.id} className="rounded-2xl p-4" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span style={{ fontSize: '10px', fontWeight: 700, borderRadius: '6px', padding: '2px 8px', background: `${tagColor}20`, color: tagColor }}>{task.tag}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, borderRadius: '6px', padding: '2px 8px', background: p.bg, color: p.color }}>{p.label}</span>
                </div>
                <span style={{ color: '#FBC02D', fontSize: '11px', fontWeight: 700, background: 'rgba(251,192,45,0.1)', padding: '2px 8px', borderRadius: '6px', flexShrink: 0 }}>{task.points} pts</span>
              </div>
              <h4 style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '13px', marginBottom: '4px', lineHeight: 1.4 }}>{task.title}</h4>
              <p style={{ color: '#8899AA', fontSize: '11px', marginBottom: '10px', lineHeight: 1.5 }}>{task.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User2 size={11} style={{ color: '#fff' }} />
                  </div>
                  <span style={{ color: '#8899AA', fontSize: '11px' }}>{task.assignee}</span>
                </div>
                {canEdit && nextStatus && (
                  <button onClick={() => moveTask(task.id, nextStatus)}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#1565C0', background: 'rgba(21,101,192,0.1)', border: '1px solid rgba(21,101,192,0.25)', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                    Move <ChevronRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-lg rounded-t-3xl p-6" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color: '#E8EDF5', fontWeight: 700, fontSize: '16px' }}>Tambah Task Baru</p>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8899AA' }}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'JUDUL TASK', key: 'title', placeholder: 'Deskripsi singkat task...' },
                { label: 'ASSIGNEE', key: 'assignee', placeholder: 'Nama pengerjaa...' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#8899AA', fontSize: '10px', fontWeight: 600, display: 'block', marginBottom: '5px' }}>{f.label}</label>
                  <input value={(newTask as any)[f.key]} onChange={e => setNewTask(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: '#8899AA', fontSize: '10px', fontWeight: 600, display: 'block', marginBottom: '5px' }}>PRIORITAS</label>
                  <select value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value as any }))}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif' }}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#8899AA', fontSize: '10px', fontWeight: 600, display: 'block', marginBottom: '5px' }}>STORY POINTS</label>
                  <select value={newTask.points} onChange={e => setNewTask(p => ({ ...p, points: Number(e.target.value) }))}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif' }}>
                    {[1,2,3,5,8,13,21].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={addTask} style={{ width: '100%', borderRadius: '12px', padding: '13px', fontWeight: 700, fontSize: '14px', background: 'linear-gradient(135deg, #1565C0, #0D47A1)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', marginTop: '4px' }}>
                Tambah ke Backlog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
