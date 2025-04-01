import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PriorityDisplayProps = {
  priority: number;
};

const PriorityDisplay = ({ priority }: PriorityDisplayProps) => {
  return (
    <div className="flex justify-start align-baseline">
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          icon={faFire}
          className={` px-0.5 ${
            priority > index ? "text-red-400" : "opacity-50"
          }`}
          key={index}
        />
      ))}
    </div>
  );
};

export default PriorityDisplay;
