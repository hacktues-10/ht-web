export const StepButtons = ({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  return (
    <div className="mt-4 flex justify-between">
      {left}
      <div className="w-full flex-1" />
      {right}
    </div>
  );
};
