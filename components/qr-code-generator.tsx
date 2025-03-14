"use client"

import type React from "react"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download } from "lucide-react"

interface QRCodeGeneratorProps {
  translations: {
    title: string
    url: string
    urlPlaceholder: string
    qrColor: string
    bgColor: string
    size: string
    errorCorrection: string
    errorLevels: {
      L: string
      M: string
      Q: string
      H: string
    }
    generate: string
    download: string
  }
}

export default function QRCodeGenerator({ translations }: QRCodeGeneratorProps) {
  const [url, setUrl] = useState("https://qrcodex.online")
  const [qrCode, setQRCode] = useState("https://qrcodex.com")
  const [color, setColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [size, setSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState("M")
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    setQRCode(url)
  }

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return

    const svg = qrCodeRef.current.querySelector("svg")
    if (!svg) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = size
    canvas.height = size

    // Create an image from the SVG
    const img = new Image()
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    img.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0)

      // Convert canvas to data URL and trigger download
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = dataUrl
      link.click()

      // Clean up
      URL.revokeObjectURL(svgUrl)
    }

    img.src = svgUrl
    img.crossOrigin = "anonymous"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{translations.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={generateQRCode} className="space-y-4">
          <div>
            <Label htmlFor="url">{translations.url}</Label>
            <Input
              id="url"
              type="url"
              placeholder={translations.urlPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">{translations.qrColor}</Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <Label htmlFor="backgroundColor">{translations.bgColor}</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="size">
              {translations.size}: {size}x{size}
            </Label>
            <Slider
              id="size"
              min={100}
              max={400}
              step={10}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="errorCorrection">{translations.errorCorrection}</Label>
            <Select value={errorCorrection} onValueChange={setErrorCorrection}>
              <SelectTrigger id="errorCorrection">
                <SelectValue placeholder="Select error correction level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">{translations.errorLevels.L}</SelectItem>
                <SelectItem value="M">{translations.errorLevels.M}</SelectItem>
                <SelectItem value="Q">{translations.errorLevels.Q}</SelectItem>
                <SelectItem value="H">{translations.errorLevels.H}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {translations.generate}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {qrCode && (
          <div className="mt-4" ref={qrCodeRef}>
            <QRCodeSVG
              value={qrCode}
              size={size}
              fgColor={color}
              bgColor={backgroundColor}
              level={errorCorrection}
              includeMargin={true}
              margin={1}
            />
            <Button onClick={downloadQRCode} className="mt-4 w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> {translations.download}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

