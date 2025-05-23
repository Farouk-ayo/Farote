import { toast } from "sonner";

export const useToast = () => {
  const notifySuccess = (message: string) => {
    toast.success(message, {
      duration: 3000,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      duration: 4000,
    });
  };
  const notifyInfo = (message: string) => {
    toast.info(message, {
      duration: 3000,
    });
  };
  return { notifySuccess, notifyError, notifyInfo };
};
