import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/modal';
import { ReactNode } from 'react';

interface ModalConfirmProps extends React.HTMLAttributes<HTMLDivElement> {
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export function ModalConfirm({
  title,
  description,
  confirmLabel = 'Sim',
  cancelLabel = 'Não',
  onConfirm,
  ...props
}: ModalConfirmProps) {
  return (
    <Modal.Content
      className="text-center flex flex-col gap-4 px-8 py-6 relative"
      {...props}
    >
      <Modal.Close className="top-[0.7rem] right-[0.7rem]" />

      <Modal.Title className="font-bold text-2xl leading-[120%] text-black-200 text-center">
        {title}
      </Modal.Title>

      {description && (
        <Modal.Description className="font-normal text-base text-gray-750 max-w-92 mx-auto">
          {description}
        </Modal.Description>
      )}

      <div className="flex justify-center gap-4 w-full">
        <Modal.Close
          className="static py-2 leading-6 min-w-[9rem] w-full border-[1.5px] border-gray-750 text-gray-750"
          asChild
        >
          <Button variant="secondary">{cancelLabel}</Button>
        </Modal.Close>

        <Modal.Close
          className="static py-2 leading-6 min-w-[9rem] w-full border-2 border-blue-800 bg-blue-800 text-white"
          asChild
        >
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </Modal.Close>
      </div>
    </Modal.Content>
  );
}
