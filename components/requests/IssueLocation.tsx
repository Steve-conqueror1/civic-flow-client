import { LocationPicker } from "./LocationPicker";
import type { WizardLocation } from "@/app/types/geocode";

interface IssueLocationProps {
  location: WizardLocation | null;
  onLocationConfirm: (location: WizardLocation) => void;
  onLocationClear: () => void;
}

export const IssueLocation = ({
  location,
  onLocationConfirm,
  onLocationClear,
}: IssueLocationProps) => {
  return (
    <div className="w-full">
      <LocationPicker
        selectedAddress={location?.address}
        longitude={location?.longitude}
        latitude={location?.latitude}
        onLocationConfirm={onLocationConfirm}
        onLocationClear={onLocationClear}
        height={430}
      />
    </div>
  );
};
