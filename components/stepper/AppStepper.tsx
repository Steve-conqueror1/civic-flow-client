"use client";

import { useState } from "react";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";

import { Button } from "@/components/ui/button";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";

type StepsContent = {
  position: number;
  title: string;
  description: string;
  content: React.ReactNode;
};

interface Props {
  steps?: StepsContent[];
}

export const AppStepper: React.FC<Props> = (props) => {
  const { steps = [] } = props;
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
      className="w-full max-w-7xl space-y-8"
    >
      <StepperNav className="hidden md:flex">
        {steps.map((step, index) => (
          <StepperItem
            key={step.position}
            step={step.position}
            className="items-start"
          >
            <StepperTrigger className="flex flex-col items-center gap-2.5">
              <StepperIndicator>{step.position}</StepperIndicator>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperTrigger>
            {index < steps.length - 1 && <StepperSeparator className="mt-3" />}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm mt-4">
        {steps.map((step) => (
          <StepperContent
            className="flex w-full items-center justify-center"
            key={step.position}
            value={step.position}
          >
            {step.content}
          </StepperContent>
        ))}
      </StepperPanel>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-2.5">
        <Button
          className="hover:cursor-pointer flex items-center gap-2"
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          <IconArrowNarrowLeft />
          <span>Previous</span>
        </Button>
        <Button
          className="hover:cursor-pointer flex items-center gap-2"
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length}
        >
          <span>Next</span>
          <IconArrowNarrowRight />
        </Button>
      </div>
    </Stepper>
  );
};
