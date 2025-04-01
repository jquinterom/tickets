"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface DeleteBlockProps {
  id: string;
}

const DeleteBlock = ({ id }: DeleteBlockProps) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const response = await fetch(`/api/Tickets/${id}`, {
      method: "DELETE",
    });

    console.log("response", response);

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
