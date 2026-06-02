import LoadingSpinner from "./LoadingSpinner";

function PageLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner text="Loading data..." />
    </div>
  );
}

export default PageLoader;