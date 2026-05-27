import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Event, CATEGORIES } from '@/data/events';

interface Props {
  event: Event | null;
  onClose: () => void;
}

export default function RegisterModal({ event, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const cat = CATEGORIES[event.category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setName(''); setPhone(''); setPeople('1'); setSubmitted(false); onClose();
  };

  return (
    <Dialog open={!!event} onOpenChange={reset}>
      <DialogContent className="max-w-lg border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5" style={{ backgroundColor: 'hsl(355 70% 22%)' }}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <span className={`inline-block text-xs px-2 py-0.5 rounded border ${cat.color} font-sans`}>
                {cat.label}
              </span>
            </div>
          </div>
          <DialogHeader className="mt-3">
            <DialogTitle className="font-display text-2xl text-white leading-tight text-left">
              {event.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-white/80">
              <Icon name="Calendar" size={14} />
              {event.date} декабря 2025, {event.dayName}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5 text-white/80">
                <Icon name="Clock" size={14} />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-white/60">
              <Icon name="MapPin" size={14} />
              {event.venue}
            </span>
          </div>
          {event.isPaid && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-xs px-3 py-1 rounded">
              <Icon name="Ticket" size={12} />
              Платное мероприятие — уточняйте стоимость
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground font-sans">
                Заполните форму — администраторы свяжутся с вами для подтверждения.
              </p>
              <div className="space-y-1.5">
                <Label className="font-sans text-sm font-medium text-crimson">Ваше имя *</Label>
                <Input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="border-border font-sans"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-sans text-sm font-medium text-crimson">Телефон *</Label>
                <Input
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  className="border-border font-sans"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-sans text-sm font-medium text-crimson">Количество человек</Label>
                <Input
                  value={people}
                  onChange={e => setPeople(e.target.value)}
                  type="number"
                  min="1"
                  max="20"
                  className="border-border font-sans w-24"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="text-white font-sans px-6 hover:opacity-90"
                  style={{ backgroundColor: 'hsl(355 68% 35%)' }}
                >
                  <Icon name="Send" size={15} />
                  Записаться
                </Button>
                <Button type="button" variant="outline" onClick={reset} className="font-sans">
                  Отмена
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={28} className="text-green-600" />
              </div>
              <h3 className="font-display text-2xl text-navy mb-2">Заявка принята!</h3>
              <p className="text-sm text-muted-foreground font-sans mb-1">
                Спасибо, <strong>{name}</strong>! Администраторы Дворца культуры свяжутся с вами по номеру
              </p>
              <p className="font-medium text-navy font-sans mb-5">{phone}</p>
              <Button onClick={reset} variant="outline" className="font-sans">
                Закрыть
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}