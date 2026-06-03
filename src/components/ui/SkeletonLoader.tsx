export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="skeleton h-5 w-2/3 mb-4" />
      <div className="skeleton h-10 w-1/3 mb-4" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonChart({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="skeleton h-5 w-1/3 mb-6" />
      <div className="flex items-end gap-2 h-48">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 68].map((h, i) => (
          <div
            key={i}
            className="skeleton flex-1 rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonMap({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="skeleton h-5 w-1/4 mb-6" />
      <div className="skeleton h-64 w-full rounded-xl" />
    </div>
  );
}
