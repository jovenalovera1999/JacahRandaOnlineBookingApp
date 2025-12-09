"use client";

import { Modal } from "@/components/ui/Modal";

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRoomModal({ isOpen, onClose }: AddRoomModalProps) {
  return (
    <>
      <Modal title="Add Room" isOpen={isOpen} onClose={onClose}>
        <div className="grid grid-cols-1 md:grid-cols-2"></div>
      </Modal>
    </>
  );
}
