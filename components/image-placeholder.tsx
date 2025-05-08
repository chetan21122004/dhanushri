export default function ImagePlaceholder({
  width = 800,
  height = 600,
  alt = "Placeholder image",
}: {
  width?: number
  height?: number
  alt?: string
}) {
  return (
    <div
      className="bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="text-center p-4">
        <p className="text-pink-600 font-medium">{alt}</p>
        <p className="text-gray-500 text-sm">
          {width}×{height}
        </p>
      </div>
    </div>
  )
}
