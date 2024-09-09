export default function apiError(message: string): object {
  return {
    success: false,
    message,
  };
}
