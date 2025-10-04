import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            // Vibrate on success if available
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            scanner.stop();
            onScanSuccess(decodedText);
          },
          () => {
            // Ignore scan errors during scanning
          }
        );
        
        setIsScanning(true);
      } catch (err) {
        console.error("Scanner error:", err);
        setError("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onScanSuccess]);

  const handleClose = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(console.error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Scanner QR Code</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {error ? (
            <Card className="p-8 max-w-md">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={handleClose} className="w-full">
                Retour
              </Button>
            </Card>
          ) : (
            <div className="w-full max-w-md">
              <div
                id="qr-reader"
                className="rounded-lg overflow-hidden shadow-2xl"
              />
              {isScanning && (
                <div className="mt-6 text-center animate-fade-in">
                  <p className="text-muted-foreground">
                    Placez le QR code dans le cadre
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
