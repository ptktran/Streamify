export default function Error({ errorMsg, errorCode }) {
  return (
    <div className="h-screen w-full bg-gray-bg flex flex-col justify-center items-center gap-y-3">
      <h1 className="text-white text-7xl font-semibold p-5 bg-gray-dark rounded-xl">{errorCode}</h1>
      <h1 className="text-gray-text text-lg font-medium text-center px-3">{errorMsg}</h1>
    </div>
  )
}