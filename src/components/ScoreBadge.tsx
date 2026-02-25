interface ScoreBadgeProps {
  score: number;
  color: string;
}

export default function ScoreBadge({ score, color }: ScoreBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {score}%
    </span>
  );
}
