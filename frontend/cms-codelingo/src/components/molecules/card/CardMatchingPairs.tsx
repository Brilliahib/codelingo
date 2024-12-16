"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MatchingPairProps {
  pairs: { [key: string]: string };
}

export function MatchingPair({ pairs }: MatchingPairProps) {
  const [selected, setSelected] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [correctPairs, setCorrectPairs] = useState<string[]>([]);
  const [temporarilyDisabled, setTemporarilyDisabled] = useState<string[]>([]);

  const handleButtonClick = (id: string, label: string) => {
    if (selected) {
      if (pairs[selected.label] === label) {
        setCorrectPairs((prev) => [...prev, selected.label, label]);
        setSelected(null);
      } else {
        setTemporarilyDisabled((prev) => [...prev, selected.label, label]);
        setTimeout(() => {
          setTemporarilyDisabled((prev) =>
            prev.filter((item) => item !== selected.label && item !== label)
          );
        }, 1000);
        setSelected(null);
      }
    } else {
      setSelected({ id, label });
    }
  };

  const isCorrect = (label: string) => correctPairs.includes(label);
  const isTemporarilyDisabled = (label: string) =>
    temporarilyDisabled.includes(label);
  const isSelected = (label: string) => selected?.label === label;

  return (
    <div className="flex flex-row items-center justify-center gap-20">
      <div className="flex flex-col gap-4">
        {Object.keys(pairs).map((item, index) => (
          <Button
            key={`left-${index}`}
            className={`w-36 rounded-lg transition-transform duration-500 ease-in-out transform ${
              isCorrect(item)
                ? "bg-green-500"
                : isTemporarilyDisabled(item)
                ? "bg-red-500 opacity-50 scale-95"
                : isSelected(item)
                ? "border-2 border-blue-500"
                : ""
            }`}
            variant="secondary"
            onClick={() => handleButtonClick(`left-${index}`, item)}
            disabled={isCorrect(item) || isTemporarilyDisabled(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {Object.values(pairs).map((item, index) => (
          <Button
            key={`right-${index}`}
            className={`w-36 rounded-lg transition-transform duration-500 ease-in-out transform ${
              isCorrect(item)
                ? "bg-green-500"
                : isTemporarilyDisabled(item)
                ? "bg-red-500 opacity-50 scale-95"
                : isSelected(item)
                ? "border-2 border-blue-500"
                : ""
            }`}
            variant="secondary"
            onClick={() => handleButtonClick(`right-${index}`, item)}
            disabled={isCorrect(item) || isTemporarilyDisabled(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
