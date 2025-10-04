import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QRCodeGeneratorProps {
  value: string;
  title: string;
  size?: number;
}

const QRCodeGenerator = ({ value, title, size = 200 }: QRCodeGeneratorProps) => {
  const handleDownload = () => {
    const svg = document.getElementById(`qr-${value}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `qr-${title}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-6 bg-white">
        <QRCodeSVG
          id={`qr-${value}`}
          value={value}
          size={size}
          level="H"
          includeMargin
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Télécharger
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
