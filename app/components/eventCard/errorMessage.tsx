interface ErrorProps {
    message : string;
}
const Error = ( { message } : ErrorProps ) => (
  <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
    <h1 className="text-2xl text-center">Error</h1>
    <p className="text-center">An error occurred. Please try again later.</p>
    <p className="text-center truncate">{message}</p>
  </div>
);

export default Error;