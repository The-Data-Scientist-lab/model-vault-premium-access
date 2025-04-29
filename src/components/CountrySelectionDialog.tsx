
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
      <DialogContent className="max-w-xs sm:max-w-md mx-auto bg-white p-0 border-none">
        <DialogHeader className="p-6 bg-gradient-to-r from-theme-primary/10 to-theme-accent/10 rounded-t-lg">
          <DialogTitle className="text-xl gradient-text">Select Your Region</DialogTitle>
          <DialogDescription className="text-foreground/80">
            Choose your region to see relevant payment options and pricing
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-3 h-auto py-6 hover:border-theme-primary hover:bg-theme-primary/5 transition-all soft-shadow border-2"
            onClick={() => onSelectCountry('india')}
          >
            <div className="bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 p-3 rounded-full">
              <IndianRupee className="h-8 w-8 md:h-10 md:w-10 text-theme-primary" />
            </div>
            <div className="space-y-1 text-center">
              <span className="font-medium text-lg">India</span>
              <span className="text-xs block text-muted-foreground">UPI Payment</span>
              <span className="text-xs px-3 py-1 bg-theme-primary/10 rounded-full text-theme-primary">
                ₹ Indian Rupees
              </span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center gap-3 h-auto py-6 hover:border-theme-primary hover:bg-theme-primary/5 transition-all soft-shadow border-2"
            onClick={() => onSelectCountry('international')}
          >
            <div className="bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 p-3 rounded-full">
              <Currency className="h-8 w-8 md:h-10 md:w-10 text-theme-primary" />
            </div>
            <div className="space-y-1 text-center">
              <span className="font-medium text-lg">International</span>
              <span className="text-xs block text-muted-foreground">Binance Payment</span>
              <span className="text-xs px-3 py-1 bg-theme-primary/10 rounded-full text-theme-primary">
                $ US Dollars
              </span>
            </div>
          </Button>
        </div>
        
        <div className="bg-slate-50 p-4 text-center rounded-b-lg text-sm text-muted-foreground">
          Your selection determines available payment methods and currency
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountrySelectionDialog;
