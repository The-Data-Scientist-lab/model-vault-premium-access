
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
      <DialogContent className="max-w-xs sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Select Your Region</DialogTitle>
          <DialogDescription>
            Choose your region to see relevant payment options and pricing
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:border-theme-primary hover:bg-theme-primary/5 transition-all soft-shadow"
            onClick={() => onSelectCountry('india')}
          >
            <div className="bg-theme-primary/10 p-2 rounded-full">
              <IndianRupee className="h-6 w-6 md:h-8 md:w-8 text-theme-primary" />
            </div>
            <span className="font-medium">India</span>
            <span className="text-xs text-muted-foreground">UPI Payment</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:border-theme-primary hover:bg-theme-primary/5 transition-all soft-shadow"
            onClick={() => onSelectCountry('international')}
          >
            <div className="bg-theme-primary/10 p-2 rounded-full">
              <Currency className="h-6 w-6 md:h-8 md:w-8 text-theme-primary" />
            </div>
            <span className="font-medium">International</span>
            <span className="text-xs text-muted-foreground">Binance Payment</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountrySelectionDialog;
