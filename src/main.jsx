import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Award, GraduationCap, Download, Share2, X, ArrowUpLeft, Sparkles, ShieldCheck, BookOpen, ChevronDown } from 'lucide-react';
import './style.css';

const certificates = [
  { id: 'KA-PY-001', name: 'Tarek Mohamed Matter', image: '/certificates/tarek-mohamed-matter.jpg', course: 'Python Programming Fundamentals', date: '2026' },
  { id: 'KA-PY-002', name: 'Mazen Mohamed Ahmed', image: '/certificates/mazen-mohamed-ahmed.jpg', course: 'Python Programming Fundamentals', date: '2026' },
  { id: 'KA-PY-003', name: 'Gamal Ahmed Mohamed', image: '/certificates/gamal-ahmed-mohamed.jpg', course: 'Python Programming Fundamentals', date: '2026' },
  { id: 'KA-PY-004', name: 'Jana Mohamed Ahmed', image: '/certificates/jana-mohamed-ahmed.jpg', course: 'Python Programming Fundamentals', date: '2026' },
  { id: 'KA-PY-005', name: 'Hamza Mohammed Ibrahim', image: '/certificates/hamza-mohammed-ibrahim.jpg', course: 'Python Programming Fundamentals', date: '2026' },
];

function App() {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('all');
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const filtered = useMemo(() => certificates.filter(c =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()) && (course === 'all' || c.course === course)
  ), [query, course]);

  const download = (item) => {
    const a = document.createElement('a'); a.href = item.image; a.download = `${item.name.replaceAll(' ', '-')}-Kernel-Academy-Certificate.jpg`; document.body.appendChild(a); a.click(); a.remove();
  };
  const share = async (item) => {
    const url = `${window.location.origin}${item.image}`;
    try {
      if (navigator.share) await navigator.share({ title: `Certificate - ${item.name}`, text: `Kernel Academy certificate for ${item.name}`, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2200); }
    } catch (e) { /* user cancelled sharing */ }
  };

  return <>
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Kernel Academy home">
        <div className="brand-mark"><BookOpen size={23}/><span>✦</span></div>
        <div><strong>Kernel</strong><small>ACADEMY</small></div>
      </a>
      <nav><a href="#certificates">الشهادات</a><a href="#about">عن الأكاديمية</a></nav>
      <a className="top-cta" href="#certificates">استعرض الشهادات <ArrowUpLeft size={16}/></a>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
        <div className="hero-content">
          <div className="eyebrow"><span/> KNOWLEDGE • SKILLS • ACHIEVEMENT</div>
          <div className="hero-emblem"><div className="emblem-inner"><BookOpen size={36}/><span>✦</span></div></div>
          <p className="hero-kicker">KERNEL ACADEMY PRESENTS</p>
          <h1>كل إنجاز<br/><em>يستحق التقدير.</em></h1>
          <p className="hero-desc">هنا نحتفي برحلة التعلّم، وبكل خطوة تحوّل المعرفة إلى مهارة والجهد إلى إنجاز.</p>
          <a className="hero-button" href="#certificates">اكتشف شهادات طلابنا <ArrowUpLeft size={18}/></a>
        </div>
        <div className="hero-side-note">EST. TO INSPIRE THE NEXT GENERATION</div>
        <div className="hero-bottom"><span>01 / ACHIEVEMENTS</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro" id="about">
        <div className="section-label"><span>01</span> OUR STUDENTS, OUR PRIDE</div>
        <div className="intro-row"><h2>خطوات صغيرة،<br/><em>إنجازات كبيرة.</em></h2><p>كل شهادة تحكي قصة طالب قرر يتعلم، ويجرب، ويطوّر من نفسه. نفخر بكل خريج من عائلة Kernel Academy.</p></div>
        <div className="stats">
          <div className="stat"><strong>{certificates.length.toString().padStart(2,'0')}</strong><span>شهادات معروضة</span></div>
          <div className="stat"><strong>01</strong><span>برنامج تدريبي</span></div>
          <div className="stat"><strong>100%</strong><span>فخر بإنجازات طلابنا</span></div>
          <div className="stat stat-icon"><Award size={34}/><span>تعلم يصنع الفرق</span></div>
        </div>
      </section>

      <section className="cert-section" id="certificates">
        <div className="section-label"><span>02</span> THE CERTIFICATE GALLERY</div>
        <div className="gallery-heading"><div><h2>شهادات <em>التخرج</em></h2><p>ابحث عن اسمك واستعرض شهادة إتمام الدورة الخاصة بك.</p></div><div className="gallery-count"><strong>{filtered.length.toString().padStart(2,'0')}</strong><span>RESULTS</span></div></div>
        <div className="toolbar">
          <label className="search-box"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث باسم الطالب..." /></label>
          <label className="filter-box"><span>البرنامج التدريبي</span><select value={course} onChange={e=>setCourse(e.target.value)}><option value="all">كل البرامج</option><option value="Python Programming Fundamentals">Python Programming Fundamentals</option></select><ChevronDown size={16}/></label>
        </div>
        {filtered.length ? <div className="cards">{filtered.map((item, index)=><article className="certificate-card" key={item.id} style={{'--delay': `${index * 70}ms`}}>
          <button className="thumb" onClick={()=>setSelected(item)} aria-label={`معاينة شهادة ${item.name}`}><img src={item.image} alt={`شهادة ${item.name}`} /><span className="view-overlay">معاينة الشهادة <ArrowUpLeft size={17}/></span><span className="serial">{item.id}</span></button>
          <div className="card-body"><div className="card-topline"><span className="verified"><ShieldCheck size={13}/> CERTIFICATE</span><span className="year">{item.date}</span></div><h3>{item.name}</h3><p>{item.course}</p><div className="card-actions"><button onClick={()=>setSelected(item)} className="view-btn">عرض الشهادة <ArrowUpLeft size={16}/></button><button className="icon-btn" onClick={()=>download(item)} title="تحميل الشهادة"><Download size={17}/></button><button className="icon-btn" onClick={()=>share(item)} title="مشاركة الشهادة"><Share2 size={17}/></button></div></div>
        </article>)}</div> : <div className="empty"><Search size={30}/><h3>لم نعثر على نتائج</h3><p>جرّب البحث باسم مختلف أو غيّر البرنامج التدريبي.</p><button onClick={()=>{setQuery('');setCourse('all')}}>إعادة ضبط البحث</button></div>}
      </section>

      <section className="quote-section"><Sparkles size={24}/><p>“The beautiful thing about learning is that nobody can take it away from you.”</p><span>— B.B. KING</span></section>
    </main>

    <footer><div className="footer-brand"><div className="brand-mark"><BookOpen size={21}/><span>✦</span></div><div><strong>Kernel</strong><small>ACADEMY</small></div></div><p>نصنع مساحة للتعلّم والإبداع.</p><span>© 2026 KERNEL ACADEMY. ALL RIGHTS RESERVED.</span></footer>

    {selected && <div className="modal" role="dialog" aria-modal="true" aria-label={`شهادة ${selected.name}`} onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="modal-panel"><div className="modal-head"><div><span>OFFICIAL CERTIFICATE</span><h3>{selected.name}</h3></div><button className="close-btn" onClick={()=>setSelected(null)} aria-label="إغلاق"><X/></button></div><div className="modal-image"><img src={selected.image} alt={`شهادة إتمام ${selected.name}`}/></div><div className="modal-foot"><span><ShieldCheck size={15}/> {selected.id}</span><div><button className="modal-share" onClick={()=>share(selected)}><Share2 size={16}/> مشاركة</button><button className="modal-download" onClick={()=>download(selected)}><Download size={16}/> تحميل الشهادة</button></div></div></div></div>}
    {copied && <div className="toast">تم نسخ رابط الشهادة</div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
