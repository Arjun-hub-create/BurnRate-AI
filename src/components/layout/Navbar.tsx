import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';

const navItems = [
  { label: 'Audit', path: '/audit' },
  { label: 'Results', path: '/results' },
  { label: 'Share', path: '/share' },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">
          BurnRate AI
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-slate-900'
                  : 'text-slate-600 transition hover:text-slate-900'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/audit">
            <Button className="hidden sm:inline-flex">Audit My AI Spend</Button>
          </Link>
          <button className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 md:hidden">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
