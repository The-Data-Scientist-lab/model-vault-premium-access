
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IndianRupee, Currency } from "lucide-react";

interface CountrySelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: 'india' | 'international') => void;
}

const CountrySelectionDialog = ({ isOpen, onClose, onSelectCountry }: CountrySelectionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Region</DialogTitle>
          <DialogDescription>
            Choose your region to see relevant payment options and pricing
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:border-theme-primary hover:bg-theme-primary/5"
            onClick={() => onSelectCountry('india')}
          >
            <IndianRupee className="h-8 w-8" />
            <span className="font-medium">India</span>
            <span className="text-xs text-muted-foreground">UPI Payment</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:border-theme-primary hover:bg-theme-primary/5"
            onClick={() => onSelectCountry('international')}
          >
            <Currency className="h-8 w-8" />
            <span className="font-medium">International</span>
            <span className="text-xs text-muted-foreground">Binance Payment</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountrySelectionDialog;
