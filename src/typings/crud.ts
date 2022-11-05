export type ConfirmAndDeleteOptions = {
  title?: string;
  message?: string;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  deleteFn: () => Promise<any>;
  onSuccess?: () => any;
  onError?: () => any;
};
