export default function apiSuccess(data: object): object {
  return {
    success: true,
    data,
  };
}
