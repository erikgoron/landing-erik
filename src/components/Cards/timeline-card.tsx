interface TimelineCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
  }
  
  interface TimelineCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
  }
  
  export function TimelineCard({ children, className, ...props }: TimelineCardProps) {
    return (
      <div
        className={`backdrop-blur-[2px] border-2 border-[var(--secondary-8)] bg-[var(--secondary)] shadow-sm rounded-lg h-[380px] min-h-[380px] max-h-[380px] w-full flex flex-col overflow-hidden ${className || ''}`}
  
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function TimelineCardContent({ children, className, ...props }: TimelineCardContentProps) {
    return (
      <div
        className={`
          p-6
          flex
          flex-col
          h-full
          min-h-full
          justify-between
          gap-4
          ${className || ''}
        `}
        {...props}
      >
        {children}
      </div>
    );
  } 