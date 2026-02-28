import { FC } from "react";

type ConfirmationDialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  title,
  message,
  confirmLabel = "Confirm",
  confirmColor = "bg-red-600 hover:bg-red-500",
  onConfirm,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 px-6 py-8 bg-slate-700 rounded-md">
          <p className="text-xl font-bold text-gray-200 text-center">
            {title}
          </p>
          <p className="text-sm text-gray-400 text-center">{message}</p>
          <div className="flex gap-3 w-full mt-2">
            <button
              className="flex-1 p-2 px-5 rounded-md bg-gray-600 font-bold hover:bg-gray-500 transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`flex-1 p-2 px-5 rounded-md font-bold transition-colors ${confirmColor}`}
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
