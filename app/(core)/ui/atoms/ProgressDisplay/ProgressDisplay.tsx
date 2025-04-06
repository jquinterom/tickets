type ProgressDisplayProps = {
  progress: number;
};

const ProgressDisplay = ({ progress }: ProgressDisplayProps) => {
  return (
    <div
      className="w-full bg-gray-200 rounded-full h-2.5"
      data-testid="progress-display"
    >
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressDisplay;
