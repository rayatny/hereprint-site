import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Home() {
  const [pdfSize, setPdfSize] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        const { width, height } = page.getViewport({ scale: 1 });
        setPdfSize({ width: width.toFixed(2), height: height.toFixed(2) });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">HerePrint</h1>
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">上传 PDF 文件</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
        {pdfSize && (
          <div className="text-sm text-gray-700">
            页面尺寸：{pdfSize.width} × {pdfSize.height} pt
          </div>
        )}
      </div>
    </main>
  );
}