import { Dialog } from '@headlessui/react';
import { Point } from '../types/Point';

interface PointModalProps {
  isOpen: boolean;
  closeModal: () => void;
  point: Point | null;
}

export default function PointModal({ isOpen, closeModal, point }: PointModalProps) {
  if (!point) return null;

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center">
      <Dialog.Panel className="bg-white p-4 rounded shadow-lg">
        <Dialog.Title>{point.name}</Dialog.Title>
        <p>{point.details}</p>
        <button onClick={closeModal} className="mt-2 p-2 bg-blue-500 text-white rounded">Fechar</button>
      </Dialog.Panel>
    </Dialog>
  );
}
