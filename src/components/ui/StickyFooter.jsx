import useZakatStore from '../../store/zakatStore';
import { formatCurrency } from '../../utils/currency';

export default function StickyFooter() {
  const { assets, currency } = useZakatStore();

  const total = Object.values(assets).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

  if (total <= 0) return null;

  return (
    <div className="bg-primary-500 text-white py-2 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
        <span className="opacity-80">Running Total:</span>
        <span className="font-bold text-base">{formatCurrency(total, currency)}</span>
      </div>
    </div>
  );
}
