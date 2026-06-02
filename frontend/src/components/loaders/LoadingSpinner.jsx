function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#9dff00]"></div>

      <p className="mt-4 text-gray-500 dark:text-gray-300 font-medium">
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;