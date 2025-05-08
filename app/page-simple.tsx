export default function SimpleHome() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Hi, I'm Dhanushri
        </h1>
        <p className="mt-6 text-[42px] text-gray-700 max-w-lg mx-auto">Digital Creator & Influencer</p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/works"
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="px-5 py-3 bg-white text-purple-600 font-medium rounded-full border border-purple-200"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </div>
  )
}
