import { useToast } from "@chakra-ui/react";

interface Props {
  status: string;
  errorMessage?: string;
}

const Toast = ({ status, errorMessage }: Props) => {
  const toast = useToast();

  if (status == "success") {
    return toast({
      status: "success",
      title: "Yayy! 🎉",
      description: "Friend created successfully.",
      duration: 2000,
      position: "top-left",
    });
  }

  if (status == "error") {
    return toast({
      status: "error",
      title: "An error occurred.",
      description: errorMessage,
      duration: 4000,
    });
  }
};

export default Toast;
