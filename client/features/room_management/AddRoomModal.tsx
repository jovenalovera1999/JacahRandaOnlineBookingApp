"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import { Modal } from "@/components/ui/Modal";

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRoomModal({ isOpen, onClose }: AddRoomModalProps) {
  return (
    <>
      <Modal title="Add Room" isOpen={isOpen} onClose={onClose}>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 md:space-x-4 border-b border-gray-100 pb-4 mb-4">
          <div className="md:col-span-1 space-y-4">
            <FloatingLabelInputField
              label="Room Name"
              type="text"
              name="room_name"
            />
            <FloatingLabelInputField
              label="Room Name"
              type="text"
              name="room_name"
            />
            <FloatingLabelInputField
              label="Room Name"
              type="text"
              name="room_name"
            />
          </div>
          <div className="md:col-span-1 space-y-4">
            <FloatingLabelSelectField label="Hello World" name="hello_world">
              <option value="">Hello World</option>
              <option value="">Hello World</option>
              <option value="">Hello World</option>
            </FloatingLabelSelectField>
            <FloatingLabelSelectField label="Hello World" name="hello_world">
              <option value="">Hello World</option>
              <option value="">Hello World</option>
              <option value="">Hello World</option>
            </FloatingLabelSelectField>
            <FloatingLabelSelectField label="Hello World" name="hello_world">
              <option value="">Hello World</option>
              <option value="">Hello World</option>
              <option value="">Hello World</option>
            </FloatingLabelSelectField>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="col-span-2 md:col-span-1">
            <Button
              tag="button"
              onClick={onClose}
              className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
            >
              Close
            </Button>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Button tag="button">Save Room</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
