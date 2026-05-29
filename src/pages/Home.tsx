import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PHOTO = 'https://cdn.poehali.dev/projects/008ed626-2f28-4950-91f3-178c028ee020/bucket/8d7d0e8d-f60e-4f97-9cd4-2f4ffc2726eb.png';

const DIRECTIONS = [
  { icon: 'Music', title: 'Хор', desc: 'Вокальный ансамбль и хоровое пение для всех возрастов' },
  { icon: 'Footprints', title: 'Танцы', desc: 'Народные, эстрадные и современные танцевальные коллективы' },
  { icon: 'Theater', title: 'Театр', desc: 'Любительский театральный коллектив, спектакли и постановки' },
  { icon: 'Palette', title: 'Рисование', desc: 'Студия изобразительного искусства для детей и взрослых' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PHOTO}
            alt="Дворец культуры им. И.П. Романенко"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 text-white/80 text-sm mb-6">
            г. Сысерть
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Дворец культуры<br />
            <span style={{ color: 'hsl(355, 68%, 65%)' }}>им. И.П. Романенко</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Место, где рождается творчество. Кружки, мероприятия и культурная жизнь города.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate('/schedule')}
              className="text-white font-semibold px-8 py-3 text-base"
              style={{ backgroundColor: 'hsl(355, 68%, 35%)' }}
            >
              <Icon name="CalendarDays" size={18} />
              Афиша мероприятий
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('directions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-3 text-base"
            >
              <Icon name="ChevronDown" size={18} />
              Наши направления
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/50" />
        </div>
      </section>

      {/* Directions */}
      <section id="directions" className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Направления и кружки</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Выберите занятие по душе — у нас есть что-то для каждого</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIRECTIONS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow text-center group"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'hsl(355, 68%, 95%)' }}
              >
                <Icon name={icon} size={24} style={{ color: 'hsl(355, 68%, 35%)' }} />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 px-4" style={{ backgroundColor: 'hsl(355, 68%, 35%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ближайшие мероприятия</h2>
          <p className="text-white/80 mb-6">Не пропустите события декабря — концерты, выставки и праздники</p>
          <Button
            onClick={() => navigate('/schedule')}
            className="bg-white font-semibold px-8 py-3 text-base hover:bg-white/90"
            style={{ color: 'hsl(355, 68%, 35%)' }}
          >
            <Icon name="CalendarDays" size={18} />
            Открыть афишу
          </Button>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Контакты</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-border text-center shadow-sm">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'hsl(355, 68%, 95%)' }}
            >
              <Icon name="MapPin" size={22} style={{ color: 'hsl(355, 68%, 35%)' }} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Адрес</h3>
            <p className="text-muted-foreground text-sm">г. Сысерть,<br />ул. Тракт Коптеловский</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center shadow-sm">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'hsl(355, 68%, 95%)' }}
            >
              <Icon name="Phone" size={22} style={{ color: 'hsl(355, 68%, 35%)' }} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Телефон</h3>
            <p className="text-muted-foreground text-sm">Уточните по телефону<br />администратора</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center shadow-sm">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'hsl(355, 68%, 95%)' }}
            >
              <Icon name="Clock" size={22} style={{ color: 'hsl(355, 68%, 35%)' }} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Режим работы</h3>
            <p className="text-muted-foreground text-sm">Пн–Пт: 9:00–21:00<br />Сб–Вс: 10:00–20:00</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-muted-foreground text-sm">
        © 2025 Дворец культуры им. И.П. Романенко · г. Сысерть
      </footer>
    </div>
  );
};

export default Home;