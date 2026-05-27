import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import RegisterModal from '@/components/RegisterModal';
import { EVENTS, CATEGORIES, Event } from '@/data/events';

const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const FIRST_DAY_OFFSET = 0; // December 2025 starts on Monday

type ViewMode = 'table' | 'calendar';

const Index = () => {
  const [view, setView] = useState<ViewMode>('table');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filtered = useMemo(() => {
    return EVENTS.filter(e => {
      if (filterCategory !== 'all' && e.category !== filterCategory) return false;
      if (filterDate !== null && e.date !== filterDate) return false;
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) &&
          !e.venue.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterCategory, filterDate, search]);

  const byDate = useMemo(() => {
    const map: Record<number, Event[]> = {};
    filtered.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return Object.entries(map)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([date, events]) => ({ date: Number(date), events }));
  }, [filtered]);

  const eventsByDay = useMemo(() => {
    const map: Record<number, Event[]> = {};
    EVENTS.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, []);

  const totalEvents = EVENTS.length;
  const paidEvents = EVENTS.filter(e => e.isPaid).length;
  const totalCapacity = EVENTS.reduce((s, e) => s + e.capacity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-yellow-400/80 text-xs font-sans tracking-widest uppercase mb-2">
                МБУК г. Сысерть
              </p>
              <h1 className="font-display text-white text-4xl md:text-5xl leading-tight">
                Дворец культуры<br />
                <span className="text-gold italic">им. И.П. Романенко</span>
              </h1>
              <div className="ornament-line-thick w-48 mt-4 mb-4" />
              <p className="font-display text-2xl text-yellow-100/80 italic">
                Календарный план мероприятий
              </p>
              <p className="font-sans text-blue-200 text-sm mt-1 tracking-wide">
                ДЕКАБРЬ 2025
              </p>
            </div>
            <div className="flex gap-6 md:gap-8">
              <div className="text-center">
                <div className="font-display text-4xl text-gold">{totalEvents}</div>
                <div className="text-blue-200 text-xs font-sans mt-1">мероприятий</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-gold">{paidEvents}</div>
                <div className="text-blue-200 text-xs font-sans mt-1">платных</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-gold">{totalCapacity.toLocaleString()}</div>
                <div className="text-blue-200 text-xs font-sans mt-1">мест всего</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Controls bar */}
      <div className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию или месту..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded font-sans focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setView('table')}
              className={view === 'table' ? 'bg-navy text-white hover:bg-navy/90' : 'bg-white text-navy border border-border hover:bg-secondary'}
            >
              <Icon name="List" size={15} />
              Список
            </Button>
            <Button
              size="sm"
              onClick={() => setView('calendar')}
              className={view === 'calendar' ? 'bg-navy text-white hover:bg-navy/90' : 'bg-white text-navy border border-border hover:bg-secondary'}
            >
              <Icon name="CalendarDays" size={15} />
              Календарь
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-52 shrink-0">
          <div className="bg-white border border-border rounded p-4 sticky top-20">
            <p className="font-display text-lg text-navy mb-3">Фильтр</p>
            <div className="ornament-line mb-3" />

            <p className="text-xs font-sans text-muted-foreground uppercase tracking-wide mb-2">Тип</p>
            <div className="space-y-1">
              <button
                onClick={() => setFilterCategory('all')}
                className={`w-full text-left text-sm font-sans px-2 py-1.5 rounded transition-colors ${filterCategory === 'all' ? 'bg-navy text-white' : 'hover:bg-secondary text-foreground'}`}
              >
                Все мероприятия
              </button>
              {Object.entries(CATEGORIES).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setFilterCategory(key)}
                  className={`w-full text-left text-sm font-sans px-2 py-1.5 rounded transition-colors ${filterCategory === key ? 'bg-navy text-white' : 'hover:bg-secondary text-foreground'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filterCategory !== 'all' && (
              <button
                onClick={() => setFilterCategory('all')}
                className="mt-3 text-xs text-gold font-sans flex items-center gap-1 hover:underline"
              >
                <Icon name="X" size={12} /> Сбросить
              </button>
            )}

            {filterDate !== null && (
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs font-sans text-muted-foreground mb-1">Выбрана дата</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-navy">{filterDate} дек.</span>
                  <button onClick={() => setFilterDate(null)} className="text-xs text-gold font-sans hover:underline flex items-center gap-0.5">
                    <Icon name="X" size={12} /> Сброс
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs font-sans text-muted-foreground mb-1">Показано</p>
              <p className="font-display text-2xl text-navy">{filtered.length}</p>
              <p className="text-xs text-muted-foreground font-sans">из {totalEvents}</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">

          {/* Calendar view */}
          {view === 'calendar' && (
            <div className="animate-fade-in">
              <div className="bg-white border border-border rounded overflow-hidden mb-4">
                <div className="bg-navy/5 border-b border-border px-4 py-3">
                  <p className="font-display text-xl text-navy">Декабрь 2025</p>
                </div>
                <div className="grid grid-cols-7 border-b border-border">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
                    <div key={d} className="text-center text-xs font-sans text-muted-foreground py-2 border-r last:border-r-0 border-border">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-16 border-r border-b border-border bg-secondary/30" />
                  ))}
                  {MONTH_DAYS.map(day => {
                    const dayEvts = eventsByDay[day] || [];
                    const isSelected = filterDate === day;
                    const hasEvents = dayEvts.length > 0;
                    const colIndex = (FIRST_DAY_OFFSET + day - 1) % 7;
                    const isWeekend = colIndex === 5 || colIndex === 6;
                    return (
                      <button
                        key={day}
                        onClick={() => { setFilterDate(isSelected ? null : day); setView('table'); }}
                        className={`h-16 border-r border-b border-border p-1.5 text-left transition-all
                          ${isSelected ? 'bg-navy' : isWeekend ? 'bg-amber-50 hover:bg-amber-100' : 'hover:bg-secondary'}
                          ${!hasEvents ? 'opacity-50' : 'cursor-pointer'}`}
                      >
                        <span className={`text-xs font-sans font-medium ${isSelected ? 'text-white' : isWeekend ? 'text-amber-800' : 'text-foreground'}`}>
                          {day}
                        </span>
                        {hasEvents && (
                          <div className="mt-0.5">
                            <span className={`inline-block text-xs px-1 rounded font-sans ${isSelected ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'}`}>
                              {dayEvts.length}
                            </span>
                          </div>
                        )}
                        <div className="flex gap-0.5 mt-0.5 flex-wrap">
                          {dayEvts.slice(0, 4).map(e => (
                            <div
                              key={e.id}
                              className={`h-1 w-1 rounded-full ${
                                e.category === 'concert' ? 'bg-purple-400' :
                                e.category === 'holiday' ? 'bg-yellow-400' :
                                e.category === 'patriotic' ? 'bg-red-400' :
                                e.category === 'social' ? 'bg-green-400' :
                                e.category === 'education' ? 'bg-blue-400' :
                                'bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
                  <span key={key} className={`text-xs px-2 py-0.5 rounded border font-sans ${color}`}>{label}</span>
                ))}
              </div>
            </div>
          )}

          {/* Events list */}
          {byDate.length === 0 ? (
            <div className="bg-white border border-border rounded p-12 text-center animate-fade-in">
              <Icon name="CalendarX" size={40} className="mx-auto text-muted-foreground/40 mb-3" />
              <p className="font-display text-xl text-muted-foreground">Мероприятий не найдено</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {byDate.map(({ date, events }) => {
                const dayName = events[0]?.dayName || '';
                return (
                  <div key={date} className="bg-white border border-border rounded overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 bg-navy/5 border-b border-border">
                      <div className="bg-navy text-white rounded w-10 h-10 flex flex-col items-center justify-center shrink-0">
                        <span className="font-display text-lg leading-none">{date}</span>
                      </div>
                      <div>
                        <p className="font-display text-lg text-navy leading-tight capitalize">{dayName}</p>
                        <p className="text-xs text-muted-foreground font-sans">декабря 2025</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs font-sans text-muted-foreground border border-border rounded px-2 py-0.5">
                          {events.length} {events.length === 1 ? 'событие' : events.length < 5 ? 'события' : 'событий'}
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-border">
                      {events.map((event) => {
                        const cat = CATEGORIES[event.category];
                        return (
                          <div
                            key={event.id}
                            className="event-row px-4 py-3 flex gap-3 items-start"
                          >
                            <div className="w-20 shrink-0 pt-0.5">
                              <span className="text-sm font-sans font-medium text-navy whitespace-nowrap">{event.time || '—'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                <span className={`text-xs px-1.5 py-0.5 rounded border font-sans ${cat.color}`}>
                                  {cat.label}
                                </span>
                                {event.ageLimit && (
                                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-sans text-gray-600">
                                    {event.ageLimit}
                                  </span>
                                )}
                                {event.isPaid && (
                                  <span className="text-xs px-1.5 py-0.5 bg-yellow-50 border border-yellow-300 rounded font-sans text-yellow-700 flex items-center gap-1">
                                    <Icon name="Ticket" size={10} />Платно
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-sans text-foreground leading-snug">{event.title}</p>
                              <div className="flex flex-wrap gap-3 mt-1.5">
                                <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                                  <Icon name="MapPin" size={11} />{event.venue}
                                </span>
                                {event.capacity > 0 && (
                                  <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                                    <Icon name="Users" size={11} />{event.capacity} мест
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="hidden md:block w-36 shrink-0 text-right">
                              <p className="text-xs text-muted-foreground font-sans leading-snug">{event.responsible}</p>
                            </div>
                            <div className="shrink-0 pt-0.5">
                              <Button
                                size="sm"
                                className="text-xs font-sans bg-white border border-yellow-400 text-navy hover:bg-yellow-400 hover:text-navy h-7 px-2"
                                onClick={() => setSelectedEvent(event)}
                              >
                                Записаться
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-navy mt-8 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-display text-xl text-gold mb-1">МБУК «Дворец культуры имени И.П. Романенко»</p>
          <p className="text-blue-200 text-sm font-sans">г. Сысерть, Свердловская область</p>
          <div className="ornament-line w-32 mx-auto mt-4" />
        </div>
      </footer>

      <RegisterModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default Index;
